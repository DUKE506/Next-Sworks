import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import { useFloorStore } from "@/store/floor-store";
import { CreateFloor } from "@/types/(user)/floor/create-floor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FloorItemProps {
  label: string;
  isSelect: boolean;
  onClick: () => void;
}

const FloorItem = ({ label, isSelect, onClick }: FloorItemProps) => {
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

export default FloorItem;

export const floorFormSchema = z.object({
  name: z
    .string({ required_error: "필드를 입력해주세요." })
    .min(1, "한 글자 이상 입력해주세요."),
});

export type floorFormType = z.infer<typeof floorFormSchema>;

export const FloorAddButton = () => {
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
