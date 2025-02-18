import NextAuth from "next-auth";
import type { Session, User } from "next-auth";
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [Google],
})