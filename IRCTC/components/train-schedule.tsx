"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Download, Printer, Share2, Info } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface TrainScheduleProps {
  trainNumber?: string
  trainName?: string
  fromStation?: string
  toStation?: string
}

export function TrainSchedule({
  trainNumber = "12042",
  trainName = "SHATABDI EXP",
  fromStation = "NEW JALPAIGURI",
  toStation = "HOWRAH JN",
}: TrainScheduleProps) {
  const router = useRouter()
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      router.back()
    }, 300)
  }

  const daysOfWeek = [
    { day: "MON", runs: true },
    { day: "TUE", runs: true },
    { day: "WED", runs: true },
    { day: "THU", runs: true },
    { day: "FRI", runs: true },
    { day: "SAT", runs: true },
    { day: "SUN", runs: false },
  ]

  const stationSchedule = [
    {
      sn: 1,
      stationCode: "NJP",
      stationName: "NEW JALPAIGURI",
      routeNumber: 1,
      arrivalTime: "--",
      departureTime: "05:30",
      haltTime: "--",
      distance: 0,
      day: 1,
    },
    {
      sn: 2,
      stationCode: "KNE",
      stationName: "KISHANGANJ",
      routeNumber: 1,
      arrivalTime: "06:28",
      departureTime: "06:30",
      haltTime: "02:00",
      distance: 88,
      day: 1,
    },
    {
      sn: 3,
      stationCode: "BOE",
      stationName: "BARSOI JN",
      routeNumber: 1,
      arrivalTime: "07:15",
      departureTime: "07:16",
      haltTime: "01:00",
      distance: 145,
      day: 1,
    },
    {
      sn: 4,
      stationCode: "MLDT",
      stationName: "MALDA TOWN",
      routeNumber: 1,
      arrivalTime: "08:35",
      departureTime: "08:40",
      haltTime: "05:00",
      distance: 233,
      day: 1,
    },
    {
      sn: 5,
      stationCode: "NFK",
      stationName: "NEW FARAKKA JN",
      routeNumber: 1,
      arrivalTime: "09:12",
      departureTime: "09:13",
      haltTime: "01:00",
      distance: 268,
      day: 1,
    },
    {
      sn: 6,
      stationCode: "BHP",
      stationName: "BOLPUR S NIKTN",
      routeNumber: 1,
      arrivalTime: "11:02",
      departureTime: "11:04",
      haltTime: "02:00",
      distance: 415,
      day: 1,
    },
    {
      sn: 7,
      stationCode: "BWN",
      stationName: "BARDDHAMAN JN",
      routeNumber: 1,
      arrivalTime: "12:05",
      departureTime: "12:07",
      haltTime: "02:00",
      distance: 466,
      day: 1,
    },
    {
      sn: 8,
      stationCode: "HWH",
      stationName: "HOWRAH JN",
      routeNumber: 1,
      arrivalTime: "13:45",
      departureTime: "--",
      haltTime: "--",
      distance: 561,
      day: 1,
    },
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isClosing ? 0.9 : 1, opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-blue-800 text-white p-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-bold">Train Schedule</h2>
          <button onClick={handleClose} className="text-white hover:bg-blue-700 rounded-full p-1" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <div className="mb-6">
            <Card>
              <CardHeader className="bg-blue-50 py-3">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium">
                  <div>Train Number</div>
                  <div>Train Name</div>
                  <div>From Station</div>
                  <div>Destination Station</div>
                  <div>Runs On</div>
                </div>
              </CardHeader>
              <CardContent className="py-3">
                <div className="grid grid-cols-5 gap-4">
                  <div className="font-medium text-blue-800">{trainNumber}</div>
                  <div>{trainName}</div>
                  <div>{fromStation}</div>
                  <div>{toStation}</div>
                  <div className="flex space-x-1">
                    {daysOfWeek.map((day) => (
                      <Badge
                        key={day.day}
                        variant={day.runs ? "default" : "destructive"}
                        className={cn(
                          "text-xs font-medium",
                          day.runs
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100",
                        )}
                      >
                        {day.day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="px-4 py-3 text-left">S.N.</th>
                  <th className="px-4 py-3 text-left">Station Code</th>
                  <th className="px-4 py-3 text-left">Station Name</th>
                  <th className="px-4 py-3 text-left">Route Number</th>
                  <th className="px-4 py-3 text-left">Arrival Time</th>
                  <th className="px-4 py-3 text-left">Departure Time</th>
                  <th className="px-4 py-3 text-left">Halt Time(In minutes)</th>
                  <th className="px-4 py-3 text-left">Distance</th>
                  <th className="px-4 py-3 text-left">Day</th>
                </tr>
              </thead>
              <tbody>
                {stationSchedule.map((station, index) => (
                  <tr key={station.sn} className={cn("border-b", index % 2 === 0 ? "bg-white" : "bg-gray-50")}>
                    <td className="px-4 py-3">{station.sn}</td>
                    <td className="px-4 py-3">{station.stationCode}</td>
                    <td className="px-4 py-3">{station.stationName}</td>
                    <td className="px-4 py-3">{station.routeNumber}</td>
                    <td className="px-4 py-3">{station.arrivalTime}</td>
                    <td className="px-4 py-3">{station.departureTime}</td>
                    <td className="px-4 py-3">{station.haltTime}</td>
                    <td className="px-4 py-3">{station.distance}</td>
                    <td className="px-4 py-3">{station.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t p-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
          <div className="flex items-center text-sm text-gray-500">
            <Info className="h-4 w-4 mr-1" />
            Schedule information is subject to change
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Printer className="h-4 w-4" />
                    <span className="hidden sm:inline">Print</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Print train schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download as PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share train schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button onClick={handleClose} className="bg-blue-700 hover:bg-blue-800">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

