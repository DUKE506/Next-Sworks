"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const workplaceFormSchema = z.object({
  name: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  contractNum: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  address: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  tel: z
    .string()
    .min(9, { message: "자릿수를 확인해주세요." })
    .max(13, { message: "자릿수를 확인해주세요." }),
  contractedAt: z.date(),
  expiredAt: z.date().nullable(),
  state: z.enum(["계약", "해약"]),
});

const Page = () => {
  const workplaceForm = useForm<z.infer<typeof workplaceFormSchema>>({
    resolver: zodResolver(workplaceFormSchema),
    defaultValues: {
      name: "",
      contractNum: "",
      address: "",
      tel: "",
      contractedAt: new Date(),
      expiredAt: null,
      state: "계약",
    },
  });

  const onSubmit = (value: z.infer<typeof workplaceFormSchema>) => {
    console.log(value);
  };
  return (
    <div className="h-full">
      <Card className="sm:w-150 h-fit">
        <CardHeader>
          <CardTitle>사업장 생성</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...workplaceForm}>
            <form
              onSubmit={workplaceForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={workplaceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      사업장명
                      <FormMessage />
                    </FormLabel>
                    <Input placeholder="사업장명" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={workplaceForm.control}
                name="contractNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      계약번호
                      <FormMessage />
                    </FormLabel>
                    <Input placeholder="계약번호" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={workplaceForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      주소
                      <FormMessage />
                    </FormLabel>
                    <Input placeholder="주소" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={workplaceForm.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      전화번호
                      <FormMessage />
                    </FormLabel>
                    <Input placeholder="( - 제외) 02XXXXXXX" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={workplaceForm.control}
                name="contractedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      계약일자
                      <FormMessage />
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={workplaceForm.control}
                name="expiredAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs justify-between">
                      해약일자
                      <FormMessage />
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] "
                type="submit"
              >
                생성
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
