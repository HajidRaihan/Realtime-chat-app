import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
// import Avatar from "@/components/Avatar";


interface BubbleChatProps {
  message: string;
  username?: string;
  avatar?: string;
  isUserMessage?: boolean; // Tambahkan prop untuk menandai pesan user
}

const BubbleChat: React.FC<BubbleChatProps> = ({
  message,
  username,
  avatar,
  isUserMessage, // Default pesan di sebelah kiri
}) => {
  return (
    <div
      className={`flex gap-2 ${isUserMessage ? "justify-end" : "justify-start"}`} // Gunakan justify-end untuk pesan user di kanan
    >
      {!isUserMessage && (
        <Avatar
          imageUrl={
            "https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
          }
          className="flex-shrink-0 w-10 h-10"
        />
      )}
      <div
        className={cn(
          "bg-white p-2 flex flex-col justify-center border-black border-2 rounded-lg min-w-20",
          isUserMessage ? "bg-main" : "bg-white"
        )}
      >
        <p className="text-mainAccent font-semibold text-xs">{username}</p>
        <p className="text-sm">{message}</p>
      </div>
      {isUserMessage && (
        <Avatar
          imageUrl={
            "https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
          }
          className="flex-shrink-0 w-10 h-10"
        />
      )}
    </div>
  );
};

export default BubbleChat;
