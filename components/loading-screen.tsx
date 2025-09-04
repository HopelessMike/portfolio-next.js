"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen({ onLoadingComplete = () => {} }: { onLoadingComplete?: () => void }) {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    
    // Non mostrare loading screen per i microfrontends
    const currentPath = window.location.pathname;
    const microfrontendPaths = ['/InsightSuite', '/ldr-icons'];
    const isMicrofrontend = microfrontendPaths.some(path => currentPath.startsWith(path));
    
    if (isMicrofrontend) {
      return false;
    }
    
    return !sessionStorage.getItem("hasVisitedBefore");
  });

  useEffect(() => {
    if (!loading) {
      onLoadingComplete();
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("hasVisitedBefore", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, [loading, onLoadingComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  }

  /** ✨ Effetto particellare – identico a Cinema Constellations */
  const particleVariants = {
    animate: (i: number) => {
      // Funzione per delay deterministico basato sull'indice
      const getSeededDelay = (index: number) => {
        const x = Math.sin(index * 123.456) * 10000;
        const normalizedValue = x - Math.floor(x);
        return normalizedValue * 1.5;
      };

      return {
        y: [0, -80, 0],
        x: [0, 40 * (i % 2 === 0 ? 1 : -1), -40 * (i % 2 === 0 ? 1 : -1), 0],
        opacity: [0, 0.8, 0.8, 0],
        scale: [0.8, 1.2, 0.8],
        transition: {
          duration: 8 + i * 0.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: getSeededDelay(i),
        },
      };
    },
  } as const

  const memoizedParticles = useMemo(() => {
    // Funzione per generare valori deterministici basati sull'indice
    const getSeededValue = (index: number, seed: number, min: number, max: number) => {
      const x = Math.sin(index * seed) * 10000;
      const normalizedValue = x - Math.floor(x);
      return Math.round((min + normalizedValue * (max - min)) * 1000) / 1000;
    };

    return Array.from({ length: 25 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${getSeededValue(i, 12.9898, 6, 15)}px`,
          height: `${getSeededValue(i, 78.233, 6, 15)}px`,
          background: `radial-gradient(circle, ${getSeededValue(i, 43.758, 0, 1) > 0.5 ? "#8b5cf6" : "#06b6d4"} 0%, transparent 70%)`,
          left: `${getSeededValue(i, 37.719, 0, 100)}%`,
          top: `${getSeededValue(i, 95.311, 0, 100)}%`,
          filter: "blur(0.5px)",
        }}
        custom={i}
        variants={particleVariants as any}
        animate="animate"
      />
    ))
  }, [])

  return (
    <AnimatePresence onExitComplete={onLoadingComplete}>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Particelle in movimento */}
          <div className="absolute inset-0 overflow-hidden">
            {memoizedParticles}
          </div>

          {/* ================================================================== */}
          {/* INIZIO BLOCCO DI CODICE CON ANIMAZIONI CORRETTE                    */}
          {/* ================================================================== */}
          <div className="flex flex-col items-center justify-center z-10 relative">
            <motion.div className="mb-6" variants={itemVariants}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
                <Image
                  src="/images/michele-avatar.png"
                  alt="Michele Miranda"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover relative z-10"
                  priority
                />
              </div>
            </motion.div>

            {/* NOME COME BLOCCO UNICO */}
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-8"
              variants={itemVariants}
            >
              Michele Miranda
            </motion.h1>

            {/* BARRA DI PROGRESSO */}
            <motion.div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4" variants={itemVariants}>
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                variants={progressVariants}
              />
            </motion.div>
            
            {/* TESTO FINALE */}
            <motion.div
              className="text-sm text-gray-400"
              variants={itemVariants}
            >
              Initializing AI Automation...
            </motion.div>
          </div>
          {/* ================================================================== */}
          {/* FINE BLOCCO DI CODICE CON ANIMAZIONI CORRETTE                      */}
          {/* ================================================================== */}

        </motion.div>
      )}
    </AnimatePresence>
  )
}
