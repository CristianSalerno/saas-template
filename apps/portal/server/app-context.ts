import { TRPCError } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { v4 as generateUuidV4 } from "uuid";
import {
  HEADER_ALLOW_CREADENTIALS,
  HEADER_ALLOW_HEADERS,
  HEADER_ALLOW_METHODS,
  HEADER_ALLOW_ORIGIN,
  HEADER_REFERRER_POLICY,
  HEADER_REQUEST_ID,
} from "@repo/trpc/constants";
import { Container, ContainerTokens } from "@repo/trpc/container";
import { auth } from "./auth";

export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  // This is a server-side request
  if (!opts) {
    const currentSession = await auth();

    const container = Container.createChildContainer().register(
      ContainerTokens.RequestId,
      {
        useValue: `server_${generateUuidV4()}`,
      },
    );

    return {
      container,
      session: currentSession,
    };
  }

  // This is a client-side request
  const requestId = opts.req.headers.get(HEADER_REQUEST_ID);
  if (!requestId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Missing request ID",
    });
  }

  // Apply header with unique ID to every request
  opts.resHeaders.set(HEADER_REQUEST_ID, requestId);
  // Add all headers here instead of next.config.js as it is throwing error( Cannot set headers after they are sent to the client) for OPTIONS method
  // It is known to happen only in Dev Mode.
  opts.resHeaders.set(HEADER_ALLOW_CREADENTIALS, "true");
  opts.resHeaders.set(HEADER_ALLOW_ORIGIN, "*");
  opts.resHeaders.set(HEADER_ALLOW_METHODS, "GET, OPTIONS, PATCH, DELETE, POST, PUT");
  opts.resHeaders.set(
    HEADER_ALLOW_HEADERS,
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type, api_key, Authorization",
  );
  opts.resHeaders.set(HEADER_REFERRER_POLICY, "no-referrer");

  const container = Container.createChildContainer().register(ContainerTokens.RequestId, {
    useValue: requestId,
  });

  return {
    ...opts,
    container,
    // @ts-expect-error -- need to extends FetchCreateContextFnOptions
    session: opts.req.auth ? opts.req.auth : await auth(),
  };
};
