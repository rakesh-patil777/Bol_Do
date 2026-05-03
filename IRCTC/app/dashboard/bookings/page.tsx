"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ticket, Package, Calendar, Clock, MapPin, Search, Filter, Download, Printer, Share2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data
const trainBookings = [
  {
    id: "1",
    trainName: "Rajdhani Express",
    trainNumber: "12951",
    from: "New Delhi",
    to: "Mumbai Central",
    date: "24 March , 2025",
    time: "16:35",
    status: "Confirmed",
    coach: "B4",
    seat: "32",
    pnr: "2641857391",
    amount: "₹1,995",
    passengers: [
      {
        name: "Rail User",
        age: "32",
        gender: "Male",
        seat: "B4-32",
        status: "Confirmed",
      },
    ],
  },
  {
    id: "2",
    trainName: "Shatabdi Express",
    trainNumber: "12001",
    from: "New Delhi",
    to: "Bhopal",
    date: "26 April , 2025",
    time: "06:00",
    status: "Confirmed",
    coach: "C7",
    seat: "45",
    pnr: "8745219630",
    amount: "₹1,800",
    passengers: [
      {
        name: "Rail User",
        age: "32",
        gender: "Male",
        seat: "C7-45",
        status: "Confirmed",
      },
    ],
  },
  {
    id: "3",
    trainName: "Duronto Express",
    trainNumber: "12213",
    from: "Mumbai Central",
    to: "New Delhi",
    date: "21 March , 2025",
    time: "22:00",
    status: "Waiting List",
    coach: "Pending",
    seat: "WL-5",
    pnr: "9632587410",
    amount: "₹1,600",
    passengers: [
      {
        name: "Rail User",
        age: "32",
        gender: "Male",
        seat: "WL-5",
        status: "Waiting List",
      },
    ],
  },
]

const packageBookings = [
  {
    id: "1",
    title: "Bharat Darshan",
    type: "Tour Package",
    destination: "Multiple Destinations",
    duration: "7 Days",
    startDate: "2 April , 2025",
    endDate: "6 April , 2025",
    status: "Confirmed",
    amount: "₹15,999",
    bookingId: "TOUR123456",
    passengers: 1,
  },
  {
    id: "2",
    title: "Buddhist Circuit",
    type: "Tour Package",
    destination: "Bodh Gaya, Sarnath, Kushinagar",
    duration: "5 Days",
    startDate: "23 March, 2025",
    endDate: "28 March, 2025",
    status: "Pending Payment",
    amount: "₹12,499",
    bookingId: "TOUR789012",
    passengers: 2,
  },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("trains")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const filteredTrainBookings = trainBookings.filter((booking) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      booking.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.trainNumber.includes(searchTerm) ||
      booking.pnr.includes(searchTerm)

    // Apply status filter
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()

    // Apply date filter (simplified for demo)
    const matchesDate = dateFilter === "all" // In a real app, we would filter by date

    return matchesSearch && matchesStatus && matchesDate
  })

  const filteredPackageBookings = packageBookings.filter((booking) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId.includes(searchTerm)

    // Apply status filter
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()

    // Apply date filter (simplified for demo)
    const matchesDate = dateFilter === "all" // In a real app, we would filter by date

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking)
  }

  const closeBookingDetails = () => {
    setSelectedBooking(null)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-gray-500 mt-1">View and manage all your bookings in one place</p>
      </motion.div>

      <Tabs defaultValue="trains" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="trains" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Ticket className="h-4 w-4 mr-2" />
              Train Tickets
            </TabsTrigger>
            <TabsTrigger value="packages" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Tour Packages
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Status</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="waiting list">Waiting List</SelectItem>
                  <SelectItem value="pending payment">Pending Payment</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[130px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Date</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <TabsContent value="trains" className="mt-0">
          {filteredTrainBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Ticket className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No train bookings found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your filters or search criteria"
                  : "You haven't made any train bookings yet"}
              </p>
              <Button>Book a Train Ticket</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTrainBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  onClick={() => handleBookingClick(booking)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="bg-blue-50 p-4 border-b border-blue-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-blue-800">{booking.trainName}</h3>
                            <p className="text-sm text-gray-600">{booking.trainNumber}</p>
                          </div>
                          <Badge
                            variant={
                              booking.status === "Confirmed"
                                ? "success"
                                : booking.status === "Waiting List"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start mb-4">
                          <div className="min-w-[100px] text-center">
                            <p className="text-lg font-bold text-gray-900">{booking.time}</p>
                            <p className="text-sm text-gray-500">{booking.date}</p>
                          </div>

                          <div className="flex flex-col items-center mx-2">
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                            <div className="h-12 w-0.5 bg-blue-200"></div>
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                          </div>

                          <div className="flex-1">
                            <div className="mb-3">
                              <p className="font-medium">{booking.from}</p>
                              <p className="text-sm text-gray-500">Departure</p>
                            </div>
                            <div>
                              <p className="font-medium">{booking.to}</p>
                              <p className="text-sm text-gray-500">Arrival</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                          <div className="flex space-x-4 text-sm">
                            <div>
                              <span className="text-gray-500">PNR:</span>{" "}
                              <span className="font-medium">{booking.pnr}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Coach:</span>{" "}
                              <span className="font-medium">{booking.coach}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Seat:</span>{" "}
                              <span className="font-medium">{booking.seat}</span>
                            </div>
                          </div>
                          <div className="font-bold text-blue-700">{booking.amount}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="packages" className="mt-0">
          {filteredPackageBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No package bookings found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your filters or search criteria"
                  : "You haven't booked any tour packages yet"}
              </p>
              <Button>Explore Tour Packages</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPackageBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  onClick={() => handleBookingClick(booking)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="bg-amber-50 p-4 border-b border-amber-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-amber-800">{booking.title}</h3>
                            <p className="text-sm text-gray-600">{booking.type}</p>
                          </div>
                          <Badge
                            variant={
                              booking.status === "Confirmed"
                                ? "success"
                                : booking.status === "Pending Payment"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                              <p className="text-gray-700">{booking.destination}</p>
                            </div>
                            <div className="flex items-center mb-2">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <p className="text-gray-700">{booking.duration}</p>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                              <p className="text-gray-700">
                                {booking.startDate} - {booking.endDate}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-700 text-lg">{booking.amount}</p>
                            <p className="text-sm text-gray-500">
                              {booking.passengers} {booking.passengers > 1 ? "Travelers" : "Traveler"}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                          <div className="text-sm">
                            <span className="text-gray-500">Booking ID:</span>{" "}
                            <span className="font-medium">{booking.bookingId}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <Button variant="ghost" size="icon" onClick={closeBookingDetails} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              {/* Train Booking Details */}
              {"trainName" in selectedBooking ? (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-blue-800 text-lg">{selectedBooking.trainName}</h3>
                        <p className="text-gray-600">{selectedBooking.trainNumber}</p>
                      </div>
                      <Badge
                        variant={
                          selectedBooking.status === "Confirmed"
                            ? "success"
                            : selectedBooking.status === "Waiting List"
                              ? "warning"
                              : "outline"
                        }
                        className="ml-2"
                      >
                        {selectedBooking.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Journey Details</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                            <div className="h-12 w-0.5 bg-blue-200"></div>
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                          </div>
                          <div>
                            <div className="mb-3">
                              <p className="font-medium">{selectedBooking.from}</p>
                              <p className="text-sm text-gray-500">Departure</p>
                            </div>
                            <div>
                              <p className="font-medium">{selectedBooking.to}</p>
                              <p className="text-sm text-gray-500">Arrival</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Booking Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">PNR Number</span>
                          <span className="font-medium">{selectedBooking.pnr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Travel Date</span>
                          <span className="font-medium">{selectedBooking.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Departure Time</span>
                          <span className="font-medium">{selectedBooking.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coach</span>
                          <span className="font-medium">{selectedBooking.coach}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seat</span>
                          <span className="font-medium">{selectedBooking.seat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount Paid</span>
                          <span className="font-bold text-blue-700">{selectedBooking.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Passenger Information</h4>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Age
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Gender
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Seat
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedBooking.passengers.map((passenger: any, index: number) => (
                            <tr key={index}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {passenger.name}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{passenger.age}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{passenger.gender}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{passenger.seat}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    passenger.status === "Confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {passenger.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                // Package Booking Details
                <>
                  <div className="bg-amber-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-amber-800 text-lg">{selectedBooking.title}</h3>
                        <p className="text-gray-600">{selectedBooking.type}</p>
                      </div>
                      <Badge
                        variant={
                          selectedBooking.status === "Confirmed"
                            ? "success"
                            : selectedBooking.status === "Pending Payment"
                              ? "warning"
                              : "outline"
                        }
                        className="ml-2"
                      >
                        {selectedBooking.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Package Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-700">{selectedBooking.destination}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-700">{selectedBooking.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-700">
                            {selectedBooking.startDate} - {selectedBooking.endDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Booking Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booking ID</span>
                          <span className="font-medium">{selectedBooking.bookingId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Number of Travelers</span>
                          <span className="font-medium">{selectedBooking.passengers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount Paid</span>
                          <span className="font-bold text-amber-700">{selectedBooking.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Package Itinerary</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">
                        Detailed itinerary information will be sent to your registered email address. You can also
                        download the itinerary from the actions below.
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="border-t pt-6 flex flex-wrap gap-3 justify-end">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download E-Ticket
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                {"trainName" in selectedBooking && selectedBooking.status !== "Cancelled" && (
                  <Button variant="destructive" size="sm">
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

