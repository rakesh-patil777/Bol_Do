"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, AlertCircle, Clock, Calendar, Train, MapPin, Users, ArrowRight, Loader2, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock PNR data for demonstration
const mockPnrData = {
  "1234567890": {
    pnrNumber: "1234567890",
    trainNumber: "12301",
    trainName: "Howrah - New Delhi Rajdhani Express",
    dateOfJourney: "2025-03-23",
    fromStation: "HOWRAH JN (HWH)",
    toStation: "NEW DELHI (NDLS)",
    boardingPoint: "HOWRAH JN (HWH)",
    reservationUpTo: "NEW DELHI (NDLS)",
    class: "3A",
    chartStatus: "CHART PREPARED",
    passengers: [
      { number: 1, bookingStatus: "RAC 21", currentStatus: "CONFIRMED (B4,45)" },
      { number: 2, bookingStatus: "RAC 22", currentStatus: "CONFIRMED (B4,48)" },
    ],
    expectedArrival: "2025-03-23 10:05",
  },
  "9876543210": {
    pnrNumber: "9876543210",
    trainNumber: "12952",
    trainName: "New Delhi - Mumbai Central Rajdhani Express",
    dateOfJourney: "2025-03-23",
    fromStation: "NEW DELHI (NDLS)",
    toStation: "MUMBAI CENTRAL (MMCT)",
    boardingPoint: "NEW DELHI (NDLS)",
    reservationUpTo: "MUMBAI CENTRAL (MMCT)",
    class: "2A",
    chartStatus: "CHART NOT PREPARED",
    passengers: [
      { number: 1, bookingStatus: "CONFIRMED (A1,12)", currentStatus: "CONFIRMED (A1,12)" },
      { number: 2, bookingStatus: "CONFIRMED (A1,15)", currentStatus: "CONFIRMED (A1,15)" },
      { number: 3, bookingStatus: "CONFIRMED (A1,18)", currentStatus: "CONFIRMED (A1,18)" },
    ],
    expectedArrival: "2025-03-23 08:35",
  },
  "5678901234": {
    pnrNumber: "5678901234",
    trainNumber: "12259",
    trainName: "Sealdah - New Delhi Duronto Express",
    dateOfJourney: "2025-03-22",
    fromStation: "SEALDAH (SDAH)",
    toStation: "NEW DELHI (NDLS)",
    boardingPoint: "SEALDAH (SDAH)",
    reservationUpTo: "NEW DELHI (NDLS)",
    class: "SL",
    chartStatus: "CHART PREPARED",
    passengers: [
      { number: 1, bookingStatus: "WL 15", currentStatus: "WL 5" },
      { number: 2, bookingStatus: "WL 16", currentStatus: "WL 6" },
    ],
    expectedArrival: "2025-03-22 12:20",
  },
}

// Status colors
const getStatusColor = (status: string) => {
  if (status.includes("CONFIRMED")) return "text-green-600"
  if (status.includes("RAC")) return "text-amber-600"
  if (status.includes("WL")) return "text-red-600"
  return "text-gray-600"
}

// Status badges
const getStatusBadge = (status: string) => {
  if (status.includes("CONFIRMED")) {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>
  }
  if (status.includes("RAC")) {
    return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>
  }
  if (status.includes("WL")) {
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>
  }
  return <Badge variant="outline">{status}</Badge>
}

export default function PnrStatusPage() {
  const [pnrNumber, setPnrNumber] = useState("")
  const [captchaValue, setCaptchaValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [pnrResult, setPnrResult] = useState<(typeof mockPnrData)[keyof typeof mockPnrData] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [captchaText, setCaptchaText] = useState("XR42P")
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
    setCaptchaValue("")
  }

  const handlePnrSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate PNR number
    if (pnrNumber.length !== 10 || !/^\d+$/.test(pnrNumber)) {
      setError("Please enter a valid 10-digit PNR number")
      return
    }

    // Validate captcha
    if (captchaValue.toUpperCase() !== captchaText) {
      setError("Invalid captcha. Please try again.")
      generateCaptcha()
      return
    }

    setError(null)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const result = mockPnrData[pnrNumber as keyof typeof mockPnrData]

      if (result) {
        setPnrResult(result)
        // Add to recent searches if not already there
        if (!recentSearches.includes(pnrNumber)) {
          setRecentSearches((prev) => [pnrNumber, ...prev].slice(0, 5))
        }
      } else {
        setError("PNR not found. Please check the number and try again.")
        setPnrResult(null)
      }

      setIsLoading(false)
    }, 1500)
  }

  const handleRecentSearch = (pnr: string) => {
    setPnrNumber(pnr)
    generateCaptcha()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <Image src="/images/bg_1.jpeg" alt="PNR Status Enquiry" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/30 flex flex-col justify-center px-6 md:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">PNR Status Enquiry</h1>
            <p className="mt-4 text-xl text-white/90 max-w-2xl">
              Check the current status of your train ticket with PNR number
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="pnr" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="pnr">PNR Status</TabsTrigger>
              <TabsTrigger value="info">PNR Information</TabsTrigger>
            </TabsList>

            <TabsContent value="pnr">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* PNR Form */}
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Enter PNR Details</CardTitle>
                      <CardDescription>Check the current status of your ticket</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePnrSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="pnr" className="text-sm font-medium">
                            PNR Number
                          </label>
                          <Input
                            id="pnr"
                            placeholder="Enter 10-digit PNR number"
                            value={pnrNumber}
                            onChange={(e) => setPnrNumber(e.target.value)}
                            maxLength={10}
                            className="font-mono"
                          />
                          <p className="text-xs text-gray-500">Example: 1234567890</p>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="captcha" className="text-sm font-medium">
                            Enter Captcha
                          </label>
                          <div className="flex items-center space-x-2">
                            <div
                              className="bg-gray-200 p-2 rounded font-bold text-lg tracking-wider w-28 text-center select-none"
                              style={{ fontFamily: "monospace" }}
                            >
                              {captchaText}
                            </div>
                            <Button type="button" variant="outline" size="icon" onClick={generateCaptcha}>
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            id="captcha"
                            placeholder="Enter captcha"
                            value={captchaValue}
                            onChange={(e) => setCaptchaValue(e.target.value)}
                            maxLength={5}
                            className="font-mono"
                          />
                        </div>

                        {error && (
                          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm flex items-start">
                            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                          </div>
                        )}

                        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Checking...
                            </>
                          ) : (
                            <>
                              <Search className="mr-2 h-4 w-4" />
                              Get PNR Status
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Searches</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {recentSearches.map((pnr, index) => (
                            <li key={index}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                                onClick={() => handleRecentSearch(pnr)}
                              >
                                <Search className="mr-2 h-4 w-4" />
                                {pnr}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* PNR Result */}
                <div className="md:col-span-2">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full py-16">
                      <Loader2 className="h-12 w-12 text-blue-700 animate-spin mb-4" />
                      <p className="text-lg font-medium text-gray-700">Fetching PNR Status...</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Please wait while we retrieve your ticket information
                      </p>
                    </div>
                  ) : pnrResult ? (
                    <Card>
                      <CardHeader className="bg-blue-50 border-b">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">PNR Status</CardTitle>
                            <CardDescription>
                              PNR Number: <span className="font-mono font-medium">{pnrResult.pnrNumber}</span>
                            </CardDescription>
                          </div>
                          <Badge variant={pnrResult.chartStatus.includes("NOT") ? "outline" : "default"}>
                            {pnrResult.chartStatus}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {/* Train Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center">
                              <Train className="h-5 w-5 mr-2 text-blue-700" />
                              Train Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Train Number</p>
                                <p className="font-medium">{pnrResult.trainNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Train Name</p>
                                <p className="font-medium">{pnrResult.trainName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Date of Journey</p>
                                <p className="font-medium flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-blue-700" />
                                  {new Date(pnrResult.dateOfJourney).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Class</p>
                                <p className="font-medium">{pnrResult.class}</p>
                              </div>
                            </div>
                          </div>

                          {/* Journey Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center">
                              <MapPin className="h-5 w-5 mr-2 text-blue-700" />
                              Journey Information
                            </h3>
                            <div className="relative">
                              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                              <div className="grid grid-cols-1 gap-6 relative z-10">
                                <div className="flex">
                                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <div className="h-3 w-3 rounded-full bg-blue-700"></div>
                                  </div>
                                  <div>
                                    <p className="font-medium">{pnrResult.fromStation}</p>
                                    <p className="text-sm text-gray-500">From Station</p>
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                    <div className="h-3 w-3 rounded-full bg-green-700"></div>
                                  </div>
                                  <div>
                                    <p className="font-medium">{pnrResult.toStation}</p>
                                    <p className="text-sm text-gray-500">To Station</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-gray-500">Boarding Point</p>
                                <p className="font-medium">{pnrResult.boardingPoint}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Reservation Up To</p>
                                <p className="font-medium">{pnrResult.reservationUpTo}</p>
                              </div>
                            </div>
                          </div>

                          {/* Passenger Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center">
                              <Users className="h-5 w-5 mr-2 text-blue-700" />
                              Passenger Status
                            </h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      No.
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Booking Status
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Current Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {pnrResult.passengers.map((passenger, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Passenger {passenger.number}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getStatusBadge(passenger.bookingStatus)}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={getStatusColor(passenger.currentStatus)}>
                                          {getStatusBadge(passenger.currentStatus)}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Expected Arrival */}
                          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                            <Clock className="h-5 w-5 text-blue-700 mr-3" />
                            <div>
                              <p className="text-sm text-gray-600">Expected Arrival</p>
                              <p className="font-medium">
                                {new Date(pnrResult.expectedArrival).toLocaleString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 border-t">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-blue-700" />
                          <span>This information is subject to change. Please check again before your journey.</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm border p-8 h-full flex flex-col items-center justify-center text-center">
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-blue-700" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Check Your PNR Status</h3>
                      <p className="text-gray-600 max-w-md">
                        Enter your 10-digit PNR number to check the current status of your train ticket. You can find
                        your PNR number on your ticket or booking confirmation.
                      </p>
                      <div className="mt-6 text-sm text-gray-500">
                        <p>For testing, try these PNR numbers:</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                          {Object.keys(mockPnrData).map((pnr, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => handleRecentSearch(pnr)}
                            >
                              {pnr}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>About PNR Status</CardTitle>
                  <CardDescription>Understanding your Passenger Name Record (PNR) status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What is a PNR Number?</h3>
                    <p className="text-gray-600">
                      A PNR (Passenger Name Record) is a unique 10-digit number assigned to every train ticket booked
                      through Indian Railways. This number serves as a reference for your booking and can be used to
                      check the current status of your ticket.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Understanding Ticket Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Badge className="bg-green-100 text-green-800 mt-1">CNF/CONFIRMED</Badge>
                        <p className="ml-3 text-gray-600">
                          Your seat has been confirmed and a specific seat/berth has been allocated to you.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Badge className="bg-amber-100 text-amber-800 mt-1">RAC</Badge>
                        <p className="ml-3 text-gray-600">
                          Reservation Against Cancellation. You have been provided shared accommodation and may get a
                          confirmed berth if there are cancellations.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Badge className="bg-red-100 text-red-800 mt-1">WL</Badge>
                        <p className="ml-3 text-gray-600">
                          Waitlisted. Your ticket is on the waiting list and you will get a seat/berth only if confirmed
                          passengers cancel their tickets.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How to find your PNR number?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-2">Your PNR number can be found:</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>On the top left corner of your printed ticket</li>
                          <li>In the SMS/email confirmation sent to you after booking</li>
                          <li>In your IRCTC account under "Booked Tickets" section</li>
                          <li>On e-tickets, it's usually displayed prominently at the top</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>When to check PNR status?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-2">It's recommended to check your PNR status:</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>Immediately after booking to confirm your reservation</li>
                          <li>A few days before your journey to check for any updates</li>
                          <li>A day before your journey to see the final status</li>
                          <li>After chart preparation (usually 4 hours before departure)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>What is Chart Preparation?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Chart preparation is the final allocation of seats/berths to passengers. It usually happens
                          about 4 hours before the train's departure. After chart preparation, the final status of your
                          ticket is fixed and no more automatic upgrades will happen. However, you can still approach
                          the onboard Ticket Examiner for any available seats due to no-shows.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

