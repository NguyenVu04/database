import { adminDao } from "@/lib/dao/AdminDao";
import { userDao } from "@/lib/dao/UserDao";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "username",
                    type: "text"
                },
                password: {
                    label: "password",
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

                        const adminId = await adminDao.authenticate(credentials.email,
                            credentials.password);

                        if (!adminId) {
                            return null;
                        }

                        return {
                            email: adminId,
                        } as User

                    case "user":

                        const userId = await userDao.authenticate(credentials.email,
                            credentials.password);

                        if (!userId) {
                            return null;
                        }

                        return {
                            email: userId,
                        } as User

                    default:
                        return null;
                }
            }
        })
    ],

    pages: {
        signIn: "/signin",
        signOut: "/signout"
    }
};