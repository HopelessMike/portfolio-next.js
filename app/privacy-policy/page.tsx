// File: app/privacy-policy/page.tsx

import Footer from "@/components/footer";
import FloatingSidebar from "@/components/floating-sidebar";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <FloatingSidebar />
      <main className="min-h-screen bg-[#0a0a0f] pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-gradient">
              Privacy Policy
            </h1>
            <article className="prose prose-invert lg:prose-xl prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-primary hover:prose-a:text-secondary">
              <p>
                <strong>Ultimo aggiornamento: 28 luglio 2025</strong>
              </p>
              <p>
                La presente Privacy Policy descrive le modalità con cui Michele
                Miranda ("Titolare", "noi") raccoglie, utilizza e protegge i
                dati personali degli utenti ("utente", "tu") che visitano il
                sito web{" "}
                <Link href="https://michelemiranda.com">
                  https://michelemiranda.com
                </Link>{" "}
                ("Sito").
              </p>

              <h2>1. Titolare del Trattamento dei Dati</h2>
              <p>
                Il Titolare del Trattamento dei dati personali è:
                <br />
                Michele Miranda
                <br />
                Email di contatto: michelemiranda1996@gmail.com
              </p>

              <h2>2. Tipologie di Dati Raccolti</h2>
              <p>Il Sito raccoglie due tipi di dati:</p>
              <ul>
                <li>
                  <strong>Dati forniti volontariamente dall'utente:</strong>
                  <br />
                  Attraverso il modulo di contatto presente sul Sito,
                  raccogliamo i seguenti dati personali che fornisci
                  direttamente per poter rispondere alle tue richieste: Nome,
                  Indirizzo email, Contenuto del messaggio.
                </li>
                <li>
                  <strong>Dati di Navigazione (Dati Statistici Anonimi):</strong>
                  <br />
                  Per analizzare le performance e migliorare il Sito,
                  utilizziamo Vercel Analytics. Questo strumento è progettato
                  per essere rispettoso della privacy e <strong>non utilizza cookie</strong>. Raccoglie dati
                  in forma aggregata e anonima, come le pagine visitate, il
                  paese di provenienza e il tipo di dispositivo, senza mai
                  identificare o tracciare il singolo utente. Nessuna
                  informazione personale viene memorizzata sul tuo dispositivo. Per
                  maggiori dettagli, puoi consultare la{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy di Vercel
                  </a>.
                </li>
              </ul>

              <h2>3. Finalità e Base Giuridica del Trattamento</h2>
              <p>Trattiamo i tuoi dati esclusivamente per le seguenti finalità:</p>
              <ul>
                <li>
                  <strong>Rispondere alle tue richieste (Modulo di Contatto):</strong> I dati forniti vengono utilizzati per rispondere ai messaggi e alle richieste di informazioni. La base giuridica è l'esecuzione di misure precontrattuali adottate su tua richiesta.
                </li>
                <li>
                  <strong>Analisi Statistica e Miglioramento del Sito:</strong> I dati di navigazione anonimi vengono utilizzati per monitorare le performance tecniche e migliorare la struttura e i contenuti del Sito. La base giuridica è il legittimo interesse del Titolare.
                </li>
              </ul>
              
              <h2>4. Modalità di Trattamento e Periodo di Conservazione</h2>
              <p>I dati sono trattati con strumenti informatici. I dati personali forniti tramite il modulo di contatto saranno conservati per il tempo strettamente necessario a dar corso alla richiesta dell'utente, salvo l'instaurazione di un rapporto professionale.</p>
              
              <h2>5. Comunicazione dei Dati a Terzi</h2>
              <p>I tuoi dati personali non saranno diffusi o venduti. Potranno essere comunicati a fornitori di servizi terzi (Responsabili del Trattamento) per le finalità sopra indicate, tra cui Vercel, Inc. (hosting e analytics) e Resend (invio email).</p>

              <h2>6. Diritti dell'Interessato</h2>
              <p>In base al GDPR (Regolamento UE 2016/679), hai il diritto di accedere ai tuoi dati, chiederne la rettifica, la cancellazione o la limitazione del trattamento. Puoi esercitare i tuoi diritti in qualsiasi momento inviando una comunicazione all'indirizzo email del Titolare.</p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}