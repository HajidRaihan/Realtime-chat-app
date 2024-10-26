"use client";

import Message from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import BubbleChat from "@/components/BubbleChat";
import { io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

import NewChatAlertDialog from "@/components/NewChatAlertDialog";
import { useFetchUserActive } from "@/features/user/useFetchUserActive";
import { useEffect, useState } from "react";
import { useCreateChat } from "@/features/chat/useCreateChat";
import { useFtechAllChats } from "@/features/chat/useFetchAllChats";
import { useFetchPrivateChatHistory } from "@/features/chat/useFetchPrivateChatHistory";
import { useCreateMessage } from "@/features/message/useCreateMessage";
import DefaultProfile from "@/assets/default-avatar.jpg";
import Image from "next/image";
import Avatar from "@/components/Avatar";

interface PrivateChatResponse {
  messageId: string;
  senderId: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  isUserMessage: boolean;
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

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [chatId, setChatId] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { data: userActive, error, isLoading, refetch } = useFetchUserActive(username);

  const { mutate, isPending } = useCreateChat({
    onSuccess: (data: any) => {
      // alert("success create chat");
      console.log("chatid", data.id);
      setChatId(data.id);
      setOpen(false);
    },
  });

  const { mutate: createMessageMutate, isPending: createMessagePending } = useCreateMessage({
    onSuccess: () => {
      alert("sukses mengirim message");
    },
    onError: () => {
      alert("gagal mengirim message");
    },
  });

  const sendMessageHandler = () => {
    createMessageMutate({
      chatId: chatId,
      content: message,
    });
  };

  const { data: privateHistory, isLoading: privateHistoryLoading } =
    useFetchPrivateChatHistory(chatId);

  useEffect(() => {
    // Cek jika chatId ada valuenya (tidak null/undefined/empty string)
    if (chatId && privateHistory) {
      console.log("data private chat", privateHistory.data.length);
    }
  }, [chatId, privateHistory]);

  const { data: allChatsData, isLoading: allChatsLoading } = useFtechAllChats();

  const usernameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(e.target.value);
    refetch();
  };

  const userOnClick = (userid: string) => {
    mutate(userid);

    console.log(userid);
  };

  const messageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex relative w-full h-screen">
      <div className="flex bg-[#fff] border shadow-md w-80 h-full flex-col">
        <div className="mx-3 mt-3 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Chats</h1>
          {/* <Button size={"icon"}></Button> */}
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
          {allChatsData?.data.map((chat: Chat) => (
            <Message
              avatar={
                chat.partner.avatar ||
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              title={chat.partner.username}
              content={chat.lastMessage.content}
              onClick={() => userOnClick(chat.partner.id)}
              key={chat.chatId}
            />
          ))}
          {/* <Message
            avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
            title="Luffy"
            content="Oiii oiii"
          />
          <Message
            avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
            title="Luffy"
            content="Oiii oiii 🙌🙌"
          /> */}
        </div>
      </div>

      {/* Konten chat */}
      <div className="flex-1 relative flex flex-col ">
        <div className="w-full h-20 bg-white">
          <Avatar
            imageUrl={
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            className=""
          />
          {/* <i>ini nanti untuk avatar</i> */}
        </div>
        <div className="p-5 flex flex-col gap-3">
          {chatId ? (
            privateHistory?.data.length !== 0 ? (
              privateHistory?.data.map((item: PrivateChatResponse) => (
                <BubbleChat
                  key={item.messageId}
                  avatar={item.senderId?.avatar}
                  message={item.content}
                  isUserMessage={item.isUserMessage}
                />
              ))
            ) : (
              <p>Mulai chat dengan user ini</p>
            )
          ) : null}
          {privateHistoryLoading && <p>loading ...</p>}
        </div>
        <div className="flex-1 overflow-auto p-4">{/* Chat messages section */}</div>
        <MessageInput sendMessageHandler={sendMessageHandler} onChange={messageOnChange} />
      </div>
    </div>
  );
}
