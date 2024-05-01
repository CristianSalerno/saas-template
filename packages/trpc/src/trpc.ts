import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { Context } from "./context";

export { type Context, type ProtectedContext } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const router = t.router;
export const middleware = t.middleware;
export const procedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

export const protectedProcedure = procedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      session: ctx.session,
    },
  });
});
