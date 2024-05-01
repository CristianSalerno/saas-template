import { TRPCError } from "@trpc/server";
import { UserRole } from "@repo/database";
import { Context } from "@repo/trpc/context";
import { ProcedureResolverOpts } from "@repo/trpc/resolver";

type DecoratedFunction<TContext, Input, Output> = (
  opts: ProcedureResolverOpts<TContext, Input>,
) => Output;

export function AllowedRoles<TContext, TInput>(...roles: UserRole[]) {
  return (...args: unknown[]) => {
    const descriptor = args[2] as PropertyDescriptor;
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      throw new Error("Decorator can only be applied to methods");
    }
    type InferredOutput =
      typeof originalMethod extends DecoratedFunction<TContext, TInput, infer TOutput>
        ? TOutput
        : never;

    descriptor.value = async function DecoratorAllowRoles(
      opts: ProcedureResolverOpts<Context>,
    ): Promise<InferredOutput> {
      const user = opts.ctx.session?.user;

      for await (const role of roles) {
        const isAllowed = user?.role === role;
        if (isAllowed) {
          return originalMethod.apply(this, [opts]);
        }
      }

      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to access this resource.",
      });
    };

    return descriptor;
  };
}
