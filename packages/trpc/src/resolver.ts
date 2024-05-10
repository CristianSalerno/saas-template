/* eslint-disable @typescript-eslint/no-explicit-any -- We need to use `any` here for type inference */
import { type ProcedureResolverOptions } from "@trpc/server/unstable-core-do-not-import";
import { type InjectionToken } from "./container";
import { type Context } from "./context";

type FunctionKeys<T> = {
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
      const fn = instance[name];

      if (typeof fn === "function") {
        return fn(opts) as T[Method] extends infer ClassMethod extends (
          ...args: any[]
        ) => any
          ? ReturnType<ClassMethod>
          : never;
      }

      throw new Error(`Method ${name.toString()} is not a function`);
    };
  }
}
