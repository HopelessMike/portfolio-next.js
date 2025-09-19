"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, type PanInfo } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Smartphone, Globe, Target, Film, Bot } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Cinema Constellations — AI Movie Universe",
    description:
      "Galassia 3D dei film: embeddings → costellazioni, insight LLM in streaming.",
    longDescription:
      "Trame e metadati diventano vettori (Sentence-Transformers), proiettati in 3D con UMAP e raggruppati da HDBSCAN per rivelare costellazioni semantiche. L’engine WebGL (Next.js/Three.js) consente un volo fluido tra i titoli mentre un LLM streamma confronti contestuali sui vicini: esplorazione intuitiva, pronta per analisi e demo ad alte prestazioni.",
    tags: [
      "Python", "Pandas", "Sentence-Transformers", "UMAP", "HDBSCAN", "scikit-learn",
      "OpenAI",
      "Next.js", "React"
    ],
    image: "/images/projects/cinema-constellations.png",
    links: {
      demo: "https://michelemiranda.com/cinema-constellations",
      github: "https://github.com/HopelessMike/CinemaConstellation",
    },
    features: [
      "Spazio semantico dei film (embeddings)",
      "UMAP 3D + clustering HDBSCAN",
      "Comparazioni LLM in streaming",
      "Pipeline Python riproducibile",
      "WebGL reattivo e mobile",
    ],
    color: "from-cyan-500/20 to-purple-500/20",
  },
  {
    title: "InsightSuite — Insights in tempo reale con LLM",
    description:
      "Recensioni → insight azionabili: clustering, sentiment e Personas generate da LLM.",
    longDescription:
      "Una pipeline Python estrae segnali (cleaning, sentiment, TF-IDF, embeddings con cache) e organizza migliaia di recensioni con HDBSCAN/PCA; FastAPI espone endpoint serverless e veloci. Un LLM distilla i cluster in sintesi e Personas con fallback sicuro, mentre il frontend Next.js/TypeScript offre filtri millisecond-level e grafici interattivi per decisioni immediate.",
    tags: [
      "Python", "Pandas", "HDBSCAN", "PCA", "TF-IDF",
      "LLM", "Voyage AI",
      "FastAPI", "Serverless Functions",
      "Next.js", "React", "TypeScript", "Tailwind CSS"
    ],
    image: "/images/projects/InsightSuite.png",
    links: {
      demo: "https://michelemiranda.com/InsightSuite",
      github: "https://github.com/HopelessMike/InsightSuite",
    },
    features: [
      "Ricerca/filtri istantanei",
      "Clustering + sentiment pipeline",
      "Personas e riassunti via LLM (fallback sicuro)",
      "Grafici interattivi responsive",
      "Deploy serverless su Vercel",
    ],
    color: "from-emerald-500/20 to-sky-500/20",
  },
  {
    title: "LDR-Iconizer — Symbolic Story AI",
    description:
      "Testo → 3 icone + titolo “system-file”: AI multilingue con JSON blindato.",
    longDescription:
      "Un endpoint Next.js orchestra language-detect e prompt engineering su OpenAI tramite Vercel AI SDK; Zod impone uno schema JSON solido. Un motore ibrido mappa concetti su 120+ Lucide Icons bilanciando letterale/astratto, con streaming, retry e fallback per risultati robusti e una UI dal tocco terminal-vibes.",
    tags: [
      "OpenAI", "Vercel", "Prompt Engineering", "Language Detection",
      "Next.js", "React", "TypeScript"
    ],
    image: "/images/projects/ldr-icons.png",
    links: {
      demo: "https://michelemiranda.com/ldr-icons",
      github: "https://github.com/HopelessMike/LDR_ICONS",
    },
    features: [
      "Prompt multilingue auto-detect",
      "Output JSON con Zod (3 simboli unici)",
      "Mapping intelligente su 120+ icone",
      "Streaming LLM + retry/timeout",
      "UI distopica con feedback audio",
    ],
    color: "from-rose-500/20 to-cyan-500/20",
  },
  {
    title: "Film Fan Finder",
    description:
      "Una piattaforma intelligente di raccomandazione film che aiuta gli utenti a scoprire film basati sulle loro preferenze e cronologia di visualizzazione.",
    longDescription:
      "Film Fan Finder utilizza algoritmi di raccomandazione avanzati per suggerire film su misura per i gusti individuali. La piattaforma analizza i modelli di visualizzazione, le valutazioni e le preferenze per fornire raccomandazioni di film personalizzate con informazioni dettagliate e recensioni.",
    tags: ["React", "Python", "Machine Learning", "API Integration"],
    image: "/images/projects/film-finder.png",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Raccomandazioni AI", "Database Film", "Profili Utente", "Sistema Recensioni"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "AI Automation Consultant",
    description:
      "Una sofisticata piattaforma di automazione alimentata dall'AI che fornisce soluzioni intelligenti per l'ottimizzazione dei processi aziendali e l'automazione del flusso di lavoro.",
    longDescription:
      "Questa piattaforma di automazione AI funge da consulente virtuale, aiutando le aziende a identificare opportunità di automazione e implementare flussi di lavoro intelligenti. Presenta interazione basata su conversazione, raccomandazioni di soluzioni e analisi automatizzata dei processi.",
    tags: ["AI/ML", "Python", "React", "Natural Language Processing"],
    image: "/images/projects/ai-automation.png",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Consulenza AI", "Analisi Processi", "Automazione Flusso di Lavoro", "Raccomandazioni Intelligenti"],
    color: "from-cyan-500/20 to-emerald-500/20",
  },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })
  const controls = useAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    },
    cardVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    },
    itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prevProject()
    } else if (info.offset.x < -threshold) {
      nextProject()
    }
  }

  // 🔧 Icona coerente per progetto: niente più smartphone sul primo
  const getProjectIcon = (index: number) => {
    const title = projects[index]?.title || ""
    if (title.startsWith("Cinema Constellations")) {
      return <Film className="w-5 h-5 text-white" />
    }
    if (title.startsWith("OneSoft")) {
      return <Globe className="w-5 h-5 text-white" />
    }
    if (title.startsWith("HabitFlow")) {
      return <Target className="w-5 h-5 text-white" />
    }
    if (title.startsWith("Film Fan Finder")) {
      return <Film className="w-5 h-5 text-white" />
    }
    if (title.startsWith("AI Automation Consultant")) {
      return <Bot className="w-5 h-5 text-white" />
    }
    return <Globe className="w-5 h-5 text-white" />
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary),0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Progetti <span className="text-gradient">In Evidenza</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Applicazioni reali che mostrano la mia esperienza in AI, automazione e sviluppo full-stack
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="relative" ref={projectsRef}>
          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex absolute top-1/2 -left-12 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={prevProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Progetto precedente"
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={nextProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Progetto successivo"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Project Content with Swipe Support */}
          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="grid md:grid-cols-2 gap-8 items-center project-card"
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 0.95 }}
            >
              <div className="order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                  style={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      {getProjectIcon(activeIndex)}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold">{projects[activeIndex].title}</h3>
                  </div>

                  <motion.p
                    className="text-gray-300"
                    initial={{ height: "auto" }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {projects[activeIndex].longDescription}
                  </motion.p>

                  <div className="flex flex-wrap gap-2">
                    {projects[activeIndex].tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full glass border border-primary/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="text-lg font-medium">Caratteristiche Principali</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {projects[activeIndex].features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-300"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          style={{ opacity: 1 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={projects[activeIndex].links.demo}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass bg-primary/10 hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      Demo Live
                    </motion.a>
                    <motion.a
                      href={projects[activeIndex].links.github}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass hover:bg-card/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      Codice Sorgente
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="gradient-border p-1 rounded-2xl overflow-hidden"
                  style={{ opacity: 1 }}
                >
                  <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${projects[activeIndex].color} p-4`}>
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      transition={{ duration: 0.3 }}
                      className="neomorphic overflow-hidden rounded-lg"
                    >
                      <Image
                        src={projects[activeIndex].image || "/placeholder.svg"}
                        alt={projects[activeIndex].title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary w-6" : "bg-gray-600 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Vai al progetto ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="lg:hidden text-center mt-4">
            <p className="text-sm text-gray-400">Scorri a sinistra o destra per navigare i progetti</p>
          </div>
        </div>

        {/* Mobile Navigation Buttons - Positioned Higher */}
        <div className="lg:hidden flex justify-center mt-6 gap-4">
          <motion.button
            onClick={prevProject}
            className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Progetto precedente"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={nextProject}
            className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Progetto successivo"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Additional projects preview */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {projects
            .filter((_, idx) => idx !== activeIndex)
            .slice(0, 3)
            .map((project, idx) => (
              <motion.div
                key={idx}
                className="neomorphic p-5 rounded-xl hover:bg-card/30 transition-all cursor-pointer project-card"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActiveIndex(projects.findIndex((p) => p.title === project.title))}
              >
                <div className="h-40 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 border border-primary/20">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700">+{project.tags.length - 2}</span>
                  )}
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  )
}
