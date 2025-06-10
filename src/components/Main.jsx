import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newColumn, openEditTaskModal } from "../feature/kanban/kanbanSlice";
import EmptyBoard from "./EmptyBoard";

function Main() {
  const [index, setIndex] = useState();
  const { isDarkMode } = useSelector((state) => state.theme);
  const { data, activeState } = useSelector((state) => state.kanban);

  const dispatch = useDispatch();

  const { columns } = data.filter((s) => s.name === activeState)[0];

  const colors = [
    { name: "bg-[#49C4E5]" },
    { name: "bg-[#8471F2]" },
    { name: "bg-[#67E2AE]" },
    { name: "bg-[#49C4E5]" },
    { name: "bg-[#67E2AE]" },
    { name: "bg-[#49C4E5]" },
    { name: "bg-[#8471F2]" },
  ];

  return (
    <main
      className={`${
        isDarkMode
          ? "bg-primary-300 px-6 font-plus-jakarta-sans"
          : "bg-secondary-100 px-6 font-plus-jakarta-sans"
      }`}
    >
      {columns.length >= 1 ? (
        <section className="flex  gap-[1rem] h-full py-3">
          <div className="flex gap-2  ">
            {columns.map((s, i) => {
              const { name, tasks } = s;
              return (
                <article key={i} className=" px-2 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex justify-between items-center gap-4">
                      {
                        colors.map((s) => {
                          return (
                            <div
                              className={`h-2 w-2 rounded-full ${s.name}`}
                            ></div>
                          );
                        })[i]
                      }
                    </div>
                    <h3 className="leading-[2.4px] text-[14px] text-primary-600 font-bold">
                      {name} ({tasks.map((s) => s.subtasks).length})
                    </h3>
                  </div>

                  <main className="flex flex-col  w-[250px] gap-2 py-4">
                    {tasks.map((s, i) => {
                      const { title, subtasks } = s;
                      return (
                        <div
                          className={`${
                            isDarkMode
                              ? "bg-primary-400 rounded-lg pl-4 pr-7 py-[0.5rem] cursor-pointer"
                              : "bg-white shadow-sm rounded-lg pl-4 pr-7 py-[0.5rem] cursor-pointer"
                          }`}
                          onMouseOver={() => setIndex(title)}
                          onMouseLeave={() => setIndex("")}
                          key={i}
                          role="button"
                          onClick={() =>
                            dispatch(openEditTaskModal({ name, title }))
                          }
                        >
                          <main className="flex flex-col gap-[0.2rem]">
                            <h3
                              className={`${
                                index === title
                                  ? "transition-all ease-linear delay-100 text-[15px] text-primary-100 font-bold"
                                  : isDarkMode
                                  ? "text-[15px] text-white font-bold"
                                  : "text-[15px] text-black font-bold font-plus-jakarta-sans"
                              }`}
                            >
                              {title}
                            </h3>
                            <div className="flex gap-1 text-[12px] text-primary-600 font-medium">
                              <div>
                                {console.log(subtasks)}
                                {subtasks?.filter((s) => s.isCompleted).length}
                              </div>
                              <p>of</p>
                              <span>{subtasks.length} subtasks</span>
                            </div>
                          </main>
                        </div>
                      );
                    })}
                  </main>
                </article>
              );
            })}
          </div>

          <div
            className={`${
              isDarkMode
                ? "bg-primary-300 h-full w-[250px]  flex items-center justify-center shadow-sm"
                : "bg-secondary-100 h-full w-[250px]  flex items-center justify-center shadow-sm"
            }`}
          >
            <button
              className="flex  items-center gap-2 text-primary-600 hover:text-primary-100 font-plus-jakarta-sans font-bold text-[24px] cursor-pointer transition-all ease-linear delay-75"
              onClick={() => dispatch(newColumn())}
            >
              <PlusIcon className="size-5  " /> <span> New Column</span>
            </button>
          </div>
        </section>
      ) : (
        <EmptyBoard />
      )}
    </main>
  );
}

export default Main;

// overflow-x-scroll overflow-y-hidden
