"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FloatingSidebar from '@/components/floating-sidebar'
import Footer from '@/components/footer'

const errorMessages = [
    { title: "Errore 404!", text: "Sembra che questa pagina sia stata rapita dagli alieni. Meglio tornare alla base." },
    { title: "Ops!", text: "Ti sei perso nel multiverso. Questo link porta a una dimensione che non esiste." },
    { title: "Anomalia nel Sistema", text: "Il mio script di automazione ha cercato di ottimizzare anche questa pagina, ma credo l'abbia fatta sparire. Ops. A quanto pare, anche le macchine hanno bisogno di un caffè. Torniamo alla home, lì funziona tutto." },
    { title: "Dati non trovati", text: "L'agente AI ha cercato ovunque, ma questa pagina non è nei suoi archivi. Riprova dalla home." },
    { title: "Glitch nel Matrix", text: "Hai preso la pillola sbagliata. Questa pagina è solo un'eco residua nel codice, un déjà-vu che non porta a nessuna parte. Scegli la pillola giusta: torna alla sicurezza della nostra homepage." },
    { title: 'Errore: Puntatore Nullo', text: 'Cercavi una pagina, ma hai trovato solo un "null". Un classico buco nero di dati. Niente paura, non verrai assorbito. Facciamo un debug rapido e ripartiamo dalla home.' },
    { title: "Processo Ottimizzato... Troppo!", text: "Ho creato un processo così efficiente che ha automatizzato l'esistenza di questa pagina, cancellandola. Sto lavorando a una patch. Nel frattempo, il nostro punto di ripristino sicuro è la homepage." }
];

const errorImages = [
    '/images/404_1.png',
    '/images/404_2.png',
    '/images/404_3.png',
    '/images/404_4.png'
];

export default function NotFound() {
  const [message, setMessage] = useState(errorMessages[0]);
  const [image, setImage] = useState(errorImages[0]);

  useEffect(() => {
    const randomMessageIndex = Math.floor(Math.random() * errorMessages.length);
    const randomImageIndex = Math.floor(Math.random() * errorImages.length);
    setMessage(errorMessages[randomMessageIndex]);
    setImage(errorImages[randomImageIndex]);
  }, []);

  return (
    <>
      <FloatingSidebar />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center">
        <div className="max-w-md">
            <Image
                src={image}
                alt="Illustrazione per pagina non trovata"
                width={300}
                height={300}
                className="mx-auto mb-8 animate-float"
            />
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gradient mb-4">
                {message.title}
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-8">
                {message.text}
            </p>
            <Link 
              href="/" 
              className="inline-block px-8 py-3 text-lg font-bold text-white rounded-full transition-opacity duration-300 hover:opacity-90 bg-gradient-to-r from-primary to-secondary"
            >
                Torna alla Home
            </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}