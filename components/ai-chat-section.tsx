"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react"
import Image from "next/image"

// Predefined chat messages
const initialMessages = [
  {
    role: "assistant",
    content:
      "👋 Ciao! Sono Mike, il tuo assistente virtuale. Chiedimi dell'esperienza lavorativa o delle competenze di Michele!",
  },
]

const experienceResponses = [
  {
    role: "assistant",
    content: `Michele ha oltre 4 anni di esperienza in AI e automazione:

**Data & AI Engineer** presso iConsulting (2023–Presente)  
• Progettato soluzioni GenAI basate su LLM (inclusi RAG e sentiment analysis) per clienti enterprise  
• Architettato pipeline dati cloud-native, garantendo scalabilità, performance e Single Source of Truth  
• Gestito stakeholder cross-funzionali, traducendo esigenze di business in soluzioni tecniche  
• Guidato e formato un team di junior engineer, accelerandone la produttività progettuale  

**Customer Transformation Developer** presso PwC (2021–2023)  
• Automatizzato processi ETL e monitoraggio KPI per campagne marketing su larga scala  
• Sviluppato controlli predittivi per anomalie, migliorando la resilienza operativa  
• Condotto analisi funzionali a contatto diretto con il cliente, facilitando la traduzione tecnica dei requisiti  
• Supportato il team nello scaling delle soluzioni, contribuendo a riduzioni di costo e tempi di delivery  `,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Michele è specializzato in:

**Sviluppo AI** - Costruzione di Agenti e pipeline AI
**Automazione Processi** - Creazione di flussi di lavoro efficienti
**Analisi Dati** - Estrazione di insights azionabili
**AI Vocale** - Sviluppo di interfacce vocali naturali
**Sviluppo Chatbot** - Creazione di esperienze conversazionali

È competente con strumenti come N8N, GPT, Gemini, ElevenLabs e varie piattaforme cloud.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Michele ha costruito diversi progetti innovativi:

**TaskFlow** - App di produttività con gamification
**OneSoft** - Piattaforma aziendale all-in-one
**HabitFlow** - App per il benessere e monitoraggio abitudini
**Film Fan Finder** - Sistema di raccomandazione film AI
**AI Automation Consultant** - Automazione intelligente del flusso di lavoro

Ogni progetto dimostra la sua esperienza nella creazione di soluzioni user-friendly alimentate dall'AI.`,
  },
]

const aiDevelopmentResponses = [
  {
    role: "assistant",
    content: `Ottima scelta! I servizi di sviluppo AI di Michele includono:

**Sviluppo Soluzioni di Generative AI**
**Generative AI & LLM** – Progettazione e sviluppo di soluzioni GenAI personalizzate basate su Large Language Models.
**Agentic AI Development** – Creazione e implementazione di agenti AI autonomi per workflow intelligenti e automatizzati.
**Fine-tuning & Prompt Engineering** – Ottimizzazione delle performance dei modelli attraverso tecniche avanzate di Prompt Engineering e fine-tuning via API.

**Tecnologie e Framework:**
- **Framework:** LangChain, Hugging Face (Transformers, Datasets), Vector DB
- **Modelli Proprietari:** OpenAI GPT, Anthropic Claude, Mistral
- **Modelli Open-source:** Implementazione e personalizzazione di modelli LLM open-source
- **Fine-tuning:** API-based fine-tuning (OpenAI, Cohere), Advanced Prompt Engineering


Vorresti discutere di un progetto AI specifico per la tua azienda?`,
  },
]

const processAutomationResponses = [
  {
    role: "assistant",
    content: `Perfetto! Le soluzioni di automazione processi di Michele coprono:

**Ottimizzazione Flusso di Lavoro** - Processi aziendali ottimizzati
**Integrazione API** - Connessione fluida di sistemi diversi
**Automazione Attività** - Programmazione ed esecuzione automatizzate
**Business Intelligence** - Reporting e analisi automatizzati

**Strumenti e Piattaforme:**
• N8N per workflow automation
• Custom Python automation scripts
• Cloud-based automation solutions

Quali processi specifici stai cercando di automatizzare?`,
  },
]

const dataAnalyticsResponses = [
  {
    role: "assistant",
    content: `Ottima scelta! I servizi di analisi dati di Michele includono:

**Visualizzazione Dati** - Dashboard e report interattivi
**Business Intelligence** - Insights strategici dai tuoi dati
**Metriche Performance** - Monitoraggio e ottimizzazione KPI
**Analisi Real-time** - Elaborazione e monitoraggio dati in tempo reale

**Tecnologie:**
• Python (Pandas, NumPy, Scikit-learn)
• Tableau, Power BI for visualization
• SQL databases and data warehouses
• Apache Spark for big data processing

Che tipo di insights sui dati stai cercando di ottenere?`,
  },
]

const chatbotResponses = [
  {
    role: "assistant",
    content: `Ottima scelta! I servizi di sviluppo chatbot di Michele includono:

**Integrazione Multi-piattaforma** - Deploy su web, mobile e piattaforme di messaggistica
**Integrazione Vocale** - Chatbot abilitati alla voce con riconoscimento vocale
**Fine Tuning e Training Personalizzato** - Adattato alla conoscenza e al tono della tua azienda

**Funzionalità:**
• Integrazione con CRM e sistemi di business
• supporto clienti automatizzato 24/7
• Lead generation
• FAQ automation and knowledge base


Vorresti discutere di un progetto chatbot specifico per la tua azienda?`,
  },
]

const customSoftwareResponses = [
  {
    role: "assistant",
    content: `Eccellente! I servizi di sviluppo software personalizzato di Michele includono:

**Sviluppo API** - Creazione di API RESTful e GraphQL
**Integrazione Sistemi** - Connessione di sistemi e piattaforme esistenti
**Soluzioni Cloud** - Applicazioni cloud-native scalabili
**Design Database** - Architettura e gestione dati efficiente

**Tecnologie:**
• Backend: Python, SQL, MongoDB
• Cloud: Azure, Google Cloud Platform
• DevOps: CI/CD pipelines

Che tipo di soluzione software personalizzata stai cercando di costruire?`,
  },
]

const dataManagementResponses = [
  {
    role: "assistant",
    content: `Eccellente! Le soluzioni di gestione dati di Michele coprono:

**Architettura Database** - Design di database scalabile ed efficiente
**Automazione Pipeline Dati** - Flussi di lavoro di elaborazione dati ottimizzati
**Analisi Real-time** - Elaborazione dati e insights in tempo reale
**Sicurezza Dati** - Sicurezza e conformità di livello enterprise
**Integrazione Cloud** - Soluzioni dati Azure e GCP
**Servizi Migrazione** - Migrazione e modernizzazione dati senza interruzioni

**Capacità:**
• ETL/ELT pipeline development
• Data warehouse design and optimization
• Real-time streaming data processing
• Data governance and quality assurance

Quali sfide specifiche sui dati stai cercando di risolvere?`,
  },
]

// Rich text formatting function
const formatMessage = (content: string) => {
  // Convert **text** to bold
  let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  // Convert bullet points to proper list items
  formatted = formatted.replace(/^• (.+)$/gm, "<li>$1</li>")

  // Wrap consecutive list items in ul tags
  formatted = formatted.replace(/(<li>.*<\/li>\s*)+/gs, "<ul>$&</ul>")

  // Convert line breaks to proper spacing
  formatted = formatted.replace(/\n\n/g, "<br><br>")
  formatted = formatted.replace(/\n/g, "<br>")

  return formatted
}

export default function AIChatSection() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })
  const controls = useAnimation()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Listen for service click events
  useEffect(() => {
    const handleServiceMessage = (event: any) => {
      const { message } = event.detail
      if (message) {
        // Add user message
        const userMessage = { role: "user", content: message }
        setMessages((prev) => [...prev, userMessage])
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
          let response
          const lowercaseMessage = message.toLowerCase()

          if (lowercaseMessage.includes("sviluppo ai")) {
            response = aiDevelopmentResponses[0]
          } else if (lowercaseMessage.includes("automazione processi")) {
            response = processAutomationResponses[0]
          } else if (lowercaseMessage.includes("analisi dati")) {
            response = dataAnalyticsResponses[0]
          } else if (lowercaseMessage.includes("chatbot")) {
            response = chatbotResponses[0]
          } else if (lowercaseMessage.includes("software personalizzato")) {
            response = customSoftwareResponses[0]
          } else if (lowercaseMessage.includes("gestione dati")) {
            response = dataManagementResponses[0]
          } else {
            response = {
              role: "assistant",
              content:
                "Grazie per il tuo interesse! Sarei felice di discutere questo servizio con te. Che requisiti specifici hai?",
            }
          }

          setMessages((prev) => [...prev, response])
          setIsTyping(false)
        }, 1500)
      }
    }

    window.addEventListener("triggerChatMessage", handleServiceMessage)
    return () => window.removeEventListener("triggerChatMessage", handleServiceMessage)
  }, [])

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the entire page
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Focus back on input after submission
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Simulate AI response
    setTimeout(() => {
      let response
      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("esperienza") || lowercaseInput.includes("lavoro")) {
        response = experienceResponses[0]
      } else if (lowercaseInput.includes("skill") || lowercaseInput.includes("competenza") || lowercaseInput.includes("sai fare")) {
        response = skillsResponses[0]
      } else if (
        lowercaseInput.includes("progett") || // "progetto" o "progetti"
        lowercaseInput.includes("portfolio") ||
        lowercaseInput.includes("costruito")
      ) {
        response = projectResponses[0]
      } else if (lowercaseInput.includes("sviluppo ai") || lowercaseInput.includes("intelligenza artificiale")) {
        response = aiDevelopmentResponses[0]
      } else if (lowercaseInput.includes("automazione") || lowercaseInput.includes("workflow")) {
        response = processAutomationResponses[0]
      } else if (lowercaseInput.includes("analisi dati") || lowercaseInput.includes("analitica")) {
        response = dataAnalyticsResponses[0]
      } else if (lowercaseInput.includes("chatbot")) {
        response = chatbotResponses[0]
      } else if (lowercaseInput.includes("software personalizzato") || lowercaseInput.includes("sviluppo software")) {
        response = customSoftwareResponses[0]
      } else if (lowercaseInput.includes("gestione dati") || lowercaseInput.includes("database")) {
        response = dataManagementResponses[0]
      } else {
        response = {
          role: "assistant",
          content:
            "Posso parlarti dell'esperienza lavorativa di Michele, competenze, progetti, o servizi specifici come sviluppo AI, automazione processi, analisi dati, sviluppo chatbot, software personalizzato e gestione dati. Cosa vorresti sapere?",
        }
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    // Simulate user clicking a quick question
    const userMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response
      const lowercaseQuestion = question.toLowerCase()

      if (lowercaseQuestion.includes("esperienza")) {
        response = experienceResponses[0]
      } else if (lowercaseQuestion.includes("competenze")) {
        response = skillsResponses[0]
      } else if (lowercaseQuestion.includes("progetti")) {
        response = projectResponses[0]
      }

      if (response) {
        setMessages((prev) => [...prev, response])
      }
      setIsTyping(false)
    }, 1500)
  }

  const resetChat = () => {
    setMessages(initialMessages)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const chatElementVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Chatta con <span className="text-gradient">Mike</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Chiedi all'assistente virtuale delle mie competenze, progetti o servizi specifici.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto" ref={ref}>
          <motion.div
            className="glass rounded-2xl overflow-hidden chat-element"
            variants={chatElementVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Mike</h3>
                  <p className="text-xs text-gray-400">Assistente Virtuale</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Azzera chat"
                type="button"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Chat messages - Fixed height container with internal scrolling */}
            <div
              ref={chatMessagesRef}
              className="h-[350px] overflow-y-auto p-4 space-y-4 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === "user" ? "bg-primary/20 text-white" : "bg-card/50 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? (
                        <Bot size={16} className="text-primary" />
                      ) : (
                        <User size={16} className="text-secondary" />
                      )}
                      <span className="text-xs font-medium">{message.role === "assistant" ? "Mike" : "Tu"}</span>
                    </div>
                    <div
                      className="text-sm rich-text"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-[80%] rounded-2xl p-3 bg-card/50 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-primary" />
                      <span className="text-xs font-medium">Mike</span>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-3 border-t border-white/10 flex gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickQuestion("Parlami della sua esperienza lavorativa")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Esperienza lavorativa
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Quali sono le sue competenze?")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Competenze
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Mostrami i suoi progetti")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Progetti
              </button>
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Chiedi della mia esperienza, competenze o progetti..."
                  className="flex-1 bg-card/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={18} className="text-white" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* AI Assistant image */}
          <motion.div
            className="mt-8 flex justify-center chat-element"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}