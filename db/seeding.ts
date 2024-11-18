import db from "./db";
import { journalists } from "./schema/journalist.schema";
import { posts } from "./schema/post.schema";
import { service_providers } from "./schema/serviceprovider.schema";
import { tour_guide } from "./schema/tourguide.schema";
import { insertUserSchema, users } from "./schema/user.schema";
import { visitors } from "./schema/visitor.schema";

async function main() {
    const newUsers = [
        {
            email: "testemail1@gmail.com",
            name: "John Doe124",
            date_of_birth: new Date('2002-01-01'),
            password: "admin",
            gender: "male",
        },
        {
            email: "testemail2@gmail.com",
            name: "John Doe124",
            date_of_birth: new Date('2001-01-01'),
            password: "admin",
            gender: "female",
        },
        {
            email: "testemail3@gmail.com",
            name: "John Doe124",
            date_of_birth: new Date('2000-01-01'),
            password: "admin",
            gender: "male",
        }
    ];

    for (const user of newUsers) {
        const validatedData = insertUserSchema.safeParse(user);

        if (!validatedData.success) {
            console.error(validatedData.error);
            return;
        }
        const result = await db.insert(users).values(validatedData.data).returning();
        await db.insert(journalists).values({id: result[0].id, date_of_employment: new Date('2013-01-01')});
        await db.insert(tour_guide).values({id: result[0].id});
        await db.insert(visitors).values({id: result[0].id});
        await db.insert(service_providers).values({id: result[0].id});
        await db.insert(posts).values({
            visitor: result[0].id,
            content: {content: "test content", mediaUrl: ["https://test.com", "https://test2.com"]}
        })
    };

    console.log("Database seeded");
}

main();