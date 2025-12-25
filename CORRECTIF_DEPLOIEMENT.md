# 🔧 CORRECTIFS APPLIQUÉS - Problème d'Affichage au Déploiement

## 🎯 Problème Initial
**Symptôme** : Seul l'arrière-plan s'affiche lors du déploiement, pas le contenu.

**Cause Identifiée** : Content Security Policy (CSP) trop restrictive bloquant les scripts Next.js.

---

## ✅ Modifications Appliquées

### 1. **next.config.js** - CSP Corrigée
```javascript
// AVANT (Problématique)
script-src 'self' 'wasm-unsafe-eval'  ❌ Trop restrictif

// APRÈS (Corrigé)
script-src 'self' 'unsafe-eval' 'unsafe-inline'  ✅ Compatible Next.js
```

**Changements détaillés** :
- ✅ `script-src` : Ajout de `'unsafe-eval'` et `'unsafe-inline'` (requis par Next.js)
- ✅ `img-src` : Changé en `'self' data: https: blob:` pour supporter toutes les images
- ✅ `connect-src` : Changé en `'self' https:` pour les appels API
- ✅ Suppression de `upgrade-insecure-requests` (peut bloquer en dev)

### 2. **next.config.js** - Mode Standalone
```javascript
output: 'standalone'  // Optimise le build pour production
```

### 3. **Nouveaux Fichiers Créés**

#### `.env.production`
Configuration des variables d'environnement de production.

#### `vercel.json`
Configuration optimisée pour déploiement Vercel avec limite mémoire.

#### `deploy.sh` et `deploy.ps1`
Scripts de build optimisés pour VPS avec 1GB RAM.

#### `GUIDE_DEPLOIEMENT.md`
Instructions complètes de déploiement.

#### `public/diagnostic.html`
Page de test pour diagnostiquer les problèmes.

---

## 🧪 Tests à Effectuer

### Test 1 : Diagnostic HTML
1. Déployez votre site
2. Accédez à `https://votre-domaine.com/diagnostic.html`
3. Vérifiez que tous les tests passent (✅)
4. Ouvrez la console (F12) et cherchez les erreurs

### Test 2 : Build Local
```bash
# Windows PowerShell
.\deploy.ps1

# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Ou manuellement
npm run build
npm start
```

### Test 3 : Console du Navigateur
1. Ouvrez votre site déployé
2. Appuyez sur F12 (DevTools)
3. Onglet "Console"
4. Cherchez les erreurs :
   - ❌ **CSP errors** : "Refused to execute inline script"
   - ❌ **404 errors** : Fichiers manquants
   - ❌ **CORS errors** : Problèmes d'API
   - ✅ **Pas d'erreurs** : Tout va bien !

### Test 4 : Network
1. F12 > Onglet "Network"
2. Rechargez la page
3. Vérifiez que tous les fichiers se chargent (status 200)
4. Cherchez les fichiers qui échouent (status 4xx ou 5xx)

---

## 🚀 Déploiement Recommandé

### Option A : Vercel (Le Plus Simple)
```bash
npm i -g vercel
vercel login
vercel --prod
```
✅ Configuration automatique
✅ CDN global
✅ HTTPS automatique
✅ Preview deployments

### Option B : Netlify
1. Connectez votre repository GitHub
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Installez le plugin `@netlify/plugin-nextjs`

### Option C : VPS Personnel
```bash
# Sur votre VPS
git clone votre-repo
cd votre-repo
npm install
npm run build

# Avec PM2
npm i -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

---

## 🔍 Checklist de Déploiement

Avant de déployer :
- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm start` affiche le site correctement
- [ ] Pas d'erreurs dans la console
- [ ] Les images se chargent
- [ ] La navigation fonctionne
- [ ] Les animations fonctionnent
- [ ] Testé sur mobile

Après déploiement :
- [ ] Site accessible via l'URL
- [ ] Page d'accueil charge correctement
- [ ] `/diagnostic.html` montre tous les tests verts
- [ ] Console du navigateur sans erreur CSP
- [ ] Images et ressources chargent
- [ ] Navigation entre pages fonctionne
- [ ] Performance acceptable (Lighthouse > 80)

---

## 🆘 Dépannage

### Problème : Page toujours blanche

**Solution 1 - Vérifier CSP** :
```bash
# Temporairement, commentez les headers CSP dans next.config.js
# pour tester si c'est bien le problème
```

**Solution 2 - Vérifier les logs** :
```bash
# Vercel
vercel logs

# VPS
pm2 logs portfolio

# Ou
journalctl -u votre-service -f
```

**Solution 3 - Mode Debug** :
Dans `next.config.js`, ajoutez :
```javascript
reactStrictMode: false,
swcMinify: false,
```

### Problème : Erreurs 404

**Cause** : Configuration du serveur web
**Solution** : Ajoutez les rewrites pour SPA

**Nginx** :
```nginx
location / {
    try_files $uri $uri/ @nextjs;
}

location @nextjs {
    proxy_pass http://localhost:3000;
}
```

**Apache** :
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

### Problème : Scripts ne chargent pas

1. Vérifiez la CSP dans la console
2. Vérifiez le MIME type des fichiers JS
3. Vérifiez que les fichiers existent dans `.next/static/`

---

## 📊 Performance Attendue

Après les corrections, vous devriez avoir :

**Lighthouse Scores** :
- Performance : 85-95
- Accessibility : 95-100
- Best Practices : 90-95
- SEO : 95-100

**Temps de Chargement** :
- First Contentful Paint : < 1.5s
- Time to Interactive : < 3s
- Largest Contentful Paint : < 2.5s

---

## 📞 Support

Si le problème persiste après ces corrections :

1. **Collectez les informations** :
   - Screenshot de la console (F12)
   - Screenshot du Network tab
   - Logs du serveur
   - Résultat de `/diagnostic.html`

2. **Vérifiez** :
   - Version de Node.js : `node --version` (doit être >= 18)
   - Version de Next.js dans package.json
   - Configuration du serveur web (nginx/apache)

3. **Tests supplémentaires** :
   ```bash
   # Test build
   npm run build 2>&1 | tee build.log
   
   # Test avec verbose
   NODE_OPTIONS='--trace-warnings' npm start
   ```

---

## 📝 Prochaines Étapes

1. **Testez localement** : `npm run build && npm start`
2. **Vérifiez /diagnostic.html** localement
3. **Déployez** sur votre plateforme
4. **Testez /diagnostic.html** en production
5. **Vérifiez la console** du navigateur
6. **Corrigez** si nécessaire

**Bonne chance ! 🚀**
