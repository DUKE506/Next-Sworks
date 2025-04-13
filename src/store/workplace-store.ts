import { ListBaseType, ListLoading, ListModel } from "@/types/list-type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import ky from "ky";

import { useAuthStore } from "./auth-store";
import api from "@/middleware/api-manager";
import { workPlaces } from "@/app/(admin)/manage/workplace/components/table/columns";
import { Workplace } from "@/types/workplace";

interface WorkplaceState {
  workplaces: ListBaseType;
  getWorkplaces: () => Promise<void>;
}

export const useWorkplaceStore = create<WorkplaceState>()(
  devtools(
    persist<WorkplaceState>(
      (set, get) => ({
        workplaces: ListLoading,
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
      }),
      { name: "workplace-store" }
    )
  )
);
