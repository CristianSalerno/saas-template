import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { account } from "./account";

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    // change to cuid
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "string" }),
  image: text("image"),
  role: userRoleEnum("user_role"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
}));
