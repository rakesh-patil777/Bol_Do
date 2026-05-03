"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, Settings, LogOut, Bell, Search, HelpCircle, Phone } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const mainNavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Book Ticket",
    href: "/book-ticket",
  },
  {
    title: "PNR Status",
    href: "#",
  },
  {
    title: "Train List",
    href: "/train-list",
  },
  {
    title: "Track Train",
    href: "/track-train",
  },
  {
    title: "Contact Us",
    href: "#",
  },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image src="/placeholder.svg?height=40&width=40" alt="IRCTC Logo" width={40} height={40} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-primary">IRCTC</h1>
              <p className="text-xs text-gray-500">Indian Railways</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-8">
            {mainNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Side - User & Mobile Menu */}
          <div className="flex items-center gap-x-4">
            <button className="hidden md:flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5 text-gray-500" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-auto">
                  <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">Special Discount</p>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Book your tickets now and get 10% off using code IRCTC10
                    </p>
                  </div>
                  <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">Booking Confirmed</p>
                      <span className="text-xs text-gray-500">1d ago</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Your booking for Rajdhani Express (PNR: 2641857391) has been confirmed
                    </p>
                  </div>
                  <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">System Update</p>
                      <span className="text-xs text-gray-500">3d ago</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      IRCTC website will be under maintenance from 2 AM to 5 AM tomorrow
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden md:block rounded-full overflow-hidden h-9 w-9 border-2 border-primary/20">
                    <Image src="/placeholder.svg?height=36&width=36" alt="User" width={36} height={36} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button>Login / Register</Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t mt-2"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-y-4">
                {mainNavItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-base font-medium text-gray-700 hover:text-primary flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-2">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <Image src="/placeholder.svg?height=40&width=40" alt="User" width={40} height={40} />
                        </div>
                        <div>
                          <h4 className="font-medium">Raj Kumar</h4>
                          <p className="text-xs text-gray-500">raj@example.com</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mb-2"
                        onClick={() => {
                          setIsLoggedIn(false)
                          setMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Login / Register</Button>
                    </Link>
                  )}
                </div>
                <div className="border-t pt-4 mt-2">
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

