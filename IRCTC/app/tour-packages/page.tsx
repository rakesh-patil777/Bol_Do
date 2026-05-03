"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Package,
  MapPin,
  Star,
  Users,
  Search,
  Filter,
  ArrowRight,
  Heart,
  Share2,
  Clock,
  Tag,
  Info,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

// Tour package data
const tourPackages = [
  {
    id: "1",
    title: "Bharat Darshan Special",
    image: "/images/bharat_darshan.jpeg",
    duration: "7 Days / 6 Nights",
    price: "₹15,999",
    originalPrice: "₹18,999",
    rating: 4.7,
    reviews: 128,
    description:
      "Explore the cultural heritage of India with this comprehensive tour package covering Delhi, Agra, and Jaipur.",
    destinations: ["Delhi", "Agra", "Jaipur"],
    category: "cultural",
    featured: true,
    availability: "Oct 2025 - Mar 2024",
    inclusions: ["Hotel Accommodation", "AC Transport", "Meals", "Tour Guide"],
  },
  {
    id: "2",
    title: "Buddhist Circuit Tour",
    image: "/images/buddhist_circuit.jpeg",
    duration: "5 Days / 4 Nights",
    price: "₹12,499",
    originalPrice: "₹14,999",
    rating: 4.5,
    reviews: 96,
    description:
      "Visit the most significant Buddhist pilgrimage sites across India including Bodhgaya, Sarnath, and Kushinagar.",
    destinations: ["Bodhgaya", "Rajgir", "Varanasi", "Kushinagar"],
    category: "pilgrimage",
    featured: false,
    availability: "Year Round",
    inclusions: ["Hotel Accommodation", "AC Transport", "Breakfast", "Tour Guide"],
  },
  {
    id: "3",
    title: "Himalayan Queen",
    image: "/images/himalayan_queen.jpeg",
    duration: "6 Days / 5 Nights",
    price: "₹18,999",
    originalPrice: "₹22,999",
    rating: 4.8,
    reviews: 156,
    description:
      "Experience the majestic Himalayan mountain railways with breathtaking views of snow-capped peaks and valleys.",
    destinations: ["Kalka", "Shimla", "Dharamshala", "Dalhousie"],
    category: "hill-station",
    featured: true,
    availability: "Apr 2025 - Nov 2025",
    inclusions: ["Hotel Accommodation", "Toy Train Tickets", "Meals", "Sightseeing"],
  },
  {
    id: "4",
    title: "South India Splendor",
    image: "/images/south_temple.jpeg",
    duration: "8 Days / 7 Nights",
    price: "₹16,499",
    originalPrice: "₹19,999",
    rating: 4.6,
    reviews: 112,
    description:
      "Discover the rich culture and beautiful temples of South India with visits to Chennai, Mahabalipuram, and Pondicherry.",
    destinations: ["Chennai", "Mahabalipuram", "Pondicherry", "Thanjavur", "Madurai"],
    category: "cultural",
    featured: false,
    availability: "Year Round",
    inclusions: ["Hotel Accommodation", "AC Transport", "Breakfast", "Tour Guide"],
  },
  {
    id: "5",
    title: "Kerala Backwaters Cruise",
    image: "/images/kerela_water.jpeg",
    duration: "5 Days / 4 Nights",
    price: "₹14,999",
    originalPrice: "₹17,999",
    rating: 4.9,
    reviews: 203,
    description:
      "Relax and rejuvenate with a cruise through the serene backwaters of Kerala, known as God's Own Country.",
    destinations: ["Kochi", "Alleppey", "Kumarakom", "Kovalam"],
    category: "nature",
    featured: true,
    availability: "Sep 2025 - May 2024",
    inclusions: ["Houseboat Stay", "Resort Accommodation", "All Meals", "Ayurvedic Massage"],
  },
  {
    id: "6",
    title: "Golden Triangle with Varanasi",
    image: "/images/varanasi.jpeg",
    duration: "7 Days / 6 Nights",
    price: "₹19,999",
    originalPrice: "₹23,999",
    rating: 4.7,
    reviews: 142,
    description: "Experience the classic Golden Triangle tour with an extension to the spiritual city of Varanasi.",
    destinations: ["Delhi", "Agra", "Jaipur", "Varanasi"],
    category: "cultural",
    featured: false,
    availability: "Oct 2025 - Apr 2024",
    inclusions: ["4-Star Accommodation", "AC Transport", "Breakfast & Dinner", "Tour Guide"],
  },
  {
    id: "7",
    title: "Northeast Explorer",
    image: "/images/northeast_explorer.jpeg",
    duration: "9 Days / 8 Nights",
    price: "₹24,999",
    originalPrice: "₹29,999",
    rating: 4.8,
    reviews: 87,
    description:
      "Explore the unexplored beauty of Northeast India with visits to Assam, Meghalaya, and Arunachal Pradesh.",
    destinations: ["Guwahati", "Shillong", "Cherrapunji", "Tawang"],
    category: "adventure",
    featured: true,
    availability: "Mar 2025 - Nov 2025",
    inclusions: ["Hotel Accommodation", "SUV Transport", "Breakfast", "Local Permits"],
  },
  {
    id: "8",
    title: "Rajasthan Royal Heritage",
    image: "/images/rajasthan.jpeg",
    duration: "8 Days / 7 Nights",
    price: "₹21,999",
    originalPrice: "₹25,999",
    rating: 4.6,
    reviews: 118,
    description: "Experience the royal heritage of Rajasthan with stays in palace hotels and visits to majestic forts.",
    destinations: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
    category: "heritage",
    featured: false,
    availability: "Oct 2025 - Mar 2024",
    inclusions: ["Heritage Hotel Stay", "AC Transport", "Breakfast", "Cultural Programs"],
  },
]

// Categories
const categories = [
  { id: "all", name: "All Packages" },
  { id: "cultural", name: "Cultural Tours" },
  { id: "pilgrimage", name: "Pilgrimage" },
  { id: "hill-station", name: "Hill Stations" },
  { id: "nature", name: "Nature & Wildlife" },
  { id: "adventure", name: "Adventure" },
  { id: "heritage", name: "Heritage" },
]

export default function TourPackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([5000, 30000])
  const [duration, setDuration] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [filteredPackages, setFilteredPackages] = useState(tourPackages)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter packages based on search, category, price, and duration
    const filtered = tourPackages.filter((pkg) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destinations.some((dest) => dest.toLowerCase().includes(searchTerm.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory

      // Price filter
      const price = Number.parseInt(pkg.price.replace(/[^\d]/g, ""))
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

      // Duration filter
      const days = Number.parseInt(pkg.duration.split(" ")[0])
      const matchesDuration =
        duration === "all" ||
        (duration === "1-3" && days >= 1 && days <= 3) ||
        (duration === "4-7" && days >= 4 && days <= 7) ||
        (duration === "8-14" && days >= 8 && days <= 14) ||
        (duration === "15+" && days >= 15)

      return matchesSearch && matchesCategory && matchesPrice && matchesDuration
    })

    // Sort packages
    if (sortBy === "price-low") {
      filtered.sort(
        (a, b) => Number.parseInt(a.price.replace(/[^\d]/g, "")) - Number.parseInt(b.price.replace(/[^\d]/g, "")),
      )
    } else if (sortBy === "price-high") {
      filtered.sort(
        (a, b) => Number.parseInt(b.price.replace(/[^\d]/g, "")) - Number.parseInt(a.price.replace(/[^\d]/g, "")),
      )
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => Number.parseInt(b.duration.split(" ")[0]) - Number.parseInt(a.duration.split(" ")[0]))
    } else {
      // Default: featured
      filtered.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
    }

    setFilteredPackages(filtered)
  }, [searchTerm, selectedCategory, priceRange, duration, sortBy])

  // Featured packages
  const featuredPackages = tourPackages.filter((pkg) => pkg.featured)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-gray-600">Loading tour packages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image src="/images/bg_1.jpeg" alt="Tour Packages" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/30 flex flex-col justify-center px-6 md:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">IRCTC Tour Packages</h1>
            <p className="mt-4 text-xl text-white/90 max-w-2xl">
              Discover India's rich heritage, culture, and natural beauty with our curated tour packages
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Badge className="bg-white text-blue-700 hover:bg-gray-100 px-3 py-1 text-sm">Cultural Tours</Badge>
              <Badge className="bg-white text-blue-700 hover:bg-gray-100 px-3 py-1 text-sm">Pilgrimage</Badge>
              <Badge className="bg-white text-blue-700 hover:bg-gray-100 px-3 py-1 text-sm">Hill Stations</Badge>
              <Badge className="bg-white text-blue-700 hover:bg-gray-100 px-3 py-1 text-sm">Wildlife</Badge>
              <Badge className="bg-white text-blue-700 hover:bg-gray-100 px-3 py-1 text-sm">Adventure</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search destinations, tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => document.getElementById("filters")?.scrollIntoView()}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Tour Packages</h2>
            <p className="text-gray-600 mt-1">Handpicked packages for an unforgettable experience</p>
          </div>
          <Link href="#all-packages">
            <Button variant="link" className="text-blue-700">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPackages.slice(0, 3).map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-48">
                  <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-rose-500"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-blue-700"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-blue-700">{pkg.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{pkg.destinations.join(", ")}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{pkg.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                      <div className="text-xl font-bold text-blue-700">{pkg.price}</div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                    <Link href={`/tour-packages/${pkg.id}`}>
                      <Button className="bg-blue-700 hover:bg-blue-800">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4" id="filters">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={category.id}
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 text-blue-700 focus:ring-blue-700"
                      />
                      <label htmlFor={category.id} className="ml-2 text-sm text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹)</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[5000, 30000]}
                    min={5000}
                    max={30000}
                    step={1000}
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
                <h4 className="text-sm font-medium text-gray-700 mb-2">Duration</h4>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "All Durations" },
                    { id: "1-3", label: "1-3 Days" },
                    { id: "4-7", label: "4-7 Days" },
                    { id: "8-14", label: "8-14 Days" },
                    { id: "15+", label: "15+ Days" },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`duration-${option.id}`}
                        name="duration"
                        checked={duration === option.id}
                        onChange={() => setDuration(option.id)}
                        className="h-4 w-4 text-blue-700 focus:ring-blue-700"
                      />
                      <label htmlFor={`duration-${option.id}`} className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceRange([5000, 30000])
                  setDuration("all")
                  setSortBy("featured")
                }}
                variant="outline"
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Tour Packages List */}
          <div className="lg:w-3/4" id="all-packages">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Tour Packages</h2>

              {filteredPackages.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setPriceRange([5000, 30000])
                      setDuration("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">Showing {filteredPackages.length} packages</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPackages.map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="overflow-hidden h-full flex flex-col">
                          <div className="relative h-48">
                            <Image
                              src={pkg.image || "/placeholder.svg"}
                              alt={pkg.title}
                              fill
                              className="object-cover"
                            />
                            {pkg.featured && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                              </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-rose-500"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-blue-700"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <Badge className="bg-blue-700 hover:bg-blue-800">
                                {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg text-blue-700">{pkg.title}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm font-medium">
                                  {pkg.rating} ({pkg.reviews})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{pkg.destinations.join(", ")}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{pkg.duration}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                            <div className="mt-auto">
                              <div className="flex items-center text-xs text-gray-500 mb-2">
                                <Tag className="h-3 w-3 mr-1" />
                                <span>Available: {pkg.availability}</span>
                              </div>
                              <div className="flex justify-between items-end">
                                <div>
                                  <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                                  <div className="text-xl font-bold text-blue-700">{pkg.price}</div>
                                  <div className="text-xs text-gray-500">per person</div>
                                </div>
                                <Link href={`/tour-packages/${pkg.id}`}>
                                  <Button className="bg-blue-700 hover:bg-blue-800">View Details</Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900">Why Choose IRCTC Tours</h2>
              <div className="w-24 h-1 bg-blue-700 mx-auto my-4"></div>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the best of India with our expertly curated tour packages
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Package className="h-10 w-10 text-blue-700" />,
                title: "Curated Packages",
                description: "Expertly designed itineraries covering the best attractions",
              },
              {
                icon: <Users className="h-10 w-10 text-blue-700" />,
                title: "Expert Guides",
                description: "Knowledgeable local guides to enhance your experience",
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-700" />,
                title: "Safe & Secure",
                description: "Your safety is our priority with 24/7 support",
              },
              {
                icon: <Tag className="h-10 w-10 text-blue-700" />,
                title: "Best Value",
                description: "Competitive prices with no hidden charges",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-blue-700"
              >
                <div className="p-3 bg-blue-50 rounded-full w-fit mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto my-4"></div>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our tour packages
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          {[
            {
              question: "How do I book a tour package?",
              answer:
                "You can book a tour package online through our website or mobile app. Simply browse the available packages, select your preferred package, choose your travel dates, and proceed to payment. You can also book through our customer service center by calling 1800-110-139.",
            },
            {
              question: "What is included in the tour package price?",
              answer:
                "Our tour packages typically include accommodation, transportation, meals as specified in the itinerary, sightseeing tours, and the services of a tour guide. The exact inclusions vary by package and are clearly listed on the package details page.",
            },
            {
              question: "Can I customize a tour package?",
              answer:
                "Yes, we offer customization options for most of our tour packages. You can request modifications to the itinerary, accommodation, or transportation based on your preferences. Please contact our customer service team for customization requests.",
            },
            {
              question: "What is the cancellation policy?",
              answer:
                "Our cancellation policy varies depending on the package and how far in advance you cancel. Generally, cancellations made 30 days or more before departure receive a full refund minus a processing fee. Cancellations made 15-29 days before departure receive a 75% refund, and cancellations made 7-14 days before departure receive a 50% refund. No refunds are provided for cancellations made less than 7 days before departure.",
            },
            {
              question: "Are children eligible for discounts?",
              answer:
                "Yes, children below 12 years of age are eligible for discounts. Children aged 5-11 typically receive a 25% discount on the package price, while children under 5 may travel for free if they don't require a separate bed. Please check the specific package details for child discount information.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-l-4 border-blue-700">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Info className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Still have questions? Contact our customer support team</p>
          <Button className="bg-blue-700 hover:bg-blue-800">Contact Support</Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore India?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book your dream tour package today and create memories that last a lifetime
            </p>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Browse All Packages
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

