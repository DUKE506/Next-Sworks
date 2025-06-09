import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 경로에 확장자가 있으면 `true` 없으면 `null`
  const isFileRequest = pathname.match(/\.\w+$/);

  // 경로에 확장자가 있다면 미들웨어 로직 스킵
  if (isFileRequest) {
    return NextResponse.next();
  }

  // 로그인 페이지는 검사 대상에서 제외
  if (pathname == "/login") return NextResponse.next();

  const accessToken = req.cookies.get("access-token")?.value;
  const refreshToken = req.cookies.get("refresh-token")?.value;

  console.log("==========토큰==========");
  console.log("액세스 토큰 ", accessToken);
  console.log("리프레시 토큰 ", refreshToken);

  // /**
  //  * 관리자 페이지 경우 조건부 로직
  //  */

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // /**
  //  * 일반 페이지 경우 조건부 로직
  //  */
  // if (pathname.startsWith("/")) {
  //   if (!req.cookies.get("auth")) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }
}
