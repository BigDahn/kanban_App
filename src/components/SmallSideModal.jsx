import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditTaskModal,
  editTaskOn,
  isDeleteTaskBtn,
} from "../feature/kanban/kanbanSlice";

function SmallSideModal() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { sideModalPosition } = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const width = Math.floor(Number(sideModalPosition.x)) - 70;

  const height = Math.floor(Number(sideModalPosition.y)) - 140 - 60;

  return (
    <main
      className={`${
        isDarkMode
          ? ` fixed inset-0 flex transition-all  delay-100 w-[113px] md:w-[176px] h-[70px] shadow-md bg-primary-400/50 m-auto z-[100] `
          : "fixed inset-0 flex  transition-all  delay-100 w-[113px] md:w-[176px] h-[70px] shadow-md bg-white/50 m-auto z-[100] "
      }`}
      style={{
        left: width,
        bottom: height,
      }}
    >
      <div
        className={`${
          isDarkMode
            ? " transition-all   delay-100 w-[113px] md:w-[176px] h-[70px] px-2 py-3    min-h-fit rounded-sm  z-[100] bg-primary-300"
            : " transition-all  delay-100 w-[113px] md:w-[176px] h-[70px] px-2 py-3  min-h-fit rounded-sm  z-[100] bg-white"
        }`}
      >
        <div className="flex flex-col gap-3 font-plus-jakarta-sans text-[12px] font-bold">
          <h3
            onClick={() => dispatch(editTaskOn())}
            className="text-primary-600 cursor-pointer hover:text-primary-100"
          >
            Edit Task
          </h3>
          <h3
            className="text-secondary-400 cursor-pointer"
            onClick={() => dispatch(isDeleteTaskBtn())}
          >
            Delete Task
          </h3>
        </div>
      </div>
    </main>
  );
}

export default SmallSideModal;
