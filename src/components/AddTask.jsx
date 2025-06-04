import {
  HandRaisedIcon,
  PlusIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

function AddTask() {
  const [numberSubtasks, setNumberSubtasks] = useState(2);
  let newArray = Array.from({ length: numberSubtasks }, (s, i) => i);

  function increaseTasks() {
    setNumberSubtasks((s) => s + 1);
    console.log(numberSubtasks);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="absolute inset-0 max-h-min flex flex-col gap-5 items-start max-w-fit px-[1.3rem] py-4  m-auto rounded-md bg-primary-500">
      <div className="flex items-center justify-between w-full ">
        <h3 className="text-[15px] font-plus-jakarta-sans font-bold text-primary-600">
          Add New Task
        </h3>
        <XMarkIcon
          className="size-4 text-primary-600 hover:text-primary-100"
          role="button"
          // onClick={() => dispatch(closeColumnModal())}
        />
      </div>
      <form className="flex flex-col  gap-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-[15px] font-plus-jakarta-sans font-medium text-white"
          >
            Title
          </label>
          <input
            name="title"
            type="text"
            className="bg-transparent border-1 border-gray-400 outline-none  w-[20rem] h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Description"
            className="text-[15px] font-plus-jakarta-sans font-medium text-white"
          >
            Description
          </label>
          <textarea
            name="Description"
            type="text"
            placeholder="e.g. It’s always good to take a break.This 15 minute break will recharge the batteries a little."
            className="bg-transparent border-1 border-gray-400 text-[12px] outline-none  w-[20rem] h-[6rem] py-1 flex items-start justify-start px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subtasks"
            className="text-[15px] font-plus-jakarta-sans font-medium text-white"
          >
            Subtasks
          </label>
          {newArray.map((s, i) => {
            return (
              <div key={i}>
                <input className="bg-transparent border-1 border-gray-400 outline-none  w-[20rem] h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer" />
                <button>x</button>
              </div>
            );
          })}{" "}
          <button
            className="bg-white rounded-full flex items-center justify-center text-primary-100 text-[13px] py-2 font-bold font-plus-jakarta-sans"
            onClick={() => increaseTasks()}
          >
            <PlusIcon className="size-4" /> Add New Subtask
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
