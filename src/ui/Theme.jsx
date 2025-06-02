import { useDispatch, useSelector } from "react-redux";
import { themeToggle } from "../feature/theme/themeSlice";
function Theme() {
  const { isDarkMode } = useSelector((store) => store.theme);

  const dispatch = useDispatch();

  return (
    <div>
      <label
        htmlFor="check"
        className="inline-flex w-[31px] h-[15px] items-center justify-center rounded-full bg-purple-600 cursor-pointer "
      >
        <input
          type="checkbox"
          id="check"
          name="check"
          checked={isDarkMode}
          className="sr-only"
          onChange={() => dispatch(themeToggle())}
        />

        <div
          className={`${
            isDarkMode
              ? "relative translate-x-2 w-[15px] h-[15px] rounded-full bg-white transition-all ease-linear  duration-600"
              : "relative -translate-x-2 h-[15px] w-[15px] rounded-full bg-white  transition-all ease-linear duration-600"
          }`}
        ></div>
      </label>
    </div>
  );
}

export default Theme;
