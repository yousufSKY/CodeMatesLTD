import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, WritableStream, TransformStream } from 'web-streams-polyfill';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;

// Mock Next.js headers and server API
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
  }),
  headers: jest.fn(),
}));

jest.mock('next/server', () => {
  const MockNextResponse = {
    json: function(body, init = {}) {
      const response = new MockResponse(body, init);
      return {
        ...response,
        cookies: {
          set: (name, value, options = {}) => {
            const cookieValue = Object.entries(options)
              .reduce((acc, [key, val]) => {
                return `${acc}; ${key}=${val}`;
              }, `${name}=${value}`);
            response.headers.set('Set-Cookie', cookieValue);
          }
        }
      };
    }
  };
  return { NextResponse: MockNextResponse };
});

class MockRequest {
  constructor(input, init) {
    this.url = typeof input === 'string' ? new URL(input, 'http://localhost').toString() : input.toString();
    this.method = init?.method || 'GET';
    this.headers = new Headers(init?.headers);
    this._body = init?.body;
    this.body = init?.body ? new ReadableStream({
      start(controller) {
        controller.enqueue(Buffer.from(init.body));
        controller.close();
      }
    }) : null;
  }

  async json() {
    if (!this._body) return undefined;
    return JSON.parse(this._body);
  }
}

class MockHeaders {
  constructor(init) {
    this._headers = new Map();
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers.set(key.toLowerCase(), value);
      });
    }
  }

  get(key) {
    return this._headers.get(key.toLowerCase());
  }

  set(key, value) {
    this._headers.set(key.toLowerCase(), value);
  }
}

global.Request = MockRequest;
global.Headers = MockHeaders;
class MockResponse {
  constructor(body, init = {}) {
    this._body = body;
    this.headers = new MockHeaders(init.headers);
    this.status = init.status || 200;
    this.cookies = {
      set: jest.fn((name, value, options = {}) => {
        this.headers.set('Set-Cookie', `${name}=${value}; ${Object.entries(options)
          .map(([key, val]) => `${key}=${val}`)
          .join('; ')}`);
      })
    };
  }

  json() {
    return Promise.resolve(typeof this._body === 'string' ? JSON.parse(this._body) : this._body);
  }
}

global.Response = jest.fn().mockImplementation((body, init) => new MockResponse(body, init));
