import { setAuthToken } from "@/lib/auth";
import api from "@/middleware/api-manager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { account, password } = await req.json();

  console.log("관리자 로그인 요청");
  //관리자 로그인 요청
  try {
    const res = await api
      .post(`auth/login`, {
        json: { account, password },
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

    setAuthToken(response, res.access_token, res.refresh_token);

    return response;
  } catch (error) {
    //로그인 에러 발생 시
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 일치하지 않습니다." },
      { status: 401 }
    );
  }

  return new NextResponse();
}
