"use client"

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden lg:px-[120px] xl:px-[160px]">
      <GlobalBackground />
      <FloatingSidebar />
      <SectionIndicators />
      <div className="flex flex-col gap-0">
        <HeroSectionNew />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <AIChatSection />
        <ContactSection />
        <Footer />
      </div>
      <ScrollAnimations />
    </main>
  )
}
