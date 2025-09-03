import { NextRequest, NextResponse } from 'next/server'
import { OpenAIClient } from '@/lib/openai-client'
import { SafetyClassifier } from '@/lib/safety-classifier'
import { getSystemPrompt } from '@/lib/system-prompts'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], stream = true } = await request.json()

    // Check if OpenAI API key is available for safety classification
    if (process.env.OPENAI_API_KEY) {
      try {
        // LLM-based safety check
        const safetyClassifier = new SafetyClassifier()
        const safetyCheck = await safetyClassifier.classifyContent(message)
        
        if (!safetyCheck.isAppropriate) {
          return NextResponse.json({
            response: safetyCheck.suggestedResponse || "Sono qui per discutere dell'esperienza professionale e dei servizi di Michele Miranda. Potresti chiedermi qualcosa sulle sue competenze in automazione AI o sulla sua esperienza progettuale invece?",
            isOffline: false
          })
        }
      } catch (safetyError) {
        console.error('Safety classification error:', safetyError)
        // Continue with basic fallback if safety check fails
      }
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API token not found, falling back to offline responses')
      return NextResponse.json({
        response: getOfflineResponse(message),
        isOffline: true
      })
    }

    try {
      const openai = new OpenAIClient()
      
      // Prepare conversation history (limit to last 5 exchanges)
      const recentHistory = conversationHistory.slice(-10) // 5 exchanges = 10 messages (user + assistant)
      
      // Build messages array with enhanced system context
      const messages = [
        {
          role: 'system' as const,
          content: getSystemPrompt()
        },
        ...recentHistory.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: message
        }
      ]

      if (stream) {
        const streamResponse = await openai.createChatCompletion(messages, true) as ReadableStream
        
        // Create a proper streaming response using Server-Sent Events
        const encoder = new TextEncoder()
        const readable = new ReadableStream({
          async start(controller) {
            const reader = streamResponse.getReader()
            const decoder = new TextDecoder()
            
            try {
              while (true) {
                const { done, value } = await reader.read()
                
                if (done) break
                
                const text = decoder.decode(value, { stream: true })
                const lines = text.split('\n')
                
                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim()
                    
                    if (data === '[DONE]') {
                      controller.close()
                      return
                    }
                    
                    try {
                      const parsed = JSON.parse(data)
                      const content = parsed.choices?.[0]?.delta?.content
                      
                      if (content) {
                        // Send as Server-Sent Event
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
                      }
                    } catch (parseError) {
                      // Skip invalid JSON chunks
                    }
                  }
                }
              }
            } catch (error) {
              console.error('Stream processing error:', error)
              controller.error(error)
            } finally {
              reader.releaseLock()
            }
          }
        })

        return new Response(readable, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        })
      } else {
        const response = await openai.createChatCompletion(messages, false) as string
        
        return NextResponse.json({
          response,
          isOffline: false
        })
      }
    } catch (openaiError) {
      console.error('OpenAI error, falling back to offline responses:', openaiError)
      
      return NextResponse.json({
        response: getOfflineResponse(message),
        isOffline: true
      })
    }

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Basic safety check as final fallback
    const { message } = await request.json()
    
    if (basicSafetyCheck(message)) {
      return NextResponse.json({
        response: "Sono qui per discutere dell'esperienza professionale e dei servizi di Michele Miranda. Potresti chiedermi qualcosa sulle sue competenze in automazione AI o sulla sua esperienza progettuale invece?",
        isOffline: true
      })
    }
    
    return NextResponse.json({
      response: getOfflineResponse(message),
      isOffline: true
    }, { status: 500 })
  }
}

// Basic fallback safety check (used when OpenAI API is not available)
function basicSafetyCheck(message: string): boolean {
  const lowercaseMessage = message.toLowerCase()
  
  // Only block extremely obvious inappropriate content as fallback
  const severelyInappropriate = [
    'fuck', 'shit', 'bitch', 'asshole', 'damn', 'hell',
    'sex', 'porn', 'naked', 'nude',
    'kill', 'die', 'murder', 'hate', 'violence',
    'scam', 'fraud', 'illegal', 'hack'
  ]
  
  for (const word of severelyInappropriate) {
    if (lowercaseMessage.includes(word)) {
      return true
    }
  }
  
  return false
}

// Fallback offline responses (existing logic)
function getOfflineResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase()

  if (lowercaseMessage.includes('esperienza') || lowercaseMessage.includes('lavoro')) {
    return `Michele ha oltre 4 anni di esperienza in AI e automazione:

**Data & AI Engineer** presso iConsulting (2023–Presente)  
• Progettato soluzioni GenAI basate su LLM (inclusi RAG e sentiment analysis) per clienti enterprise  
• Architettato pipeline dati cloud-native, garantendo scalabilità, performance e Single Source of Truth  
• Gestito stakeholder cross-funzionali, traducendo esigenze di business in soluzioni tecniche  
• Guidato e formato un team di junior engineer, accelerandone la produttività progettuale  

**Customer Transformation Developer** presso PwC (2021–2023)  
• Automatizzato processi ETL e monitoraggio KPI per campagne marketing su larga scala  
• Sviluppato controlli predittivi per anomalie, migliorando la resilienza operativa  
• Condotto analisi funzionali a contatto diretto con il cliente, facilitando la traduzione tecnica dei requisiti  
• Supportato il team nello scaling delle soluzioni, contribuendo a riduzioni di costo e tempi di delivery`
  }

  if (lowercaseMessage.includes('skill') || lowercaseMessage.includes('competenza') || lowercaseMessage.includes('sai fare')) {
    return `Michele è specializzato in:

**Sviluppo AI** - Costruzione di Agenti e pipeline AI
**Automazione Processi** - Creazione di flussi di lavoro efficienti
**Analisi Dati** - Estrazione di insights azionabili
**AI Vocale** - Sviluppo di interfacce vocali naturali
**Sviluppo Chatbot** - Creazione di esperienze conversazionali

È competente con strumenti come N8N, GPT, Gemini, ElevenLabs e varie piattaforme cloud.`
  }

  if (lowercaseMessage.includes('progett') || lowercaseMessage.includes('portfolio') || lowercaseMessage.includes('costruito')) {
    return `Michele ha costruito diversi progetti innovativi:

**Cinema Constellations** - Visualizzazione 3D di film con AI e machine learning
**InsightSuite** - Piattaforma di insights in tempo reale con LLM
**LDR-Iconizer** - Sistema AI multilingue per conversione testo-simboli
**Film Fan Finder** - Sistema di raccomandazione film AI
**AI Automation Consultant** - Automazione intelligente del flusso di lavoro

Ogni progetto dimostra la sua esperienza nella creazione di soluzioni user-friendly alimentate dall'AI.`
  }

  if (lowercaseMessage.includes('sviluppo ai') || lowercaseMessage.includes('intelligenza artificiale')) {
    return `I servizi di sviluppo AI di Michele includono:

**Sviluppo Soluzioni di Generative AI**
**Generative AI & LLM** – Progettazione e sviluppo di soluzioni GenAI personalizzate basate su Large Language Models.
**Agentic AI Development** – Creazione e implementazione di agenti AI autonomi per workflow intelligenti e automatizzati.
**Fine-tuning & Prompt Engineering** – Ottimizzazione delle performance dei modelli attraverso tecniche avanzate di Prompt Engineering e fine-tuning via API.

**Tecnologie e Framework:**
- **Framework:** LangChain, Hugging Face (Transformers, Datasets), Vector DB
- **Modelli Proprietari:** OpenAI GPT, Anthropic Claude, Mistral
- **Modelli Open-source:** Implementazione e personalizzazione di modelli LLM open-source
- **Fine-tuning:** API-based fine-tuning (OpenAI, Cohere), Advanced Prompt Engineering

Vorresti discutere di un progetto AI specifico per la tua azienda?`
  }

  if (lowercaseMessage.includes('automazione') || lowercaseMessage.includes('workflow')) {
    return `Le soluzioni di automazione processi di Michele coprono:

**Ottimizzazione Flusso di Lavoro** - Processi aziendali ottimizzati
**Integrazione API** - Connessione fluida di sistemi diversi
**Automazione Attività** - Programmazione ed esecuzione automatizzate
**Business Intelligence** - Reporting e analisi automatizzati

**Strumenti e Piattaforme:**
• N8N per workflow automation
• Custom Python automation scripts
• Cloud-based automation solutions

Quali processi specifici stai cercando di automatizzare?`
  }

  if (lowercaseMessage.includes('analisi dati') || lowercaseMessage.includes('analitica')) {
    return `I servizi di analisi dati di Michele includono:

**Visualizzazione Dati** - Dashboard e report interattivi
**Business Intelligence** - Insights strategici dai tuoi dati
**Metriche Performance** - Monitoraggio e ottimizzazione KPI
**Analisi Real-time** - Elaborazione e monitoraggio dati in tempo reale

**Tecnologie:**
• Python (Pandas, NumPy, Scikit-learn)
• Tableau, Power BI for visualization
• SQL databases and data warehouses
• Apache Spark for big data processing

Che tipo di insights sui dati stai cercando di ottenere?`
  }

  if (lowercaseMessage.includes('chatbot')) {
    return `I servizi di sviluppo chatbot di Michele includono:

**Integrazione Multi-piattaforma** - Deploy su web, mobile e piattaforme di messaggistica
**Integrazione Vocale** - Chatbot abilitati alla voce con riconoscimento vocale
**Fine Tuning e Training Personalizzato** - Adattato alla conoscenza e al tono della tua azienda

**Funzionalità:**
• Integrazione con CRM e sistemi di business
• Supporto clienti automatizzato 24/7
• Lead generation
• FAQ automation and knowledge base

Vorresti discutere di un progetto chatbot specifico per la tua azienda?`
  }

  if (lowercaseMessage.includes('software personalizzato') || lowercaseMessage.includes('sviluppo software')) {
    return `I servizi di sviluppo software personalizzato di Michele includono:

**Sviluppo API** - Creazione di API RESTful e GraphQL
**Integrazione Sistemi** - Connessione di sistemi e piattaforme esistenti
**Soluzioni Cloud** - Applicazioni cloud-native scalabili
**Design Database** - Architettura e gestione dati efficiente

**Tecnologie:**
• Backend: Python, SQL, MongoDB
• Cloud: Azure, Google Cloud Platform
• DevOps: CI/CD pipelines

Che tipo di soluzione software personalizzata stai cercando di costruire?`
  }

  if (lowercaseMessage.includes('gestione dati') || lowercaseMessage.includes('database')) {
    return `Le soluzioni di gestione dati di Michele coprono:

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

Quali sfide specifiche sui dati stai cercando di risolvere?`
  }

  // Default response
  return "Sono l'assistente AI di Michele Miranda. Posso fornirti informazioni sulla sua esperienza lavorativa, competenze, progetti, o servizi specifici come sviluppo AI, automazione processi, analisi dati, sviluppo chatbot, software personalizzato e gestione dati. Cosa vorresti sapere sui servizi di Michele?"
}