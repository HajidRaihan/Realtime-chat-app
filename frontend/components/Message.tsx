import React from "react";
import Avatar from "./Avatar";

interface MessageProps {
  avatar: string;
  title: string;
  content?: string;
}

const Message: React.FC<MessageProps> = ({ avatar, title, content }) => {
  return (
    <div className="p-3 flex items-center gap-2 border-b hover:bg-main transition">
      <Avatar
        imageUrl="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
        className="w-12 h-12"
      />
      <div>
        <h3 className="text-md font-semibold">{title}</h3>
        {content && <p className="text-xs truncate w-52">{content}</p>}
      </div>
    </div>
  );
};

export default Message;
