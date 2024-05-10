import { PublicUserSchema, UserInfoSchema } from "@repo/dto";
import { protectedProcedure, router } from "@repo/trpc";
import { UserResolver } from "./user.resolver";

export const UserRouter = router({
  info: protectedProcedure
    .input(UserInfoSchema)
    .output(PublicUserSchema.nullable())
    .query(UserResolver.resolver("info")),
});
