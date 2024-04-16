import type { Prisma } from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
  "emailVerified",
  "image",
  "role",
  "createdAt",
  "updatedAt",
]);

export const AccountScalarFieldEnumSchema = z.enum([
  "userId",
  "type",
  "provider",
  "providerAccountId",
  "refresh_token",
  "access_token",
  "expires_at",
  "token_type",
  "scope",
  "id_token",
  "session_state",
  "createdAt",
  "updatedAt",
]);

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  "identifier",
  "token",
  "expires",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const UserRoleSchema = z.enum(["User", "Admin"]);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleSchema,
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(
  z.object({
    accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  }),
);

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Account = z.infer<typeof AccountSchema>;

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations;

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> =
  AccountSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;
