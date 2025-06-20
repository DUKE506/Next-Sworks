import CustomDialog from "@/components/common/custom-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { SelectFormItem } from "@/components/ui/form-field-items/select-field";
import { DualSwitchFormItem } from "@/components/ui/form-field-items/switch-filed";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import IconButton from "@/components/ui/icon-button/icon-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useWorkerPermissionStore } from "@/store/worker-permission/worker-permission.store";
import {
  CreateWorkerPermission,
  WorkerPermissionSelectData,
} from "@/types/(admin)/permission/admin-permission/create-admin-permission";
import { WorkerPermission } from "@/types/(admin)/permission/worker-permission/worker-permission";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";

const WorkerPerm = () => {
  const { allWorkerPermission, getWorkerPermission } =
    useWorkerPermissionStore();

  useEffect(() => {
    getWorkerPermission();
  }, []);

  return (
    <Card className="w-full">
      <div className="flex px-6 justify-between items-center">
        <CardTitle>근무자 권한</CardTitle>
        <div className="flex gap-4">
          <AddPerm />
        </div>
      </div>
      <CardContent className="flex flex-wrap  gap-x-4 gap-y-6">
        {allWorkerPermission.map((p, i) => (
          <PermItem key={i} data={p} />
        ))}
      </CardContent>
    </Card>
  );
};

interface PermItemProps {
  data: WorkerPermission;
}

const PermItem = ({ data }: PermItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteWorkerPermission } = useWorkerPermissionStore();

  const valueItem = ({ label, value }: { label: string; value: number }) => {
    const getValueText = (val: number) => {
      switch (val) {
        case 0:
          return "없음";
        case 1:
          return "읽기";
        case 2:
          return "쓰기";
      }
    };
    return (
      <div className="flex justify-between items-center">
        <span className="text-xs">{label}</span>
        <span className="text-xs text-[var(--description-value-color)]">
          {getValueText(value)}
        </span>
      </div>
    );
  };

  const onDelete = (id: number) => {
    deleteWorkerPermission(id);
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger className="h-fit">
        <div className=" flex items-center gap-4 px-4 py-2 border rounded-sm hover:bg-accent hover:cursor-pointer border-[var(--primary-color)]">
          <span className="text-xs whitespace-nowrap">{data.name}</span>
          <span className="text-[0.6rem] whitespace-nowrap text-[var(--description-value-color)]">
            {data.permission}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        {/* 헤더 */}
        <div className=" flex justify-end gap-4">
          <IconButton icon={Pen} className="text-muted-foreground" />
          <IconButton
            icon={Trash2}
            className="text-muted-foreground"
            onClick={() => onDelete(data.id)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">{data.name}</span>
        </div>
        <div className="flex flex-col gap-2">
          {valueItem({ label: "기본", value: data.basicPerm })}
          {valueItem({ label: "기계", value: data.machinePerm })}
          {valueItem({ label: "전기", value: data.electricPerm })}
          {valueItem({ label: "승강", value: data.liftPerm })}
          {valueItem({ label: "소방", value: data.firePerm })}
          {valueItem({ label: "건축", value: data.buildingPerm })}
          {valueItem({ label: "통신", value: data.networkPerm })}
          {valueItem({ label: "미화", value: data.beautyPerm })}
          {valueItem({ label: "보안", value: data.securityPerm })}
          {valueItem({ label: "민원", value: data.vocPerm })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const AddPerm = () => {
  return (
    <CustomDialog title="권한 생성">
      {({ setIsOpen }) => <WorkerPermForm onClose={setIsOpen} />}
    </CustomDialog>
  );
};

const workerPermSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  permission: z.enum(["사업소장", "근무자"]),
  basicPerm: z.number().int().nonnegative(),
  machinePerm: z.number().int().nonnegative(),
  electricPerm: z.number().int().nonnegative(),
  firePerm: z.number().int().nonnegative(),
  buildingPerm: z.number().int().nonnegative(),
  networkPerm: z.number().int().nonnegative(),
  beautyPerm: z.number().int().nonnegative(),
  securityPerm: z.number().int().nonnegative(),
  userPerm: z.number().int().nonnegative(),
  vocPerm: z.number().int().nonnegative(),
});

type workerPermFormType = z.infer<typeof workerPermSchema>;

const WorkerPermForm = ({
  onClose,
}: {
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { postCreateWorkerPermission } = useWorkerPermissionStore();
  const form = useForm<workerPermFormType>({
    resolver: zodResolver(workerPermSchema),
    defaultValues: {
      name: "",
      permission: undefined,
      basicPerm: 0,
      machinePerm: 0,
      electricPerm: 0,
      firePerm: 0,
      buildingPerm: 0,
      networkPerm: 0,
      beautyPerm: 0,
      securityPerm: 0,
      userPerm: 0,
      vocPerm: 0,
    },
  });

  const handleSubmit = (values: workerPermFormType) => {
    postCreateWorkerPermission(values as CreateWorkerPermission);
    if (onClose) onClose(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-between flex-1 gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <TextFormItem label="권한명" placeholder="권한명" field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <SelectFormItem
              label="직급"
              placeholder="권한을 선택하세요"
              field={field}
              data={WorkerPermissionSelectData}
            />
          )}
        />
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-semibold text-[var(--description-value-color)]">
              권한
            </h3>
            <div className="flex gap-8 text-sm text-gray-600">
              <span className="text-sm w-8 text-[var(--description-value-color)]">
                읽기
              </span>
              <span className="text-sm w-8 text-[var(--description-value-color)]">
                쓰기
              </span>
            </div>
          </div>

          <div className="grid gap-x-4 gap-y-6">
            <FormField
              control={form.control}
              name="basicPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="기본"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="machinePerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="기계"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="electricPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="전기"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="firePerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="소방"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="buildingPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="건축"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="networkPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="통신"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="beautyPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="미화"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="securityPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="보안"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="userPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="직원"
                  field={field}
                  showLabels={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="vocPerm"
              render={({ field }) => (
                <DualSwitchFormItem
                  label="민원"
                  field={field}
                  showLabels={false}
                />
              )}
            />
          </div>
        </div>
        {/* <div className="grid  gap-x-4 gap-y-8">
          <FormField
            control={form.control}
            name="basicPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="기본"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="machinePerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="기계"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="electricPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="전기"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="firePerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="소방"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="buildingPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="건축"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="networkPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="통신"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="beautyPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="미화"
                field={field}
                // orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="securityPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="보안"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="userPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="직원"
                field={field}
                //orientation="vertical"
              />
            )}
          />
          <FormField
            control={form.control}
            name="vocPerm"
            render={({ field }) => (
              <DualSwitchFormItem
                label="민원"
                field={field}
                //orientation="vertical"
              />
            )}
          />
        </div> */}

        <div className="flex justify-between">
          <Button className="w-full text-xs  border bg-[var(--primary-color)] hover:cursor-pointer hover:bg-[var(--primary-hover-color)]">
            생성
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WorkerPerm;
