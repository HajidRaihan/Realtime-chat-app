import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000"; // ganti dengan URL server

const socket: Socket = io(SOCKET_SERVER_URL, {
  withCredentials: true,
  transports: ["websocket"], // opsi tambahan
});

export default socket;
