import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const adminKey = process.env.ADMIN_KEY?.trim(); // Secure key from env variable
  const authCookie = req.cookies.get("admin-auth");

  const isAdminRoute = url.pathname.startsWith("/admin");
  const isRestrictedApi = url.pathname.startsWith("/api/books");

  if (isAdminRoute || isRestrictedApi) {
    const authValue = authCookie?.value?.trim();

    // Redirect to login if not authenticated
    if (!authValue || authValue !== adminKey) {
      console.log(
        `[Middleware] Unauthorized access to ${url.pathname}. Redirecting to /login...`
      );
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Allow access if authenticated or not a protected route
  return NextResponse.next();
}
