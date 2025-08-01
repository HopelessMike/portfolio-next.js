"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen({ onLoadingComplete = () => {} }: { onLoadingComplete?: () => void }) {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") {
      return true;
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
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Leggermente aggiustato per una sequenza più definita
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
        delay: 0.5, // Leggero ritardo per iniziare dopo l'apparizione del nome
      },
    },
  }

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

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
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: Math.random() > 0.5 ? "#fc52ff" : "#00e1f4",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                variants={particleVariants}
                animate="animate"
                transition={{
                  delay: Math.random() * 2,
                  duration: 2 + Math.random() * 2,
                }}
              />
            ))}
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