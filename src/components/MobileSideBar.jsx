import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../ui/Theme";
import {
  changeActiveState,
  createNewBoard,
} from "../feature/kanban/kanbanSlice";

function MobileSideBar() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { data: boards, activeState } = useSelector((state) => state.kanban);
  const dispatch = useDispatch();
  return (
    <section
      className={`${
        isDarkMode
          ? "fixed   flex items-start justify-start  w-screen h-[1024px]  rounded-md z-50 bg-black/20 font-plus-jakarta-sans"
          : "fixed   flex items-start justify-start  w-screen h-[1024px]  rounded-md z-50 bg-gray-400/20 font-plus-jakarta-sans"
      }`}
    >
      <div
        className={`${
          isDarkMode
            ? "w-[264px] min-h-[322px] bg-primary-400 px-4 ml-12 py-4  flex flex-col gap-4 justify-evenly rounded-md  shadow-md mt-4 shadow-primary-100/20"
            : "w-[264px] min-h-[322px]  bg-white px-5 md:px-8 md:py-8 py-7 flex flex-col gap-4 justify-evenly rounded-md"
        }`}
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-[12px] font-bold tracking-[2.4px] uppercase text-primary-600 px-5 font-plus-jakarta-sans">
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

                  <span className="text-[15px] font-bold ">{s.name}</span>
                </li>
              );
            })}
            <li
              className="flex items-center gap-3  w-[96%] py-2.5  rounded-tr-full text-primary-600 rounded-br-full  px-5 hover:bg-white cursor-pointer hover:text-primary-600"
              onClick={() => dispatch(createNewBoard())}
            >
              <img src="/assets/icon-board.svg" />{" "}
              <span className="text-[15px] font-bold text-primary-100">
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
        </div>
      </div>
    </section>
  );
}

export default MobileSideBar;
