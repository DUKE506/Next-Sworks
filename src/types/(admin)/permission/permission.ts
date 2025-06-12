export const Permission = {
  매니저: "MANAGER",
  일반: "NORMAL",
};

export const PermissionSelectData = [
  {
    id: 1,
    name: "MANAGER",
  },
  {
    id: 2,
    name: "NORMAL",
  },
];

export type Permission = (typeof Permission)[keyof typeof Permission];
