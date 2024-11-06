/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Message from "@/components/Message";
// import BubbleChat from "@/components/BubbleChat";
// import { io, Socket } from "socket.io-client";
// import { Input } from "@/components/ui/input";
// import { IoSearch } from "react-icons/io5";

// import NewChatAlertDialog from "@/components/NewChatAlertDialog";
// import { useFetchUserActive } from "@/features/user/useFetchUserActive";
// import { useEffect, useState } from "react";
// import { useCreateChat } from "@/features/chat/useCreateChat";
// import { useFtechAllChats } from "@/features/chat/useFetchAllChats";
// import { useFetchPrivateChatHistory } from "@/features/chat/useFetchPrivateChatHistory";
// import { useCreateMessage } from "@/features/message/useCreateMessage";

// import MessageLayout from "@/components/MessageLayout";

// interface PrivateChatResponse {
//   messageId: string;
//   senderId: {
//     id: string;
//     username: string;
//     avatar?: string;
//   };
//   content: string;
//   isUserMessage: boolean;
// }

// interface Chat {
//   partner: {
//     id: string;
//     avatar?: string;
//     username: string;
//   };
//   lastMessage: {
//     content: string;
//   };
//   chatId: string;
// }

// interface MessageData {
//   chatId: string;
//   content: string;
// }

// let socket: Socket;

// export default function Home() {
//   const [username, setUsername] = useState<string>("");
//   const [chatId, setChatId] = useState("");
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [usernameChat, setUsernameChat] = useState("");
//   const [messages, setMessages] = useState<PrivateChatResponse[]>([]);

//   const { data: userActive, error, isLoading, refetch } = useFetchUserActive(username);

//   const { mutate, isPending } = useCreateChat({
//     onSuccess: (data: any) => {
//       // alert("success create chat");
//       console.log("chatid", data.id);
//       setChatId(data.id);
//       setOpen(false);
//     },
//   });

//   const { mutate: createMessageMutate, isPending: createMessagePending } = useCreateMessage({
//     onSuccess: () => {
//       alert("sukses mengirim message");
//     },
//     onError: () => {
//       alert("gagal mengirim message");
//     },
//   });

//   const { data: privateHistory, isLoading: privateHistoryLoading } =
//     useFetchPrivateChatHistory(chatId);

//   useEffect(() => {
//     // Cek jika chatId ada valuenya (tidak null/undefined/empty string)
//     if (chatId && privateHistory) {
//       console.log("data private chat", privateHistory.data.length);
//     }
//   }, [chatId, privateHistory]);

//   const { data: allChatsData, isLoading: allChatsLoading } = useFtechAllChats();

//   useEffect(() => {
//     if (chatId) {
//       socket = io("http://localhost:8000", { transports: ["websocket"] });
//       socket.emit("joinRoom", chatId);

//       socket.on("newMessage", (content: string) => {
//         const newMessage: PrivateChatResponse = {
//           messageId: new Date().toISOString(),
//           senderId: { id: "server", username: "server" },
//           content,
//           isUserMessage: false,
//         };
//         setMessages((prev) => [...prev, newMessage]);
//       });
//       return () => {
//         socket.off("newMessage");
//         socket.emit("leaveRoom", chatId);
//         socket.disconnect();
//       };
//     }
//   }, [chatId]);

//   const sendMessageHandler = () => {
//     if (message.trim()) {
//       const newMessage: MessageData = { chatId, content: message };
//       socket.emit("sendMessage", newMessage);
//       createMessageMutate(newMessage);
//       setMessage("");
//     }
//   };

//   const usernameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.target.value);
//     console.log(e.target.value);
//     refetch();
//   };

//   const userOnClick = (userid: string, username: string) => {
//     mutate(userid);
//     setUsernameChat(username);

//     console.log(userid);
//   };

//   const messageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
//   };

//   return (
//     <div className="flex relative w-full h-screen">
//       <div className="flex bg-[#fff] border shadow-md min-w-80 h-full flex-col">
//         <div className="mx-3 mt-3 flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Chats</h1>
//           {/* <Button size={"icon"}></Button> */}
//           <NewChatAlertDialog
//             users={userActive}
//             onChange={usernameOnChange}
//             isLoading={isLoading}
//             userOnClick={userOnClick}
//             open={open}
//             setOpen={setOpen}
//           />
//         </div>

//         <div className="relative my-3 mx-3">
//           <IoSearch size={20} className="absolute left-2 translate-y-1/2 bottom-1/2" />
//           <Input type="search" className="ps-8" placeholder="search chat" />
//         </div>
//         <div className="overflow-y-auto flex-1">
//           {allChatsData?.map((chat: Chat) => (
//             <Message
//               avatar={
//                 chat.partner.avatar ||
//                 "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
//               }
//               title={chat.partner.username}
//               content={chat.lastMessage?.content}
//               onClick={() => userOnClick(chat.partner.id, chat.partner.username)}
//               key={chat.chatId}
//             />
//           ))}
//           {allChatsLoading && <p>loading ...</p>}
//           {/* <Message
//             avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
//             title="Luffy"
//             content="Oiii oiii"
//           />
//           <Message
//             avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
//             title="Luffy"
//             content="Oiii oiii 🙌🙌"
//           /> */}
//         </div>
//       </div>

//       {/* Konten chat */}
//       {chatId ? (
//         <MessageLayout
//           handler={sendMessageHandler}
//           username={usernameChat}
//           onChange={messageOnChange}
//         >
//           {privateHistory?.data.length !== 0 ? (
//             privateHistory?.data.map((item: PrivateChatResponse) => (
//               <BubbleChat
//                 key={item.messageId}
//                 avatar={item.senderId?.avatar}
//                 message={item.content}
//                 isUserMessage={item.isUserMessage}
//               />
//             ))
//           ) : (
//             <p>Mulai chat dengan user ini</p>
//           )}
//           {privateHistoryLoading && <p>loading ...</p>}
//         </MessageLayout>
//       ) : (
//         <div className="h-full w-full flex items-center justify-center">
//           <p className="font-bold text-2xl">start chat</p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import Message from "@/components/Message";
import BubbleChat from "@/components/BubbleChat";
import { io, Socket } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

import NewChatAlertDialog from "@/components/NewChatAlertDialog";
import { useFetchUserActive } from "@/features/user/useFetchUserActive";
import { useEffect, useState } from "react";
import { useCreateChat } from "@/features/chat/useCreateChat";
import { useFtechAllChats } from "@/features/chat/useFetchAllChats";
import { useFetchPrivateChatHistory } from "@/features/chat/useFetchPrivateChatHistory";
import { useCreateMessage } from "@/features/message/useCreateMessage";

import MessageLayout from "@/components/MessageLayout";
import { useFetchUserDetail } from "@/features/chat/useFetchChatDetail";
import { useQueryClient } from "@tanstack/react-query";

interface PrivateChatResponse {
  messageId: string;
  sender: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  isUserMessage: boolean;
}

interface MessageHistory {
  id: string;
  content: string;
  senderId: string;
  isUserMessage: boolean;
}

interface ChatDetail {
  id: string;
  isSender: boolean;
  sender: {
    id: string;
    username: string;
  };
  receiver: {
    id: string;
    username: string;
  };
  Message: MessageHistory[];
}

interface Chat {
  partner: {
    id: string;
    avatar?: string;
    username: string;
  };
  lastMessage: {
    content: string;
  };
  chatId: string;
}

interface MessageData {
  chatId: string;
  content: string;
}

let socket: Socket;

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [userid, setUserid] = useState("");
  const [chatId, setChatId] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [usernameChat, setUsernameChat] = useState("");
  const [messages, setMessages] = useState<MessageHistory[]>([]);
  const [partnerAvatar, setPartnerAvatar] = useState("");

  const { data: userActive, isLoading, refetch } = useFetchUserActive(username);

  const { data: chatDetail, isLoading: chatDetailIsLoading } = useFetchUserDetail(chatId);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateChat({
    onSuccess: (data: any) => {
      setChatId(data.id);
      setOpen(false);
    },
  });
  const { mutate: createMessageMutate } = useCreateMessage({
    onSuccess: () => {
      console.log("Message sent successfully");
    },
  });

  useEffect(() => {
    if (chatDetail) {
      setUserid(chatDetail.isSender === true ? chatDetail.sender.id : chatDetail.receiver.id);
    }
  }, [chatDetail]);

  useFetchPrivateChatHistory(chatId);
  const { data: allChatsData, isLoading: allChatsLoading } = useFtechAllChats();

  // Initialize Socket.IO only once when chatId changes
  useEffect(() => {
    if (chatId) {
      socket = io("http://localhost:8000", { transports: ["websocket"] });

      socket.emit("joinRoom", chatId);

      socket.on("newMessage", ({ senderId, content }: { senderId: string; content: string }) => {
        console.log("Received new message content:", content);
        const newMessage: MessageHistory = {
          id: new Date().toISOString(),
          senderId: senderId,
          content: content,
          isUserMessage: senderId === userid,
        };

        console.log({ newMessage });
        queryClient.setQueryData(["detailChat", chatId], (oldData: any) => {
          console.log("ini old data", oldData);
          return {
            ...oldData,
            Message: [...oldData.Message, newMessage],
          };
        });
      });

      return () => {
        socket.off("newMessage");
        socket.emit("leaveRoom", chatId);
        socket.disconnect();
      };
    }
  }, [chatId, queryClient, userid]);

  const sendMessageHandler = () => {
    if (message.trim()) {
      const newMessage: any = {
        chatId,
        senderId: chatDetail.isSender === true ? chatDetail.sender.id : chatDetail.receiver.id,
        content: message,
      };
      socket.emit("sendMessage", newMessage);
      createMessageMutate(newMessage);
      setMessage("");
    }
  };

  const usernameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    refetch();
  };

  const userOnClick = (userid: string, username: string, avatar?: string) => {
    mutate(userid);
    setUsernameChat(username);
    if (avatar) setPartnerAvatar(avatar);
  };

  const messageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex relative w-full h-screen">
      <div className="flex bg-[#fff] border shadow-md min-w-80 h-full flex-col">
        <div className="mx-3 mt-3 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Chats</h1>
          <NewChatAlertDialog
            users={userActive}
            onChange={usernameOnChange}
            isLoading={isLoading}
            userOnClick={userOnClick}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div className="relative my-3 mx-3">
          <IoSearch size={20} className="absolute left-2 translate-y-1/2 bottom-1/2" />
          <Input type="search" className="ps-8" placeholder="search chat" />
        </div>
        <div className="overflow-y-auto flex-1">
          {allChatsData?.map((chat: Chat) => (
            <Message
              avatar={
                chat.partner.avatar ||
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              title={chat.partner.username}
              content={chat.lastMessage?.content}
              onClick={() =>
                userOnClick(chat.partner.id, chat.partner.username, chat.partner?.avatar)
              }
              key={chat.chatId}
            />
          ))}
          {allChatsLoading && <p>loading ...</p>}
        </div>
      </div>

      {chatId ? (
        // <MessageLayout
        //   handler={sendMessageHandler}
        //   username={usernameChat}
        //   onChange={messageOnChange}
        //   message={message}
        // >
        //   {(privateHistory?.data || []).concat(messages).map((item: PrivateChatResponse) => (
        //     <BubbleChat
        //       key={item.messageId}
        //       avatar={item.sender?.avatar}
        //       message={item.content}
        //       isUserMessage={item.isUserMessage}
        //     />
        //   ))}
        //   {privateHistoryLoading && <p>loading ...</p>}
        // </MessageLayout>
        <MessageLayout
          handler={sendMessageHandler}
          username={usernameChat}
          onChange={messageOnChange}
          message={message}
        >
          {chatDetail?.Message.map((item: MessageHistory) => (
            <BubbleChat
              key={item.id}
              avatar={partnerAvatar}
              message={item.content}
              isUserMessage={item.isUserMessage}
            />
          ))}
          {chatDetailIsLoading && <p>loading ...</p>}
        </MessageLayout>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <p className="font-bold text-2xl">start chat</p>
        </div>
      )}
    </div>
  );
}
