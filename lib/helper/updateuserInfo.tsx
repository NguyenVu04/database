'use server';
import { User } from "@/db/schema/user.schema";
import { userDao } from "../dao/UserDao";

export default async function updateUserInfo(
    userId: string, 
    data: Partial<Omit<User, "id">>
) {
    return await userDao.updateById(userId, data);
}