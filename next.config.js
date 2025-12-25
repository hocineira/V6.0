/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration stable et optimisée pour Next.js 16
  
  // Output standalone pour déploiement
  output: 'standalone',

  // Optimisations pour VPS 1GB RAM
  experimental: {
    optimizePackageImports: ['lucide-react'],
    cpus: 1,
  },
  
  // Optimisations de build pour faible mémoire
  productionBrowserSourceMaps: false,
  
  // Activer Turbopack explicitement (Next.js 16)
  turbopack: {},

  // Configuration des images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
  },

  // Compression
  compress: true,
  
  // Headers de sécurité renforcés
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // 1. CLICKJACKING: Empêcher l'intégration en iframe non autorisée
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // 2. SNIFFING: Empêcher le MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // 3. XSS: Activer le filtre XSS du navigateur
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // 4. HSTS: Forcer HTTPS (à activer en production)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          // 5. REFERRER: Contrôler les informations de référence
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // 6. PERMISSIONS: Désactiver les APIs dangereuses
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // 7. CSP: Content Security Policy - Compatible avec Next.js
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'"
            ].join('; ')
          }
        ],
      },
      // Cache optimisé pour les images
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Cache pour les APIs
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ],
      },
    ]
  },

  // Configuration de base sécurisée
  poweredByHeader: false,
  generateEtags: false,
  
  // Note: Removed API proxy - using Next.js API routes instead of FastAPI backend
}

module.exports = nextConfig