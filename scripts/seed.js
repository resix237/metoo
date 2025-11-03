const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const sampleArticles = [
  {
    title: 'Mon parcours de développeur Full Stack : De la théorie à la pratique',
    excerpt: 'Retour sur mon évolution professionnelle et les technologies qui ont marqué mon parcours. De React à Node.js, en passant par TypeScript...',
    content: `Après plusieurs années dans le développement web, je souhaite partager mon expérience et les leçons apprises. 

Mon parcours m'a mené de la découverte des bases du HTML/CSS jusqu'à la maîtrise d'écosystèmes complexes comme React, Node.js et TypeScript. 

Chaque projet a été une opportunité d'apprentissage, que ce soit chez Kayeros Analytics avec des solutions d'analyse de données, ou chez Abyster Consulting avec des applications métier complexes.

Les technologies évoluent rapidement, mais les fondamentaux restent : une architecture solide, du code maintenable, et toujours garder l'utilisateur final en tête.`,
    date: new Date('2024-10-15'),
    readTime: '4 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    tags: ['Développement', 'React', 'Node.js', 'Carrière'],
    engagement: {
      likes: 87,
      comments: 12,
      shares: 8
    }
  },
  {
    title: 'L\'importance de l\'architecture dans les projets modernes',
    excerpt: 'Comment une bonne architecture peut faire la différence entre un projet qui réussit et un projet qui échoue. Retour d\'expérience...',
    content: `L'architecture logicielle est souvent négligée dans la précipitation de livrer rapidement. Pourtant, c'est elle qui détermine la scalabilité et la maintenabilité d'un projet.

Dans mes projets récents, j'ai pu constater l'impact d'une architecture bien pensée :
- Séparation claire des responsabilités
- Patterns de design adaptés au contexte
- Tests automatisés intégrés dès le début
- Documentation technique à jour

Ces pratiques, bien qu'elles demandent un investissement initial, permettent d'économiser énormément de temps sur le long terme.`,
    date: new Date('2024-10-08'),
    readTime: '3 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    tags: ['Architecture', 'Développement', 'Bonnes pratiques'],
    engagement: {
      likes: 64,
      comments: 9,
      shares: 5
    }
  },
  {
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
    date: new Date('2024-09-28'),
    readTime: '5 min',
    url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
    tags: ['TypeScript', 'JavaScript', 'Développement', 'Retour d\'expérience'],
    engagement: {
      likes: 156,
      comments: 23,
      shares: 18
    }
  }
]

async function main() {
  console.log('🌱 Seeding database...')

  try {
    // Clear existing articles
    await prisma.article.deleteMany()
    console.log('✅ Cleared existing articles')

    // Create sample articles
    for (const articleData of sampleArticles) {
      const article = await prisma.article.create({
        data: articleData
      })
      console.log(`✅ Created article: ${article.title}`)
    }

    console.log('🎉 Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
