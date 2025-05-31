import { POST } from '@/app/api/auth/login/route';
import { auth } from '@/lib/firebase';
import { adminAuth } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: ResponseInit) => new Response(JSON.stringify(body), init),
  },
}));

// Mock Firebase modules
jest.mock('@/lib/firebase', () => ({
  auth: jest.fn(),
}));

jest.mock('@/lib/firebase-admin', () => ({
  adminAuth: {
    createSessionCookie: jest.fn(),
  },
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ADMIN_EMAILS = 'admin@codemates.com';
  });  it('returns 400 if no request body is provided', async () => {
    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('No request body');
  });

  it('returns 400 if email or password is missing', async () => {
    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@codemates.com' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Missing credentials');
  });

  it('returns 403 if email is not in admin list', async () => {
    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        email: 'user@example.com', 
        password: 'password123' 
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized access');
  });
  it('successfully logs in an admin user', async () => {
    const mockIdToken = 'mock-id-token';
    const mockSessionCookie = 'mock-session-cookie';
    const mockUser = { getIdToken: jest.fn().mockResolvedValue(mockIdToken) };
    
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: mockUser });
    (adminAuth.createSessionCookie as jest.Mock).mockResolvedValue(mockSessionCookie);

    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        email: 'admin@codemates.com', 
        password: 'password123' 
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);

    // Verify Firebase auth was called correctly
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'admin@codemates.com',
      'password123'
    );

    // Verify session cookie was created
    expect(adminAuth.createSessionCookie).toHaveBeenCalledWith(
      mockIdToken,
      expect.any(Object)
    );

    // Verify cookie was set with correct attributes
    const cookieHeader = response.headers.get('Set-Cookie');
    expect(cookieHeader).toContain('session=' + mockSessionCookie);
    expect(cookieHeader).toContain('HttpOnly');
    expect(cookieHeader).toContain('Path=/');
  });

  it('handles Firebase authentication errors', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Invalid password'));

    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        email: 'admin@codemates.com', 
        password: 'wrongpassword' 
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Invalid credentials');
  });

  it('handles internal server errors', async () => {
    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: 'invalid-json',
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Internal server error');
  });
});
