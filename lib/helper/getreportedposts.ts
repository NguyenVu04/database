'use server';

import { adminDao } from "../dao/AdminDao";

export default async function getReportedPosts() {
    return await adminDao.findAllReports();
}