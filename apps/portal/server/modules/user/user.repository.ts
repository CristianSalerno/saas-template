import { User } from "@repo/database";
import { PrismaClient } from "@repo/database/prisma";
import { ContainerTokens, Inject, Repository } from "@repo/trpc/container";

@Repository()
export class UserRepository {
  constructor(@Inject(ContainerTokens.Prisma) readonly prisma: PrismaClient) {}

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
