"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plane, ArrowRight, Wifi, Coffee, Monitor, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Flight data
const flights = [
  {
    id: "1",
    airline: "Air India",
    flightNumber: "AI-102",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "06:00",
    arrivalTime: "08:10",
    duration: "2h 10m",
    price: 4599,
    stops: 0,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Airbus A320",
    amenities: ["wifi", "food", "entertainment"],
    cabinClass: "Economy",
    seatsAvailable: 24,
    refundable: true,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
  {
    id: "2",
    airline: "IndiGo",
    flightNumber: "6E-6841",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "07:15",
    arrivalTime: "09:35",
    duration: "2h 20m",
    price: 3999,
    stops: 0,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Airbus A320neo",
    amenities: ["food"],
    cabinClass: "Economy",
    seatsAvailable: 12,
    refundable: false,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
  {
    id: "3",
    airline: "Vistara",
    flightNumber: "UK-945",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "09:30",
    arrivalTime: "11:45",
    duration: "2h 15m",
    price: 5299,
    stops: 0,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "food", "entertainment"],
    cabinClass: "Economy",
    seatsAvailable: 8,
    refundable: true,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
  {
    id: "4",
    airline: "SpiceJet",
    flightNumber: "SG-8169",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "11:20",
    arrivalTime: "13:40",
    duration: "2h 20m",
    price: 3799,
    stops: 0,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Boeing 737",
    amenities: [],
    cabinClass: "Economy",
    seatsAvailable: 32,
    refundable: false,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
  {
    id: "5",
    airline: "Air India",
    flightNumber: "AI-665",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "14:00",
    arrivalTime: "18:00",
    duration: "4h 00m",
    price: 4199,
    stops: 1,
    stopDetails: {
      airport: "Jaipur (JAI)",
      duration: "1h 30m",
    },
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Airbus A321",
    amenities: ["wifi", "food", "entertainment"],
    cabinClass: "Economy",
    seatsAvailable: 16,
    refundable: true,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
  {
    id: "6",
    airline: "IndiGo",
    flightNumber: "6E-5392",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "16:45",
    arrivalTime: "19:05",
    duration: "2h 20m",
    price: 4299,
    stops: 0,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Airbus A320neo",
    amenities: ["food"],
    cabinClass: "Economy",
    seatsAvailable: 6,
    refundable: false,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
  {
    id: "7",
    airline: "Vistara",
    flightNumber: "UK-963",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "19:30",
    arrivalTime: "21:50",
    duration: "2h 20m",
    price: 5999,
    stops: 0,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "food", "entertainment"],
    cabinClass: "Premium Economy",
    seatsAvailable: 4,
    refundable: true,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
  {
    id: "8",
    airline: "Air India",
    flightNumber: "AI-805",
    from: "New Delhi",
    to: "Mumbai",
    departureTime: "21:15",
    arrivalTime: "23:30",
    duration: "2h 15m",
    price: 4099,
    stops: 0,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    aircraft: "Airbus A320",
    amenities: ["food", "entertainment"],
    cabinClass: "Economy",
    seatsAvailable: 18,
    refundable: true,
    departureAirport: "DEL",
    arrivalAirport: "BOM",
  },
]

// Airlines
const airlines = [
  { id: "air-india", name: "Air India" },
  { id: "indigo", name: "IndiGo" },
  { id: "vistara", name: "Vistara" },
  { id: "spicejet", name: "SpiceJet" },
]

export default function FlightListPage() {
  const [priceRange, setPriceRange] = useState([3000, 6000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [stops, setStops] = useState<string[]>([])
  const [departureTime, setDepartureTime] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("price-low")
  const [filteredFlights, setFilteredFlights] = useState(flights)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter flights based on selected filters
    const filtered = flights.filter((flight) => {
      // Price filter
      const matchesPrice = flight.price >= priceRange[0] && flight.price <= priceRange[1]

      // Airline filter
      const matchesAirline =
        selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline.toLowerCase().replace(/\s+/g, "-"))

      // Stops filter
      const matchesStops =
        stops.length === 0 ||
        (stops.includes("non-stop") && flight.stops === 0) ||
        (stops.includes("1-stop") && flight.stops === 1) ||
        (stops.includes("2-stops") && flight.stops === 2)

      // Departure time filter
      const hour = Number.parseInt(flight.departureTime.split(":")[0])
      const matchesDepartureTime =
        departureTime.length === 0 ||
        (departureTime.includes("morning") && hour >= 6 && hour < 12) ||
        (departureTime.includes("afternoon") && hour >= 12 && hour < 18) ||
        (departureTime.includes("evening") && hour >= 18 && hour < 24) ||
        (departureTime.includes("night") && hour >= 0 && hour < 6)

      return matchesPrice && matchesAirline && matchesStops && matchesDepartureTime
    })

    // Sort flights
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => {
        const durationA =
          Number.parseInt(a.duration.split("h")[0]) * 60 +
          Number.parseInt(a.duration.split("h")[1].split("m")[0].trim())
        const durationB =
          Number.parseInt(b.duration.split("h")[0]) * 60 +
          Number.parseInt(b.duration.split("h")[1].split("m")[0].trim())
        return durationA - durationB
      })
    } else if (sortBy === "departure") {
      filtered.sort((a, b) => {
        const timeA = Number.parseInt(a.departureTime.replace(":", ""))
        const timeB = Number.parseInt(b.departureTime.replace(":", ""))
        return timeA - timeB
      })
    } else if (sortBy === "arrival") {
      filtered.sort((a, b) => {
        const timeA = Number.parseInt(a.arrivalTime.replace(":", ""))
        const timeB = Number.parseInt(b.arrivalTime.replace(":", ""))
        return timeA - timeB
      })
    }

    setFilteredFlights(filtered)
  }, [priceRange, selectedAirlines, stops, departureTime, sortBy])

  const toggleAirline = (airlineId: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airlineId) ? prev.filter((id) => id !== airlineId) : [...prev, airlineId],
    )
  }

  const toggleStops = (stop: string) => {
    setStops((prev) => (prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]))
  }

  const toggleDepartureTime = (time: string) => {
    setDepartureTime((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  const toggleFlightDetails = (flightId: string) => {
    setExpandedFlightId((prev) => (prev === flightId ? null : flightId))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-gray-600">Searching for flights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-700 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Flight Search Results</h1>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="text-lg font-medium">New Delhi</div>
                  <ArrowRight className="mx-4 text-gray-400" />
                  <div className="text-lg font-medium">Mumbai</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">15 Oct, 2023 | 1 Traveller | Economy</div>
              </div>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => alert("Coming soon!")}>
                Modify Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPriceRange([3000, 6000])
                    setSelectedAirlines([])
                    setStops([])
                    setDepartureTime([])
                    setSortBy("price-low")
                  }}
                >
                  Reset All
                </Button>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹)</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[3000, 6000]}
                    min={3000}
                    max={6000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Airlines</h4>
                <div className="space-y-2">
                  {airlines.map((airline) => (
                    <div key={airline.id} className="flex items-center">
                      <Checkbox
                        id={airline.id}
                        checked={selectedAirlines.includes(airline.id)}
                        onCheckedChange={() => toggleAirline(airline.id)}
                      />
                      <Label htmlFor={airline.id} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {airline.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Stops</h4>
                <div className="space-y-2">
                  {[
                    { id: "non-stop", label: "Non-stop" },
                    { id: "1-stop", label: "1 Stop" },
                    { id: "2-stops", label: "2+ Stops" },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <Checkbox
                        id={`stops-${option.id}`}
                        checked={stops.includes(option.id)}
                        onCheckedChange={() => toggleStops(option.id)}
                      />
                      <Label htmlFor={`stops-${option.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Departure Time</h4>
                <div className="space-y-2">
                  {[
                    { id: "morning", label: "Morning (6 AM - 12 PM)" },
                    { id: "afternoon", label: "Afternoon (12 PM - 6 PM)" },
                    { id: "evening", label: "Evening (6 PM - 12 AM)" },
                    { id: "night", label: "Night (12 AM - 6 AM)" },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <Checkbox
                        id={`time-${option.id}`}
                        checked={departureTime.includes(option.id)}
                        onCheckedChange={() => toggleDepartureTime(option.id)}
                      />
                      <Label htmlFor={`time-${option.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Flight List */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{filteredFlights.length} Flights Available</h2>
                  <p className="text-sm text-gray-500">New Delhi to Mumbai | 15 Oct, 2023</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                      <SelectItem value="departure">Departure Time</SelectItem>
                      <SelectItem value="arrival">Arrival Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredFlights.length === 0 ? (
                <div className="text-center py-12">
                  <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                  <Button
                    onClick={() => {
                      setPriceRange([3000, 6000])
                      setSelectedAirlines([])
                      setStops([])
                      setDepartureTime([])
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFlights.map((flight) => (
                    <motion.div
                      key={flight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="w-12 h-12 relative mr-4">
                              <Image
                                src={flight.logo || "/placeholder.svg"}
                                alt={flight.airline}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{flight.airline}</div>
                              <div className="text-sm text-gray-500">
                                {flight.flightNumber} • {flight.aircraft}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
                            <div className="text-center">
                              <div className="font-bold">{flight.departureTime}</div>
                              <div className="text-sm text-gray-500">{flight.departureAirport}</div>
                            </div>

                            <div className="flex flex-col items-center">
                              <div className="text-xs text-gray-500">{flight.duration}</div>
                              <div className="relative w-24 md:w-32">
                                <div className="border-t border-gray-300 absolute top-1/2 w-full"></div>
                                {flight.stops === 0 ? (
                                  <div className="text-xs text-gray-500 text-center bg-white relative">Non-stop</div>
                                ) : (
                                  <div className="text-xs text-gray-500 text-center bg-white relative">
                                    {flight.stops} Stop
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="font-bold">{flight.arrivalTime}</div>
                              <div className="text-sm text-gray-500">{flight.arrivalAirport}</div>
                            </div>

                            <div className="md:ml-auto text-right">
                              <div className="text-2xl font-bold text-blue-700">₹{flight.price}</div>
                              <div className="text-xs text-gray-500">per person</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {flight.amenities.includes("wifi") && (
                            <Badge variant="outline" className="text-blue-700 border-blue-700">
                              <Wifi className="h-3 w-3 mr-1" />
                              Wi-Fi
                            </Badge>
                          )}
                          {flight.amenities.includes("food") && (
                            <Badge variant="outline" className="text-blue-700 border-blue-700">
                              <Coffee className="h-3 w-3 mr-1" />
                              Meals
                            </Badge>
                          )}
                          {flight.amenities.includes("entertainment") && (
                            <Badge variant="outline" className="text-blue-700 border-blue-700">
                              <Monitor className="h-3 w-3 mr-1" />
                              Entertainment
                            </Badge>
                          )}
                          {flight.refundable && (
                            <Badge variant="outline" className="text-green-700 border-green-700">
                              Refundable
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-700"
                            onClick={() => toggleFlightDetails(flight.id)}
                          >
                            {expandedFlightId === flight.id ? (
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
                          <Link href="/payment">
                            <Button className="bg-blue-700 hover:bg-blue-800">Book Now</Button>
                          </Link>
                        </div>
                      </div>

                      {expandedFlightId === flight.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-50 p-4 border-t border-gray-200"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Flight Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Aircraft</span>
                                  <span>{flight.aircraft}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Class</span>
                                  <span>{flight.cabinClass}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Seats Available</span>
                                  <span>{flight.seatsAvailable}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Refundable</span>
                                  <span>{flight.refundable ? "Yes" : "No"}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Baggage Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Cabin Baggage</span>
                                  <span>7 kg</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Check-in Baggage</span>
                                  <span>15 kg</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Fare Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Base Fare</span>
                                  <span>₹{(flight.price * 0.8).toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Taxes & Fees</span>
                                  <span>₹{(flight.price * 0.2).toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                  <span>Total Fare</span>
                                  <span>₹{flight.price}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {flight.stops > 0 && flight.stopDetails && (
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <h4 className="font-medium text-gray-900 mb-2">Layover Details</h4>
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
                                <div className="ml-2">
                                  <div className="font-medium">{flight.stopDetails.airport}</div>
                                  <div className="text-sm text-gray-500">Layover: {flight.stopDetails.duration}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

