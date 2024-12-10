'use server';

import { Post, postDao } from "../dao/PostDao";

export default async function findAllPosts(page: number, limit: number): Promise<Post[]> {
    return postDao.findAll(page, limit);
}