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
          ? "flex flex-col h-full justify-between py-5 bg-primary-400   border-r border-primary-500"
          : "flex flex-col h-full justify-between py-5 bg-white  border-r border-secondary-50"
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
                  activeState === s.name
                    ? "flex items-center gap-3 bg-primary-100 w-[96%] py-2.5 text-white rounded-tr-full rounded-br-full  px-5 hover:bg-white cursor-pointer hover:text-primary-600"
                    : "flex items-center gap-3  w-[96%] py-2.5  rounded-tr-full text-primary-600 rounded-br-full  px-5 hover:bg-white cursor-pointer hover:text-primary-600"
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
/*  <div className="flex flex-col gap-12   ">
        <img
          src="/assets/logo-light.svg"
          className="w-[180px] h-[25.22px] px-5  "
        />
        <div className="flex flex-col gap-[1.3rem]">
          <h2 className="text-[15px] font-medium text-primary-600 px-5">
            All Board (8)
          </h2>
          <ul className="flex flex-col gap-[1rem] ">
            <li className="flex items-center gap-1.5 bg-primary-100 w-[98%] py-1.5  rounded-tr-2xl rounded-br-2xl px-5">
              <img src="/assets/icon-board.svg" />{" "}
              <span className="text-[15px] font-medium text-primary-600">
                Platform Launch
              </span>
            </li>
            <li className="flex items-center gap-1.5 px-5">
              <img src="/assets/icon-board.svg" />{" "}
              <span className="text-[15px] font-medium text-primary-600">
                Marketing Plan
              </span>
            </li>
            <li className="flex items-center gap-1.5 px-5">
              <img src="/assets/icon-board.svg" />{" "}
              <span className="text-[15px] font-medium text-primary-600">
                Roadmap
              </span>
            </li>
            <li className="flex items-center gap-1.5 px-5">
              <img src="/assets/icon-board.svg" />{" "}
              <span className="text-[15px] font-medium text-primary-100">
                + Create New Board
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-2 ">
        <div className="flex bg-primary-300 px-2 py-2 gap-5 items-center justify-center rounded-sm">
          <img src="/assets/icon-light-theme.svg" />
          <Theme />
          <img src="/assets/icon-dark-theme.svg" />
        </div>
        {isSidebarOpen ? (
          <button
            className="flex gap-2 text-[13px] font-bold text-primary-600 items-center font-plus-jakarta-sans"
            onClick={() => dispatch(closeSidebar())}
          >
            <img
              src="/assets/icon-hide-sidebar.svg"
              className="w-[13px] h-[13px]"
            />
            hide sidebar
          </button>
        ) : (
          <button className="flex gap-2 text-[13px] font-bold text-primary-600 items-center font-plus-jakarta-sans">
            <img
              src="/assets/icon-show-sidebar.svg"
              className="w-[13px] h-[13px]"
            />
            show sidebar
          </button>
        )}
      </div> */

/*  className={`${
        isSidebarOpen
          ? " border-r border-primary-500 flex flex-col justify-between  font-plus-jakarta-sans py-6 w-[100%] bg-red-500  row-start-2 "
          : " border-r border-primary-500 flex flex-col justify-between  font-plus-jakarta-sans py-6 w-[100%] bg-red-500  row-start-2 transition-all ml-[-240px] ease-linear delay-1000 "
      }`} */
