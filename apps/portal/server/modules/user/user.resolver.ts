import { LoginQueryInput } from "@repo/common";
import { UserRole } from "@repo/database";
import { Inject, Resolver } from "@repo/trpc/container";
import { ProtectedContext } from "@repo/trpc/context";
import { AbstractResolver, ProcedureResolverOpts } from "@repo/trpc/resolver";
import { AllowedRoles } from "../../decorators/allowed-roles.decorator";
import { UserRepository } from "./user.repository";

@Resolver()
export class UserResolver extends AbstractResolver {
  constructor(@Inject(UserRepository) protected readonly userRepository: UserRepository) {
    super();
  }

  @AllowedRoles(UserRole.Admin, UserRole.User)
  async info({ ctx }: ProcedureResolverOpts<ProtectedContext, LoginQueryInput>) {
    return this.userRepository.userInfo({ id: ctx.session.user.id });
  }
}
