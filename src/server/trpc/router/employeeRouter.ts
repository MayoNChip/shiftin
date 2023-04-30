import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const EmployeeRouter = router({
  addEmployee: publicProcedure
    .input(z.object({ firstName: z.string(), lastName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.employee.create({
        data: { ...input },
      });
      // const result = await ctx.prisma.employee.create({data: {...input}})
      console.log(result);
      return "Great";
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const employeeList = await ctx.prisma.employee.findMany();
    console.log(employeeList);
    return employeeList;
  }),
});
