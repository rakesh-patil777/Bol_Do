import { useCallback, useState } from 'react';

interface SpeechSynthesisHook {
  speak: (text: string, lang?: string) => Promise<void>;
  stop: () => void;
  isSpeaking: boolean;
  supported: boolean;
}

export function useSpeechSynthesis(): SpeechSynthesisHook {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const supported = 'speechSynthesis' in window;

  const speak = useCallback((text: string, lang: string = 'hi-IN'): Promise<void> => {
    return new Promise((resolve) => {
      if (!supported) {
        resolve();
        return;
      }

      // Stop any current speech
      window.speechSynthesis.cancel();

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        utterance.onerror = (e) => {
          console.error('Speech synthesis error', e);
          setIsSpeaking(false);
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      }, 50);
    });
  }, [supported]);

  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [supported]);

  return {
    speak,
    stop,
    isSpeaking,
    supported
  };
}
