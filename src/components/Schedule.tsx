import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../lib/itemTypes";
import EmployeeDraggable from "./EmployeeDraggable";
import { Employee } from "@prisma/client";
import { employeesExample } from "../lib/employeeExample";
import { trpc } from "../utils/trpc";

function Schedule() {
  const addShift = trpc.employeeRouter.addEmployee.useMutation();
  const [firstShift, setFirstShift] = useState<Employee[] | null>();
  const [secondShift, setSecondShift] = useState<Employee[] | null>();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EMPLOYEE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  interface weekDaysType {
    id: string;
    name: string;
    employees?: Employee[] | null;
  }

  const weekDays: weekDaysType[] = [
    {
      id: "1",
      name: "Sunday",
      employees: firstShift,
    },
    {
      id: "2",
      name: "Monday",
      //   employees: employeesExample,
    },
    {
      id: "3",
      name: "Tuesday",
      //   employees: employeesExample,
    },
    {
      id: "4",
      name: "Wednesday",
      //   employees: employeesExample,
    },
    {
      id: "5",
      name: "Thursday",
      //   employees: employeesExample,
    },
    {
      id: "6",
      name: "Friday",
      //   employees: employeesExample,
    },
    {
      id: "7",
      name: "Suterday",
      //   employees: employeesExample,
    },
  ];

  return (
    <div className="mt-20 flex h-[550px] w-[1000px] self-center bg-gray-200">
      {weekDays.map((day) => {
        return (
          <>
            <div className="flex h-full w-1/6 flex-col border-r-2 border-blue-800 bg-blue-300">
              <h1 className=" pl-4 font-bold">{day.name}</h1>
              <div className="h-[47%]">
                <h1 className="border-t-[1px] border-blue-800  pl-4 font-bold">
                  {firstShift &&
                    firstShift.map((employee) => {
                      return (
                        <div>
                          <h1>{employee.firstName}</h1>
                        </div>
                      );
                    })}
                </h1>
              </div>
              <div className="h-[47%]">
                <h1 className="border-t-[1px] border-blue-800  pl-4 font-bold"></h1>
              </div>
            </div>
          </>
        );
      })}
      <button
        onClick={() => {
          addShift.mutate({ firstName: "ido", lastName: "Cohen" });
        }}
      >
        Add
      </button>
    </div>
  );
}

export default Schedule;
// function Schedule() {
//   return (
//     <div className="bg-gray-200 flex flex-col">

//     </div>
//   )
// }

// export default Schedule
