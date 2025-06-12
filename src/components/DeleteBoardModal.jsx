import { useDispatch, useSelector } from "react-redux";
import {
  cancelDeleteBoardBtn,
  deleteBoard,
} from "../feature/kanban/kanbanSlice";

function DeleteBoardModal() {
  const { activeState } = useSelector((state) => state.kanban);
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <section className="fixed inset-0  flex items-center justify-center w- h-screen m-auto rounded-md z-50 bg-primary-400/52">
      <div
        className={`${
          isDarkMode
            ? "w-[343px] h-[284px] md:w-[480px] md:h-[229px] bg-primary-300 px-5 md:px-8 py-7 md:py-8 flex flex-col gap-4 justify-evenly rounded-md"
            : "w-[343px] h-[284px] md:w-[480px] md:h-[229px] bg-white px-5 md:px-8 md:py-8 py-7 flex flex-col gap-4 justify-evenly rounded-md"
        }`}
      >
        <div className="flex flex-col gap-3 w-full ">
          <h3 className="font-bold font-plus-jakarta-sans text-secondary-400 text-[18px]">
            Delete this board?
          </h3>
          <p className="font-medium font-plus-jakarta-sans text-primary-500 text-[13px] leading-[23px] max-w-[295px] md:max-w-[416px]">
            Are you sure you want to delete the {`"${activeState}"`} board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:justify-between">
          <button
            onClick={() => dispatch(deleteBoard())}
            className="bg-secondary-400 cursor-pointer hover:bg-secondary-500 text-white rounded-full w-[295px] md:w-[200px] h-[40px] text-[13px] font-bold font-plus-jakarta-sans"
          >
            Delete
          </button>
          <button
            onClick={() => dispatch(cancelDeleteBoardBtn())}
            className={`${
              isDarkMode
                ? "bg-primary-50 cursor-pointer hover:bg-white text-primary-100 w-[295px] md:w-[200px] rounded-full h-[40px] text-[13px] font-bold font-plus-jakarta-sans"
                : "bg-primary-50 cursor-pointer hover:bg-primary-100/25 text-primary-100 w-[295px] md:w-[200px] rounded-full h-[40px] text-[13px] font-bold font-plus-jakarta-sans"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteBoardModal;
