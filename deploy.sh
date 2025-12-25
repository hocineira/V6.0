#!/bin/bash

# Script de build et déploiement optimisé
# Pour un VPS avec 1GB RAM

echo "🚀 Démarrage du build de production..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Nettoyer le cache
echo "🧹 Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

# Installer les dépendances (si nécessaire)
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm ci --production=false
fi

# Build avec limite mémoire
echo "🔨 Build de production (mode économique mémoire)..."
NODE_OPTIONS="--max-old-space-size=768" npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
    echo ""
    echo "📝 Pour démarrer le serveur :"
    echo "   npm start"
    echo ""
    echo "📝 Pour démarrer avec PM2 :"
    echo "   pm2 start npm --name portfolio -- start"
else
    echo "❌ Erreur lors du build"
    exit 1
fi
