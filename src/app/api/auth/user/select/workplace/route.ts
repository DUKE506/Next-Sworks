import api from "@/middleware/api-manager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { workplaceId } = await req.json();

  try {
    const res = await api
      .post(`auth/select/workplace`, {
        json: { workplaceId },
      })
      .json<{
        access_token: string;
        refresh_token: string;
        user: Record<string, any>;
      }>();

    const response = NextResponse.json({
      success: true,
      user: res.user,
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
    });

    return response;
  } catch (error) {
    //로그인 에러 발생 시
    return NextResponse.json({ error: "사업장 선택에러" }, { status: 401 });
  }
}
