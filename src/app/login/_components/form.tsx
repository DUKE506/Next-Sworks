"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import ky from "ky";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cookies } from "next/headers";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { WorkerPermissionType } from "@/types/(admin)/permission/admin-permission/create-admin-permission";

const schema = z.object({
  account: z.string().min(2, { message: "두 글자 이상 입력해주새요." }),
  password: z.string().min(2, { message: "두 글자 이상 입력해주세요." }),
});

export const LoginForm = () => {
  const [loginMode, setLoginMode] = useState<boolean>(false);
  const router = useRouter();
  const { postAdminLogin, postUserLogin } = useAuthStore();

  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof schema>) => {
    // 관리자 모드 로그인
    if (loginMode) {
      const res = await postAdminLogin(values, loginMode);
      if (!res) return; //토스트
      router.push("/admin/workplace");
      return;
    }

    //일반모드 로그인
    //리턴값에 user가 관리자이면 사업장 선택 페이지
    //일반 사용자라면 본인 사업장 페이지로 이동
    const res = await postUserLogin(values, loginMode);
    console.log(res);
    if (!res.success) return; //토스트

    console.log(res.data.permission.permission);
    console.log(
      res.data.permission.permission === WorkerPermissionType.근무자 ||
        res.data.permission.permission === WorkerPermissionType.사업소장
    );
    if (
      res.data.permission.permission ===
      (WorkerPermissionType.근무자 || WorkerPermissionType.사업소장)
    ) {
      console.log(1);
      router.push(`/user/workplace`);
    } else {
      console.log(2);
      router.push(`/select/workplace`);
    }
  };
  return (
    <Card className="w-130 min-w-100 flex justify-center items-center gap-6">
      <CardHeader className="flex flex-col gap-2 w-full px-18">
        <CardTitle className="text-2xl">Welcome S-Works</CardTitle>
        <CardDescription>에스텍시스템 시설물관리 플랫폼</CardDescription>
      </CardHeader>
      <div className="flex w-full items-center justify-end px-18 gap-2">
        <span className="text-xs">관리자</span>
        <Switch
          className="data-[state=checked]:bg-[var(--primary-color)] hover:cursor-pointer"
          checked={loginMode}
          onCheckedChange={(checked) => setLoginMode(checked)}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardContent className="flex flex-col gap-6 w-full px-18">
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-sm"
                      placeholder="아이디"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-sm"
                      placeholder="비밀번호"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer "
            >
              로그인
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};
