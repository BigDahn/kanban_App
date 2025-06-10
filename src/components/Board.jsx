import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeNewBoardModal,
  newBoardData,
} from "../feature/kanban/kanbanSlice";

function Board() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([
    {
      name: "",
      tasks: [],
    },
    {
      name: "",
      tasks: [],
    },
  ]);

  const [error, setError] = useState({
    isError: false,
    msg: "",
    field: {},
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (boardName === "") {
      setError({
        isError: true,
        msg: "This field required",
        field: {
          boardName,
          columns,
        },
      });
    }
    const data = {
      name: boardName.charAt(0).toUpperCase() + boardName.slice(1),
      columns: columns,
    };

    if (boardName !== "") {
      dispatch(newBoardData(data));
    }
  }
  function addColumns(e) {
    e.preventDefault();
    setColumns([
      ...columns,
      {
        name: "",
      },
    ]);
  }
  function removeColumns(e, d) {
    e.preventDefault();
    setColumns((col) => col.filter((s, i) => i !== d));
  }
  function handleInput(e, i) {
    const { name, value } = e.target;

    let newColumns = [...columns];
    newColumns[i][name] = value.charAt(0).toUpperCase() + value.slice(1);
    setColumns(newColumns);
  }

  return (
    <main className="fixed inset-0  flex items-center justify-center w-screen h-screen m-auto rounded-md z-50 bg-primary-400/52">
      <section
        className={`${
          isDarkMode
            ? " w-[430px] min-h-fit flex flex-col gap-6 px-6 py-5  m-auto rounded-md bg-primary-400"
            : "  w-[430px] min-h-fit flex flex-col gap-6 px-6 py-5  m-auto  rounded-md bg-white"
        }`}
      >
        <div className="flex justify-between items-center">
          <h3
            className={`${
              isDarkMode
                ? "text-[18px] font-plus-jakarta-sans font-bold text-white"
                : "text-[18px] font-plus-jakarta-sans font-bold text-primary-200"
            }`}
          >
            Add New Board
          </h3>
          <XMarkIcon
            onClick={() => dispatch(closeNewBoardModal())}
            className="size-4 text-primary-600 hover:text-primary-100 cursor-pointer"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <label
              className={`${
                isDarkMode
                  ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                  : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
              }`}
            >
              Board Name
            </label>
            <input
              type="text"
              placeholder="e.g. Web Design"
              onChange={(e) => {
                setBoardName(e.target.value), setError({});
              }}
              className={`${
                error?.field?.boardName === ""
                  ? "outline-none text-primary-600 text-[13px] font-plus-jakarta-sans border-secondary-500 border-1 rounded-sm h-[40px] px-1 hover:border-primary-100 cursor-pointer"
                  : "outline-none  text-[13px] font-plus-jakarta-sans  border-1 rounded-sm h-[40px] px-1 hover:border-primary-100 cursor-pointer"
              } ${
                isDarkMode
                  ? "bg-transparent border-1 border-gray-400 outline-none  h-[40px] px-2  rounded-sm text-white text-[13px] hover:border-primary-100 cursor-pointer"
                  : "bg-transparent border-1 border-gray-400 outline-none  h-[40px] px-2  rounded-sm text-black text-[13px] hover:border-primary-100 cursor-pointer"
              } `}
            />
            {error?.field?.boardName === "" && (
              <p className="text-[7px] text-secondary-400 font-plus-jakarta-sans absolute top-13 left-[19.7rem]">
                {error.msg}
              </p>
            )}
          </div>
          {columns.length >= 1 && (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="name"
                className={`${
                  isDarkMode
                    ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                    : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
                }`}
              >
                Board Columns
              </label>
              <div className="flex flex-col gap-3">
                {columns.map((s, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between  gap-3 relative"
                    >
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={(e) => handleInput(e, i)}
                        className={`${
                          error?.field?.columns
                            ? "bg-transparent border-1 border-secondary-400 outline-none w-full  h-[40px] px-2 rounded-sm text-white hover:border-secondary-400 cursor-pointer text-[13px]"
                            : "bg-transparent border-1 border-gray-400 outline-none w-full  h-[40px] px-2 rounded-sm  hover:border-primary-100 cursor-pointer text-[13px] capitalize"
                        } ${
                          isDarkMode
                            ? "bg-transparent border-1 border-gray-400 outline-none  h-[40px] px-2  rounded-sm text-white text-[13px] hover:border-primary-100 cursor-pointer"
                            : "bg-transparent border-1 border-gray-400 outline-none  h-[40px] px-2  rounded-sm text-black text-[13px] hover:border-primary-100 cursor-pointer"
                        }`}
                      />
                      <button onClick={(e) => removeColumns(e, i)}>
                        <XMarkIcon className="size-6 text-gray-600 hover:text-secondary-400 cursor-pointer" />
                      </button>
                      {error?.field?.columns && (
                        <p className="text-[6.6px] text-secondary-400 font-plus-jakarta-sans absolute top-5 left-[17.7rem]">
                          {error.msg}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={addColumns}
                className={`${
                  isDarkMode
                    ? "bg-white rounded-full flex items-center justify-center text-primary-100 text-[13px] h-[40px] font-bold font-plus-jakarta-sans cursor-pointer"
                    : "bg-primary-100/20 rounded-full flex items-center justify-center text-primary-100 text-[13px] h-[40px] font-bold font-plus-jakarta-sans cursor-pointer"
                }`}
              >
                <PlusIcon className="size-4 text-primary-100" />{" "}
                <h3 className="font-plus-jakarta-sans text-[13px] text-primary-100 font-bold">
                  Add New Column
                </h3>
              </button>
            </div>
          )}

          <button
            disabled={error.isError}
            className="text-[13px] font-plus-jakarta-sans font-medium text-white h-[40px] rounded-full bg-primary-100 disabled:cursor-not-allowed disabled:bg-primary-600"
          >
            Create New Board
          </button>
        </form>
      </section>
    </main>
  );
}

export default Board;
