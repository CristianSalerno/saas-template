import { UserRole } from "@prisma/client";
import * as z from "zod";
import { CompleteAccount, RelatedAccountModel } from "./index";

export const UserModel = z.object({
  id: z.string(),
  name: z.string().min(1).nullish(),
  email: z.string().email(),
  emailVerified: z.date().nullish(),
  image: z.string().url().nullish(),
  role: z.nativeEnum(UserRole),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    accounts: RelatedAccountModel.array(),
  }),
);
