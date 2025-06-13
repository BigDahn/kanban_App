import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editBoardModal,
  isDeleteBoardBtn,
} from "../feature/kanban/kanbanSlice";

function HeaderModal() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <main
      className={`${
        isDarkMode
          ? "fixed left-0  flex items-start justify-end   min-w-screen h-[1024px]  rounded-md z-50 bg-black/10 font-plus-jakarta-sans"
          : "fixed left-0  flex items-start justify-end  min-w-screen h-[1024px]  rounded-md z-50 bg-gray-400/20 font-plus-jakarta-sans"
      }`}
    >
      <div
        className={`${
          isDarkMode
            ? " transition-all relative top-[-6px] md:top-[-10px] delay-100 w-[140px] md:w-[152px] h-[74px] px-2 py-3 flex items-start  min-h-fit rounded-sm shadow-md z-[100] bg-primary-300 mr-2 md:mr-8 "
            : " transition-all relative top-[-6px] md:top-[-10px]  delay-100 md:w-[152px] h-[74px] px-2 py-3 flex items-start  min-h-fit rounded-sm shadow-md z-[100] bg-white mr-0 md:mr-8"
        }`}
      >
        <div className="flex flex-col justify-between h-full font-plus-jakarta-sans text-[13px] font-medium leading-[23px]">
          <h3
            onClick={() => dispatch(editBoardModal())}
            className="text-primary-600 cursor-pointer hover:text-primary-100"
          >
            Edit Board
          </h3>
          <h3
            className="text-secondary-400 cursor-pointer"
            onClick={() => dispatch(isDeleteBoardBtn())}
          >
            Delete Board
          </h3>
        </div>
      </div>
    </main>
  );
}

export default HeaderModal;
//
