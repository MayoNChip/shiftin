import React, { useState } from "react";
import EmployeeList from "../../components/EmployeeList";
import { trpc } from "../../utils/trpc";
import Modal from "../../components/Modal";

function index() {
  const employeeMutation = trpc.employeeRouter.addEmployee.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <EmployeeList />
      <button
        className="my-6 flex w-fit items-center self-center rounded bg-purple-300 px-4 py-2"
        onClick={() => {
          setIsModalOpen(true);
          //   employeeMutation.mutate({ firstName: "Ido", lastName: "Cohen" });
        }}
      >
        Add Employee
      </button>
      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default index;
