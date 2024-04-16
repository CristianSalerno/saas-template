"use server";

import { prisma } from "@repo/database/prisma";

export const getUserInfo = async ({ email }: { email: string }) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};
