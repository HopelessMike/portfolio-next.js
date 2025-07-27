"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen" // Importiamo la loading screen
import FloatingSidebar from "@/components/floating-sidebar"
import HeroSectionNew from "@/components/hero-section-new"
import ServicesSection from "@/components/services-section-visual"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import AIChatSection from "@/components/ai-chat-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ScrollAnimations from "@/components/scroll-animations"
import GlobalBackground from "@/components/global-background"
import SectionIndicators from "@/components/section-indicators"
import { useLoading } from '@/context/LoadingContext';

export default function Home() {
  // Questo stato ora controlla solo se il caricamento iniziale (inclusa l'animazione) è completo.
  const [isReady, setIsReady] = useState(false)

  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      
      {/* La LoadingScreen ora controlla quando setIsReady verrà impostato a true */}
      <LoadingScreen onLoadingComplete={() => setIsReady(true)} />
      
      {/* Il contenuto della pagina viene mostrato solo quando isReady è true */}
      {isReady && (
        <>
          <GlobalBackground />
          <FloatingSidebar />
          <SectionIndicators />
          <HeroSectionNew />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <AIChatSection />
          <ContactSection />
          <Footer />
          <ScrollAnimations />
        </>
      )}
    </main>
  )
}