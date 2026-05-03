"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Search, Calendar, Train, Download, Printer, ChevronDown, ChevronUp, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

export default function OnlineChartsPage() {
  const [activeTab, setActiveTab] = useState("train-number")
  const [trainNumber, setTrainNumber] = useState("")
  const [journeyDate, setJourneyDate] = useState("")
  const [boardingStation, setBoardingStation] = useState("")
  const [chartPrepared, setChartPrepared] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [expandedCoach, setExpandedCoach] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      setShowResults(true)
    }, 1000)
  }

  const toggleCoachDetails = (coachId: string) => {
    setExpandedCoach(expandedCoach === coachId ? null : coachId)
  }

  const coaches = [
    { id: "S1", type: "Sleeper", totalSeats: 72, availableSeats: 12, racSeats: 4, wlSeats: 8 },
    { id: "S2", type: "Sleeper", totalSeats: 72, availableSeats: 8, racSeats: 6, wlSeats: 12 },
    { id: "S3", type: "Sleeper", totalSeats: 72, availableSeats: 0, racSeats: 8, wlSeats: 15 },
    { id: "A1", type: "AC 3-Tier", totalSeats: 64, availableSeats: 5, racSeats: 2, wlSeats: 4 },
    { id: "A2", type: "AC 3-Tier", totalSeats: 64, availableSeats: 0, racSeats: 4, wlSeats: 7 },
    { id: "B1", type: "AC 2-Tier", totalSeats: 46, availableSeats: 2, racSeats: 0, wlSeats: 3 },
  ]

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Online Train Charts</h1>
          <p className="text-gray-500 mt-2">View coach position, seat layout, and vacancy information</p>
        </div>

        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Train Chart Enquiry
            </CardTitle>
            <CardDescription>Check seat availability and coach position for your journey</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="train-number" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="train-number">By Train Number</TabsTrigger>
                <TabsTrigger value="train-name">By Train Name</TabsTrigger>
              </TabsList>

              <TabsContent value="train-number">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="train-number">Train Number</Label>
                      <div className="relative">
                        <Input
                          id="train-number"
                          placeholder="Enter 5 digit train number"
                          value={trainNumber}
                          onChange={(e) => setTrainNumber(e.target.value)}
                          className="pl-10"
                          required
                        />
                        <Train className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="journey-date">Journey Date</Label>
                      <div className="relative">
                        <Input
                          id="journey-date"
                          type="date"
                          value={journeyDate}
                          onChange={(e) => setJourneyDate(e.target.value)}
                          className="pl-10"
                          required
                        />
                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="boarding-station">Boarding Station (Optional)</Label>
                    <div className="relative">
                      <Input
                        id="boarding-station"
                        placeholder="Enter boarding station code"
                        value={boardingStation}
                        onChange={(e) => setBoardingStation(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chart Preparation Status</Label>
                    <RadioGroup
                      defaultValue="all"
                      className="flex flex-wrap gap-4"
                      onValueChange={(value) => setChartPrepared(value === "prepared")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="cursor-pointer">
                          All
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prepared" id="prepared" />
                        <Label htmlFor="prepared" className="cursor-pointer">
                          Chart Prepared
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-prepared" id="not-prepared" />
                        <Label htmlFor="not-prepared" className="cursor-pointer">
                          Chart Not Prepared
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Get Chart Details
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="train-name">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
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

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="source-station">Source Station</Label>
                      <Input id="source-station" placeholder="Enter source station" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination-station">Destination Station</Label>
                      <Input id="destination-station" placeholder="Enter destination station" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="journey-date-name">Journey Date</Label>
                    <div className="relative">
                      <Input id="journey-date-name" type="date" className="pl-10" required />
                      <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chart Preparation Status</Label>
                    <RadioGroup defaultValue="all" className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all-name" />
                        <Label htmlFor="all-name" className="cursor-pointer">
                          All
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prepared" id="prepared-name" />
                        <Label htmlFor="prepared-name" className="cursor-pointer">
                          Chart Prepared
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-prepared" id="not-prepared-name" />
                        <Label htmlFor="not-prepared-name" className="cursor-pointer">
                          Chart Not Prepared
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Get Chart Details
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="mb-6">
              <CardHeader className="bg-primary text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Rajdhani Express (12951)</CardTitle>
                    <CardDescription className="text-white/80">
                      Mumbai Central - New Delhi | {journeyDate || "23rd March,2025"}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-white text-primary">
                    Chart Prepared
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 bg-primary/5 border-b">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="font-semibold">Mumbai Central - 16:35</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="font-semibold">New Delhi - 08:35</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Journey Time</p>
                      <p className="font-semibold">16h 00m</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Coach Position & Availability</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Coach
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Type
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total Seats
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Available
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                RAC
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Waiting List
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {coaches.map((coach) => (
                              <>
                                <tr key={coach.id} className={expandedCoach === coach.id ? "bg-blue-50" : ""}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {coach.id}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coach.type}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {coach.totalSeats}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {coach.availableSeats > 0 ? (
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {coach.availableSeats} Available
                                      </span>
                                    ) : (
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Not Available
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {coach.racSeats > 0 ? `RAC ${coach.racSeats}` : "-"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {coach.wlSeats > 0 ? `WL ${coach.wlSeats}` : "-"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleCoachDetails(coach.id)}
                                      className="text-primary hover:text-primary-dark"
                                    >
                                      {expandedCoach === coach.id ? (
                                        <>
                                          Hide Details
                                          <ChevronUp className="ml-1 h-4 w-4" />
                                        </>
                                      ) : (
                                        <>
                                          View Details
                                          <ChevronDown className="ml-1 h-4 w-4" />
                                        </>
                                      )}
                                    </Button>
                                  </td>
                                </tr>
                                {expandedCoach === coach.id && (
                                  <tr>
                                    <td colSpan={7} className="px-6 py-4 bg-blue-50">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <h4 className="font-medium text-sm mb-2">Coach Position</h4>
                                          <div className="flex items-center space-x-1 overflow-x-auto pb-2">
                                            {[
                                              "ENG",
                                              "SLR",
                                              "A1",
                                              "A2",
                                              "B1",
                                              "S1",
                                              "S2",
                                              "S3",
                                              "S4",
                                              "S5",
                                              "GEN",
                                              "SLR",
                                            ].map((c, i) => (
                                              <div
                                                key={i}
                                                className={`flex-shrink-0 w-12 h-8 flex items-center justify-center text-xs border rounded ${
                                                  c === coach.id
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white text-gray-700 border-gray-300"
                                                }`}
                                              >
                                                {c}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-sm mb-2">Seat Layout</h4>
                                          <div className="flex items-center space-x-2">
                                            <Button variant="outline" size="sm">
                                              View Layout
                                            </Button>
                                            <span className="text-xs text-gray-500">
                                              {coach.type === "Sleeper"
                                                ? "Side Lower, Side Middle, Side Upper, Lower, Middle, Upper"
                                                : coach.type === "AC 3-Tier"
                                                  ? "Side Lower, Side Upper, Lower, Middle, Upper"
                                                  : "Side Lower, Side Upper, Lower, Upper"}
                                            </span>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-sm mb-2">Amenities</h4>
                                          <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline" className="text-xs">
                                              Charging Point
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                              Reading Light
                                            </Badge>
                                            {coach.type.includes("AC") && (
                                              <Badge variant="outline" className="text-xs">
                                                Blanket
                                              </Badge>
                                            )}
                                            {coach.type.includes("AC") && (
                                              <Badge variant="outline" className="text-xs">
                                                Pillow
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Important Information</h4>
                  <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-4">
                    <li>Chart preparation usually begins 4 hours before train departure</li>
                    <li>Seat numbers are subject to change until the final chart is prepared</li>
                    <li>RAC and Waitlisted passengers should check final chart before boarding</li>
                    <li>For any discrepancy, please contact the station master or call 139</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!showResults && (
          <div className="max-w-3xl mx-auto mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-16 w-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Train Chart Information</h3>
              <p className="text-gray-600 mb-6 max-w-lg">
                The train chart shows the coach composition and seat allocation for a specific train journey. It is
                prepared a few hours before the train's departure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 mx-auto mb-3">
                    1
                  </div>
                  <h4 className="font-medium text-center mb-2">Enter Train Details</h4>
                  <p className="text-sm text-gray-500 text-center">Provide train number or name and journey date</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 mx-auto mb-3">
                    2
                  </div>
                  <h4 className="font-medium text-center mb-2">View Coach Position</h4>
                  <p className="text-sm text-gray-500 text-center">Check the arrangement of coaches in the train</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 mx-auto mb-3">
                    3
                  </div>
                  <h4 className="font-medium text-center mb-2">Check Seat Details</h4>
                  <p className="text-sm text-gray-500 text-center">View seat availability and layout information</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

