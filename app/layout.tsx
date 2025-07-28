// File: app/layout.tsx (Versione Aggiornata)

import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/client-layout" // Importiamo il nostro nuovo contenitore

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

const siteUrl = "https://michelemiranda.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Michele Miranda | Consulente AI & Data Engineer",
    template: `%s | Michele Miranda`,
  },
  description: "Portfolio di Michele Miranda, Consulente AI e Data Engineer. Sviluppo soluzioni di Intelligenza Artificiale personalizzate, agenti AI e pipeline dati cloud-native per ottimizzare il tuo business.",
  keywords: [
    "Michele Miranda",
    "consulente intelligenza artificiale",
    "AI consultant",
    "data engineer",
    "sviluppatore AI",
    "automazione AI",
    "generative AI",
    "LLM",
    "RAG",
    "pipeline dati",
    "portfolio",
  ],
  authors: [{ name: "Michele Miranda", url: siteUrl }],
  creator: "Michele Miranda",
  publisher: "Michele Miranda",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Michele Miranda | Consulente AI & Data Engineer",
    description: "Sviluppo soluzioni di Intelligenza Artificiale personalizzate per ottimizzare il tuo business.",
    url: siteUrl,
    siteName: "Michele Miranda Portfolio",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Michele Miranda - Consulente AI & Data Engineer",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michele Miranda | Consulente AI & Data Engineer",
    description: "Sviluppo soluzioni di Intelligenza Artificiale personalizzate per ottimizzare il tuo business.",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white`}>
        {/* Ora il layout contiene solo il nostro componente client-side,
            che a sua volta gestisce tutti i provider e il banner. */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}