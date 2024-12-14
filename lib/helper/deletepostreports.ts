'use server';

import { adminDao } from "../dao/AdminDao";

export default async function deletePostReports(postId: string, visitorId: string) {
    return await adminDao.deletePostReports(postId, visitorId);
}