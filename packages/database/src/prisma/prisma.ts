import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";
import { DB_PROXY_PORT } from "../config/db-constants";
import { env } from "../config/env";

// import { env } from "../config/env";

// Ref: https://gal.hagever.com/posts/running-vercel-postgres-locally
// Ref: https://github.com/prisma/prisma/issues/21310#issuecomment-2025287113
// Ref: https://github.com/prisma/prisma/issues/21394#issuecomment-2046965977

// Getting the connection string from the environment
const connectionString = new URL(env.DATABASE_URL);

if (connectionString.hostname === "localhost") {
  // Disable TLS for local connections
  neonConfig.pipelineTLS = false;
  // Disable SSL for local connections
  neonConfig.useSecureWebSocket = false;
  // Set the WebSocket proxy to work with the local instance
  neonConfig.wsProxy = () => `localhost:${DB_PROXY_PORT}/v1`;
  // Set the port to the local Postgres port
  connectionString.port = DB_PROXY_PORT;
}

// Only Neon hosts support this -- non-deterministic errors otherwise
neonConfig.pipelineConnect = false;

// So it can also work in Node.js
neonConfig.webSocketConstructor = WebSocket ?? ws;

export const prisma = new PrismaClient({
  // TODO: Logging
  log: ["query", "info", "warn", "error"],
  adapter: new PrismaNeon(
    new Pool({
      connectionString: connectionString.toString(),
    }),
  ),
  datasources: {
    db: {
      url: connectionString.toString(),
    },
  },
});
