import React, { forwardRef } from "react";
import Avatar from "./Avatar";
import MessageInput from "./MessageInput";

interface MessageLayoutProps {
  children: React.ReactNode;
  username: string;
  handler: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
}

const MessageLayout = forwardRef<HTMLDivElement, MessageLayoutProps>(
  ({ children, username, handler, onChange, message }, ref) => {
    return (
      <div className="flex-1 relative flex flex-col">
        <div className="ps-5 w-full flex gap-3 items-center h-20 bg-white">
          <Avatar
            imageUrl={
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            className="w-14 h-14"
          />
          <h1 className="text-xl font-bold">{username}</h1>
        </div>

        <div
          className="flex-1 overflow-auto p-4 flex-col gap-3 flex"
          ref={ref} // forwarding the ref to this div
        >
          {children}
        </div>

        <MessageInput sendMessageHandler={handler} onChange={onChange} value={message} />
      </div>
    );
  }
);

MessageLayout.displayName = "MessageLayout"; // Give it a displayName to help with debugging

export default MessageLayout;
