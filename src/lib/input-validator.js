// Input validation utilities for API endpoints
// Prevents injection attacks and ensures data integrity

class InputValidator {
  // Validate filename for path traversal attacks
  static validateFilename(filename) {
    if (!filename || typeof filename !== 'string') {
      return { valid: false, error: 'Filename is required and must be a string' };
    }

    // Check for path traversal patterns
    const dangerousPatterns = [
      /\.\./,           // Parent directory
      /\//,             // Forward slash
      /\\/,             // Backslash
      /:/,              // Colon (Windows drive)
      /\0/,             // Null byte
      /%00/,            // Encoded null byte
      /%2e%2e/i,        // Encoded ..
      /%2f/i,           // Encoded /
      /%5c/i            // Encoded \
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(filename)) {
        return { valid: false, error: 'Invalid filename: contains dangerous characters' };
      }
    }

    // Check length
    if (filename.length > 255) {
      return { valid: false, error: 'Filename too long' };
    }

    // Check for valid characters only (alphanumeric, dash, underscore, dot)
    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
      return { valid: false, error: 'Filename contains invalid characters' };
    }

    return { valid: true };
  }

  // Validate category parameter
  static validateCategory(category) {
    const validCategories = ['particuliers', 'serveur', 'security', 'entreprise', 'all'];
    
    if (!category || typeof category !== 'string') {
      return { valid: false, error: 'Category is required and must be a string' };
    }

    if (!validCategories.includes(category.toLowerCase())) {
      return { valid: false, error: `Invalid category. Must be one of: ${validCategories.join(', ')}` };
    }

    return { valid: true, sanitized: category.toLowerCase() };
  }

  // Validate integer parameter (for pagination, limits, etc.)
  static validateInteger(value, min = 0, max = Number.MAX_SAFE_INTEGER, defaultValue = null) {
    if (value === null || value === undefined) {
      if (defaultValue !== null) {
        return { valid: true, sanitized: defaultValue };
      }
      return { valid: false, error: 'Value is required' };
    }

    const parsed = parseInt(value, 10);
    
    if (isNaN(parsed)) {
      return { valid: false, error: 'Value must be a valid integer' };
    }

    if (parsed < min || parsed > max) {
      return { valid: false, error: `Value must be between ${min} and ${max}` };
    }

    return { valid: true, sanitized: parsed };
  }

  // Validate and sanitize HTML content (prevent XSS)
  static sanitizeHtml(html) {
    if (!html || typeof html !== 'string') {
      return '';
    }

    // Remove all HTML tags
    let sanitized = html.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    sanitized = sanitized
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    // Remove any remaining script-like content
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    
    return sanitized.trim();
  }

  // Validate URL
  static validateUrl(url) {
    if (!url || typeof url !== 'string') {
      return { valid: false, error: 'URL is required and must be a string' };
    }

    try {
      const parsed = new URL(url);
      
      // Only allow HTTP and HTTPS protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return { valid: false, error: 'URL must use HTTP or HTTPS protocol' };
      }

      return { valid: true, sanitized: url };
    } catch (error) {
      return { valid: false, error: 'Invalid URL format' };
    }
  }

  // Validate date string
  static validateDate(dateString) {
    if (!dateString) {
      return { valid: false, error: 'Date is required' };
    }

    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return { valid: false, error: 'Invalid date format' };
    }

    // Check if date is reasonable (not in far future or past)
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    if (date < oneYearAgo || date > oneYearLater) {
      return { valid: false, error: 'Date must be within one year range' };
    }

    return { valid: true, sanitized: date };
  }

  // Validate search query
  static validateSearchQuery(query, maxLength = 200) {
    if (!query || typeof query !== 'string') {
      return { valid: false, error: 'Search query is required and must be a string' };
    }

    if (query.length > maxLength) {
      return { valid: false, error: `Search query must not exceed ${maxLength} characters` };
    }

    // Remove potentially dangerous patterns
    const sanitized = query
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/['";]/g, '') // Remove quotes and semicolons
      .trim();

    if (sanitized.length === 0) {
      return { valid: false, error: 'Search query cannot be empty' };
    }

    return { valid: true, sanitized };
  }

  // Generic object validation
  static validateObject(obj, schema) {
    const errors = [];
    const sanitized = {};

    for (const [key, rules] of Object.entries(schema)) {
      const value = obj[key];

      // Check if required
      if (rules.required && (value === null || value === undefined)) {
        errors.push(`${key} is required`);
        continue;
      }

      // Skip validation if not required and value is missing
      if (!rules.required && (value === null || value === undefined)) {
        continue;
      }

      // Type checking
      if (rules.type && typeof value !== rules.type) {
        errors.push(`${key} must be of type ${rules.type}`);
        continue;
      }

      // Custom validation function
      if (rules.validate && typeof rules.validate === 'function') {
        const result = rules.validate(value);
        if (!result.valid) {
          errors.push(`${key}: ${result.error}`);
          continue;
        }
        sanitized[key] = result.sanitized !== undefined ? result.sanitized : value;
      } else {
        sanitized[key] = value;
      }
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return { valid: true, sanitized };
  }
}

export default InputValidator;
