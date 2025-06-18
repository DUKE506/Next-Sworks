"use client";
import React, { useEffect, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useBuildingStore } from "@/store/building/building-store";
import { Floor } from "@/types/(user)/floor/floor";
import { Building } from "@/types/(user)/building/building";
import { Room } from "@/types/(user)/room/room";
import { SelectOption } from "@/types/(user)/voc/voc";
import { cn } from "@/lib/utils";

interface RoomSelectFieldFormItemProps<
  T extends FieldValues,
  K extends keyof T
> {
  label: string;
  field?: ControllerRenderProps<T, any>;
}

const RoomSelectFieldFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
}: RoomSelectFieldFormItemProps<T, K>) => {
  const { locationTree } = useBuildingStore();
  //산텍한 데이터 값
  const [selectedBuilding, setSelectedBuilding] = useState<string>();
  const [selectedFloor, setSelectedFloor] = useState<string>();
  const [selectedRoom, setSelectedRoom] = useState<string>();

  //하위 선택할 수 있는 데이터
  const [selectableFloor, setSelectableFloor] = useState<Floor[] | null>(null);
  const [selectableRoom, setSelectableRoom] = useState<Room[] | null>(null);

  useEffect(() => {
    console.log("field 전달 여부 확인:", field);
  }, []);

  //건물선택 시
  useEffect(() => {
    //건물 선택한 경우
    if (selectedBuilding) {
      //선택한 층, 위치 초기화
      setSelectedFloor(undefined);
      setSelectedRoom(undefined);
      //선택 가능 층, 위치 데이터 초기화
      setSelectableFloor(null);
      setSelectableRoom(null);

      const building = locationTree.find(
        (b) => b.id.toString() === selectedBuilding
      );
      //층이 존재하는경우
      if (building && building.floors.length > 0) {
        setSelectableFloor(building.floors);
      }
      //층이 없는 경우
      else {
        setSelectableFloor(null);
        setSelectableRoom(null);
      }
    } //건물 선택 해제 한 경우
    else {
      setSelectableFloor(null);
      setSelectableRoom(null);
    }
  }, [selectedBuilding, locationTree]);

  useEffect(() => {
    //층 선택한 경우
    if (selectedFloor) {
      //선택한 층, 위치 초기화
      setSelectedRoom(undefined);
      //선택 가능 층, 위치 데이터 초기화
      setSelectableRoom(null);

      const floor = selectableFloor?.find(
        (f) => f.id.toString() === selectedFloor
      );
      if (floor && floor.rooms) {
        setSelectableRoom(floor.rooms);
      }
      //공간이 없는 경우
      else {
        setSelectableRoom(null);
      }
    } //층 선택해제 한 경우
    else {
      setSelectableRoom(null);
    }
  }, [selectedFloor]);

  //건물 선택
  const handleBuildingChange = (value: string | undefined) => {
    setSelectedBuilding(value);
    // 하위 선택 항목 초기화
    setSelectedFloor(undefined);
    setSelectedRoom(undefined);
    field?.onChange(0);
  };

  //층 선택
  const handleFloorChange = (value: string | undefined) => {
    setSelectedFloor(value);
    // 하위 선택 항목 초기화
    setSelectedRoom(undefined);
    field?.onChange(0);
  };

  //층 선택
  const handleRoomChange = (value: string | undefined) => {
    if (value === undefined) return;
    setSelectedRoom(value);
    field?.onChange(parseInt(value));
  };

  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)]">
          {label}
        </FormLabel>
        <FormMessage />
      </div>
      <div className="flex justify-between gap-4">
        <SelectField
          placeholder="건물을 선택하세요."
          data={locationTree}
          value={selectedBuilding ?? undefined}
          onSelect={handleBuildingChange}
        />
        <SelectField
          key={"f" + selectedBuilding}
          placeholder="층을 선택하세요."
          data={selectableFloor}
          value={selectedFloor ?? undefined}
          onSelect={handleFloorChange}
        />
        <FormControl>
          <SelectField
            key={"r" + selectedRoom}
            placeholder="위치를 선택하세요."
            data={selectableRoom}
            value={selectedRoom ?? undefined}
            onSelect={handleRoomChange}
          />
        </FormControl>
      </div>
    </FormItem>
  );
};

interface SelectFieldProps<T extends SelectOption> {
  placeholder?: string;
  data: T[] | null;
  value: string | undefined;
  onSelect: (value: string | undefined) => void;
}

const SelectField = <T extends SelectOption>({
  placeholder,
  data,
  value,
  onSelect,
}: SelectFieldProps<T>) => {
  return (
    <Select
      onValueChange={(value) => onSelect(value)}
      disabled={data === null}
      value={value}
    >
      <SelectTrigger className="w-full hover:cursor-pointer rounded-sm">
        <SelectValue placeholder={placeholder ?? "항목을 선택하세요"} />
      </SelectTrigger>
      <SelectContent className="rounded-sm">
        <SelectGroup>
          {data?.map((v, i) => {
            return (
              <SelectItem
                key={i}
                value={v.id.toString()}
                className=" hover:cursor-pointer text-xs"
              >
                {v.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RoomSelectFieldFormItem;

interface SelectFormItemProps<
  J extends SelectOption,
  T extends FieldValues,
  K extends keyof T
> {
  className?: string;
  label: string;
  placeholder: string;
  data: J[];
  field: ControllerRenderProps<T, any>;
  required?: boolean;
}

export const SelectFormItem = <
  J extends SelectOption,
  T extends FieldValues,
  K extends keyof T
>({
  className,
  label,
  placeholder,
  data,
  field,
  required = false,
}: SelectFormItemProps<J, T, K>) => {
  return (
    <FormItem>
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)] gap-0 ">
          {label}
          <span className="text-red-500">{required ? "*" : ""}</span>
        </FormLabel>
        <FormMessage />
      </div>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-full hover:cursor-pointer rounded-sm">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className={cn("rounded-sm", className)}>
          {data.map((v, i) => {
            return (
              <SelectItem
                key={i}
                value={v.id.toString()}
                className="hover:cursor-pointer text-xs"
              >
                {v.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
