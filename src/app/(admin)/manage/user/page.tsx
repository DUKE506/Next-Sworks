import React from "react";
import Profile from "./_components/profile/profile";

import Users from "./_components/users/users";

const Page = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <Profile />
      <Users />
    </div>
  );
};

export default Page;
