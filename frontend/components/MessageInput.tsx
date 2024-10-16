import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoSendOutline } from "react-icons/io5";

interface MessageInputProps {
  value: string;
}

const MessageInput = () => {
  return (
    <div className="w-full bg-white p-5 border-t-2">
      <div className="flex gap-3 w-full">
        <Input placeholder="Type Message" className="flex-1" />
        <Button className="flex-shrink-0">
          <IoSendOutline />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
