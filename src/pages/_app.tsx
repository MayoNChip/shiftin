import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EmployeeContextProvider from "../context/EmployeeContext";
import Navbar from "../components/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <EmployeeContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </EmployeeContextProvider>
    </DndProvider>
  );
};

export default trpc.withTRPC(MyApp);
