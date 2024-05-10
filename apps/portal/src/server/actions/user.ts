"use server";

import { eq } from "@repo/database";
import { db } from "@repo/database/neon";
import { user } from "@repo/database/schema";

export const getUserInfo = async ({ email }: { email: string }) => {
  return db.query.user.findFirst({
    where: eq(user.email, email),
  });
};
