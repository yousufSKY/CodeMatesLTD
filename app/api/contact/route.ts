import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      message, 
      projectType, 
      isQuoteRequest,
      company,
      budget,
      timeline,
      description 
    } = body;

    // Validate required fields based on request type
    if (!name || !email || !projectType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (isQuoteRequest && (!company || !budget || !timeline || !description)) {
      return NextResponse.json(
        { error: 'Missing required fields for quote request' },
        { status: 400 }
      );
    }

    if (!isQuoteRequest && !message) {
      return NextResponse.json(
        { error: 'Message is required for contact form' },
        { status: 400 }
      );
    }

    const docRef = await adminDb.collection('inquiries').add({
      name,
      email,
      projectType,
      isQuoteRequest,
      status: 'New',
      createdAt: FieldValue.serverTimestamp(),
      // Add quote-specific fields if it's a quote request
      ...(isQuoteRequest ? {
        company,
        budget,
        timeline,
        description,
      } : {
        message,
      }),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to save inquiry' },
      { status: 500 }
    );
  }
}
