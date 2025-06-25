import api from "@/middleware/api-manager";
import { CreateSchedule } from "@/types/schedule/create-schedule";
import { Schedule } from "@/types/schedule/schedule";
import dayjs from "dayjs";
import ky from "ky";
import { v4 } from "uuid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useAuthStore } from "./auth-store";

interface CalendarState {
  schedules: Schedule[];
  holidays: Schedule[];

  getHolidays: (date: Date) => Promise<void>;
  getSchedules: () => Promise<boolean>;
  addSchedule: (schedule: Schedule) => Promise<boolean>;
  deleteSchedule: (id: string) => void;
}

export const useCalendarStore = create<CalendarState>()(
  devtools(
    persist<CalendarState>(
      (set, get) => ({
        schedules: [],
        holidays: [],

        getHolidays: async (date) => {
          const searchParams = new URLSearchParams();

          searchParams.set("solYear", dayjs(date).format("YYYY"));
          const url = new URL("/api/holiday", window.location.origin);
          url.search = searchParams.toString();
          const res = await fetch(`${url.toString()}`);

          const data: Record<string, any> = await res.json();

          const holidays: Schedule[] = data.response.body.items.item.map(
            (s: Record<string, any>, i: number) => {
              const formatted = `${s.locdate.toString().slice(0, 4)}-${s.locdate
                .toString()
                .slice(4, 6)}-${s.locdate.toString().slice(6, 8)}`;

              return new Schedule({
                id: v4(),
                title: s.dateName,
                startDt: new Date(formatted),
                endDt: new Date(formatted),
                color: "#fb2c36",
              });
            }
          );

          set({ holidays: holidays });
        },

        getSchedules: async () => {
          const res = await api.get(`schedule/all`);

          if (!res.ok) return res.ok;

          const schedules: Schedule[] = await res.json();

          set({ schedules: schedules });

          return res.ok;
        },
        addSchedule: async (schedule) => {
          // set((state) => ({
          //   schedules: [...state.schedules, schedule],
          // }));
          const res = await api.post(`schedule/create`, {
            json: schedule,
          });

          if (!res.ok) return res.ok;

          const { getSchedules } = get();
          await getSchedules();

          return res.ok;
        },
        deleteSchedule: async (id) => {
          const res = await api.delete(`schedule/delete/${id}`);

          if (!res.ok) return res.ok;
          // set((state) => ({
          //   schedules: state.schedules.filter((s) => s.id !== id),
          // }));

          const { getSchedules } = get();
          await getSchedules();

          return res.ok;
        },
      }),
      { name: "calendar-store" }
    )
  )
);
