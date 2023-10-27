import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'


export const metadata: Metadata = {
  title: 'Proyecto Final',
  description: 'Bases de Datos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
