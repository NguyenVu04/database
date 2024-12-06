'use server';
import { getServerSession } from "next-auth";
import { options } from "./AuthOptions";
import { redirect } from "next/navigation";
import { adminDao } from "@/lib/dao/AdminDao";
import { userDao } from "@/lib/dao/UserDao";

export default async function loginIsRequired(
    roleRequired?: "admin" | "user"):
    Promise<{
        id: string | number,
        type: "admin" | "visitor" | "journalist" | "service_provider" | "tour_guide"
    } | null> {

    const session = await getServerSession(options);

    if ((!session || !session.user || !session.user.email) && roleRequired) {
        redirect("/signin");
    } else if (!session || !session.user || !session.user.email) {
        return null;
    }

    switch (roleRequired) {
        case "admin": {
            const admin = await adminDao.findAdmin(session?.user?.email);

            if (!admin) {
                redirect("/signin");
            }

            return {
                id: admin.id,
                type: "admin"
            }
        }
        case "user": {
            const user = await userDao.findIdByEmail(session?.user?.email);

            if (!user) {
                redirect("/signin");
            }

            return {
                id: user,
                type: "visitor"//TODO: add role
            }
        }
    }
    return null;
}