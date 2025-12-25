import { NextResponse } from 'next/server';
import { storage } from '../../../../lib/storage.js';
import { rateLimiter } from '../../../../lib/rate-limiter.js';
import InputValidator from '../../../../lib/input-validator.js';

export async function GET(request) {
  // Apply rate limiting
  const rateLimitResult = rateLimiter.check(request);
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ 
        error: rateLimitResult.message,
        retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000))
        }
      }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limitParam = searchParams.get('limit') || '50';
    const version = searchParams.get('version');

    // Validate category if provided
    if (category) {
      const categoryValidation = InputValidator.validateCategory(category);
      if (!categoryValidation.valid) {
        return NextResponse.json(
          { error: categoryValidation.error },
          { status: 400 }
        );
      }
    }

    // Validate limit
    const limitValidation = InputValidator.validateInteger(limitParam, 1, 500, 50);
    if (!limitValidation.valid) {
      return NextResponse.json(
        { error: limitValidation.error },
        { status: 400 }
      );
    }
    const limit = limitValidation.sanitized;

    // Get updates from storage
    let updates = await storage.getWindowsUpdates(category, limit);

    // Filter by version if specified
    if (version) {
      updates = updates.filter(update => 
        update.version && version.toLowerCase().includes(update.version.toLowerCase())
      );
    }

    // Convert dates to strings for JSON response
    const formattedUpdates = updates.map(update => ({
      ...update,
      published_date: update.published_date.toISOString(),
      created_at: update.created_at.toISOString(),
      updated_at: update.updated_at.toISOString()
    }));

    return NextResponse.json({
      total: formattedUpdates.length,
      updates: formattedUpdates,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur récupération updates:', error);
    return NextResponse.json(
      { error: 'Erreur récupération des mises à jour' },
      { status: 500 }
    );
  }
}