"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { IconToggle } from "@/components/ui/icon-toggle/icon-toggle";
import { useWorkplaceStore } from "@/store/workplace-store";
import { EditPerm } from "@/types/(admin)/workplace/edit-perm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  ChevronsUpDown,
  Drill,
  Edit,
  Flame,
  Megaphone,
  PaintRoller,
  Save,
  ShieldBan,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

export const permFormSchema = z.object({
  permMachine: z.boolean(),
  permElectronic: z.boolean(),
  permLift: z.boolean(),
  permFire: z.boolean(),
  permConstruct: z.boolean(),
  permNetwork: z.boolean(),
  permBeauty: z.boolean(),
  permSecurity: z.boolean(),
  permVoc: z.boolean(),
});

export const Perm = () => {
  const [edit, setEdit] = useState<boolean>();

  const { workplaceDetail, patchEditPerm } = useWorkplaceStore();

  const permForm = useForm<z.infer<typeof permFormSchema>>({
    resolver: zodResolver(permFormSchema),
    defaultValues: {
      permMachine: workplaceDetail?.permMachine,
      permElectronic: workplaceDetail?.permElectronic,
      permLift: workplaceDetail?.permLift,
      permFire: workplaceDetail?.permFire,
      permConstruct: workplaceDetail?.permConstruct,
      permNetwork: workplaceDetail?.permNetwork,
      permBeauty: workplaceDetail?.permBeauty,
      permSecurity: workplaceDetail?.permSecurity,
      permVoc: workplaceDetail?.permVoc,
    },
  });

  useEffect(() => {
    if (workplaceDetail) {
      syncZod();
    }
  }, [workplaceDetail]);

  //zod sync
  const syncZod = () => {
    permForm.reset({
      permMachine: workplaceDetail?.permMachine,
      permElectronic: workplaceDetail?.permElectronic,
      permLift: workplaceDetail?.permLift,
      permFire: workplaceDetail?.permFire,
      permConstruct: workplaceDetail?.permConstruct,
      permNetwork: workplaceDetail?.permNetwork,
      permBeauty: workplaceDetail?.permBeauty,
      permSecurity: workplaceDetail?.permSecurity,
      permVoc: workplaceDetail?.permVoc,
    });
  };

  const onSubmit = async (values: z.infer<typeof permFormSchema>) => {
    const res = await patchEditPerm(values as EditPerm);

    if (false) {
      ("토스트 넣기");
    }

    setEdit(false);
  };

  return (
    <Card>
      <Form {...permForm}>
        <form onSubmit={permForm.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-row px-6 justify-between">
            <CardTitle>권한</CardTitle>
            <div className="flex">
              {edit ? (
                <div className="flex gap-4">
                  <button type="submit">
                    <Save
                      size={18}
                      className="text-muted-foreground hover:cursor-pointer hover:text-[var(--primary-color)]"
                    />
                  </button>

                  <X
                    size={18}
                    className="text-muted-foreground hover:cursor-pointer hover:text-[var(--primary-color)]"
                    onClick={() => {
                      syncZod();
                      setEdit(false);
                    }}
                  />
                </div>
              ) : (
                <Edit
                  size={18}
                  className="text-muted-foreground hover:cursor-pointer hover:text-[var(--primary-color)]"
                  onClick={() => setEdit(true)}
                />
              )}
            </div>
          </div>

          <CardContent className="grid grid-cols-3 gap-y-6 gap-x-6 w-fit max-xl:flex max-xl:justify-between max-xl:w-full">
            <FormField
              control={permForm.control}
              name="permMachine"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="기계"
                    icon={Drill}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permElectronic"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="전기"
                    icon={Zap}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permLift"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="승강"
                    icon={ChevronsUpDown}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permFire"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="소방"
                    icon={Flame}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permConstruct"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="건축"
                    icon={Building2}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permNetwork"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="통신"
                    icon={Wifi}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permBeauty"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="미화"
                    icon={PaintRoller}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permSecurity"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="보안"
                    icon={ShieldBan}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={permForm.control}
              name="permVoc"
              render={({ field }) => (
                <FormItem>
                  <IconToggle
                    label="민원"
                    icon={Megaphone}
                    readonly={!edit}
                    pressed={field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                </FormItem>
              )}
            />
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};
