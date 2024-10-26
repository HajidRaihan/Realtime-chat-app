import React from "react";
import Avatar from "./Avatar";

interface MessageProps {
  avatar: string;
  title: string;
  content?: string;
  onClick?: () => void;
}

const Message: React.FC<MessageProps> = ({ avatar, title, content, onClick }) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="p-3 flex items-center gap-2 border-b hover:bg-main transition cursor-pointer"
    >
      <Avatar imageUrl={avatar} className="w-12 h-12" />
      <div>
        <h3 className="text-md font-semibold">{title}</h3>
        {content && <p className="text-xs truncate w-52">{content}</p>}
      </div>
    </div>
  );
};

export default Message;
