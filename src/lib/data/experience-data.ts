export interface Technology {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  description: string;
  missions?: string;
  technologies: Technology[];
  link?: string;
status?: string;
period?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string;
  location?: string;
  color: string;
  logo?: string;
  projects: Project[];
}

export const experiences: Experience[] = [
  {
    id: "Credit foncier du Cameroun",
    company: "Credit foncier du Cameroun",
    position: "Ingénieur Logiciel",
    period: "06/2025 - Aujourd'hui",
    startDate: "06/2025",
    endDate: "Aujourd'hui",
    color: "violet",
    logo: "/img/CFC.png",
    projects: [
      {
        name: "Convertisseur SYSTAC 2",
       
        description: "Développement du convertisseur SYSTAC 2 pour le nouveau système de compensation de la BEAC ,Conception et développement d'un système de conversion pour migrer vers le nouveau système de compensation bancaire de la Banque des États de l'Afrique Centrale (BEAC).",
        technologies: [
          { name: "Python", color: "bg-orange-500/20 text-orange-300" },
          { name: "Django rest framework", color: "bg-green-500/20 text-green-300" },
          { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-300" },
          { name: "REST API", color: "bg-purple-500/20 text-purple-300" },
    
        ],
        status: "En cours",
        period: "04/2024 - Aujourd'hui"
      },
      {
     
        name: "Architecture Big Data CFC",
        description: "Mise en place de l'architecture Big Data du Crédit Foncier du Cameroun, Conception et implémentation d'une architecture Big Data moderne pour optimiser le traitement et l'analyse des données bancaires du CFC.",
        technologies: [
          { name: "Apache Spark", color: "bg-orange-500/20 text-orange-300" },
          { name: "Hadoop", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Kafka", color: "bg-red-500/20 text-red-300" },
          { name: "Elasticsearch", color: "bg-blue-500/20 text-blue-300" },
          { name: "Python", color: "bg-green-500/20 text-green-300" },
          { name: "Scala", color: "bg-purple-500/20 text-purple-300" }
        ],
        status: "En cours",
        period: "04/2024 - Aujourd'hui"
      }
    ]
  },
  {
    id: "kayeros",
    company: "Kayeros Analytics",
    position: "Ingénieur Logiciel",
    period: "04/2024 - 06/2025",
    startDate: "04/2024",
    endDate: "06/2025",
    color: "violet",
    logo: "/img/kaeyros.jpeg",
    projects: [
      {
        name: "PAMJ - Gestion de Conférence Scientifique",
        description: "Développement et mise en place d'une solution de gestion et de management de conférence scientifique.",
        missions: "Conception et développement de l'interface utilisateur, intégration des API backend, création de composants réutilisables, optimisation des performances, gestion des états, tests unitaires et fonctionnels.",
        technologies: [
          { name: "Next.js", color: "bg-blue-500/20 text-blue-300" },
          { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" },
          { name: "TypeScript", color: "bg-blue-600/20 text-blue-400" },
          { name: "REST", color: "bg-green-500/20 text-green-300" },
          { name: "JWT", color: "bg-orange-500/20 text-orange-300" },
          { name: "Docker", color: "bg-blue-400/20 text-blue-200" },
          { name: "Figma", color: "bg-purple-500/20 text-purple-300" }
        ],
        link: "https://sandboxfr-pamj.kaeyros.org/en"
      },
      {
        name: "SEMA - Solution CRM WhatsApp",
        description: "Développement d'une solution CRM pour centraliser et optimiser les communications client via WhatsApp.",
        missions: "Conception et développement de l'interface utilisateur, intégration des API backend, automatisation des réponses, suivi des conversations et collaboration interne.",
        technologies: [
          { name: "Next.js", color: "bg-blue-500/20 text-blue-300" },
          { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" },
          { name: "TypeScript", color: "bg-blue-600/20 text-blue-400" },
          { name: "REST", color: "bg-green-500/20 text-green-300" },
          { name: "JWT", color: "bg-orange-500/20 text-orange-300" },
          { name: "Docker", color: "bg-blue-400/20 text-blue-200" }
        ],
        link: "https://sem-a.com/en"
      },
      {
        name: "Nullpluseinsfestival - Gestion de Festival",
        description: "Application de gestion du festival allemand Null Plus Eins avec refonte complète et maintenance.",
        missions: "Maintenance de l'application existante, refonte complète de l'interface utilisateur, amélioration de l'UX/UI et intégration de nouvelles fonctionnalités.",
        technologies: [
          { name: "Next.js", color: "bg-blue-500/20 text-blue-300" },
          { name: "TypeScript", color: "bg-blue-600/20 text-blue-400" },
          { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" }
        ],
        link: "https://nullpluseinsfestival.de"
      }
    ]
  },
  {
    id: "abyster",
    company: "Abyster Consulting",
    position: "Ingénieur Logiciel",
    period: "04/2023 - 04/2024",
    startDate: "04/2023",
    endDate: "04/2024",
    color: "blue",
    logo: "/img/abyster.png",
    projects: [
      {
        name: "eMpata - Plateforme FinTech",
        description: "Refonte d'une plateforme web et USSD de gestion des transactions financières avec intégration Mobile Money pour tous les opérateurs de téléphonie en RDC.",
        missions: "Analyse et conception, réalisation de la refonte de l'application web, développement des services REST, tests, déploiement via Docker, configuration SSL, chef de projet.",
        technologies: [
          { name: "React.js", color: "bg-blue-500/20 text-blue-300" },
          { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" },
          { name: "TypeScript", color: "bg-blue-600/20 text-blue-400" },
          { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
          { name: "Docker", color: "bg-blue-400/20 text-blue-200" },
          { name: "REST", color: "bg-green-500/20 text-green-300" }
        ]
      },
      {
        name: "Laboratoire - ERP Médical",
        description: "Développement d'un ERP spécialisé pour la gestion d'un laboratoire médical en République Démocratique du Congo.",
        missions: "Analyste-concepteur, création de maquettes Figma, développement des interfaces utilisateur React.js, tests des composants, déploiement Docker, configuration SSL.",
        technologies: [
          { name: "React.js", color: "bg-blue-500/20 text-blue-300" },
          { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" },
          { name: "TypeScript", color: "bg-blue-600/20 text-blue-400" },
          { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
          { name: "Figma", color: "bg-purple-500/20 text-purple-300" }
        ]
      },
      {
        name: "Bacloo - CRM Location",
        description: "Solution complète web et mobile pour la gestion de location d'engins et véhicules en France.",
        missions: "Analyste-concepteur, maquettes Figma, développement React Native, tests, déploiement Docker avec Jenkins, configuration SSL, gestion de projet.",
        technologies: [
          { name: "React Native", color: "bg-blue-500/20 text-blue-300" },
          { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" },
          { name: "TypeScript", color: "bg-blue-600/20 text-blue-400" },
          { name: "Symfony 6", color: "bg-gray-500/20 text-gray-300" },
          { name: "PHP", color: "bg-purple-600/20 text-purple-300" }
        ]
      }
    ]
  },
  {
    id: "ofty",
    company: "OFTY Cameroun",
    position: "Ingénieur Logiciel",
    period: "08/2021 - 04/2023",
    startDate: "08/2021",
    endDate: "04/2023",
    color: "green",
    logo: "/img/ofty.png",
    projects: [
      {
        name: "Andaal - Application Mobile",
        description: "Application mobile de vente de fournitures scolaires et d'œuvres littéraires.",
        missions: "Analyse et conception, création base de données, développement backend API REST Django, développement des services REST, tests, déploiement, configuration SSL, conception maquettes UI, développement fonctions de paiement.",
        technologies: [
          { name: "Flutter", color: "bg-blue-400/20 text-blue-200" },
          { name: "Django REST", color: "bg-green-600/20 text-green-300" },
          { name: "Python", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
          { name: "JWT", color: "bg-orange-500/20 text-orange-300" }
        ]
      },
      {
        name: "The Pépin - Plateforme Scientifique",
        description: "Plateforme de publication d'articles, mémoires et thèses scientifiques dans la zone africaine.",
        missions: "Analyse et conception, développement backend et frontend, développement fonctionnalités Django REST framework, tests d'intégration GitLab, construction projets efficaces, développement écrans interaction utilisateur Figma, déploiement AWS.",
        technologies: [
          { name: "React.js", color: "bg-blue-500/20 text-blue-300" },
          { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" },
          { name: "Django REST", color: "bg-green-600/20 text-green-300" },
          { name: "Python", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "AWS", color: "bg-orange-600/20 text-orange-300" }
        ]
      },
      {
        name: "OFTY Website",
        description: "Site web présentant l'intégralité de l'entreprise avec blog intégré pour les actualités.",
        missions: "Analyse et conception, développement module d'accès aux données, développement Dashboard d'administration, développement services web REST, déploiement Contabo.",
        technologies: [
          { name: "React.js", color: "bg-blue-500/20 text-blue-300" },
          { name: "Django REST", color: "bg-green-600/20 text-green-300" },
          { name: "Python", color: "bg-yellow-500/20 text-yellow-300" }
        ]
      }
    ]
  },
  {
    id: "others",
    company: "Autres Expériences",
    position: "Ingénieur Logiciel",
    period: "2020 - 2021",
    startDate: "06/2020",
    endDate: "06/2021",
    color: "gray",
    logo: "/img/autres.jpeg",
    projects: [
      {
        name: "HDK Website",
        description: "Conception et développement du site Web avec méthodologie Agile Scrum et fonctionnalité de réservation de technicien.",
        missions: "Analyse et conception, développement module d'accès aux données, développement Dashboard d'administration et de réservation, développement services web REST, déploiement OVH.",
        technologies: [
          { name: "Django", color: "bg-green-600/20 text-green-300" },
          { name: "Python", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "JavaScript", color: "bg-yellow-400/20 text-yellow-200" },
          { name: "Bootstrap", color: "bg-purple-600/20 text-purple-300" }
        ]
      },
      {
        name: "IRAD - Application d'Archivage",
        description: "Développement d'application de gestion d'archives et migration de données existantes dans une nouvelle base de données.",
        missions: "Analyse et conception, développement module d'accès aux données, développement Dashboard d'administration, développement services web REST, déploiement réseau local.",
        technologies: [
          { name: "Django", color: "bg-green-600/20 text-green-300" },
          { name: "Python", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "MySQL", color: "bg-orange-500/20 text-orange-300" }
        ]
      }
    ]
  }
];

export const education = [
  {
    degree: "Master",
    institution: "Institut Saint Jean",
    period: "2022 - 2024"
  },
  {
    degree: "License - Génie Logiciel",
    institution: "Université de Yaoundé I",
    period: "2017 - 2020"
  }
];

export const certifications = [
  { name: "Certification Kubernetes", provider: "Udemy", year: "2023" },
  { name: "Certification Docker", provider: "Udemy", year: "2023" },
  { name: "Certification React Native", provider: "Udemy", year: "2023" },
  { name: "Certification React/js Redux", provider: "Udemy", year: "2022" }
];

export const skills = {
  methodologies: ["UML", "SCRUM"],
  frontend: ["Angular", "Tailwind CSS", "React/js", "Next/js", "TypeScript"],
  backend: ["Django", "Python", "Nest.js", "Express.js"],
  mobile: ["React Native"],
  databases: ["MySQL", "PostgreSQL", "SQLite3", "MongoDB", "Neo4j"],
  cloud: ["Amazon Web Services", "Heroku", "Docker", "Kubernetes"],
  servers: ["Apache", "Nginx"],
  os: ["Windows", "GNU Linux"],
  tools: ["Android Studio", "VS Code", "Git", "Bitbucket", "GitLab", "Trello", "Jenkins", "Jira"]
};

export const languages = [
  { language: "Français", level: "Langue maternelle" },
  { language: "Anglais", level: "Niveau intermédiaire" }
];
