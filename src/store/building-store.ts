import { buildings } from "@/app/(user)/[id]/_components/tab";
import api from "@/middleware/api-manager";
import { Building } from "@/types/(user)/building/building";
import { CreateBuilding } from "@/types/(user)/building/create-building";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BuildingState {
  createBuilding: CreateBuilding;
  buildings: Building[];
  setCreateBuilding: (data: Record<string, any>) => void;
  postCreateBuilding: () => Promise<boolean>;
  setInitialBuilding: () => void;
  getAllBuilding: () => Promise<boolean>;
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
        buildings: [],
        setCreateBuilding: (data) => {
          set((state) => ({
            createBuilding: { ...state.createBuilding, ...data },
          }));
        },
        postCreateBuilding: async () => {
          const { createBuilding, setInitialBuilding } = get();

          const res = await api.post("building/create", {
            json: createBuilding,
          });
          setInitialBuilding();
          if (!res.ok) return res.ok;

          //ok시 수행
          return res.ok;
        },
        setInitialBuilding: () => {
          set({
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
            },

          })
        },
        getAllBuilding: async () => {

          const res = await api.get('building/all');

          if (!res.ok) {
            return res.ok
          }

          set({ buildings: await res.json() })

          return res.ok;
        }
      }),
      { name: "building=store" }
    )
  )
);
