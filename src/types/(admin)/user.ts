/**
 * 관리자 권한 유니온 타입
 * --
 */
export const managerPermission = {
  관리: "MANAGER",
  일반: "NORMAL",
} as const;

export type ManagerPermissionUnion =
  (typeof managerPermission)[keyof typeof managerPermission];
