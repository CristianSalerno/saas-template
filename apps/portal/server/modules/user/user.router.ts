import { UserInfoSchema } from "@repo/dto";
import { protectedProcedure, router } from "@repo/trpc";
import { UserResolver } from "./user.resolver";

export const UserRouter = router({
  info: protectedProcedure.input(UserInfoSchema).query(UserResolver.resolver("info")),
});
