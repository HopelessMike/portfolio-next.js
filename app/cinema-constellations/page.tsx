// app/cinema-constellations/page.tsx
export default function CinemaConstellationsEmbed() {
  return (
    <main className="min-h-screen">
      <iframe
        src="https://cinema-constellations.vercel.app/"
        title="Cinema Constellations"
        className="w-full h-screen border-0"
        // full-screen API (opzionale)
        allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
        allowFullScreen
      />
    </main>
  );
}
