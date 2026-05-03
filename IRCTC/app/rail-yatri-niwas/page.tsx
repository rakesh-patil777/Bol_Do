"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Tv,
  Utensils,
  ShowerHead,
  Home,
  Check,
  Info,
  Clock,
  Phone,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for Rail Yatri Niwas
const niwasData = [
  {
    id: "1",
    name: "Rail Yatri Niwas - New Delhi",
    location: "Paharganj, New Delhi",
    distance: "0.5 km from New Delhi Railway Station",
    image: "/images/new_delhi_station.jpeg",
    price: "₹1,050",
    rating: 3.9,
    amenities: ["AC Rooms", "Restaurant", "24x7 Reception", "Free WiFi", "TV", "Attached Bathroom", "Laundry Service"],
    roomTypes: [
      {
        type: "Standard Single",
        price: "₹1,050",
        capacity: "1 Person",
        amenities: ["Single Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Standard Double",
        price: "₹1,450",
        capacity: "2 People",
        amenities: ["Double Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Family Room",
        price: "₹1,950",
        capacity: "4 People",
        amenities: ["2 Double Beds", "AC", "TV", "Attached Bathroom", "Larger Space"],
      },
    ],
    description:
      "Conveniently located budget accommodation near New Delhi Railway Station with essential amenities for travelers. The Rail Yatri Niwas offers comfortable rooms at affordable prices.",
    contact: {
      phone: "+91-11-23345678",
      email: "booking@railyatriniwas.com",
      address: "Paharganj, Near New Delhi Railway Station, New Delhi - 110055",
    },
  },
  {
    id: "2",
    name: "Rail Yatri Niwas - Howrah",
    location: "Near Howrah Junction, Kolkata",
    distance: "0.3 km from Howrah Junction",
    image: "/images/kolkata_station.jpeg",
    price: "₹950",
    rating: 3.8,
    amenities: ["AC Rooms", "Restaurant", "24x7 Reception", "Free WiFi", "TV", "Attached Bathroom", "Luggage Storage"],
    roomTypes: [
      {
        type: "Standard Single",
        price: "₹950",
        capacity: "1 Person",
        amenities: ["Single Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Standard Double",
        price: "₹1,350",
        capacity: "2 People",
        amenities: ["Double Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Deluxe Room",
        price: "₹1,750",
        capacity: "3 People",
        amenities: ["Double Bed + Single Bed", "AC", "TV", "Attached Bathroom", "Seating Area"],
      },
    ],
    description:
      "Budget accommodation near Howrah Junction offering clean and comfortable rooms for railway passengers. Ideal for short stays and transit travelers.",
    contact: {
      phone: "+91-33-26789012",
      email: "howrah@railyatriniwas.com",
      address: "Near Howrah Junction Railway Station, Kolkata - 711101",
    },
  },
  {
    id: "3",
    name: "Rail Yatri Niwas - Mumbai Central",
    location: "Mumbai Central, Mumbai",
    distance: "0.2 km from Mumbai Central Station",
    image: "/images/mumbai_station.jpeg",
    price: "₹1,100",
    rating: 4.0,
    amenities: ["AC Rooms", "Restaurant", "24x7 Reception", "Free WiFi", "TV", "Attached Bathroom", "Travel Desk"],
    roomTypes: [
      {
        type: "Standard Single",
        price: "₹1,100",
        capacity: "1 Person",
        amenities: ["Single Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Standard Double",
        price: "₹1,500",
        capacity: "2 People",
        amenities: ["Double Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Premium Room",
        price: "₹1,900",
        capacity: "2 People",
        amenities: ["Double Bed", "AC", "TV", "Attached Bathroom", "Premium Furnishings"],
      },
    ],
    description:
      "Comfortable and affordable accommodation located near Mumbai Central Station. The Rail Yatri Niwas offers a convenient stay option for railway passengers.",
    contact: {
      phone: "+91-22-23456789",
      email: "mumbai@railyatriniwas.com",
      address: "Near Mumbai Central Railway Station, Mumbai - 400008",
    },
  },
  {
    id: "4",
    name: "Rail Yatri Niwas - Chennai Central",
    location: "Near Chennai Central, Chennai",
    distance: "0.4 km from Chennai Central Station",
    image: "/images/chennai_station.jpg",
    price: "₹1,000",
    rating: 3.7,
    amenities: ["AC Rooms", "Cafeteria", "24x7 Reception", "Free WiFi", "TV", "Attached Bathroom", "Parking"],
    roomTypes: [
      {
        type: "Standard Single",
        price: "₹1,000",
        capacity: "1 Person",
        amenities: ["Single Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Standard Double",
        price: "₹1,400",
        capacity: "2 People",
        amenities: ["Double Bed", "AC", "TV", "Attached Bathroom"],
      },
      {
        type: "Family Room",
        price: "₹1,800",
        capacity: "4 People",
        amenities: ["2 Double Beds", "AC", "TV", "Attached Bathroom"],
      },
    ],
    description:
      "Budget-friendly accommodation near Chennai Central Station providing comfortable rooms and essential amenities for railway passengers.",
    contact: {
      phone: "+91-44-28901234",
      email: "chennai@railyatriniwas.com",
      address: "Near Chennai Central Railway Station, Chennai - 600003",
    },
  },
]

export default function RailYatriNiwasPage() {
  const [selectedNiwas, setSelectedNiwas] = useState<string | null>(null)
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState("1")
  const [rooms, setRooms] = useState("1")
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedNiwasDetails, setSelectedNiwasDetails] = useState<(typeof niwasData)[0] | null>(null)

  const handleBookNow = (niwasId: string) => {
    setSelectedNiwas(niwasId)
    const niwasDetails = niwasData.find((n) => n.id === niwasId) || null
    setSelectedNiwasDetails(niwasDetails)
    window.scrollTo({
      top: document.getElementById("booking-section")?.offsetTop,
      behavior: "smooth",
    })
  }

  const handleViewDetails = (niwasId: string) => {
    const niwasDetails = niwasData.find((n) => n.id === niwasId) || null
    setSelectedNiwasDetails(niwasDetails)
    setActiveTab("overview")
    window.scrollTo({
      top: document.getElementById("details-section")?.offsetTop,
      behavior: "smooth",
    })
  }

  const handleSelectRoomType = (roomType: string) => {
    setSelectedRoomType(roomType)
  }

  const handleConfirmBooking = () => {
    // In a real application, this would submit the booking to a backend
    alert(
      `Booking confirmed for ${selectedNiwas ? niwasData.find((n) => n.id === selectedNiwas)?.name : ""} - ${selectedRoomType} from ${checkInDate} to ${checkOutDate} for ${guests} guest(s) in ${rooms} room(s)`,
    )

    // Reset form
    setSelectedRoomType(null)
    setCheckInDate("")
    setCheckOutDate("")
    setGuests("1")
    setRooms("1")
  }

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes("wifi")) return <Wifi className="h-4 w-4" />
    if (lowerAmenity.includes("tv")) return <Tv className="h-4 w-4" />
    if (lowerAmenity.includes("restaurant") || lowerAmenity.includes("cafeteria"))
      return <Utensils className="h-4 w-4" />
    if (lowerAmenity.includes("bathroom") || lowerAmenity.includes("shower")) return <ShowerHead className="h-4 w-4" />
    if (lowerAmenity.includes("ac")) return <Coffee className="h-4 w-4" />
    return <Check className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image src="/images/bg_1.jpeg" alt="Rail Yatri Niwas" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/30 flex flex-col justify-center px-6 md:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Rail Yatri Niwas</h1>
            <p className="mt-4 text-xl text-white/90 max-w-2xl">
              Affordable and comfortable accommodation for railway passengers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Budget-Friendly Railway Accommodation</h2>
          <p className="text-lg text-gray-600 mb-8">
            Rail Yatri Niwas provides affordable accommodation options for railway passengers at major stations across
            India. With clean rooms, essential amenities, and convenient locations, our facilities ensure a comfortable
            stay during your journey.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {[
              { icon: <Home className="h-8 w-8 text-blue-700" />, label: "Convenient Location" },
              { icon: <Wifi className="h-8 w-8 text-blue-700" />, label: "Free WiFi" },
              { icon: <Utensils className="h-8 w-8 text-blue-700" />, label: "Restaurant" },
              { icon: <Clock className="h-8 w-8 text-blue-700" />, label: "24/7 Reception" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <p className="font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white shadow-md relative mx-4 lg:mx-auto max-w-6xl z-10 rounded-lg mb-12">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Find Your Accommodation</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Select defaultValue="all">
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="new-delhi">New Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="kolkata">Kolkata</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
            </div>

            <div className="relative">
              <Input type="date" placeholder="Check-in" className="pl-10" />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <Input type="date" placeholder="Check-out" className="pl-10" />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <Select defaultValue="1">
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
              <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
            </div>
          </div>

          <Button className="w-full md:w-auto mt-4 bg-blue-700 hover:bg-blue-800">Search Accommodations</Button>
        </div>
      </section>

      {/* Niwas List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Locations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {niwasData.map((niwas) => (
              <motion.div
                key={niwas.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48">
                    <Image src={niwas.image || "/placeholder.svg"} alt={niwas.name} fill className="object-cover" />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-white text-gray-800 border-white">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        {niwas.rating}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg text-blue-700">{niwas.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{niwas.location}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">{niwas.distance}</div>

                    <p className="text-gray-600 text-sm mb-4">{niwas.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {niwas.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-xl font-bold text-blue-700">{niwas.price}</p>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                        <div className="text-sm text-gray-500">{niwas.roomTypes.length} room types available</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="border-blue-700 text-blue-700 hover:bg-blue-50"
                          onClick={() => handleViewDetails(niwas.id)}
                        >
                          View Details
                        </Button>
                        <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => handleBookNow(niwas.id)}>
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      {selectedNiwasDetails && (
        <section id="details-section" className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedNiwasDetails.name}</h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedNiwasDetails.image || "/placeholder.svg"}
                  alt={selectedNiwasDetails.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="rooms">Rooms & Rates</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-blue-700" />
                      <span>{selectedNiwasDetails.location}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">{selectedNiwasDetails.distance}</div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">About This Property</h3>
                      <p className="text-gray-600">{selectedNiwasDetails.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                          <h4 className="font-medium mb-2">Contact Information</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center text-sm">
                              <Phone className="h-4 w-4 mr-2 text-blue-700" />
                              <span>{selectedNiwasDetails.contact.phone}</span>
                            </li>
                            <li className="flex items-center text-sm">
                              <Mail className="h-4 w-4 mr-2 text-blue-700" />
                              <span>{selectedNiwasDetails.contact.email}</span>
                            </li>
                            <li className="flex items-start text-sm">
                              <MapPin className="h-4 w-4 mr-2 text-blue-700 mt-1" />
                              <span>{selectedNiwasDetails.contact.address}</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Check-in & Check-out</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-blue-700" />
                              <span>Check-in: 12:00 PM</span>
                            </li>
                            <li className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-blue-700" />
                              <span>Check-out: 10:00 AM</span>
                            </li>
                            <li className="flex items-center">
                              <Info className="h-4 w-4 mr-2 text-blue-700" />
                              <span>24/7 Reception</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rooms" className="space-y-6">
                    <h3 className="text-lg font-semibold">Available Room Types</h3>

                    <div className="grid grid-cols-1 gap-4">
                      {selectedNiwasDetails.roomTypes.map((room, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="relative h-48 md:h-auto">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt={room.type}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="p-4 md:col-span-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-lg">{room.type}</h4>
                                  <p className="text-sm text-gray-500">{room.capacity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold text-blue-700">{room.price}</p>
                                  <p className="text-xs text-gray-500">per night</p>
                                </div>
                              </div>

                              <div className="mt-4">
                                <h5 className="text-sm font-medium mb-2">Room Amenities</h5>
                                <div className="flex flex-wrap gap-2">
                                  {room.amenities.map((amenity, i) => (
                                    <Badge key={i} variant="outline" className="text-xs flex items-center gap-1">
                                      {getAmenityIcon(amenity)}
                                      <span>{amenity}</span>
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="mt-4 flex justify-end">
                                <Button
                                  className="bg-blue-700 hover:bg-blue-800"
                                  onClick={() => {
                                    setSelectedNiwas(selectedNiwasDetails.id)
                                    setSelectedRoomType(room.type)
                                    window.scrollTo({
                                      top: document.getElementById("booking-section")?.offsetTop,
                                      behavior: "smooth",
                                    })
                                  }}
                                >
                                  Book This Room
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="amenities" className="space-y-6">
                    <h3 className="text-lg font-semibold">Property Amenities</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 text-blue-700">Room Amenities</h4>
                        <ul className="space-y-2">
                          {["AC", "TV", "Attached Bathroom", "Clean Bedding", "Towels", "Toiletries"].map(
                            (amenity, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                                <span>{amenity}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 text-blue-700">Property Facilities</h4>
                        <ul className="space-y-2">
                          {selectedNiwasDetails.amenities.map((amenity, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              <span>{amenity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3 text-blue-700">Additional Services</h4>
                      <ul className="space-y-2">
                        {[
                          "Luggage Storage",
                          "Wake-up Call",
                          "Newspaper",
                          "Travel Assistance",
                          "Railway Information",
                        ].map((service, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Section */}
      <section id="booking-section" className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Book Your Stay</h2>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Accommodation Booking</CardTitle>
                <CardDescription>Select your preferred location, room type, and dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Location</label>
                    <Select value={selectedNiwas || ""} onValueChange={setSelectedNiwas}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Rail Yatri Niwas" />
                      </SelectTrigger>
                      <SelectContent>
                        {niwasData.map((niwas) => (
                          <SelectItem key={niwas.id} value={niwas.id}>
                            {niwas.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedNiwas && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Room Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {niwasData
                            .find((n) => n.id === selectedNiwas)
                            ?.roomTypes.map((room, index) => (
                              <div
                                key={index}
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  selectedRoomType === room.type
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300"
                                }`}
                                onClick={() => handleSelectRoomType(room.type)}
                              >
                                <h4 className="font-medium text-blue-700">{room.type}</h4>
                                <p className="text-lg font-bold">{room.price}</p>
                                <p className="text-sm text-gray-500">{room.capacity}</p>
                                <ul className="mt-2 space-y-1">
                                  {room.amenities.map((amenity, i) => (
                                    <li key={i} className="text-xs text-gray-600 flex items-start">
                                      <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                                      <span>{amenity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                          <div className="relative">
                            <Input
                              type="date"
                              value={checkInDate}
                              onChange={(e) => setCheckInDate(e.target.value)}
                              className="pl-10"
                            />
                            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                          <div className="relative">
                            <Input
                              type="date"
                              value={checkOutDate}
                              onChange={(e) => setCheckOutDate(e.target.value)}
                              className="pl-10"
                            />
                            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                          <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of guests" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Guest</SelectItem>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="3">3 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                              <SelectItem value="5">5 Guests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
                          <Select value={rooms} onValueChange={setRooms}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of rooms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Room</SelectItem>
                              <SelectItem value="2">2 Rooms</SelectItem>
                              <SelectItem value="3">3 Rooms</SelectItem>
                              <SelectItem value="4">4 Rooms</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500 flex items-start">
                  <Info className="h-4 w-4 mr-1 mt-0.5" />
                  <span>Booking is subject to availability</span>
                </div>
                <Button
                  onClick={handleConfirmBooking}
                  disabled={!selectedNiwas || !selectedRoomType || !checkInDate || !checkOutDate}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="font-medium mb-2">Central Booking</h3>
                  <p className="text-gray-600">+91-11-23345678</p>
                  <p className="text-gray-600">Toll Free: 1800-111-139</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="font-medium mb-2">Email</h3>
                  <p className="text-gray-600">booking@railyatriniwas.com</p>
                  <p className="text-gray-600">support@railyatriniwas.com</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="font-medium mb-2">Office Hours</h3>
                  <p className="text-gray-600">24/7 Reception</p>
                  <p className="text-gray-600">Check-in: 12:00 PM</p>
                  <p className="text-gray-600">Check-out: 10:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Rail Yatri Niwas?</AccordionTrigger>
                <AccordionContent>
                  Rail Yatri Niwas is a chain of budget accommodations operated by IRCTC, designed specifically for
                  railway passengers. These facilities provide affordable and comfortable rooms near major railway
                  stations across India.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Do I need to have a train ticket to stay at Rail Yatri Niwas?</AccordionTrigger>
                <AccordionContent>
                  While Rail Yatri Niwas primarily caters to railway passengers, you don't necessarily need a train
                  ticket to book a room. However, during peak seasons, preference may be given to passengers with
                  confirmed train reservations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What are the check-in and check-out times?</AccordionTrigger>
                <AccordionContent>
                  Standard check-in time is 12:00 PM and check-out time is 10:00 AM. However, early check-in and late
                  check-out can be arranged subject to availability and may incur additional charges.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Are meals included in the room tariff?</AccordionTrigger>
                <AccordionContent>
                  Basic room tariffs do not include meals. However, most Rail Yatri Niwas locations have on-site
                  restaurants or cafeterias where meals can be purchased separately. Some locations may offer meal
                  packages at additional cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Is there a cancellation policy?</AccordionTrigger>
                <AccordionContent>
                  Yes, cancellations made at least 48 hours before the check-in date are eligible for a full refund.
                  Cancellations within 48 hours may be subject to a cancellation fee of one night's stay. No-shows are
                  charged the full amount for the first night.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}

