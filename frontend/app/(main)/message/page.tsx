"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const page = () => {
  // const [message, setMessage] = useState("");
  // const [roomId, setRoomId] = useState("roomid");
  // useEffect(() => {
  //   socket.emit("joinRoom", roomId);
  //   // socket.emit("sendMessage", { chatId: roomId, content: "hello kamu" });
  // }, []);

  // const sendMessage = () => {
  //   socket.emit("sendMessage", { chatId: roomId, content: message });
  //   console.log("sended");
  // };
  return (
    <div>
      <p>message page</p>
      {/* <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>send</button> */}
    </div>
  );
};

export default page;
