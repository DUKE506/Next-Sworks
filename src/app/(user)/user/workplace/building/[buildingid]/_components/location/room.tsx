import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { SelectFormItem } from "@/components/ui/form-field-items/select-field";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import { useFloorStore } from "@/store/floor-store";
import { CreateFloor } from "@/types/(user)/floor/create-floor";
import { CreateRoom } from "@/types/(user)/room/create-room";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RoomItemProps {
  label: string;
  floor: string;
}

const RoomItem = ({ label, floor }: RoomItemProps) => {
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

export default RoomItem;

const roomFormSchema = z.object({
  floor: z
    .string({ required_error: "층을 선택하세요." })
    .min(1, { message: "층을 선택하세요." }),
  name: z
    .string({ required_error: "필드를 입력해주세요." })
    .min(1, "한 글자 이상 입력해주세요."),
});

type roomFormType = z.infer<typeof roomFormSchema>;

export const RoomAddButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { floors, postCreateRoom, selectedFloor } = useFloorStore();

  const form = useForm<roomFormType>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      floor: undefined,
      name: "",
    },
  });

  const onSubmit = async (values: roomFormType) => {
    console.log(values);
    // if (selectedFloor === null || selectedFloor.length === floors.length) {
    //   return;
    // }
    // const res = await postCreateRoom(values as CreateRoom, selectedFloor[0].id);
    // setOpen(!open);
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

      <DialogContent className="gap-8 ">
        <DialogHeader>
          <DialogTitle className="font-bold">위치 생성</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 "
          >
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <SelectFormItem
                  label="층"
                  placeholder="층을 선택하세요"
                  field={field}
                  data={floors}
                  required
                />
              )}
            />
            <FormField<roomFormType>
              control={form.control}
              name="name"
              render={({ field }) => (
                <TextFormItem
                  label="위치 명칭"
                  placeholder="기계실"
                  field={field}
                  required
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
