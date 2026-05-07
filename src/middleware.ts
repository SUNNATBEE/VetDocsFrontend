import { NextResponse } from "next/server";

export function middleware() {
  // TODO: /admin va /profile route'lar uchun auth va role tekshiruvini qo'shing.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
