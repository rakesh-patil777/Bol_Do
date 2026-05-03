import type React from "react"
export const metadata = {
  title: "PNR Status - IRCTC",
  description: "Check the current status of your train ticket with PNR number",
}

export default function PnrStatusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

