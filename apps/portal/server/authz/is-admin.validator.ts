import { UserRole } from "@repo/database";
import { ProcedureResolverOpts } from "@repo/trpc/resolver";

export function isAdmin(ctx: ProcedureResolverOpts["ctx"]) {
  if (ctx.session?.user.role === UserRole.Admin) {
    return true;
  }

  return false;
}
