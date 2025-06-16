import { Badge } from "@/components/ui/badge";
import { Building } from "@/types/(user)/building/building";
import { Voc, VocStatus } from "@/types/(user)/voc/voc";
import { ColumnDef } from "@tanstack/react-table";
import { id } from "date-fns/locale";
import dayjs from "dayjs";
import { CheckCircle, CheckCircle2, Clock, Loader } from "lucide-react";

export const vocColumns: ColumnDef<Voc>[] = [
  {
    accessorKey: "channel",
    header: "구분",
    cell: ({ row }) => {
      return row.original.channel;
    },
  },
  {
    accessorKey: "building",
    header: "위치",
    cell: ({ row }) => {
      return row.original.building!.name;
    },
  },
  {
    accessorKey: "type",
    header: "유형",
    cell: ({ row }) => {
      return row.original.type;
    },
  },
  {
    accessorKey: "complainant",
    header: "작성자",
    cell: ({ row }) => {
      return row.original.complainant;
    },
  },
  {
    accessorKey: "phone",
    header: "연락처",
    cell: ({ row }) => {
      return row.original.phone;
    },
  },
  {
    accessorKey: "title",
    header: "제목",
    cell: ({ row }) => {
      return row.original.title;
    },
  },
  {
    accessorKey: "createdAt",
    header: "발생일시",
    cell: ({ row }) => {
      return dayjs(row.original.createdAt).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    accessorKey: "completedAt",
    header: "처리일시",
    cell: ({ row }) => {
      return row.original.completedAt
        ? dayjs(row.original.completedAt).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
  },
  {
    accessorKey: "processTime",
    header: "처리소요시간",
    cell: ({ row }) => {
      return row.original.processTime;
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case VocStatus.PENDING:
          return (
            <Badge className="w-20 bg-gray-100 text-gray-500 rounded-sm">
              <Clock />
              {status}
            </Badge>
          );
        case VocStatus.INPROGRESS:
          return (
            <Badge className="w-20 bg-green-500 rounded-sm">
              <Loader />
              {status}
            </Badge>
          );
        case VocStatus.COMPLETED:
          return (
            <Badge className="w-20 bg-blue-500 rounded-sm">
              <CheckCircle />
              {status}
            </Badge>
          );
      }
      return row.original.status;
    },
  },
];

// 목업 데이터 생성
export const mockVocList: Voc[] = [
  new Voc({
    id: 1,
    building: new Building({
      id: 1,
      name: "본관",
      address: "주소",
      tel: "0152185",
      usage: "",
      constructionCo: "현대",
    }),
    channel: "모바일",
    type: "기계",
    status: "미처리",
    complainant: "홍길동",
    phone: "010-1234-5678",
    title: "에어컨 고장",
    contents: "회의실 에어컨이 작동하지 않습니다.",
    createdAt: new Date("2024-05-01T10:00:00"),
    completedAt: null,
    processTime: "",
  }),
  new Voc({
    id: 2,
    building: new Building({
      id: 1,
      name: "본관",
      address: "주소",
      tel: "0152185",
      usage: "",
      constructionCo: "현대",
    }),
    channel: "수기입력",
    type: "전기",
    status: "처리중",
    complainant: "김영희",
    phone: "010-9876-5432",
    title: "조명 깜빡임",
    contents: "복도 조명이 깜빡이고 있습니다.",
    createdAt: new Date("2024-05-02T14:30:00"),
    completedAt: null,
    processTime: "",
  }),
  new Voc({
    id: 3,
    building: new Building({
      id: 1,
      name: "본관",
      address: "주소",
      tel: "0152185",
      usage: "",
      constructionCo: "현대",
    }),
    channel: "모바일",
    type: "승강",
    status: "처리완료",
    complainant: "이철수",
    phone: "010-5555-5555",
    title: "엘리베이터 멈춤",
    contents: "3층에서 엘리베이터가 멈췄습니다.",
    createdAt: new Date("2024-05-03T09:20:00"),
    completedAt: new Date("2024-05-03T10:00:00"),
    processTime: "40분",
  }),
];
