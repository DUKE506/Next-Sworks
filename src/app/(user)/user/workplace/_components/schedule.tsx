import Calendar from "@/components/common/calendar/calendar";
import { useAuthStore } from "@/store/auth-store";
import React from "react";

const Schedule = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">스케줄</span>
      </div>
      <div className="h-150">
        <Calendar />
      </div>
    </div>
  );
};

export default Schedule;
