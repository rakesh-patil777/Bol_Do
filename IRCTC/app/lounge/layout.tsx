import type React from "react"
export const metadata = {
  title: "Premium Lounges - IRCTC",
  description: "Relax in comfort while waiting for your train with our premium lounge facilities",
}

export default function LoungeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

