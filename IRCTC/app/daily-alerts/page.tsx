"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  AlertCircle,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Train,
  MapPin,
  Info,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Alert data
const alerts = [
  {
    id: "1",
    type: "delay",
    title: "Train Delay Alert",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani",
    message: "Train No. 12951 Mumbai Rajdhani is running late by approximately 2 hours due to fog conditions.",
    affectedStations: ["New Delhi", "Mathura", "Kota"],
    severity: "medium",
    timestamp: "2024-10-15T08:30:00",
    category: "train-running",
  },
  {
    id: "2",
    type: "cancellation",
    title: "Train Cancellation Notice",
    trainNumber: "12309",
    trainName: "Rajdhani Express",
    message: "Train No. 12309 Rajdhani Express has been cancelled for today due to maintenance work on the track.",
    affectedStations: ["New Delhi", "Kanpur", "Allahabad", "Patna"],
    severity: "high",
    timestamp: "2024-10-15T07:15:00",
    category: "cancellation",
  },
  {
    id: "3",
    type: "diversion",
    title: "Route Diversion",
    trainNumber: "12802",
    trainName: "Purushottam Express",
    message:
      "Train No. 12802 Purushottam Express will be diverted via alternative route due to track maintenance work between Mughalsarai and Patna.",
    affectedStations: ["Mughalsarai", "Buxar", "Ara", "Patna"],
    severity: "medium",
    timestamp: "2024-10-15T09:45:00",
    category: "diversion",
  },
  {
    id: "4",
    type: "platform",
    title: "Platform Change",
    trainNumber: "12301",
    trainName: "Howrah Rajdhani",
    message:
      "Train No. 12301 Howrah Rajdhani will arrive at Platform No. 5 instead of Platform No. 3 at New Delhi station.",
    affectedStations: ["New Delhi"],
    severity: "low",
    timestamp: "2024-10-15T10:20:00",
    category: "platform-change",
  },
  {
    id: "5",
    type: "delay",
    title: "Train Delay Alert",
    trainNumber: "12259",
    trainName: "Sealdah Duronto",
    message:
      "Train No. 12259 Sealdah Duronto is running late by approximately 1 hour 30 minutes due to signal failure.",
    affectedStations: ["Sealdah", "Asansol", "Dhanbad"],
    severity: "medium",
    timestamp: "2024-10-15T11:05:00",
    category: "train-running",
  },
  {
    id: "6",
    type: "rescheduled",
    title: "Train Rescheduled",
    trainNumber: "12303",
    trainName: "Poorva Express",
    message:
      "Train No. 12303 Poorva Express has been rescheduled to depart at 18:30 hrs instead of 17:15 hrs from Howrah station.",
    affectedStations: ["Howrah"],
    severity: "medium",
    timestamp: "2024-10-15T12:30:00",
    category: "rescheduled",
  },
  {
    id: "7",
    type: "weather",
    title: "Weather Advisory",
    trainNumber: "",
    trainName: "",
    message:
      "Heavy fog expected in Northern Railway zone. Trains may experience delays of 1-3 hours. Passengers are advised to check train status before heading to the station.",
    affectedStations: ["Delhi", "Ambala", "Lucknow", "Moradabad"],
    severity: "high",
    timestamp: "2024-10-15T06:00:00",
    category: "advisory",
  },
  {
    id: "8",
    type: "maintenance",
    title: "Track Maintenance",
    trainNumber: "",
    trainName: "",
    message:
      "Track maintenance work scheduled between Nagpur and Itarsi from 10:00 hrs to 16:00 hrs. Multiple trains may experience delays.",
    affectedStations: ["Nagpur", "Itarsi"],
    severity: "medium",
    timestamp: "2024-10-15T08:00:00",
    category: "advisory",
  },
]

export default function DailyAlertsPage() {
  const [activeTab, setActiveTab] = useState("all-alerts")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([])
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null)
  const [filteredAlerts, setFilteredAlerts] = useState(alerts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter alerts based on selected filters and search query
    let filtered = alerts

    // Filter by tab
    if (activeTab === "train-running") {
      filtered = filtered.filter((alert) => alert.category === "train-running")
    } else if (activeTab === "cancellation") {
      filtered = filtered.filter((alert) => alert.category === "cancellation")
    } else if (activeTab === "diversion") {
      filtered = filtered.filter((alert) => alert.category === "diversion" || alert.category === "rescheduled")
    } else if (activeTab === "advisory") {
      filtered = filtered.filter((alert) => alert.category === "advisory")
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (alert) =>
          alert.trainNumber.toLowerCase().includes(query) ||
          alert.trainName.toLowerCase().includes(query) ||
          alert.message.toLowerCase().includes(query) ||
          alert.affectedStations.some((station) => station.toLowerCase().includes(query)),
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((alert) => selectedCategories.includes(alert.category))
    }

    // Filter by severities
    if (selectedSeverities.length > 0) {
      filtered = filtered.filter((alert) => selectedSeverities.includes(alert.severity))
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    setFilteredAlerts(filtered)
  }, [activeTab, searchQuery, selectedCategories, selectedSeverities])

  const toggleAlertDetails = (alertId: string) => {
    setExpandedAlertId(expandedAlertId === alertId ? null : alertId)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleSeverity = (severity: string) => {
    setSelectedSeverities((prev) =>
      prev.includes(severity) ? prev.filter((s) => s !== severity) : [...prev, severity],
    )
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "delay":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "cancellation":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "diversion":
        return <Train className="h-5 w-5 text-blue-500" />
      case "platform":
        return <MapPin className="h-5 w-5 text-green-500" />
      case "rescheduled":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "weather":
        return <Info className="h-5 w-5 text-blue-500" />
      case "maintenance":
        return <Info className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-gray-600">Loading alerts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-700 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-2"
            >
              Daily Alerts & Notifications
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/80 max-w-2xl mx-auto"
            >
              Stay updated with the latest information about train delays, cancellations, diversions, and other
              important announcements
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedDate("")
                    setSelectedCategories([])
                    setSelectedSeverities([])
                  }}
                >
                  Reset All
                </Button>
              </div>

              <div className="mb-6">
                <Label htmlFor="search-alerts" className="mb-2 block text-sm font-medium text-gray-700">
                  Search Alerts
                </Label>
                <div className="relative">
                  <Input
                    id="search-alerts"
                    placeholder="Search by train number, name, or station"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="alert-date" className="mb-2 block text-sm font-medium text-gray-700">
                  Alert Date
                </Label>
                <div className="relative">
                  <Input
                    id="alert-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Alert Category</h4>
                <div className="space-y-2">
                  {[
                    { id: "train-running", label: "Train Running Status" },
                    { id: "cancellation", label: "Cancellations" },
                    { id: "diversion", label: "Diversions" },
                    { id: "rescheduled", label: "Rescheduled" },
                    { id: "platform-change", label: "Platform Changes" },
                    { id: "advisory", label: "Advisories" },
                  ].map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Alert Severity</h4>
                <div className="space-y-2">
                  {[
                    { id: "high", label: "High", color: "bg-red-100 text-red-800" },
                    { id: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
                    { id: "low", label: "Low", color: "bg-green-100 text-green-800" },
                  ].map((severity) => (
                    <div key={severity.id} className="flex items-center">
                      <Checkbox
                        id={`severity-${severity.id}`}
                        checked={selectedSeverities.includes(severity.id)}
                        onCheckedChange={() => toggleSeverity(severity.id)}
                      />
                      <Label
                        htmlFor={`severity-${severity.id}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer flex items-center"
                      >
                        {severity.label}
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${severity.color}`}>
                          {severity.label}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-blue-700 hover:bg-blue-800">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="lg:w-3/4">
            <Card>
              <CardHeader className="bg-white border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Railway Alerts</CardTitle>
                    <CardDescription>Latest updates and notifications for train services</CardDescription>
                  </div>
                  <Tabs
                    defaultValue="all-alerts"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto">
                      <TabsTrigger value="all-alerts" className="text-xs">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="train-running" className="text-xs">
                        Running Status
                      </TabsTrigger>
                      <TabsTrigger value="cancellation" className="text-xs">
                        Cancellations
                      </TabsTrigger>
                      <TabsTrigger value="diversion" className="text-xs">
                        Diversions
                      </TabsTrigger>
                      <TabsTrigger value="advisory" className="text-xs">
                        Advisories
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {filteredAlerts.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-shrink-0 flex items-start">
                            <div className="p-2 rounded-full bg-gray-100">{getAlertTypeIcon(alert.type)}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                              <div>
                                <h3 className="font-medium text-gray-900">{alert.title}</h3>
                                {alert.trainNumber && (
                                  <p className="text-sm text-gray-600">
                                    {alert.trainNumber} - {alert.trainName}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getSeverityColor(alert.severity)}>
                                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                                </Badge>
                                <span className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</span>
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">{alert.message}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {alert.affectedStations.map((station, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {station}
                                </Badge>
                              ))}
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleAlertDetails(alert.id)}
                                className="text-blue-700 p-0 h-auto"
                              >
                                {expandedAlertId === alert.id ? (
                                  <>
                                    Less Details
                                    <ChevronUp className="ml-1 h-4 w-4" />
                                  </>
                                ) : (
                                  <>
                                    More Details
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                  </>
                                )}
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                Share
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                            {expandedAlertId === alert.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 pt-4 border-t border-gray-200"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium text-sm mb-2">Affected Stations</h4>
                                    <ul className="space-y-1 text-sm">
                                      {alert.affectedStations.map((station, index) => (
                                        <li key={index} className="flex items-center">
                                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                          {station}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm mb-2">Recommended Actions</h4>
                                    <ul className="space-y-1 text-sm">
                                      <li className="flex items-start">
                                        <span className="h-4 w-4 text-blue-500 mr-2">•</span>
                                        Check train status before heading to the station
                                      </li>
                                      <li className="flex items-start">
                                        <span className="h-4 w-4 text-blue-500 mr-2">•</span>
                                        Contact customer care at 139 for more information
                                      </li>
                                      <li className="flex items-start">
                                        <span className="h-4 w-4 text-blue-500 mr-2">•</span>
                                        Keep your PNR handy for quick reference
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Alerts Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      There are no alerts matching your current filters. Try adjusting your search criteria or check
                      back later for updates.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">About Railway Alerts</h4>
                  <p className="text-sm text-blue-700">
                    Railway alerts are updated regularly to provide passengers with the latest information about train
                    services. For the most accurate and up-to-date information, we recommend checking alerts frequently
                    before your journey.
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">Customer Support</h5>
                      <p className="text-xs text-gray-600">Call 139 for 24/7 assistance</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">SMS Alerts</h5>
                      <p className="text-xs text-gray-600">Send PNR to 139 for status updates</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">Mobile App</h5>
                      <p className="text-xs text-gray-600">Download the IRCTC app for instant alerts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

