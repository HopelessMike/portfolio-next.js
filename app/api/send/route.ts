// File: app/api/send/route.ts (Versione Finale e Corretta)

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL; // Opzionale: per maggiore sicurezza

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!toEmail) {
      throw new Error("L'indirizzo email del destinatario non è configurato.");
    }

    const { data, error } = await resend.emails.send({
      // MODIFICA CRUCIALE: Usa un indirizzo del tuo dominio verificato.
      from: 'Sito Web <contatto@michelemiranda.com>', 
      
      // L'indirizzo a cui riceverai le email.
      to: [toEmail], 
      
      subject: `Nuovo contatto da ${name} dal tuo sito!`,
      
      // Aggiungiamo il 'reply_to' per poter rispondere direttamente all'utente.
      reply_to: email,

      // Corpo del messaggio
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
    });

    if (error) {
      // Log dell'errore per il debug sul server Vercel
      console.error("Errore da Resend:", error);
      return NextResponse.json({ error: 'Errore durante l\'invio dell\'email.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    // Log dell'errore per il debug sul server Vercel
    console.error("Errore nell'API route:", error);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}