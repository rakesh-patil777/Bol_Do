"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Star, Wifi, Coffee, Tv, Utensils, ShowerHead, BatteryCharging, Newspaper, Briefcase, Check, Info } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Mock data for lounges
const loungeData = [
  {
    id: "1",
    name: "Executive Lounge - New Delhi",
    location: "New Delhi Railway Station, Delhi",
    image: "/images/delhi_retiring_room.jpeg",
    price: "₹850",
    hourlyRate: "₹150",
    rating: 4.5,
    amenities: [
      { name: "Premium Seating" },
      { name: "Refreshments"},
      { name: "High-Speed WiFi" },
      { name: "Charging Points" },
      { name: "Newspapers & Magazines" },
      { name: "TV & Entertainment" },
      { name: "Shower Facility" },
      { name: "Food Service" }
    ],
    availability: "Available",
    description: "Premium waiting lounge with comfortable seating, refreshments, and business facilities for travelers at New Delhi Railway Station.",
    packages: [
      { name: "2 Hour Access", price: "₹300", features: ["All Amenities", "1 Complimentary Beverage", "Snacks"] },
      { name: "4 Hour Access", price: "₹550", features: ["All Amenities", "2 Complimentary Beverages", "Meal", "Shower Access"] },
      { name: "Full Day Access", price: "₹850", features: ["All Amenities", "Unlimited Beverages", "2 Meals", "Shower Access", "Luggage Storage"] }
    ]
  },
  {
    id: "2",
    name: "Premium Lounge - Mumbai CSMT",
    location: "Mumbai CSMT, Mumbai",
    image: "/images/mumbai_executive.jpeg",
    price: "₹750",
    hourlyRate: "₹130",
    rating: 4.3,
    amenities: [
      { name: "Premium Seating" },
      { name: "Refreshments" },
      { name: "WiFi"},
      { name: "Charging Points" },
      { name: "Newspapers & Magazines"},
      { name: "TV & Entertainment" }
    ],
    availability: "Limited",
    description: "Comfortable lounge at Mumbai CSMT offering a range of amenities to make your wait enjoyable and productive.",
    packages: [
      { name: "2 Hour Access", price: "₹250", features: ["All Amenities", "1 Complimentary Beverage"] },
      { name: "4 Hour Access", price: "₹450", features: ["All Amenities", "2 Complimentary Beverages", "Snacks"] },
      { name: "Full Day Access", price: "₹750", features: ["All Amenities", "Unlimited Beverages", "1 Meal", "Luggage Storage"] }
    ]
  },
  {
    id: "3",
    name: "Executive Lounge - Howrah",
    location: "Howrah Junction, Kolkata",
    image: "/images/rail_yatri_howrah.jpeg",
    price: "₹700",
    hourlyRate: "₹120",
    rating: 4.2,
    amenities: [
      { name: "Premium Seating"},
      { name: "Refreshments" },
      { name: "WiFi" },
      { name: "Charging Points" },
      { name: "Newspapers & Magazines" },
      { name: "TV & Entertainment" },
      { name: "Food Service"}
    ],
    availability: "Available",
    description: "Relax in comfort at Howrah Junction's Executive Lounge with a range of amenities to enhance your travel experience.",
    packages: [
      { name: "2 Hour Access", price: "₹240", features: ["All Amenities", "1 Complimentary Beverage"] },
      { name: "4 Hour Access", price: "₹420", features: ["All Amenities", "2 Complimentary Beverages", "Snacks"] },
      { name: "Full Day Access", price: "₹700", features: ["All Amenities", "Unlimited Beverages", "1 Meal", "Luggage Storage"] }
    ]
  },
  {
    id: "4",
    name: "Premium Lounge - Bengaluru City",
    location: "Bengaluru City Junction, Bengaluru",
    image: "/images/bengaluru_premium.jpeg",
    price: "₹800",
    hourlyRate: "₹140",
    rating: 4.4,
    amenities: [
      { name: "Premium Seating" },
      { name: "Refreshments" },
      { name: "High-Speed WiFi" },
      { name: "Charging Points" },
      { name: "Newspapers & Magazines"},
      { name: "TV & Entertainment" },
      { name: "Shower Facility"},
      { name: "Food Service" }
    ],
    availability: "Available",
    description: "Modern lounge facility with premium amenities for business and leisure travelers at Bengaluru City Junction.",
    packages: [
      { name: "2 Hour Access", price: "₹280", features: ["All Amenities", "1 Complimentary Beverage", "Snacks"] },
      { name: "4 Hour Access", price: "₹500", features: ["All Amenities", "2 Complimentary Beverages", "Meal"] },
      { name: "Full Day Access", price: "₹800", features: ["All Amenities", "Unlimited Beverages", "2 Meals", "Shower Access", "Luggage Storage"] }
    ]
  }
];

export default function LoungePage() {
  const [selectedLounge, setSelectedLounge] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("1");

  const handleBookNow = (loungeId: string) => {
    setSelectedLounge(loungeId);
    window.scrollTo({
      top: document.getElementById('booking-section')?.offsetTop,
      behavior: 'smooth'
    });
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleConfirmBooking = () => {
    // In a real application, this would submit the booking to a backend
    alert(`Booking confirmed for ${selectedLounge ? loungeData.find(l => l.id === selectedLounge)?.name : ''} on ${date} at ${time} for ${guests} guest(s)`);
    
    // Reset form
    setSelectedLounge(null);
    setSelectedPackage(null);
    setDate("");
    setTime("");
    setGuests("1");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image 
          src="/images/bengaluru_premium.jpeg" 
          alt="Railway Lounges" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/30 flex flex-col justify-center px-6 md:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Premium Railway Lounges</h1>
            <p className="mt-4 text-xl text-white/90 max-w-2xl">
              Relax in comfort while waiting for your train with our premium lounge facilities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Comfort & Convenience</h2>
          <p className="text-lg text-gray-600 mb-8">
            IRCTC Premium Lounges offer a comfortable and convenient space for passengers to relax before or after their journey. 
            With amenities like comfortable seating, refreshments, WiFi, and more, our lounges ensure you have a pleasant waiting experience.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {[
              { icon: <Coffee className="h-8 w-8 text-blue-700" />, label: "Refreshments" },
              { icon: <Wifi className="h-8 w-8 text-blue-700" />, label: "Free WiFi" },
              { icon: <BatteryCharging className="h-8 w-8 text-blue-700" />, label: "Charging Points" },
              { icon: <Tv className="h-8 w-8 text-blue-700" />, label: "Entertainment" }
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

      {/* Lounges List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Lounges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loungeData.map((lounge) => (
              <motion.div
                key={lounge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48">
                    <Image 
                      src={lounge.image || "/placeholder.svg"} 
                      alt={lounge.name} 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-white text-gray-800 border-white">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        {lounge.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg text-blue-700">{lounge.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{lounge.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{lounge.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                      {lounge.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center gap-1 justify-center">
                          
                          <span className="truncate">{amenity.name}</span>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-xl font-bold text-blue-700">{lounge.price}</p>
                          <p className="text-xs text-gray-500">full day access</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Hourly rate</p>
                          <p className="text-lg font-semibold text-blue-700">{lounge.hourlyRate}</p>
                          <p className="text-xs text-gray-500">per hour</p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-blue-700 hover:bg-blue-800"
                        onClick={() => handleBookNow(lounge.id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Book a Lounge</h2>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Lounge Booking</CardTitle>
                <CardDescription>
                  Select your preferred lounge, package, and time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Lounge
                    </label>
                    <Select value={selectedLounge || ""} onValueChange={setSelectedLounge}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lounge" />
                      </SelectTrigger>
                      <SelectContent>
                        {loungeData.map(lounge => (
                          <SelectItem key={lounge.id} value={lounge.id}>
                            {lounge.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedLounge && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Package
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {loungeData.find(l => l.id === selectedLounge)?.packages.map((pkg, index) => (
                            <div 
                              key={index}
                              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                selectedPackage === pkg.name 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                              onClick={() => handleSelectPackage(pkg.name)}
                            >
                              <h4 className="font-medium text-blue-700">{pkg.name}</h4>
                              <p className="text-lg font-bold">{pkg.price}</p>
                              <ul className="mt-2 space-y-1">
                                {pkg.features.map((feature, i) => (
                                  <li key={i} className="text-sm text-gray-600 flex items-start">
                                    <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <div className="relative">
                            <Input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="pl-10"
                            />
                            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </label>
                          <div className="relative">
                            <Input
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              className="pl-10"
                            />
                            <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Guests
                          </label>
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
                  disabled={!selectedLounge || !selectedPackage || !date || !time}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are the operating hours of the lounges?</AccordionTrigger>
              <AccordionContent>
                Most of our lounges operate 24/7 to accommodate passengers at all hours. However, some facilities may have specific operating hours. Please check the details of your selected lounge for exact timings.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need to have a train ticket to use the lounge?</AccordionTrigger>
              <AccordionContent>
                Yes, access to our lounges is primarily for railway passengers. You will need to present a valid train ticket or PNR number at the time of entry. Some lounges may allow non-passengers for an additional fee.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I book a lounge in advance?</AccordionTrigger>
              <AccordionContent>
                Yes, we recommend booking lounges in advance to ensure availability, especially during peak travel seasons. You can book through our website, mobile app, or at the lounge reception subject to availability.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What amenities are included in the lounge access?</AccordionTrigger>
              <AccordionContent>
                Standard amenities include comfortable seating, WiFi, charging points, and access to refreshments. Premium packages may include additional services like meals, shower facilities, and business services. The specific amenities vary by lounge and package selected.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Is there a cancellation policy for lounge bookings?</AccordionTrigger>
              <AccordionContent>
                Yes, cancellations made at least 24 hours before the scheduled time are eligible for a full refund. Cancellations within 24 hours may be subject to a cancellation fee. No-shows are not eligible for refunds.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
