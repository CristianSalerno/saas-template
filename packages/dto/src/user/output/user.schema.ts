import { UserModel } from "@repo/database/zod";

export const PublicUserSchema = UserModel.pick({
  id: true,
  name: true,
  email: true,
  image: true,
  role: true,
  createdAt: true,
});
