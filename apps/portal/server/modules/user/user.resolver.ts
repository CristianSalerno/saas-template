import { UserRole } from "@repo/database";
import { UserInfoInput } from "@repo/dto";
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
  async info({ ctx, input }: ProcedureResolverOpts<ProtectedContext, UserInfoInput>) {
    if (input && ctx.session?.user.role === UserRole.Admin) {
      return this.userRepository.userInfo(input);
    }

    return this.userRepository.userInfo({ id: ctx.session.user.id });
  }
}
