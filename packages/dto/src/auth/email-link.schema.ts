import z from "zod";
import { UserSchema } from "@repo/database/zod";

export const EmailLinkSchema = UserSchema.pick({
  email: true,
}).extend({
  email: UserSchema.shape.email.email(),
});

export type EmailLinkInput = z.infer<typeof EmailLinkSchema>;
