import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { adminProjects } from '@/lib/db/admin';

// Helper to verify admin session
async function verifyAdmin() {  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie?.value) {
    throw new Error('No session cookie');
  }

  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie.value, true);
  const user = await adminAuth.getUser(decodedClaims.uid);
  
  if (user.customClaims?.role !== 'admin') {
    throw new Error('Not authorized');
  }
}

export async function GET() {  try {
    await verifyAdmin();
    const projects = await adminProjects.getAll();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {  try {
    await verifyAdmin();
    const data = await request.json();
    const projectId = await adminProjects.create(data);
    const project = await adminProjects.get(projectId);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {  try {
    await verifyAdmin();
    const { id, ...data } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    await adminProjects.update(id, data);
    const updatedProject = await adminProjects.get(id);
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {  try {
    await verifyAdmin();
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    await adminProjects.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
