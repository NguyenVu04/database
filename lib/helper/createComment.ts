'use server';
import { postDao } from "../dao/PostDao";

export default async function createComment(
    postId: string,
    visitorId: string,
    content: string,
    senderId: string
) {
    await postDao.createPostComment(postId, visitorId, content, senderId);
}