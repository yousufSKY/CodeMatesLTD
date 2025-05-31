import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Ensure route is dynamically rendered
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { success: false, error: "No request body" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing credentials" },
        { status: 400 }
      );
    }

    // Verify the admin email
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
    if (!adminEmails.includes(email)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
      );
    }

    try {      // First, sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      let idToken = await userCredential.user.getIdToken();// Set admin custom claim if not already set
      const user = await adminAuth.getUser(userCredential.user.uid);
      if (!user.customClaims?.role) {
        await adminAuth.setCustomUserClaims(user.uid, { role: 'admin' });
        // Get a new token with updated claims
        await userCredential.user.getIdToken(true);
        idToken = await userCredential.user.getIdToken();
      }      // Now use the ID token to create a session (15 minutes)
      const expiresIn = 15 * 60 * 1000; // 15 minutes
      const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn
      });

      const response = NextResponse.json({ success: true });
        response.cookies.set('session', sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: expiresIn / 1000, // Convert milliseconds to seconds
        path: '/',
        priority: 'high',
      });

      return response;
    } catch (error: any) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login route error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
