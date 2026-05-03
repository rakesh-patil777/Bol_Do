"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Bell,
  Search,
  HelpCircle,
  Phone,
  Train,
  Ticket,
  Package,
  Hotel,
  Map,
  Calendar,
  Globe,
  Home,
  Info,
  Briefcase,
  Heart,
  AlertCircle,
  Bus,
  Plane,
  FileText,
  BellIcon,
  BedDouble,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  href: string
  icon?: React.ReactNode
  description?: string
  children?: {
    title: string
    href: string
    description?: string
    icon?: React.ReactNode
  }[]
}

const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Train Tickets",
    href: "#",
    icon: <Train className="h-5 w-5" />,
    children: [
      {
        title: "Book Ticket",
        href: "/train-list",
        description: "Search and book train tickets",
        icon: <Ticket className="h-5 w-5" />,
      },
      {
        title: "PNR Status",
        href: "/pnr-status",
        description: "Check your PNR status",
        icon: <Search className="h-5 w-5" />,
      },
      {
        title: "Train Schedule",
        href: "/train-schedule",
        description: "View train timings and routes",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        title: "Train List",
        href: "/train-list",
        description: "Browse all available trains",
        icon: <Train className="h-5 w-5" />,
      },
      {
        title: "Track Train",
        href: "/track-train",
        description: "Real-time train tracking",
        icon: <Map className="h-5 w-5" />,
      },
      {
        title: "Online Charts",
        href: "/online-charts",
        description: "View train charts and seat layouts",
        icon: <FileText className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Bus Tickets",
    href: "#",
    icon: <Bus className="h-5 w-5" />,
    children: [
      {
        title: "Book Bus",
        href: "/bus-list",
        description: "Search and book bus tickets",
        icon: <Ticket className="h-5 w-5" />,
      },
      {
        title: "Bus Routes",
        href: "/bus-routes",
        description: "Explore popular bus routes",
        icon: <Map className="h-5 w-5" />,
      },
      {
        title: "Bus Operators",
        href: "/bus-operators",
        description: "View all bus operators",
        icon: <Bus className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Flight Tickets",
    href: "#",
    icon: <Plane className="h-5 w-5" />,
    children: [
      {
        title: "Book Flight",
        href: "/flight-list",
        description: "Search and book flight tickets",
        icon: <Ticket className="h-5 w-5" />,
      },
      {
        title: "Flight Status",
        href: "/flight-status",
        description: "Check your flight status",
        icon: <Search className="h-5 w-5" />,
      },
      {
        title: "Airlines",
        href: "/airlines",
        description: "View all airlines",
        icon: <Plane className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Tourism",
    href: "#",
    icon: <Globe className="h-5 w-5" />,
    children: [
      {
        title: "Tour Packages",
        href: "/tour-packages",
        description: "Explore curated holiday packages",
        icon: <Package className="h-5 w-5" />,
      },
      {
        title: "Luxury Trains",
        href: "/luxury-trains",
        description: "Experience royal train journeys",
        icon: <Train className="h-5 w-5" />,
      },
      {
        title: "Hill Railways",
        href: "/hill-railways",
        description: "Scenic mountain train routes",
        icon: <Map className="h-5 w-5" />,
      },
      {
        title: "International Packages",
        href: "/international-packages",
        description: "Travel abroad with IRCTC",
        icon: <Globe className="h-5 w-5" />,
      },
      {
        title: "Religious Tours",
        href: "/religious-tours",
        description: "Pilgrimage and spiritual journeys",
        icon: <Heart className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Stays",
    href: "#",
    icon: <Hotel className="h-5 w-5" />,
    children: [
      {
        title: "All Stays",
        href: "/stays",
        description: "Browse all accommodation options",
        icon: <Hotel className="h-5 w-5" />,
      },
      {
        title: "Retiring Rooms",
        href: "/stays?type=retiring-room",
        description: "Book station rest houses",
        icon: <BedDouble className="h-5 w-5" />,
      },
      {
        title: "Lounge",
        href: "/lounge",
        description: "Premium waiting lounges",
        icon: <Briefcase className="h-5 w-5" />,
      },
      {
        title: "Rail Yatri Niwas",
        href: "/rail-yatri-niwas",
        description: "Budget accommodation near stations",
        icon: <Home className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Alerts",
    href: "/daily-alerts",
    icon: <BellIcon className="h-5 w-5" />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Phone className="h-5 w-5" />,
  },
]

export default function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (mobileSubmenuOpen) {
      setMobileSubmenuOpen(null)
    }
  }

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(title)
    }
  }

  const toggleMobileSubmenu = (title: string) => {
    if (mobileSubmenuOpen === title) {
      setMobileSubmenuOpen(null)
    } else {
      setMobileSubmenuOpen(title)
    }
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const handleNotificationClick = () => {
    setNotifications(0)
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white shadow-md py-1 md:py-2" : "bg-white/95 backdrop-blur-sm py-2 md:py-3",
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between border-b border-gray-200 pb-2 mb-2 text-xs">
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-primary hover:text-primary-800 transition-colors flex items-center">
              <Info className="h-3 w-3 mr-1" />
              <span>About Us</span>
            </Link>
            <Link
              href="/daily-alerts"
              className="text-primary hover:text-primary-800 transition-colors flex items-center"
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>Alerts</span>
            </Link>
            <Link href="#" className="text-primary hover:text-primary-800 transition-colors flex items-center">
              <HelpCircle className="h-3 w-3 mr-1" />
              <span>Help</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              English
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              हिंदी
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>139</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 md:h-12 md:w-12 mr-2">
              <Image
                src="/images/irctc_logo_2.png"
                alt="IRCTC Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-base md:text-xl text-primary">IRCTC</h1>
              <p className="text-[10px] md:text-xs text-gray-500">Indian Railways</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-x-1" ref={dropdownRef}>
            {mainNavItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.children ? (
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md flex items-center transition-colors",
                      activeDropdown === item.title
                        ? "text-primary bg-primary-50"
                        : "text-gray-700 hover:text-primary hover:bg-primary-50",
                    )}
                  >
                    {item.title}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.title ? "rotate-180" : "",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary-50 rounded-md transition-colors flex items-center"
                  >
                    {item.title}
                  </Link>
                )}

                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="p-4 grid gap-4">
                          {item.children.map((child, childIndex) => (
                            <Link
                              key={childIndex}
                              href={child.href}
                              className="flex items-start p-2 rounded-md hover:bg-primary-50 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex-shrink-0 mt-1 text-primary">{child.icon}</div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{child.title}</p>
                                {child.description && <p className="text-xs text-gray-500">{child.description}</p>}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - User & Mobile Menu */}
          <div className="flex items-center gap-x-2">
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "300px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block relative"
                >
                  <Input placeholder="Search trains, stations, services..." className="pr-8" autoFocus />
                  <X
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer"
                    onClick={toggleSearch}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="hidden md:flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-full hover:bg-primary-50 transition-colors"
              onClick={toggleSearch}
            >
              <Search className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </button>

            <button
              className="hidden md:flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-full hover:bg-primary-50 transition-colors relative"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-3 w-3 md:h-4 md:w-4 bg-accent text-white text-[8px] md:text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="hidden md:block relative group">
                <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-primary-50 transition-colors">
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden border-2 border-primary">
                    <Image src="/placeholder.svg?height=32&width=32" alt="User" width={32} height={32} />
                  </div>
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">Rail User</p>
                    <p className="text-xs text-gray-500">rail@example.com</p>
                  </div>
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50">
                    <User className="inline-block mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50"
                  >
                    <Ticket className="inline-block mr-2 h-4 w-4" />
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 w-full text-left"
                  >
                    <LogOut className="inline-block mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="hidden md:block px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-800 transition-colors"
                onClick={handleLogin}
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="flex items-center justify-center h-8 w-8 lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="max-h-[70vh] overflow-y-auto">
              <nav className="p-4">
                {mainNavItems.map((item, index) => (
                  <div key={index} className="mb-2 border-b border-gray-100 pb-2">
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu(item.title)}
                          className="flex items-center justify-between w-full py-2 px-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center">
                            {item.icon && <span className="mr-2 text-primary">{item.icon}</span>}
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              mobileSubmenuOpen === item.title ? "rotate-180" : "",
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileSubmenuOpen === item.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 mt-1 space-y-1"
                            >
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.href}
                                  className="flex items-center py-2 px-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                                  onClick={() => {
                                    setMobileMenuOpen(false)
                                    setMobileSubmenuOpen(null)
                                  }}
                                >
                                  {child.icon && <span className="mr-2 text-primary">{child.icon}</span>}
                                  <span>{child.title}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center py-2 px-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon && <span className="mr-2 text-primary">{item.icon}</span>}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary">
                          <Image src="/placeholder.svg?height=40&width=40" alt="User" width={40} height={40} />
                        </div>
                        <div>
                          <h4 className="font-medium">Rail User</h4>
                          <p className="text-xs text-gray-500">rail@example.com</p>
                        </div>
                      </div>
                      <Link
                        href="/dashboard"
                        className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="inline-block mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Ticket className="inline-block mr-2 h-4 w-4" />
                        My Bookings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setMobileMenuOpen(false)
                        }}
                        className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        <LogOut className="inline-block mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogin()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full py-2 px-4 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-800 transition-colors"
                    >
                      Login / Register
                    </button>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                  <Link
                    href="#"
                    className="flex items-center py-1.5 px-3 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Help
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center py-1.5 px-3 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Link>
                  <Link
                    href="/daily-alerts"
                    className="flex items-center py-1.5 px-3 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Alerts
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

