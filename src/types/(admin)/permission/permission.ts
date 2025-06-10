export const Permission = {
  MANAGER: "매니저",
  NORMAL: "일반",
};

export type Permission = (typeof Permission)[keyof typeof Permission];
