import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      followingIds?: string[];
      coverImage?: string;
      profileImage?: string;
      hasNotification?: boolean;
      // Add other user fields as necessary
    };
    accessToken?: string; // Include access token if needed
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials?.email);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user?.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid Password");
        }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }: any) {
      // If user logs in, save the token from the backend
      if (user) {
        token.accessToken = user?.token; // Assign the token from backend to the JWT token
        token.user = user; // Optional: Include user data for use in the session callback
      }
      if (trigger === "update") {
        token.user = session?.user;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken; // Include the token in the session
        session.user = token.user; // Optional: Include user data in the session
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt" as const,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
export default NextAuth(authOptions);
