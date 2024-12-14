'use server';

import { adminDao } from "../dao/AdminDao";

export default async function getAdmins() {
    return await adminDao.findAllAdmins();
}