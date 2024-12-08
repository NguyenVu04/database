'use server';
import { UserRole } from "@/lib/helper/userrole";
import loginIsRequired from "../api/auth/Session";

export default async function Page() {
    const session = await loginIsRequired(UserRole.visitor);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            {session?.id ?? "not logged in"}
        </div>
    )
}