"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/admin-store";
import { useDeptStore } from "@/store/dept-store";
import { CreateAdmin } from "@/types/(admin)/user/create-admin";
import { Department, DepartmentSchema } from "@/types/department";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userFormSchema = z
  .object({
    account: z
      .string()
      .min(3, { message: "5자 이상으로 입력하세요." })
      .max(20, { message: "20자 이하로 입력하세요." }),
    password: z.string().min(8, { message: "8자 이상으로 입력하세요." }),
    checkPassword: z.string().min(8, { message: "8자 이상으로 입력하세요." }),
    name: z
      .string()
      .min(2, { message: "2글자 이상으로 입력하세요." })
      .max(10, { message: "10자 이하로 입력하세요." }),
    phone: z
      .string()
      .min(9, { message: "자릿수를 확인해주세요." })
      .max(11, { message: "자릿수를 확인해주세요." }),
    email: z.string().email({ message: "이메일 형식을 확인해주세요." }),
    department: DepartmentSchema,
    permission: z.enum(["MANAGER", "NORMAL"]),
  })
  .refine(({ password, checkPassword }) => password === checkPassword, {
    path: ["checkPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

const Page = () => {
  const router = useRouter();
  const { createAdmin } = useAdminStore();
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      account: "",
      password: "",
      checkPassword: "",
      name: "",
      phone: "",
      email: "",
      permission: "MANAGER",
    },
  });

  const onSubmit = (values: z.infer<typeof userFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const admin: CreateAdmin = {
      account: values.account,
      password: values.password,
      name: values.name,
      department: values.department,
      phone: values.phone,
      email: values.email,
      permission: values.permission,
    };
    createAdmin(admin);
    router.push("/manage/user");
  };

  return (
    <div className="h-full flex justify-center">
      <Card className="h-full sm:w-150">
        <CardHeader>
          <CardTitle>관리자 생성</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...userForm}>
            <form
              onSubmit={userForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={userForm.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      아이디
                      <FormMessage className="text-xs" />
                    </FormLabel>
                    <Input placeholder="아이디" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      비밀번호 <FormMessage className="text-xs" />
                    </FormLabel>
                    <PasswordInput placeholder="비밀번호" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="checkPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      비밀번호 확인 <FormMessage className="text-xs" />
                    </FormLabel>
                    <PasswordInput placeholder="비밀번호 확인" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      이름 <FormMessage className="text-xs" />
                    </FormLabel>
                    <Input placeholder="홍길동" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      부서 <FormMessage className="text-xs" />
                    </FormLabel>
                    <DeptSelect value={field.value} onChange={field.onChange} />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      전화번호 <FormMessage className="text-xs" />
                    </FormLabel>
                    <Input placeholder="( - 제외 ) 01XXXXXXXXX" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      이메일 <FormMessage className="text-xs" />
                    </FormLabel>
                    <Input placeholder="sworks@gmail.com" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="permission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      권한 <FormMessage className="text-xs" />
                    </FormLabel>
                    <div className="flex gap-4">
                      <PermItem
                        title="MANAGER"
                        desc="모든 읽기/쓰기 권한을 모두 가진 관리자"
                        value="MANAGER"
                        selected={field.value}
                        onClick={() => field.onChange("MANAGER")}
                      />
                      <PermItem
                        title="NORMAL"
                        desc="할당받은 사업장에 대해  읽기/쓰기 권한을 가진 관리자"
                        value="NORMAL"
                        selected={field.value}
                        onClick={() => field.onChange("NORMAL")}
                      />
                    </div>
                  </FormItem>
                )}
              />
              <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer w-full">
                생성
              </Button>
            </form>
          </Form>
          {/**
           * 아이디
           * 비밀번호
           * 비밀번호 확인
           * 이름
           * 연락처
           * 이메일
           * 부서
           * 권한
           */}
        </CardContent>
      </Card>
    </div>
  );
};

const PermItem = ({
  title,
  desc,
  value,
  selected,
  onClick,
}: {
  title: string;
  desc: string;
  value?: string;
  selected: string;
  onClick?: () => void;
}) => {
  return (
    <Card
      className={`flex-1 hover:cursor-pointer gap-4 ${
        value === selected
          ? "bg-[var(--primary-light-color)] duration-200"
          : null
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
    </Card>
  );
};

const DeptSelect = ({
  value,
  onChange,
}: {
  value: Department;
  onChange: (dept: Department) => void;
}) => {
  const { departments } = useDeptStore();

  return (
    <Select
      value={value?.name || ""}
      onValueChange={(selectedName) => {
        const selectedDept = departments.find(
          (dept) => dept.name === selectedName
        );
        if (selectedDept) {
          onChange(selectedDept);
        }
      }}
    >
      <SelectTrigger className="w-full hover: cursor-pointer text-sm">
        <SelectValue placeholder="선택" />
      </SelectTrigger>
      <SelectContent>
        {departments.map((v, i) => {
          return (
            <SelectItem
              key={i}
              value={v.name}
              className="text-xs hover:cursor-pointer "
            >
              {v.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default Page;
