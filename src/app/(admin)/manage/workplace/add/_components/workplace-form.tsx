import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker.tsx/date-picker";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { WorkplaceFormSchema } from "../page";

interface WorkplaceFormProps {
  form: UseFormReturn<z.infer<typeof WorkplaceFormSchema>>;
}

const WorkplaceForm = ({ form }: WorkplaceFormProps) => {
  return (
    <Card className="sm:w-150 h-fit">
      <CardHeader>
        <CardTitle>사업장 생성</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
          name="contractedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs justify-between">
                계약일자
                <FormMessage />
              </FormLabel>
              <DatePicker field={field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiredAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs justify-between">
                해약일자
                <FormMessage />
              </FormLabel>
              <DatePicker field={field} />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] "
          type="submit"
        >
          생성
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkplaceForm;
