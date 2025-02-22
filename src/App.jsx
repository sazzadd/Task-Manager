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
      <div className="w-full max-w-7xl lg:h-screen flex flex-col mx-auto">
        <Navbar />
        {user ? (
          <TaskContainer />
        ) : (
          <div className="flex items-center my-auto text-2xl justify-center h-full">
            <div
              onClick={GoogleLogin}
              className=" text-2xl animated-text text-center px-2 font-bold text-primary"
            >
              Please sign in to access the app and store your task securely
              <br />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
