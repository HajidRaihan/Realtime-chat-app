import { Sidebar } from "lucide-react";
import React from "react";

interface MessageLayoutProps {
  children: React.ReactNode;
}

const MessageLayout: React.FC<MessageLayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default MessageLayout;
