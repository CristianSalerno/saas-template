import { TRPCError } from "@trpc/server";
import { procedure } from "./trpc";

export const publicProcedure = procedure;

export const protectedProcedure = publicProcedure.use(async (opts) => {
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
