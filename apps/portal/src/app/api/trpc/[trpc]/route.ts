import "reflect-metadata";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { cache } from "react";
import { createContext } from "@/server/app-context";
import { AppRouter } from "@/server/app-router";
import { auth } from "@/server/auth";

export const dynamic = "force-dynamic";

const handler: ReturnType<typeof auth> = cache(
  auth(async (req) => {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      router: AppRouter,
      req,
      createContext,
    });
  }),
);

export { handler as GET, handler as POST };
