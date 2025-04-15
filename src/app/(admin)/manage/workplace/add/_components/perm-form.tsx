import React from "react";
import { UseFormReturn } from "react-hook-form";
import { WorkplaceFormSchema } from "../page";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconToggle } from "@/components/ui/icon-toggle/icon-toggle";
import {
  Building2,
  ChevronsUpDown,
  Drill,
  Flame,
  Megaphone,
  PaintRoller,
  ShieldBan,
  Wifi,
  Zap,
} from "lucide-react";
import { FormField, FormItem } from "@/components/ui/form";

interface PermForm {
  form: UseFormReturn<z.infer<typeof WorkplaceFormSchema>>;
}

const PermForm = ({ form }: PermForm) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>권한</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-y-6 gap-x-6 w-fit">
        <FormField
          control={form.control}
          name="permMachine"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="기계"
                icon={Drill}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permElectronic"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="전기"
                icon={Zap}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permLift"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="승강"
                icon={ChevronsUpDown}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permFire"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="소방"
                icon={Flame}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permConstruct"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="건축"
                icon={Building2}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permNetwork"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="통신"
                icon={Wifi}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permBeauty"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="미화"
                icon={PaintRoller}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permSecurity"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="보안"
                icon={ShieldBan}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permVoc"
          render={({ field }) => (
            <FormItem>
              <IconToggle
                label="민원"
                icon={Megaphone}
                readonly={false}
                pressed={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PermForm;
