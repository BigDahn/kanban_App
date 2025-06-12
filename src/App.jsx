import { useSelector } from "react-redux";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import NewColumn from "./components/NewColumn";
import AddTask from "./components/AddTask";
import EditTaskModal from "./components/EditTaskModal";
import SmallSideModal from "./components/SmallSideModal";
import DeleteBoardModal from "./components/DeleteBoardModal";
import DeleteConfirmationTaskBox from "./components/DeleteConfirmationTaskBox";
import HeaderModal from "./components/HeaderModal";
import Board from "./components/Board";
import EditBoard from "./components/EditBoard";
import MobileSideBar from "./components/MobileSideBar";

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
    editBoard,
    mobileSidebar,
  } = useSelector((state) => state.kanban);

  return (
    <main className="grid h-screen  m-auto box-border grid-rows-[64px_auto] md:grid-rows-[80px_auto] overflow-hidden ">
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
        {editBoard && <EditBoard />}
        {mobileSidebar && <MobileSideBar />}
      </Container>
    </main>
  );
}

export default App;
