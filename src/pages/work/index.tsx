import { Button } from "@mui/material";
import Card from "../../components/Schedule";
import CreateNewScheduleModal from "../../components/CreateNewScheduleModal";
import { useState } from "react";

function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNewSchedule = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Button
        className="mt-20 w-fit self-center bg-gray-500 px-4 py-2 text-gray-100 hover:bg-gray-900"
        onClick={handleCreateNewSchedule}
      >
        Create New Schedule
      </Button>
      <CreateNewScheduleModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default index;
