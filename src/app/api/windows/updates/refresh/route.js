import { NextResponse } from 'next/server';
import { rssFetcher } from '../../../../../lib/rss-fetcher.js';
import { storage } from '../../../../../lib/storage.js';
import { logger } from '../../../../../lib/logger.js';
import { rateLimiter } from '../../../../../lib/rate-limiter.js';

export async function POST(request) {
  // Apply strict rate limiting (10 requests per 5 minutes)
  const rateLimitResult = rateLimiter.check(request, { strict: true });
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
    logger.info('🚀 Démarrage mise à jour RSS manuelle...');
    
    // Fetch all RSS feeds
    const allUpdates = await rssFetcher.fetchAllFeeds();
    
    // Store updates in database
    let storedCount = 0;
    for (const updateData of allUpdates) {
      try {
        await storage.saveWindowsUpdate(updateData);
        storedCount++;
      } catch (error) {
        console.error('Erreur stockage update:', error);
        continue;
      }
    }
    
    console.log(`✅ ${storedCount} mises à jour stockées sur ${allUpdates.length} récupérées`);
    
    return NextResponse.json({
      message: 'Mise à jour des flux RSS terminée',
      stored: storedCount,
      total: allUpdates.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur refresh RSS:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la mise à jour des flux RSS',
        details: error.message
      },
      { status: 500 }
    );
  }
}