import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditTaskModal, EditUpdate } from "../feature/kanban/kanbanSlice";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";

function UpdateTaskModal() {
  const { data, activeState, editTask, editTaskInfo } = useSelector(
    (state) => state.kanban
  );
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const { title, description, status, subtasks } = editTask;

  const [subtask, setSubtask] = useState(
    subtasks.map((s) => {
      return {
        title: s.title,
        isCompleted: s.isCompleted,
      };
    })
  );

  const [taskInfo, setTaskInfo] = useState({
    title: title,
    description: description,
    status: status === "" ? editTaskInfo.name : status,
  });
  function addmoreSubtasks(e) {
    e.preventDefault();
    setSubtask([
      ...subtask,
      {
        title: "",
        isCompleted: false,
      },
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: taskInfo.title,
      description: taskInfo.description,
      status: taskInfo.status,
      subtasks: subtask,
    };

    dispatch(EditUpdate(data));
  }

  function removeInput(e, d) {
    e.preventDefault();
    setSubtask(subtask.filter((s, i) => i !== d));
  }
  function handleInputChange(e) {
    const { name, value } = e.target;

    setTaskInfo({
      ...taskInfo,
      [name]: value,
    });
  }
  function subTasks(e, i) {
    const { value, name } = e.target;

    let newSubtasks = [...subtask];
    newSubtasks[i][name] = value;

    setSubtask(newSubtasks);
  }

  return (
    <div className="fixed inset-0  flex items-center justify-center w-screen h-screen m-auto rounded-md z-50 bg-primary-400/52">
      <form
        onSubmit={handleSubmit}
        className={`${
          isDarkMode
            ? " flex flex-col gap-[2rem] items-start px-3 py-4 w-[25rem] min-h-fit m-auto rounded-md z-50 bg-primary-400 shadow-lg shadow-primary-300"
            : " flex flex-col gap-[2rem] items-start px-3 py-4 w-[25rem] min-h-fit m-auto rounded-md z-50 bg-white shadow-sm "
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <h3
            className={`${
              isDarkMode
                ? "text-white font-bold text-[15px] font-plus-jakarta-sans"
                : "text-black font-bold text-[15px] font-plus-jakarta-sans"
            }`}
          >
            Edit Task
          </h3>
          <XMarkIcon
            className="size-4 cursor-pointer hover:text-primary-100 text-primary-600"
            onClick={() => dispatch(closeEditTaskModal())}
          />
        </div>
        <section className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="title"
              className={`${
                isDarkMode
                  ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                  : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              className={`${
                isDarkMode
                  ? "outline-none border rounded-md px-3 text-white h-[40px] border-white/25 text-[13px] font-plus-jakarta-sans"
                  : "outline-none border rounded-md px-3 text-black  h-[40px] border-gray-400 cursor-pointer hover:border-primary-100 text-[13px] font-plus-jakarta-sans"
              }`}
              value={taskInfo.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className={`${
                isDarkMode
                  ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                  : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
              }`}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              value={taskInfo.description}
              onChange={handleInputChange}
              placeholder="e.g. It’s always good to take a break.This 15 minute break will recharge the batteries a little."
              className={`${
                isDarkMode
                  ? "outline-none border rounded-md text-white h-[112px] py-1 flex items-start justify-start px-2 border-white/25 text-[13px] font-plus-jakarta-sans"
                  : "outline-none border rounded-md  text-black  h-[112px] py-1 flex items-start justify-start px-2 border-gray-400 cursor-pointer hover:border-primary-100 text-[13px] font-plus-jakarta-sans"
              }`}
            />
          </div>
          {
            <div className="flex flex-col gap-2 ">
              {subtask.length >= 1 && (
                <label
                  htmlFor="title"
                  className={`${
                    isDarkMode
                      ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                      : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
                  }`}
                >
                  Subtasks
                </label>
              )}
              {subtask.map((s, i) => {
                return (
                  <div
                    key={i}
                    className="w-full flex items-center justify-start relative"
                  >
                    <input
                      onChange={(e) => subTasks(e, i)}
                      name="title"
                      required
                      defaultValue={s.title}
                      placeholder="e.g tasks that should be done "
                      className={`${
                        isDarkMode
                          ? "bg-transparent border-1 border-gray-400 outline-none  w-full  h-[40px] px-2 capitalize rounded-sm text-white text-[13px] hover:border-primary-100 cursor-pointer placeholder:lowercase"
                          : "bg-transparent border-1 border-gray-400 outline-none  w-full  h-[40px] px-2 capitalize rounded-sm text-black text-[13px] hover:border-primary-100 cursor-pointer placeholder:lowercase"
                      }`}
                    />

                    <button onClick={(e) => removeInput(e, i)}>
                      <XMarkIcon className="size-6 text-gray-600 hover:text-secondary-400 cursor-pointer" />
                    </button>
                  </div>
                );
              })}{" "}
              <button
                className={`${
                  isDarkMode
                    ? "bg-white rounded-full flex items-center justify-center text-primary-100 text-[13px] py-2 font-bold cursor-pointer font-plus-jakarta-sans"
                    : "bg-primary-100/25 rounded-full flex items-center justify-center text-primary-100 text-[13px] py-2 font-bold cursor-pointer font-plus-jakarta-sans"
                }`}
                onClick={(e) => addmoreSubtasks(e)}
              >
                <PlusIcon className="size-4" /> Add New Subtask
              </button>
            </div>
          }
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className={`${
                isDarkMode
                  ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                  : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
              }`}
            >
              Status
            </label>
            <select
              name="status"
              onChange={handleInputChange}
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
            className={`${
              isDarkMode
                ? "bg-primary-100 rounded-full flex items-center justify-center text-white text-[13px]  h-[40px] font-bold cursor-pointer font-plus-jakarta-sans"
                : "bg-primary-100/25 rounded-full flex items-center justify-center text-primary-100 text-[13px]  h-[40px] font-bold cursor-pointer font-plus-jakarta-sans"
            }`}
            onClick={handleSubmit}
          >
            Update Changes
          </button>
        </section>
      </form>
    </div>
  );
}

export default UpdateTaskModal;
