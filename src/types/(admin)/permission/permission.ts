export const Permission = {
  운영관리자: "운영관리자",
  일반관리자: "일반관리자",
};

export const PermissionSelectData = [
  {
    id: "운영관리자",
    name: "운영관리자",
  },
  {
    id: "일반관리자",
    name: "일반관리자",
  },
];

export type Permission = (typeof Permission)[keyof typeof Permission];
