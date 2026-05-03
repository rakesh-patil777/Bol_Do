import { Loader2 } from "lucide-react"

export default function LoungeLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-12 w-12 text-blue-700 animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-gray-800">Loading Premium Lounges</h2>
      <p className="text-gray-600 mt-2">Please wait while we prepare the page for you...</p>
    </div>
  )
}

