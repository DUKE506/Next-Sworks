import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log(await req.json());
}
