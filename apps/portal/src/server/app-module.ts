import { ContainerTokens } from "@repo/common/constants";
import { db } from "@repo/database/neon";
import { logger } from "@repo/lib";
import { Registry } from "@repo/trpc/container";

@Registry([
  {
    token: ContainerTokens.Db,
    useValue: db,
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
