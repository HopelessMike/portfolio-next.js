"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, Link as LinkIcon } from "lucide-react"

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  // NUOVA FUNZIONE handleSubmit CON GESTIONE ERRORI AVANZATA
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData.error || `Errore del server: ${response.status}`;
        throw new Error(errorMsg);
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });

    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore imprevisto. Riprova.');
      console.error("Errore durante l'invio del form:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Elemento decorativo di sfondo ripristinato */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(var(--primary),0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Animazioni ripristinate */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Mettiamoci in <span className="text-gradient">Contatto</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hai un progetto in mente o vuoi discutere una collaborazione? Mi piacerebbe sentirti!
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Animazioni e tutti gli elementi di contatto ripristinati */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="neomorphic p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <p className="text-gray-400">michelemiranda1996@gmail.com</p>
              </div>
            </div>

            <div className="neomorphic p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-secondary/20">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Telefono</h3>
                <p className="text-gray-400">+39 3456411831 </p>
              </div>
            </div>

            <div className="neomorphic p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-foreground/20">
                <LinkIcon className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/miranda-michele/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:underline"
                >
                  www.linkedin.com/in/miranda-michele/
                </a>
              </div>
            </div>

            <div className="neomorphic p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-accent/20">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Posizione</h3>
                <p className="text-gray-400">Milano, Italia</p>
              </div>
            </div>
          </motion.div>

          {/* Animazioni ripristinate */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="neomorphic p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">Messaggio Inviato!</h3>
                  <p className="text-gray-300">Grazie per avermi contattato. Ti risponderò il prima possibile.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Il tuo nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="La tua email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-card/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="Il tuo messaggio"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glass px-6 py-3 rounded-lg font-medium border border-primary/20 bg-primary/10 text-white hover:bg-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-scale"
                  >
                    {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
                  </button>
                  {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}