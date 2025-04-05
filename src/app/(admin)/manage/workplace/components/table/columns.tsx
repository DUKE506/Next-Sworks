import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export type WorkPlace = {
  id: number;
  name: string;
  contractNum: string;
  contractedAt: Date;
  canceledAt: Date | null;
  state: boolean;
};

export const workPlaces: WorkPlace[] = [
  {
    id: 1,
    name: "강남우체국",
    contractNum: "20250404",
    contractedAt: new Date(2025, 4, 4),
    canceledAt: null,
    state: true,
  },
  {
    id: 2,
    name: "서초우체국",
    contractNum: "20240115",
    contractedAt: new Date(2024, 0, 15),
    canceledAt: null,
    state: true,
  },
  {
    id: 3,
    name: "종로우체국",
    contractNum: "20231201",
    contractedAt: new Date(2023, 11, 1),
    canceledAt: new Date(2024, 5, 30),
    state: false,
  },
  {
    id: 4,
    name: "부산중앙우체국",
    contractNum: "20230220",
    contractedAt: new Date(2023, 1, 20),
    canceledAt: null,
    state: true,
  },
  {
    id: 5,
    name: "대구서부우체국",
    contractNum: "20230510",
    contractedAt: new Date(2023, 4, 10),
    canceledAt: new Date(2024, 11, 1),
    state: false,
  },
  {
    id: 6,
    name: "인천국제우체국",
    contractNum: "20220707",
    contractedAt: new Date(2022, 6, 7),
    canceledAt: null,
    state: true,
  },
  {
    id: 7,
    name: "광주동구우체국",
    contractNum: "20240101",
    contractedAt: new Date(2024, 0, 1),
    canceledAt: null,
    state: true,
  },
  {
    id: 8,
    name: "울산남구우체국",
    contractNum: "20200303",
    contractedAt: new Date(2020, 2, 3),
    canceledAt: new Date(2022, 7, 15),
    state: false,
  },
  {
    id: 9,
    name: "수원우체국",
    contractNum: "20210909",
    contractedAt: new Date(2021, 8, 9),
    canceledAt: null,
    state: true,
  },
  {
    id: 10,
    name: "청주흥덕우체국",
    contractNum: "20221225",
    contractedAt: new Date(2022, 11, 25),
    canceledAt: null,
    state: true,
  },
];

export const columns: ColumnDef<WorkPlace>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      const value = row.original.name;

      return value;
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


      return dayjs(value).format('YYYY-MM-DD');
    },
  },
  {
    accessorKey: "canceledAt",
    header: "해약일자",
    cell: ({ row }) => {
      const value = row.original.canceledAt;

      return value ? dayjs(value).format('YYYY-MM-DD') : null;
    },
  },
  {
    accessorKey: "state",
    header: "상태",
    cell: ({ row }) => {
      const value = row.original.state;
      const color = value ? 'bg-blue-500' : 'bg-red-500'

      return <Badge className={`${color}`}>{value ? '계약' : '해약'}</Badge>;
    },
  },
];
