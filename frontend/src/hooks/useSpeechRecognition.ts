import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  startListening: (lang?: string) => void;
  stopListening: () => void;
  resetTranscript: () => void;
  supported: boolean;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true; // Keep it true for better flow
      recog.interimResults = true;
      
      recog.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        
        if (final) {
          setTranscript(final);
          // For one-shot command apps, we might want to stop after final
          recog.stop();
          setIsListening(false);
        } else {
          setTranscript(interim);
        }
      };

      recog.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    }
  }, []);

  const startListening = useCallback((lang: string = 'hi-IN') => {
    if (recognition) {
      try {
        recognition.lang = lang;
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.error('Failed to start speech recognition', e);
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    supported: !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition)
  };
}
