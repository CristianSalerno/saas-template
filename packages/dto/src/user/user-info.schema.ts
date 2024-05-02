import z from "zod";
import { UserSchema } from "@repo/database/zod";

export const UserInfoSchema = UserSchema.pick({
  email: true,
  id: true,
})
  .extend({
    email: UserSchema.shape.email.optional(),
    id: UserSchema.shape.id.optional(),
  })
  .refine((data) => data.id || data.email, {
    message: "Either id or email must be provided",
  })
  .optional();

export type UserInfoInput = z.infer<typeof UserInfoSchema>;
