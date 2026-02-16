import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { AuthProvider } from '@/components/auth-provider'

const _inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Secure Auth',
  description: 'A simple login authentication system with register, login, and protected pages.',
}

export const viewport: Viewport = {
  themeColor: '#2d2f36',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
