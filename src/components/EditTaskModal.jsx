import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useSelector } from "react-redux";

function EditTaskModal() {
  const { editTaskInfo, data, activeState, editTask } = useSelector(
    (state) => state.kanban
  );
  const { title, description, status, subtasks } = editTask;

  const [subtask, setSubtask] = useState(subtasks);

  const [isEdit, setIsEdit] = useState(false);

  //  const { title, name } = editTaskInfo;
  /*
  const [index, setIndex] = useState();
   const [edit, setEdit] = useState(
    data
      .filter((s) => s.name === activeState)[0]
      .columns.filter((s) => s.name === name)[0]
      .tasks.filter((s) => s.title === title)
      .map((s) => s)[0].subtasks
  ); */

  function handleChange(index) {
    if (index) {
      setIsEdit(true);
    }
    const data = subtask.map((s, i) => {
      if (i === index) {
        return {
          ...s,
          isCompleted: !s.isCompleted,
        };
      }
      return s;
    });
    setSubtask(data);
    console.log(data);
  }
  // console.log(editTask);

  return (
    <div className="fixed inset-0  flex items-center justify-center w- h-screen m-auto rounded-md z-50 bg-primary-400/52">
      <div className=" flex flex-col gap-[3rem] items-start px-3 py-4 max-w-[25rem] min-h-fit m-auto rounded-md z-50 bg-primary-400 shadow-lg shadow-primary-300">
        <section key={title} className="flex flex-col gap-[2rem] w-full">
          <div className="flex flex-col gap-2">
            <div className="flex w-full gap-4  items-center justify-between">
              <h3 className="text-white text-[18px] font-plus-jakarta-sans font-bold ">
                {title}
              </h3>
              <EllipsisVerticalIcon className="size-6 text-primary-600 hover:text-primary-100" />
            </div>
            {description && (
              <div>
                <h3 className="text-[13px] font-plus-jakarta-sans text-primary-600 font-medium leading-[23px] max-w-[23rem]">
                  {description}
                </h3>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-primary-600 font-medium text-[12px] font-plus-jakarta-sans">
              Subtasks ( {subtask?.filter((s) => s.isCompleted)?.length} of{" "}
              {subtask?.length} )
            </h3>
            <div className="flex flex-col text-[11px] font-plus-jakarta-sans  gap-2">
              {subtask?.map((s, i) => {
                const { isCompleted, title } = s;
                console.log(s);
                return (
                  <div
                    key={i}
                    className={`${
                      isCompleted
                        ? "flex text-[11px] font-plus-jakarta-sans items-center gap-2 bg-primary-300 font-medium  text-primary-600 py-[0.2rem] px-2 rounded-sm"
                        : "flex text-[11px] font-plus-jakarta-sans items-center gap-2 bg-primary-100 font-medium  text-white py-[0.2rem] px-2 rounded-sm"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      //disabled={isEdit}
                      onChange={() => handleChange(i)}
                      //   onClick={() => setIndex(i)}
                    />
                    <label className=" text-[12px] font-plus-jakarta-sans   font-bold   py-2 px-2 ">
                      {title}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-plus-jakarta-sans font-medium text-primary-600">
              Current Status
            </label>
            <select className="border-primary-600 border-1 rounded-sm h-[2rem] px-1 bg-primary-300 hover:border-primary-100  text-[12px] font-plus-jakarta-sans font-medium text-white outline-none">
              <option className="text-white font-plus-jakarta-sans font-medium">
                {status}
              </option>
              {data
                .filter((s) => s.name === activeState)[0]
                .columns.map((s) => s.name)
                .filter((s) => s !== status)
                .map((s, i) => (
                  <option
                    key={i}
                    className="bg-primary-300 font-plus-jakarta-sans font-medium"
                  >
                    {s}
                  </option>
                ))}
            </select>
          </div>
          {isEdit ? (
            <button className="bg-primary-100 text-white font-plus-jakarta-sans font-medium text-[13px] py-1.5 rounded-full">
              Edit and Update
            </button>
          ) : (
            <button className="bg-secondary-400 text-white font-plus-jakarta-sans font-medium text-[13px] py-1.5 rounded-full">
              Exit
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export default EditTaskModal;
/* 
<div></div>
 */
