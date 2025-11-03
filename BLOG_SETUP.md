# Blog System Setup Guide

Ce guide vous explique comment configurer et utiliser le système de blog avec MongoDB, Prisma et authentification par code secret.

## 🚀 Fonctionnalités

- **Blog public** : Affichage des articles avec filtrage par tags
- **Back office sécurisé** : Gestion des articles avec authentification par code secret à 5 chiffres
- **Base de données MongoDB** : Stockage des articles avec Prisma ORM
- **Interface moderne** : Design responsive avec Tailwind CSS
- **API REST** : Endpoints pour la gestion des articles

## 📋 Prérequis

- Node.js 18+ installé
- MongoDB installé et en cours d'exécution (ou MongoDB Atlas)
- npm ou yarn

## 🛠️ Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configuration de l'environnement

Vérifiez le fichier `.env` et modifiez les valeurs selon vos besoins :

```env
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/metoo_blog"

# Blog Admin Configuration
BLOG_SECRET_CODE="12345"
JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
```

**Important** : Changez le `BLOG_SECRET_CODE` et `JWT_SECRET` en production !

### 3. Configuration de la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Synchroniser le schéma avec la base de données
npm run db:push

# (Optionnel) Ajouter des données de test
npm run db:seed
```

### 4. Démarrer l'application

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 📖 Utilisation

### Accès au blog public

Visitez `http://localhost:3000/blog` pour voir les articles publiés.

### Accès au back office

1. Allez sur `http://localhost:3000/admin`
2. Entrez le code secret à 5 chiffres (par défaut : `12345`)
3. Gérez vos articles (créer, modifier, supprimer)

### Gestion des articles

Dans le back office, vous pouvez :

- **Créer** un nouvel article avec titre, extrait, contenu, tags, etc.
- **Modifier** un article existant
- **Supprimer** un article
- **Prévisualiser** le blog public

### Format des articles

Les articles respectent le format suivant :

```typescript
{
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  url?: string
  image?: string
  tags: string[]
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}
```

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Production
npm run build
npm run start

# Base de données
npm run db:generate    # Générer le client Prisma
npm run db:push       # Synchroniser le schéma
npm run db:seed       # Ajouter des données de test
npm run db:studio     # Interface graphique Prisma

# Autres
npm run lint          # Vérification du code
```

## 🔒 Sécurité

- Le code secret est vérifié côté serveur
- Les tokens JWT sont stockés dans des cookies HTTP-only
- Les routes admin sont protégées par middleware
- Validation des données d'entrée

## 🌐 API Endpoints

### Articles (Public)
- `GET /api/articles` - Liste des articles
- `GET /api/articles/[id]` - Article spécifique

### Articles (Admin uniquement)
- `POST /api/articles` - Créer un article
- `PUT /api/articles/[id]` - Modifier un article
- `DELETE /api/articles/[id]` - Supprimer un article

### Authentification
- `POST /api/auth/login` - Connexion avec code secret
- `POST /api/auth/logout` - Déconnexion

## 🚀 Déploiement

### Variables d'environnement en production

```env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/metoo_blog"
BLOG_SECRET_CODE="votre-code-secret-securise"
JWT_SECRET="votre-jwt-secret-tres-long-et-securise"
NODE_ENV="production"
```

### Commandes de déploiement

```bash
npm run build
npm run start
```

## 🐛 Dépannage

### Erreur de connexion MongoDB
- Vérifiez que MongoDB est démarré
- Vérifiez l'URL de connexion dans `.env`
- Testez la connexion avec `npm run db:studio`

### Erreur d'authentification
- Vérifiez le code secret dans `.env`
- Videz les cookies du navigateur
- Vérifiez que JWT_SECRET est défini

### Erreurs Prisma
```bash
# Réinitialiser le client
npm run db:generate

# Forcer la synchronisation
npm run db:push --force-reset
```

## 📝 Notes

- Le système utilise MongoDB avec Prisma ORM
- L'authentification est basée sur un code secret simple (idéal pour un usage personnel)
- Le design est responsive et optimisé pour mobile
- Les articles supportent le Markdown dans le contenu

## 🤝 Support

Pour toute question ou problème, consultez :
- La documentation Prisma : https://www.prisma.io/docs
- La documentation Next.js : https://nextjs.org/docs
- La documentation MongoDB : https://docs.mongodb.com
