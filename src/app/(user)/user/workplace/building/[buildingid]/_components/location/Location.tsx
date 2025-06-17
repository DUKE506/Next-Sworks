import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useFloorStore } from "@/store/floor-store";
import { CreateFloor } from "@/types/(user)/floor/create-floor";
import { CreateRoom } from "@/types/(user)/room/create-room";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import FloorItem, {
  FloorAddButton,
  floorFormSchema,
  floorFormType,
} from "./floor";
import RoomItem, { RoomAddButton } from "./room";

const Location = () => {
  const { floors, selectedFloor, selectFloor } = useFloorStore();

  return (
    <div className="flex flex-col gap-8">
      <span className="text-xl font-bold">위치</span>
      <div className="flex flex-col gap-4">
        <span className="text-md font-bold">층</span>
        <div className="flex gap-4">
          <FloorItem
            label="전체"
            isSelect={selectedFloor.length === floors.length}
            onClick={() => selectFloor("all")}
          />
          {floors.map((v, i) => {
            let isSelect = false;
            if (selectedFloor.length === floors.length) {
            } else {
              isSelect = v.id === selectedFloor[0].id;
            }

            return (
              <FloorItem
                key={i}
                label={v.name}
                isSelect={isSelect}
                onClick={() => selectFloor(v)}
              />
            );
          })}
          <FloorAddButton />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-md font-bold">위치</span>
        <div className="grid grid-cols-6 gap-x-4 gap-y-6">
          {floors.flatMap((floor) => {
            if (
              selectFloor === null ||
              selectedFloor.length === floors.length
            ) {
              return floor.rooms.map((room, idx) => {
                return (
                  <RoomItem
                    key={`%${idx}${room.id}`}
                    label={room.name}
                    floor={floor.name}
                  />
                );
              });
            } else {
              return floor.id === selectedFloor[0].id
                ? selectedFloor[0].rooms.map((room, idx) => {
                    return (
                      <RoomItem
                        key={`%${idx}${room.id}`}
                        label={room.name}
                        floor={floor.name}
                      />
                    );
                  })
                : [];
            }
          })}
          <RoomAddButton />
        </div>
      </div>
    </div>
  );
};

export default Location;
