import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const setAuthToken = async (
  res: NextResponse,
  accessToken: string,
  refreshToken: string
) => {
  res.cookies.set("access-token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60, // 15분
    path: "/",
  });

  res.cookies.set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: "/",
  });
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("access-token")?.value;
};

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("refresh-token")?.value;
};

export const removeAuthToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
  cookieStore.delete("refresh-token");
};
