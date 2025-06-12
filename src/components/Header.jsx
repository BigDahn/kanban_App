import { useDispatch, useSelector } from "react-redux";
import { addNewTaskBtn, openHeaderModal } from "../feature/kanban/kanbanSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { open_closeMobileSidebar } from "../feature/kanban/kanbanSlice";

function Header() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { data, activeState, mobileSidebar } = useSelector(
    (state) => state.kanban
  );

  const disableAddtask = data.filter((s) => s.name === activeState)[0].columns
    .length;

  const dispatch = useDispatch();
  return (
    <div
      className={`${
        isDarkMode
          ? "bg-primary-400  flex items-center px-4 md:px-6.5 justify-between"
          : "bg-white  flex items-center px-6.5 justify-between"
      }`}
    >
      <div className="flex justify-center gap-4 md:gap-6 h-full items-center">
        <div
          className={`${
            isDarkMode
              ? "md:border-r h-full justify-center border-primary-500 items-center flex gap-3 "
              : "md:border-r h-full justify-center border-secondary-50 items-center flex gap-3 "
          }`}
        >
          {isDarkMode ? (
            <img
              src="/assets/logo-light.svg"
              className=" w-[180px] h-[25.22px] mr-[33px] hidden md:flex"
            />
          ) : (
            <img
              src="/assets/logo-dark.svg"
              className=" w-[180px] h-[25.22px] mr-[33px] hidden md:flex"
            />
          )}
          <img
            src="/assets/logo-mobile.svg"
            className="flex w-[24px] h-[25px] md:hidden"
          />
        </div>

        <h2
          className={`${
            isDarkMode
              ? "font-plus-jakarta-sans text-white font-bold text-[18px] md:text-[22px] flex items-center gap-2"
              : "font-plus-jakarta-sans text-black font-bold text-[18px] md:text-[22px] flex items-center gap-2"
          }`}
        >
          {activeState}

          {mobileSidebar ? (
            <button
              className=" w-[20px] h-[18px] flex items-center md:hidden"
              onClick={() => dispatch(open_closeMobileSidebar())}
            >
              <img src="/assets/icon-chevron-up.svg" />
            </button>
          ) : (
            <button
              className=" w-[20px] h-[18px] flex items-center md:hidden"
              onClick={() => dispatch(open_closeMobileSidebar())}
            >
              <img src="/assets/icon-chevron-down.svg" />
            </button>
          )}
        </h2>
      </div>

      <div className="flex items-center md:gap-3">
        <button
          className="rounded-full w-[48px] h-[32px] md:w-[125px] md:h-[38px] bg-primary-100 text-white font-plus-jakarta-sans text-[12px] font-bold cursor-pointer flex items-center justify-center disabled:bg-primary-100/20 disabled:text-gray-400"
          onClick={() => dispatch(addNewTaskBtn())}
          disabled={disableAddtask < 1}
        >
          <h2 className="hidden md:flex"> +AddNew Task </h2>
          <img
            src="/assets/icon-add-task-mobile.svg"
            className="flex md:hidden"
          />
        </button>
        <EllipsisVerticalIcon
          className="size-6 text-primary-600 hover:text-primary-100 cursor-pointer"
          onClick={() => dispatch(openHeaderModal())}
        />
      </div>
    </div>
  );
}

export default Header;
