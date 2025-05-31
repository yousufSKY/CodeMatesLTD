import { GET } from '@/app/api/auth/check/route';
import { adminAuth } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: ResponseInit) => new Response(JSON.stringify(body), init),
  },
}));

// Mock Firebase Admin module
jest.mock('@/lib/firebase-admin', () => ({
  adminAuth: {
    verifySessionCookie: jest.fn(),
    getUser: jest.fn(),
  },
}));

// Mock Next.js cookies
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('GET /api/auth/check', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns unauthenticated if no session cookie exists', async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => null,
    });

    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.authenticated).toBe(false);
  });

  it('returns authenticated for valid admin session', async () => {
    const mockUser = {
      email: 'admin@codemates.com',
      customClaims: { role: 'admin' },
    };

    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: 'valid-session-cookie' }),
    });

    (adminAuth.verifySessionCookie as jest.Mock).mockResolvedValue({
      uid: 'user123',
    });

    (adminAuth.getUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.authenticated).toBe(true);
    expect(data.user.email).toBe('admin@codemates.com');
    expect(data.user.role).toBe('admin');
  });

  it('returns unauthorized for non-admin user', async () => {
    const mockUser = {
      email: 'user@example.com',
      customClaims: { role: 'user' },
    };

    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: 'valid-session-cookie' }),
    });

    (adminAuth.verifySessionCookie as jest.Mock).mockResolvedValue({
      uid: 'user123',
    });

    (adminAuth.getUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await GET();
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.authenticated).toBe(false);
    expect(data.error).toBe('Unauthorized: Admin access required');
  });

  it('handles session verification errors', async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: 'invalid-session-cookie' }),
    });

    (adminAuth.verifySessionCookie as jest.Mock).mockRejectedValue(
      new Error('Session expired')
    );

    const response = await GET();
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.authenticated).toBe(false);
    expect(data.error).toBe('Unauthorized access');
  });
});
