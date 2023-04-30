import React, { useContext, useEffect } from "react";
import { trpc } from "../utils/trpc";
import { EmployeeContext } from "../context/EmployeeContext";

function EmployeeList() {
  const employeeContext = useContext(EmployeeContext);

  //   console.log(employeeContext?.employeeList);
  const employeeList = trpc.employeeRouter.getAll.useQuery();

  return (
    <div className="mt-20 flex h-full w-1/2 flex-col gap-y-6 self-center bg-gray-200 p-4">
      {employeeContext?.employeeList?.map((employee) => (
        <div>
          <h2>{employee.id}</h2>
          <h2>{employee.firstName}</h2>
          <h2>{employee.lastName}</h2>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
