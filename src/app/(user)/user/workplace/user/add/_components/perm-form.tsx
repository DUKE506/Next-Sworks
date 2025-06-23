import { PermItem } from "@/app/(admin)/admin/workplace/[id]/_components/worker-perm/worker-perm";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import PermFieldItem from "@/components/ui/form-field-items/perm-field";
import FormContentLayout from "@/components/ui/layout/form-layout/form-content-layout";
import { useWorkerPermissionStore } from "@/store/worker-permission/worker-permission.store";
import { CreateUser } from "@/types/(user)/user/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PermFormProps {
  createUser: CreateUser;
  onCreate: (data: Record<string, any>) => void;
  onPrev: () => void;
}

const permFormSchema = z.object({
  permissionId: z.number().min(0, { message: "권한을 선택해주세요." }),
});

type PermFormType = z.infer<typeof permFormSchema>;

const PermForm = ({ createUser, onCreate, onPrev }: PermFormProps) => {
  const form = useForm<PermFormType>({
    resolver: zodResolver(permFormSchema),
    defaultValues: {
      permissionId: createUser.permissionId,
    },
  });

  const onSubmit = (values: PermFormType) => {
    onCreate(values);
  };

  return (
    <FormContentLayout label="권한" form={form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="permissionId"
          render={({ field }) => (
            <PermFieldItem
              value={field.value}
              onChange={(id: number) => {
                field.onChange(id);
              }}
            />
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={onPrev}
            className="text-xs text-[var(--description-title-color)] border bg-accent hover:cursor-pointer hover:bg-[var(--background-light-color)]"
          >
            이전 단계
          </Button>
          <Button
            type="submit"
            className="text-xs bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
          >
            다음 단계
          </Button>
        </div>
      </form>
    </FormContentLayout>
  );
};

export default PermForm;
