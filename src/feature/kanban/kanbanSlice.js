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
  falseData: [],
  isDeleteBoard: false,
  isDeleteTask: false,
  isHeaderModalOpen: false,
  newBoard: false,
  editBoard: false,
  edit_updateBoard: [],
  mobileSidebar: false,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    open_closeMobileSidebar: (state) => {
      state.mobileSidebar = !state.mobileSidebar;
      state.isHeaderModalOpen = false;
    },
    changeActiveState: (state, action) => {
      state.activeState = state.data.at(action.payload).name;
      state.mobileSidebar = false;
    },
    newColumn: (state) => {
      state.addColumnModal = true;
    },
    closeColumnModal: (state) => {
      state.addColumnModal = false;
    },
    addColumn: (state, action) => {
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
    addNewTaskBtn: (state) => {
      state.addNewTask = true;
      state.mobileSidebar = false;
      state.isHeaderModalOpen = false;
    },
    closeAddNewTaskModal: (state) => {
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
    closeEditTaskModal: (state) => {
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
      state.editTaskModal = false;
      state.isEdit = false;
      state.sideTaskModal = false;

      const data = state.data
        .map((s) => {
          if (s.name === state.activeState) {
            return {
              ...s,
              columns: s.columns.map((s) => {
                if (
                  s.name === action.payload.status &&
                  state.editTaskInfo.name !== action.payload.status
                ) {
                  return {
                    ...s,
                    tasks: [...s.tasks, action.payload],
                  };
                } else if (
                  s.name === action.payload.status &&
                  state.editTaskInfo.name === action.payload.status
                ) {
                  return {
                    ...s,
                    tasks: s.tasks.map((s) => {
                      if (s.title === action.payload.title) {
                        return action.payload;
                      }
                      return s;
                    }),
                  };
                }
                return s;
              }),
            };
          }
          return s;
        })
        .map((s) => {
          if (s.name === state.activeState) {
            return {
              ...s,
              columns: s.columns.map((s) => {
                if (
                  s.name === state.editTask.status &&
                  state.editTaskInfo.name !== action.payload.status
                ) {
                  return {
                    ...s,
                    tasks: s.tasks.filter(
                      (s) => s.title !== state.editTask.title
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
      state.falseData = data;
    },
    addNewTask: (state, action) => {
      const data = state.data.map((s) => {
        if (s.name === state.activeState) {
          return {
            ...s,
            columns: s.columns.map((s) => {
              if (s.name === action.payload.status) {
                return {
                  ...s,
                  tasks: [...s.tasks, action.payload],
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
    isDeleteTaskBtn: (state) => {
      state.isDeleteTask = true;
      state.editTaskModal = false;
      state.sideTaskModal = false;
    },
    cancelDeleteTaskBtn: (state) => {
      state.isDeleteTask = false;
    },
    deleteCurrentTask: (state) => {
      state.isDeleteTask = false;
      const data = state.data.map((s) => {
        if (s.name === state.activeState) {
          return {
            ...s,
            columns: s.columns.map((s) => {
              if (s.name === state.editTask.status) {
                return {
                  ...s,
                  tasks: s.tasks.filter(
                    (s) => s.title !== state.editTask.title
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
    openHeaderModal: (state) => {
      state.isHeaderModalOpen = !state.isHeaderModalOpen;
      state.mobileSidebar = false;
    },
    closeHeaderModal: (state) => {
      state.isHeaderModalOpen = false;
    },
    isDeleteBoardBtn: (state) => {
      state.isDeleteBoard = true;
      state.isHeaderModalOpen = false;
    },
    cancelDeleteBoardBtn: (state) => {
      state.isDeleteBoard = false;
    },
    createNewBoard: (state) => {
      state.newBoard = true;
      state.mobileSidebar = false;
    },
    closeNewBoardModal: (state) => {
      state.newBoard = false;
    },
    newBoardData: (state, action) => {
      state.newBoard = false;
      const data = [...state.data, action.payload];

      state.data = data;
    },
    deleteBoard: (state) => {
      const data = state.data.filter((s) => s.name !== state.activeState);
      state.data = data;
      state.isDeleteBoard = false;
      state.activeState = state.data.at(0)?.name ?? null;
    },
    editBoardModal: (state, action) => {
      state.editBoard = true;
      state.isHeaderModalOpen = false;
      state.edit_updateBoard = state.data.filter(
        (s) => s.name === state.activeState
      )[0];
    },
    updateBoardBtn: (state, action) => {
      state.editBoard = false;
      const data = state.data.map((s) => {
        if (s.name === state.activeState) {
          return {
            name: action.payload.name,
            columns: action.payload.columns,
          };
        }
        return s;
      });
      state.data = data;
      state.activeState = action.payload.name;
    },
    closeEditBoardBtn: (state) => {
      state.editBoard = false;
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
  addNewTask,
  isDeleteBoard,
  isDeleteTask,
  isDeleteTaskBtn,
  cancelDeleteTaskBtn,
  isHeaderModalOpen,
  openHeaderModal,
  closeHeaderModal,
  isDeleteBoardBtn,
  cancelDeleteBoardBtn,
  newBoard,
  createNewBoard,
  closeNewBoardModal,
  newBoardData,
  deleteBoard,
  deleteCurrentTask,
  editBoardModal,
  updateBoardBtn,
  open_closeMobileSidebar,
  closeEditBoardBtn,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
