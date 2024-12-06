import { adminDao } from "@/lib/dao/AdminDao";
import { userDao } from "@/lib/dao/UserDao";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
                role: {
                    label: "Role",
                    type: "text"
                }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                switch (credentials.role) {
                    case "admin":

                        const adminId = await adminDao.authenticate(credentials.username,
                            credentials.password);

                        if (!adminId) {
                            return null;
                        }

                        return {
                            id: adminId
                        }

                    case "user":

                        const userId = await userDao.authenticate(credentials.username,
                            credentials.password);

                        if (!userId) {
                            return null;
                        }

                        return {
                            id: userId
                        }

                    default:
                        return null;
                }
            }
        })
    ]
};