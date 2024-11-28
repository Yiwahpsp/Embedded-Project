import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;

  // Redirect '/' to '/dashboard'
  if (pathname === '/') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Restrict access to authenticated pages (e.g., '/dashboard', '/log', '/profile')
  // const protectedRoutes = ['/dashboard', '/log', '/profile'];
  // const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // Example: Add authentication logic
  // const isAuthenticated = request.cookies.get('auth-token'); // Replace with your logic
  // if (isProtected && !isAuthenticated) {
  //   url.pathname = '/auth/signin'; // Redirect to Sign In if not authenticated
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next(); // Allow request to proceed
}
