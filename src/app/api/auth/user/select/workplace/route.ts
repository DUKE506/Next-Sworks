import { setAuthToken } from "@/lib/auth";
import api from "@/middleware/api-manager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { workplaceId } = await req.json();
  const authorization = req.headers.get("Authorization");
  try {
    const res = await api
      .post(`auth/select/workplace`, {
        json: { workplaceId },
        hooks: {
          beforeRequest: [
            (request) => {
              if (authorization) {
                request.headers.set("Authorization", `${authorization}`);
              }
            },
          ],
        },
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
    return NextResponse.json({ error: "사업장 선택 에러" }, { status: 401 });
  }
}
