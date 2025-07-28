// File: components/client-layout.tsx

"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/app/context/LoadingContext"
import { Analytics } from "@vercel/analytics/react"

type Props = React.PropsWithChildren<{}>;

export default function ClientLayout({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LoadingProvider>
        {children}
        <Analytics />
      </LoadingProvider>
    </ThemeProvider>
  )
}