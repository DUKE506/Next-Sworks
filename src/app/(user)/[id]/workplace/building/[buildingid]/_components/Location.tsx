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
import { TextFormItem } from "../../add/page";
import { Button } from "@/components/ui/button";
import { useFloorStore } from "@/store/floor-store";
import { CreateFloor } from "@/types/(user)/floor/create-floor";
import { CreateRoom } from "@/types/(user)/room/create-room";

const Location = () => {
  const { floors, selectedFloor, selectFloor } = useFloorStore();

  console.log(selectedFloor);

  return (
    <div className="flex flex-col gap-8">
      <span className="text-xl font-bold">위치</span>
      <div className="flex flex-col gap-4">
        <span className="text-md font-bold">층</span>
        <div className="flex gap-4">
          <Floor
            label="전체"
            isSelect={selectedFloor === "all"}
            onClick={() => selectFloor("all")}
          />
          {floors.map((v, i) => {
            let isSelect = false;
            if (selectedFloor === "all") {
            } else {
              isSelect = v.id === selectedFloor.id;
            }

            return (
              <Floor
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
            if (selectFloor === null || selectedFloor === "all") {
              return floor.rooms.map((room, idx) => {
                return (
                  <Room
                    key={`%${idx}${room.id}`}
                    label={room.name}
                    floor={floor.name}
                  />
                );
              });
            } else {
              return floor.id === selectedFloor.id
                ? selectedFloor.rooms.map((room, idx) => {
                    return (
                      <Room
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

const Floor = ({
  label,
  isSelect,
  onClick,
}: {
  label: string;
  isSelect: boolean;
  onClick: () => void;
}) => {
  return (
    <Card
      className={`px-8 py-2 rounded-sm ${
        isSelect ? "bg-blue-500" : null
      } hover:cursor-pointer`}
      onClick={onClick}
    >
      <span className={`text-xs ${isSelect ? "text-white" : null}`}>
        {label}
      </span>
    </Card>
  );
};

const floorFormSchema = z.object({
  name: z
    .string({ required_error: "필드를 입력해주세요." })
    .min(1, "한 글자 이상 입력해주세요."),
});

type floorFormType = z.infer<typeof floorFormSchema>;

const FloorAddButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { postCreateFloor } = useFloorStore();

  const form = useForm<floorFormType>({
    resolver: zodResolver(floorFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: floorFormType) => {
    const res = await postCreateFloor(values as CreateFloor);
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger>
        <Card className="px-8 py-2 rounded-sm hover:cursor-pointer hover:bg-accent duration-200">
          <Plus className="text-[var(--description-title-color)]" size={18} />
        </Card>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle className="font-bold">층 생성</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 "
          >
            <FormField<floorFormType>
              control={form.control}
              name="name"
              render={({ field }) => (
                <TextFormItem label="층 명칭" placeholder="1F" field={field} />
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:cursor-pointer hover:bg-blue-600"
            >
              생성
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const Room = ({ label, floor }: { label: string; floor: string }) => {
  return (
    <Card className="rounded-sm">
      <CardContent className="flex flex-row gap-4 items-center">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-[var(--description-value-color)]">
          {floor}
        </span>
      </CardContent>
    </Card>
  );
};

const roomFormSchema = z.object({
  name: z
    .string({ required_error: "필드를 입력해주세요." })
    .min(1, "한 글자 이상 입력해주세요."),
});

type roomFormType = z.infer<typeof floorFormSchema>;

const RoomAddButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { postCreateRoom, selectedFloor } = useFloorStore();

  const form = useForm<roomFormType>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: floorFormType) => {
    if (selectedFloor === null || selectedFloor === "all") {
      return;
    }
    const res = await postCreateRoom(values as CreateRoom, selectedFloor.id);
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger>
        <Card className="px-8 h-[70px] rounded-sm justify-center items-center hover:cursor-pointer hover:bg-accent duration-200">
          <Plus className="text-[var(--description-title-color)]" size={18} />
        </Card>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle className="font-bold">위치 생성</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 "
          >
            <FormField<roomFormType>
              control={form.control}
              name="name"
              render={({ field }) => (
                <TextFormItem
                  label="위치 명칭"
                  placeholder="기계실"
                  field={field}
                />
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:cursor-pointer hover:bg-blue-600"
            >
              생성
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Location;
