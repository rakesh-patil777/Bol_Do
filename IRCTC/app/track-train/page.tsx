"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  CalendarIcon,
  ClockIcon,
  SearchIcon,
  Train,
  MapPin,
  AlertCircle,
  ArrowRight,
  Share2,
  Download,
  Bell,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TrackTrainPage() {
  const [trainSearchMethod, setTrainSearchMethod] = useState("train-number")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showNotificationBanner, setShowNotificationBanner] = useState(true)
  const [trackingResults, setTrackingResults] = useState<null | {
    trainNumber: string
    trainName: string
    currentStation: string
    nextStation: string
    delay: string
    etaNextStation: string
    lastUpdated: string
    status: "on-time" | "delayed" | "arrived"
    journeyProgress: number
    route: {
      station: string
      stationCode: string
      status: "completed" | "current" | "upcoming"
      scheduledArrival: string
      actualArrival?: string
      scheduledDeparture: string
      actualDeparture?: string
      platform?: string
      delay?: string
      distance?: number
      day?: number
    }[]
  }>(null)

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            return 100
          }
          return Math.min(oldProgress + 10, 100)
        })
      }, 150)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setProgress(0)

    // Simulate API call
    setTimeout(() => {
      setTrackingResults({
        trainNumber: "12345",
        trainName: "Rajdhani Express",
        currentStation: "Nagpur Junction",
        nextStation: "Bhopal Junction",
        delay: "15 min",
        etaNextStation: "17:45",
        lastUpdated: "16:30",
        status: "delayed",
        journeyProgress: 40,
        route: [
          {
            station: "New Delhi",
            stationCode: "NDLS",
            status: "completed",
            scheduledArrival: "--",
            scheduledDeparture: "10:30",
            actualDeparture: "10:32",
            platform: "5",
            delay: "2 min",
            distance: 0,
            day: 1,
          },
          {
            station: "Agra Cantt",
            stationCode: "AGC",
            status: "completed",
            scheduledArrival: "12:42",
            actualArrival: "12:45",
            scheduledDeparture: "12:47",
            actualDeparture: "12:50",
            platform: "3",
            delay: "3 min",
            distance: 188,
            day: 1,
          },
          {
            station: "Nagpur Junction",
            stationCode: "NGP",
            status: "current",
            scheduledArrival: "16:15",
            actualArrival: "16:25",
            scheduledDeparture: "16:20",
            platform: "2",
            delay: "15 min",
            distance: 832,
            day: 1,
          },
          {
            station: "Bhopal Junction",
            stationCode: "BPL",
            status: "upcoming",
            scheduledArrival: "17:30",
            scheduledDeparture: "17:35",
            platform: "1",
            distance: 1045,
            day: 1,
          },
          {
            station: "Mumbai Central",
            stationCode: "MMCT",
            status: "upcoming",
            scheduledArrival: "21:40",
            scheduledDeparture: "--",
            distance: 1543,
            day: 1,
          },
        ],
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-primary">Track Your Train</h1>
        <p className="text-gray-500 mt-2">Get real-time information about your train's location and status</p>
      </motion.div>

      {showNotificationBanner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start justify-between"
        >
          <div className="flex items-start">
            <Bell className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-700">Enable Train Alerts</h3>
              <p className="text-sm text-gray-600 mt-1">
                Get notified about train delays, platform changes, and arrival updates directly on your device.
              </p>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <Button size="sm" variant="outline" className="text-xs" onClick={() => setShowNotificationBanner(false)}>
              Later
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
              Enable Alerts
            </Button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="w-full max-w-3xl mx-auto overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center">
              <Train className="mr-2 h-5 w-5" />
              Track Train Status
            </CardTitle>
            <CardDescription>Get live train running status by entering train number or name</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs
              defaultValue="train-number"
              value={trainSearchMethod}
              onValueChange={setTrainSearchMethod}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="train-number">By Train Number</TabsTrigger>
                <TabsTrigger value="train-name">By Train Name</TabsTrigger>
              </TabsList>

              <TabsContent value="train-number">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="train-number">Train Number</Label>
                      <div className="relative">
                        <Input
                          id="train-number"
                          placeholder="Enter 5 digit train number (e.g., 12345)"
                          className="pl-10"
                          required
                        />
                        <Train className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="journey-date">Journey Date</Label>
                      <div className="relative">
                        <Input id="journey-date" type="date" className="pl-10" required />
                        <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Searching...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="mr-2 h-4 w-4" />
                          Get Train Status
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="train-name">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="train-name">Train Name</Label>
                      <div className="relative">
                        <Input
                          id="train-name"
                          placeholder="Enter train name (e.g., Rajdhani Express)"
                          className="pl-10"
                          required
                        />
                        <Train className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="source-station">Source Station</Label>
                        <div className="relative">
                          <Input id="source-station" placeholder="Enter source station" className="pl-10" required />
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="destination-station">Destination Station</Label>
                        <div className="relative">
                          <Input
                            id="destination-station"
                            placeholder="Enter destination station"
                            className="pl-10"
                            required
                          />
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="journey-date-name">Journey Date</Label>
                      <div className="relative">
                        <Input id="journey-date-name" type="date" className="pl-10" required />
                        <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Searching...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="mr-2 h-4 w-4" />
                          Get Train Status
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          {isLoading && (
            <div className="px-6 pb-6">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center mt-2 text-gray-500">Fetching train information...</p>
            </div>
          )}
        </Card>
      </motion.div>

      {trackingResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="w-full max-w-5xl mx-auto overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{trackingResults.trainName}</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Train Number: {trackingResults.trainNumber}
                  </CardDescription>
                </div>
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-white text-sm font-medium",
                    trackingResults.status === "on-time"
                      ? "bg-green-500"
                      : trackingResults.status === "delayed"
                        ? "bg-amber-500"
                        : "bg-blue-500",
                  )}
                >
                  {trackingResults.status === "on-time"
                    ? "On Time"
                    : trackingResults.status === "delayed"
                      ? `Delayed by ${trackingResults.delay}`
                      : "Arrived"}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 bg-primary/5 border-b">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Current Station</span>
                    <span className="font-semibold">{trackingResults.currentStation}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Next Station</span>
                    <span className="font-semibold">{trackingResults.nextStation}</span>
                    <span className="text-sm text-primary">ETA: {trackingResults.etaNextStation}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Last Updated</span>
                    <span className="font-semibold">{trackingResults.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Route Information</h3>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Bell className="h-4 w-4" />
                            <span className="hidden sm:inline">Set Alert</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Get notified when train arrives at a station</p>
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
                          <p>Download train schedule</p>
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
                          <p>Share train status</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Live Train Map */}
                <div className="mb-8 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Live Train Position</h4>
                  <div className="relative h-20 mb-4">
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 -translate-y-1/2"></div>

                    {/* Progress bar */}
                    <div
                      className="absolute left-0 top-1/2 h-1 bg-primary -translate-y-1/2 transition-all duration-1000"
                      style={{ width: `${trackingResults.journeyProgress}%` }}
                    ></div>

                    {/* Source Station */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">New Delhi</span>
                      <span className="text-xs text-gray-500">(NDLS)</span>
                    </div>

                    {/* Current Station */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                      style={{ left: `${trackingResults.journeyProgress}%` }}
                    >
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 animate-pulse mb-1"></div>
                      <span className="text-xs font-medium text-primary whitespace-nowrap">Nagpur Junction</span>
                      <Badge variant="outline" className="text-xs mt-1">
                        Current Location
                      </Badge>
                    </div>

                    {/* Destination Station */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-400 mb-1"></div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">Mumbai Central</span>
                      <span className="text-xs text-gray-500">(MMCT)</span>
                    </div>

                    {/* Train Icon */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-8 transition-all duration-1000"
                      style={{ left: `${trackingResults.journeyProgress}%` }}
                    >
                      <div className="bg-primary text-white p-1 rounded-full">
                        <Train className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Departed: 10:30</span>
                    <span>Journey Progress: {trackingResults.journeyProgress}%</span>
                    <span>ETA: 21:40</span>
                  </div>
                </div>

                {/* Vertical timeline */}
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-[46px] top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

                  {/* Stations */}
                  <div className="space-y-8">
                    {trackingResults.route.map((station, index) => (
                      <div key={index} className="relative flex items-start gap-4">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full z-10 mt-0.5 flex items-center justify-center",
                            station.status === "completed"
                              ? "bg-green-500"
                              : station.status === "current"
                                ? "bg-primary ring-4 ring-primary/20"
                                : "bg-gray-200",
                          )}
                        >
                          {station.status === "completed" && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          )}
                          {station.status === "current" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>

                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4">
                            <div className="md:col-span-2">
                              <h4 className="font-medium text-gray-900">{station.station}</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs text-gray-500">{station.stationCode}</span>
                                {station.platform && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                    Platform {station.platform}
                                  </span>
                                )}
                                {station.status === "current" && (
                                  <Badge className="text-xs" variant="secondary">
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500">Arrival</div>
                              <div className="font-medium">{station.scheduledArrival}</div>
                              {station.actualArrival && (
                                <div className={cn("text-xs", station.delay ? "text-amber-600" : "text-green-600")}>
                                  Actual: {station.actualArrival}
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-sm text-gray-500">Departure</div>
                              <div className="font-medium">{station.scheduledDeparture}</div>
                              {station.actualDeparture && (
                                <div className={cn("text-xs", station.delay ? "text-amber-600" : "text-green-600")}>
                                  Actual: {station.actualDeparture}
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-sm text-gray-500">Distance</div>
                              <div className="font-medium">{station.distance} km</div>
                            </div>

                            <div>
                              {station.delay && (
                                <div className="text-sm text-amber-600 font-medium">Delayed by {station.delay}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t py-4 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                Delays may occur due to operational reasons
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="auto">
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <SelectValue placeholder="Refresh Rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Refresh</SelectItem>
                    <SelectItem value="auto">Auto (5 minutes)</SelectItem>
                    <SelectItem value="fast">Fast (1 minute)</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8">
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Refresh Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {!trackingResults && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center py-12"
        >
          <div className="flex flex-col items-center justify-center text-gray-500 max-w-md mx-auto">
            <Train className="h-16 w-16 mb-4 text-primary/40" />
            <h3 className="text-xl font-medium mb-2">Track Your Train</h3>
            <p className="mb-4">
              Enter your train details to get live running status, platform information, and estimated arrival times.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center mt-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <SearchIcon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm">Search Train</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm">Live Status</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm">Station Info</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

