import { ListBaseType, ListLoading, ListModel } from "@/types/list-type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "@/middleware/api-manager";

import { Workplace } from "@/types/(admin)/workplace/workplace";
import { CreateWorkplace } from "@/types/(admin)/workplace/create-workplace";

interface WorkplaceState {
  workplaces: ListBaseType;
  workplaceDetail: Workplace | null;
  selectedWorkplace: Workplace | null;
  getWorkplaces: () => Promise<void>;
  getWorkplaceDetail: (id: number) => Promise<void>;
  createWorkplace: (workplace: CreateWorkplace) => Promise<void>;
  selectWorkplace: (workplace: Workplace) => void;
}

export const useWorkplaceStore = create<WorkplaceState>()(
  devtools(
    persist<WorkplaceState>(
      (set, get) => ({
        workplaces: ListLoading,
        workplaceDetail: null,
        selectedWorkplace: null,
        getWorkplaces: async () => {
          const res = await api
            .get("workplace/all", {
              searchParams: {
                page: 1,
                pageSize: 20,
              },
            })
            .json();

          set({ workplaces: res as ListModel<Workplace> });
        },
        getWorkplaceDetail: async (id) => {
          const res = await api.get(`workplace/${id}`).json();
          if (res) set({ workplaceDetail: res as Workplace });

          console.log(res);
        },
        createWorkplace: async (workplace) => {
          const res = await api
            .post("workplace/create", { json: workplace })
            .json();
          console.log(res);
        },
        selectWorkplace: (workplace) => {
          set({ selectedWorkplace: workplace });
        },
      }),
      { name: "workplace-store" }
    )
  )
);
