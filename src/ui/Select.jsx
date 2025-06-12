import React from "react";
import { useSelector } from "react-redux";

function Select({ onChange, error }) {
  const { data, activeState } = useSelector((state) => state.kanban);
  const { isDarkMode } = useSelector((state) => state.theme);
  return (
    <select
      name="status"
      onChange={onChange}
      className={`${
        isDarkMode
          ? "bg-transparent border-1 border-gray-400 outline-none w-[295px] md:w-[20rem] h-[40px] px-2 capitalize rounded-sm text-white text-[13px] hover:border-primary-100 cursor-pointer"
          : "bg-transparent border-1 border-gray-400 outline-none w-[295px] md:w-[20rem] h-[40px] px-2 capitalize rounded-sm text-black text-[13px] hover:border-primary-100 cursor-pointer"
      } ${
        error === "" &&
        "bg-transparent border-1 border-secondary-400 text-[13px]  outline-none  w-[20rem] h-[40px] px-2 rounded-sm  hover:border-primary-100 cursor-pointer"
      }`}
    >
      <option className="bg-primary-500 text-[10px] text-primary-600 font-plus-jakarta-sans">
        select an option below
      </option>
      {data
        .filter((s) => s.name === activeState)[0]
        .columns.map((s, i) => (
          <option
            key={i}
            className="bg-primary-500  text-[12px] text-primary-600 rounded-sm outline-none"
          >
            {s.name}
          </option>
        ))}
    </select>
  );
}

export default Select;
