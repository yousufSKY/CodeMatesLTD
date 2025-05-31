import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';

// Helper to verify admin session
async function verifyAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    throw new Error('No session cookie');
  }

  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
  const user = await adminAuth.getUser(decodedClaims.uid);
  
  if (user.customClaims?.role !== 'admin') {
    throw new Error('Not authorized');
  }
}

export async function GET() {
  try {
    await verifyAdmin();
    
    const db = getFirestore();
    const inquiriesRef = db.collection('inquiries');
    const snapshot = await inquiriesRef
      .orderBy('createdAt', 'desc')
      .get();

    const inquiries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    }));

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await verifyAdmin();
    const data = await request.json();
    const db = getFirestore();
    const inquiryRef = await db.collection('inquiries').add({
      ...data,
      createdAt: new Date(),
    });
    const inquiry = await inquiryRef.get();
    return NextResponse.json({ id: inquiry.id, ...inquiry.data() }, { status: 201 });
  } catch (error) {
    console.error('Failed to create inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await verifyAdmin();
    
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const inquiryRef = db.collection('inquiries').doc(id);
    
    // First check if the inquiry exists
    const inquiryDoc = await inquiryRef.get();
    if (!inquiryDoc.exists) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // Update the inquiry with new status and metadata
    await inquiryRef.update({
      status,
      updatedAt: new Date(),
      viewedAt: status === 'Viewed' ? new Date() : null,
    });

    // Get the updated document
    const updatedDoc = await inquiryRef.get();
    const updatedData = updatedDoc.data();

    return NextResponse.json({
      success: true,
      inquiry: {
        id: updatedDoc.id,
        ...updatedData,
        createdAt: updatedData?.createdAt?.toDate().toISOString(),
        updatedAt: updatedData?.updatedAt?.toDate().toISOString(),
        viewedAt: updatedData?.viewedAt?.toDate().toISOString(),
      }
    });
  } catch (error) {
    console.error('Failed to update inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await verifyAdmin();
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    const db = getFirestore();
    await db.collection('inquiries').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
