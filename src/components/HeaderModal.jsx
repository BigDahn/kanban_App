import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeHeaderModal,
  editBoardModal,
  isDeleteBoardBtn,
} from "../feature/kanban/kanbanSlice";

function HeaderModal() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <main className="fixed inset-0 flex justify-end pt-[4rem] pr-8  transition-all   delay-100  bg-primary-400/50   m-auto z-[100] ">
      <div
        className={`${
          isDarkMode
            ? " transition-all  delay-100 w-[152px] h-[74px] px-2 py-3 flex items-start  min-h-fit rounded-sm shadow-md z-[100] bg-primary-300"
            : " transition-all  delay-100 w-[152px] h-[74px] px-2 py-3 flex items-start  min-h-fit rounded-sm shadow-md z-[100] bg-white"
        }`}
      >
        <XMarkIcon
          className="size-3 relative bottom-2 left-31 text-primary-600 hover:text-primary-100 cursor-pointer"
          onClick={() => dispatch(closeHeaderModal())}
        />
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
