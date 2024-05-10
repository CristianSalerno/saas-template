import { UserRole } from "@repo/database/dto";
import type { ProcedureResolverOpts } from "@repo/trpc/resolver";

export function isAdmin(ctx: ProcedureResolverOpts["ctx"]) {
  return ctx.session?.user.role === UserRole.Admin;
}
