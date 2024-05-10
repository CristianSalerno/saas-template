import { router } from "@repo/trpc";
import { UserRouter } from "./modules";

export const AppRouter = router({
  user: UserRouter,
});
