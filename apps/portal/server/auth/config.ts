import { TRPCError } from "@trpc/server";
import {
  GoogleProvider,
  NextAuthConfig,
  PrismaAdapter,
  ResendProvider,
} from "@repo/auth";
import { User, UserRole } from "@repo/database";
import { prisma } from "@repo/database/prisma";
import { ApiEnv } from "@/config/env/server";
import { getUserInfo } from "../actions/user";

export const authConfig: NextAuthConfig = {
  debug: true, // ENV
  // useSecureCookies: ApiEnv.,
  session: {
    strategy: "jwt",
  },
  pages: {
    verifyRequest: "/verify-request",
    // TODO: change these to your own pages
    // signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: "/auth/new-user",
  },
  secret: ApiEnv.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: ApiEnv.AUTH_GOOGLE_ID,
      clientSecret: ApiEnv.AUTH_GOOGLE_SECRET,
      // The users have to be created before they can sign in
      // So we need to allow linking as there's no account created yet
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        // const user = await server.user.info({
        //   email: profile.email,
        // });
        const user = await getUserInfo({ email: profile.email });

        return {
          // Id is required Ref: https://stackoverflow.com/questions/76758385/nextauth-secondth-time-signing-in-with-the-same-google-account-oauthaccountno
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          role: user?.role ?? UserRole.User,
        };
      },
    }),
    ResendProvider({
      apiKey: ApiEnv.AUTH_RESEND_KEY,
      from: "onboarding@resend.dev",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, email, profile }) {
      let dbUser: User | null = null;
      // OAuth provider: it contains the full OAuth profile returned by your provider.
      // The user must have been created previously
      if (profile?.email && user) {
        dbUser = await getUserInfo({ email: profile.email });

        if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

        return true;
      }

      // Email link: it is the first step of the email sign in flow.
      if (email?.verificationRequest && user.email) {
        dbUser = dbUser ? dbUser : await getUserInfo({ email: user.email });
        if (!dbUser?.role) return false;
        //
      }

      if (user) return true;

      return false;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        // @ts-expect-error -- TODO: fix this type issue
        token.userId = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.userId;
      return session;
    },
  },
} satisfies NextAuthConfig;
