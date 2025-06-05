import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useSelector } from "react-redux";

function EditTaskModal() {
  const { editTaskInfo, data, activeState } = useSelector(
    (state) => state.kanban
  );
  const [isEdit, setIsEdit] = useState(false);
  const { title, name } = editTaskInfo;

  console.log();

  return (
    <div className="absolute inset-0 max-h-min flex flex-col gap-[3rem] items-start px-3 py-4 max-w-[26rem] m-auto rounded-md bg-primary-500 ">
      {data
        .filter((s) => s.name === activeState)[0]
        .columns.filter((s) => s.name === name)[0]
        .tasks.filter((s) => s.title === title)
        .map((s) => {
          const { title, description, status, subtasks } = s;
          return (
            <section className="flex flex-col gap-4 w-full">
              <div className="flex w-full gap-4  items-center justify-between">
                <h3 className="text-white text-[15px] font-plus-jakarta-sans font-medium ">
                  {title}
                </h3>
                <EllipsisVerticalIcon className="size-6 text-primary-600 hover:text-primary-100" />
              </div>
              {description && (
                <h3 className="text-[11px] font-plus-jakarta-sans text-primary-600 font-medium leading-[1rem] ">
                  {description}
                </h3>
              )}
              <div>
                <h3 className="text-primary-600 font-medium text-[10px] font-plus-jakarta-sans">
                  Subtasks ( {subtasks.filter((s) => s.isCompleted).length} of{" "}
                  {subtasks.filter((s) => !s.isCompleted).length} )
                </h3>
                <div className="flex flex-col text-[11px] font-plus-jakarta-sans  gap-2">
                  {subtasks.map((s) => {
                    const { isCompleted, title } = s;
                    return (
                      <div className="flex text-[11px] font-plus-jakarta-sans items-center gap-2 bg-primary-300 text-primary-600 py-2 px-2 rounded-sm">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          disabled={isEdit}
                        />
                        <p className="font-medium text-primary-600">{title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-plus-jakarta-sans font-medium text-primary-600">
                  Current Status
                </label>
                <select className="border-primary-600 border-1 rounded-sm h-[2rem] px-1 bg-primary-300 hover:border-primary-100  text-[11px] font-plus-jakarta-sans font-medium text-white outline-none">
                  <option className="text-white">{status}</option>
                  {data
                    .filter((s) => s.name === activeState)[0]
                    .columns.map((s) => s.name)
                    .filter((s) => s !== status)
                    .map((s) => (
                      <option className="bg-primary-300">{s}</option>
                    ))}
                </select>
              </div>
            </section>
          );
        })}
    </div>
  );
}

export default EditTaskModal;
