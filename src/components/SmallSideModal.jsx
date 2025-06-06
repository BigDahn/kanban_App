import React from "react";
import { useDispatch } from "react-redux";
import { editTaskOn } from "../feature/kanban/kanbanSlice";

function SmallSideModal() {
  const dispatch = useDispatch();
  return (
    <main className="fixed inset-0 flex left-[29rem] bottom-[12.4rem] transition-all  delay-100 w-[126px] h-[70px] shadow-md shadow-primary-400 bg-primary-400/50 m-auto z-[100] ">
      <div className=" transition-all  delay-100 w-[126px] h-[70px] px-2 py-2  min-h-fit rounded-sm  z-[100] bg-primary-300">
        <div className="flex flex-col gap-1 font-plus-jakarta-sans text-[12px] font-bold">
          <h3
            onClick={() => dispatch(editTaskOn())}
            className="text-primary-600 cursor-pointer hover:text-primary-100"
          >
            Edit Task
          </h3>
          <h3 className="text-secondary-400">Delete Task</h3>
          <h3 className="text-secondary-400">Exit</h3>
        </div>
      </div>
    </main>
  );
}

export default SmallSideModal;
