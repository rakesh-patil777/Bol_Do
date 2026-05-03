"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Plus, Trash2, Edit, CheckCircle, AlertCircle, Wallet, ArrowRight, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock saved payment methods
const savedCards = [
  {
    id: "1",
    type: "visa",
    name: "Rail User",
    number: "•••• •••• •••• 4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    name: "Rail User",
    number: "•••• •••• •••• 5555",
    expiry: "09/24",
    isDefault: false,
  },
]

// Mock transaction history
const transactions = [
  {
    id: "1",
    type: "credit",
    amount: 1000,
    date: "20 March, 2025",
    method: "Credit Card (•••• 4242)",
    status: "Completed",
  },
  {
    id: "2",
    type: "debit",
    amount: 1995,
    date: "2 April, 2025",
    method: "Wallet",
    status: "Completed",
    description: "Payment for Rajdhani Express (PNR: 2641857391)",
  },
  {
    id: "3",
    type: "credit",
    amount: 2000,
    date: "26 April, 2025",
    method: "UPI (user@upi)",
    status: "Completed",
  },
  {
    id: "4",
    type: "debit",
    amount: 1800,
    date: "10 April, 2025",
    method: "Wallet",
    status: "Completed",
    description: "Payment for Shatabdi Express (PNR: 8745219630)",
  },
]

export default function PaymentMethodsPage() {
  const [activeTab, setActiveTab] = useState("cards")
  const [addingCard, setAddingCard] = useState(false)
  const [addingMoney, setAddingMoney] = useState(false)
  const [amount, setAmount] = useState("1000")
  const [selectedCard, setSelectedCard] = useState(savedCards[0].id)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <p className="text-gray-500 mt-1">Manage your payment methods and wallet</p>
      </motion.div>

      <Tabs defaultValue="cards" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 mb-6">
          <TabsTrigger value="cards" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <CreditCard className="h-4 w-4 mr-2" />
            Cards & Methods
          </TabsTrigger>
          <TabsTrigger value="wallet" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Wallet className="h-4 w-4 mr-2" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <ArrowRight className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Saved Payment Methods</CardTitle>
                  <CardDescription>Manage your saved cards and payment methods</CardDescription>
                </div>
                {!addingCard && (
                  <Button onClick={() => setAddingCard(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Card
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {addingCard ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="Name on card" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Expiry Month</Label>
                        <Select>
                          <SelectTrigger id="expiryMonth">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Expiry Year</Label>
                        <Select>
                          <SelectTrigger id="expiryYear">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="defaultCard" className="rounded border-gray-300" />
                      <Label htmlFor="defaultCard">Set as default payment method</Label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline" onClick={() => setAddingCard(false)}>
                      Cancel
                    </Button>
                    <Button>Save Card</Button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {savedCards.map((card) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-8 rounded ${card.type === "visa" ? "bg-blue-600" : "bg-red-600"} flex items-center justify-center text-white font-bold text-xs mr-3`}
                          >
                            {card.type === "visa" ? "VISA" : "MC"}
                          </div>
                          <div>
                            <p className="font-medium">{card.number}</p>
                            <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {card.isDefault && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Default
                            </Badge>
                          )}
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-2" />
                Your card information is encrypted and secure
              </div>
              <Button variant="outline" size="sm">
                Manage UPI IDs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>IRCTC Wallet</CardTitle>
                  <CardDescription>Add money to your wallet for faster checkout</CardDescription>
                </div>
                {!addingMoney && (
                  <Button onClick={() => setAddingMoney(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-6 rounded-lg mb-6 text-center">
                <Wallet className="h-12 w-12 mx-auto text-blue-700 mb-3" />
                <h3 className="text-3xl font-bold text-blue-700 mb-1">₹2,500</h3>
                <p className="text-sm text-gray-600">Available Balance</p>
              </div>

              {addingMoney ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Add Money to Wallet</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                        <Input
                          id="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-7"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["500", "1000", "2000", "5000"].map((amt) => (
                        <Button
                          key={amt}
                          variant="outline"
                          size="sm"
                          onClick={() => setAmount(amt)}
                          className={amount === amt ? "bg-blue-50 border-blue-200" : ""}
                        >
                          ₹{amt}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label>Payment Method</Label>
                      <RadioGroup defaultValue={selectedCard} onValueChange={setSelectedCard}>
                        {savedCards.map((card) => (
                          <div key={card.id} className="flex items-center space-x-2 border rounded-md p-3">
                            <RadioGroupItem value={card.id} id={`card-${card.id}`} />
                            <Label htmlFor={`card-${card.id}`} className="flex items-center cursor-pointer">
                              <div
                                className={`w-10 h-6 rounded ${card.type === "visa" ? "bg-blue-600" : "bg-red-600"} flex items-center justify-center text-white font-bold text-xs mr-2`}
                              >
                                {card.type === "visa" ? "VISA" : "MC"}
                              </div>
                              <span>{card.number}</span>
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="cursor-pointer">
                            UPI
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="netbanking" id="netbanking" />
                          <Label htmlFor="netbanking" className="cursor-pointer">
                            Net Banking
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline" onClick={() => setAddingMoney(false)}>
                      Cancel
                    </Button>
                    <Button>Proceed to Pay</Button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Benefits of IRCTC Wallet</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Faster checkout with one-click payments</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>No need to enter payment details repeatedly</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Secure and encrypted transactions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Easy refunds directly to your wallet</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Wallet Activity</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <div>
                            <p className="text-sm font-medium">Added Money</p>
                            <p className="text-xs text-gray-500">15 Oct, 2023</p>
                          </div>
                          <p className="text-green-600 font-medium">+₹1,000</p>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <div>
                            <p className="text-sm font-medium">Ticket Payment</p>
                            <p className="text-xs text-gray-500">14 Oct, 2023</p>
                          </div>
                          <p className="text-red-600 font-medium">-₹1,995</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Added Money</p>
                            <p className="text-xs text-gray-500">05 Oct, 2023</p>
                          </div>
                          <p className="text-green-600 font-medium">+₹2,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 mr-2" />
                Wallet balance is non-transferable
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("history")}>
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Method
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.type === "credit"
                            ? "Added Money to Wallet"
                            : transaction.description || "Payment"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.method}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                            {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-sm text-gray-500">Showing recent 4 transactions</div>
              <Button variant="outline" size="sm">
                Download Statement
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

