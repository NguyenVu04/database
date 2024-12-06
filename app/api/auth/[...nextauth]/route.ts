import NextAuth from "next-auth";
import { options } from "../AuthOptions";

const handler = NextAuth(options);
export { handler as GET, handler as POST };