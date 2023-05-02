import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const ScheduleRouter = router({
  initialSchdule: publicProcedure
    .input(
      // z.object({
      //   sunday: z.object({ index: z.number(), workDay: z.boolean() }),
      //   monday: z.object({ index: z.number(), workDay: z.boolean() }),
      //   tuesday: z.object({ index: z.number(), workDay: z.boolean() }),
      //   wendesday: z.object({ index: z.number(), workDay: z.boolean() }),
      //   thursday: z.object({ index: z.number(), workDay: z.boolean() }),
      //   friday: z.object({ index: z.number(), workDay: z.boolean() }),
      //   saturday: z.object({ index: z.number(), workDay: z.boolean() }),
      // }).array()
      z
        .array(
          z.object({ index: z.number(), day: z.string(), workDay: z.boolean() })
        )
        .max(7)
    )
    .mutation(async ({ input, ctx }) => {
      // Create new week of shifts for each day
      const dayInWeek = [0, 1, 2, 3, 4];
      // for (let day in input) {
      //   if (day) {
      //     ctx.prisma.firstShift.create({ data: { workDay: day.index } });
      //   }
      // }
     const workDays = await ctx.prisma.workDay.findMany()
     if(workDays.length < 1) {
       await ctx.prisma.workDay.createMany({data: [
         {day:'sunday'},
         {day:'monday'},
         {day:'tuesday'},
         {day:'wendesday'},
         {day:'thursday'},
         {day:'friday'},
         {day:'saturday'},
       ]})
     }
    input.filter(day => day.workDay === true).map( async (day) => {
      for (let workDay of workDays) {
        workDay.day === day.day && await ctx.prisma.firstShift.create({ data: { workDay: workDay } });
      }
      
    }) 
    }),

  setEmployeeToShift: publicProcedure
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
