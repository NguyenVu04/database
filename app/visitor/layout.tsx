import Navbar from "@/app/visitor/component/navbar";
import loginIsRequired from "../api/auth/Session";
import { UserRole } from "@/lib/helper/userrole";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await loginIsRequired(UserRole.visitor);

    return (
        <div>
            <Navbar visitorId={session?.id ?? null} />
            <div className="h-16"></div>
            {children}
        </div>
    );
}