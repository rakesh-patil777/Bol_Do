"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

interface VoiceContextType {
  fromStation: string
  setFromStation: (val: string) => void
  toStation: string
  setToStation: (val: string) => void
  journeyDate: string
  setJourneyDate: (val: string) => void
  travelClass: string
  setTravelClass: (val: string) => void
  isListening: boolean
  setIsListening: (val: boolean) => void
  assistantText: string
  setAssistantText: (val: string) => void
  speak: (text: string) => void
  startListening: () => void
  stopListening: () => void
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [journeyDate, setJourneyDate] = useState("")
  const [travelClass, setTravelClass] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [assistantText, setAssistantText] = useState("Click the mic to start voice assistance")

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
      setAssistantText(text)
    }
  }, [])

  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const rec = new SpeechRecognition()
      rec.continuous = false
      rec.interimResults = false
      rec.lang = "en-IN"
      setRecognition(rec)
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start()
        setIsListening(true)
      } catch (e) {
        console.error("Recognition already started", e)
      }
    } else {
      alert("Speech recognition not supported in this browser.")
    }
  }, [recognition])

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }, [recognition])

  return (
    <VoiceContext.Provider
      value={{
        fromStation,
        setFromStation,
        toStation,
        setToStation,
        journeyDate,
        setJourneyDate,
        travelClass,
        setTravelClass,
        isListening,
        setIsListening,
        assistantText,
        setAssistantText,
        speak,
        startListening,
        stopListening,
      }}
    >
      {children}
    </VoiceContext.Provider>
  )
}

export const useVoice = () => {
  const context = useContext(VoiceContext)
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider")
  }
  return context
}
