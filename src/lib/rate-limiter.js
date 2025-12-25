// Rate limiter middleware for API protection
// Prevents brute force attacks and DoS attempts

class RateLimiter {
  constructor() {
    // Store: IP -> { count, resetTime }
    this.requests = new Map();
    
    // Configuration
    this.config = {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100, // Max requests per window
      message: 'Too many requests, please try again later.',
      statusCode: 429,
      
      // Stricter limits for sensitive endpoints
      strict: {
        windowMs: 5 * 60 * 1000, // 5 minutes
        maxRequests: 10,
        message: 'Too many requests to this endpoint, please try again later.'
      }
    };
  }

  // Get client IP from request
  getClientIp(request) {
    // Try various headers in order of preference
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
      return realIp;
    }
    
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    if (cfConnectingIp) {
      return cfConnectingIp;
    }
    
    // Fallback
    return 'unknown';
  }

  // Check if request should be rate limited
  check(request, options = {}) {
    const ip = this.getClientIp(request);
    const now = Date.now();
    
    // Use strict config if specified
    const config = options.strict ? this.config.strict : this.config;
    
    // Get or create rate limit entry
    let entry = this.requests.get(ip);
    
    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      entry = {
        count: 1,
        resetTime: now + config.windowMs
      };
      this.requests.set(ip, entry);
      
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetTime: entry.resetTime
      };
    }
    
    // Increment counter
    entry.count++;
    
    // Check if limit exceeded
    if (entry.count > config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        message: config.message,
        statusCode: config.statusCode
      };
    }
    
    return {
      allowed: true,
      remaining: config.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  // Middleware function for Next.js API routes
  middleware(options = {}) {
    return (request) => {
      const result = this.check(request, options);
      
      if (!result.allowed) {
        return new Response(
          JSON.stringify({ 
            error: result.message,
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
          }),
          {
            status: result.statusCode,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': String(options.strict ? this.config.strict.maxRequests : this.config.maxRequests),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': String(result.resetTime),
              'Retry-After': String(Math.ceil((result.resetTime - Date.now()) / 1000))
            }
          }
        );
      }
      
      return null; // Allow request to proceed
    };
  }

  // Clean up expired entries (call periodically)
  cleanup() {
    const now = Date.now();
    for (const [ip, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(ip);
      }
    }
  }

  // Get current stats for monitoring
  getStats() {
    return {
      totalIps: this.requests.size,
      activeRequests: Array.from(this.requests.values())
        .reduce((sum, entry) => sum + entry.count, 0)
    };
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => rateLimiter.cleanup(), 10 * 60 * 1000);
}
