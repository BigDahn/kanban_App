import { configureStore } from "@reduxjs/toolkit";
import KanbanReducer from "./feature/kanban/kanbanSlice";
import ThemeReducer from "./feature/theme/themeSlice";
const store = configureStore({
  reducer: {
    kanban: KanbanReducer,
    theme: ThemeReducer,
  },
});

export default store;
