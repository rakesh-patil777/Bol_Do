"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  CreditCard,
  CheckCircle,
  Calendar,
  User,
  Lock,
  Shield,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Wallet,
  CreditCardIcon,
  Landmark,
  QrCode,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function PaymentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsPaymentComplete(true)

      // Redirect to booking confirmation after 2 seconds
      setTimeout(() => {
        router.push("/booking-confirmation")
      }, 2000)
    }, 2000)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.back()
    }
  }

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900">Secure Payment</h1>
        <p className="text-gray-600 mt-1">Complete your booking by making a secure payment</p>
      </motion.div>

      {/* Payment Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>
            <span className={`text-sm mt-2 ${step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}`}>Review</span>
          </div>

          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: step >= 2 ? "100%" : "0%" }}
            ></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <span className={`text-sm mt-2 ${step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}`}>Payment</span>
          </div>

          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: isPaymentComplete ? "100%" : "0%" }}
            ></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isPaymentComplete ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
            <span className={`text-sm mt-2 ${isPaymentComplete ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Review Your Booking</h2>

                  <div className="space-y-6">
                    {/* Train Details */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-blue-800">Rajdhani Express</h3>
                          <p className="text-sm text-gray-600">12951/12952</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Confirmed
                        </div>
                      </div>

                      <div className="mt-4 flex items-start">
                        <div className="min-w-[80px] text-center">
                          <p className="text-lg font-bold text-gray-900">16:35</p>
                          <p className="text-xs text-gray-500">23rd March , 2025</p>
                        </div>

                        <div className="flex flex-col items-center mx-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <div className="h-10 w-0.5 bg-blue-200"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        </div>

                        <div className="flex-1">
                          <div className="mb-2">
                            <p className="font-medium">New Delhi</p>
                            <p className="text-xs text-gray-500">Departure</p>
                          </div>
                          <div>
                            <p className="font-medium">Mumbai Central</p>
                            <p className="text-xs text-gray-500">Arrival</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Passenger Details */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Passenger Details</h3>
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
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                Rail User
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">32</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Male</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">B4-32</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Contact Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium">rail@example.com</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Mobile</p>
                          <p className="font-medium">+91 98765 43210</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handleBack} className="flex items-center">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button onClick={handleNext} className="flex items-center">
                      Proceed to Payment
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && !isPaymentComplete && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                  <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="credit-card">
                        <CreditCardIcon className="h-4 w-4 mr-2" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="upi">
                        <QrCode className="h-4 w-4 mr-2" />
                        UPI
                      </TabsTrigger>
                      <TabsTrigger value="net-banking">
                        <Landmark className="h-4 w-4 mr-2" />
                        Net Banking
                      </TabsTrigger>
                      <TabsTrigger value="wallet">
                        <Wallet className="h-4 w-4 mr-2" />
                        Wallet
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit-card">
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="card-number"
                              name="number"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={handleCardDetailsChange}
                              className="pl-10"
                              required
                            />
                            <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <div className="relative">
                            <Input
                              id="card-name"
                              name="name"
                              placeholder="John Doe"
                              value={cardDetails.name}
                              onChange={handleCardDetailsChange}
                              className="pl-10"
                              required
                            />
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <div className="relative">
                              <Input
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={handleCardDetailsChange}
                                className="pl-10"
                                required
                              />
                              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                              <Input
                                id="cvv"
                                name="cvv"
                                type="password"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={handleCardDetailsChange}
                                className="pl-10"
                                required
                              />
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center mt-4">
                          <input
                            id="save-card"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="save-card" className="ml-2 block text-sm text-gray-900">
                            Save card for future payments
                          </label>
                        </div>

                        <div className="pt-4">
                          <Button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Processing Payment...
                              </>
                            ) : (
                              <>Pay ₹1,995</>
                            )}
                          </Button>
                        </div>
                      </form>
                    </TabsContent>

                    <TabsContent value="upi">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <QrCode className="h-32 w-32 mx-auto text-blue-700 mb-4" />
                          <p className="text-sm text-gray-600 mb-2">Scan this QR code with any UPI app to pay</p>
                          <p className="font-medium">UPI ID: irctc@sbi</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-2">Or pay using UPI ID</p>
                          <div className="flex gap-2">
                            <Input placeholder="Enter your UPI ID" className="flex-1" />
                            <Button>Verify</Button>
                          </div>
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Google Pay"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="PhonePe"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Paytm"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="BHIM"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="net-banking">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {["SBI", "HDFC", "ICICI", "Axis"].map((bank) => (
                            <div
                              key={bank}
                              className="border rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                            >
                              <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2">
                                <Landmark className="h-6 w-6 text-blue-700" />
                              </div>
                              <p className="font-medium text-sm">{bank} Bank</p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4">
                          <Label htmlFor="bank-select">Select Other Bank</Label>
                          <select
                            id="bank-select"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option>Select a bank</option>
                            <option>Punjab National Bank</option>
                            <option>Bank of Baroda</option>
                            <option>Canara Bank</option>
                            <option>Union Bank of India</option>
                          </select>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-blue-700 hover:bg-blue-800">Continue to Net Banking</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="wallet">
                      <div className="space-y-4">
                        <RadioGroup defaultValue="paytm">
                          {[
                            { id: "paytm", name: "Paytm" },
                            { id: "phonepe", name: "PhonePe" },
                            { id: "amazonpay", name: "Amazon Pay" },
                            { id: "mobikwik", name: "MobiKwik" },
                          ].map((wallet) => (
                            <div
                              key={wallet.id}
                              className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                            >
                              <RadioGroupItem value={wallet.id} id={wallet.id} />
                              <Label htmlFor={wallet.id} className="flex-1 cursor-pointer">
                                <div className="flex items-center">
                                  <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                                    <Wallet className="h-4 w-4 text-blue-700" />
                                  </div>
                                  <span>{wallet.name}</span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>

                        <div className="pt-4">
                          <Button className="w-full bg-blue-700 hover:bg-blue-800">Continue to Wallet Payment</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handleBack} className="flex items-center">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {isPaymentComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-green-100">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-6">
                    Your payment has been processed successfully. You will be redirected to the booking confirmation
                    page shortly.
                  </p>
                  <div className="animate-pulse">
                    <p className="text-sm text-gray-500">Redirecting...</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Rajdhani Express</p>
                      <p className="text-sm text-gray-500">New Delhi to Mumbai Central</p>
                      <p className="text-sm text-gray-500">23rd March , 2025</p>
                    </div>
                    <p className="font-medium">₹1,800</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Base Fare</span>
                      <span>₹1,800</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-500">GST (5%)</span>
                      <span>₹90</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-500">Convenience Fee</span>
                      <span>₹105</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>₹1,995</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>Your payment information is encrypted and securely processed.</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Secured by IRCTC Payment Gateway</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

