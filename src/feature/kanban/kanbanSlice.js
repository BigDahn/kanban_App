import { createSlice } from "@reduxjs/toolkit";
import { boards } from "../../../data.json";

const initialState = {
  data: boards,
  activeState: boards.at(0).name,
  addColumnModal: false,
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
    newColumn: (state) => {
      state.addColumnModal = true;
    },
    closeColumnModal: (state) => {
      state.addColumnModal = false;
    },
    addColumn: (state, action) => {
      console.log(action.payload);
      state.data = state.data.map((s) => {
        if (s.name === state.activeState) {
          return {
            ...s,
            columns: [...s.columns, action.payload],
          };
        }
        return s;
      });
    },
  },
});

export const {
  changeActiveState,
  editTasks,
  newColumn,
  closeColumnModal,
  addColumn,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
