import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EmployeeContextProvider from "../context/EmployeeContext";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";
import { ClerkProvider, RedirectToSignIn, SignedOut } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <DndProvider backend={HTML5Backend}>
        <EmployeeContextProvider>
          <Navbar />
          <Component {...pageProps} />
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </EmployeeContextProvider>
      </DndProvider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
