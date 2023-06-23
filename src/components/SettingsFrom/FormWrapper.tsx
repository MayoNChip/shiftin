import React, { ReactNode } from "react";

interface FormWrapperType {
  title: string;
  children: ReactNode;
}

function FromWrapper({ title, children }: FormWrapperType) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </div>
  );
}

export default FromWrapper;
