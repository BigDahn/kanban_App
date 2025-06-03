import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newColumn } from "../feature/theme/themeSlice";

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
  ];

  return (
    <main
      className={`${
        isDarkMode
          ? "bg-primary-300 px-6 font-plus-jakarta-sans "
          : "bg-secondary-100 px-6 font-plus-jakarta-sans "
      }`}
    >
      <section className="flex items-start w-full gap-[3rem] h-full py-3">
        <div className="grid grid-cols-[250px_250px_250px] gap-2 ">
          {columns.map((s, i) => {
            const { name, tasks } = s;
            return (
              <article key={i} className=" px-2 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-3">
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

                <main className="flex flex-col gap-2 py-4">
                  {tasks.map((s, i) => {
                    const { title, subtasks } = s;
                    return (
                      <div
                        className="bg-primary-400 rounded-lg pl-4 pr-7 py-[0.5rem] cursor-pointer"
                        onMouseOver={() => setIndex(title)}
                        onMouseLeave={() => setIndex("")}
                        key={i}
                      >
                        <main className="flex flex-col gap-[0.2rem]">
                          <h3
                            className={`${
                              index === title
                                ? "transition-all ease-linear delay-100 text-[13px] text-primary-100 font-medium"
                                : "text-[13px] text-white font-medium"
                            }`}
                          >
                            {title}
                          </h3>
                          <div className="flex gap-1 text-[12px] text-primary-600 font-medium">
                            <div>
                              {subtasks.filter((s) => s.isCompleted).length}
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
        <div className="bg-primary-300 h-full w-full flex items-center justify-center shadow-sm">
          <button
            className="flex  items-center gap-2 text-primary-600 hover:text-primary-100 font-plus-jakarta-sans font-bold text-[24px] cursor-pointer transition-all ease-linear delay-75"
            onClick={() => dispatch(newColumn())}
          >
            <PlusIcon className="size-5  " /> <span> New Column</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Main;
