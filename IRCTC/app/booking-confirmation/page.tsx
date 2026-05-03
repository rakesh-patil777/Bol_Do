"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Ticket,
  Download,
  Printer,
  Share2,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BookingConfirmationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your booking confirmation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
        <p className="text-gray-600 mt-1 max-w-xl mx-auto">
          Your ticket has been booked successfully. You will receive a confirmation email shortly.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">E-Ticket / Reservation Voucher</h2>
                <div className="text-sm bg-white/20 px-2 py-1 rounded">PNR: 2641857391</div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Train Details</h3>
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">Rajdhani Express</p>
                    <p className="text-gray-600">Train No: 12951/12952</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>23rd March , 2025</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>16:35</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Passenger Details</h3>
                  <div className="space-y-1">
                    <p className="font-medium">Rail User</p>
                    <p className="text-gray-600">Age: 32 • Gender: Male</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Ticket className="h-4 w-4 mr-1" />
                      <span>Coach: B4 • Seat: 32</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed pt-6 mb-6">
                <div className="flex items-start mb-4">
                  <div className="min-w-[100px] text-center">
                    <p className="text-lg font-bold text-gray-900">16:35</p>
                    <p className="text-xs text-gray-500">23rd March , 2025</p>
                  </div>

                  <div className="flex flex-col items-center mx-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <div className="h-12 w-0.5 bg-blue-200"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3">
                      <p className="font-medium">New Delhi</p>
                      <p className="text-sm text-gray-500">Departure</p>
                    </div>
                    <div>
                      <p className="font-medium">Mumbai Central</p>
                      <p className="text-sm text-gray-500">Arrival (08:45, 16 Oct)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Booking Status</p>
                  <p className="font-medium text-green-600">Confirmed</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Payment ID</p>
                  <p className="font-medium">PAY123456789</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Amount Paid</p>
                  <p className="font-medium">₹1,995</p>
                </div>
              </div>

              <div className="border-t pt-6 flex flex-wrap gap-3 justify-center md:justify-end">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download E-Ticket
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">Rail User</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">rail@example.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Important Information</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-2 flex-shrink-0 text-xs">
                    1
                  </span>
                  <span>
                    Please carry a valid ID proof while traveling. E-ticket without ID proof is not valid for travel.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-2 flex-shrink-0 text-xs">
                    2
                  </span>
                  <span>Arrive at the station at least 30 minutes before the scheduled departure.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-2 flex-shrink-0 text-xs">
                    3
                  </span>
                  <span>Cancellation charges will apply as per Indian Railways rules.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">Thank you for booking with IRCTC. We wish you a pleasant journey!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="flex items-center">
              Go to Dashboard
            </Button>
            <Button onClick={() => router.push("/")} className="flex items-center bg-blue-700 hover:bg-blue-800">
              Book Another Ticket
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

