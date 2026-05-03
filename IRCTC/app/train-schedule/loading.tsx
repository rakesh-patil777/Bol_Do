import { Loader2 } from "lucide-react"

export default function TrainScheduleLoading() {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <Loader2 className="h-8 w-8 text-blue-700 animate-spin mb-4" />
        <h3 className="text-lg font-medium">Loading Train Schedule</h3>
        <p className="text-gray-500 mt-2">Please wait...</p>
      </div>
    </div>
  )
}

