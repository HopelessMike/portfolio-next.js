// File: app/api/send/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Istanziamo Resend usando la API key salvata nel file .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Estraiamo i dati del form dal corpo della richiesta
    const { name, email, message } = await request.json();

    // Inviamo l'email usando Resend
    const { data, error } = await resend.emails.send({
      // Sostituisci con il tuo indirizzo verificato su Resend
      from: 'Portfolio Contact <onboarding@resend.dev>', 
      // Sostituisci con l'indirizzo email dove vuoi ricevere i messaggi
      to: ['michelemiranda1996@gmail.com'], 
      subject: `Nuovo messaggio da ${name} sul tuo sito!`,
      // Corpo del messaggio in testo semplice
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
    });

    // Se c'è un errore nell'invio, restituiamo un errore
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Se l'invio ha successo, restituiamo una conferma
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}