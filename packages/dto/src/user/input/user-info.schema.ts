import z from "zod";
import { UserModel } from "@repo/database/zod";

export const UserInfoSchema = UserModel.pick({
  email: true,
  id: true,
})
  .extend({
    email: UserModel.shape.email.optional(),
    id: UserModel.shape.id.optional(),
  })
  .refine((data) => data.id || data.email, {
    message: "Either id or email must be provided",
  })
  .optional();

export type UserInfoInput = z.infer<typeof UserInfoSchema>;
