import { ThemeProvider } from "@/components/theme-provider";
import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./AuthProvider/AuthProvider";
import Navbar from "./components/my-components/Navbar";
import TaskContainer from "@/components/my-components/task-component/TaskContainer";

function App() {
  const { user, handleLogOut, GoogleLogin } = useContext(AuthContext);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full max-w-7xl lg:h-screen flex flex-col mx-auto">
        <Navbar />
        {user ? (
          <TaskContainer />
        ) : (
          <div className="flex items-center justify-center h-full">
            <button onClick={GoogleLogin} className="btn btn-primary">
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
