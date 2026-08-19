import { Poppins, Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Next 16 Boilerplate',
  description: 'Next 16 Boilerplate'
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins' // remember that this name has to match the var-name in globals.css @theme property
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(poppins.variable, 'font-sans', inter.variable)}>
      <body>
        <div className="bg-background">
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  )
}
