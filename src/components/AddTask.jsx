import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";

import { useState } from "react";
import Select from "../ui/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  closeAddNewTaskModal,
} from "../feature/kanban/kanbanSlice";

function AddTask() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
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
    setError({});
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

    if (title === "" || status === "") {
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
    if (title && status) {
      setError({
        isError: false,
        msg: "",
        field: {},
      });

      dispatch(addNewTask(data));
      dispatch(closeAddNewTaskModal());
    }
  }

  function subTasks(e, i) {
    const { value, name } = e.target;

    let newSubtasks = [...subtasks];
    newSubtasks[i][name] = value;
    setSubTasks(newSubtasks);
  }

  return (
    <section className="fixed inset-0 w-screen flex justify-center items-center  m-auto rounded-md z-50 bg-primary-400/52">
      <div
        className={`${
          isDarkMode
            ? "max-h-fit flex overflow-y-scroll flex-col gap-6 md:gap-5 items-start relative top-[10px] md:top-0 md:max-w-fit max-w-[343px] px-[1.3rem] py-4 md:py-4  m-auto rounded-md bg-primary-500 md:overflow-y-hidden"
            : "max-h-fit flex flex-col gap-6 md:gap-5 items-start  relative top-[10px] md:top-0 max-w-[343px] md:max-w-fit px-[1.3rem] py-4 md:py-4  m-auto rounded-md bg-white"
        }`}
      >
        <div className="flex items-center justify-between w-full ">
          <h3
            className={`${
              isDarkMode
                ? " text-[18px] md:text-[15px] font-plus-jakarta-sans font-bold text-white"
                : "md:text-[15px] font-plus-jakarta-sans font-bold text-primary-200"
            }`}
          >
            Add New Task
          </h3>
          <XMarkIcon
            className="size-4 text-primary-600 hover:text-primary-100 cursor-pointer"
            role="button"
            onClick={() => dispatch(closeAddNewTaskModal())}
          />
        </div>
        <form
          className="flex flex-col  gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-3 md:gap-2 relative">
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
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-transparent border-1 border-gray-400 outline-none  w-[295px] md:w-[20rem] h-[40px] px-2 capitalize rounded-sm text-white text-[13px] hover:border-primary-100 cursor-pointer"
                  : "bg-transparent border-1 border-gray-400 outline-none  w-[295px] md:w-[20rem] h-[40px] px-2 capitalize rounded-sm text-black text-[13px] hover:border-primary-100 cursor-pointer"
              } ${
                error?.field?.taskInfo?.title === "" &&
                "bg-transparent border-1 border-secondary-400 text-[13px]  outline-none  w-[20rem] h-[40px] px-2 rounded-sm  hover:border-primary-100 cursor-pointer"
              }`}
            />
            {error?.field?.taskInfo?.title === "" && (
              <p className="text-[7px] text-secondary-400 font-plus-jakarta-sans absolute top-12 left-[16rem]">
                {error.msg}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 md:gap-2 relative">
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
              onChange={handleChange}
              placeholder="e.g. It’s always good to take a break.This 15 minute break will recharge the batteries a little."
              className={`${
                isDarkMode
                  ? "bg-transparent border-1 border-gray-400 text-[13px] outline-none w-[295px] md:w-[20rem] h-[6rem] py-1 flex items-start justify-start px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
                  : "bg-transparent border-1 border-gray-400 text-[13px] outline-none w-[295px] md:w-[20rem] h-[6rem] py-1 flex items-start justify-start px-2 rounded-sm text-black hover:border-primary-100 cursor-pointer"
              }`}
            />
          </div>
          <div className="w-[295px] md:w-full">
            {subtasks.length >= 1 && (
              <div className="flex flex-col gap-3 md:gap-2 ">
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
                {subtasks.map((s, i) => {
                  return (
                    <div
                      key={i}
                      className=" w-[295px] md:w-[20rem] flex items-center justify-start relative"
                    >
                      <input
                        onChange={(e) => subTasks(e, i)}
                        name="title"
                        required
                        placeholder="e.g tasks that should be done "
                        className={`${
                          isDarkMode
                            ? "bg-transparent border-1 border-gray-400 outline-none w-[295px] md:w-[20rem] h-[40px] px-2 capitalize rounded-sm text-white text-[13px] hover:border-primary-100 cursor-pointer placeholder:lowercase"
                            : "bg-transparent border-1 border-gray-400 outline-none w-[295px]  md:w-[20rem] h-[40px] px-2 capitalize rounded-sm text-black text-[13px] hover:border-primary-100 cursor-pointer placeholder:lowercase"
                        }`}
                      />

                      <button onClick={() => removeInput(i)}>
                        <XMarkIcon className="size-6 text-gray-600 hover:text-secondary-400 cursor-pointer" />
                      </button>
                    </div>
                  );
                })}{" "}
                <button
                  className={`${
                    isDarkMode
                      ? "bg-white rounded-full flex items-center justify-center text-primary-100 text-[13px] h-[40px] font-bold font-plus-jakarta-sans cursor-pointer"
                      : "bg-primary-100/20 rounded-full flex items-center justify-center text-primary-100 text-[13px] h-[40px] font-bold font-plus-jakarta-sans cursor-pointer"
                  }`}
                  onClick={() => addmoreSubtasks()}
                >
                  <PlusIcon className="size-4" /> Add New Subtask
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-[295px] md:w-full">
            <label
              className={`${
                isDarkMode
                  ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                  : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
              }`}
            >
              Status
            </label>
            <Select
              onChange={handleChange}
              error={error?.field?.taskInfo?.status}
            />
          </div>
          <button
            disabled={error.isError}
            className="bg-primary-100 text-white rounded-full text-[13px] font-plus-jakarta-sans font-medium py-2 disabled:cursor-not-allowed disabled:bg-primary-600"
          >
            Create Task
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddTask;
