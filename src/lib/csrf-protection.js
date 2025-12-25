// CSRF Protection for API routes
// Implements token-based CSRF protection for state-changing operations

import { cookies } from 'next/headers';

class CSRFProtection {
  constructor() {
    this.tokenName = 'csrf_token';
    this.headerName = 'x-csrf-token';
    this.cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    };
  }

  // Generate a random CSRF token
  generateToken() {
    const array = new Uint8Array(32);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(array);
    } else {
      // Fallback for environments without crypto
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Get or create CSRF token
  async getToken() {
    const cookieStore = await cookies();
    let token = cookieStore.get(this.tokenName)?.value;
    
    if (!token) {
      token = this.generateToken();
      cookieStore.set(this.tokenName, token, this.cookieOptions);
    }
    
    return token;
  }

  // Validate CSRF token from request
  async validateRequest(request) {
    // Only validate for state-changing methods
    const method = request.method.toUpperCase();
    if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      return { valid: true };
    }

    try {
      const cookieStore = await cookies();
      const cookieToken = cookieStore.get(this.tokenName)?.value;
      const headerToken = request.headers.get(this.headerName);

      // Both tokens must exist
      if (!cookieToken || !headerToken) {
        return {
          valid: false,
          error: 'CSRF token missing',
          statusCode: 403
        };
      }

      // Tokens must match
      if (cookieToken !== headerToken) {
        return {
          valid: false,
          error: 'CSRF token mismatch',
          statusCode: 403
        };
      }

      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: 'CSRF validation failed',
        statusCode: 500
      };
    }
  }

  // Middleware for Next.js API routes
  middleware() {
    return async (request) => {
      const result = await this.validateRequest(request);
      
      if (!result.valid) {
        return new Response(
          JSON.stringify({ 
            error: result.error,
            message: 'CSRF validation failed. Please refresh the page and try again.'
          }),
          {
            status: result.statusCode,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }
      
      return null; // Allow request to proceed
    };
  }

  // Generate response with CSRF token header
  async addTokenToResponse(response) {
    const token = await this.getToken();
    const headers = new Headers(response.headers);
    headers.set(this.headerName, token);
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
}

// Singleton instance
export const csrfProtection = new CSRFProtection();

// Helper function to get CSRF token for client-side use
export async function getCSRFToken() {
  return await csrfProtection.getToken();
}
