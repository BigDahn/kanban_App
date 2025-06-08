import { useDispatch, useSelector } from "react-redux";
import { addNewTaskBtn, openHeaderModal } from "../feature/kanban/kanbanSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";

function Header() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { activeState } = useSelector((state) => state.kanban);

  const dispatch = useDispatch();
  return (
    <div
      className={`${
        isDarkMode
          ? "bg-primary-400  flex items-center px-6.5 justify-between"
          : "bg-white  flex items-center px-6.5 justify-between"
      }`}
    >
      <div className="flex justify-center gap-8 h-full items-center">
        <div
          className={`${
            isDarkMode
              ? "border-r h-full justify-center border-primary-500 items-center flex gap-3 "
              : "border-r h-full justify-center border-secondary-50 items-center flex gap-3 "
          }`}
        >
          {isDarkMode ? (
            <img
              src="/assets/logo-light.svg"
              className=" w-[180px] h-[25.22px] mr-[33px]"
            />
          ) : (
            <img
              src="/assets/logo-dark.svg"
              className=" w-[180px] h-[25.22px] mr-[33px]"
            />
          )}
        </div>

        <h2
          className={`${
            isDarkMode
              ? "font-plus-jakarta-sans text-white font-bold text-[22px]"
              : "font-plus-jakarta-sans text-black font-bold text-[22px]"
          }`}
        >
          {activeState}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-full w-[125px] h-[38px] bg-primary-100 text-white font-plus-jakarta-sans text-[12px] font-bold cursor-pointer "
          onClick={() => dispatch(addNewTaskBtn())}
        >
          <h2> +AddNew Task </h2>
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
