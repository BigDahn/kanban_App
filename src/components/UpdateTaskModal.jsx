import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditUpdate } from "../feature/kanban/kanbanSlice";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";

function UpdateTaskModal() {
  const { data, activeState, editTask, editTaskInfo } = useSelector(
    (state) => state.kanban
  );
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
        className=" flex flex-col gap-[2rem] items-start px-3 py-4 w-[25rem] min-h-fit m-auto rounded-md z-50 bg-primary-400 shadow-lg shadow-primary-300"
      >
        <div className="flex justify-between items-center w-full">
          <h3 className="text-white font-bold text-[15px] font-plus-jakarta-sans">
            Edit Task
          </h3>
          <XMarkIcon className="size-4 cursor-pointer hover:text-primary-100 text-primary-600" />
        </div>
        <section className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="title"
              className="text-[12px] font-plus-jakarta-sans font-bold text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              className="outline-none border rounded-md px-3 text-white h-[40px] border-white/25 text-[13px] font-plus-jakarta-sans"
              value={taskInfo.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-[12px] font-plus-jakarta-sans font-bold text-white"
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
              className="bg-transparent border-1 border-white/25 text-[12px] outline-none  h-[112px] py-1 flex items-start justify-start px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
            />
          </div>
          {subtask.length >= 1 && (
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="title"
                className="text-[12px] font-plus-jakarta-sans font-bold text-white"
              >
                Subtasks
              </label>
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
                      className={`${"bg-transparent border-1 border-white/25 outline-none w-full  h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer text-[12px]"}`}
                    />

                    <button onClick={(e) => removeInput(e, i)}>
                      <XMarkIcon className="size-6 text-gray-600 hover:text-secondary-400 cursor-pointer" />
                    </button>
                  </div>
                );
              })}{" "}
              <button
                className="bg-white rounded-full flex items-center justify-center text-primary-100 text-[13px] py-2 font-medium font-plus-jakarta-sans"
                onClick={(e) => addmoreSubtasks(e)}
              >
                <PlusIcon className="size-4" /> Add New Subtask
              </button>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="text-[12px] font-plus-jakarta-sans font-medium text-primary-600"
            >
              Status
            </label>
            <select
              name="status"
              onChange={handleInputChange}
              className="border-white/25 border-1 rounded-sm h-[2rem] px-1 bg-primary-300 hover:border-primary-100  text-[12px] font-plus-jakarta-sans font-medium text-white outline-none"
            >
              <option className="text-white font-plus-jakarta-sans font-medium">
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
                    className="bg-primary-300 font-plus-jakarta-sans font-medium"
                  >
                    {s}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="bg-primary-100 text-white font-plus-jakarta-sans font-medium text-[13px] h-[40px] rounded-full disabled:bg-primary-600"
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
