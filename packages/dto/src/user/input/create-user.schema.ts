import { UserModel } from "@repo/database/zod";

export const CreateUserSchema = UserModel.pick({
  email: true,
  name: true,
  role: true,
  image: true,
});
