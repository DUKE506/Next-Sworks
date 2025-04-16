import React from "react";
import { SideBar } from "./_components/SideBar/side-bar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full bg-stone-50">
      <SideBar />
      <div className="w-full overflow-auto py-6 px-6">{children}</div>
    </div>
  );
};

export default layout;
