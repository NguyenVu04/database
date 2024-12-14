'use server';

import { adminDao } from "../dao/AdminDao";

export async function createAdmin(password: string) {
    return await adminDao.create({
        password
    });
}