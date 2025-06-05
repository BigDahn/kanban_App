import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";

import { useState } from "react";
import Select from "../ui/Select";

function AddTask() {
  const [subtasks, setSubTasks] = useState([
    {
      title: "",
      isCompleted: false,
    },
    {
      title: "",
      isCompleted: false,
    },
  ]);

  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [error, setError] = useState({
    isError: false,
    msg: "",
    field: {},
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setTaskInfo({
      ...taskInfo,
      [name]: value,
    });
  }

  function addmoreSubtasks() {
    setSubTasks([
      ...subtasks,
      {
        title: "",
        isCompleted: false,
      },
    ]);
  }

  function removeInput(d) {
    setSubTasks(subtasks.filter((s, i) => i !== d));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description, status } = taskInfo;
    if (!subtasks || !title || !description || !status) {
      setError({
        isError: true,
        msg: "This field required",
        field: {
          taskInfo,
          subtasks,
        },
      });
    }

    const data = {
      title: title,
      description: description,
      status: status,
      subtasks: subtasks,
    };

    if (!error) {
      console.log(data);
    }
  }

  // console.log(error.field.subtasks[0]);
  function subTasks(e, i) {
    const { value, name } = e.target;

    let newSubtasks = [...subtasks];
    newSubtasks[i][name] = value;
    setSubTasks(newSubtasks);
  }

  return (
    <div className="absolute inset-0 max-h-min flex flex-col gap-2 items-start max-w-fit px-[1.3rem] py-4  m-auto rounded-md bg-primary-500">
      <div className="flex items-center justify-between w-full ">
        <h3 className="text-[15px] font-plus-jakarta-sans font-bold text-primary-600">
          Add New Task
        </h3>
        <XMarkIcon
          className="size-4 text-primary-600 hover:text-primary-100"
          role="button"
          //nClick={() => dispatch(closeColumnModal())}
        />
      </div>
      <form className="flex flex-col  gap-3" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="title"
            className="text-[15px] font-plus-jakarta-sans font-medium text-white"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            className={`${
              error?.field?.taskInfo?.title === ""
                ? "bg-transparent border-1 border-secondary-400  outline-none  w-[20rem] h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
                : "bg-transparent border-1 border-gray-400 outline-none  w-[20rem] h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
            }`}
          />
          {error?.field?.taskInfo?.title === "" && (
            <p className="text-[7px] text-secondary-400 font-plus-jakarta-sans absolute top-12 left-[16rem]">
              {error.msg}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="description"
            className="text-[15px] font-plus-jakarta-sans font-medium text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            onChange={handleChange}
            placeholder="e.g. It’s always good to take a break.This 15 minute break will recharge the batteries a little."
            className={`${
              error?.field?.taskInfo?.description === ""
                ? "bg-transparent border-1 border-secondary-400 text-[12px] outline-none  w-[20rem] h-[6rem] py-1 flex items-start justify-start px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
                : "bg-transparent border-1 border-gray-400 text-[12px] outline-none  w-[20rem] h-[6rem] py-1 flex items-start justify-start px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
            }`}
          />
          {error?.field?.taskInfo?.description === "" && (
            <p className="text-[7px] text-secondary-400 font-plus-jakarta-sans absolute top-[6.7rem] left-[16rem]">
              {error.msg}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="title"
            className="text-[15px] font-plus-jakarta-sans font-medium text-white"
          >
            Subtasks
          </label>
          {subtasks.map((s, i) => {
            return (
              <div
                key={i}
                className="w-[20rem] flex items-center justify-start relative"
              >
                <input
                  onChange={(e) => subTasks(e, i)}
                  name="title"
                  placeholder="e.g tasks that should be done "
                  className={`${
                    error?.field?.subtasks
                      ? "bg-transparent border-1 border-secondary-400 outline-none w-full  h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer placeholder:text-[12px]"
                      : "bg-transparent border-1 border-gray-400 outline-none w-full  h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer placeholder:text-[12px]"
                  }`}
                />

                <button onClick={() => removeInput(i)}>
                  <XMarkIcon className="size-6 text-gray-600 hover:text-secondary-400 cursor-pointer" />
                </button>
                {error?.field.subtasks && (
                  <p className="text-[6.6px] text-secondary-400 font-plus-jakarta-sans absolute top-5 left-[14.7rem]">
                    {error.msg}
                  </p>
                )}
              </div>
            );
          })}{" "}
          <button
            className="bg-white rounded-full flex items-center justify-center text-primary-100 text-[13px] py-2 font-medium font-plus-jakarta-sans"
            onClick={() => addmoreSubtasks()}
          >
            <PlusIcon className="size-4" /> Add New Subtask
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-plus-jakarta-sans font-medium text-white">
            status
          </label>
          <Select
            onChange={handleChange}
            error={error?.field?.taskInfo?.status}
          />
        </div>
        <button className="bg-primary-100 text-white rounded-full text-[13px] font-plus-jakarta-sans font-medium py-2 disabled:cursor-not-allowed disabled:bg-primary-600">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
