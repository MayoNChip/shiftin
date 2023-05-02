import { Employee } from "@prisma/client";
import { defaultFormatter } from "@trpc/server/dist/error/formatter";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { trpc } from "../utils/trpc";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";

type ContextType = {
  employeeList: Employee[] | undefined;
  setEmployeeList: Dispatch<SetStateAction<Employee[] | undefined>>;
} | null;

interface Props {
  children: React.ReactNode;
}

export const EmployeeContext = createContext<ContextType>(null);

const EmployeeContextProvider = ({ children }: Props) => {
  const getAllEmployees = trpc.employeeRouter.getAll.useQuery();
  const [employeeList, setEmployeeList] = useState<Employee[]>();

  useEffect(() => {
    setEmployeeList(getAllEmployees.data);

    // getAllEmployees.refetch();
  }, [getAllEmployees.data]);

  return (
    <EmployeeContext.Provider value={{ employeeList, setEmployeeList }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
