"use client";

import { useWorkplaceStore } from "@/store/workplace-store";
import { CreateWorkplace } from "@/types/(admin)/workplace/create-workplace";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import WorkplaceForm from "./_components/workplace-form";
import PermForm from "./_components/perm-form";
import { Form } from "@/components/ui/form";

export const WorkplaceFormSchema = z.object({
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

const Page = () => {
  const router = useRouter();
  const { createWorkplace } = useWorkplaceStore();

  const workplaceForm = useForm<z.infer<typeof WorkplaceFormSchema>>({
    resolver: zodResolver(WorkplaceFormSchema),
    defaultValues: {
      name: "",
      contractNum: "",
      address: "",
      tel: "",
      contractedAt: new Date(),
      expiredAt: null,
      state: "계약",
      permMachine: false,
      permElectronic: false,
      permLift: false,
      permFire: false,
      permConstruct: false,
      permNetwork: false,
      permBeauty: false,
      permSecurity: false,
      permVoc: false,
    },
  });

  const onSubmit = (value: z.infer<typeof WorkplaceFormSchema>) => {
    createWorkplace(value as CreateWorkplace);
    router.push("/manage/workplace");
  };

  return (
    <div className="h-full ">
      <Form {...workplaceForm}>
        <form
          onSubmit={workplaceForm.handleSubmit(onSubmit)}
          className="flex justify-center gap-6"
        >
          <WorkplaceForm form={workplaceForm} />
          <PermForm form={workplaceForm} />
        </form>
      </Form>
    </div>
  );
};

export default Page;
