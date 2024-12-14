'use server';

import { adminDao } from "../dao/AdminDao";

export default async function deleteAdmin(id: string) {
    return await adminDao.deleteById(id);
}