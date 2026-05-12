import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (Next.js 16+) — protected route'larni himoya qiladi.
 *
 * localStorage Edge runtime da ishlamaydi.
 * Shuning uchun cookie dan accessToken ni o'qiymiz.
 * Login bo'lganda cookie ham o'rnatiladi (auth.store.ts da setSession).
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    // Qaerdan kelganini saqlaymiz — login bo'lgandan keyin qaytish uchun
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
