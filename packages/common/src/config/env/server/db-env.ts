import { z } from "zod";

const dbSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  DB_MIGRATING: z.string().optional(),
  DB_SEEDING: z.string().optional(),
});

export const parseDbEnv = () =>
  dbSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    DB_MIGRATING: process.env.DB_MIGRATING,
    DB_SEEDING: process.env.DB_SEEDING,
  });

export const DBEnv = dbSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  DB_MIGRATING: process.env.DB_MIGRATING,
  DB_SEEDING: process.env.DB_SEEDING,
});

export const dbEnv = dbSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  DB_MIGRATING: process.env.DB_MIGRATING,
  DB_SEEDING: process.env.DB_SEEDING,
});
