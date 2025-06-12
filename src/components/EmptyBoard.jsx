import { PlusIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { newColumn } from "../feature/kanban/kanbanSlice";

function EmptyBoard() {
  const dispatch = useDispatch();
  return (
    <main className="w-full h-full flex items-center m-auto justify-center">
      <div className="w-[343px] md:w-[493px] h-[118px] md:h-[103px] flex flex-col justify-center items-center gap-3">
        <h3 className="text-[18px] font-plus-jakarta-sans font-bold text-center text-primary-600">
          This board is empty. Create a new column to get started.
        </h3>
        <button
          onClick={() => dispatch(newColumn())}
          className="h-[48px] flex items-center justify-center w-[174px] rounded-full text-white bg-primary-100 font-plus-jakarta-sans text-[15px] font-bold "
        >
          <PlusIcon className="size-3" />
          <span>Add New Column</span>
        </button>
      </div>
    </main>
  );
}

export default EmptyBoard;
