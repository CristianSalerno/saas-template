import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export const middleware: ReturnType<typeof auth> = auth((req) => {
  if (req.auth?.user && req.nextUrl.pathname.includes("/sign-in")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.toString()));
  }

  if (!req.auth && req.nextUrl.pathname.includes("/verify-request")) {
    return NextResponse.next();
  }

  if (!req.auth && !req.nextUrl.pathname.includes("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl.toString()));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const runtime = "experimental-edge";
