import { UserSchema } from "@repo/database/zod";

export const CreateUserSchema = UserSchema.pick({
  email: true,
  name: true,
  role: true,
  image: true,
}).extend({
  name: UserSchema.shape.name.unwrap().min(1),
  image: UserSchema.shape.image.unwrap().url(),
});
