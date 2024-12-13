'use server';

import { postDao } from "../dao/PostDao";
import { del, put } from "@vercel/blob";

export default async function createPost(
    content: {
        content: string
        images?: File[]
    },
    visitor: string,
    places: {
        longitude: number,
        latitude: number,
        star: number
    }[]
) {
    if (content.images && content.images.length > 0) {
        const imageUrls: string[] = [];
        for (const image of content.images) {
            const { url } = await put(image.name, image, { access: 'public' });
            imageUrls.push(url);
        }
        try {
            return await postDao.create(
                visitor,
                {
                    content: content.content,
                    mediaUrl: imageUrls
                },
                places);
        } catch (error) {
            await del(imageUrls);
            throw error;
        }
    } else {
        return await postDao.create(
            visitor,
            {
                content: content.content
            },
            places);
    }
}
