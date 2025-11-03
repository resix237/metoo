// Articles LinkedIn réalistes basés sur le profil de Marc Fouda
// Mise à jour manuelle recommandée pour refléter les vrais posts

export interface LinkedInArticle {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  url: string
  image?: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  tags: string[]
}

export const linkedInArticles: LinkedInArticle[] = [
  {
    id: 'article-1',
    title: 'Mon parcours de développeur Full Stack : De la théorie à la pratique',
    excerpt: 'Retour sur mon évolution professionnelle et les technologies qui ont marqué mon parcours. De React à Node.js, en passant par TypeScript...',
    content: `Après plusieurs années dans le développement web, je souhaite partager mon expérience et les leçons apprises. 

Mon parcours m'a mené de la découverte des bases du HTML/CSS jusqu'à la maîtrise d'écosystèmes complexes comme React, Node.js et TypeScript. 

Chaque projet a été une opportunité d'apprentissage, que ce soit chez Kayeros Analytics avec des solutions d'analyse de données, ou chez Abyster Consulting avec des applications métier complexes.

Les technologies évoluent rapidement, mais les fondamentaux restent : une architecture solide, du code maintenable, et toujours garder l'utilisateur final en tête.`,
    date: '2024-10-15',
    readTime: '4 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    engagement: {
      likes: 87,
      comments: 12,
      shares: 8
    },
    tags: ['Développement', 'React', 'Node.js', 'Carrière']
  },
  {
    id: 'article-2',
    title: 'L\'importance de l\'architecture dans les projets modernes',
    excerpt: 'Comment une bonne architecture peut faire la différence entre un projet qui réussit et un projet qui échoue. Retour d\'expérience...',
    content: `L'architecture logicielle est souvent négligée dans la précipitation de livrer rapidement. Pourtant, c'est elle qui détermine la scalabilité et la maintenabilité d'un projet.

Dans mes projets récents, j'ai pu constater l'impact d'une architecture bien pensée :
- Séparation claire des responsabilités
- Patterns de design adaptés au contexte
- Tests automatisés intégrés dès le début
- Documentation technique à jour

Ces pratiques, bien qu'elles demandent un investissement initial, permettent d'économiser énormément de temps sur le long terme.`,
    date: '2024-10-08',
    readTime: '3 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    engagement: {
      likes: 64,
      comments: 9,
      shares: 5
    },
    tags: ['Architecture', 'Développement', 'Bonnes pratiques']
  },
  {
    id: 'article-3',
    title: 'TypeScript vs JavaScript : Mon retour d\'expérience après 2 ans',
    excerpt: 'Après avoir migré plusieurs projets vers TypeScript, voici mon analyse objective des avantages et inconvénients...',
    content: `Il y a deux ans, j'ai commencé à intégrer TypeScript dans mes projets. Aujourd'hui, je peux partager un retour d'expérience concret.

**Les avantages :**
- Détection d'erreurs à la compilation
- Meilleure expérience développeur avec l'autocomplétion
- Code plus robuste et maintenable
- Documentation intégrée via les types

**Les défis :**
- Courbe d'apprentissage initiale
- Configuration parfois complexe
- Temps de compilation supplémentaire

**Mon verdict :** TypeScript est devenu indispensable pour mes projets de moyenne et grande envergure. Pour les prototypes rapides, JavaScript reste pertinent.`,
    date: '2024-09-28',
    readTime: '5 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    engagement: {
      likes: 156,
      comments: 23,
      shares: 18
    },
    tags: ['TypeScript', 'JavaScript', 'Développement', 'Retour d\'expérience']
  },
  {
    id: 'article-4',
    title: 'Les tendances du développement web en 2024',
    excerpt: 'Edge computing, IA générative, frameworks meta... Quelles sont les technologies qui vont marquer cette année ?',
    content: `2024 s'annonce comme une année charnière pour le développement web. Voici les tendances que je surveille de près :

**1. L'essor de l'Edge Computing**
Les applications se rapprochent des utilisateurs pour des performances optimales.

**2. L'intégration de l'IA générative**
ChatGPT, GitHub Copilot... L'IA devient un assistant quotidien du développeur.

**3. Les frameworks "meta"**
Next.js, Nuxt, SvelteKit... Les frameworks full-stack gagnent en maturité.

**4. La montée de Rust et Go**
Pour les performances critiques, ces langages gagnent du terrain.

**5. L'importance croissante de l'accessibilité**
Plus qu'une obligation légale, c'est devenu un enjeu business majeur.

Quelles tendances suivez-vous de votre côté ?`,
    date: '2024-09-15',
    readTime: '6 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    engagement: {
      likes: 203,
      comments: 31,
      shares: 27
    },
    tags: ['Tendances', 'Développement web', '2024', 'Innovation']
  },
  {
    id: 'article-5',
    title: 'Comment j\'optimise mes applications React pour la performance',
    excerpt: 'Techniques concrètes pour améliorer les performances de vos applications React. Code splitting, lazy loading, et plus...',
    content: `La performance est cruciale pour l'expérience utilisateur. Voici mes techniques favorites pour optimiser React :

**1. Code Splitting intelligent**
\`\`\`javascript
const LazyComponent = lazy(() => import('./Component'));
\`\`\`

**2. Mémorisation avec useMemo et useCallback**
Éviter les re-rendus inutiles sur les composants coûteux.

**3. Optimisation des images**
Next.js Image component avec lazy loading automatique.

**4. Bundle analysis**
Analyser régulièrement la taille des bundles avec webpack-bundle-analyzer.

**5. Profiling React DevTools**
Identifier les goulots d'étranglement dans le rendu.

Ces optimisations ont permis d'améliorer les Core Web Vitals de 40% sur mes derniers projets.`,
    date: '2024-09-02',
    readTime: '7 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    engagement: {
      likes: 178,
      comments: 19,
      shares: 15
    },
    tags: ['React', 'Performance', 'Optimisation', 'Web Vitals']
  }
]

// Fonction pour obtenir les articles les plus récents
export function getRecentArticles(count: number = 5): LinkedInArticle[] {
  return linkedInArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

// Fonction pour obtenir les articles par tag
export function getArticlesByTag(tag: string): LinkedInArticle[] {
  return linkedInArticles.filter(article => 
    article.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
}

// Fonction pour obtenir un article par ID
export function getArticleById(id: string): LinkedInArticle | undefined {
  return linkedInArticles.find(article => article.id === id)
}
