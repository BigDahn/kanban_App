import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: true,
  isSidebarOpen: true,
  addColumnModal: false,
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
    newColumn: (state) => {
      state.addColumnModal = true;
    },
    closeColumnModal: (state) => {
      state.addColumnModal = false;
    },
  },
});

export const {
  closeSidebar,
  openSideBar,
  themeToggle,
  newColumn,
  closeColumnModal,
} = themeSlice.actions;

export default themeSlice.reducer;
