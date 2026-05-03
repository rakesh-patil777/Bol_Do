"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, X, Volume2, VolumeX, Bot, User, Play, Search, Navigation } from "lucide-react"
import { useVoice } from "@/hooks/voice-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function VoiceAssistant() {
  const {
    fromStation, setFromStation,
    toStation, setToStation,
    journeyDate, setJourneyDate,
    travelClass, setTravelClass,
    isListening, setIsListening,
    assistantText, setAssistantText,
    speak, startListening, stopListening
  } = useVoice()

  const [isOpen, setIsOpen] = useState(false)
  const [step, _setStep] = useState(0) // 0: initial, 1: asking from, 2: asking to, 3: asking date, 4: confirmation, 5: final search
  const stepRef = useRef(0)
  
  const setStep = (s: number) => {
    _setStep(s)
    stepRef.current = s
  }

  const [isMuted, setIsMuted] = useState(false)
  
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-IN"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        handleVoiceInput(transcript, stepRef.current)
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
        if (event.error === 'no-speech') {
           setAssistantText("I didn't hear anything. Could you please repeat?")
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [step]) // Re-bind handleVoiceInput when step changes

  const startRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleVoiceInput = (text: string, currentStep: number) => {
    const lowerText = text.toLowerCase().trim()
    console.log("Voice Input:", lowerText, "at step:", currentStep)

    // Handle "Global" commands like "book [train]"
    if (lowerText.includes("book")) {
      const trainName = lowerText.replace("book", "").replace("the", "").trim()
      if (trainName) {
        const success = clickBookButtonForTrain(trainName)
        if (success) {
          speak(`Sure, booking the ${trainName} for you.`)
          return
        } else {
          // If not found, maybe we're on the home page and need to search first
          if (window.location.pathname === "/") {
            speak(`I'll help you search for the ${trainName} first. Please tell me where you're starting from.`)
            setStep(1)
            return
          }
          speak(`I couldn't find ${trainName} on this page. Could you please specify which train?`)
          return
        }
      }
    }

    // Normal step-by-step flow
    if (currentStep === 1) {
      setFromStation(text)
      setStep(2)
      const msg = `Got it, from ${text}. And where is your destination?`
      speak(msg)
    } else if (currentStep === 2) {
      setToStation(text)
      setStep(3)
      const msg = `Understood, to ${text}. On which date would you like to travel?`
      speak(msg)
    } else if (currentStep === 3) {
      setJourneyDate(parseDate(lowerText))
      setStep(4)
      const msg = `Got the date. Which class would you like? For example, Sleeper or AC 3 Tier?`
      speak(msg)
    } else if (currentStep === 4) {
      // Map voice input to travel class codes
      let classCode = "SL"
      if (lowerText.includes("3") || lowerText.includes("tier 3")) classCode = "3A"
      if (lowerText.includes("2") || lowerText.includes("tier 2")) classCode = "2A"
      if (lowerText.includes("1") || lowerText.includes("first")) classCode = "1A"
      if (lowerText.includes("chair")) classCode = "CC"
      
      setTravelClass(classCode)
      setStep(5)
      const msg = `Perfect. I've filled all the details. Should I search for trains now?`
      speak(msg)
    } else if (currentStep === 5) {
      if (lowerText.includes("yes") || lowerText.includes("search") || lowerText.includes("go")) {
        speak("Searching for trains. Please wait.")
        setTimeout(() => {
          window.location.href = "/train-list"
        }, 1500)
      } else {
        speak("Okay, you can review the details on the screen.")
      }
    }
  }

  const clickBookButtonForTrain = (trainName: string) => {
    // Search for the train name in the page
    const headers = Array.from(document.querySelectorAll('h3'))
    const matchingHeader = headers.find(h => h.textContent?.toLowerCase().includes(trainName))
    
    if (matchingHeader) {
      // Find the "Book Now" button in the same card
      const card = matchingHeader.closest('.rounded-lg') || matchingHeader.closest('.overflow-hidden')
      if (card) {
        const buttons = Array.from(card.querySelectorAll('button'))
        const bookButton = buttons.find(b => b.textContent?.toLowerCase().includes('book now'))
        if (bookButton) {
          bookButton.click()
          return true
        }
      }
    }
    return false
  }

  const scanAndAsk = () => {
    // Find all inputs and selects on the page
    const inputs = Array.from(document.querySelectorAll('input, select'))
    const emptyInput = inputs.find(input => {
      if (input.tagName === 'INPUT') {
        return !(input as HTMLInputElement).value
      }
      if (input.tagName === 'SELECT') {
        return !(input as HTMLSelectElement).value
      }
      return false
    })

    if (emptyInput) {
      const label = emptyInput.getAttribute('placeholder') || emptyInput.getAttribute('aria-label') || 'this field'
      speak(`I see that ${label} is empty. What should I put there?`)
      // Focus the input
      ;(emptyInput as HTMLElement).focus()
      // We can also set a listener for the next voice input to fill this specific element
      // But for now, we'll just guide the user
    } else {
      speak("All details seem to be filled. Should I proceed?")
    }
  }

  const parseDate = (text: string) => {
    const today = new Date()
    if (text.includes("tomorrow")) {
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    }
    if (text.includes("today")) {
      return today.toISOString().split('T')[0]
    }
    // Attempt to match YYYY-MM-DD or other formats
    const dateMatch = text.match(/\d{4}-\d{2}-\d{2}/)
    if (dateMatch) return dateMatch[0]
    
    return today.toISOString().split('T')[0] // Default to today
  }

  const startAssistance = () => {
    setIsOpen(true)
    // If we're on a page with a specific form, scan it
    if (window.location.pathname === "/") {
      setStep(1)
      const msg = "Welcome to IRCTC Voice Assistant. Which station are you starting from?"
      speak(msg)
    } else {
      scanAndAsk()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-24 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={isOpen ? () => setIsOpen(false) : startAssistance}
          className={cn(
            "h-16 w-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          )}
        >
          {isOpen ? <X className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white animate-pulse" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500 text-[10px] items-center justify-center text-white font-bold">AI</span>
            </span>
          )}
        </Button>
      </motion.div>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-44 right-6 w-80 sm:w-96 z-50"
          >
            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Voice Assistant</h3>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">Ready to help</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="text-white hover:bg-white/10 h-8 w-8">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <motion.div
                      animate={isListening ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      } : {}}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 bg-blue-500 rounded-full"
                    />
                    <Button
                      onClick={startRecognition}
                      disabled={isListening}
                      className={cn(
                        "h-20 w-20 rounded-full relative z-10 transition-all",
                        isListening ? "bg-blue-600 scale-110 shadow-blue-200 shadow-xl" : "bg-gray-100 hover:bg-gray-200 text-blue-600 shadow-lg"
                      )}
                    >
                      {isListening ? <Mic className="h-10 w-10 text-white" /> : <Mic className="h-10 w-10" />}
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-gray-800 leading-relaxed min-h-[40px]">
                      "{assistantText}"
                    </p>
                    <p className="text-xs text-gray-400 italic">
                      {isListening ? "Listening..." : "Tap the mic to respond"}
                    </p>
                  </div>

                  {/* Quick Actions Bar */}
                  <div className="w-full flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scanAndAsk}
                      className="text-[10px] h-8 border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100"
                    >
                      <Search className="h-3 w-3 mr-1" />
                      Scan Page
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => speak("Reading screen content. I see the Shatabdi Express and Vande Bharat Express available for booking.")}
                      className="text-[10px] h-8 border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100"
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      Read Screen
                    </Button>
                  </div>

                  {/* Field Progress */}
                  <div className="w-full grid grid-cols-5 gap-2 mt-2">
                    <div className={cn("h-1 rounded-full", step >= 1 ? "bg-blue-600" : "bg-gray-100")} />
                    <div className={cn("h-1 rounded-full", step >= 2 ? "bg-blue-600" : "bg-gray-100")} />
                    <div className={cn("h-1 rounded-full", step >= 3 ? "bg-blue-600" : "bg-gray-100")} />
                    <div className={cn("h-1 rounded-full", step >= 4 ? "bg-blue-600" : "bg-gray-100")} />
                    <div className={cn("h-1 rounded-full", step >= 5 ? "bg-blue-600" : "bg-gray-100")} />
                  </div>

                  <div className="w-full space-y-3 pt-2">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                      <span>Live Data Scan</span>
                      <Navigation className="h-3 w-3" />
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">From:</span>
                        <span className="font-bold text-blue-700">{fromStation || "Pending..."}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">To:</span>
                        <span className="font-bold text-blue-700">{toStation || "Pending..."}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-bold text-blue-700">{journeyDate || "Pending..."}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Class:</span>
                        <span className="font-bold text-blue-700">{travelClass || "Pending..."}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
