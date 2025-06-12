import React from "react";
import { useSelector } from "react-redux";

function Container({ children }) {
  const { isSidebarOpen } = useSelector((state) => state.theme);
  return (
    <div
      className={`${
        isSidebarOpen
          ? "transition-all  ease-linear delay-50 grid md:grid-cols-[240px_1fr] md:grid-rows-1 overflow-hidden"
          : " md:grid md:grid-cols-[240px_1fr] md:grid-rows-1  overflow-hidden transition-all ml-[-240px] ease-linear delay-50  "
      }`}
    >
      {children}
    </div>
  );
}

export default Container;
/*"grid grid-cols-[240px_1fr]" */
