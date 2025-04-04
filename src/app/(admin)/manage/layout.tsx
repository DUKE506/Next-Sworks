import React from "react";
import { SideBar } from "./_components/SideBar/side-bar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full p-4 gap-4">
      <div>
        <SideBar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
