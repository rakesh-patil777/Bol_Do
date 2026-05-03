import type React from "react"
export const metadata = {
  title: "Railway Stays - IRCTC",
  description: "Comfortable accommodations and premium lounges for railway travelers across India",
}

export default function StaysLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

