import { XMarkIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { closeColumnModal } from "../feature/theme/themeSlice";
import { useState } from "react";

function NewColumn() {
  const { activeState, data } = useSelector((state) => state.kanban);
  const [columnName, setColumnName] = useState("");
  const dispatch = useDispatch();

  console.log(activeState, data);

  function handleNewColumn() {
    if (!columnName) return;
    console.log(columnName);
    setColumnName("");
    dispatch(closeColumnModal());
  }
  return (
    <div className="absolute inset-0 max-h-min flex flex-col gap-5 items-start px-3 py-4 w-[40vh] m-auto rounded-md bg-primary-500">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-[12px] text-primary-600 font-bold font-plus-jakarta-sans">
          Add New Column
        </h2>
        <XMarkIcon
          className="size-4 text-primary-600 hover:text-primary-100"
          role="button"
          onClick={() => dispatch(closeColumnModal())}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <input
          type="text"
          className="bg-white rounded-sm w-full text-[12px] px-3 py-1.5 outline-none"
          placeholder="Enter Column Name"
          onChange={(e) => setColumnName(e.target.value)}
        />
        <button
          className="text-[12px] text-white bg-primary-100 w-full px-3 py-1.5 rounded-sm"
          onClick={() => handleNewColumn()}
        >
          Add Column
        </button>
      </div>
    </div>
  );
}

export default NewColumn;
