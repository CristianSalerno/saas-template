import { prisma, PrismaClient } from "@repo/database/prisma";
import { Registry } from "@repo/trpc/container";

@Registry([
  {
    token: PrismaClient,
    useValue: prisma,
  },
])
export class AppModule {}
