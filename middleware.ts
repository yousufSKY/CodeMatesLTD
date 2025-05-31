import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // Return to /admin/login if there's no session
  if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  // Validate session if exists and on protected route
  if (session && isProtectedRoute(request.nextUrl.pathname)) {
    try {
      const response = await fetch(new URL('/api/auth/check', request.url), {
        headers: {
          Cookie: `session=${session}`,
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        console.error('Session validation failed:', response.status);
        if (response.status === 403) {
          // If unauthorized (not admin), clear session and redirect
          const loginResponse = redirectToLogin(request);
          loginResponse.cookies.delete('session');
          return loginResponse;
        }
        return redirectToLogin(request);
      }

      const data = await response.json();
      if (!data.authenticated || data.user?.role !== 'admin') {
        return redirectToLogin(request);
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Error validating session:', error);
      return redirectToLogin(request);
    }
  }

  // Redirect to dashboard if already logged in and trying to access login page
  if (session && request.nextUrl.pathname === '/admin/login') {
    try {
      const response = await fetch(new URL('/api/auth/check', request.url), {
        headers: {
          Cookie: `session=${session}`
        }
      });

      if (response.ok) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    } catch (error) {
      // Continue to login page if check fails
    }
  }

  return NextResponse.next();
}

function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith('/admin') && pathname !== '/admin/login';
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url));
  response.cookies.delete('session');
  return response;
}

export const config = {
  matcher: '/admin/:path*',
};
