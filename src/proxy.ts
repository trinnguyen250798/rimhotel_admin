import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các path không cần login
const publicPaths = ["/signin", "/signup", "/error-404"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // Chưa login mà vào trang cần login → redirect về signin
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Đã login mà vào trang auth → redirect về home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match tất cả các path trừ:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, images, svg...
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};