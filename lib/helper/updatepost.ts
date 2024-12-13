'use server';

import { del, put } from "@vercel/blob";
import { postDao } from "../dao/PostDao";

export default async function updatePost(
    postId: string,
    visitorId: string,
    currentContent: {
        content?: string;
        images?: string[];
    },
    newContent: {
        content: string;
        images?: File[];
    },
    places: {
        longitude: number;
        latitude: number;
        star: number;
    }[]
) {
    if (newContent.images) {
        const imageUrls: string[] = [];
        for (const image of newContent.images) {
            const { url } = await put(image.name, image, { access: 'public' });
            imageUrls.push(url);
        }
        try {
            const content = currentContent.images ? {
                content: newContent.content,
                images: [...currentContent.images, ...imageUrls]
            } : {
                content: newContent.content,
                images: imageUrls
            }

            return await postDao.updateById(postId, visitorId, content, places);
        } catch (error) {
            await del(imageUrls);
            throw error;
        }
    } else {
        return await postDao.updateById(
            postId,
            visitorId,
            {
                content: newContent.content,
                images: currentContent.images
            },
            places
        );
    }
}