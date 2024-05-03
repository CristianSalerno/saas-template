import { User } from "@repo/database";
import { PrismaClient } from "@repo/database/prisma";
import { Logger } from "@repo/lib";
import { ContainerTokens, Inject, Repository } from "@repo/trpc/container";
import { LogDuration } from "../../decorators/log-duration.decorator";

@Repository()
export class UserRepository {
  constructor(
    @Inject(ContainerTokens.Prisma) readonly prisma: PrismaClient,
    @Inject(ContainerTokens.Logger) protected readonly logger: Logger<unknown>,
  ) {
    this.logger = logger.getSubLogger({ name: "UserRepository" });
  }

  @LogDuration()
  async userInfo(input: Partial<Pick<User, "id" | "email">>) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: input.email,
          },
          {
            id: input.id,
          },
        ],
      },
    });
  }
}
