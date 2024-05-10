import { InsertUserSchema } from "@repo/database/dto";

export const UpdateUserSchema = InsertUserSchema.pick({
  id: true,
  name: true,
  image: true,
}).extend({
  id: InsertUserSchema.shape.id.unwrap().min(1),
});
