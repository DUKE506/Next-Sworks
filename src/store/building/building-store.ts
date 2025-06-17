"use client";
import api from "@/middleware/api-manager";
import { Building, BuildingName } from "@/types/(user)/building/building";
import { CreateBuilding } from "@/types/(user)/building/create-building";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useAuthStore } from "../auth-store";

interface BuildingState {
  createBuilding: CreateBuilding;
  buildings: Building[];
  buildingsName: BuildingName[];
  locationTree: Building[];
  setCreateBuilding: (data: Record<string, any>) => void;
  postCreateBuilding: () => Promise<boolean>;
  setInitialBuilding: () => void;
  getAllBuilding: () => Promise<boolean>;
  getLocationTree: () => Promise<boolean>;
  getBuildingName: () => Promise<boolean>;
}

const initialBuilding = {
  name: "",
  address: "",
  tel: "",
  usage: "",
  constructionCo: "",
  completionDt: new Date(),
  buildingStruct: "",
  roofStruct: "",
  grossFloorArea: "",
  siteArea: "",
  buildingArea: "",
  totalFloor: "",
  groundFloor: "",
  basementFloor: "",
  totalHeight: "",
  groundHeight: "",
  basementHeight: "",
  totalParking: "",
  indoorParking: "",
  outdoorParking: "",
  electricalCapacity: "",
  receivingCapacity: "",
  powerCapacity: "",
  waterCapacity: "",
  elevatedWaterTankCapacity: "",
  waterTankCapacity: "",
  gasCapacity: "",
  heater: "",
  chillerHeater: "",
  totalLift: "",
  passengerLift: "",
  FreightLift: "",
  coolHeatCapacity: "",
  heatCapacity: "",
  coolCapacity: "",
  totalLandscapeArea: "",
  groundLandscapeArea: "",
  basementLandscapeArea: "",
  totalRestroom: "",
  mensRoom: "",
  ladiesRoom: "",
  fireRating: "",
  cesspoolCapacity: "",
};

export const useBuildingStore = create<BuildingState>()(
  devtools(
    persist<BuildingState>(
      (set, get) => ({
        createBuilding: initialBuilding as CreateBuilding,
        buildings: [],
        buildingsName: [],
        locationTree: [],
        setCreateBuilding: (data) => {
          set((state) => ({
            createBuilding: { ...state.createBuilding, ...data },
          }));
        },
        postCreateBuilding: async () => {
          const { createBuilding, setInitialBuilding } = get();
          const { currentWorkplace } = useAuthStore.getState();

          const res = await api.post(`building/create/${currentWorkplace}`, {
            json: createBuilding,
          });
          setInitialBuilding();
          if (!res.ok) return res.ok;

          //ok시 수행
          return res.ok;
        },
        setInitialBuilding: () => {
          set({
            createBuilding: initialBuilding,
          });
        },
        getAllBuilding: async () => {
          const res = await api.get(`building/all`);

          if (!res.ok) {
            return res.ok;
          }

          set({ buildings: await res.json() });

          return res.ok;
        },
        getLocationTree: async () => {
          const res = await api.get(`building/floor/room`);

          set({ locationTree: await res.json() });

          return res.ok;
        },
        getBuildingName: async () => {
          const res = await api.get(`building/all/name`);

          if (!res.ok) return res.ok;

          set({ buildingsName: await res.json() });

          return res.ok;
        },
      }),
      { name: "building=store" }
    )
  )
);
