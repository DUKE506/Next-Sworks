import { Floor } from "../floor/floor";

export class Room {
  id: number;
  name: string;
  floor: Floor;

  constructor({ id, name, floor }: { id: number; name: string; floor: Floor }) {
    this.id = id;
    this.name = name;
    this.floor = floor;
  }
}
