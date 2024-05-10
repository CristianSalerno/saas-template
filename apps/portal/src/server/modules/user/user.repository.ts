import { ContainerTokens } from "@repo/common/constants";
import { eq } from "@repo/database";
import { type Db } from "@repo/database/neon";
import { user } from "@repo/database/schema";
import { type UserInfoInput } from "@repo/dto";
import type { Logger } from "@repo/lib";
import { Inject, Repository } from "@repo/trpc/container";
import { LogDuration } from "@/server/decorators/log-duration.decorator";

@Repository()
export class UserRepository {
  constructor(
    @Inject(ContainerTokens.Db) readonly db: Db,
    @Inject(ContainerTokens.Logger) protected readonly logger: Logger<unknown>,
  ) {
    this.logger = logger.getSubLogger({ name: "UserRepository" });
  }

  @LogDuration()
  async userInfo(input: NonNullable<UserInfoInput>) {
    if (input.email) {
      const result = await this.db.query.user.findFirst({
        where: eq(user.email, input.email),
      });

      return result ?? null;
    }

    if (input.id) {
      const result = await this.db.query.user.findFirst({
        where: eq(user.id, input.id),
      });

      return result ?? null;
    }

    throw new Error(`UserRepository: Invalid input for userInfo ${this.userInfo.name}`);
  }
}
