import "reflect-metadata";
import { cache } from "react";
import { createCallerFactory } from "@repo/trpc";
import { createContext } from "./app-context";
import { AppRouter } from "./app-router";

export const caller = createCallerFactory(AppRouter);
export const server = caller(cache(async () => createContext()));
