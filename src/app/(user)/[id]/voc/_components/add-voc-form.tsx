import { Form, FormField } from "@/components/ui/form";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import { useVocStore } from "@/store/voc-store";
import { VocStatus } from "@/types/(user)/voc/voc";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const vocFormSchema = z.object({
  type: z.string({ message: "유형을 선택해주세요." }),
  status: z.string({ message: "상태를 입력해주세요," }),
  complainant: z
    .string({ message: "민원인 이름을 입력해주세요." })
    .min(1, { message: "두 글자 이상 입력해주세요." }),
  phone: z
    .string()
    .min(9, { message: "자릿수를 확인해주세요." })
    .max(11, { message: "자릿수를 확인해주세요." })
    .nullable(),
  title: z
    .string({ message: "민원 내용을 입력해주세요." })
    .min(2, { message: "두 글자이상 입력해주세요." }),
  content: z
    .string({ message: "민원 내용을 입력해주세요." })
    .min(2, { message: "두 글자이상 입력해주세요." }),
});

type vocFormType = z.infer<typeof vocFormSchema>;

const AddVocForm = () => {
  const { createVoc } = useVocStore();

  const vocForm = useForm<vocFormType>({
    resolver: zodResolver(vocFormSchema),
    defaultValues: {
      type: createVoc.type,
      status: VocStatus.COMPLETED,
      complainant: createVoc.complainant,
      title: createVoc.title,
      content: createVoc.content,
      phone: createVoc.phone,
    },
  });
  const onSubmit = () => {};
  return (
    <Form {...vocForm}>
      <form onSubmit={vocForm.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <TextFormItem label="유형" placeholder="유형" field={field} />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <TextFormItem label="유형" placeholder="유형" field={field} />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <TextFormItem label="유형" placeholder="유형" field={field} />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <TextFormItem label="유형" placeholder="유형" field={field} />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <TextFormItem label="유형" placeholder="유형" field={field} />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <TextFormItem label="유형" placeholder="유형" field={field} />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <TextFormItem label="유형" placeholder="유형" field={field} />
              );
            }}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddVocForm;
