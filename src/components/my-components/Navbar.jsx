import { AuthContext } from "@/AuthProvider/AuthProvider";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, handleLogOut, GoogleLogin } = useContext(AuthContext);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex items-center py-6 justify-between">
      <div className="font-bold text-xl  md:text-2xl">
        <span className="text-primary">Task</span> Manager
      </div>
      {/* right site */}
      <div className="inline-flex item-center gap-2 md:gap-5">
        <ModeToggle></ModeToggle>
        {user && user?.email ? (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.photoURL} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button onClick={handleLogOut}>
              {" "}
              <CiLogout /> Logout
            </Button>
          </div>
        ) : (
          <Button onClick={GoogleLogin}>
            {" "}
            <FaGoogle />
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
