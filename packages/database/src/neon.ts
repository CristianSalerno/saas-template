import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DBEnv } from "@repo/common/server-env/db-env";
import * as schema from "./schema";

export const connection = neon(DBEnv.DATABASE_URL);

export const db = drizzle(connection, {
  schema,
  // TODO: Add logger
  logger: true,
});

export type Db = typeof db;
