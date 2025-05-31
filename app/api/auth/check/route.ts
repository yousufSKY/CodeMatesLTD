import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

// Ensure route is dynamically rendered
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    console.log('Auth check - Session cookie:', sessionCookie ? 'present' : 'missing');

    if (!sessionCookie?.value) {
      return NextResponse.json({ 
        authenticated: false 
      });
    }

    // Verify session
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie.value, true);
    
    // Check session age (15 minutes)
    const sessionAge = Date.now() - decodedClaims.iat * 1000; // Convert seconds to milliseconds
    if (sessionAge > 15 * 60 * 1000) {
      const response = NextResponse.json({ 
        authenticated: false,
        error: "Session expired" 
      }, { status: 401 });
      response.cookies.delete('session');
      return response;
    }
    
    // Force a fresh user fetch to get latest claims
    const user = await adminAuth.getUser(decodedClaims.uid);
    console.log('Auth check - Claims:', {
      sessionClaims: decodedClaims,
      userCustomClaims: user.customClaims,
      sessionAge: Math.round(sessionAge / 1000) + 's'
    });

    // Double check both session claims and user claims
    const isAdmin = decodedClaims.role === 'admin' || user.customClaims?.role === 'admin';

    if (!isAdmin) {
      return NextResponse.json({ 
        authenticated: false,
        error: "Unauthorized: Admin access required" 
      }, { status: 403 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: user.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      authenticated: false,
      error: "Unauthorized access" 
    }, { status: 401 });
  }
}
