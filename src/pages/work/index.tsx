import { Autocomplete, Button, Select, TextField } from "@mui/material";
import Card from "../../components/Schedule";
import CreateNewScheduleModal from "../../components/CreateNewScheduleModal";
import { ChangeEvent, useState } from "react";
import { trpc } from "../../utils/trpc";
import EmployeeList from "../../components/EmployeeList";

type Schedule = {
  workDayId: number;
  employeeId: string;
  shiftTypeId: number;
}[];

function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const workDays = trpc.scheduleRouter.getWorkingDays.useQuery();
  const shiftTypes = trpc.scheduleRouter.getAllShiftTypes.useQuery();
  const createNewShift = trpc.scheduleRouter.createNewSchedule.useMutation();
  const [newShift, setNewShift] =
    useState<{ shiftTypeId: number; workDayId: number }[]>();
  const employees = trpc.employeeRouter.getAll.useQuery();
  const assignEmployee = trpc.scheduleRouter.setEmployeeToShift.useMutation();
  const [schedule, setSchedule] = useState<Schedule>([]);

  const setEmployeeToShift = async () => {
    console.log("setting employees");
    schedule.map(
      async (shift) =>
        await assignEmployee.mutateAsync({
          employeeId: shift.employeeId,
          shiftTypeId: shift.shiftTypeId,
          workDayId: shift.workDayId,
        })
    );
  };

  const handleAssignEmployee = (
    workDayId: number,
    shiftTypeId: number,
    employeeId: string
  ) => {
    console.log(workDayId, shiftTypeId, employeeId);
    const employeeToAdd = {
      workDayId,
      shiftTypeId,
      employeeId,
    };
    setSchedule([...schedule, employeeToAdd]);
  };
  console.log(schedule);

  // const handleCreateNewSchedule = async () => {
  //   if (!workDays.data || !shiftTypes.data) {
  //     return;
  //   }
  //   const daysToCreate = workDays.data
  //     ?.filter((day) => day.active)
  //     .map((day) => {
  //       // return shiftTypes.data.map((type) => {
  //       //   return { shiftTypeId: type.id, workDayId: day.id };
  //       // });
  //       return {shiftTypeId: 1, workDayId: day.id };
  //     });

  //     const newShiftDup = newShift?.slice()
  //     newShiftDup?.push(daysToCreate[0])

  //     setNewShift([...newShift, {...newShiftDup}])
  //   console.log(daysToCreate);

  //   if (!daysToCreate || daysToCreate?.length <= 0) {
  //     return;
  //   }
  //   const result = await createNewShift.mutateAsync({ ...daysToCreate });
  // };

  // const handleCreateNewSchedule = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className=" mx-auto mt-10 flex w-11/12 bg-gray-200 px-10">
        {workDays.data?.map((day) => {
          return (
            <div className="flex flex-col">
              <div key={day.id} className="px-4 capitalize">
                {day.day}
              </div>

              {shiftTypes.data?.map((shiftType) => {
                return (
                  <div
                    key={shiftType.id}
                    className="border-2 border-gray-900 px-4"
                  >
                    <h1>{shiftType.shiftType}</h1>
                    {/* <Select>
                      {employees.data?.map((employee) => {
                        return (
                          <option value={employee.id}>
                            {employee.firstName + employee.lastName}
                          </option>
                        );
                      })}
                    </Select> */}
                    {employees.data && (
                      <>
                        {employees.data?.map((employee) => {
                          return (
                            <Autocomplete
                              className="my-4"
                              disablePortal
                              id="combo-box-demo"
                              options={employees.data.map(
                                (employee) => employee.firstName
                              )}
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Search for employee"
                                />
                              )}
                              onChange={() =>
                                handleAssignEmployee(
                                  day.id,
                                  shiftType.id,
                                  employee.id
                                )
                              }
                            />
                          );
                        })}
                        <Button onClick={setEmployeeToShift}>Save</Button>
                      </>
                    )}
                    {/* <Select>
                      {employees.data?.map((employee) => {
                        return (
                          <option value={employee.id}>
                            {employee.firstName + employee.lastName}
                          </option>
                        );
                      })}
                    </Select> */}
                  </div>
                );
              })}
              {/* <Button variant="outlined" onClick={handleSetEmployeeToShift}>
                  Add Employee
                </Button> */}
            </div>
          );
        })}
      </div>
      <Button
        className="mt-20 w-fit self-center bg-gray-500 px-4 py-2 text-gray-100 hover:bg-gray-900"
        // onClick={handleCreateNewSchedule}
      >
        Create New Schedule
      </Button>
      {/* <CreateNewScheduleModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />  */}
      <EmployeeList />
    </div>
  );
}

export default index;
