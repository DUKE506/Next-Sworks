import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { SelectFormItem } from "@/components/ui/form-field-items/select-field";
import {
  PasswordFormItem,
  TextFormItem,
} from "@/components/ui/form-field-items/text-field";
import FormContentLayout from "@/components/ui/layout/form-layout/form-content-layout";
import { useDeptStore } from "@/store/dept-store";
import {
  Permission,
  PermissionSelectData,
} from "@/types/(admin)/permission/permission";
import { CreateAdmin } from "@/types/(admin)/user/create-admin";
import { DepartmentSchema } from "@/types/department";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const adminFormSchema = z
  .object({
    account: z
      .string()
      .min(3, { message: "5자 이상으로 입력하세요." })
      .max(20, { message: "20자 이하로 입력하세요." }),
    password: z.string().min(8, { message: "8자 이상으로 입력하세요." }),
    checkPassword: z.string().min(8, { message: "8자 이상으로 입력하세요." }),
    name: z
      .string()
      .min(2, { message: "2자 이상으로 입력하세요." })
      .max(10, { message: "10자 이하로 입력하세요." }),
    phone: z
      .string()
      .min(9, { message: "자릿수를 확인해주세요." })
      .max(11, { message: "자릿수를 확인해주세요." }),
    email: z.string().email({ message: "이메일 형식을 확인해주세요." }),
    //department: DepartmentSchema,
    department: z.string({ message: "부서를 선택해주세요." }),
    permission: z.enum(["운영관리자", "일반관리자"]),
  })
  .refine(({ password, checkPassword }) => password === checkPassword, {
    path: ["checkPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type AdminFormType = z.infer<typeof adminFormSchema>;

interface AdminFormProps {
  createAdmin: CreateAdmin;
  onCreate: (data: Record<string, any>) => void;
}

const AdminForm = ({ createAdmin, onCreate }: AdminFormProps) => {
  const { departments } = useDeptStore();
  const form = useForm<AdminFormType>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      account: createAdmin.account,
      password: createAdmin.password,
      checkPassword: "",
      name: createAdmin.name,
      phone: createAdmin.phone,
      email: createAdmin.email,
      permission: createAdmin.permission,
    },
  });

  const onSubmit = (values: z.infer<typeof adminFormSchema>) => {
    onCreate(values);
  };

  return (
    <FormContentLayout label={"기본 정보"} form={form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-12"
      >
        <div className="grid grid-cols-2 gap-x-12 gap-y-16">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <TextFormItem label="이름" placeholder="이름" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <TextFormItem label="아이디" placeholder="아이디" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordFormItem
                label="비밀번호"
                placeholder="비밀번호"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="checkPassword"
            render={({ field }) => (
              <PasswordFormItem
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                field={field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <TextFormItem
                label="전화번호"
                placeholder="전화번호 ( - 제외)"
                field={field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <TextFormItem label="이메일" placeholder="이메일" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <SelectFormItem
                label="부서"
                placeholder="부서를 선택하세요"
                field={field}
                data={departments}
              />
            )}
          />
          <FormField
            control={form.control}
            name="permission"
            render={({ field }) => (
              <SelectFormItem
                label="권한"
                placeholder="권한을 선택하세요"
                field={field}
                data={PermissionSelectData}
              />
            )}
          />
        </div>
        <div className="flex justify-end">
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

export default AdminForm;
