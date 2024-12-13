import db from "@/db/db";
import { Admin, admins } from "@/db/schema/admin.schema";
import { include } from "@/db/schema/include.schema";
import { places } from "@/db/schema/place.schema";
import { contentType, posts } from "@/db/schema/post.schema";
import { reports } from "@/db/schema/report.schema";
import { and, count, desc, eq, sql } from "drizzle-orm";

export type PostReport = {
    places: {
        longitude: number;
        latitude: number;
        star: number;
        place_name: string;
        place_address: string;
    }[];
    post: string;
    visitor: string;
    count: number;
    content: contentType;
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

        const id = process.env.ADMIN_PREFIX ?? "" +
            (adminList.map(
                (admin) => Number(
                    admin.id
                        .replace(
                            process.env.ADMIN_PREFIX ?? "", "")))
                .reduce(
                    (a, b) => Math.max(a, b), 0) + 1).toString().padStart(5, "0");

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
            count: count()
        })
            .from(reports)
            .groupBy(reports.post, reports.visitor)
            .as("count_reports");

        const reportedPosts = await db.select({
            post: countReports.post,
            visitor: countReports.visitor,
            count: countReports.count,
            content: posts.content,
        })
            .from(countReports)
            .innerJoin(posts, and(eq(countReports.post, posts.id), eq(countReports.visitor, posts.visitor)))
            .orderBy(desc(countReports.count));

        const result = await Promise.all(
            reportedPosts.map(async (post) => {
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
                                post.post),
                            eq(include.visitor, 
                                post.visitor)));

                return { ...post, places: placeList, content: post.content as contentType };
            })
        );

        return result;
    }
}

export const adminDao = new AdminDao();