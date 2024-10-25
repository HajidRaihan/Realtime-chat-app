import { IconType } from "react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  isActive?: boolean;
  href: string;
  className?: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive,
  href,
  className,
}) => {
  return (
    <Link href={href}>
      <Button size={"icon"} className={cn("bg-white", isActive && "bg-main")}>
        <Icon size={20} />
      </Button>
    </Link>
  );
};

export default SidebarItem;
