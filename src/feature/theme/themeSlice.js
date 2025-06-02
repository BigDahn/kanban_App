import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: true,
  isSidebarOpen: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openSideBar: (state) => {
      state.isSidebarOpen = true;
    },
    themeToggle: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { closeSidebar, openSideBar, themeToggle } = themeSlice.actions;

export default themeSlice.reducer;
