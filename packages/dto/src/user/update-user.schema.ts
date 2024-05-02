import { UserSchema } from "@repo/database/zod";

export const UpdateUserSchema = UserSchema.pick({
  id: true,
  name: true,
  image: true,
}).extend({
  name: UserSchema.shape.name.unwrap().min(1),
  image: UserSchema.shape.image.unwrap().url(),
});
