import { useSelector } from "react-redux";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const { isSidebarOpen } = useSelector((state) => state.theme);

  console.log(isSidebarOpen);
  return (
    <main className="grid min-h-screen m-auto box-border grid-rows-[80px_auto]">
      <Header />
      <Container>
        <Sidebar />
        <Main />
      </Container>
    </main>
  );
}

export default App;
