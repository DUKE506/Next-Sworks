import api from "@/middleware/api-manager";
import { CreateFacility } from "@/types/(user)/facility/create-facility";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useAuthStore } from "./auth-store";
import { Facility } from "@/types/(user)/facility/facility";

interface FacilityState {
  createFacility: CreateFacility;
  facilities: Facility[];
  setCreateFacility: (data: Record<string, any>) => void;
  postCreateFacility: () => Promise<boolean>;
  getFacilityByCategory: (buildingid: string, type: string) => Promise<boolean>;
  initialCreateFacility: () => void;
}

export const useFacilityStore = create<FacilityState>()(
  devtools(
    persist<FacilityState>(
      (set, get) => ({
        createFacility: {
          category: "",
          name: "",
          type: "",
          room: 0,
          standard: "",
          count: 0,
          life: "",
          setDt: new Date(),
          changeDt: new Date(),
        },
        facilities: [],
        setCreateFacility: (data) => {
          set((state) => ({
            createFacility: { ...state.createFacility, ...data },
          }));
        },
        postCreateFacility: async () => {
          const { createFacility } = get();

          const res = await api.post("facility/create", {
            json: { ...createFacility },
          });

          return res.ok;
        },
        getFacilityByCategory: async (buildingid, type) => {
          const { currentWorkplace } = useAuthStore.getState();
          const { initialCreateFacility } = get();

          const res = await api.get(
            `facility/${currentWorkplace}/${buildingid}/${type}`
          );

          initialCreateFacility();

          if (!res.ok) return res.ok;

          set({ facilities: await res.json() });

          return res.ok;
        },
        initialCreateFacility: () => {
          set({
            createFacility: {
              category: "",
              name: "",
              type: "",
              room: 0,
              standard: "",
              count: 0,
              life: "",
              setDt: new Date(),
              changeDt: new Date(),
            },
          });
        },
      }),
      { name: "facility-store" }
    )
  )
);
