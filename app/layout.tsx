import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { config } from '@/config'
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: config.web.title,
  description: config.web.description,
  keywords: [
    config.blockchain.name,
    "Blockchain",
    "API",
    "REST",
    "Documentation",
    config.blockchain.symbol,
    "Cryptocurrency"
  ],
  authors: {
    name: config.web.name,
    url: config.web.url
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico"
  },
  metadataBase: new URL(config.web.url)
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
