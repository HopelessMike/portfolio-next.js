/** @type {import('next').NextConfig} */
import { withMicrofrontends } from '@vercel/microfrontends/next/config';
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMicrofrontends(nextConfig);