import { auth } from '@/lib/firebase';
import { adminAuth } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test client-side auth connection
    await auth.app.options;

    // Test admin auth connection
    await adminAuth.listUsers(1);

    return NextResponse.json({ 
      status: 'success',
      message: 'Successfully connected to Firebase Authentication' 
    });  } catch (error: any) {
    console.error('Firebase Authentication test failed:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to connect to Firebase Authentication',
      error: error.message || 'Unknown error occurred'
    }, { status: 500 });
  }
}
