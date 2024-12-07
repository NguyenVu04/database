import db from "@/db/db";
import { include } from "@/db/schema/include.schema";
import { contentType, posts } from "@/db/schema/post.schema";
import { users } from "@/db/schema/user.schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";

class PostDao {
    constructor() { }

    async findAll(page: number, limit: number): Promise<{
        id: string;
        visitor: string;
        content: contentType;
        post_date: Date;
        username: string;
        userId: string;
        places: { longtitude: string, latitude: string, star: number }[]
    }[]> {
        const postList = db.select()
            .from(posts)
            .limit(limit)
            .offset((page - 1) * limit)
            .as("post_list");

        const userPosts = await db.select({
            ...getTableColumns(posts),
            username: users.name,
            userId: users.id,
        })
            .from(postList)
            .innerJoin(users, eq(users.id, postList.visitor))
            .orderBy(desc(postList.post_date));

        const result = userPosts.map(async (post) => {
            const places = await db.select({
                longtitude: include.longtitude,
                latitude: include.latitude,
                star: include.star
            })
                .from(include)
                .where(eq(include.post, post.id));

            return {
                ...post,
                content: post.content as contentType,
                places: places
            }
        })

        return await Promise.all(result);;
    }

    async findByUserId(userId: string): Promise<{
        id: string;
        visitor: string;
        content: contentType;
        post_date: Date;
        places: { longtitude: string, latitude: string, star: number }[]
    }[]> {
        const user = db.select({
            id: users.id,
            username: users.name
        })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)
            .as("user");

        const userPosts = await db.select()
            .from(posts)
            .where(eq(posts.visitor, user.id))
            .orderBy(desc(posts.post_date));

        const result = userPosts.map(async (post) => {
            const places = await db.select({
                longtitude: include.longtitude,
                latitude: include.latitude,
                star: include.star
            })
                .from(include)
                .where(eq(include.post, post.id));

            return {
                ...post,
                content: post.content as contentType,
                places: places
            }
        })

        return await Promise.all(result);
    }

    async create(
        visitor: string,
        post_date: Date,
        content: contentType,
        places: { longtitude: number, latitude: number, star: number }[]): Promise<string | null> {

        const newPost = await db.insert(posts)
            .values({
                visitor,
                post_date,
                content
            })
            .returning();

        if (newPost.length === 0) {
            return null;
        }

        places.forEach(async (place) => {
            await db.insert(include)
                .values({
                    longtitude: place.longtitude.toFixed(4),
                    latitude: place.latitude.toFixed(4),
                    post: newPost[0].id,
                    visitor: visitor,
                    star: place.star
                })
        })
        return newPost[0].id;
    }

    async deleteById(id: string, visitorId: string): Promise<void> {
        await db.delete(posts)
            .where(and(eq(posts.id, id),
                eq(posts.visitor, visitorId)));
    }

    async updateById(id: string, visitorId: string, data: contentType): Promise<void> {
        await db.update(posts)
            .set({
                content: data
            })
            .where(and(eq(posts.id, id),
                eq(posts.visitor, visitorId)));
    }
}

export const postDao = new PostDao();