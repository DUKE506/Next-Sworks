"use client";
import PaginationTable from "@/components/ui/pagination-table/pagination-table";
import React, { useEffect } from "react";
import { mockVocList, vocColumns } from "./_components/table/voc-columns";
import VocFilter from "./_components/voc-filter";
import DataList from "@/components/ui/pagination-table/data-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "../../../../components/ui/custom-dialog/custom-dialog";
import AddVocForm from "./_components/add-voc-form";
import { useVocStore } from "@/store/voc-store";
import { useRouter, useSearchParams } from "next/navigation";
import { Voc } from "@/types/(user)/voc/voc";

const ClientPage = () => {
  const { getAllVocByWorkplaceId, vocs } = useVocStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryString = new URLSearchParams(searchParams);
    getAllVocByWorkplaceId(queryString.toString());
  }, [searchParams]);

  const handleDetailPage = (data: Voc) => {
    router.push(`voc/${data.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <span className="text-xl font-bold">민원</span>
      <VocFilter />
      <div>
        <CustomDialog label="민원등록" title="민원등록" icon={Plus}>
          {({ setOpen }) => <AddVocForm setOpen={setOpen} />}
        </CustomDialog>
      </div>
      <DataList columns={vocColumns} data={vocs} onClick={handleDetailPage} />
    </div>
  );
};

export default ClientPage;
