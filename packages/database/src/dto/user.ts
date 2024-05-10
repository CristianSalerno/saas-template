import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { type z } from "zod";
import { user } from "../schema";

export const SelectUserSchema = createSelectSchema(user);

export const InsertUserSchema = createInsertSchema(user, {
  email: (schema) => schema.email.email(),
});

export type User = z.infer<typeof SelectUserSchema>;

export enum UserRole {
  Admin = "admin",
  User = "user",
}
