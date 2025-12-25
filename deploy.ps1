# Script de build et déploiement optimisé pour Windows
# Pour un VPS avec 1GB RAM

Write-Host "🚀 Démarrage du build de production..." -ForegroundColor Green

# Vérifier Node.js
try {
    node --version | Out-Null
} catch {
    Write-Host "❌ Node.js n'est pas installé" -ForegroundColor Red
    exit 1
}

# Nettoyer le cache
Write-Host "🧹 Nettoyage du cache..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "node_modules\.cache") { Remove-Item -Recurse -Force "node_modules\.cache" }

# Installer les dépendances (si nécessaire)
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm ci --production=false
}

# Build avec limite mémoire
Write-Host "🔨 Build de production (mode économique mémoire)..." -ForegroundColor Yellow
$env:NODE_OPTIONS = "--max-old-space-size=768"
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build réussi !" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Pour démarrer le serveur :" -ForegroundColor Cyan
    Write-Host "   npm start" -ForegroundColor White
    Write-Host ""
    Write-Host "📝 Pour démarrer avec PM2 :" -ForegroundColor Cyan
    Write-Host "   pm2 start npm --name portfolio -- start" -ForegroundColor White
} else {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}
