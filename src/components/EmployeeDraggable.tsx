import React from "react";
import { ItemTypes } from "../lib/itemTypes";
import { useDrag } from "react-dnd";

function EmployeeDraggable() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EMPLOYEE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move text-[25px] font-bold text-gray-200 opacity-[${
        isDragging ? "[50%]" : "[100%]"
      }]`}
    >
      HELLO
    </div>
  );
}

export default EmployeeDraggable;
