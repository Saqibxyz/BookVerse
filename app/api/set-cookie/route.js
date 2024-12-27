import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

  // Set the cookie server-side
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-auth", password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    path: "/", // Available across the site
    sameSite: "strict",
  });

  return response;
}
