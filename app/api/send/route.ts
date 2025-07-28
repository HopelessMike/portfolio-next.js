import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!toEmail) {
      console.error("La variabile d'ambiente TO_EMAIL non è configurata.");
      throw new Error("L'indirizzo email del destinatario non è configurato sul server.");
    }
    
    if (!process.env.RESEND_API_KEY) {
        console.error("La variabile d'ambiente RESEND_API_KEY non è configurata.");
        throw new Error("La chiave API di Resend non è configurata sul server.");
    }

    const { data, error } = await resend.emails.send({
      from: 'Sito Web <contatto@michelemiranda.com>', 
      to: [toEmail], 
      subject: `Nuovo messaggio da ${name} dal tuo portfolio!`,
      reply_to: email,
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
    });

    if (error) {
      console.error("Errore ricevuto da Resend:", error);
      return NextResponse.json({ error: 'Errore durante l\'invio dell\'email da parte del servizio.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore generico nell'API route:", error);
    // Restituiamo il messaggio di errore nel corpo della risposta
    return NextResponse.json({ error: (error as Error).message || 'Errore interno del server.' }, { status: 500 });
  }
}