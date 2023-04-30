import { router } from "../trpc";
import { EmployeeRouter } from "./employeeRouter";

export const appRouter = router({
  employeeRouter: EmployeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
