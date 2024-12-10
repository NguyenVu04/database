'use server';
import { userDao } from "../dao/UserDao";

export default async function reportPost(visitorId: string, postId: string, reporterId: string): Promise<boolean> {
    return userDao.reportPost(visitorId, postId, reporterId);
}