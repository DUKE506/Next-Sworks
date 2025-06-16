import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useAdminDetailStore } from "@/store/admin/admin-detail-store";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";

export const adminWorkplaceColumns: ColumnDef<Workplace>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const { selectedWorkplace, setSelectWorkplace } = useAdminDetailStore();

      const currentPageData = table
        .getRowModel()
        .rows.map((row) => row.original);
      const allCurrentPageSelected =
        currentPageData.length > 0 &&
        currentPageData.every((workplace) =>
          selectedWorkplace.some((selected) => selected.id === workplace.id)
        );

      return (
        <Checkbox
          className="bg-white data-[state=checked]:bg-[var(--primary-color)] data-[state=checked]:border-[var(--primary-color)]"
          checked={allCurrentPageSelected}
          onCheckedChange={(value) => {
            if (value) {
              // 전체 선택: 현재 페이지의 모든 항목을 store에 추가
              const newSelections = [...selectedWorkplace];
              currentPageData.forEach((workplace) => {
                if (
                  !newSelections.some(
                    (selected) => selected.id === workplace.id
                  )
                ) {
                  newSelections.push(workplace);
                }
              });
              setSelectWorkplace(newSelections);
            } else {
              // 전체 해제: 현재 페이지의 항목들을 store에서 제거
              const filteredSelections = selectedWorkplace.filter(
                (selected) =>
                  !currentPageData.some(
                    (workplace) => workplace.id === selected.id
                  )
              );
              setSelectWorkplace(filteredSelections);
            }

            // TanStack Table의 상태도 업데이트
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      const { selectedWorkplace, setSelectWorkplace } = useAdminDetailStore();
      const workplace = row.original;
      const isSelected = selectedWorkplace.some(
        (selected) => selected.id === workplace.id
      );

      return (
        <Checkbox
          className="data-[state=checked]:bg-[var(--primary-color)] data-[state=checked]:border-[var(--primary-color)]"
          checked={isSelected}
          onCheckedChange={(value) => {
            if (value) {
              // 선택: store에 추가
              setSelectWorkplace([...selectedWorkplace, workplace]);
            } else {
              // 해제: store에서 제거
              const filtered = selectedWorkplace.filter(
                (selected) => selected.id !== workplace.id
              );
              setSelectWorkplace(filtered);
            }

            // TanStack Table의 상태도 업데이트
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      const value = row.original.name;
      const id = row.original.id;

      return <Link href={`/admin/workplace/${id}`}>{value}</Link>;
    },
  },
  {
    accessorKey: "contractNum",
    header: "계약번호",
    cell: ({ row }) => {
      const value = row.original.contractNum;

      return value;
    },
  },
  {
    accessorKey: "contractedAt",
    header: "계약일자",
    cell: ({ row }) => {
      const value = row.original.contractedAt;

      return dayjs(value).format("YYYY-MM-DD");
    },
  },
  {
    accessorKey: "canceledAt",
    header: "해약일자",
    cell: ({ row }) => {
      const value = row.original.expiredAt;

      return value ? dayjs(value).format("YYYY-MM-DD") : null;
    },
  },
  {
    accessorKey: "state",
    header: "상태",
    cell: ({ row }) => {
      const value = row.original.state;
      const bgColor = value
        ? "bg-[var(--primary-light-color)]"
        : "bg-[#ffcbcf7f]";
      const textColor = value
        ? "text-[var(--primary-color)]"
        : "text-[#973250]";

      return (
        <Badge className={`${bgColor} ${textColor} font-bold px-3`}>
          {" "}
          {value ? "계약" : "해약"}
        </Badge>
      );
    },
  },
];
