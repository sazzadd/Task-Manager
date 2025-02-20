import TaskContainer from "@/components/my-components/task-component/TaskContainer";
import { ThemeProvider } from "@/components/theme-provider";
import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./AuthProvider/AuthProvider";
import Navbar from "./components/my-components/Navbar";
function App() {
  const { user, handleLogOut, GoogleLogin } = useContext(AuthContext);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* {children} */}
      <div className="w-full max-w-7xl lg:h-screen flex flex-col mx-auto">
        <Navbar></Navbar>
        <TaskContainer></TaskContainer>
      </div>

      <main className="w-11/12"> main</main>
    </ThemeProvider>
  );
}

export default App;
