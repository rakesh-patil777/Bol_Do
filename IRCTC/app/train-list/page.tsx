"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  ArrowRight,
  ArrowUpDown,
  Clock,
  Calendar,
  Train,
  Shield,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
  Star,
  Wifi,
  Coffee,
  Utensils,
  BatteryCharging,
  Bed,
  Briefcase,
  Users,
  X,
  Download,
  Printer,
  Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Mock train data
const trainData = [
  {
    id: "1",
    name: "Rajdhani Express",
    number: "12951/12952",
    departure: "16:35",
    arrival: "08:45",
    duration: "16h 10m",
    from: "New Delhi",
    to: "Mumbai Central",
    fromCode: "NDLS",
    toCode: "MMCT",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availability: {
      sleeper: "120",
      ac3Tier: "80",
      ac2Tier: "40",
      ac1Tier: "10",
    },
    coaches: ["SL", "3A", "2A", "1A"],
    price: {
      sleeper: "₹755",
      ac3Tier: "₹1,995",
      ac2Tier: "₹2,870",
      ac1Tier: "₹4,755",
    },
    rating: 4.5,
    type: "Superfast",
    hasFood: true,
    hasCatering: true,
    amenities: ["Charging Point", "Wifi", "Blankets", "Food", "Reading Light"],
    cancellationPolicy: "Free cancellation before 24 hours",
    distanceKm: 1384,
    intermediate: [
      { station: "Mathura Junction", arrivalTime: "18:20", departureTime: "18:25", day: 1 },
      { station: "Kota Junction", arrivalTime: "22:05", departureTime: "22:15", day: 1 },
      { station: "Ratlam Junction", arrivalTime: "01:55", departureTime: "02:00", day: 2 },
      { station: "Vadodara Junction", arrivalTime: "05:45", departureTime: "05:55", day: 2 },
    ],
  },
  {
    id: "2",
    name: "Shatabdi Express",
    number: "12001/12002",
    departure: "06:00",
    arrival: "14:00",
    duration: "8h 00m",
    from: "New Delhi",
    to: "Bhopal",
    fromCode: "NDLS",
    toCode: "BPL",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    availability: {
      sleeper: "N/A",
      ac3Tier: "60",
      ac2Tier: "30",
      ac1Tier: "15",
    },
    coaches: ["CC", "EC"],
    price: {
      sleeper: "N/A",
      ac3Tier: "₹1,800",
      ac2Tier: "₹2,500",
      ac1Tier: "₹3,200",
    },
    rating: 4.7,
    type: "Shatabdi",
    hasFood: true,
    hasCatering: true,
    amenities: ["Charging Point", "Wifi", "Breakfast & Lunch", "Newspaper", "Bottled Water"],
    cancellationPolicy: "50% refund before 12 hours",
    distanceKm: 702,
    intermediate: [
      { station: "Gwalior Junction", arrivalTime: "08:55", departureTime: "09:00", day: 1 },
      { station: "Jhansi Junction", arrivalTime: "10:25", departureTime: "10:30", day: 1 },
      { station: "Lalitpur", arrivalTime: "11:15", departureTime: "11:17", day: 1 },
      { station: "Bina Junction", arrivalTime: "12:30", departureTime: "12:35", day: 1 },
    ],
  },
  {
    id: "3",
    name: "Duronto Express",
    number: "12213/12214",
    departure: "22:00",
    arrival: "16:00",
    duration: "18h 00m",
    from: "Mumbai Central",
    to: "New Delhi",
    fromCode: "MMCT",
    toCode: "NDLS",
    days: ["Mon", "Wed", "Fri"],
    availability: {
      sleeper: "90",
      ac3Tier: "50",
      ac2Tier: "20",
      ac1Tier: "5",
    },
    coaches: ["SL", "3A", "2A", "1A"],
    price: {
      sleeper: "₹900",
      ac3Tier: "₹1,600",
      ac2Tier: "₹2,300",
      ac1Tier: "₹3,800",
    },
    rating: 4.3,
    type: "Duronto",
    hasFood: true,
    hasCatering: true,
    amenities: ["Charging Point", "Bedroll", "Meals Included", "Security", "Bio-Toilets"],
    cancellationPolicy: "25% refund before 48 hours",
    distanceKm: 1384,
    intermediate: [
      { station: "Vadodara Junction", arrivalTime: "01:30", departureTime: "01:35", day: 1 },
      { station: "Ratlam Junction", arrivalTime: "04:55", departureTime: "05:00", day: 1 },
      { station: "Kota Junction", arrivalTime: "08:45", departureTime: "08:50", day: 1 },
      { station: "Mathura Junction", arrivalTime: "13:15", departureTime: "13:20", day: 1 },
    ],
  },
  {
    id: "4",
    name: "Vande Bharat Express",
    number: "22435/22436",
    departure: "08:00",
    arrival: "14:30",
    duration: "6h 30m",
    from: "New Delhi",
    to: "Varanasi",
    fromCode: "NDLS",
    toCode: "BSB",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availability: {
      sleeper: "N/A",
      ac3Tier: "N/A",
      ac2Tier: "120",
      ac1Tier: "60",
    },
    coaches: ["CC", "EC"],
    price: {
      sleeper: "N/A",
      ac3Tier: "N/A",
      ac2Tier: "₹2,200",
      ac1Tier: "₹3,500",
    },
    rating: 4.9,
    type: "Vande Bharat",
    hasFood: true,
    hasCatering: true,
    amenities: ["Rotating Seats", "Wifi", "GPS Based Info System", "Bio-Vacuum Toilets", "Automatic Doors"],
    cancellationPolicy: "No refund within 6 hours of departure",
    distanceKm: 759,
    intermediate: [
      { station: "Kanpur Central", arrivalTime: "10:25", departureTime: "10:30", day: 1 },
      { station: "Prayagraj Junction", arrivalTime: "12:25", departureTime: "12:30", day: 1 },
    ],
  },
  {
    id: "5",
    name: "Garib Rath Express",
    number: "12203/12204",
    departure: "23:45",
    arrival: "14:15",
    duration: "14h 30m",
    from: "Delhi",
    to: "Chennai",
    fromCode: "DLI",
    toCode: "MAS",
    days: ["Tue", "Thu", "Sat"],
    availability: {
      sleeper: "N/A",
      ac3Tier: "180",
      ac2Tier: "N/A",
      ac1Tier: "N/A",
    },
    coaches: ["3A"],
    price: {
      sleeper: "N/A",
      ac3Tier: "₹1,200",
      ac2Tier: "N/A",
      ac1Tier: "N/A",
    },
    rating: 4.0,
    type: "Garib Rath",
    hasFood: false,
    hasCatering: true,
    amenities: ["Charging Point", "Blankets Available for Purchase", "Pantry Car"],
    cancellationPolicy: "75% refund before 48 hours",
    distanceKm: 2175,
    intermediate: [
      { station: "Jhansi Junction", arrivalTime: "04:15", departureTime: "04:20", day: 1 },
      { station: "Bhopal Junction", arrivalTime: "07:35", departureTime: "07:40", day: 1 },
      { station: "Nagpur Junction", arrivalTime: "13:25", departureTime: "13:35", day: 1 },
      { station: "Vijayawada Junction", arrivalTime: "01:45", departureTime: "01:50", day: 2 },
    ],
  },
  {
    id: "6",
    name: "Tejas Express",
    number: "22119/22120",
    departure: "15:30",
    arrival: "21:45",
    duration: "6h 15m",
    from: "Mumbai CSMT",
    to: "Ahmedabad",
    fromCode: "CSMT",
    toCode: "ADI",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availability: {
      sleeper: "N/A",
      ac3Tier: "N/A",
      ac2Tier: "90",
      ac1Tier: "45",
    },
    coaches: ["CC", "EC"],
    price: {
      sleeper: "N/A",
      ac3Tier: "N/A",
      ac2Tier: "₹1,850",
      ac1Tier: "₹3,100",
    },
    rating: 4.8,
    type: "Tejas",
    hasFood: true,
    hasCatering: true,
    amenities: ["High-Speed WiFi", "LCD Screens", "Automatic Doors", "CCTV", "Bio-Toilets", "Gourmet Food"],
    cancellationPolicy: "Travel insurance included with ticket",
    distanceKm: 493,
    intermediate: [
      { station: "Borivali", arrivalTime: "16:05", departureTime: "16:07", day: 1 },
      { station: "Surat", arrivalTime: "17:45", departureTime: "17:50", day: 1 },
      { station: "Vadodara Junction", arrivalTime: "19:35", departureTime: "19:40", day: 1 },
    ],
  },
]

export default function TrainList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [trains, setTrains] = useState(trainData)
  const [filteredTrains, setFilteredTrains] = useState(trainData)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState("departure")
  const [selectedTrainTypes, setSelectedTrainTypes] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [departureTimeRange, setDepartureTimeRange] = useState([0, 24])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedTrains, setExpandedTrains] = useState<string[]>([])
  const [showTrainSchedule, setShowTrainSchedule] = useState(false)
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null)
  const [journeyDate, setJourneyDate] = useState<string>(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  })

  const trainListRef = useRef<HTMLDivElement>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Handle search
  useEffect(() => {
    let result = trainData

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        (train) =>
          train.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          train.number.includes(searchTerm) ||
          train.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          train.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          train.fromCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          train.toCode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply train type filter
    if (selectedTrainTypes.length > 0) {
      result = result.filter((train) => selectedTrainTypes.includes(train.type))
    }

    // Apply class filter
    if (selectedClasses.length > 0) {
      result = result.filter((train) => train.coaches.some((coach) => selectedClasses.includes(coach)))
    }

    // Apply price filter
    result = result.filter((train) => {
      const prices = Object.values(train.price)
        .filter((price) => price !== "N/A")
        .map((price) => Number.parseInt(price.replace(/[₹,]/g, "")))

      const minPrice = Math.min(...prices)
      return minPrice >= priceRange[0] && minPrice <= priceRange[1]
    })

    // Apply departure time filter
    result = result.filter((train) => {
      const [hours, minutes] = train.departure.split(":").map(Number)
      const departureHour = hours + minutes / 60
      return departureHour >= departureTimeRange[0] && departureHour <= departureTimeRange[1]
    })

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "departure") {
        const [aHours, aMinutes] = a.departure.split(":").map(Number)
        const [bHours, bMinutes] = b.departure.split(":").map(Number)
        return aHours * 60 + aMinutes - (bHours * 60 + bMinutes)
      } else if (sortBy === "duration") {
        const aDuration =
          Number.parseInt(a.duration.split("h")[0]) * 60 +
          Number.parseInt(a.duration.split("h")[1].replace("m", "").trim())
        const bDuration =
          Number.parseInt(b.duration.split("h")[0]) * 60 +
          Number.parseInt(b.duration.split("h")[1].replace("m", "").trim())
        return aDuration - bDuration
      } else if (sortBy === "price") {
        const aPrices = Object.values(a.price)
          .filter((price) => price !== "N/A")
          .map((price) => Number.parseInt(price.replace(/[₹,]/g, "")))
        const bPrices = Object.values(b.price)
          .filter((price) => price !== "N/A")
          .map((price) => Number.parseInt(price.replace(/[₹,]/g, "")))
        return Math.min(...aPrices) - Math.min(...bPrices)
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0
    })

    setFilteredTrains(result)
  }, [searchTerm, selectedTrainTypes, selectedClasses, priceRange, departureTimeRange, sortBy])

  const handleTrainTypeToggle = (type: string) => {
    setSelectedTrainTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleClassToggle = (cls: string) => {
    setSelectedClasses((prev) => (prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]))
  }

  const handleBookNow = (trainId: string) => {
    router.push(`/payment?train=${trainId}&date=${journeyDate}`)
  }

  const handleToggleExpand = (trainId: string) => {
    setExpandedTrains((prev) => (prev.includes(trainId) ? prev.filter((id) => id !== trainId) : [...prev, trainId]))
  }

  const handleViewSchedule = (trainId: string) => {
    setSelectedTrain(trainId)
    setShowTrainSchedule(true)
  }

  const trainTypes = Array.from(new Set(trainData.map((train) => train.type)))
  const classTypes = ["SL", "3A", "2A", "1A", "CC", "EC"]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "charging point":
        return <BatteryCharging className="h-4 w-4" />
      case "food":
      case "breakfast & lunch":
      case "meals included":
      case "gourmet food":
        return <Utensils className="h-4 w-4" />
      case "blankets":
      case "bedroll":
        return <Bed className="h-4 w-4" />
      case "bio-toilets":
      case "bio-vacuum toilets":
        return <Users className="h-4 w-4" />
      case "newspaper":
        return <Briefcase className="h-4 w-4" />
      case "bottled water":
        return <Coffee className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-700"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8" ref={trainListRef}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-blue-800">Available Trains</h1>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <p className="text-gray-600">Showing {filteredTrains.length} trains from New Delhi to Mumbai</p>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(journeyDate).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Badge>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`lg:w-1/4 ${isFiltersOpen ? "block" : "hidden lg:block"}`}
        >
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-blue-700" />
                  Filters
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTrainTypes([])
                    setSelectedClasses([])
                    setPriceRange([0, 5000])
                    setDepartureTimeRange([0, 24])
                  }}
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Journey Date Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Journey Date</h3>
                  <div className="relative">
                    <Input
                      type="date"
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      className="pl-10"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Train Type Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Train Type</h3>
                  <div className="space-y-2">
                    {trainTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTrainTypes.includes(type)}
                          onCheckedChange={() => handleTrainTypeToggle(type)}
                        />
                        <Label htmlFor={`type-${type}`} className="ml-2 text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Class Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Travel Class</h3>
                  <div className="space-y-2">
                    {classTypes.map((cls) => (
                      <div key={cls} className="flex items-center">
                        <Checkbox
                          id={`class-${cls}`}
                          checked={selectedClasses.includes(cls)}
                          onCheckedChange={() => handleClassToggle(cls)}
                        />
                        <Label htmlFor={`class-${cls}`} className="ml-2 text-sm">
                          {cls === "SL"
                            ? "Sleeper"
                            : cls === "3A"
                              ? "AC 3 Tier"
                              : cls === "2A"
                                ? "AC 2 Tier"
                                : cls === "1A"
                                  ? "AC First Class"
                                  : cls === "CC"
                                    ? "Chair Car"
                                    : "Executive Chair Car"}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                {/* Departure Time Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Departure Time</h3>
                  <Slider
                    defaultValue={[0, 24]}
                    max={24}
                    step={1}
                    value={departureTimeRange}
                    onValueChange={setDepartureTimeRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{departureTimeRange[0]}:00</span>
                    <span>{departureTimeRange[1]}:00</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setDepartureTimeRange([0, 6])}
                    >
                      00-06
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setDepartureTimeRange([6, 12])}
                    >
                      06-12
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setDepartureTimeRange([12, 18])}
                    >
                      12-18
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setDepartureTimeRange([18, 24])}
                    >
                      18-24
                    </Button>
                  </div>
                </div>

                {/* Amenities Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Amenities</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="amenity-food" />
                      <Label htmlFor="amenity-food" className="ml-2 text-sm">
                        Food Included
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="amenity-wifi" />
                      <Label htmlFor="amenity-wifi" className="ml-2 text-sm">
                        WiFi
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="amenity-charging" />
                      <Label htmlFor="amenity-charging" className="ml-2 text-sm">
                        Charging Point
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="amenity-bedroll" />
                      <Label htmlFor="amenity-bedroll" className="ml-2 text-sm">
                        Bedroll
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Train List Section */}
        <div className="lg:w-3/4">
          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search trains, stations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="lg:hidden" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <span>Sort By</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredTrains.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Train className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No trains found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTrainTypes([])
                  setSelectedClasses([])
                  setPriceRange([0, 5000])
                  setDepartureTimeRange([0, 24])
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {filteredTrains.map((train) => (
                <motion.div key={train.id} variants={item}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="bg-blue-50 p-4 border-b border-blue-100">
                        <div className="flex flex-wrap justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-blue-800">{train.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <span>{train.number}</span>
                              <span className="mx-2">•</span>
                              <span>Runs on: {train.days.join(", ")}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                              {train.type}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleViewSchedule(train.id)}
                                  >
                                    <Clock className="h-4 w-4 text-blue-700" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View train schedule</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-6">
                          <div className="flex items-start mb-4 md:mb-0">
                            <div className="text-center mr-4">
                              <p className="text-xl font-bold text-blue-800">{train.departure}</p>
                              <p className="text-sm text-gray-500">{train.from}</p>
                              <p className="text-xs text-gray-400">{train.fromCode}</p>
                            </div>

                            <div className="flex flex-col items-center mx-2">
                              <div className="w-2 h-2 rounded-full bg-blue-800"></div>
                              <div className="h-14 w-0.5 bg-blue-200"></div>
                              <div className="w-2 h-2 rounded-full bg-blue-800"></div>
                            </div>

                            <div className="text-center ml-4">
                              <p className="text-xl font-bold text-blue-800">{train.arrival}</p>
                              <p className="text-sm text-gray-500">{train.to}</p>
                              <p className="text-xs text-gray-400">{train.toCode}</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center bg-blue-50 px-4 py-2 rounded-lg">
                            <Clock className="h-4 w-4 text-blue-700 mb-1" />
                            <p className="text-sm font-medium text-blue-800">{train.duration}</p>
                            <p className="text-xs text-gray-500">{train.distanceKm} km</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          {["sleeper", "ac3Tier", "ac2Tier", "ac1Tier"].map((cls, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <p className="text-sm font-medium mb-1">
                                {cls === "sleeper"
                                  ? "Sleeper"
                                  : cls === "ac3Tier"
                                    ? "AC 3 Tier"
                                    : cls === "ac2Tier"
                                      ? "AC 2 Tier"
                                      : "AC First Class"}
                              </p>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                  {train.availability[cls as keyof typeof train.availability] === "N/A"
                                    ? "Not Available"
                                    : `${train.availability[cls as keyof typeof train.availability]} seats`}
                                </p>
                                <p className="font-bold text-blue-800">
                                  {train.price[cls as keyof typeof train.price]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap justify-between items-center">
                          <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            {train.hasFood && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Utensils className="h-3 w-3 mr-1" />
                                Food Included
                              </Badge>
                            )}
                            {train.hasCatering && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                <Coffee className="h-3 w-3 mr-1" />
                                Catering Available
                              </Badge>
                            )}
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(train.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-1 text-sm text-gray-600">{train.rating}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleExpand(train.id)}
                              className="text-blue-700 border-blue-200"
                            >
                              {expandedTrains.includes(train.id) ? (
                                <>
                                  <ChevronUp className="h-4 w-4 mr-1" />
                                  Hide Details
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4 mr-1" />
                                  Show Details
                                </>
                              )}
                            </Button>

                            <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => handleBookNow(train.id)}>
                              Book Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {expandedTrains.includes(train.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-4 border-t"
                          >
                            <Tabs defaultValue="route">
                              <TabsList className="mb-4">
                                <TabsTrigger value="route">Route</TabsTrigger>
                                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                                <TabsTrigger value="policy">Cancellation Policy</TabsTrigger>
                              </TabsList>

                              <TabsContent value="route">
                                <div className="relative">
                                  {/* Vertical timeline line */}
                                  <div className="absolute left-[46px] top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

                                  {/* Stations */}
                                  <div className="space-y-6">
                                    {[
                                      {
                                        station: train.from,
                                        stationCode: train.fromCode,
                                        arrivalTime: "--",
                                        departureTime: train.departure,
                                        day: 1,
                                      },
                                      ...train.intermediate,
                                      {
                                        station: train.to,
                                        stationCode: train.toCode,
                                        arrivalTime: train.arrival,
                                        departureTime: "--",
                                        day:
                                          train.intermediate.length > 0
                                            ? train.intermediate[train.intermediate.length - 1].day
                                            : 1,
                                      },
                                    ].map((stop, index, array) => (
                                      <div key={index} className="relative flex items-start gap-4">
                                        <div
                                          className={cn(
                                            "w-6 h-6 rounded-full z-10 mt-0.5 flex items-center justify-center",
                                            index === 0
                                              ? "bg-green-500"
                                              : index === array.length - 1
                                                ? "bg-red-500"
                                                : "bg-blue-500",
                                          )}
                                        >
                                          {index === 0 && (
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
                                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                                              ></path>
                                            </svg>
                                          )}
                                          {index === array.length - 1 && (
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
                                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                              ></path>
                                            </svg>
                                          )}
                                        </div>

                                        <div className="flex-1">
                                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                                            <div className="md:col-span-2">
                                              <h4 className="font-medium text-gray-900">{stop.station}</h4>
                                             
                                            </div>

                                            <div>
                                              <div className="text-sm text-gray-500">Arrival</div>
                                              <div className="font-medium">{stop.arrivalTime}</div>
                                              {stop.day && stop.day > 1 && (
                                                <span className="text-xs text-blue-600">Day {stop.day}</span>
                                              )}
                                            </div>

                                            <div>
                                              <div className="text-sm text-gray-500">Departure</div>
                                              <div className="font-medium">{stop.departureTime}</div>
                                              {stop.day && stop.day > 1 && (
                                                <span className="text-xs text-blue-600">Day {stop.day}</span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="amenities">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {train.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                        {getAmenityIcon(amenity)}
                                      </div>
                                      <span className="text-sm">{amenity}</span>
                                    </div>
                                  ))}
                                </div>
                              </TabsContent>

                              <TabsContent value="policy">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <h4 className="font-medium mb-2 flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-2 text-blue-700" />
                                    Cancellation Policy
                                  </h4>
                                  <p className="text-sm text-gray-600">{train.cancellationPolicy}</p>

                                  <h4 className="font-medium mt-4 mb-2">Cancellation Charges</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="p-2 bg-green-50 rounded border border-green-100">
                                      <p className="font-medium text-green-700">More than 48 hours</p>
                                      <p className="text-gray-600">25% of fare</p>
                                    </div>
                                    <div className="p-2 bg-yellow-50 rounded border border-yellow-100">
                                      <p className="font-medium text-yellow-700">12 to 48 hours</p>
                                      <p className="text-gray-600">50% of fare</p>
                                    </div>
                                    <div className="p-2 bg-red-50 rounded border border-red-100">
                                      <p className="font-medium text-red-700">Less than 12 hours</p>
                                      <p className="text-gray-600">No refund</p>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Train Schedule Modal */}
      {showTrainSchedule && selectedTrain && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="bg-blue-800 text-white p-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-bold">Train Schedule</h2>
              <button
                onClick={() => setShowTrainSchedule(false)}
                className="text-white hover:bg-blue-700 rounded-full p-1"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4">
              {/* Train details */}
              <div className="mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Train Number</p>
                        <p className="font-medium">{trainData.find((t) => t.id === selectedTrain)?.number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Train Name</p>
                        <p className="font-medium">{trainData.find((t) => t.id === selectedTrain)?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="font-medium">{trainData.find((t) => t.id === selectedTrain)?.from}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">To</p>
                        <p className="font-medium">{trainData.find((t) => t.id === selectedTrain)?.to}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Runs On</p>
                        <div className="flex space-x-1">
                          {trainData
                            .find((t) => t.id === selectedTrain)
                            ?.days.map((day, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Schedule table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-800 text-white">
                      <th className="px-4 py-3 text-left">S.N.</th>
                      <th className="px-4 py-3 text-left">Station Code</th>
                      <th className="px-4 py-3 text-left">Station Name</th>
                      <th className="px-4 py-3 text-left">Arrival Time</th>
                      <th className="px-4 py-3 text-left">Departure Time</th>
                      <th className="px-4 py-3 text-left">Halt Time</th>
                      <th className="px-4 py-3 text-left">Distance</th>
                      <th className="px-4 py-3 text-left">Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        station: trainData.find((t) => t.id === selectedTrain)?.from || "",
                        stationCode: trainData.find((t) => t.id === selectedTrain)?.fromCode || "",
                        arrivalTime: "--",
                        departureTime: trainData.find((t) => t.id === selectedTrain)?.departure || "",
                        haltTime: "--",
                        distance: 0,
                        day: 1,
                      },
                      ...(trainData.find((t) => t.id === selectedTrain)?.intermediate || []).map((stop, i) => ({
                        station: stop.station,
                        stationCode: stop.station.substring(0, 3).toUpperCase(),
                        arrivalTime: stop.arrivalTime,
                        departureTime: stop.departureTime,
                        haltTime: "5 min",
                        distance: Math.round(
                          trainData.find((t) => t.id === selectedTrain)?.distanceKm ||
                            (0 * (i + 1)) /
                              (trainData.find((t) => t.id === selectedTrain)?.intermediate?.length || 1 + 2),
                        ),
                        day: stop.day,
                      })),
                      {
                        station: trainData.find((t) => t.id === selectedTrain)?.to || "",
                        stationCode: trainData.find((t) => t.id === selectedTrain)?.toCode || "",
                        arrivalTime: trainData.find((t) => t.id === selectedTrain)?.arrival || "",
                        departureTime: "--",
                        haltTime: "--",
                        distance: trainData.find((t) => t.id === selectedTrain)?.distanceKm || 0,
                        day:
                          trainData.find((t) => t.id === selectedTrain)?.intermediate &&
                          trainData.find((t) => t.id === selectedTrain)?.intermediate.length
                            ? trainData.find((t) => t.id === selectedTrain)?.intermediate[
                                (trainData.find((t) => t.id === selectedTrain)?.intermediate?.length || 0) - 1
                              ].day
                            : 1,
                      },
                    ].map((station, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{station.stationCode}</td>
                        <td className="px-4 py-3">{station.station}</td>
                        <td className="px-4 py-3">{station.arrivalTime}</td>
                        <td className="px-4 py-3">{station.departureTime}</td>
                        <td className="px-4 py-3">{station.haltTime}</td>
                        <td className="px-4 py-3">{station.distance} km</td>
                        <td className="px-4 py-3">Day {station.day}</td>
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
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button onClick={() => setShowTrainSchedule(false)} className="bg-blue-700 hover:bg-blue-800">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

