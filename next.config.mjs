/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aggiungi questa riga per l'esportazione statica
  output: 'export',

  // Le tue configurazioni esistenti vanno benissimo
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Questa opzione è necessaria per l'esportazione statica
    unoptimized: true,
  },
}

export default nextConfig