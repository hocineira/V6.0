# Guide de Déploiement du Portfolio

## 🔧 Corrections Appliquées

### 1. Content Security Policy (CSP)
- ✅ Ajout de `'unsafe-eval'` et `'unsafe-inline'` pour Next.js
- ✅ Modification de `img-src` pour supporter https et blob
- ✅ Modification de `connect-src` pour les API externes
- ✅ Suppression de `upgrade-insecure-requests` qui peut bloquer en développement

### 2. Configuration Next.js
- ✅ Ajout de `output: 'standalone'` pour optimiser le build
- ✅ Configuration production dans `.env.production`

## 📦 Instructions de Déploiement

### Option 1: Vercel (Recommandé)
```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel --prod
```

### Option 2: VPS/Serveur Personnel
```bash
# 1. Build de production
npm run build

# 2. Démarrer le serveur
npm start

# Ou avec PM2 (recommandé)
npm i -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

### Option 3: Netlify
```bash
# 1. Build de production
npm run build

# 2. Configurer netlify.toml (voir ci-dessous)
# 3. Déployer via interface Netlify ou CLI
```

## 📝 Fichiers de Configuration

### netlify.toml (si déploiement Netlify)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### PM2 ecosystem.config.js (si déploiement VPS)
```javascript
module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: './',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

## 🔍 Vérification Post-Déploiement

### Console du Navigateur
Vérifiez qu'il n'y a pas d'erreurs CSP :
1. Ouvrir les DevTools (F12)
2. Onglet Console
3. Chercher les erreurs "Content Security Policy"

### Lighthouse
Testez les performances :
```bash
# Installer lighthouse
npm i -g lighthouse

# Tester votre site
lighthouse https://votre-domaine.com --view
```

## ⚠️ Points de Vigilance

### Erreurs Courantes
1. **Page blanche** : Vérifier CSP dans la console
2. **Styles manquants** : Vérifier que Tailwind est bien buildé
3. **Images cassées** : Vérifier les chemins absolus/relatifs
4. **Erreur 404** : Vérifier la configuration du serveur pour SPA

### Variables d'Environnement
Pensez à configurer dans votre plateforme :
- `NODE_ENV=production`
- `NEXT_PUBLIC_BASE_URL` (votre domaine)

## 🚀 Build Local de Test

Avant de déployer, testez en local :
```bash
# Build de production
npm run build

# Tester le build
npm start

# Ouvrir http://localhost:3000
```

## 📊 Optimisations Appliquées

- ✅ Output standalone pour réduire la taille
- ✅ Source maps désactivées en production
- ✅ Compression activée
- ✅ Cache optimisé pour images
- ✅ Optimisation des imports (lucide-react)
- ✅ Support des appareils faibles mémoire

## 🆘 Dépannage

### Le site ne charge toujours pas ?
1. Vérifier les logs du serveur
2. Tester en mode développement local
3. Désactiver temporairement CSP pour tester
4. Vérifier la configuration du reverse proxy (si applicable)

### Nginx (si VPS)
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📞 Support
Si le problème persiste, vérifier :
- Logs de build
- Console du navigateur
- Erreurs réseau (onglet Network)
