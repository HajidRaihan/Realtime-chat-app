import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoSendOutline } from "react-icons/io5";

interface MessageInputProps {
  value?: string;
  sendMessageHandler: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessageHandler, onChange }) => {
  return (
    <div className="w-full bg-white p-5 border-t-2">
      <div className="flex gap-3 w-full">
        <Input placeholder="Type Message" className="flex-1" onChange={onChange} />
        <Button className="flex-shrink-0" onClick={sendMessageHandler} variant={"reverse"}>
          <IoSendOutline />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
