'use server';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { adminDao } from "@/lib/dao/AdminDao";
import { userDao } from "@/lib/dao/UserDao";
import { options } from "./authoptions";
import { UserRole } from "@/lib/helper/userrole";

export default async function loginIsRequired(
    roleRequired?: UserRole | "admin"):
    Promise<{
        id: string | number,
        role: UserRole | "admin"
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
                role: "admin"
            }
        }
        case "visitor": 
        case "journalist":
        case "service_provider":
        case "tour_guide": {
            const user = await userDao.findCredentials(session?.user?.email, roleRequired);

            if (!user) {
                redirect("/signin");
            }

            return {
                id: user,
                role: roleRequired
            }
        }
    }
    return null;
}