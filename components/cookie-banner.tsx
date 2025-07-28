"use client"

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Capito!"
      cookieName="sitoMicheleMirandaCookieConsent"
      style={{
        background: "rgba(10, 10, 15, 0.95)",
        color: "#e5e7eb",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        fontSize: "14px",
      }}
      buttonStyle={{
        background: "linear-gradient(to right, #fc52ff, #00e1f4)",
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "9999px",
        padding: "10px 18px",
      }}
      expires={150}
    >
      Questo sito utilizza i cookie per migliorare l'esperienza dell'utente.{" "}
      <Link href="/privacy-policy" className="font-bold text-white underline hover:text-primary transition-colors">
        Scopri di più
      </Link>
    </CookieConsent>
  );
};

// Assicurati che l'esportazione sia 'export default', senza 'const' o altro.
export default CookieBanner;