import db from "./db";
import { insertUserSchema, users } from "./schema/user.schema";

async function main() {
    const data = {
        email: "mzsssQ94aaas5R@example.com",
        name: "John Doe123",
        dob: new Date(),
        password: "admin",
        gender: "male",
    }

    const validatedData = insertUserSchema.safeParse(data);

    if (!validatedData.success) {
        console.error(validatedData.error);
        return;
    }

    await db.insert(users).values(validatedData.data);

    console.log("Database seeded");
}

main();