// hero-section-new.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Calendar, Sparkles } from "lucide-react"
import Image from "next/image"

export default function HeroSectionNew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Effect - Desktop Only */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 100, 0.1) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div style={{ opacity, scale, y }} className="container mx-auto px-4 lg:pl-20 relative z-10">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-4 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-primary font-medium text-xs">👋 Ciao, sono Michele Miranda</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-heading font-bold leading-tight"
          >
            <span className="block">PROCESSI LENTI?</span>
            <span className="block text-gradient">FAI LAVORARE L'AI</span>
            <span className="block italic text-secondary">PER TE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-gray-300 max-w-xs leading-relaxed px-2"
          >
            Progetto sistemi di automazione AI che liberano il 
            <span className="text-primary font-medium"> potenziale umano</span> della tua azienda,  
            <span className="text-secondary font-medium"> ottimizzando i processi</span> e
            <span className="text-accent font-medium"> accelerando la crescita</span>.
          </motion.p>



          {/* Mobile Profile Card - Compact with 3D Flip */}
          <div
            className="group w-24 h-24 mx-auto mb-3 rounded-lg overflow-hidden border-2 border-primary/30"
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <Image
                  src="/images/michele-avatar.png"
                  alt="Michele Miranda"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <Image
                  src="/images/michele-avatar-back.png"
                  alt="Michele Miranda Back"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative glass rounded-xl p-4 border border-white/10 max-w-xs">
            <div className="text-center">
              <h3 className="text-base font-bold mb-1">Michele Miranda</h3>
              <p className="text-primary font-medium text-xs mb-2">AI Automation Expert</p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">Disponibile per progetti</span>
              </div>
            </div>
          </div>

          {/* Mobile Stats - Compact */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="glass rounded-lg p-2 border border-white/10 text-center">
              <div className="text-sm font-bold text-primary">4+</div>
              <div className="text-xs text-gray-400">Anni di Esperienza</div>
            </div>
            <div className="glass rounded-lg p-2 border border-white/10 text-center">
              <div className="text-sm font-bold text-secondary">6</div>
              <div className="text-xs text-gray-400">Certificazioni AI & Data</div>
            </div>
            <div className="glass rounded-lg p-2 border border-white/10 text-center">
              <div className="text-sm font-bold text-accent">10+</div>
              <div className="text-xs text-gray-400">Aziende Supportate</div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-primary font-medium">👋 Ciao, sono Michele Miranda</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight">
                <span className="block">PROCESSI LENTI?</span>
                <span className="block text-gradient">FAI LAVORARE L'AI</span>
                <span className="block italic text-secondary">PER TE</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xl text-gray-300 max-w-lg leading-relaxed mb-12"
              >
                Progetto sistemi di automazione AI che liberano il 
                <span className="text-primary font-medium"> potenziale umano</span> della tua azienda,  
                <span className="text-secondary font-medium"> ottimizzando i processi</span> e
                <span className="text-accent font-medium"> accelerando la crescita</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#contact"
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 animate-pulse"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-5 h-5" />
                  Entriamo in Contatto
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Profile & Stats with 3D Flip */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="relative glass rounded-3xl p-8 border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>

                <div
                  className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-primary/30 group"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <Image
                        src="/images/michele-avatar.png"
                        alt="Michele Miranda"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <Image
                        src="/images/michele-avatar-back.png"
                        alt="Michele Miranda Back"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Michele Miranda</h3>
                  <p className="text-primary font-medium mb-4">AI Automation Expert</p>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Disponibile per progetti</span>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                className="absolute -top-4 -left-4 glass rounded-2xl p-4 border border-white/10"
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4+</div>
                  <div className="text-xs text-gray-400">Anni di Esperienza</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 border border-white/10"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">10+</div>
                  <div className="text-xs text-gray-400">Aziende supportate</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-6 glass rounded-2xl p-4 border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">6</div>
                  <div className="text-xs text-gray-400">Certificazioni AI & Data</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

        {/* Scroll Indicator – Positioned to avoid overlap */}
        <motion.div
          className="absolute bottom-4 inset-x-0 flex justify-center lg:bottom-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center text-xs lg:text-sm text-gray-400 hover:text-white transition-colors group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="mb-1 lg:mb-2 group-hover:text-primary transition-colors">
              Scopri di Più
            </span>
            <ArrowDown size={16} className="lg:w-5 lg:h-5 group-hover:text-primary transition-colors" />
          </motion.a>
        </motion.div>
    </section>
  )
}
