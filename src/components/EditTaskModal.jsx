import {
  EllipsisVerticalIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditUpdate, openSideTaskModal } from "../feature/kanban/kanbanSlice";
import SmallSideModal from "./SmallSideModal";

function EditTaskModal() {
  const { data, activeState, editTask, isEdit, editTaskInfo } = useSelector(
    (state) => state.kanban
  );

  const { title, description, status, subtasks } = editTask;

  const [index, setIndex] = useState({
    isTrue: false,
    value: "",
  });
  const [subtask, setSubtask] = useState(subtasks);
  console.log(subtask);
  const [statusChange, setStatusChange] = useState({
    stat: false,
    option: status === "" ? editTaskInfo.name : status,
  });
  const dispatch = useDispatch();

  function handleSelect(e) {
    const { value } = e.target;

    console.log(value);
    setStatusChange({
      stat: true,
      option: value,
    });
  }
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
  function removeInput(e, d) {
    e.preventDefault();
    setSubtask(subtask.filter((s, i) => i !== d));
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
                className="outline-none border rounded-md px-3 text-white h-[40px] border-white/25 text-[13px] font-plus-jakarta-sans"
                value={title}
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
                value={description}
                //onChange={handleChange}
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
                        // onChange={(e) => subTasks(e, i)}
                        name="title"
                        required
                        value={s.title}
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
              <label className="text-[12px] font-plus-jakarta-sans font-medium text-primary-600">
                Status
              </label>
              <select
                onChange={handleSelect}
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
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-[3rem] items-start px-3 py-4 w-[25rem] min-h-fit m-auto rounded-md z-50 bg-primary-400 shadow-lg shadow-primary-300"
        >
          <section key={title} className="flex flex-col gap-[2rem] w-full">
            <div className="flex flex-col gap-2">
              <div className="flex w-full gap-4  items-center justify-between">
                <h3 className="text-white text-[18px] max-w-[20rem] font-plus-jakarta-sans font-bold ">
                  {title}
                </h3>
                <EllipsisVerticalIcon
                  onClick={() => dispatch(openSideTaskModal())}
                  className="size-6 text-primary-600 hover:text-primary-100"
                />
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
              <select
                onChange={handleSelect}
                className="border-primary-600 border-1 rounded-sm h-[2rem] px-1 bg-primary-300 hover:border-primary-100  text-[12px] font-plus-jakarta-sans font-medium text-white outline-none"
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
