import db from "@/db/db";
import { Admin, admins } from "@/db/schema/admin.schema";
import { include } from "@/db/schema/include.schema";
import { places } from "@/db/schema/place.schema";
import { contentType, posts } from "@/db/schema/post.schema";
import { reports } from "@/db/schema/report.schema";
import { users } from "@/db/schema/user.schema";
import { and, count, desc, eq, sql } from "drizzle-orm";

export type PostReport = {
    places: {
        longitude: number;
        latitude: number;
        star: number;
        place_name: string;
        place_address: string;
    }[];
    postContent: contentType;
    postId: string;
    visitorId: string;
    countReports: number;
    userName: string;
};

class AdminDao {
    constructor() { }

    async findAdmin(id: string): Promise<Omit<Admin, "password"> | null> {
        const result = await db.select({
            id: admins.id
        })
            .from(admins)
            .where(eq(admins.id, id))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async findAllAdmins(): Promise<{ id: string }[]> {
        const result = await db.select({
            id: admins.id
        })
            .from(admins);

        return result;
    }

    async deleteById(id: string): Promise<void> {
        await db.delete(admins)
            .where(eq(admins.id, id));
    }

    async create(data: Omit<Admin, "id">): Promise<string> {
        const adminList = await this.findAllAdmins();

        const id = (process.env.ADMIN_PREFIX ?? "") +
            (adminList.map(
                (admin) => Number(
                    admin.id
                        .replace(
                            process.env.ADMIN_PREFIX ?? "", "")))
                .reduce(
                    (a, b) => Math.max(a, b), 0) + 1).toFixed(0).padStart(5, "0");
        
        await db.insert(admins)
            .values({ ...data, id });

        return id;
    }

    async updateById(id: string, data: Partial<Omit<Admin, "id">>): Promise<void> {
        await db.update(admins)
            .set(data)
            .where(eq(admins.id, id));
    }

    async authenticate(id: string, password: string): Promise<string | null> {
        const result = await db.select({ password: admins.password })
            .from(admins)
            .where(and(eq(admins.id, id), eq(admins.password, sql`crypt(${password}, ${admins.password})`)))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        return id;
    }

    async findAllReports(): Promise<PostReport[]> {
        const countReports = db.select({
            post: reports.post,
            visitor: reports.visitor,
            count: count().as("count"),
        })
            .from(reports)
            .groupBy(reports.post, reports.visitor)
            .as("count_reports");

        const reportedPosts = db.select({
            post: countReports.post,
            visitor: countReports.visitor,
            count: countReports.count,
            content: posts.content,
        })
            .from(countReports)
            .innerJoin(posts, and(eq(countReports.post, posts.id), eq(countReports.visitor, posts.visitor)))
            .orderBy(desc(countReports.count))
            .as("reported_posts");

        const userReportedPosts = await db.select({
            postId: reportedPosts.post,
            visitorId: reportedPosts.visitor,
            countReports: reportedPosts.count,
            postContent: reportedPosts.content,
            userName: users.name,
        }).from(reportedPosts)
            .innerJoin(users,
                eq(reportedPosts.visitor, users.id)
            );


        const result = await Promise.all(
            userReportedPosts.map(async (post) => {
                const placeList = await db.select({
                    longitude: include.longitude,
                    latitude: include.latitude,
                    star: include.star,
                    place_name: places.name,
                    place_address: places.address
                })
                    .from(include)
                    .innerJoin(places,
                        and(
                            eq(include.longitude,
                                places.longitude),
                            eq(include.latitude,
                                places.latitude)))
                    .where(
                        and(
                            eq(include.post,
                                post.postId),
                            eq(include.visitor,
                                post.visitorId)));

                return {
                    places: placeList,
                    postId: post.postId,
                    visitorId: post.visitorId,
                    countReports: post.countReports,
                    userName: post.userName,
                    postContent: post.postContent as contentType,
                    reportCount: post.countReports,
                };
            })
        );

        return result;
    }

    async deletePostReports(postId: string, visitorId: string): Promise<void> {
        await db.delete(reports)
            .where(
                and(
                    eq(reports.post, postId),
                    eq(reports.visitor, visitorId)
                )
            );
    }
}

export const adminDao = new AdminDao();