# 🔧 DÉPANNAGE - Problème Refresh RSS

## Commandes pour Diagnostiquer

### 1. Vérifier les logs PM2
```bash
pm2 logs portfolio --lines 100
```
Cherchez des erreurs comme :
- `Cannot find module 'fast-xml-parser'`
- `rateLimiter is not defined`
- `XMLParser is not a constructor`

### 2. Vérifier que les dépendances sont installées
```bash
npm list fast-xml-parser
npm list postcss
```
Doit afficher :
- `fast-xml-parser@4.5.0`
- `postcss@8.4.49`

### 3. Vérifier le build
```bash
# Supprimer l'ancien build
rm -rf .next

# Rebuild complet
npm run build
```

### 4. Hard restart PM2
```bash
# Arrêter complètement
pm2 stop portfolio
pm2 delete portfolio

# Redémarrer depuis zéro
pm2 start npm --name "portfolio" -- start

# Vérifier le statut
pm2 status
```

### 5. Tester l'API directement
```bash
curl -X POST http://localhost:3000/api/windows/updates/refresh
```

Réponse attendue :
- ✅ `200 OK` avec `{"stored": X, "total": Y}`
- ❌ `429 Too Many Requests` après 10 requêtes (rate limiting)
- ❌ `500 Internal Server Error` = problème de code

---

## Solutions Possibles

### Problème 1: Module manquant
**Symptôme**: `Cannot find module 'fast-xml-parser'`

**Solution**:
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
rm package-lock.json
npm install
npm run build
pm2 restart portfolio
```

### Problème 2: Cache PM2
**Symptôme**: Anciennes erreurs persistent

**Solution**:
```bash
pm2 flush  # Vider les logs
pm2 restart portfolio --update-env
```

### Problème 3: Port déjà utilisé
**Symptôme**: `EADDRINUSE: address already in use`

**Solution**:
```bash
# Trouver le processus
lsof -i :3000  # ou netstat -ano | findstr :3000 sur Windows

# Tuer le processus
kill -9 <PID>

# Redémarrer
pm2 restart portfolio
```

### Problème 4: Permissions fichiers
**Symptôme**: `EACCES: permission denied`

**Solution**:
```bash
# Vérifier propriétaire
ls -la data/

# Corriger si nécessaire
chown -R $USER:$USER data/
chmod 700 data/
chmod 600 data/rss-cache.json
```

---

## Test Rapide

Créez ce fichier `test-refresh.js` :
```javascript
const fetch = require('node-fetch');

async function testRefresh() {
  try {
    console.log('Testing RSS refresh...');
    const res = await fetch('http://localhost:3000/api/windows/updates/refresh', {
      method: 'POST'
    });
    
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Response:', data);
    
    if (res.status === 200) {
      console.log('✅ SUCCESS');
    } else {
      console.log('❌ FAILED');
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testRefresh();
```

Exécutez :
```bash
node test-refresh.js
```

---

## Vérification Complète

```bash
# 1. Logs
pm2 logs portfolio --lines 50

# 2. Processus
pm2 status

# 3. Erreurs Node
pm2 describe portfolio | grep error

# 4. Test API
curl -v -X POST http://localhost:3000/api/windows/updates/refresh

# 5. Vérifier fichiers
ls -la src/lib/rate-limiter.js
ls -la src/lib/rss-fetcher.js
```

---

## Si Rien Ne Fonctionne

**Rollback temporaire** (retirer le rate limiting) :

1. Éditez `src/app/api/windows/updates/refresh/route.js`
2. Commentez les lignes de rate limiting :
```javascript
// const rateLimitResult = rateLimiter.check(request, { strict: true });
// if (!rateLimitResult.allowed) { ... }
```
3. Rebuild et restart :
```bash
npm run build
pm2 restart portfolio
```

---

**Contactez-moi avec** :
- Les logs PM2 (`pm2 logs portfolio --lines 100`)
- Le résultat de `npm list fast-xml-parser`
- L'erreur exacte que vous voyez dans le navigateur (F12 > Console)
