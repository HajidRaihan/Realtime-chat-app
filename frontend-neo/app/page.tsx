import Image from "next/image";
import { Button } from "@/components/ui/button";
import Message from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import BubbleChat from "@/components/BubbleChat";

export default function Home() {
  return (
    <div className="flex relative w-full h-screen">
      <div className="hidden md:flex bg-[#fff] border shadow-md w-80 h-full flex-col">
        <div className="overflow-y-auto flex-1">
          <Message
            avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
            title="Luffy"
            content="Oiii oiii"
          />
          <Message
            avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
            title="Luffy"
            content="Oiii oiii"
          />
          <Message
            avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
            title="Luffy"
            content="Oiii oiii"
          />
        </div>
      </div>

      {/* Konten chat */}
      <div className="flex-1 relative flex flex-col ">
        <div className="p-5 flex flex-col gap-3">
          <BubbleChat avatar="#" message="hai" isUserMessage={false} />
          <BubbleChat avatar="#" message="hai" isUserMessage={true} />
          <BubbleChat
            message="Hello! How are you?"
            avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
          />

          <BubbleChat
            message="I'm good, thanks!"
            avatar="https://user-avatar-url.com/avatar.jpg"
            isUserMessage={true}
          />
          <BubbleChat
            message="I'm good, thanks!"
            avatar="https://user-avatar-url.com/avatar.jpg"
            isUserMessage={true}
          />
        </div>
        <div className="flex-1 overflow-auto p-4">{/* Chat messages section */}</div>
        <MessageInput />
      </div>
    </div>
  );
}
