import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define route types
  const isAuthRoute = nextUrl.pathname.startsWith("/sign-up");
  const isPublicRoute = nextUrl.pathname === "/";
  const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Redirect unauthenticated users to sign-up
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-up", nextUrl));
  }

  // Allow all other requests
  return NextResponse.next();
});

// Specify which routes should run the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};

