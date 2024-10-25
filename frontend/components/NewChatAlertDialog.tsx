import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { ScrollArea } from "./ui/scroll-area";
import Message from "./Message";
import { Input } from "./ui/input";

interface NewChatAlertDialogProps {
  users: User[];
}

interface User {
  id: string;
  username: string;
  avatar?: string;
}

const NewChatAlertDialog: React.FC<NewChatAlertDialogProps> = ({ users }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"}>
          <FaPlus />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">New Chat</AlertDialogTitle>
          <AlertDialogDescription>
            <Input type="search" placeholder="Search name" />
            <ScrollArea className="rounded-base h-[250px] mt-3">
              <div>
                {users?.map((user) => (
                  <Message
                    key={user.id}
                    avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
                    title={user.username}
                  />
                ))}
                {/* <Message
                  avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
                  title="Luffy"
                />
                <Message
                  avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
                  title="Luffy"
                />
                <Message
                  avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
                  title="Luffy"
                />
                <Message
                  avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
                  title="Luffy"
                />
                <Message
                  avatar="https://media.hitekno.com/thumbs/2022/07/19/93338-one-piece-monkey-d-luffy/730x480-img-93338-one-piece-monkey-d-luffy.jpg"
                  title="Luffy"
                /> */}
              </div>
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewChatAlertDialog;
