import { Form, FormField } from "@/components/ui/form";
import { CreateUser } from "@/types/(user)/user/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  PasswordFormItem,
  TextFormItem,
} from "@/components/ui/form-field-items/text-field";

const userFormSchema = z
  .object({
    name: z.string().min(2, { message: "두 글자 이상 입력하세요." }),
    account: z.string().min(2, { message: "두 글자 이상 입력하세요." }),
    password: z.string().min(8, { message: "8자 이상으로 입력하세요." }),
    checkPassword: z.string().min(8, { message: "8자 이상으로 입력하세요." }),
    phone: z
      .string()
      .min(9, { message: "자릿수를 확인해주세요." })
      .max(11, { message: "자릿수를 확인해주세요." }),
    email: z.string().email({ message: "이메일 형식을 확인해주세요." }),
  })
  .refine(({ password, checkPassword }) => password === checkPassword, {
    path: ["checkPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type userFormType = z.infer<typeof userFormSchema>;

interface BasicFormProps {
  createUser: CreateUser;
  onClick: (data: Record<string, any>) => void;
}

const BasicForm = ({ createUser, onClick }: BasicFormProps) => {
  const form = useForm<userFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: createUser.name,
      account: createUser.account,
      password: createUser.password,
      checkPassword: "",
      phone: createUser.phone,
      email: createUser.email,
    },
  });

  const onSubmit = (values: userFormType) => {
    console.log(values);
    onClick(values);
  };

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="border-b py-4">
        <span className="text-lg font-bold text-[var(--description-title-color)]">
          기본정보
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="grid grid-cols-2 gap-x-12 gap-y-16">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <TextFormItem
                  label="이름 *"
                  placeholder="홍길동"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <TextFormItem
                  label="아이디 *"
                  placeholder="두 글자 이상"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <PasswordFormItem
                  label="비밀번호 *"
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
                  label="비밀번호 확인 *"
                  placeholder="비빌먼호 확인"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <TextFormItem
                  label="전화번호 *"
                  placeholder="( - 제외 )"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <TextFormItem
                  label="이메일 "
                  placeholder="honggildong@gmail.com"
                  field={field}
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
      </Form>
    </div>
  );
};

export default BasicForm;
