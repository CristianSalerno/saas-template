import { ProcedureResolverOptions } from "@trpc/server/unstable-core-do-not-import";
import { InjectionToken } from "../container";
import { Context } from "../context";

type FunctionKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We need to use `any` here for type inference
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type ProcedureResolverOpts<
  TContext = Context,
  Input = unknown,
> = ProcedureResolverOptions<TContext, unknown, unknown, Input>;

export abstract class AbstractResolver {
  static resolver<T extends AbstractResolver, Method extends FunctionKeys<T>>(
    this: InjectionToken<T>,
    name: Method,
  ) {
    return (opts: ProcedureResolverOptions<Context, unknown, unknown, unknown>) => {
      const instance = opts.ctx.container.resolve<T>(this);

      if (typeof instance[name] === "function") {
        // @ts-expect-error -- The type of `name` is a string, but we know it's a key of `T`
        return instance[name](opts) as ReturnType<T[Method]>;
      }

      throw new Error(`Method ${name.toString()} is not a function`);
    };
  }
}
