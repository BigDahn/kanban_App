import { useSelector } from "react-redux";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import NewColumn from "./components/NewColumn";
import AddTask from "./components/AddTask";

function App() {
  const { addColumnModal, addNewTask } = useSelector((state) => state.kanban);

  return (
    <main className="grid min-h-screen m-auto box-border grid-rows-[80px_auto]">
      <Header />
      <Container>
        <Sidebar />
        <Main />
        {addColumnModal && <NewColumn />}
        {addNewTask && <AddTask />}
      </Container>
    </main>
  );
}

export default App;
