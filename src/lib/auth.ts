import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "admin" | "client";
  }

  interface Session {
    user: User;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        loginType: { label: "Login Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        const loginType = (credentials.loginType as string) || "client";

        try {
          if (loginType === "admin") {
            // Try admin login
            const user = await prisma.user.findUnique({
              where: { email },
            });

            if (!user) {
              return null;
            }

            const isValid = await bcrypt.compare(password, user.passwordHash);

            if (!isValid) {
              return null;
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: "admin" as const,
            };
          } else {
            // Try client login
            const client = await prisma.client.findUnique({
              where: { email },
            });

            if (!client) {
              return null;
            }

            const isValid = await bcrypt.compare(password, client.passwordHash);

            if (!isValid) {
              return null;
            }

            return {
              id: client.id,
              email: client.email,
              name: client.name,
              role: "client" as const,
            };
          }
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "client";
      }
      return session;
    },
  },
  pages: {
    signIn: "/progress",
    error: "/progress",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  trustHost: true,
});

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
