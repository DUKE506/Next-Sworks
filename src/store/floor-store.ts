import api from "@/middleware/api-manager";
import { CreateFloor } from "@/types/(user)/floor/create-floor";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useBuildingDetailStore } from "./building-detail-store";
import { Floor } from "@/types/(user)/floor/floor";
import { CreateRoom } from "@/types/(user)/room/create-room";


interface FloorState {
    floors: Floor[];
    selectedFloor: Floor | 'all';
    getAllFloor: (buildingid: number) => Promise<boolean>;
    selectFloor: (floor: Floor | 'all') => void;
    postCreateFloor: (floor: CreateFloor) => Promise<boolean>;
    postCreateRoom: (room: CreateRoom, floorid: number) => Promise<boolean>;
}


export const useFloorStore = create<FloorState>()(
    devtools(
        persist<FloorState>(
            (set, get) => ({
                floors: [],
                selectedFloor: 'all',
                getAllFloor: async (floor) => {
                    const { building } = useBuildingDetailStore.getState();
                    if (!building) return false;
                    const res = await api.get(`building/${building?.id}/floor/all`)

                    set({ floors: await res.json() })

                    return res.ok
                },
                selectFloor: (floor) => {
                    if (floor === 'all') set({ selectedFloor: 'all' })
                    else set({ selectedFloor: floor })

                },
                postCreateFloor: async (floor) => {

                    const { building } = useBuildingDetailStore.getState();
                    if (!building) return false;


                    const res = await api.post(`building/${building?.id}/floor/add`, { json: floor })

                    const { getAllFloor } = get();

                    await getAllFloor(building.id);

                    return res.ok;
                },
                postCreateRoom: async (room, floorid) => {
                    const { building } = useBuildingDetailStore.getState();
                    if (!building) return false;

                    const res = await api.post(`building/${building.id}/room/${floorid}/add`, { json: room })

                    const { getAllFloor } = get();

                    await getAllFloor(building.id);

                    return res.ok;
                }
            }),
            { name: 'floor-store' }
        )
    )
)