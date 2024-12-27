import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const adminKey = process.env.ADMIN_KEY;

  const authCookie = req.cookies.get("admin-auth");

  if (url.pathname.startsWith("/admin")) {
    const authValue = authCookie?.value?.trim();
    const keyValue = adminKey?.trim();
    if (!authValue || authValue !== keyValue) {
      console.log("Redirecting to login...");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
