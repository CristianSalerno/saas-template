import { DependencyContainer } from "tsyringe";
import { Session } from "@repo/auth";

export type Context = {
  container: DependencyContainer;
  session: Session | null;
};

export type ProtectedContext = Context & {
  session: Session;
};
