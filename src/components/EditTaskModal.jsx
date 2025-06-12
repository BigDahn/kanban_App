import {
  EllipsisVerticalIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditUpdate, openSideTaskModal } from "../feature/kanban/kanbanSlice";

import UpdateTaskModal from "./UpdateTaskModal";

function EditTaskModal() {
  const { data, activeState, editTask, isEdit, editTaskInfo } = useSelector(
    (state) => state.kanban
  );
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const { title, description, status, subtasks } = editTask;

  const [statusChange, setStatusChange] = useState({
    stat: false,
    option: status === "" ? editTaskInfo.name : status,
  });

  const [index, setIndex] = useState({
    isTrue: false,
    value: "",
  });
  const [subtask, setSubtask] = useState(subtasks);

  function handleSelect(e) {
    const { value } = e.target;

    setStatusChange({
      stat: true,
      option: value,
    });
  }

  function handleChange(index) {
    setIndex({
      isTrue: true,
      value: index,
    });
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
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      status: statusChange.option,
      subtasks: subtask,
    };

    console.log(data);

    dispatch(EditUpdate(data));
  }

  return (
    <div className="fixed inset-0  flex items-center justify-center w-screen h-screen m-auto rounded-md z-50 bg-primary-400/52">
      {isEdit ? (
        <UpdateTaskModal />
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`${
            isDarkMode
              ? " max-h-fit md:overflow-x-hidden md:overflow-y-hidden overflow-y-scroll flex flex-col gap-5 items-start min-w-[343px] md:min-w-[30rem] px-[1.3rem] py-4  m-auto rounded-md bg-primary-500"
              : " max-h-fit flex flex-col gap-5 items-start max-w-[343px] md:max-w-[30rem] px-[1.3rem] py-4  m-auto rounded-md bg-white"
          }`}
        >
          <section key={title} className="flex flex-col gap-[2rem] w-full">
            <div className="flex flex-col gap-2">
              <div className="flex w-full gap-4  items-center justify-between">
                <h3
                  className={`${
                    isDarkMode
                      ? "text-[17px] font-plus-jakarta-sans font-bold text-white max-w-[23rem]"
                      : "text-[17px] font-plus-jakarta-sans font-bold text-black max-w-[24rem]"
                  }`}
                >
                  {title}
                </h3>
                <EllipsisVerticalIcon
                  onClick={() => dispatch(openSideTaskModal())}
                  // onClick={() => alert("dhd")}
                  className="size-6 text-primary-600 hover:text-primary-100"
                />
              </div>
              {description && (
                <div>
                  <h3 className="text-[13px] font-plus-jakarta-sans text-primary-600 font-medium leading-[23px] max-w-[26rem]">
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

                  return (
                    <div
                      key={i}
                      className={`${
                        isDarkMode && isCompleted
                          ? "flex text-[11px] font-plus-jakarta-sans items-center gap-2 bg-primary-300 font-medium  text-primary-600 py-[0.2rem] px-2 rounded-sm"
                          : isDarkMode && !isCompleted
                          ? "flex text-[11px] font-plus-jakarta-sans items-center gap-2 bg-primary-300 font-medium  text-white py-[0.2rem] px-2 rounded-sm"
                          : !isDarkMode && isCompleted
                          ? "flex text-[11px] font-plus-jakarta-sans items-center gap-2 bg-secondary-100 font-medium  text-primary-600 py-[0.2rem] px-2 rounded-sm"
                          : "flex text-[11px] font-plus-jakarta-sans items-center gap-2 bg-secondary-100 font-medium  text-black py-[0.2rem] px-2 rounded-sm"
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
              <select
                onChange={handleSelect}
                className={`${
                  isDarkMode
                    ? "border-primary-600 border-1 rounded-sm h-[40px] px-1 bg-primary-300 hover:border-primary-100  text-[13px] font-plus-jakarta-sans font-medium text-white outline-none"
                    : "border-primary-600 border-1 rounded-sm h-[40px] px-1 bg-white hover:border-primary-100  text-[13px] font-plus-jakarta-sans font-medium text-black outline-none"
                }`}
              >
                <option
                  className={`${
                    isDarkMode
                      ? "text-white font-plus-jakarta-sans font-medium"
                      : "text-black font-plus-jakarta-sans font-medium"
                  }`}
                >
                  {status === "" ? editTaskInfo.name : status}
                </option>
                {data
                  .filter((s) => s.name === activeState)[0]
                  .columns.map((s) => s.name)
                  .filter(
                    (s) => s !== (status === "" ? editTaskInfo.name : status)
                  )
                  .map((s, i) => (
                    <option
                      key={i}
                      className={`${
                        isDarkMode
                          ? "bg-primary-300 font-plus-jakarta-sans font-medium"
                          : "bg-white font-plus-jakarta-sans font-medium"
                      }`}
                    >
                      {s}
                    </option>
                  ))}
              </select>
            </div>

            <button
              className="bg-primary-100 text-white font-plus-jakarta-sans font-medium text-[13px] py-1.5 rounded-full disabled:bg-primary-600"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </section>
        </form>
      )}
    </div>
  );
}

export default EditTaskModal;
/* 
<div></div>
 */
