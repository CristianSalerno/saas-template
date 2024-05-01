import { prisma } from "@repo/database/prisma";
import { ContainerTokens, Registry } from "@repo/trpc/container";

@Registry([
  {
    token: ContainerTokens.Prisma,
    useValue: prisma,
  },
])
export class AppModule {}
