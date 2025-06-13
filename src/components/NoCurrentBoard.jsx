import { PlusIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { createNewBoard } from "../feature/kanban/kanbanSlice";

function NoCurrentBoard() {
  const dispatch = useDispatch();
  return (
    <main className="w-full h-full flex items-center m-auto justify-center">
      <div className="w-[343px] md:w-[493px] h-[118px] md:h-[103px] flex flex-col justify-center items-center gap-3">
        <h3 className="text-[18px] font-plus-jakarta-sans font-bold text-center text-primary-600">
          No Boards available, click the button below to create a new board
        </h3>
        <button
          onClick={() => dispatch(createNewBoard())}
          className="h-[48px] flex items-center justify-center w-[174px] rounded-full text-white bg-primary-100 font-plus-jakarta-sans text-[15px] font-bold cursor-pointer "
        >
          <PlusIcon className="size-3" />
          <span>Create New Board</span>
        </button>
      </div>
    </main>
  );
}

export default NoCurrentBoard;
