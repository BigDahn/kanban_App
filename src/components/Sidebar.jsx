import { useDispatch, useSelector } from "react-redux";
import Theme from "../ui/Theme";
import { closeSidebar, openSideBar } from "../feature/theme/themeSlice";
import {
  changeActiveState,
  createNewBoard,
} from "../feature/kanban/kanbanSlice";

function Sidebar() {
  const { isSidebarOpen, isDarkMode } = useSelector((state) => state.theme);
  const { data: boards, activeState } = useSelector((state) => state.kanban);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        isDarkMode
          ? "md:flex md:flex-col md:h-full md:justify-between py-5 bg-primary-400 border-r border-primary-500 hidden"
          : "md:flex md:flex-col md:h-full md:justify-between py-5 bg-white  border-r border-secondary-50 hidden"
      }`}
    >
      <div className="flex flex-col gap-[1.3rem]">
        <h2 className="text-[15px] font-medium text-primary-600 px-5">
          All Board ({boards.length})
        </h2>
        <ul className="flex flex-col gap-[0.6rem] ">
          {boards.map((s, i) => {
            return (
              <li
                key={i}
                className={`${
                  isDarkMode && activeState === s.name
                    ? " flex items-center gap-3 bg-primary-100 w-[96%] py-2.5 text-white rounded-tr-full rounded-br-full  px-5 hover:bg-white cursor-pointer hover:text-primary-600"
                    : isDarkMode && activeState !== s.name
                    ? "flex items-center gap-3  w-[96%] py-2.5  rounded-tr-full text-primary-600 rounded-br-full  px-5 hover:bg-white cursor-pointer hover:text-primary-600"
                    : !isDarkMode && activeState === s.name
                    ? "flex items-center gap-3 bg-primary-100 w-[96%] py-2.5 text-white rounded-tr-full rounded-br-full  px-5  cursor-pointer hover:bg-primary-100/25 hover:text-primary-100"
                    : "flex items-center gap-3  w-[96%] py-2.5 text-primary-600 rounded-tr-full rounded-br-full  px-5 hover:bg-primary-100/25 cursor-pointer hover:text-primary-100"
                }`}
                onClick={() => dispatch(changeActiveState(i))}
              >
                <img src="/assets/icon-board.svg" />

                <span className="text-[15px] font-medium ">{s.name}</span>
              </li>
            );
          })}
          <li
            className="flex items-center gap-3  w-[96%] py-2.5  rounded-tr-full text-primary-600 rounded-br-full  px-5 hover:bg-white cursor-pointer hover:text-primary-600"
            onClick={() => dispatch(createNewBoard())}
          >
            <img src="/assets/icon-board.svg" />{" "}
            <span className="text-[15px] font-medium text-primary-100">
              + Create New Board
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2 px-5 ">
        <div
          className={`${
            isDarkMode
              ? "flex bg-primary-300  py-2 gap-5 items-center justify-center rounded-sm px-5 "
              : "flex bg-secondary-100  py-2 gap-5 items-center justify-center rounded-sm px-5 "
          }`}
        >
          <img src="/assets/icon-light-theme.svg" />
          <Theme />
          <img src="/assets/icon-dark-theme.svg" />
        </div>
        {isSidebarOpen ? (
          <button
            className="flex gap-3 text-[15px] font-bold text-primary-600 items-center font-plus-jakarta-sans "
            onClick={() => dispatch(closeSidebar())}
          >
            <img
              src="/assets/icon-hide-sidebar.svg"
              className="w-[17px] h-[16px]"
            />
            Hide Sidebar
          </button>
        ) : (
          <button
            className="flex gap-2 text-[13px] font-bold text-primary-600 items-center font-plus-jakarta-sans w-[40%] bg-primary-50 py-2 rounded-tr-full rounded-br-full relative left-[12rem] justify-end px-5 cursor-pointer "
            onClick={() => dispatch(openSideBar())}
          >
            <img
              src="/assets/icon-show-sidebar.svg"
              className="w-[13px] h-[16px]"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
