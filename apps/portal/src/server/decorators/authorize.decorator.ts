// import { TRPCError } from "@trpc/server";
// import { ProcedureResolverOpts } from "@repo/trpc";

// // function IsUser(opts: ProcedureResolverOpts<ProtectedContext>) {
// //     return opts.ctx.session.user.role === UserRole.User;
// //   }

// //   function IsAdmin(opts: ProcedureResolverOpts<ProtectedContext>) {
// //     return opts.ctx.session.user.role === UserRole.Admin;
// //   }

// type ValidatorFunction<TContext, TInput> = (
//   opts: ProcedureResolverOpts<TContext, TInput>,
// ) => Promise<boolean> | boolean;

// type DecoratedFunction<TContext, Input, Output> = (
//   opts: ProcedureResolverOpts<TContext, Input>,
// ) => Output;

// export function AllowedRoles<TContext, TInput>(
//   ...or: Array<ValidatorFunction<TContext, TInput>>
// ) {
//   return (...args: unknown[]) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We want TypeScript to infer the type
//     const descriptor = args[2] as TypedPropertyDescriptor<any>;
//     const originalMethod = descriptor.value;

//     if (!originalMethod) {
//       throw new Error("Decorator can only be applied to methods");
//     }
//     type InferredOutput =
//       typeof originalMethod extends DecoratedFunction<TContext, TInput, infer TOutput>
//         ? TOutput
//         : never;

//     descriptor.value = async function AutorizeIfAnyConditionMeets(
//       opts: ProcedureResolverOpts<TContext, TInput>,
//     ): Promise<InferredOutput> {
//       for await (const validator of or) {
//         const isSuccessful = await validator(opts);
//         if (isSuccessful) {
//           return originalMethod.apply(this, [opts]);
//         }
//       }

//       throw new TRPCError({
//         code: "FORBIDDEN",
//         message: "You are not allowed to access this resource.",
//       });
//     };

//     return descriptor;
//   };
// }
