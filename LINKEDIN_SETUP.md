# Configuration LinkedIn API

## Étapes pour configurer l'intégration LinkedIn

### 1. Créer une application LinkedIn

1. Allez sur [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Connectez-vous avec votre compte LinkedIn
3. Cliquez sur "Create App"
4. Remplissez les informations :
   - **App name** : Nom de votre portfolio
   - **LinkedIn Page** : Votre page LinkedIn personnelle
   - **Privacy policy URL** : URL de votre politique de confidentialité
   - **App logo** : Logo de votre application (optionnel)

### 2. Configurer les permissions

Dans l'onglet "Products", demandez l'accès à :
- **Sign In with LinkedIn** (gratuit)
- **Share on LinkedIn** (gratuit)
- **Marketing Developer Platform** (peut nécessiter une approbation)

### 3. Configurer les URLs de redirection

Dans l'onglet "Auth" :
- Ajoutez `http://localhost:3000/api/auth/linkedin/callback` pour le développement
- Ajoutez `https://votre-domaine.com/api/auth/linkedin/callback` pour la production

### 4. Récupérer les clés API

Dans l'onglet "Auth", copiez :
- **Client ID**
- **Client Secret**

### 5. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
cp .env.local.example .env.local
```

Puis modifiez `.env.local` avec vos vraies valeurs :

```env
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=votre_client_id
LINKEDIN_CLIENT_SECRET=votre_client_secret
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback
```

### 6. Tester l'intégration

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur votre site web
3. Cliquez sur "Se connecter" dans la section Articles
4. Autorisez l'application LinkedIn
5. Vos articles devraient apparaître automatiquement

## Limitations importantes

### API LinkedIn v2
- L'API LinkedIn ne permet pas de récupérer tous les posts publics
- Seuls les posts créés via l'API ou certains posts peuvent être récupérés
- Les articles LinkedIn (articles longs) nécessitent des permissions spéciales

### Permissions requises
- `r_liteprofile` : Informations de profil de base
- `r_emailaddress` : Adresse email
- `w_member_social` : Publier du contenu (pour récupérer les posts)

### Solutions alternatives

Si l'API LinkedIn ne fonctionne pas comme attendu :

1. **Export manuel** : Exportez vos articles manuellement et utilisez un fichier JSON
2. **RSS Feed** : Certains profils LinkedIn ont des flux RSS
3. **Web Scraping** : Utilisation d'outils comme Puppeteer (attention aux conditions d'utilisation)
4. **Services tiers** : RapidAPI, Apify, etc.

## Dépannage

### Erreur "Invalid redirect_uri"
- Vérifiez que l'URL de redirection dans LinkedIn correspond exactement à celle dans votre `.env.local`
- Assurez-vous d'inclure le protocole (`http://` ou `https://`)

### Erreur "Invalid client_id"
- Vérifiez que le Client ID est correct dans `.env.local`
- Assurez-vous que l'application LinkedIn est bien configurée

### Pas d'articles récupérés
- L'API LinkedIn v2 a des limitations sur les posts récupérables
- Essayez de créer quelques posts via l'API LinkedIn d'abord
- Vérifiez les permissions de votre application

### Erreur CORS
- Les appels API se font côté serveur (routes API Next.js)
- Pas de problème CORS normalement

## Structure des fichiers créés

```
src/
├── lib/linkedin/
│   ├── config.ts          # Configuration et types
│   ├── auth.ts           # Gestion de l'authentification
│   └── api.ts            # Appels API LinkedIn
├── hooks/
│   └── useLinkedInArticles.ts  # Hook React pour les articles
├── app/api/auth/linkedin/
│   ├── token/route.ts    # Exchange code pour token
│   ├── refresh/route.ts  # Refresh token
│   └── callback/route.ts # Callback OAuth
└── app/api/linkedin/
    └── articles/route.ts # API pour récupérer les articles
```

## Sécurité

- ⚠️ **Ne jamais exposer** le `CLIENT_SECRET` côté client
- ✅ Les tokens sont stockés dans `localStorage` (considérez une solution plus sécurisée pour la production)
- ✅ Les appels API sensibles se font côté serveur
- ✅ Validation des paramètres OAuth (state, etc.)
