import api from "@/middleware/api-manager";
import { Building } from "@/types/(user)/building/building";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BuildingDetailState {
  building: Building | null;
  getBuilding: (id: number) => Promise<boolean>;
  initialBuilding: () => void;
}

export const useBuildingDetailStore = create<BuildingDetailState>()(
  devtools(
    persist<BuildingDetailState>(
      (set, get) => ({
        building: null,
        getBuilding: async (id) => {
          const res = await api.get(`building/${id}`);

          set({ building: await res.json() });

          return res.ok;
        },
        initialBuilding: () => {
          set({ building: null });
        },
      }),
      {
        name: "building-deatil-store",
      }
    )
  )
);
