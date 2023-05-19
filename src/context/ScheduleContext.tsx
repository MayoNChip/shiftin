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

type ContextType = {};

interface Props {
  children: React.ReactNode;
}

export const ScheduleContext = createContext<ContextType>({});

const ScheduleContextProvider = ({ children }: Props) => {
  useEffect(() => {
    // getAllEmployees.refetch();
  }, []);

  return (
    <ScheduleContext.Provider value={{}}>{children}</ScheduleContext.Provider>
  );
};

export default ScheduleContextProvider;
