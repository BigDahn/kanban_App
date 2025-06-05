import React from "react";
import { useSelector } from "react-redux";

function Select({ onChange, error }) {
  const { data, activeState } = useSelector((state) => state.kanban);

  return (
    <select
      name="status"
      onChange={onChange}
      className={`${
        error === ""
          ? "bg-transparent border-1 text-[13px] font-plus-jakarta-sans font-medium border-secondary-400 outline-none  w-[20rem] h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
          : "bg-transparent border-1 text-[13px] font-plus-jakarta-sans font-medium border-gray-400 outline-none  w-[20rem] h-[2rem] px-2 rounded-sm text-white hover:border-primary-100 cursor-pointer"
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
            className="bg-primary-500 text-[12px] text-primary-600"
          >
            {s.name}
          </option>
        ))}
    </select>
  );
}

export default Select;
