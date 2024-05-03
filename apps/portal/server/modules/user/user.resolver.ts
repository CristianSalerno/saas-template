import { UserRole } from "@repo/database";
import { UserInfoInput } from "@repo/dto";
import { Logger } from "@repo/lib";
import { ContainerTokens, Inject, Resolver } from "@repo/trpc/container";
import { ProtectedContext } from "@repo/trpc/context";
import { AbstractResolver, ProcedureResolverOpts } from "@repo/trpc/resolver";
import { isAdmin } from "../../authz/is-admin.validator";
import { AllowedRoles } from "../../decorators/allowed-roles.decorator";
import { UserRepository } from "./user.repository";

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
