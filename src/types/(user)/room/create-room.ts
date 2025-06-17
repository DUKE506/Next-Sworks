import { Floor } from "../floor/floor";

export class CreateRoom {
  floor?: number;
  name: string;

  constructor({ floor, name }: { floor?: number; name: string }) {
    this.floor = floor;
    this.name = name;
  }
}
