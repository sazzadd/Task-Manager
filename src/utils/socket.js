import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_SERVER_URL ||
    "https://task-manager-server-production-7101.up.railway.app"
);

export default socket;
