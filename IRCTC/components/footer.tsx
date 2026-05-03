import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Shield,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Smartphone,
  Award,
  Clock,
  Train,
  Bus,
  Plane,
  Package,
  Hotel,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Top Section with App Download */}
      <div className="bg-primary-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <Smartphone className="h-12 w-12 text-white mr-4" />
              <div>
                <h3 className="text-xl text-black font-bold">Download the IRCTC App</h3>
                <p className="text-black/80">Book tickets, check PNR status, and more on the go</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2">
               
                App Store
              </Button>
              <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2">
                
                Play Store
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 mr-2 bg-white rounded-lg overflow-hidden">
                  <Image
                    src="/images/irctc_logo_2.png"
                    alt="IRCTC Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-black">IRCTC</h2>
                  <p className="text-xs text-gray-300">Indian Railways</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Indian Railway Catering and Tourism Corporation Ltd. is the official online ticket booking platform for
                Indian Railways, providing seamless travel booking experiences across India.
              </p>
              <div className="flex space-x-4 mb-8">
                <a
                  href="#"
                  className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>

              {/* Awards & Recognition */}
              <div className="bg-primary-800 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-3">
                  <Award className="h-5 w-5 text-yellow-400 mr-2" />
                  <h4 className="font-semibold">Awards & Recognition</h4>
                </div>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                    National Tourism Award for "Best Domestic Tour Operator" 2022
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                    Digital India Award for "Excellence in Digital Governance" 2021
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book-ticket"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Book Ticket
                  </Link>
                </li>
                <li>
                  <Link
                    href="/train-list"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Train List
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-train"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Track Train
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pnr-status"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    PNR Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tour-packages"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Tour Packages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/online-charts"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Online Charts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/daily-alerts"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Daily Alerts
                  </Link>
                </li>
              </ul>
            </div>

            {/* Travel Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">Travel Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/train-list"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Train className="h-4 w-4 mr-2" />
                    Train Tickets
                  </Link>
                </li>
                <li>
                  <Link href="/bus-list" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Bus className="h-4 w-4 mr-2" />
                    Bus Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/flight-list"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Plane className="h-4 w-4 mr-2" />
                    Flight Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tour-packages"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Holiday Packages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/retiring-rooms"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Hotel className="h-4 w-4 mr-2" />
                    Hotel Bookings
                  </Link>
                </li>
              </ul>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t border-primary-800">
                <h4 className="text-sm font-medium mb-3">We Accept</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white/10 p-1 rounded w-10 h-6 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=20&width=30" alt="Visa" width={30} height={20} />
                  </div>
                  <div className="bg-white/10 p-1 rounded w-10 h-6 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=20&width=30" alt="Mastercard" width={30} height={20} />
                  </div>
                  <div className="bg-white/10 p-1 rounded w-10 h-6 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=20&width=30" alt="RuPay" width={30} height={20} />
                  </div>
                  <div className="bg-white/10 p-1 rounded w-10 h-6 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=20&width=30" alt="UPI" width={30} height={20} />
                  </div>
                  <div className="bg-white/10 p-1 rounded w-10 h-6 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=20&width=30" alt="Net Banking" width={30} height={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-300 mt-0.5" />
                  <span className="text-gray-300">IRCTC Headquarters, Bank Street, New Delhi - 110001, India</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-300" />
                  <span className="text-gray-300">139 (Customer Care)</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-300" />
                  <span className="text-gray-300">care@irctc.co.in</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-300" />
                  <span className="text-gray-300">24x7 Customer Support</span>
                </li>
              </ul>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Subscribe to Newsletter</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Your email"
                    className="bg-primary-800 border-primary-700 text-white placeholder:text-gray-400"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white hover:text-primary-900"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="mt-10 pt-6 border-t border-primary-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-3">About IRCTC</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>
                    <Link href="#" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Board of Directors
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      RTI Information
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Investor Relations
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3">Useful Links</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Agents Registration
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Advertise with Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3">Policies</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Cancellation Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3">Help</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>
                    <Link href="#" className="hover:text-white">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      How to Book
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
            <p>&copy; {new Date().getFullYear()} IRCTC. All rights reserved.</p>
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                <span>Multiple Payment Options</span>
              </div>
              <div className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-1" />
                <span>24x7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

