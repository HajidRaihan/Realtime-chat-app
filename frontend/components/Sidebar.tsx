"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: FaHome,
        label: "Home",
        href: "/",
        isActive: pathname === "/",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full gap-5">
      <div className="min-h-screen flex flex-col gap-y-2 border-r-2 border-black h-full w-20 p-2 bg-white">
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
      <main className="h-full overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
