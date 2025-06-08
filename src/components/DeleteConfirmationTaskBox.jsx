import { useDispatch } from "react-redux";
import { cancelDeleteTaskBtn } from "../feature/kanban/kanbanSlice";

function DeleteConfirmationTaskBox() {
  const dispatch = useDispatch();
  return (
    <section className="fixed inset-0  flex items-center justify-center w- h-screen m-auto rounded-md z-50 bg-primary-400/52">
      <div className="w-[480px] h-[229px] bg-primary-300 px-8 py-8 flex flex-col gap-4 justify-evenly rounded-md">
        <div className="flex flex-col gap-3 ">
          <h3 className="font-bold font-plus-jakarta-sans text-secondary-400 text-[18px]">
            Delete this task?
          </h3>
          <p className="font-medium font-plus-jakarta-sans text-primary-500 text-[13px] leading-[23px] max-w-[416px]">
            Are you sure you want to delete this task? This action will remove
            this current task and cannot be reversed.
          </p>
        </div>
        <div className="flex justify-between">
          <button className="bg-secondary-400 cursor-pointer hover:bg-secondary-500 text-white rounded-full w-[200px] h-[40px] text-[13px] font-bold font-plus-jakarta-sans">
            Delete
          </button>
          <button
            onClick={() => dispatch(cancelDeleteTaskBtn())}
            className="bg-primary-50 cursor-pointer hover:bg-white text-primary-100 w-[200px] rounded-full h-[40px] text-[13px] font-bold font-plus-jakarta-sans"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteConfirmationTaskBox;
