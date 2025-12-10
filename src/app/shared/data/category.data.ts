import { CategoryInterface, CategoryInterfaceGraph } from "../interfaces";

export const categoryData: CategoryInterfaceGraph[] = [
  {
    category_name:'frameworks',
    libelle:'FrameWorks',
    background:'linear-gradient(45deg, darkred 30%, crimson)',
    codeClass:'fa-solid fa-laptop-code'
  },
  {
    category_name:'langages_programmation',
    libelle:'Langages de programmation',
    background:'linear-gradient(45deg,rgba(30, 19, 191, 1) 0%, rgba(65, 172, 196, 1) 100%)',
    codeClass:'fa-solid fa-code'
  },
  {
    category_name:'deploiement',
    libelle:'Déploiement',
    background:'linear-gradient(45deg, #c0392b 0%, #f39c12 100%)',
    codeClass:'fa-solid fa-rocket'
  },
    {
    category_name:'base_donnees',
    libelle:'Bases de données',
    background:'linear-gradient(45deg, purple 0%, #8e44ad 100%)',
    codeClass:'fa-solid fa-database'
  },
  {
    category_name:'outils',
    libelle:'Outils',
    background:'linear-gradient(45deg, #1c8a4aff 0%, #16C92B 100%)',
    codeClass:'fa-solid fa-screwdriver-wrench'
  },
  {
    category_name:'servdistr',
    libelle:'Serveurs',
    background:'linear-gradient(45deg, #130f40 0%, #30336b 100%)',
    codeClass:'fa-solid fa-server'
  }
]
