import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  isActive?: boolean;
  href: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, isActive, href }) => {
  return <div></div>;
};

export default SidebarItem;
