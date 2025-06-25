import { Form, FormField } from "@/components/ui/form";
import { Schedule } from "@/types/schedule/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { CreateSchedule } from "@/types/schedule/create-schedule";
import { format, isAfter, isBefore } from "date-fns";
import { useCalendarStore } from "@/store/calendar-store";
import { v4 as uuidv4 } from "uuid";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import { DateFormItem } from "@/components/ui/form-field-items/date-field";
import ColorFormItem from "@/components/ui/form-field-items/color-field";

const scheduleFormSchema = z.object({
  title: z.string().min(2, { message: "두 글자 이상 입력해주세요." }),
  startDt: z.date(),
  endDt: z.date(),
  color: z.string({ message: "색상을 선택해주세요." }),
});

type ScheduleFormType = z.infer<typeof scheduleFormSchema>;

interface ScheduleFormProps {
  startDate?: Date;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleForm = ({ startDate, onClose }: ScheduleFormProps) => {
  const { schedules, addSchedule } = useCalendarStore();
  const [schedule, setSchedule] = useState<CreateSchedule>({
    startDt: startDate,
    endDt: startDate,
  });
  const form = useForm<ScheduleFormType>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      title: "",
      startDt: schedule.startDt,
      endDt: schedule.endDt,
      color: "#ffffff",
    },
  });

  useEffect(() => {
    //언마운트 시 스케쥴 객체 초기화
    return () => {
      setSchedule({});
    };
  }, []);

  const handleSubmit = (values: ScheduleFormType) => {
    addSchedule(
      new Schedule({
        id: uuidv4(),
        ...values,
      })
    );
    if (onClose) onClose(false);
  };

  const handleDateChange = (
    type: "start" | "end",
    date: Date,
    onChange: (...event: any[]) => void
  ) => {
    //시작날짜가 종료날짜보다 이후인 경우
    if (type === "start") {
      if (isAfter(date, form.getValues().endDt)) {
        onChange(date);
        form.setValue("endDt", date);
      } else {
        onChange(date);
      }
    }

    //종료날짜가 시작날짜보다 이전인 경우
    if (type === "end") {
      if (isBefore(date, form.getValues().startDt)) {
        onChange(date);
        form.setValue("startDt", date);
      } else {
        onChange(date);
      }
    }

    // console.log("바뀐날짜 시작 : ", form.getValues().startedAt);
    // console.log("바뀐날짜 정료 : ", form.getValues().endedAt);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <TextFormItem label="일정" placeholder="일정" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="startDt"
            render={({ field }) => (
              <DateFormItem
                label="시작"
                value={field.value}
                onChange={(date) =>
                  handleDateChange("start", date, field.onChange)
                }
              />
            )}
          />
          <FormField
            control={form.control}
            name="endDt"
            render={({ field }) => (
              <DateFormItem
                label="종료"
                value={field.value}
                onChange={(date) =>
                  handleDateChange("end", date, field.onChange)
                }
              />
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <ColorFormItem
                label="색상"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </div>
        <Button className="w-full bg-[var(--primary-color)] hover:cursor-pointer hover:bg-[var(--primary-hover-color)]">
          추가
        </Button>
      </form>
    </Form>
  );
};

export default ScheduleForm;
