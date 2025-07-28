// File: app/robots.ts

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Questa regola si applica a tutti i bot
      allow: '/',      // Permetti la scansione di tutte le pagine a partire dalla radice
      disallow: '/api/', // Buona pratica: vieta la scansione delle tue cartelle API
    },
    sitemap: 'https://michelemiranda.com/sitemap.xml',
  }
}