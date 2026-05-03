import type React from "react"
import { InfoIcon } from "lucide-react"

export function Info({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex items-start text-sm text-gray-500 ${className}`}>
      <InfoIcon className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  )
}

