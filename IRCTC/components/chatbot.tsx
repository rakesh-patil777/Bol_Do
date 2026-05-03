"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2, Bot, User, Train, CreditCard, Clock, Calendar, HelpCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm DISHA, your virtual assistant for Indian Railways. How can I help you today?",
    sender: "bot",
    timestamp: new Date()
  }
]

const suggestedQueries = [
  "How do I book a ticket?",
  "What is the refund policy?",
  "How to check PNR status?",
  "What is tatkal booking?",
  "How to cancel my ticket?"
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])
  
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = ""
      
      if (text.toLowerCase().includes("book") || text.toLowerCase().includes("ticket")) {
        botResponse = "To book a ticket, go to the Booking page and enter your journey details including source, destination, date, and class preference. Then select your train and proceed with passenger details and payment."
      } else if (text.toLowerCase().includes("refund") || text.toLowerCase().includes("cancel")) {
        botResponse = "For cancellations, go to 'My Bookings' section, select the ticket you wish to cancel and follow the instructions. Refund amount depends on how early you cancel before the journey date."
      } else if (text.toLowerCase().includes("pnr") || text.toLowerCase().includes("status")) {
        botResponse = "You can check your PNR status by entering your 10-digit PNR number in the 'PNR Status' section on the homepage or under the 'Trains' menu."
      } else if (text.toLowerCase().includes("tatkal")) {
        botResponse = "Tatkal booking opens at 10:00 AM for AC classes and 11:00 AM for non-AC classes, one day before the journey date (excluding the day of journey)."
      } else {
        botResponse = "Thank you for your query. I'll help you with that. Is there anything specific about Indian Railways services you'd like to know?"
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-700 hover:bg-blue-800 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
        </Button>
      </motion.div>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-blue-200"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 border-2 border-white">
                  <AvatarImage src="/disha-avatar.png" alt="DISHA" />
                  <AvatarFallback className="bg-blue-600">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">DISHA</h3>
                  <p className="text-xs text-blue-100">Virtual Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-600 rounded-full h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start max-w-[80%]">
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src="/disha-avatar.png" alt="DISHA" />
                          <AvatarFallback className="bg-blue-600 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-blue-700 text-white"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 ml-2 mt-1">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start max-w-[80%]">
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src="/disha-avatar.png" alt="DISHA" />
                        <AvatarFallback className="bg-blue-600 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-white border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Suggested Queries */}
            {messages.length <= 2 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(query)}
                      className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="p-2 border-t border-gray-200 bg-white">
              <div className="flex justify-between mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  title="Book Tickets"
                >
                  <CreditCard className="h-4 w-4 text-blue-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  title="Train Status"
                >
                  <Train className="h-4 w-4 text-blue-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  title="PNR Status"
                >
                  <Clock className="h-4 w-4 text-blue-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  title="Train Schedule"
                >
                  <Calendar className="h-4 w-4 text-blue-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  title="Help"
                >
                  <HelpCircle className="h-4 w-4 text-blue-700" />
                </Button>
              </div>
            </div>
            
            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border-gray-200 focus-visible:ring-blue-500"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isTyping}
                  className="ml-2 bg-blue-700 hover:bg-blue-800 h-10 w-10 rounded-full"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
