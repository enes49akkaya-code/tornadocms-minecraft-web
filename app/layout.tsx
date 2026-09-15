import type { Metadata } from 'next'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'TornadoCMS Minecraft',
  description: 'TornadoCMS Minecraft sunucusuna hoş geldiniz.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>
}
