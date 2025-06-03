import { createSlice } from "@reduxjs/toolkit";
import { boards } from "../../../data.json";

const initialState = {
  data: boards,
  activeState: boards.at(0).name,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    changeActiveState: (state, action) => {
      state.activeState = state.data.at(action.payload).name;
    },
    addNewColumn: (state, action) => {
      console.log(action);
    },
    editTasks: (state, action) => {
      console.log(action);
    },
  },
});

export const { changeActiveState, editTasks } = kanbanSlice.actions;
export default kanbanSlice.reducer;
