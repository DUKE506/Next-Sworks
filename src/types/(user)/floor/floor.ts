import { Building } from "../building/building";
import { Room } from "../room/room";

export class Floor {
  id: number;
  name: string;
  building: Building;
  rooms: Room[];

  constructor({
    id,
    name,
    rooms,
    building,
  }: {
    id: number;
    name: string;
    rooms: Room[];
    building: Building;
  }) {
    this.id = id;
    this.name = name;
    this.rooms = rooms;
    this.building = building;
  }
}
