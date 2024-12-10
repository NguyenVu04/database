'use server';
import { postDao } from "../dao/PostDao";

export default async function deletePost(id: string, userId: string) {
    return postDao.deleteById(id, userId);
}