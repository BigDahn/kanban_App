import { createSlice } from "@reduxjs/toolkit";
import { boards } from "../../../data.json";

const initialState = {
  data: boards,
  activeState: boards.at(0).name,
  addColumnModal: false,
  addNewTask: false,
  editTaskModal: false,
  editTaskInfo: [],
  editTask: [],
  sideTaskModal: false,
  isEdit: false,
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
    addNewTaskBtn: (state, action) => {
      state.addNewTask = true;
    },
    closeAddNewTaskModal: (state, action) => {
      state.addNewTask = false;
    },
    openEditTaskModal: (state, action) => {
      state.editTaskModal = true;
      state.editTaskInfo = action.payload;
      state.editTask = state.data
        .filter((s) => s.name === state.activeState)[0]
        .columns.filter((s) => s.name === action.payload.name)[0]
        .tasks.filter((s) => s.title === action.payload.title)[0];
    },
    closeEditTaskModal: (state, action) => {
      state.editTaskModal = false;
      state.isEdit = false;
      state.sideTaskModal = false;
    },
    openSideTaskModal: (state) => {
      state.sideTaskModal = true;
    },
    editTaskOn: (state) => {
      state.isEdit = true;
      state.sideTaskModal = false;
    },
    EditUpdate: (state, action) => {
      console.log(action.payload);
      state.editTaskModal = false;
      state.isEdit = false;
      state.sideTaskModal = false;
      const data = state.data.map((s) => {
        if (s.name === state.activeState) {
          return {
            ...s,
            columns: s.columns
              .map((s) => {
                if (s.name === action.payload.status) {
                  return {
                    ...s,
                    tasks: [...s.tasks, action.payload],
                  };
                }
                return s;
              })
              .map((s) => {
                if (s.name === state.editTaskInfo.name) {
                  return {
                    ...s,
                    tasks: s.tasks.filter(
                      (s) => s.title !== action.payload.title
                    ),
                  };
                }
                return s;
              }),
          };
        }
        return s;
      });
      state.data = data;
    },
  },
});

export const {
  changeActiveState,
  editTasks,
  openSideTaskModal,
  newColumn,
  closeColumnModal,
  addColumn,
  addNewTaskBtn,
  closeAddNewTaskModal,
  openEditTaskModal,
  closeEditTaskModal,
  editTaskOn,
  EditUpdate,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;

/* state.data
        .filter((s) => s.name === state.activeState)[0]
        .columns */
