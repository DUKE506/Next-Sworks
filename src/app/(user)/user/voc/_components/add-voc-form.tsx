import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/button/custom-button";
import { Form, FormField } from "@/components/ui/form";
import { SelectFormItem } from "@/components/ui/form-field-items/select-field";
import {
  TextAreaFormItem,
  TextFormItem,
} from "@/components/ui/form-field-items/text-field";
import useToast from "@/hooks/useToast";
import { useAuthStore } from "@/store/auth-store";
import { useBuildingStore } from "@/store/building/building-store";
import { useVocStore } from "@/store/voc-store";
import { CreateVoc } from "@/types/(user)/voc/create-voc";
import { VocStatus, VocType, VocTypeOptions } from "@/types/(user)/voc/voc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const vocFormSchema = z.object({
  type: z.string({ message: "유형을 선택해주세요." }),
  status: z.string({ message: "상태를 입력해주세요," }),
  //건물
  building: z.string({ message: "건물을 선택해주세요." }),
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

const AddVocForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { buildingsName, getBuildingName } = useBuildingStore();
  const { postCreateVoc, getAllVocByWorkplaceId } = useVocStore();
  const { addToast } = useToast();

  const router = useRouter();

  useEffect(() => {
    getBuildingName();
  }, []);

  const vocForm = useForm<vocFormType>({
    resolver: zodResolver(vocFormSchema),
    defaultValues: {
      status: VocStatus.PENDING,
      building: undefined,
      type: undefined,
      complainant: "",
      title: "",
      content: "",
      phone: "",
    },
  });
  const onSubmit = async (values: vocFormType) => {
    const res = await postCreateVoc(values as CreateVoc);
    if (!res) {
      addToast({ message: "에러발생", type: "error" });
    } else {
      addToast({ message: "민원등록 완료", type: "success" });
    }
    getAllVocByWorkplaceId();
    setOpen(false);
  };

  return (
    <Form {...vocForm}>
      <form onSubmit={vocForm.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-8">
          <FormField
            control={vocForm.control}
            name="type"
            render={({ field }) => {
              return (
                <SelectFormItem
                  label="유형"
                  placeholder="유형"
                  data={VocTypeOptions}
                  field={field}
                  required
                />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="building"
            render={({ field }) => {
              return (
                <SelectFormItem
                  label="위치"
                  placeholder="위치"
                  data={buildingsName}
                  field={field}
                  required
                />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="complainant"
            render={({ field }) => {
              return (
                <TextFormItem
                  label="민원인"
                  placeholder="민원인"
                  field={field}
                  required
                />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="phone"
            render={({ field }) => {
              return (
                <TextFormItem
                  label="전화번호"
                  placeholder="전화번호"
                  field={field}
                  required
                />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="title"
            render={({ field }) => {
              return (
                <TextFormItem
                  label="제목"
                  placeholder="제목"
                  field={field}
                  required
                />
              );
            }}
          />
          <FormField
            control={vocForm.control}
            name="content"
            render={({ field }) => {
              return (
                <TextAreaFormItem
                  label="내용"
                  placeholder="내용"
                  field={field}
                  required
                />
              );
            }}
          />
        </div>
        <div>
          <CustomButton label="등록" />
        </div>
      </form>
    </Form>
  );
};

export default AddVocForm;
