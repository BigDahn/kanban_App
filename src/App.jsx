import { useSelector } from "react-redux";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import NewColumn from "./components/NewColumn";
import AddTask from "./components/AddTask";
import EditTaskModal from "./components/EditTaskModal";
import { openSideTaskModal } from "./feature/kanban/kanbanSlice";
import SmallSideModal from "./components/SmallSideModal";
import DeleteBoardModal from "./components/DeleteBoardModal";
import DeleteConfirmationTaskBox from "./components/DeleteConfirmationTaskBox";
import HeaderModal from "./components/HeaderModal";
import Board from "./components/Board";

function App() {
  const {
    sideTaskModal,
    addColumnModal,
    addNewTask,
    editTaskModal,
    isDeleteBoard,
    isDeleteTask,
    isHeaderModalOpen,
    newBoard,
  } = useSelector((state) => state.kanban);

  return (
    <main className="grid h-screen  m-auto box-border grid-rows-[80px_auto] overflow-hidden ">
      <Header />
      <Container>
        <Sidebar />
        <Main />
        {addColumnModal && <NewColumn />}
        {addNewTask && <AddTask />}
        {editTaskModal && <EditTaskModal />}
        {sideTaskModal && <SmallSideModal />}
        {isDeleteBoard && <DeleteBoardModal />}
        {isDeleteTask && <DeleteConfirmationTaskBox />}
        {isHeaderModalOpen && <HeaderModal />}
        {newBoard && <Board />}
      </Container>
    </main>
  );
}

export default App;
