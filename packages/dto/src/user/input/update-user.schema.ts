import { UserModel } from "@repo/database/zod";

export const UpdateUserSchema = UserModel.pick({
  id: true,
  name: true,
  image: true,
});
