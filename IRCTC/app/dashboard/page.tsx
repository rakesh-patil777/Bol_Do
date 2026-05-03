"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Ticket, TrendingUp, Calendar, MapPin, Clock, Bell, ArrowRight, Train, Package, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for upcoming journeys
const upcomingJourneys = [
  {
    id: "1",
    type: "train",
    name: "Shatabdi Express",
    number: "12001",
    from: "New Delhi",
    to: "Bhopal",
    date: "23 March, 2025",
    time: "06:00",
    status: "Confirmed",
    pnr: "8745219630",
  },
  {
    id: "2",
    type: "package",
    name: "Bharat Darshan",
    destination: "Multiple Destinations",
    startDate: "26 April, 2025",
    endDate: "30 April, 2025",
    status: "Confirmed",
    bookingId: "TOUR123456",
  },
]

// Mock data for account summary
const accountSummary = {
  balance: 2500,
  rewardPoints: 750,
  totalBookings: 5,
  upcomingBookings: 2,
  completedBookings: 3,
}

export default function DashboardHomePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Rail User</h1>
          <p className="text-gray-500 mt-1">Here's an overview of your account and upcoming journeys</p>
        </div>
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={ () => window.location.href='/train-list'}>
          <Ticket className="mr-2 h-4 w-4" />
          Book New Ticket
        </Button>
      </motion.div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Upcoming Journeys
          </TabsTrigger>
          <TabsTrigger value="wallet" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Wallet & Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          {/* Account Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wallet className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold">₹{accountSummary.balance}</p>
                        <p className="text-xs text-gray-500">Available Balance</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/payment-methods">Add Money</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Reward Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-2xl font-bold">{accountSummary.rewardPoints}</p>
                      <p className="text-xs text-gray-500">Points Earned</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress to next reward</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">250 more points for ₹100 discount</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Ticket className="h-8 w-8 text-amber-600 mr-3" />
                    <div>
                      <p className="text-2xl font-bold">{accountSummary.totalBookings}</p>
                      <p className="text-xs text-gray-500">Total Bookings</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-blue-50 p-2 rounded-md text-center">
                      <p className="text-lg font-semibold text-blue-700">{accountSummary.upcomingBookings}</p>
                      <p className="text-xs text-gray-600">Upcoming</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-md text-center">
                      <p className="text-lg font-semibold text-green-700">{accountSummary.completedBookings}</p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Upcoming Journeys Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Journeys</CardTitle>
                  <Button variant="ghost" size="sm" asChild className="text-blue-600">
                    <Link href="/dashboard/bookings">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Your next scheduled trips</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingJourneys.length === 0 ? (
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium mb-1">No upcoming journeys</h3>
                    <p className="text-gray-500 mb-4">Book your next adventure with us</p>
                    <Button>Book Now</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingJourneys.map((journey) => (
                      <div key={journey.id} className="border rounded-lg overflow-hidden">
                        <div
                          className={`p-3 ${journey.type === "train" ? "bg-blue-50" : "bg-amber-50"} flex justify-between items-center`}
                        >
                          <div className="flex items-center">
                            {journey.type === "train" ? (
                              <Train className="h-5 w-5 text-blue-700 mr-2" />
                            ) : (
                              <Package className="h-5 w-5 text-amber-700 mr-2" />
                            )}
                            <div>
                              <h3 className="font-medium">{journey.name}</h3>
                              <p className="text-xs text-gray-600">
                                {journey.type === "train" ? `Train #${journey.number}` : "Tour Package"}
                              </p>
                            </div>
                          </div>
                          <Badge variant={journey.status === "Confirmed" ? "success" : "warning"}>
                            {journey.status}
                          </Badge>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">
                              {journey.type === "train" ? journey.date : `${journey.startDate} - ${journey.endDate}`}
                            </span>
                          </div>
                          {journey.type === "train" ? (
                            <div className="flex items-center mb-2">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">{journey.time}</span>
                            </div>
                          ) : null}
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">
                              {journey.type === "train" ? `${journey.from} to ${journey.to}` : journey.destination}
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 border-t text-xs flex justify-between">
                          <span className="text-gray-500">
                            {journey.type === "train" ? `PNR: ${journey.pnr}` : `Booking ID: ${journey.bookingId}`}
                          </span>
                          <Link href={`/dashboard/bookings`} className="text-blue-600 font-medium">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Notifications</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Mark All as Read
                  </Button>
                </div>
                <CardDescription>Stay updated with important alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 pb-3 border-b">
                    <div className="bg-blue-100 rounded-full p-2 h-fit">
                      <Bell className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Booking Confirmed</h4>
                      <p className="text-xs text-gray-500 mb-1">
                        Your booking for Shatabdi Express (PNR: 8745219630) has been confirmed.
                      </p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b">
                    <div className="bg-green-100 rounded-full p-2 h-fit">
                      <Wallet className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Wallet Recharged</h4>
                      <p className="text-xs text-gray-500 mb-1">
                        Your wallet has been recharged with ₹1,000 successfully.
                      </p>
                      <p className="text-xs text-gray-400">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-amber-100 rounded-full p-2 h-fit">
                      <TrendingUp className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Reward Points Earned</h4>
                      <p className="text-xs text-gray-500 mb-1">
                        You've earned 150 reward points from your recent booking.
                      </p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Journeys</CardTitle>
              <CardDescription>All your scheduled trips in one place</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingJourneys.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No upcoming journeys</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    You don't have any upcoming trips scheduled. Ready to plan your next adventure?
                  </p>
                  <Button>Book a Journey</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {upcomingJourneys.map((journey) => (
                    <div key={journey.id} className="border rounded-lg overflow-hidden">
                      <div
                        className={`p-4 ${journey.type === "train" ? "bg-blue-50" : "bg-amber-50"} flex justify-between items-center`}
                      >
                        <div className="flex items-center">
                          {journey.type === "train" ? (
                            <Train className="h-6 w-6 text-blue-700 mr-3" />
                          ) : (
                            <Package className="h-6 w-6 text-amber-700 mr-3" />
                          )}
                          <div>
                            <h3 className="font-semibold text-lg">{journey.name}</h3>
                            <p className="text-sm text-gray-600">
                              {journey.type === "train" ? `Train #${journey.number}` : "Tour Package"}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={journey.status === "Confirmed" ? "success" : "warning"}
                          className="ml-auto mr-4"
                        >
                          {journey.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center mb-3">
                              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                              <div>
                                <p className="text-sm font-medium">Date</p>
                                <p className="text-sm text-gray-600">
                                  {journey.type === "train"
                                    ? journey.date
                                    : `${journey.startDate} - ${journey.endDate}`}
                                </p>
                              </div>
                            </div>
                            {journey.type === "train" && (
                              <div className="flex items-center mb-3">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <div>
                                  <p className="text-sm font-medium">Departure Time</p>
                                  <p className="text-sm text-gray-600">{journey.time}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center mb-3">
                              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                              <div>
                                <p className="text-sm font-medium">
                                  {journey.type === "train" ? "Route" : "Destination"}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {journey.type === "train" ? `${journey.from} to ${journey.to}` : journey.destination}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Ticket className="h-5 w-5 text-gray-500 mr-2" />
                              <div>
                                <p className="text-sm font-medium">
                                  {journey.type === "train" ? "PNR Number" : "Booking ID"}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {journey.type === "train" ? journey.pnr : journey.bookingId}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 border-t flex justify-end space-x-3">
                        <Button variant="outline" size="sm">
                          Download E-Ticket
                        </Button>
                        <Button variant="outline" size="sm">
                          Print
                        </Button>
                        {journey.type === "train" && (
                          <Button variant="destructive" size="sm">
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Manage your IRCTC wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-6 rounded-lg mb-6 text-center">
                  <Wallet className="h-10 w-10 mx-auto text-blue-700 mb-2" />
                  <h3 className="text-3xl font-bold text-blue-700 mb-1">₹{accountSummary.balance}</h3>
                  <p className="text-sm text-gray-600">Available Balance</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Recharged</span>
                    <span className="font-medium">₹1,000 on 15 Oct, 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Transaction</span>
                    <span className="font-medium">₹1,995 on 14 Oct, 2024</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Transaction History</Button>
                <Button asChild>
                  <Link href="/dashboard/payment-methods">Add Money</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reward Points</CardTitle>
                <CardDescription>Track and redeem your reward points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-6 rounded-lg mb-6 text-center">
                  <TrendingUp className="h-10 w-10 mx-auto text-green-700 mb-2" />
                  <h3 className="text-3xl font-bold text-green-700 mb-1">{accountSummary.rewardPoints}</h3>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress to next reward</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">250 more points for ₹100 discount</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Points Expiring Soon</span>
                    <span className="font-medium">150 points on 31 Dec, 2025</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Points History</Button>
                <Button>Redeem Points</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

