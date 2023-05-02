import { router } from "../trpc";
import { EmployeeRouter } from "./employeeRouter";
import { ScheduleRouter } from "./scheduleRouter";

export const appRouter = router({
  employeeRouter: EmployeeRouter,
  scheduleRouter: ScheduleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
