import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import VoiceAssistant from "@/components/voice-assistant"
import { VoiceProvider } from "@/hooks/voice-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IRCTC - Indian Railway Catering and Tourism Corporation",
  description: "Book train tickets, check PNR status, and explore tour packages with IRCTC",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VoiceProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Chatbot />
          <VoiceAssistant />
          <ThemeProvider />
        </VoiceProvider>
      </body>
    </html>
  )
}

