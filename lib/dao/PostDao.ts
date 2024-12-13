import db from "@/db/db";
import { comments } from "@/db/schema/comment.schema";
import { include } from "@/db/schema/include.schema";
import { places } from "@/db/schema/place.schema";
import { contentType, posts } from "@/db/schema/post.schema";
import { users } from "@/db/schema/user.schema";
import { del } from "@vercel/blob";
import { and, desc, eq } from "drizzle-orm";

export type Post = {
    id: string;
    visitor: string;
    content: contentType;
    post_date: Date;
    username: string;
    places: {
        longitude: number,
        latitude: number,
        place_name: string,
        place_address: string,
        star: number
    }[],
    comments: {
        id: string,
        content: string,
        comment_date: Date,
        sender_name: string,
        sender_id: string
    }[],
}

class PostDao {
    constructor() { }

    async findAll(page: number, limit: number): Promise<Post[]> {
        const postList = db.select()
            .from(posts)
            .limit(limit)
            .offset((page - 1) * limit)
            .orderBy(desc(posts.post_date))
            .as("post_list");

        const userPosts = await db.select({
            id: postList.id,
            content: postList.content,
            post_date: postList.post_date,
            username: users.name,
            visitor: users.id,
        })
            .from(postList)
            .innerJoin(users, eq(users.id, postList.visitor))
            .orderBy(desc(postList.post_date));

        const result = userPosts.map(async (post) => {
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
                        eq(places.longitude, include.longitude),
                        eq(places.latitude, include.latitude)
                    ))
                .where(eq(include.post, post.id));

            const commentList = await db.select({
                id: comments.id,
                content: comments.content,
                sender_id: comments.sender,
                sender_name: users.name,
                comment_date: comments.comment_date
            })
                .from(comments)
                .innerJoin(users, eq(users.id, comments.sender))
                .where(eq(comments.post, post.id));

            return {
                ...post,
                content: post.content as contentType,
                places: placeList,
                comments: commentList
            }
        })

        return await Promise.all(result);;
    }

    async findByUserId(userId: string): Promise<{
        id: string;
        visitor: string;
        content: contentType;
        post_date: Date;
        places: { longitude: number, latitude: number, star: number }[]
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
                longitude: include.longitude,
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
        content: contentType,
        places: { longitude: number, latitude: number, star: number }[]): Promise<string | null> {

        const newPost = await db.insert(posts)
            .values({
                visitor,
                content
            })
            .returning();

        if (newPost.length === 0) {
            return null;
        }

        places.forEach(async (place) => {
            await db.insert(include)
                .values({
                    longitude: place.longitude,
                    latitude: place.latitude,
                    post: newPost[0].id,
                    visitor: visitor,
                    star: place.star
                })
        })
        return newPost[0].id;
    }

    async deleteById(id: string, visitorId: string): Promise<void> {
        const deletedPost = await db.delete(posts)
            .where(and(eq(posts.id, id),
                eq(posts.visitor, visitorId)))
            .returning();

        if (deletedPost.length === 0) {
            return;
        }

        const content = deletedPost[0].content as contentType;
        if (content.mediaUrl) {
            await del(content.mediaUrl);
        };
    }

    async updateById(
        postId: string,
        visitorId: string,
        content: {
            content: string;
            images?: string[];
        },
        places: {
            longitude: number;
            latitude: number;
            star: number;
        }[]
    ): Promise<void> {
        const foundPosts = await db.select()
            .from(posts)
            .where(and(eq(posts.id, postId),
                eq(posts.visitor, visitorId)))
            .limit(1);

        if (foundPosts.length === 0) {
            return;
        }

        const currentPost = foundPosts[0];

        const newImages = content.images ?? [];
        const currentImages = (currentPost.content as contentType).mediaUrl ?? [];

        const deletedImages = currentImages.filter((url) => !newImages.includes(url));
        if (deletedImages.length > 0) {
            await del(deletedImages);
        }

        console.log(content);

        await db.update(posts)
            .set({
                content: newImages.length === 0 ?
                    {
                        content: content.content
                    } : {
                        content: content.content,
                        mediaUrl: newImages
                    },
            })
            .where(
                and(
                    eq(posts.id, postId),
                    eq(posts.visitor, visitorId)
                )
            );

        const currentPlaces = await db.select()
            .from(include)
            .where(
                and(
                    eq(include.post, postId),
                    eq(include.visitor, visitorId),
                )
            );

        const newPlaces = places.map((place) => ({
            longitude: place.longitude,
            latitude: place.latitude,
            post: postId,
            visitor: visitorId,
            star: place.star
        }));

        const addedPlaces = newPlaces.filter((place) => !currentPlaces.some((p) => Number(p.longitude) === place.longitude && Number(p.latitude) === place.latitude));
        const deletedPlaces = currentPlaces.filter((place) => !newPlaces.some((p) => p.longitude === Number(place.longitude) && p.latitude === Number(place.latitude)));
        const updatedPlaces = newPlaces.filter((place) => currentPlaces.some((p) => Number(p.longitude) === place.longitude && Number(p.latitude) === place.latitude));

        if (addedPlaces.length > 0) {
            addedPlaces.forEach(async (place) => {
                await db.insert(include)
                    .values({
                        longitude: place.longitude,
                        latitude: place.latitude,
                        post: place.post,
                        visitor: place.visitor,
                        star: place.star
                    });
            })
        }
        if (deletedPlaces.length > 0) {
            deletedPlaces.forEach(async (place) => {
                await db.delete(include)
                    .where(
                        and(
                            eq(include.post, place.post),
                            eq(include.visitor, place.visitor),
                            eq(include.longitude, place.longitude),
                            eq(include.latitude, place.latitude)
                        )
                    );
            })
        }

        if (updatedPlaces.length > 0) {
            updatedPlaces.forEach(async (place) => {
                await db.update(include)
                    .set({
                        star: place.star
                    })
                    .where(
                        and(
                            eq(include.post, place.post),
                            eq(include.visitor, place.visitor),
                            eq(include.longitude, place.longitude),
                            eq(include.latitude, place.latitude)
                        )
                    );
            })
        }
    }

    async createPostComment(
        postId: string,
        visitorId: string,
        content: string,
        senderId: string,
    ): Promise<void> {
        await db.insert(comments)
            .values({
                post: postId,
                visitor: visitorId,
                content: content,
                sender: senderId
            })
    }

    async findPostComments(postId: string, visitorId: string) {
        return await db.select({
            id: comments.id,
            post: comments.post,
            visitor: comments.visitor,
            content: comments.content,
            comment_date: comments.comment_date,
            sender_name: users.name,
            sender_id: users.id,
        })
            .from(comments)
            .innerJoin(users, eq(users.id, comments.sender))
            .where(and(eq(comments.post, postId),
                eq(comments.visitor, visitorId)));
    }
}

export const postDao = new PostDao();