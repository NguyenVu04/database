import db from "@/db/db";
import { users } from "@/db/schema/user.schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { User } from "@/db/schema/user.schema";
import { phone_numbers } from "@/db/schema/phonenumber.schema";
import { visitors } from "@/db/schema/visitor.schema";
import { journalists } from "@/db/schema/journalist.schema";
import { service_providers } from "@/db/schema/serviceprovider.schema";
import { tour_guide } from "@/db/schema/tourguide.schema";
import { UserRole } from "../helper/userrole";
import { reports } from "@/db/schema/report.schema";

class UserDao {
    constructor() { }

    async findCredentials(email: string, role: UserRole): Promise<string | null> {
        const user = await db.execute(sql`SELECT find_user_credentials(${email}, ${role}) AS user_id;`);
        if (user.rowCount === 0) {
            return null;
        }
        return user.rows[0].user_id as string;
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

    async create(data: Omit<User, "id">, role: UserRole): Promise<string> {
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
       
        switch (role) {
            case UserRole.visitor:{
                await db.insert(visitors)
                    .values({
                        id: newUser[0].id
                    });

                break;
            }

            case UserRole.journalist: {
                await db.insert(journalists)
                    .values({
                        id: newUser[0].id,
                        date_of_employment: new Date()
                    });

                break;
            }

            case UserRole.serviceProvider: {
                await db.insert(service_providers)
                    .values({
                        id: newUser[0].id
                    });

                break;
            }

            case UserRole.tourGuide: {
                await db.insert(tour_guide)
                    .values({
                        id: newUser[0].id
                    });

                break;
            }
        }

        return newUser[0].id;
    }

    async authenticate(email: string, password: string): Promise<string | null> {
        const result = await db.select({
            id: users.id,
            email: users.email,
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

        return email;
    }

    async reportPost(visitorId: string, postId: string, reporterId: string): Promise<boolean> {
        const reportList = await db.select()
            .from(reports)
            .where(and(
                eq(reports.post, postId),
                eq(reports.visitor, visitorId),
                eq(reports.reporter, reporterId)
            ));

        if (reportList.length > 0) {
            return false;
        }

        await db.insert(reports)
            .values({
                post: postId,
                visitor: visitorId,
                reporter: reporterId
            });

        return true;
    }
}

export const userDao = new UserDao();