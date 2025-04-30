import { Room } from "../room/room";

export class Facility {
  id: number;
  name: string;
  type: string;
  room: Room;
  standard: string;
  count: number;
  life: string;
  setDt: Date;
  changeDt: Date;

  constructor({
    id,
    name,
    type,
    room,
    standard,
    count,
    life,
    setDt,
    changeDt,
  }: {
    id: number;
    name: string;
    type: string;
    room: Room;
    standard: string;
    count: number;
    life: string;
    setDt: Date;
    changeDt: Date;
  }) {
    (this.id = id),
      (this.name = name),
      (this.type = type),
      (this.room = room),
      (this.standard = standard),
      (this.count = count),
      (this.life = life),
      (this.setDt = setDt),
      (this.changeDt = changeDt);
  }
}
