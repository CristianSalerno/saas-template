import z from "zod";

export const loginQuerySchema = z.object({
  email: z.string().email().optional(),
});

export type LoginQueryInput = z.infer<typeof loginQuerySchema>;
