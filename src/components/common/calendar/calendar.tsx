import dayjs from "dayjs";
import { useCalendar } from "./useCalendar";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  PencilIcon,
  Trash2,
} from "lucide-react";
import {
  format,
  isEqual,
  isSameDay,
  isSameMonth,
  isWithinInterval,
} from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCalendarStore } from "@/store/calendar-store";
import { Schedule } from "@/types/schedule/schedule";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import CustomDialog from "../custom-dialog";
import ScheduleForm from "./schedule-form";
import IconButton from "@/components/ui/icon-button/icon-button";
import { useAuthStore } from "@/store/auth-store";
import { UserPermission } from "@/types/(admin)/permission/user-permission";
import { WorkerPermissionType } from "@/types/(admin)/permission/admin-permission/create-admin-permission";

//달력 헤더
interface RenderHeaderCompProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

interface RenderHeadersProps extends RenderHeaderCompProps {
  focusDate: Date;
}

const RenderHeader = ({
  date,
  focusDate,
  onPrevMonth,
  onNextMonth,
}: RenderHeadersProps) => {
  const { profile } = useAuthStore();

  return (
    <div className="flex justify-center items-center gap-2 px-2 h-full relative min-h-8 ">
      <div className="flex-1">
        <RemoteDate
          date={date}
          onNextMonth={onNextMonth}
          onPrevMonth={onPrevMonth}
        />
      </div>
      {profile?.permission.permission !== WorkerPermissionType.근무자 ? (
        <CustomDialog
          title="일정추가"
          className="p-0 py-1 h-fit bg-white shadow-none hover:bg-gray-50 dark:hover:bg-[#535353]"
        >
          {({ setIsOpen }) => (
            <ScheduleForm
              startDate={new Date(focusDate.setMinutes(0))}
              onClose={setIsOpen}
            />
          )}
        </CustomDialog>
      ) : null}
    </div>
  );
};

//달력 날짜 컨트롤러
interface RemoteDateProps extends RenderHeaderCompProps {}

const RemoteDate = ({ date, onPrevMonth, onNextMonth }: RemoteDateProps) => {
  return (
    <div className="flex absolute gap-4 left-[50%] top-[50%] translate-[-50%] ">
      <IconButton icon={ChevronLeft} onClick={onPrevMonth} />

      <span className="font-bold flex items-center">
        {dayjs(date).format("YYYY")}.{dayjs(date).format("MM")}
      </span>
      <IconButton icon={ChevronRight} onClick={onNextMonth} />
    </div>
  );
};

//요일 헤더 + 날짜 박스
interface RenderDaysProps {
  weeks: Date[][];
  viewDate: Date;
  focusDate: Date;
  onFocusDate: Dispatch<SetStateAction<Date>>;
}
const RenderDays = ({
  weeks,
  viewDate,
  focusDate,
  onFocusDate,
}: RenderDaysProps) => {
  const labels = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  return (
    <div className="flex flex-col h-full rounded-sm divide-y  border">
      <div className="flex  rounded-t-sm divide-x">
        {labels.map((l, i) => {
          return (
            <div
              key={i}
              className="flex-1 text-center flex items-center justify-center py-1  first:text-red-500 last:text-red-500  "
            >
              <span className="text-xs ">{l}</span>
            </div>
          );
        })}
      </div>
      {weeks.map((w, i) => (
        <div key={i} className="flex flex-1 divide-x ">
          {w.map((d, i) => {
            return (
              <DayBox
                key={i}
                day={d}
                viewDate={viewDate}
                focusDate={focusDate}
                onClick={() => onFocusDate(d)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

//일 박스
const DayBox = ({
  day,
  viewDate,
  focusDate,
  ...props
}: {
  day: Date;
  viewDate: Date;
  focusDate?: Date;
} & React.HTMLProps<HTMLDivElement>) => {
  const { holidays, schedules } = useCalendarStore();

  return (
    <div
      className={`flex-1 p-2 overflow-hidden ${
        focusDate === day ? "bg-blue-100 dark:bg-[#535353]" : null
      }`}
      {...props}
    >
      <span
        className={`text-xs   ${
          isSameDay(day, new Date())
            ? "bg-blue-500 flex justify-center items-center w-6 h-6 text-center rounded-full text-white "
            : null
        }
        ${!isSameMonth(day, viewDate) ? "text-gray-400" : ""}
        `}
      >
        {dayjs(day).format("DD")}
      </span>
      <div className="flex flex-col gap-1 min-w-0 ">
        {holidays.map((h, i) =>
          isSameDay(day, h.startDt) ? (
            <SchedulePopover
              className="bg-red-500 hover:bg-red-600"
              key={i}
              data={h}
              isHeader={false}
            />
          ) : null
        )}
        {schedules.map((s, i) => {
          return isWithinInterval(day, { start: s.startDt, end: s.endDt }) ? (
            <SchedulePopover backgroundColor={s.color} key={i} data={s} />
          ) : null;
        })}
      </div>
    </div>
  );
};

//스케줄 아이템
interface ScheduleItemProps {
  data: Schedule;
  className?: string;
}

//스케줄 아이템2 popover
//
// 수정 - ...처리 및 수직 중앙정렬

interface SchedulePopover extends ScheduleItemProps {
  isHeader?: boolean;
  backgroundColor?: string;
}

const SchedulePopover = ({
  className,
  backgroundColor,
  data,
  isHeader = true,
}: SchedulePopover) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteSchedule } = useCalendarStore();
  const { profile } = useAuthStore();

  const handleDelete = (id: string) => {
    deleteSchedule(id);
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "bg-blue-500 text-[0.7rem] py-0 h-fit flex items-center justify-start text-white px-2 rounded-xs  min-w-0 hover:bg-blue-600 hover:cursor-pointer",
            className
          )}
          style={{ backgroundColor: backgroundColor }}
        >
          <span className="w-full truncate">{data.title}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {/* 헤더 */}
          {isHeader &&
          profile?.permission.permission !== WorkerPermissionType.근무자 ? (
            <div className="flex gap-2 justify-end">
              <div className="p-[6px] aspect-square hover:cursor-pointer hover:bg-gray-200 rounded-[50px]">
                <PencilIcon className="w-4 h-4 text-gray-500" />
              </div>
              <div
                className="p-[6px] aspect-square hover:cursor-pointer hover:bg-gray-200 rounded-[50px]"
                onClick={() => handleDelete(data.id)}
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          ) : null}

          {/* 내용 */}
          <div>
            <span className="text-xl">{data.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">{format(data.endDt, "yyyy/MM/dd")}</span>
            {isEqual(data.startDt, data.endDt) ? null : (
              <>
                <span> - </span>
                <span className="text-sm">
                  {format(data.endDt, "yyyy/MM/dd")}
                </span>
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Calendar = () => {
  const { weeks, curDate, focusDate, onNextMonth, onPrevMonth, onFocusDate } =
    useCalendar(new Date());
  const { getHolidays } = useCalendarStore();
  useEffect(() => {
    getHolidays(new Date());
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 pb-2">
      <div className="flex-shrink-0 h-fit">
        {/* 헤더는 고정 크기 */}
        <RenderHeader
          date={curDate}
          focusDate={focusDate}
          onNextMonth={onNextMonth}
          onPrevMonth={onPrevMonth}
        />
      </div>
      <div className="flex-1 min-h-0 px-2">
        {/* 나머지 공간, 최소높이 0 */}
        <RenderDays
          weeks={weeks}
          viewDate={curDate}
          focusDate={focusDate}
          onFocusDate={onFocusDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
