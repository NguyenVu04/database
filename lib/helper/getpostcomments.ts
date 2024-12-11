'use server'
import { postDao } from "../dao/PostDao";

export default async function getPostComments(postId: string, visitorId: string) {
    return await postDao.findPostComments(postId, visitorId);
}