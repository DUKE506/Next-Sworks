import { buildings } from "@/app/(user)/[id]/_components/tab";
import api from "@/middleware/api-manager";
import { CreateBuilding } from "@/types/(user)/building/create-building";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BuildingState {
  createBuilding: CreateBuilding;
  setCreateBuilding: (data: Record<string, any>) => void;
  postCreateBuilding: () => Promise<boolean>;
}

export const useBuildingStore = create<BuildingState>()(
  devtools(
    persist<BuildingState>(
      (set, get) => ({
        createBuilding: {
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
        } as CreateBuilding,
        setCreateBuilding: (data) => {
          set((state) => ({
            createBuilding: { ...state.createBuilding, ...data },
          }));
        },
        postCreateBuilding: async () => {
          const { createBuilding } = get();

          const res = await api.post("building/create", {
            json: createBuilding,
          });

          if (!res.ok) return res.ok;
          //ok시 수행
          return res.ok;
        },
      }),
      { name: "building=store" }
    )
  )
);
