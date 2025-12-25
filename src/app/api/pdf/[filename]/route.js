import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request, { params }) {
  try {
    // Next.js 16 utilise des params asynchrones
    const { filename } = await params
    
    console.log('DEBUG: filename =', filename)

    // 1. VALIDATION: Rejeter les caractères dangereux
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      console.log('DEBUG: Invalid filename detected:', filename)
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    // 2. WHITELIST: Autoriser uniquement les fichiers PDF
    if (!filename.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files allowed' }, { status: 400 })
    }

    // 3. VALIDATION: Vérifier que le fichier est dans le bon répertoire
    const proceduresDir = path.join(process.cwd(), 'public', 'procedures')
    const filePath = path.join(proceduresDir, filename)

    // 4. SÉCURITÉ: Vérifier que le chemin résolu est bien dans le répertoire autorisé
    const resolvedPath = path.resolve(filePath)
    const resolvedDir = path.resolve(proceduresDir)

    if (!resolvedPath.startsWith(resolvedDir)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // 5. VÉRIFICATION: Le fichier existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 })
    }

    // Lire le fichier PDF
    const fileBuffer = fs.readFileSync(filePath)

    // Créer une réponse avec les bons en-têtes
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600'
      }
    })

    return response
  } catch (error) {
    // NE JAMAIS exposer les détails de l'erreur en production
    console.error('PDF serving error:', error.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
