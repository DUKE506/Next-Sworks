import React from "react";
import { SideBar, userSideBar } from "../../../components/ui/SideBar/side-bar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full bg-stone-50">
      <SideBar data={userSideBar} />
      <div className="w-full overflow-y-auto py-6 px-24 max-sm:px-6 bg-white">
        {children}
      </div>
    </div>
  );
};

export default layout;
