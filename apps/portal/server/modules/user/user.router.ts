import { loginQuerySchema } from "@repo/common";
import { protectedProcedure, router } from "@repo/trpc";
import { UserResolver } from "./user.resolver";

export const UserRouter = router({
  info: protectedProcedure.input(loginQuerySchema).query(UserResolver.resolver("info")),
});
