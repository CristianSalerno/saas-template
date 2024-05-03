import { prisma } from "@repo/database/prisma";
import { logger } from "@repo/lib";
import { ContainerTokens, Registry } from "@repo/trpc/container";

@Registry([
  {
    token: ContainerTokens.Prisma,
    useValue: prisma,
  },
  {
    token: ContainerTokens.Logger,
    useFactory: (container) =>
      logger.getSubLogger(
        { name: "Container" },
        {
          requestId: container.resolve(ContainerTokens.RequestId),
          userId: container.resolve(ContainerTokens.UserId),
        },
      ),
  },
])
export class AppModule {}
