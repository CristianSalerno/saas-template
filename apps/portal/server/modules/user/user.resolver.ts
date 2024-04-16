import { TRPCError } from "@trpc/server";
import { ZodType, ZodTypeAny, z } from "zod";
import { LoginQueryInput } from "@repo/common";
import { UserRole } from "@repo/database";
import { AbstractResolver, ProcedureResolverOpts, ProtectedContext } from "@repo/trpc";
import { Inject, Resolver } from "@repo/trpc/container";
import { UserRepository } from "./user.repository";
import { AllowedRoles } from "@/server/decorators/allowed-roles.decorator";

const PublicUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.enum([UserRole.Admin, UserRole.User]),
});

export type Method<D, A extends Array<any> = any[]> = (...args: A) => D;
export type AsyncMethod<D, A extends Array<any> = any[]> = (...args: A) => Promise<D>;
export type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export type Decorator<T> = (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<Method<any>>,
) => TypedPropertyDescriptor<Method<any>>;

// function Output<T = any, TOutput = any>() {
//   return (
//     target: T,
//     propertyKey: keyof T,
//     descriptor: PropertyDescriptor,
//   ): TypedPropertyDescriptor<Method<TOutput>> => {
//     const originalMethod = descriptor.value;
//     if (!originalMethod) {
//       throw new Error(`Method ${propertyKey.toString()} is not defined`);
//     }

//     descriptor.value = async function OutputDecorator<
//       TOutput = any,
//       A extends any[] = any[],
//     >() {
//       return async function OutputMapper(this: T, ...args: A): Promise<TOutput> {
//         const result = await originalMethod.apply(this, args);

//         return result;
//       };
//     };

//     return descriptor;
//   };
// }

// function Output<T = any, Schema extends ZodType<any> = ZodType<any>>(schema: Schema) {
//   type TOutput = z.infer<Schema>;

//   return (
//     target: T,
//     propertyKey: keyof T,
//     descriptor: PropertyDescriptor,
//   ): TypedPropertyDescriptor<Method<TOutput>> => {
//     const originalMethod = descriptor.value;
//     if (!originalMethod) {
//       throw new Error(`Method ${propertyKey.toString()} is not defined`);
//     }

//     descriptor.value = async function OutputDecorator<A extends any[] = any[]>() {
//       return async function OutputMapper(this: T, ...args: A): Promise<TOutput> {
//         const result = await originalMethod.apply(this, args);

//         // Parse the result with the Zod schema
//         const parsedResult = schema.safeParse(result);

//         if (!parsedResult.success) {
//           throw new Error(`Output of method ${propertyKey.toString()} is not valid`);
//         }

//         return parsedResult.data as TOutput;
//       };
//     };

//     return descriptor;
//   };
// }

@Resolver()
export class UserResolver extends AbstractResolver {
  constructor(@Inject(UserRepository) protected readonly userRepository: UserRepository) {
    super();
  }

  @AllowedRoles(UserRole.Admin, UserRole.User)
  // @Log(["input", "output"]) // Default: log all
  @Output(PublicUserSchema)
  async info({ ctx }: ProcedureResolverOpts<ProtectedContext, LoginQueryInput>) {
    // console.log("info input", ctx.session.user);

    const user = await this.userRepository.userInfo({ id: ctx.session.user.id });

    // console.log("info output", user);

    return user;
  }
}
