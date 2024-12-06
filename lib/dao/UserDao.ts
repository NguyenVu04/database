'use server';
import db from "@/db/db";
import { users } from "@/db/schema/user.schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { User } from "@/db/schema/user.schema";
import { phone_numbers } from "@/db/schema/phonenumber.schema";

class UserDao {
    constructor() { }

    async findIdByEmail(email: string): Promise<string | null> {
        const result = await db.select({
            id: users.id
        })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        return result[0].id;
    }

    async findPhoneNumbersById(id: string): Promise<string[]> {
        const result = await db.select({
            phone_number: phone_numbers.phone_number
        })
            .from(phone_numbers)
            .where(eq(phone_numbers.user, id));

        return result.map((number) => number.phone_number);
    }

    async findById(userId: string): Promise<Omit<User, "password" | "id"> | null> {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const { password, id, ...userInfo } = getTableColumns(users);

        const user = await db.select({
            ...userInfo
        })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (user.length === 0) {
            return null;
        }

        const phone_numbers = await this.findPhoneNumbersById(userId);

        return {
            ...user[0],
            phone_numbers
        }
    }

    async updateById(id: string, data: Partial<Omit<User, "id">>): Promise<void> {
        const { phone_numbers: phoneNumbers, ...userInfo } = data;

        await db.update(users)
            .set(userInfo)
            .where(eq(users.id, id));

        if (phoneNumbers === undefined) {
            return;
        }

        const currentPhoneNumbers = await this.findPhoneNumbersById(id);

        for (const phoneNumber of phoneNumbers) {
            if (!currentPhoneNumbers.includes(phoneNumber)) {
                await db.insert(phone_numbers)
                    .values({
                        user: id,
                        phone_number: phoneNumber
                    })
            }
        }

        for (const phoneNumber of currentPhoneNumbers) {
            if (!phoneNumbers.includes(phoneNumber)) {
                await db.delete(phone_numbers)
                    .where(
                        and(
                            eq(phone_numbers.user, id),
                            eq(phone_numbers.phone_number, phoneNumber)
                        )
                    )
            }
        }
    }

    async deleteById(id: string): Promise<void> {
        await db.delete(users)
            .where(eq(users.id, id));
    }

    async create(data: Omit<User, "id">): Promise<string> {
        const { phone_numbers: phoneNumbers, ...userInfo } = data;

        const newUser = await db.insert(users)
            .values(userInfo)
            .returning();

        await db.insert(phone_numbers)
            .values(phoneNumbers.map(
                (number) => (
                    {
                        user: newUser[0].id,
                        phone_number: number
                    })));

        return newUser[0].id;
    }

    async authenticate(email: string, password: string): Promise<string | null> {
        const result = await db.select({
            id: users.id,
            password: users.password
        })
            .from(users)
            .where(and(
                eq(users.email, email),
                eq(users.password, sql`crypt(${password}, ${users.password})`)))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        return result[0].id;
    }
}

export const userDao = new UserDao();