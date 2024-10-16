"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { TiMessageTyping } from "react-icons/ti";
import { BiMessageDetail } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineGroup } from "react-icons/md";
import { MdGroup } from "react-icons/md";

import SidebarItem from "./SidebarItem";
import Avatar from "./Avatar";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: IoHomeOutline,
        label: "Home",
        href: "/",
        isActive: pathname === "/",
      },
      {
        icon: BiMessageDetail,
        label: "Message",
        href: "/message",
        isActive: pathname === "/message",
      },
      {
        icon: MdOutlineGroup,
        label: "Cricle",
        href: "/circle",
        isActive: pathname === "/circle",
      },
      {
        icon: IoIosNotificationsOutline,
        label: "notifitcation",
        href: "/notifitcation",
        isActive: pathname === "/notifitcation",
      },
      {
        icon: IoSettingsOutline,
        label: "Setting",
        href: "/setting",
        isActive: pathname === "/setting",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="relative bg-main items-center flex-shrink-0 min-h-screen flex flex-col gap-y-3 border-r-2 border-black h-full w-20 p-2">
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
        <Avatar
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0vdFGkjsYppBsEml2hKqjNi8-JOd-NyznQ&s"
          className="object-cover object-center w-12 h-12 mx-auto absolute flex bottom-5"
        />
      </div>
      <main className="flex-grow bg-[#f5f5f5] dark:bg-secondaryBlack bg-[radial-gradient(#80808080_1px,transparent_1px)] w-full h-screen shadow-light dark:shadow-dark [background-size:16px_16px]">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
