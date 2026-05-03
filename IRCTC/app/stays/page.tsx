"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Users, MapPin, Star, ArrowRight, Filter, Coffee, Wifi, Tv, Utensils, ShowerHead, Clock, BedDouble, Building, Home, Shield } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data for stays
const staysData = [
  {
    id: "1",
    type: "retiring-room",
    name: "New Delhi Railway Station Retiring Room",
    location: "New Delhi Railway Station, Delhi",
    image: "/images/delhi_retiring_room.jpeg",
    price: "₹1,200",
    rating: 4.2,
    amenities: ["AC", "TV", "Attached Bathroom", "Free Wifi"],
    availability: "Available",
    description: "Comfortable retiring rooms located at New Delhi Railway Station. Perfect for short stays between train journeys."
  },
  {
    id: "2",
    type: "lounge",
    name: "Executive Lounge - Mumbai CSMT",
    location: "Mumbai CSMT, Mumbai",
    image: "/images/mumbai_executive.jpeg",
    price: "₹850",
    rating: 4.5,
    amenities: ["Premium Seating", "Refreshments", "Wifi", "Charging Points"],
    availability: "Limited",
    description: "Premium waiting lounge with comfortable seating, refreshments, and business facilities for travelers."
  },
  {
    id: "3",
    type: "rail-yatri-niwas",
    name: "Rail Yatri Niwas - Howrah",
    location: "Near Howrah Junction, Kolkata",
    image: "/images/rail_yatri_howrah.jpeg",
    price: "₹950",
    rating: 3.8,
    amenities: ["AC Rooms", "Restaurant", "24x7 Reception", "Luggage Storage"],
    availability: "Available",
    description: "Budget accommodation near Howrah Junction offering clean and comfortable rooms for railway passengers."
  },
  {
    id: "4",
    type: "retiring-room",
    name: "Chennai Central Retiring Room",
    location: "Chennai Central, Chennai",
    image: "/images/chennai_retiring.jpeg",
    price: "₹1,100",
    rating: 4.0,
    amenities: ["AC", "TV", "Clean Bedding", "24x7 Service"],
    availability: "Available",
    description: "Well-maintained retiring rooms at Chennai Central Station providing comfort and convenience for travelers."
  },
  {
    id: "5",
    type: "lounge",
    name: "Premium Lounge - Bengaluru City",
    location: "Bengaluru City Junction, Bengaluru",
    image: "/images/bengaluru_premium.jpeg",
    price: "₹750",
    rating: 4.3,
    amenities: ["Buffet", "Business Center", "Wifi", "Shower Facility"],
    availability: "Available",
    description: "Modern lounge facility with premium amenities for business and leisure travelers at Bengaluru City Junction."
  },
  {
    id: "6",
    type: "rail-yatri-niwas",
    name: "Rail Yatri Niwas - New Delhi",
    location: "Paharganj, New Delhi",
    image: "/images/rail_yatri_delhi.jpeg",
    price: "₹1,050",
    rating: 3.9,
    amenities: ["AC Rooms", "Restaurant", "Travel Desk", "Laundry"],
    availability: "Limited",
    description: "Conveniently located budget accommodation near New Delhi Railway Station with essential amenities for travelers."
  }
];

export default function StaysPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredStays, setFilteredStays] = useState(staysData);
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 2000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleSearch = () => {
    let filtered = staysData;
    
    // Filter by type if not "all"
    if (activeTab !== "all") {
      filtered = filtered.filter(stay => stay.type === activeTab);
    }
    
    // Filter by location
    if (searchLocation) {
      filtered = filtered.filter(stay => 
        stay.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(stay => 
        selectedAmenities.every(amenity => 
          stay.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }
    
    setFilteredStays(filtered);
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes("wifi")) return <Wifi className="h-4 w-4" />;
    if (lowerAmenity.includes("tv")) return <Tv className="h-4 w-4" />;
    if (lowerAmenity.includes("restaurant") || lowerAmenity.includes("buffet") || lowerAmenity.includes("refreshment")) 
      return <Utensils className="h-4 w-4" />;
    if (lowerAmenity.includes("bathroom") || lowerAmenity.includes("shower")) 
      return <ShowerHead className="h-4 w-4" />;
    if (lowerAmenity.includes("ac")) return <Tv className="h-4 w-4" />;
    return <Coffee className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image 
          src="/images/rail_yatri_delhi.jpeg" 
          alt="Railway Stays" 
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Railway Stays & Lounges</h1>
            <p className="mt-4 text-xl text-white/90 max-w-2xl">
              Comfortable accommodations and premium lounges for railway travelers across India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white shadow-md relative -mt-10 rounded-lg mx-4 lg:mx-auto max-w-6xl z-10">
        <div className="p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="all">All Stays</TabsTrigger>
              <TabsTrigger value="retiring-room">Retiring Rooms</TabsTrigger>
              <TabsTrigger value="lounge">Lounges</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Input
                  placeholder="Search location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <Input
                  type="date"
                  placeholder="Check-in"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <Input
                  type="date"
                  placeholder="Check-out"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                  </SelectContent>
                </Select>
                <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
              </div>
            </div>
            
            <Button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-blue-700 hover:bg-blue-800"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Stays
            </Button>
          </Tabs>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-blue-700" />
                    Filters
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedAmenities([]);
                      setPriceRange([500, 2000]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Stay Type Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Stay Type</h3>
                    <div className="space-y-2">
                      {[
                        { id: "retiring-room", label: "Retiring Rooms", icon: <BedDouble className="h-4 w-4" /> },
                        { id: "lounge", label: "Premium Lounges", icon: <Building className="h-4 w-4" /> },
                        { id: "rail-yatri-niwas", label: "Rail Yatri Niwas", icon: <Home className="h-4 w-4" /> }
                      ].map(type => (
                        <div key={type.id} className="flex items-center">
                          <Checkbox 
                            id={`type-${type.id}`} 
                            checked={activeTab === "all" ? false : activeTab === type.id}
                            onCheckedChange={() => setActiveTab(activeTab === type.id ? "all" : type.id)}
                          />
                          <Label htmlFor={`type-${type.id}`} className="ml-2 text-sm flex items-center">
                            {type.icon}
                            <span className="ml-2">{type.label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Amenities Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Amenities</h3>
                    <div className="space-y-2">
                      {["AC", "Wifi", "TV", "Restaurant", "Bathroom"].map(amenity => (
                        <div key={amenity} className="flex items-center">
                          <Checkbox 
                            id={`amenity-${amenity}`} 
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityToggle(amenity)}
                          />
                          <Label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm flex items-center">
                            {getAmenityIcon(amenity)}
                            <span className="ml-2">{amenity}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Availability Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="availability-available" />
                        <Label htmlFor="availability-available" className="ml-2 text-sm">
                          Available Now
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="availability-all" defaultChecked />
                        <Label htmlFor="availability-all" className="ml-2 text-sm">
                          Show All
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Stays List */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Accommodations</h2>
              <p className="text-gray-600 mt-1">
                {filteredStays.length} options found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStays.map((stay) => (
                <motion.div
                  key={stay.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-48">
                      <Image 
                        src={stay.image || "/placeholder.svg"} 
                        alt={stay.name} 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={
                          stay.type === "retiring-room" 
                            ? "bg-blue-500 hover:bg-blue-600" 
                            : stay.type === "lounge" 
                              ? "bg-purple-500 hover:bg-purple-600" 
                              : "bg-green-500 hover:bg-green-600"
                        }>
                          {stay.type === "retiring-room" 
                            ? "Retiring Room" 
                            : stay.type === "lounge" 
                              ? "Premium Lounge" 
                              : "Rail Yatri Niwas"}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="outline" className="bg-white text-gray-800 border-white">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                          {stay.rating}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg text-blue-700">{stay.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{stay.location}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{stay.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {stay.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div>
                          <p className="text-xl font-bold text-blue-700">{stay.price}</p>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                        
                        <Link href={`/stays/${stay.type}/${stay.id}`}>
                          <Button className="bg-blue-700 hover:bg-blue-800">
                            Book Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              <h2 className="text-3xl font-bold text-gray-900">Why Choose IRCTC Stays</h2>
              <div className="w-24 h-1 bg-blue-700 mx-auto my-4"></div>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Convenient and comfortable accommodations for railway travelers
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="h-10 w-10 text-blue-700" />,
                title: "Prime Locations",
                description: "Located at or near major railway stations for maximum convenience",
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-700" />,
                title: "24/7 Availability",
                description: "Check-in and check-out facilities available round the clock",
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-700" />,
                title: "Safe & Secure",
                description: "Security personnel and CCTV surveillance for your safety",
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
    </div>
  );
}
