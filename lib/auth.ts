import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key-min-32-chars-long!!';
const key = new TextEncoder().encode(secretKey);

export type User = {
  id: number;
  username: string;
  role: string;
};

// In production, you would store these in a secure database
const MOCK_ADMIN_USER = {
  id: 1,
  username: 'admin',
  // This is a hashed version of 'password'
  password: '$2a$10$oiE5.0UoDDRWvx3Qzk4tWOWOi7AOXbUxCz9PeXf5hH8HxLR0xXE7.',
  role: 'admin',
};

interface TokenPayload extends User {
  exp?: number;
  rememberMe?: boolean;
}

async function createToken(payload: Omit<TokenPayload, 'password'>, rememberMe: boolean = false) {
  const exp = rememberMe 
    ? Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 days
    : Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours

  return await new SignJWT({ ...payload, exp, rememberMe })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(key);
}

async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    // Check if token is expired
    const exp = payload.exp as number;
    if (Date.now() >= exp * 1000) {
      return null;
    }
    return payload as User;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export async function login(username: string, password: string, rememberMe: boolean = false): Promise<Response> {
  try {
    if (username === MOCK_ADMIN_USER.username) {
      const isValidPassword = await bcrypt.compare(password, MOCK_ADMIN_USER.password);
      
      if (isValidPassword) {
        const token = await createToken({
          id: MOCK_ADMIN_USER.id,
          username: MOCK_ADMIN_USER.username,
          role: MOCK_ADMIN_USER.role,
        }, rememberMe);

        const response = NextResponse.json({ success: true });

        response.cookies.set('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 24 hours
        });

        return response;
      }
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function logout(): Promise<Response> {
  try {
    const response = NextResponse.json({ success: true });
    response.cookies.set('token', '', { maxAge: 0 });
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    );
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie?.value) return null;
    return await verifyToken(tokenCookie.value);
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function withAuth(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    try {
      await requireAuth();
      return handler(request);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
  };
}
