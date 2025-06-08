import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function Board() {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([
    {
      name: "",
    },
    {
      name: "",
    },
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      board: boardName,
      columns: columns,
    };

    console.log(data);
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
    newColumns[i][name] = value;
    setColumns(newColumns);
  }

  return (
    <main className="fixed inset-0  flex items-center justify-center w-screen h-screen m-auto rounded-md z-50 bg-primary-400/52">
      <section className="w-[430px] min-h-fit bg-primary-400 rounded-md px-6 py-5 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-[18px] font-plus-jakarta-sans">
            Add New Board
          </h3>
          <XMarkIcon className="size-4 text-primary-600 hover:text-primary-100 cursor-pointer" />
        </div>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-white font-plus-jakarta-sans text-[12px] font-bold">
              Board Name
            </label>
            <input
              type="text"
              placeholder="e.g. Web Design"
              onChange={(e) => setBoardName(e.target.value)}
              className="outline-none text-primary-600 text-[13px] font-plus-jakarta-sans border-white/25 border-1 rounded-sm h-[40px] px-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="columns"
              className="text-white font-plus-jakarta-sans text-[12px] font-bold"
            >
              Board Columns
            </label>
            <div className="flex flex-col gap-3">
              {columns.map((s, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between  gap-3"
                  >
                    <input
                      type="text"
                      name="columns"
                      onChange={(e) => handleInput(e, i)}
                      className="outline-none w-full text-primary-600 text-[13px] font-plus-jakarta-sans border-white/25 border-1 rounded-sm h-[40px] px-1"
                    />
                    <button onClick={(e) => removeColumns(e, i)}>
                      <XMarkIcon className="size-6 text-gray-600 hover:text-secondary-400 cursor-pointer" />
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={addColumns}
              className="flex items-center justify-center bg-white rounded-full h-[40px]"
            >
              <PlusIcon className="size-4 text-primary-100" />{" "}
              <h3 className="font-plus-jakarta-sans text-[13px] text-primary-100 font-bold">
                Add New Column
              </h3>
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="text-[13px] font-plus-jakarta-sans font-medium text-white h-[40px] rounded-full bg-primary-100"
          >
            Create New Board
          </button>
        </form>
      </section>
    </main>
  );
}

export default Board;
