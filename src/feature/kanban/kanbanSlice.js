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
      console.log(action.payload);
      state.activeState = state.data.at(action.payload).name;
    },
  },
});

export const { changeActiveState } = kanbanSlice.actions;
export default kanbanSlice.reducer;
