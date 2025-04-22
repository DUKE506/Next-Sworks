"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeptStore } from "@/store/dept-store";
import { zodResolver } from "@hookform/resolvers/zod";

import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DepartmentSideBarProps {
  edit?: boolean;
}

const DepartmentSideBar = ({ edit }: DepartmentSideBarProps) => {
  const { departments, selectDept } = useDeptStore();

  useEffect(() => {}, [departments]);

  return (
    <div className="flex flex-col gap-6 px-3 pt-6 flex-1/8 max-xl:flex-none max-xl:pb-6">
      <span
        className="text-lg text-muted-foreground px-3 hover:cursor-pointer"
        onClick={() => selectDept("ALL")}
      >
        부서
      </span>
      <div className="flex flex-col gap-4 max-xl:flex-row max-xl:overflow-y-auto">
        {departments.map((dept, idx) => {
          return (
            <DepartItem
              key={idx}
              label={dept.name}
              onClick={() => selectDept(dept)}
            />
          );
        })}
        {edit ? null : <DepartmentAddFormDialog />}
      </div>
    </div>
  );
};

const DepartItem = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value?: string;
  onClick?: () => void;
}) => {
  const { selectedDept } = useDeptStore();

  return (
    <div
      className={`flex justify-between p-3 rounded-sm
        ${
          selectedDept?.name == label ? "bg-[var(--primary-light-color)]" : null
        } hover:cursor-pointer `}
      onClick={onClick}
    >
      <span
        className={`text-xs ${
          selectedDept?.name == label ? "text-[var(--primary-color)]" : null
        }`}
      >
        {label}
      </span>
      {/* <span
        className={`text-xs ${
          selectedDept?.name == label
            ? "text-[var(--primary-color)]"
            : "text-muted-foreground"
        }`}
      >
        ({value})
      </span> */}
    </div>
  );
};

const addDeptFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "2글자 이상으로 입력하세요." })
    .max(20, { message: "20자 이하로 입력하세요." }),
});

const DepartmentAddFormDialog = () => {
  const { addDept } = useDeptStore();
  const addDeptForm = useForm<z.infer<typeof addDeptFormSchema>>({
    resolver: zodResolver(addDeptFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (value: z.infer<typeof addDeptFormSchema>) => {
    addDept(value);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex justify-center items-center min-h-[40px] border rounded-md hover:cursor-pointer hover:border-[var(--primary-color)] hover:bg-accent duration-100
        max-xl:w-40
        "
        >
          <Plus size={18} className="text-ring" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">부서 추가</DialogTitle>
        </DialogHeader>
        <Form {...addDeptForm}>
          <form
            onSubmit={addDeptForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={addDeptForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="부서명" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer "
                  type="submit"
                >
                  생성
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentSideBar;
