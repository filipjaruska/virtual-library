import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/lib/services/get-user-me-loader";

// TODO middleware the issue?

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  console.log("User Middleware:", user); //TODO remove
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (currentPath.startsWith("/books") && user.ok === false) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}
