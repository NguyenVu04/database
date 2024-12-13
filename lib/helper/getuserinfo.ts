'use server';

import { userDao } from "../dao/UserDao";

export default async function getUserInfo(userId: string) {
    return await userDao.findById(userId);
}