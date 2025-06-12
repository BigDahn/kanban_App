import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoardBtn } from "../feature/kanban/kanbanSlice";

function EditBoard() {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { edit_updateBoard } = useSelector((state) => state.kanban);
  const dispatch = useDispatch();
  const { name, columns } = edit_updateBoard;

  console.log(columns);

  const [newcolumns, setNewColumns] = useState(
    columns.map((s) => {
      return {
        name: s.name,
        tasks: s.tasks,
      };
    })
  );

  const [boardInfo, setBoardInfo] = useState({
    name: name,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  }
  function addColumns(e) {
    e.preventDefault();
    setNewColumns([
      ...newcolumns,
      {
        name: "",
        tasks: [],
      },
    ]);
  }
  function removeColumns(e, d) {
    e.preventDefault();
    setNewColumns((col) => col.filter((s, i) => i !== d));
  }
  function subTasks(e, i) {
    const { value, name } = e.target;

    let newSubtasks = [...newcolumns];
    newSubtasks[i][name] = value;

    setNewColumns(newSubtasks);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: boardInfo.name,
      columns: newcolumns,
    };

    console.log(data);

    dispatch(updateBoardBtn(data));
  }

  return (
    <main className="fixed inset-0  flex items-center justify-center w-screen h-screen m-auto rounded-md z-50 bg-primary-400/52">
      <form
        className={`${
          isDarkMode
            ? "w-[343px] md:w-[430px] min-h-fit flex flex-col gap-6 px-6 py-5  m-auto rounded-md bg-primary-400"
            : "  w-[343px] md:w-[430px] min-h-fit flex flex-col gap-6 px-6 py-5  m-auto  rounded-md bg-white"
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
            Edit Board
          </h3>
          <XMarkIcon
            className="size-4 cursor-pointer hover:text-primary-100 text-primary-600"
            // onClick={() => dispatch(closeEditTaskModal())}
          />
        </div>
        <section className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="name"
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
              name="name"
              className={`${
                isDarkMode
                  ? "outline-none border rounded-md px-3 text-white h-[40px] border-white/25 text-[13px] font-plus-jakarta-sans"
                  : "outline-none border rounded-md px-3 text-black  h-[40px] border-gray-400 cursor-pointer hover:border-primary-100 text-[13px] font-plus-jakarta-sans"
              }`}
              value={boardInfo.name}
              onChange={handleInputChange}
            />
          </div>
          {
            <div className="flex flex-col gap-3 ">
              {newcolumns.length >= 1 && (
                <label
                  htmlFor="name"
                  className={`${
                    isDarkMode
                      ? "text-[12px] font-plus-jakarta-sans font-bold text-white"
                      : "text-[12px] font-plus-jakarta-sans font-bold text-primary-600"
                  }`}
                >
                  Subtasks
                </label>
              )}
              {newcolumns.map((s, i) => {
                const { name } = s;
                return (
                  <div
                    key={i}
                    className="w-full flex gap-3 items-center justify-start relative"
                  >
                    <input
                      onChange={(e) => subTasks(e, i)}
                      name="name"
                      required
                      value={name}
                      placeholder="e.g tasks that should be done "
                      className={`${
                        isDarkMode
                          ? "bg-transparent border-1 border-gray-400 outline-none  w-full  h-[40px] px-2 capitalize rounded-sm text-white text-[13px] hover:border-primary-100 cursor-pointer placeholder:lowercase"
                          : "bg-transparent border-1 border-gray-400 outline-none  w-full  h-[40px] px-2 capitalize rounded-sm text-black text-[13px] hover:border-primary-100 cursor-pointer placeholder:lowercase"
                      }`}
                    />

                    <button onClick={(e) => removeColumns(e, i)}>
                      <XMarkIcon className="size-6 text-gray-600 hover:text-secondary-400 cursor-pointer" />
                    </button>
                  </div>
                );
              })}{" "}
              <button
                className={`${
                  isDarkMode
                    ? "bg-white rounded-full flex items-center justify-center  mt-2 text-primary-100 text-[13px] py-2 font-bold cursor-pointer font-plus-jakarta-sans"
                    : "bg-primary-100/25 rounded-full flex items-center mt-2 justify-center text-primary-100 text-[13px] py-2 font-bold cursor-pointer font-plus-jakarta-sans"
                }`}
                onClick={addColumns}
              >
                <PlusIcon className="size-4" /> Add New Subtask
              </button>
            </div>
          }
          <button
            className={`${
              isDarkMode
                ? "bg-primary-100 rounded-full flex items-center justify-center text-white text-[13px]  h-[40px] font-bold cursor-pointer font-plus-jakarta-sans"
                : "bg-primary-100 rounded-full flex items-center justify-center text-white text-[13px]  h-[40px] font-bold cursor-pointer font-plus-jakarta-sans"
            }`}
            onClick={handleSubmit}
          >
            Update Changes
          </button>
        </section>
      </form>
    </main>
  );
}

export default EditBoard;
