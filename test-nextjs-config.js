// Test de configuration Next.js
// Exécutez avec : node test-nextjs-config.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration Next.js...\n');

let hasErrors = false;

// 1. Vérifier next.config.js
console.log('1️⃣ Vérification de next.config.js...');
try {
    const config = require('./next.config.js');
    console.log('   ✅ next.config.js trouvé et valide');
    
    if (config.output === 'standalone') {
        console.log('   ✅ Mode standalone activé');
    } else {
        console.log('   ⚠️  Mode standalone non activé');
    }
    
    if (config.images) {
        console.log('   ✅ Configuration images présente');
    }
} catch (error) {
    console.log('   ❌ Erreur dans next.config.js:', error.message);
    hasErrors = true;
}

// 2. Vérifier package.json
console.log('\n2️⃣ Vérification de package.json...');
try {
    const pkg = require('./package.json');
    console.log('   ✅ package.json trouvé');
    
    if (pkg.dependencies && pkg.dependencies.next) {
        console.log(`   ✅ Next.js version: ${pkg.dependencies.next}`);
    } else {
        console.log('   ❌ Next.js non trouvé dans les dépendances');
        hasErrors = true;
    }
    
    if (pkg.scripts && pkg.scripts.build) {
        console.log(`   ✅ Script build: ${pkg.scripts.build}`);
    } else {
        console.log('   ❌ Script build manquant');
        hasErrors = true;
    }
} catch (error) {
    console.log('   ❌ Erreur dans package.json:', error.message);
    hasErrors = true;
}

// 3. Vérifier la structure des dossiers
console.log('\n3️⃣ Vérification de la structure...');
const requiredPaths = [
    'src/app',
    'src/app/layout.js',
    'src/app/page.js',
    'src/components',
    'public'
];

requiredPaths.forEach(pathToCheck => {
    if (fs.existsSync(pathToCheck)) {
        console.log(`   ✅ ${pathToCheck}`);
    } else {
        console.log(`   ❌ ${pathToCheck} manquant`);
        hasErrors = true;
    }
});

// 4. Vérifier les dépendances critiques
console.log('\n4️⃣ Vérification des dépendances critiques...');
const criticalDeps = ['react', 'react-dom', 'next'];
try {
    const pkg = require('./package.json');
    criticalDeps.forEach(dep => {
        if (pkg.dependencies && pkg.dependencies[dep]) {
            console.log(`   ✅ ${dep}: ${pkg.dependencies[dep]}`);
        } else {
            console.log(`   ❌ ${dep} manquant`);
            hasErrors = true;
        }
    });
} catch (error) {
    hasErrors = true;
}

// 5. Vérifier les fichiers de configuration
console.log('\n5️⃣ Vérification des fichiers de configuration...');
const configFiles = [
    { path: 'tailwind.config.js', required: true },
    { path: 'postcss.config.js', required: true },
    { path: '.env.production', required: false },
    { path: 'vercel.json', required: false }
];

configFiles.forEach(file => {
    if (fs.existsSync(file.path)) {
        console.log(`   ✅ ${file.path}`);
    } else {
        if (file.required) {
            console.log(`   ❌ ${file.path} manquant`);
            hasErrors = true;
        } else {
            console.log(`   ⚠️  ${file.path} manquant (optionnel)`);
        }
    }
});

// Résumé
console.log('\n' + '='.repeat(50));
if (hasErrors) {
    console.log('❌ Des erreurs ont été détectées !');
    console.log('Corrigez les erreurs ci-dessus avant de builder.');
    process.exit(1);
} else {
    console.log('✅ Configuration valide !');
    console.log('Vous pouvez lancer : npm run build');
    process.exit(0);
}
