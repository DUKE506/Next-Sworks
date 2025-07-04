"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { format, getHours, getMinutes, isSameHour } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import SimpleCalendar from "./simple-calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CustomDatetimePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const CustomDatetimePicker = ({
  value,
  onChange,
}: CustomDatetimePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", newValue: string) => {
    if (value) {
      const newDate = new Date(value);
      if (type === "hour") {
        newDate.setHours(parseInt(newValue));
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(newValue));
      }

      onChange(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "yyyy/MM/dd HH:mm")
          ) : (
            <span>MM/DD/YYYY HH:mm</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 overflow-y-hidden h-full">
        <div className="flex h-full">
          <SimpleCalendar defaultValue={value} onSelect={handleDateSelect} />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex justify-center items-center aspect-square shrink-0 text-xs w-9 h-9  hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-[#535353] ${
                        value && hour.toString() === getHours(value).toString()
                          ? "bg-blue-100 dark:bg-[#535353]"
                          : ""
                      }`}
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </div>
                  );
                })}
              </div>

              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((m, i) => (
                  <div
                    key={i}
                    className={`flex justify-center items-center aspect-square shrink-0 text-xs w-9 h-9 p-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-[#535353] ${
                      value && m.toString() === getMinutes(value).toString()
                        ? "bg-blue-100 dark:bg-[#535353]"
                        : ""
                    }`}
                    onClick={() => handleTimeChange("minute", m.toString())}
                  >
                    {m.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>

              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatetimePicker;
