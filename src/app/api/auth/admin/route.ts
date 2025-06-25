import { setAuthToken } from "@/lib/auth";
import api from "@/middleware/api-manager";
import { User } from "@/types/(user)/user/user";
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
        accessToken: string;
        refreshToken: string;
        user: User;
      }>();

    const response = NextResponse.json({
      success: true,
      user: res.user,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    });

    setAuthToken(response, res.accessToken, res.refreshToken);

    return response;
  } catch (error) {
    //로그인 에러 발생 시
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 일치하지 않습니다." },
      { status: 401 }
    );
  }
}
