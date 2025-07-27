import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://michelemiranda.com',
      lastModified: new Date(),
      changeFrequency: 'monthly', // o 'yearly' se non lo aggiorni spesso
      priority: 1,
    },
    // Aggiungi qui altre pagine se ne creerai in futuro
    // {
    //   url: 'https://michelemiranda.com/contatti',
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
  ]
}