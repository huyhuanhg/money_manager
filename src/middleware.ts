import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.SECRET });

  if (req.url.includes("/login") && session) {
    return NextResponse.redirect(process.env.BASE_URL || "");
  }

  if (!session) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
