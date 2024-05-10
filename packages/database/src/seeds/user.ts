import { type Db } from "../neon";
import * as schema from "../schema";
import users from "./data/user.json";

export default async function seed(db: Db) {
  await Promise.all(
    users.map(async (user) => {
      await db
        .insert(schema.user)
        .values({
          ...user,
          emailVerified: new Date().toISOString(),
        })
        .returning();
    }),
  );
}
