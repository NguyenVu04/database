import db from "@/db/db";
import { Admin, admins } from "@/db/schema/admin.schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

class AdminDao {
    constructor() {}

    async findAdmin(id: string): Promise<Omit<Admin, "password"> | null> {
        const adminPrefix = process.env.ADMIN_PREFIX ?? "ADMIN";

        const adminNo = Number(id.replace(adminPrefix, ""));

        /* eslint-disable @typescript-eslint/no-unused-vars */
        const {password, ...adminInfo} = getTableColumns(admins);

        const result = await db.select({
            ...adminInfo
        })
            .from(admins)
            .where(eq(admins.id, adminNo))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async findAllAdmins(): Promise<Omit<Admin, "password">[]> {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const {password, ...adminInfo} = getTableColumns(admins);

        const result = await db.select({
            ...adminInfo
        })
            .from(admins);

        return result;
    }

    async deleteById(id: string): Promise<void> {
        const adminNo = Number(id.replace(process.env.ADMIN_PREFIX ?? "ADMIN", ""));

        await db.delete(admins)
            .where(eq(admins.id, adminNo));
    }

    async create(data: Omit<Admin, "id">): Promise<string> {
        const newAdmin = await db.insert(admins)
            .values(data)
            .returning();

        return `${process.env.ADMIN_PREFIX ?? "ADMIN"}${newAdmin[0].id}`;
    }

    async updateById(id: string, data: Partial<Omit<Admin, "id">>): Promise<void> {
        const adminNo = Number(id.replace(process.env.ADMIN_PREFIX ?? "ADMIN", ""));

        await db.update(admins)
            .set(data)
            .where(eq(admins.id, adminNo));
    }

    async authenticate(id: string, password: string): Promise<string | null> {
        const adminPrefix = process.env.ADMIN_PREFIX ?? "ADMIN";

        const adminNo = Number(id.replace(adminPrefix, ""));

        const result = await db.select({password: admins.password})
            .from(admins)
            .where(and(eq(admins.id, adminNo), eq(admins.password, sql`crypt(${password}, ${admins.password})`)))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        return id;
    } 
}

export const adminDao = new AdminDao();