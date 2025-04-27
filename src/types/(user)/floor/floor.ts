import { Room } from "../room/room";




export class Floor {
    id: number;
    name: string;
    rooms: Room[];

    constructor({ id, name, rooms }: { id: number, name: string, rooms: Room[] }) {
        this.id = id;
        this.name = name;
        this.rooms = rooms;
    }
}