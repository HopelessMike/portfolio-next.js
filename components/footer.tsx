"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"
import Link from "next/link" // <-- MODIFICA: Importato il componente Link
import { usePathname } from "next/navigation" // <-- MODIFICA: Importato per gestire i link

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <footer className="py-8 relative">
      <div className="container mx-auto px-4">
        <div className="glass p-8 rounded-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-gradient">Michele Miranda</h3>
              <p className="text-gray-400 mb-4 max-w-xs">
                Ti ho incuriosito? contattami per discutere di come posso aiutarti a raggiungere i tuoi obiettivi con l'AI.
              </p>
              <div className="flex space-x-4">
                {/* Nota: Ricorda di aggiornare gli href dei social con i tuoi link reali */}
                <motion.a
                  href="#"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="Github"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/miranda-michele/"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Link Rapidi</h3>
              {/* MODIFICA: Sostituiti <a> con <Link> e resi i link "intelligenti" */}
              <ul className="space-y-2">
                <li>
                  <Link href={isHomePage ? "#home" : "/#home"} className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href={isHomePage ? "#about" : "/#about"} className="text-gray-400 hover:text-white transition-colors">
                    Chi Sono
                  </Link>
                </li>
                <li>
                  <Link href={isHomePage ? "#services" : "/#services"} className="text-gray-400 hover:text-white transition-colors">
                    Servizi
                  </Link>
                </li>
                <li>
                  <Link href={isHomePage ? "#projects" : "/#projects"} className="text-gray-400 hover:text-white transition-colors">
                    Progetti
                  </Link>
                </li>
                <li>
                  <Link href={isHomePage ? "#contact" : "/#contact"} className="text-gray-400 hover:text-white transition-colors">
                    Contatti
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Servizi</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Sviluppo AI</li>
                <li className="text-gray-400">Automazione Processi</li>
                <li className="text-gray-400">Analisi Dati</li>
                <li className="text-gray-400">Sviluppo Software</li>
                <li className="text-gray-400">Sviluppo Chatbot</li>
              </ul>
            </div>
          </div>

          {/* MODIFICA: Aggiunto il link alla Privacy Policy qui */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2">
              <p>&copy; {currentYear} Michele Miranda. Tutti i diritti riservati.</p>
              <span className="hidden sm:inline">|</span>
              <Link href="/privacy-policy" className="hover:text-white underline transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}