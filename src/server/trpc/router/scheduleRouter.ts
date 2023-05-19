import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
      // z.object({
      //   monthWeek: z.object({ week: z.number(), month: z.string() }),
      //   weekWorkDays:
      z
        .array(
          z.object({
            // index: z.number(),
            day: z.string(),
            active: z.boolean(),
          })
        )
        .max(7)
      // })
    )
    .mutation(async ({ input, ctx }) => {
      // Create new week of shifts for each day
      const dayInWeek = [0, 1, 2, 3, 4];

      const workDays = await ctx.prisma.workDay.findMany();
      if (workDays.length < 1) {
        await ctx.prisma.workDay.createMany({
          data: [
            {
              day: "sunday",
              // week: input.monthWeek.week,
              // month: input.monthWeek.month,
              active: false,
            },
            {
              day: "monday",
              // week: input.monthWeek.week,
              // month: input.monthWeek.month,
              active: false,
            },
            {
              day: "tuesday",
              // week: input.monthWeek.week,
              // month: input.monthWeek.month,
              active: false,
            },
            {
              day: "wednesday",
              // week: input.monthWeek.week,
              // month: input.monthWeek.month,
              active: false,
            },
            {
              day: "thursday",
              // week: input.monthWeek.week,
              // month: input.monthWeek.month,
              active: false,
            },
            {
              day: "friday",
              // week: input.monthWeek.week,
              // month: input.monthWeek.month,
              active: false,
            },
            {
              day: "saturday",
              // week: input.monthWeek.week,
              // month: input.monthWeek.month,
              active: false,
            },
          ],
        });
      }
      const workDaysAfterInitialize = await ctx.prisma.workDay.findMany();

      const insertedShifts = input.filter((day) => day.active === true);
      console.log("after filter", insertedShifts);
      insertedShifts.map(async (day) => {
        workDaysAfterInitialize.length > 0 &&
          workDaysAfterInitialize.map(async (workDay) => {
            if (workDay.day === day.day) {
              console.log(day.day, "Inserted");
              await ctx.prisma.shift.create({
                data: {
                  workDayId: workDay.id,
                  // startDate: new Date(),
                  // endDate: new Date(),
                  shiftTypeId: 1,
                },
              });
            } else return;
          });
      });
    }),

  createNewSchedule: publicProcedure
    .input(
      z
        .object({
          shiftTypeId: z.number(),
          workDayId: z.number(),
        })
        .array()
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.shift.createMany({ data: [...input] });
    }),
  createShiftType: publicProcedure
    .input(
      z.object({
        shiftName: z.string(),
        startTime: z.date(),
        endTime: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const duplicateType = (await ctx.prisma.shiftType.findMany()).filter(
        (shift) => {
          shift.shiftType === input.shiftName;
        }
      );

      if (duplicateType.length > 0) {
        return new TRPCError({
          message: "this shift type already exists",
          code: "CONFLICT",
        });
      }

      const addShiftResult = await ctx.prisma.shiftType.create({
        data: {
          shiftType: input.shiftName,
          startTime: input.startTime,
          endTime: input.endTime,
        },
      });
      return addShiftResult;
    }),

  setEmployeeToShift: publicProcedure
    .input(z.object({ firstName: z.string(), lastName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.employee.create({
        data: { ...input, role: 1 },
      });
      // const result = await ctx.prisma.employee.create({data: {...input}})
      console.log(result);
      return "Great";
    }),
  getAllShiftTypes: publicProcedure.query(async ({ ctx }) => {
    const shiftTypes = await ctx.prisma.shiftType.findMany();
    console.log(shiftTypes);
    return shiftTypes;
  }),
  getWorkingDays: publicProcedure.query(async ({ ctx }) => {
    const workDays = await ctx.prisma.workDay.findMany({
      where: { active: true },
      orderBy: { id: "asc" },
    });
    console.log(workDays);
    return workDays;
  }),
});
