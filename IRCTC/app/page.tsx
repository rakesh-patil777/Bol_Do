"use client"

import type React from "react"

import { useEffect, useState, useRef, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Search,
  Train,
  Users,
  Calendar,
  MapPin,
  AlertCircle,
  Clock,
  Ticket,
  CreditCard,
  Phone,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Package,
  Globe,
  Star,
  Shield,
  User,
  Home,
  Plane,
  Bus,
  Hotel,
  BedDouble,
  Briefcase,
} from "lucide-react"

import { useVoice } from "@/hooks/voice-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const heroImages = [
  {
    src: "/images/bg_1.jpeg",
    alt: "Indian Railways Train",
    title: "Experience the New Era of Railway Travel",
    subtitle: "Book tickets, track trains, and plan your journey with ease",
  },
  {
    src: "/images/bg_2.jpeg",
    alt: "Indian Railways Engine",
    title: "Connecting India Through Railways",
    subtitle: "Explore the country with the world's fourth largest railway network",
  },
  {
    src: "/images/duronto.jpeg",
    alt: "Duronto Express",
    title: "Travel in Comfort and Style",
    subtitle: "Experience premium train services across the country",
  },
]

const popularDestinations = [
  {
    name: "New Delhi",
    image: "/images/new_delhi_station.jpeg",
    desc: "Capital of India",
    code: "NDLS",
  },
  {
    name: "Mumbai",
    image: "/images/mumbai_station.jpeg",
    desc: "Financial Capital",
    code: "CSTM",
  },
  {
    name: "Kolkata",
    image: "/images/kolkata_station.jpeg",
    desc: "City of Joy",
    code: "HWH",
  },
  {
    name: "Chennai",
    image: "/images/chennai_station.jpeg",
    desc: "Gateway to South",
    code: "MAS",
  },
  {
    name: "Bangalore",
    image: "/images/bangalore_station.jpeg",
    desc: "Silicon Valley of India",
    code: "SBC",
  },
]

const topTrains = [
  {
    name: "Rajdhani Express",
    number: "12951/12952",
    route: "Mumbai Central - New Delhi",
    image: "/images/bg_2.jpeg",
    speed: "130 km/h",
  },
  {
    name: "Shatabdi Express",
    number: "12001/12002",
    route: "New Delhi - Bhopal",
    image: "/images/bg_1.jpeg",
    speed: "150 km/h",
  },
  {
    name: "Duronto Express",
    number: "12213/12214",
    route: "Mumbai Central - New Delhi",
    image: "/images/duronto.jpeg",
    speed: "120 km/h",
  },
  {
    name: "Vande Bharat Express",
    number: "22435/22436",
    route: "New Delhi - Varanasi",
    image: "/images/bg_2.jpeg",
    speed: "180 km/h",
  },
]

const tourPackages = [
  {
    title: "Bharat Darshan",
    image: "/images/bharat_darshan.jpeg",
    duration: "7 Days",
    price: "₹15,999",
    rating: 4.7,
    description: "Explore the cultural heritage of India with this comprehensive tour package",
  },
  {
    title: "Buddhist Circuit",
    image: "/images/buddhist_circuit.jpeg",
    duration: "5 Days",
    price: "₹12,499",
    rating: 4.5,
    description: "Visit the most significant Buddhist pilgrimage sites across India",
  },
  {
    title: "Himalayan Queen",
    image: "/images/himalayan_queen.jpeg",
    duration: "6 Days",
    price: "₹18,999",
    rating: 4.8,
    description: "Experience the majestic Himalayan mountain railways with breathtaking views",
  },
  {
    title: "South India Splendor",
    image: "/images/south_temple.jpeg",
    duration: "8 Days",
    price: "₹16,499",
    rating: 4.6,
    description: "Discover the rich culture and beautiful temples of South India",
  },
]

// Parallax Section Component
interface ParallaxSectionProps {
  children: ReactNode
  bgImage: string
  overlayColor?: string
}

const ParallaxSection = ({
  children,
  bgImage,
  overlayColor = "from-blue-900/80 to-blue-900/30",
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <div ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image
          src={bgImage || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover"
          priority={false}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`}></div>
      </motion.div>
      <div className="relative z-10 container mx-auto px-4">{children}</div>
    </div>
  )
}

// Animated Counter Component
interface AnimatedCounterProps {
  value: string
  title: string
  icon: React.ReactNode
  delay?: number
}

const AnimatedCounter = ({ value, title, icon, delay = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      let start = 0
      const end = Number.parseInt(value.replace(/,/g, ""))
      const duration = 2000
      const increment = end / (duration / 16)

      setTimeout(() => {
        const timer = setInterval(() => {
          start += increment
          if (start > end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)

        return () => clearInterval(timer)
      }, delay)
    }
  }, [isVisible, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-700 card-hover"
    >
      <div className="p-2 md:p-3 bg-blue-50 rounded-full w-fit mb-3 md:mb-4">{icon}</div>
      <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-blue-700">{count.toLocaleString()}+</h3>
      <p className="text-sm md:text-base text-gray-600">{title}</p>
    </motion.div>
  )
}

// Glass Card Component
interface GlassCardProps {
  children: ReactNode
  className?: string
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-white/30 border border-white/20 shadow-lg rounded-lg overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  const {
    fromStation, setFromStation,
    toStation, setToStation,
    journeyDate, setJourneyDate,
    travelClass, setTravelClass
  } = useVoice()

  const [heroIndex, setHeroIndex] = useState(0)
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({})
  const [activeTab, setActiveTab] = useState("train-tickets")
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const observerRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Wait for the DOM to be fully loaded
    setTimeout(() => {
      const elements = document.querySelectorAll(".animate-on-scroll")

      elements.forEach((element, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible((prev) => ({ ...prev, [index]: true }))
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.1 },
        )

        observer.observe(element)
        observers.push(observer)
      })
    }, 100)

    // Hide scroll indicator after 5 seconds
    const timer = setTimeout(() => {
      setShowScrollIndicator(false)
    }, 5000)

    return () => {
      observers.forEach((observer) => observer.disconnect())
      clearTimeout(timer)
    }
  }, [])

  const handleSwapStations = () => {
    const temp = fromStation
    setFromStation(toStation)
    setToStation(temp)
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-700 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
          >
            <div className="flex flex-col items-center text-white bg-blue-700/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Scroll to explore</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5L12 19M12 19L19 12M12 19L5 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[heroIndex].src || "/placeholder.svg?height=600&width=1200"}
              alt={heroImages[heroIndex].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/30 flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-2xl"
              >
                {heroImages[heroIndex].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-2 md:mt-4 text-sm sm:text-base md:text-xl text-white/90 max-w-xl"
              >
                {heroImages[heroIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-4 md:mt-8 flex flex-wrap gap-2 md:gap-4"
              >
                <Button size="sm" className="bg-white text-blue-700 hover:bg-gray-100">
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent backdrop-blur-sm text-white border-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroIndex(index)}
              className={cn(
                "w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors",
                index === heroIndex ? "bg-white" : "bg-white/40",
              )}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Train Search Section */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 -mt-10 sm:-mt-16 md:-mt-24 mb-8 md:mb-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="transition-all duration-300"
        >
          <Card className="w-full shadow-xl border-none overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="train-tickets" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 rounded-none bg-blue-50 overflow-x-auto">
                  <TabsTrigger
                    value="train-tickets"
                    className="py-2 md:py-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-700"
                  >
                    <Train className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Train</span> Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="flight-tickets"
                    className="py-2 md:py-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-700"
                  >
                    <Plane className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Flight</span> Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="bus-tickets"
                    className="py-2 md:py-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-700"
                  >
                    <Bus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Bus</span> Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="hotels"
                    className="py-2 md:py-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-700"
                  >
                    <Hotel className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger
                    value="tour-packages"
                    className="py-2 md:py-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-700"
                  >
                    <Package className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Tour</span> Packages
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="train-tickets" className="p-4 md:p-6">
                  <form className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input
                          value={fromStation}
                          onChange={(e) => setFromStation(e.target.value)}
                          placeholder="From Station"
                          className="pl-10 h-10 md:h-12"
                        />
                        <MapPin className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="relative flex items-center justify-center w-full md:w-12 h-10">
                        <motion.button
                          type="button"
                          onClick={handleSwapStations}
                          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full text-blue-700 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          aria-label="Swap stations"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="rotate-90 md:rotate-0"
                          >
                            <path d="M7 17l10-5-10-5" />
                          </svg>
                        </motion.button>
                      </div>

                      <div className="relative flex-1">
                        <Input
                          value={toStation}
                          onChange={(e) => setToStation(e.target.value)}
                          placeholder="To Station"
                          className="pl-10 h-10 md:h-12"
                        />
                        <MapPin className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input
                          type="date"
                          value={journeyDate}
                          onChange={(e) => setJourneyDate(e.target.value)}
                          placeholder="Journey Date"
                          className="pl-10 h-10 md:h-12"
                        />
                        <Calendar className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="flex-1">
                        <Select value={travelClass} onValueChange={setTravelClass}>
                          <SelectTrigger className="w-full h-10 md:h-12">
                            <SelectValue placeholder="Travel Class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SL">Sleeper (SL)</SelectItem>
                            <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                            <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                            <SelectItem value="1A">AC First Class (1A)</SelectItem>
                            <SelectItem value="CC">Chair Car (CC)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="button"
                        className="w-full md:flex-initial md:w-32 h-10 md:h-12 bg-blue-700 hover:bg-blue-800"
                        onClick={() => (window.location.href = "/train-list")}
                      >
                        <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        Search
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center px-2 text-xs text-gray-500">
                      <span className="mr-2 mb-1">Popular routes:</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="text-blue-700 underline underline-offset-2"
                          onClick={() => {
                            setFromStation("NDLS")
                            setToStation("HWH")
                          }}
                        >
                          Delhi - Kolkata
                        </button>
                        <button
                          type="button"
                          className="text-blue-700 underline underline-offset-2"
                          onClick={() => {
                            setFromStation("CSTM")
                            setToStation("NDLS")
                          }}
                        >
                          Mumbai - Delhi
                        </button>
                        <button
                          type="button"
                          className="text-blue-700 underline underline-offset-2"
                          onClick={() => {
                            setFromStation("MAS")
                            setToStation("SBC")
                          }}
                        >
                          Chennai - Bangalore
                        </button>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="flight-tickets" className="p-4 md:p-6">
                  <form className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input placeholder="From City/Airport" className="pl-10 h-10 md:h-12" />
                        <Plane className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="relative flex items-center justify-center w-full md:w-12 h-10">
                        <motion.button
                          type="button"
                          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full text-blue-700 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          aria-label="Swap airports"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="rotate-90 md:rotate-0"
                          >
                            <path d="M7 17l10-5-10-5" />
                          </svg>
                        </motion.button>
                      </div>

                      <div className="relative flex-1">
                        <Input placeholder="To City/Airport" className="pl-10 h-10 md:h-12" />
                        <Plane className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input type="date" placeholder="Departure Date" className="pl-10 h-10 md:h-12" />
                        <Calendar className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="relative flex-1">
                        <Input type="date" placeholder="Return Date (Optional)" className="pl-10 h-10 md:h-12" />
                        <Calendar className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="flex-1">
                        <Select>
                          <SelectTrigger className="w-full h-10 md:h-12">
                            <SelectValue placeholder="Travelers & Class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="premium">Premium Economy</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="first">First Class</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="button"
                        className="w-full md:flex-initial md:w-32 h-10 md:h-12 bg-blue-700 hover:bg-blue-800"
                        onClick={() => (window.location.href = "/flight-list")}
                      >
                        <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        Search
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="bus-tickets" className="p-4 md:p-6">
                  <form className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input placeholder="From City" className="pl-10 h-10 md:h-12" />
                        <MapPin className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="relative flex items-center justify-center w-full md:w-12 h-10">
                        <motion.button
                          type="button"
                          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full text-blue-700 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          aria-label="Swap cities"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="rotate-90 md:rotate-0"
                          >
                            <path d="M7 17l10-5-10-5" />
                          </svg>
                        </motion.button>
                      </div>

                      <div className="relative flex-1">
                        <Input placeholder="To City" className="pl-10 h-10 md:h-12" />
                        <MapPin className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input type="date" placeholder="Journey Date" className="pl-10 h-10 md:h-12" />
                        <Calendar className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <Button
                        type="button"
                        className="w-full md:flex-initial md:w-32 h-10 md:h-12 bg-blue-700 hover:bg-blue-800"
                        onClick={() => (window.location.href = "/bus-list")}
                      >
                        <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        Search
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="hotels" className="p-4 md:p-6">
                  <form className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input placeholder="City or Hotel Name" className="pl-10 h-10 md:h-12" />
                        <MapPin className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Input type="date" placeholder="Check-in Date" className="pl-10 h-10 md:h-12" />
                        <Calendar className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="relative flex-1">
                        <Input type="date" placeholder="Check-out Date" className="pl-10 h-10 md:h-12" />
                        <Calendar className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="flex-1">
                        <Select>
                          <SelectTrigger className="w-full h-10 md:h-12">
                            <SelectValue placeholder="Guests & Rooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-1">1 Guest, 1 Room</SelectItem>
                            <SelectItem value="2-1">2 Guests, 1 Room</SelectItem>
                            <SelectItem value="2-2">2 Guests, 2 Rooms</SelectItem>
                            <SelectItem value="4-2">4 Guests, 2 Rooms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="button"
                        className="w-full md:flex-initial md:w-32 h-10 md:h-12 bg-blue-700 hover:bg-blue-800"
                        onClick={() => (window.location.href = "/hotel-list")}
                      >
                        <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        Search
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="tour-packages" className="p-4 md:p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <Select>
                          <SelectTrigger className="w-full h-10 md:h-12 pl-10">
                            <SelectValue placeholder="Select Destination" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="north">North India</SelectItem>
                            <SelectItem value="south">South India</SelectItem>
                            <SelectItem value="east">East India</SelectItem>
                            <SelectItem value="west">West India</SelectItem>
                            <SelectItem value="northeast">North East</SelectItem>
                            <SelectItem value="international">International</SelectItem>
                          </SelectContent>
                        </Select>
                        <Globe className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="relative">
                        <Input type="date" placeholder="Travel Date" className="pl-10 h-10 md:h-12" />
                        <Calendar className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>

                      <div className="relative">
                        <Select>
                          <SelectTrigger className="w-full h-10 md:h-12 pl-10">
                            <SelectValue placeholder="Budget Range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="budget">Budget (Under ₹10,000)</SelectItem>
                            <SelectItem value="standard">Standard (₹10,000 - ₹20,000)</SelectItem>
                            <SelectItem value="premium">Premium (₹20,000 - ₹50,000)</SelectItem>
                            <SelectItem value="luxury">Luxury (Above ₹50,000)</SelectItem>
                          </SelectContent>
                        </Select>
                        <CreditCard className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full md:w-auto h-10 md:h-12 bg-blue-700 hover:bg-blue-800"
                      onClick={() => (window.location.href = "/tour-packages")}
                    >
                      <Package className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Find Packages
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Stats Section */}
      <ParallaxSection bgImage="/images/bg_1.jpeg" overlayColor="from-blue-900/90 to-blue-900/70">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">Indian Railways in Numbers</h2>
            <div className="w-16 md:w-24 h-1 bg-white mx-auto my-3 md:my-4"></div>
            <p className="mt-2 md:mt-4 text-base md:text-xl text-white/90 max-w-2xl mx-auto">
              The world's fourth largest railway network connecting the nation
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <AnimatedCounter
            value="23,000"
            title="Daily Trains"
            icon={<Train className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />}
            delay={0}
          />
          <AnimatedCounter
            value="7,325"
            title="Stations"
            icon={<MapPin className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />}
            delay={200}
          />
          <AnimatedCounter
            value="8,500,000"
            title="Daily Passengers"
            icon={<Users className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />}
            delay={400}
          />
          <AnimatedCounter
            value="67,956"
            title="Route Kilometers"
            icon={<Globe className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />}
            delay={600}
          />
        </div>
      </ParallaxSection>

      {/* Features Section */}
      <section className="py-10 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-on-scroll">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible[0] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Indian Railways</h2>
              <div className="w-16 md:w-24 h-1 bg-blue-700 mx-auto my-3 md:my-4"></div>
              <p className="mt-2 md:mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the best of railway travel with modern amenities and seamless services
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: <Users className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />,
                title: "Millions of Passengers",
                description: "Trusted by millions of passengers every day across India",
              },
              {
                icon: <TrendingUp className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />,
                title: "High-Speed Trains",
                description: "Modern fleet with trains running at speeds up to 180 km/h",
              },
              {
                icon: <MapPin className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />,
                title: "7,000+ Stations",
                description: "Connecting cities, towns and villages across the country",
              },
              {
                icon: <Shield className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />,
                title: "Secure Bookings",
                description: "Multiple secure payment options for your convenience",
              },
              {
                icon: <BedDouble className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />,
                title: "Railway Stays",
                description: "Book comfortable accommodations at major stations",
                link: "/stays",
              },
              {
                icon: <Briefcase className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />,
                title: "Premium Lounges",
                description: "Relax in comfort while waiting for your train",
                link: "/lounge",
              },
              {
                icon: <Search className="h-6 w-6 md:h-10 md:w-10 text-blue-700" />,
                title: "PNR Status",
                description: "Check the current status of your ticket",
                link: "/pnr-status",
              },
            ].map((feature, index) => (
              <div className="animate-on-scroll" key={index}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={isVisible[index + 1] ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                  className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-blue-700"
                >
                  <div className="p-2 md:p-3 bg-blue-50 rounded-full w-fit mb-3 md:mb-4">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                  {feature.link && (
                    <Link href={feature.link} className="text-blue-700 text-sm mt-2 inline-block hover:underline">
                      Learn more →
                    </Link>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-10 md:py-16 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[5] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Destinations</h2>
            <div className="w-16 md:w-24 h-1 bg-blue-700 mx-auto my-3 md:my-4"></div>
            <p className="mt-2 md:mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore these top destinations connected by Indian Railways
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {popularDestinations.map((destination, index) => (
            <div className="animate-on-scroll" key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible[index + 6] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg shadow-md">
                  <div className="relative h-36 md:h-48">
                    <Image
                      src={destination.image || "/placeholder.svg?height=200&width=300"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent flex flex-col justify-end p-3 md:p-4">
                      <h3 className="text-white font-semibold text-base md:text-lg">{destination.name}</h3>
                      <p className="text-white/80 text-xs md:text-sm">{destination.desc}</p>
                      <div className="text-xs md:text-sm text-white/70 mt-1">Station code: {destination.code}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Trains */}
      <section className="py-10 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-on-scroll">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible[11] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Premium Train Services</h2>
              <div className="w-16 md:w-24 h-1 bg-blue-700 mx-auto my-3 md:my-4"></div>
              <p className="mt-2 md:mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                Experience luxury and speed with our premium train services
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topTrains.map((train, index) => (
              <div className="animate-on-scroll" key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible[index + 12] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-36 md:h-48">
                    <Image
                      src={train.image || "/placeholder.svg?height=200&width=300"}
                      alt={train.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium">
                      {train.speed}
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-base md:text-lg text-blue-700">{train.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">Train No: {train.number}</p>
                    <p className="text-gray-500 text-xs mt-1">{train.route}</p>
                    <div className="mt-3 md:mt-4 flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white text-xs md:text-sm"
                      >
                        View Details
                      </Button>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Premium
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="py-10 md:py-16 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[16] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore Tour Packages</h2>
            <div className="w-16 md:w-24 h-1 bg-blue-700 mx-auto my-3 md:my-4"></div>
            <p className="mt-2 md:mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover India with our curated tour packages
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {tourPackages.map((pkg, index) => (
            <div className="animate-on-scroll" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible[index + 17] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-36 md:h-48">
                  <Image
                    src={pkg.image || "/placeholder.svg?height=200&width=300"}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <div className="flex justify-between items-center mb-1 md:mb-2">
                    <h3 className="font-semibold text-base md:text-lg text-blue-700">{pkg.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-xs md:text-sm">{pkg.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base md:text-lg text-blue-700">{pkg.price}</span>
                    <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-xs md:text-sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:mt-10 animate-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[21] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/tour-packages">
              <Button className="bg-blue-700 hover:bg-blue-800">
                View All Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Promo */}
      <section className="py-10 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 animate-on-scroll">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible[22] ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
                  Download the IRCTC Mobile App
                </h2>
                <div className="w-16 md:w-24 h-1 bg-blue-700 my-3 md:my-4"></div>
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                  Experience the convenience of booking tickets, checking PNR status, and tracking trains on the go with
                  our mobile app.
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs md:text-sm">
                 
                    Google Play
                  </Button>
                  <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs md:text-sm">
                   
                    App Store
                  </Button>
                </div>
                <div className="mt-4 md:mt-6 flex items-center text-gray-500 text-xs md:text-sm">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Available for both Android and iOS devices
                </div>
              </motion.div>
            </div>
            <div className="flex-1 relative animate-on-scroll">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible[23] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7 }}
                className="relative h-[300px] md:h-[500px] w-[200px] md:w-[250px] mx-auto md:ml-auto"
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-blue-700 rounded-3xl shadow-xl overflow-hidden"
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                    rotateX: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                  }}
                >
                  <div className="absolute top-8 left-0 right-0 bottom-0 bg-white rounded-t-3xl overflow-hidden">
                    <Image src="/images/bg_1.jpeg" alt="IRCTC Mobile App" fill className="object-cover opacity-20" />
                    <div className="relative z-10 p-4 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <div className="flex items-center">
                          <Image
                            src="/images/irctc_logo_2.png"
                            alt="IRCTC Logo"
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          <span className="font-bold text-sm md:text-base text-blue-700">IRCTC</span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-700"></div>
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-700 opacity-50"></div>
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-700 opacity-30"></div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md p-2 md:p-3 mb-3 md:mb-4">
                        <h4 className="text-xs md:text-sm font-medium text-blue-700 mb-1 md:mb-2">Book Ticket</h4>
                        <div className="space-y-1 md:space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 text-[10px] md:text-xs">From</span>
                            <span className="font-medium text-[10px] md:text-xs">New Delhi</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 text-[10px] md:text-xs">To</span>
                            <span className="font-medium text-[10px] md:text-xs">Mumbai Central</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 text-[10px] md:text-xs">Date</span>
                            <span className="font-medium text-[10px] md:text-xs">23rd March, 2025</span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-3">
                          <div className="bg-blue-700 text-white text-[10px] md:text-xs py-1 px-2 rounded text-center">
                            Search Trains
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md p-2 md:p-3 mb-3 md:mb-4">
                        <h4 className="text-xs md:text-sm font-medium text-blue-700 mb-1 md:mb-2">Recent Bookings</h4>
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center text-xs">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mr-2">
                              <Train className="h-3 w-3 md:h-4 md:w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-[10px] md:text-xs">Rajdhani Express</p>
                              <p className="text-gray-500 text-[10px] md:text-xs">PNR: 2641857391</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex justify-around py-2 md:py-3 border-t border-gray-200">
                          <div className="flex flex-col items-center">
                            <Home className="h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                            <span className="text-[10px] md:text-xs mt-1">Home</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Ticket className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            <span className="text-[10px] md:text-xs mt-1">Bookings</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Package className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            <span className="text-[10px] md:text-xs mt-1">Packages</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <User className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            <span className="text-[10px] md:text-xs mt-1">Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Service */}
      <section className="py-10 md:py-16 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[24] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Support</h2>
            <div className="w-16 md:w-24 h-1 bg-blue-700 mx-auto my-3 md:my-4"></div>
            <p className="mt-2 md:mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help you with any queries or assistance you may need
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <Phone className="h-6 w-6 md:h-8 md:w-8 text-blue-700" />,
              title: "Call Us",
              description: "Our support team is available 24/7",
              action: "139",
              ref: 25,
            },
            {
              icon: <HelpCircle className="h-6 w-6 md:h-8 md:w-8 text-blue-700" />,
              title: "Help Center",
              description: "Find answers to common questions",
              action: "Visit Help Center",
              ref: 26,
            },
            {
              icon: <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-blue-700" />,
              title: "Emergency",
              description: "For urgent assistance during travel",
              action: "1800-111-139",
              ref: 27,
            },
          ].map((item, index) => (
            <div className="animate-on-scroll" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible[item.ref] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-blue-700">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{item.description}</p>
                {typeof item.action === "string" && !item.action.includes("Visit") ? (
                  <div className="text-blue-700 font-semibold text-sm md:text-base">{item.action}</div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white text-xs md:text-sm"
                  >
                    {item.action}
                  </Button>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-on-scroll">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible[28] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Passengers Say</h2>
              <div className="w-16 md:w-24 h-1 bg-blue-700 mx-auto my-3 md:my-4"></div>
              <p className="mt-2 md:mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                Read reviews from passengers who travel with Indian Railways
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                avatar: "/placeholder.svg?height=50&width=50",
                text: "The new IRCTC website is amazing! Booking tickets is now so easy and intuitive. I love the new train tracking feature too.",
              },
              {
                name: "Priya Sharma",
                location: "Mumbai",
                avatar: "/placeholder.svg?height=50&width=50",
                text: "I've been using IRCTC for years, and this new update is the best so far. Clean interface, fast loading times, and great mobile responsiveness.",
              },
              {
                name: "Amit Patel",
                location: "Ahmedabad",
                avatar: "/placeholder.svg?height=50&width=50",
                text: "The PNR status tracking is now real-time and very accurate. It has made my travel planning much easier. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div className="animate-on-scroll" key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible[index + 29] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white p-4 md:p-6 rounded-lg shadow-md"
                >
                  <div className="mb-3 md:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 inline-block text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden mr-3 bg-blue-50">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg?height=50&width=50"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-blue-700">{testimonial.name}</h4>
                      <p className="text-gray-500 text-xs md:text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10 md:py-16 bg-blue-700">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="animate-on-scroll">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible[32] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">Stay Updated</h2>
              <div className="w-16 md:w-24 h-1 bg-white mx-auto my-3 md:my-4"></div>
              <p className="text-base md:text-xl text-white/90 mb-4 md:mb-8">
                Subscribe to our newsletter to receive updates on new train services, promotions, and travel tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-white text-blue-700 hover:bg-white/90">Subscribe</Button>
              </div>
              <p className="text-white/70 text-xs md:text-sm mt-3 md:mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from IRCTC.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

