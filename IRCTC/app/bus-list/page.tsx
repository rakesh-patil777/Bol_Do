"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Bus, ArrowRight, Filter, Users, Wifi, Coffee, ChevronDown, ChevronUp, MapPin, Zap, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Bus data
const buses = [
  {
    id: "1",
    operator: "Rajdhani Travels",
    busType: "Volvo A/C Sleeper (2+1)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "21:00",
    arrivalTime: "05:30",
    duration: "8h 30m",
    price: 1299,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["wifi", "charging", "water", "blanket"],
    rating: 4.5,
    reviews: 128,
    seatsAvailable: 14,
    departurePoint: "Kashmere Gate ISBT",
    arrivalPoint: "Sindhi Camp Bus Stand",
    cancellationPolicy: "Free cancellation before 12 hours of departure",
  },
  {
    id: "2",
    operator: "Shrinath Travels",
    busType: "Volvo A/C Seater (2+2)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "22:30",
    arrivalTime: "06:45",
    duration: "8h 15m",
    price: 999,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["charging", "water"],
    rating: 4.2,
    reviews: 96,
    seatsAvailable: 8,
    departurePoint: "Dhaula Kuan",
    arrivalPoint: "Sindhi Camp Bus Stand",
    cancellationPolicy: "75% refund before 6 hours of departure",
  },
  {
    id: "3",
    operator: "Ashok Travels",
    busType: "Mercedes A/C Sleeper (2+1)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "20:15",
    arrivalTime: "04:30",
    duration: "8h 15m",
    price: 1499,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["wifi", "charging", "water", "blanket", "snacks"],
    rating: 4.7,
    reviews: 156,
    seatsAvailable: 6,
    departurePoint: "Sarai Kale Khan ISBT",
    arrivalPoint: "Jaipur Central Bus Stand",
    cancellationPolicy: "Free cancellation before 24 hours of departure",
  },
  {
    id: "4",
    operator: "Mahalaxmi Travels",
    busType: "Non A/C Sleeper (2+1)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "19:00",
    arrivalTime: "04:00",
    duration: "9h 00m",
    price: 799,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["water"],
    rating: 3.8,
    reviews: 72,
    seatsAvailable: 22,
    departurePoint: "Anand Vihar ISBT",
    arrivalPoint: "Sindhi Camp Bus Stand",
    cancellationPolicy: "50% refund before 6 hours of departure",
  },
  {
    id: "5",
    operator: "Rajdhani Travels",
    busType: "Volvo A/C Sleeper (2+1)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "23:30",
    arrivalTime: "07:45",
    duration: "8h 15m",
    price: 1199,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["wifi", "charging", "water", "blanket"],
    rating: 4.4,
    reviews: 112,
    seatsAvailable: 10,
    departurePoint: "Kashmere Gate ISBT",
    arrivalPoint: "Jaipur Central Bus Stand",
    cancellationPolicy: "Free cancellation before 12 hours of departure",
  },
  {
    id: "6",
    operator: "Shrinath Travels",
    busType: "Volvo A/C Seater (2+2)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "18:00",
    arrivalTime: "02:30",
    duration: "8h 30m",
    price: 899,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["charging", "water"],
    rating: 4.0,
    reviews: 88,
    seatsAvailable: 16,
    departurePoint: "Dhaula Kuan",
    arrivalPoint: "Sindhi Camp Bus Stand",
    cancellationPolicy: "75% refund before 6 hours of departure",
  },
  {
    id: "7",
    operator: "Ashok Travels",
    busType: "Mercedes A/C Sleeper (2+1)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "16:30",
    arrivalTime: "01:00",
    duration: "8h 30m",
    price: 1399,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["wifi", "charging", "water", "blanket", "snacks"],
    rating: 4.6,
    reviews: 142,
    seatsAvailable: 4,
    departurePoint: "Sarai Kale Khan ISBT",
    arrivalPoint: "Jaipur Central Bus Stand",
    cancellationPolicy: "Free cancellation before 24 hours of departure",
  },
  {
    id: "8",
    operator: "Mahalaxmi Travels",
    busType: "Non A/C Sleeper (2+1)",
    from: "New Delhi",
    to: "Jaipur",
    departureTime: "17:45",
    arrivalTime: "03:00",
    duration: "9h 15m",
    price: 749,
    date: "2023-10-15",
    logo: "/placeholder.svg?height=40&width=40",
    amenities: ["water"],
    rating: 3.7,
    reviews: 64,
    seatsAvailable: 18,
    departurePoint: "Anand Vihar ISBT",
    arrivalPoint: "Sindhi Camp Bus Stand",
    cancellationPolicy: "50% refund before 6 hours of departure",
  },
]

// Bus operators
const operators = [
  { id: "rajdhani", name: "Rajdhani Travels" },
  { id: "shrinath", name: "Shrinath Travels" },
  { id: "ashok", name: "Ashok Travels" },
  { id: "mahalaxmi", name: "Mahalaxmi Travels" },
]

export default function BusListPage() {
  const [priceRange, setPriceRange] = useState([700, 1500])
  const [selectedOperators, setSelectedOperators] = useState<string[]>([])
  const [busType, setBusType] = useState<string[]>([])
  const [departureTime, setDepartureTime] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("price-low")
  const [filteredBuses, setFilteredBuses] = useState(buses)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter buses based on selected filters
    const filtered = buses.filter((bus) => {
      // Price filter
      const matchesPrice = bus.price >= priceRange[0] && bus.price <= priceRange[1]

      // Operator filter
      const matchesOperator =
        selectedOperators.length === 0 || selectedOperators.includes(bus.operator.toLowerCase().replace(/\s+/g, "-"))

      // Bus type filter
      const matchesBusType =
        busType.length === 0 ||
        (busType.includes("ac") && bus.busType.toLowerCase().includes("a/c")) ||
        (busType.includes("non-ac") && bus.busType.toLowerCase().includes("non a/c")) ||
        (busType.includes("sleeper") && bus.busType.toLowerCase().includes("sleeper")) ||
        (busType.includes("seater") && bus.busType.toLowerCase().includes("seater"))

      // Departure time filter
      const hour = Number.parseInt(bus.departureTime.split(":")[0])
      const matchesDepartureTime =
        departureTime.length === 0 ||
        (departureTime.includes("morning") && hour >= 6 && hour < 12) ||
        (departureTime.includes("afternoon") && hour >= 12 && hour < 18) ||
        (departureTime.includes("evening") && hour >= 18 && hour < 24) ||
        (departureTime.includes("night") && hour >= 0 && hour < 6)

      return matchesPrice && matchesOperator && matchesBusType && matchesDepartureTime
    })

    // Sort buses
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
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredBuses(filtered)
  }, [priceRange, selectedOperators, busType, departureTime, sortBy])

  const toggleOperator = (operatorId: string) => {
    setSelectedOperators((prev) =>
      prev.includes(operatorId) ? prev.filter((id) => id !== operatorId) : [...prev, operatorId],
    )
  }

  const toggleBusType = (type: string) => {
    setBusType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleDepartureTime = (time: string) => {
    setDepartureTime((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  const toggleBusDetails = (busId: string) => {
    setExpandedBusId((prev) => (prev === busId ? null : busId))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-gray-600">Searching for buses...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Bus Search Results</h1>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="text-lg font-medium">New Delhi</div>
                  <ArrowRight className="mx-4 text-gray-400" />
                  <div className="text-lg font-medium">Jaipur</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">15 Oct, 2023 | 1 Traveller</div>
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
                    setPriceRange([700, 1500])
                    setSelectedOperators([])
                    setBusType([])
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
                    defaultValue={[700, 1500]}
                    min={700}
                    max={1500}
                    step={50}
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
                <h4 className="text-sm font-medium text-gray-700 mb-2">Bus Operators</h4>
                <div className="space-y-2">
                  {operators.map((operator) => (
                    <div key={operator.id} className="flex items-center">
                      <Checkbox
                        id={operator.id}
                        checked={selectedOperators.includes(operator.id)}
                        onCheckedChange={() => toggleOperator(operator.id)}
                      />
                      <Label htmlFor={operator.id} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {operator.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Bus Type</h4>
                <div className="space-y-2">
                  {[
                    { id: "ac", label: "AC" },
                    { id: "non-ac", label: "Non-AC" },
                    { id: "sleeper", label: "Sleeper" },
                    { id: "seater", label: "Seater" },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <Checkbox
                        id={`type-${option.id}`}
                        checked={busType.includes(option.id)}
                        onCheckedChange={() => toggleBusType(option.id)}
                      />
                      <Label htmlFor={`type-${option.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
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

              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-blue-700 hover:bg-blue-800">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Bus List */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold">{filteredBuses.length} Buses Found</h3>
                  <p className="text-sm text-gray-500">New Delhi to Jaipur | 15 Oct, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="departure">Departure Time</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bus Cards */}
            <div className="space-y-4">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <motion.div
                    key={bus.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Bus Info */}
                        <div className="md:w-1/4">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                              <Image
                                src={bus.logo || "/placeholder.svg"}
                                alt={bus.operator}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-blue-700">{bus.operator}</h3>
                              <p className="text-xs text-gray-500">{bus.busType}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-2">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                              <span className="ml-1">{bus.rating}</span>
                            </div>
                            <span className="mx-2 text-gray-300">|</span>
                            <span>{bus.reviews} reviews</span>
                          </div>
                        </div>

                        {/* Time Info */}
                        <div className="md:w-1/4">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <p className="text-lg font-semibold">{bus.departureTime}</p>
                              <p className="text-xs text-gray-500">{bus.from}</p>
                            </div>
                            <div className="flex flex-col items-center px-2">
                              <p className="text-xs text-gray-500 mb-1">{bus.duration}</p>
                              <div className="w-20 h-0.5 bg-gray-300 relative">
                                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-blue-700"></div>
                                <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-blue-700"></div>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-semibold">{bus.arrivalTime}</p>
                              <p className="text-xs text-gray-500">{bus.to}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {bus.amenities.includes("wifi") && (
                              <Badge variant="outline" className="text-xs">
                                <Wifi className="h-3 w-3 mr-1" />
                                WiFi
                              </Badge>
                            )}
                            {bus.amenities.includes("charging") && (
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Charging
                              </Badge>
                            )}
                            {bus.amenities.includes("water") && (
                              <Badge variant="outline" className="text-xs">
                                Water
                              </Badge>
                            )}
                            {bus.amenities.includes("blanket") && (
                              <Badge variant="outline" className="text-xs">
                                Blanket
                              </Badge>
                            )}
                            {bus.amenities.includes("snacks") && (
                              <Badge variant="outline" className="text-xs">
                                <Coffee className="h-3 w-3 mr-1" />
                                Snacks
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Seats & Price */}
                        <div className="md:w-1/4 flex flex-col">
                          <div className="flex items-center mb-2">
                            <Users className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">{bus.seatsAvailable} Seats Available</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <Shield className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-xs text-gray-600">Safety Measures</span>
                          </div>
                          <div className="mt-auto">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-700 p-0 h-auto"
                              onClick={() => toggleBusDetails(bus.id)}
                            >
                              View Details
                              {expandedBusId === bus.id ? (
                                <ChevronUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ChevronDown className="ml-1 h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Price & Book */}
                        <div className="md:w-1/4 flex flex-col items-end justify-between">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-700">₹{bus.price}</p>
                            <p className="text-xs text-gray-500">per person</p>
                          </div>
                          <Button className="mt-4 bg-blue-700 hover:bg-blue-800">Select Seats</Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedBusId === bus.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-blue-50/50 border-t border-blue-100"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Boarding Point</h4>
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-blue-700 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium">{bus.departurePoint}</p>
                                <p className="text-xs text-gray-500">
                                  Departure: {bus.departureTime}, {bus.date}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Dropping Point</h4>
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-blue-700 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium">{bus.arrivalPoint}</p>
                                <p className="text-xs text-gray-500">Arrival: {bus.arrivalTime}, Next day</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Cancellation Policy</h4>
                            <div className="flex items-start">
                              <Shield className="h-5 w-5 text-blue-700 mr-2 mt-0.5 flex-shrink-0" />
                              <p className="text-sm">{bus.cancellationPolicy}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Bus className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No Buses Found</h3>
                    <p className="text-gray-500 mb-6">
                      We couldn't find any buses matching your filters. Try adjusting your search criteria.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPriceRange([700, 1500])
                        setSelectedOperators([])
                        setBusType([])
                        setDepartureTime([])
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

