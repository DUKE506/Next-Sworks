import React from "react";
import { SideBar } from "./_components/SideBar/side-bar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full p-6 gap-6">
      <div>
        <SideBar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
