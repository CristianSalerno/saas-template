import z from "zod";
import { UserModel } from "@repo/database/zod";

export const EmailLinkSchema = UserModel.pick({
  email: true,
});

export type EmailLinkInput = z.infer<typeof EmailLinkSchema>;
