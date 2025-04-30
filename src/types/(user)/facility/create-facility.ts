import { Room } from "../room/room";

export class CreateFacility {
  name: string;
  type: string;
  room: Room;
  standard: string;
  count: number;
  life: string;
  setDt: Date;
  changeDt: Date;

  constructor({
    name,
    type,
    room,
    standard,
    count,
    life,
    setDt,
    changeDt,
  }: {
    name: string;
    type: string;
    room: Room;
    standard: string;
    count: number;
    life: string;
    setDt: Date;
    changeDt: Date;
  }) {
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
