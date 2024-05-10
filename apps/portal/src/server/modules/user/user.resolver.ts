import "reflect-metadata";
import { ContainerTokens } from "@repo/common/constants";
import { UserRole } from "@repo/database/dto";
import type { UserInfoInput } from "@repo/dto";
import type { Logger } from "@repo/lib";
import { Inject, Resolver } from "@repo/trpc/container";
import type { ProtectedContext } from "@repo/trpc/context";
import type { ProcedureResolverOpts } from "@repo/trpc/resolver";
import { AbstractResolver } from "@repo/trpc/resolver";
import { UserRepository } from "./user.repository";
import { isAdmin } from "@/server/authz/is-admin.validator";
import { AllowedRoles } from "@/server/decorators/allowed-roles.decorator";

@Resolver()
export class UserResolver extends AbstractResolver {
  constructor(
    @Inject(UserRepository) protected readonly userRepository: UserRepository,
    @Inject(ContainerTokens.Logger) protected readonly logger: Logger<unknown>,
  ) {
    super();

    this.logger = logger.getSubLogger({ name: "UserResolver" });
  }

  @AllowedRoles(UserRole.Admin, UserRole.User)
  async info({ ctx, input }: ProcedureResolverOpts<ProtectedContext, UserInfoInput>) {
    if (isAdmin(ctx)) {
      this.logger.info("Admin requested user info", { input });
      return this.userRepository.userInfo(input ? input : { id: ctx.session.user.id });
    }

    this.logger.info("User requested own info");
    return this.userRepository.userInfo({ id: ctx.session.user.id });
  }
}
