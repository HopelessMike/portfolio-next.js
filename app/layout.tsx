import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/app/context/LoadingContext"

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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

//  return (
//    <html lang="it" suppressHydrationWarning>
//      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white`}>
//        <script
//          type="application/ld+json"
//          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//        />
//        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
//          {/* MODIFICA 2: Avvolgiamo i 'children' (cioè tutte le pagine del sito)
//              con il LoadingProvider. La LoadingScreen non viene più inserita qui
//              perché è già gestita all'interno del Provider.
//          */}
//          <LoadingProvider>
//            {children}
//          </LoadingProvider>
//        </ThemeProvider>
//      </body>
//    </html>
//  )
//}
