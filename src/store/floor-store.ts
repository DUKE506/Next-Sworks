import api from "@/middleware/api-manager";
import { CreateFloor } from "@/types/(user)/floor/create-floor";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useBuildingDetailStore } from "./building/building-detail-store";
import { Floor } from "@/types/(user)/floor/floor";
import { CreateRoom } from "@/types/(user)/room/create-room";

interface FloorState {
  //건물 층 조회
  floors: Floor[];
  //선택 한 층
  // selectedFloor: Floor | "all";
  selectedFloor: Floor[];
  //건물 전체 층 조회
  getAllFloor: () => Promise<boolean>;
  //층 선택 핸들러
  selectFloor: (floor: Floor | "all") => void;
  //층 생성
  postCreateFloor: (floor: CreateFloor) => Promise<boolean>;
  //공간 생성
  postCreateRoom: (room: CreateRoom) => Promise<boolean>;
}

export const useFloorStore = create<FloorState>()(
  devtools(
    persist<FloorState>(
      (set, get) => ({
        floors: [],
        selectedFloor: [],
        getAllFloor: async () => {
          const { building } = useBuildingDetailStore.getState();
          if (!building) return false;
          const res = await api.get(`building/${building?.id}/floor/all`);

          const allFloor: Floor[] = await res.json();

          set({ floors: allFloor });
          set({ selectedFloor: allFloor });

          return res.ok;
        },
        selectFloor: (floor) => {
          const { floors: storeFloors } = get();
          if (floor === "all") set({ selectedFloor: storeFloors });
          else set({ selectedFloor: [floor] });
        },
        postCreateFloor: async (floor) => {
          const { building } = useBuildingDetailStore.getState();
          const { getAllFloor } = get();
          if (!building) return false;

          const res = await api.post(`building/${building?.id}/floor/add`, {
            json: floor,
          });

          if (!res.ok) return res.ok;

          await getAllFloor();

          const { floors } = get();

          set({ selectedFloor: floors });

          return res.ok;
        },
        postCreateRoom: async (createRoom) => {
          const { building } = useBuildingDetailStore.getState();
          if (!building) return false;

          const res = await api.post(`building/${building.id}/room/add`, {
            json: createRoom,
          });

          const { getAllFloor } = get();

          await getAllFloor();

          return res.ok;
        },
      }),
      { name: "floor-store" }
    )
  )
);
