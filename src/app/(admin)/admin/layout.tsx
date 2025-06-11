import React from "react";
import {
  managerSideBar,
  SideBar,
} from "../../../components/ui/SideBar/side-bar";

import ProfileBadge from "@/components/common/profiles";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen bg-stone-50">
      <SideBar data={managerSideBar} />
      <div className="flex flex-col  min-h-0 space-y-6 w-full overflow-y-auto py-6 px-24 max-sm:px-6 bg-white ">
        <div className="flex justify-end">
          <ProfileBadge />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
