import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

// Ensure route is dynamically rendered
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await signOut(auth);
    
    const response = NextResponse.json({ success: true });
    response.cookies.delete('session');
    
    return response;
  } catch (error) {
    console.error('Logout route error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to logout" },
      { status: 500 }
    );
  }
}
