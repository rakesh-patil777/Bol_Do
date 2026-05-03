import { useState, useEffect } from 'react';
import { Camera, FileText, Mic, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { detectIntent } from '../services/groqService';
import TaskConfirm from './TaskConfirm';
import ImageUpload from './ImageUpload';
import FormFiller from './FormFiller';
import VoiceNavigator from './VoiceNavigator';
import HelpPage from './HelpPage';
import AnimatedBackground from './AnimatedBackground';
const LANG_MAP: Record<string, string> = {
  'english': 'en-IN',
  'hindi': 'hi-IN',
  'kannada': 'kn-IN'
};

const DISPLAY_LANG: Record<string, string> = {
  'en-IN': 'English 🇮🇳',
  'hi-IN': 'Hindi 🇮🇳',
  'kn-IN': 'Kannada 🇮🇳'
};

const UI_STRINGS: Record<string, Record<string, string>> = {
  'hi-IN': {
    tapToSpeak: "बोलने के लिए टैप करें",
    listening: "सुन रहा हूँ...",
    thinking: "सोच रहा हूँ...",
    speaking: "बोल रहा हूँ...",
    error: "त्रुटि। पुनः प्रयास करें।",
    confirming: "पुष्टि कर रहा हूँ...",
    helpMode: "मदद मोड: अपना प्रश्न पूछें...",
    answering: "उत्तर दे रहा हूँ...",
    image: "तस्वीर",
    form: "फॉर्म",
    help: "मदद",
    back: "वापस"
  },
  'kn-IN': {
    tapToSpeak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    listening: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
    thinking: "ಯೋಚಿಸುತ್ತಿದೆ...",
    speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
    error: "ದೋಷ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    confirming: "ಖಚಿತಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    helpMode: "ಸಹಾಯ ಮೋಡ್: ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...",
    answering: "ಉತ್ತರಿಸಲಾಗುತ್ತಿದೆ...",
    image: "ಚಿತ್ರ",
    form: "ಫಾರ್ಮ್",
    help: "ಸಹಾಯ",
    back: "ಹಿಂದೆ"
  },
  'en-IN': {
    tapToSpeak: "Tap to speak",
    listening: "Listening...",
    thinking: "Thinking...",
    speaking: "Speaking...",
    error: "Error. Try again.",
    confirming: "Confirming...",
    helpMode: "Help Mode: Ask your question...",
    answering: "Answering...",
    image: "Image",
    form: "Form",
    help: "Help",
    back: "Back"
  }
};

export default function AppScreen() {
  const [currentLang, setCurrentLang] = useState('en-IN');
  const [statusMessage, setStatusMessage] = useState('tapToSpeak');
  const [actionData, setActionData] = useState<{ type: string; params: any; promptText?: string; langCode?: string } | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showFormFiller, setShowFormFiller] = useState(false);
  const [showHelpPage, setShowHelpPage] = useState(false);
  const [autoOpenFile, setAutoOpenFile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [subMicActive, setSubMicActive] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Handle Voice Input Processing
  useEffect(() => {
    if (transcript && !isListening) {
      handleVoiceInput(transcript);
    }
  }, [transcript, isListening]);

  const handleVoiceInput = async (text: string) => {
    if (!text) {
      setStatusMessage('tapToSpeak');
      return;
    }

    setIsProcessing(true);
    setStatusMessage('thinking');
    
    try {
      // 1. Detect Intent using NVIDIA
      const { intent, language, params, spoken_text, response_text } = await detectIntent(text, showHelpPage, currentLang);
      
      // Update the language for future interactions if a valid one was returned
      const detectedLangCode = LANG_MAP[language?.toLowerCase()] || currentLang;
      if (detectedLangCode !== currentLang) {
        setCurrentLang(detectedLangCode);
      }

      // 2. Decide action based on intent
      // Prefer spoken_text (transliterated) for higher TTS reliability on diverse devices
      const textToSpeak = spoken_text || response_text || 'Sorry, I did not understand.';
      const speakLang = spoken_text ? 'en-IN' : detectedLangCode;

      if (intent === 'recharge') {
        setAssistantResponse(textToSpeak);
        handleRecharge(params, textToSpeak, detectedLangCode);
      } else if (intent === 'send_money') {
        setAssistantResponse(textToSpeak);
        handleSendMoney(params, textToSpeak, detectedLangCode);
      } else if (intent === 'help') {
        setAssistantResponse(textToSpeak);
        handleHelp(textToSpeak, detectedLangCode);
      } else {
        // unknown or other
        setAssistantResponse(textToSpeak);
        setStatusMessage('speaking');
        await speak(textToSpeak, speakLang);
        setStatusMessage('tapToSpeak');
        resetTranscript();
      }

    } catch (error) {
      console.error(error);
      setStatusMessage('error');
      const errorMsg = 'Sorry, there was a network error. Please try again.';
      setAssistantResponse(errorMsg);
      speak(errorMsg, currentLang);
      resetTranscript();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRecharge = (params: any, textToSpeak: string, langCode: string) => {
    setActionData({ type: 'Recharge', params, promptText: textToSpeak, langCode });
    setStatusMessage('confirming');
  };

  const handleSendMoney = (params: any, textToSpeak: string, langCode: string) => {
    setActionData({ type: 'Send Money', params, promptText: textToSpeak, langCode });
    setStatusMessage('confirming');
  };

  const handleHelp = async (textToSpeak: string, langCode: string) => {
    setStatusMessage('answering');
    // For help, we use the specific help lang (fallback to current if needed)
    await speak(textToSpeak, 'en-IN');
    console.log('Help requested in:', langCode);

    setStatusMessage('tapToSpeak');
    resetTranscript();
  };

  const toggleListen = () => {
    if (!supported) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    if (isListening) {
      stopListening();
    } else {
      setActionData(null);
      setAssistantResponse('');
      resetTranscript();
      startListening(currentLang);
      setStatusMessage('listening');
      // Stop speaking if currently speaking
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const enterHelpMode = async () => {
    setShowHelpPage(true);
    await speak('How can I help you?', currentLang);
  };


  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <AnimatedBackground />
      <div className="phone-frame" style={{ zIndex: 10 }}>
      <AnimatePresence>
        {showImageUpload && (
          <ImageUpload 
            onClose={() => { setShowImageUpload(false); setAutoOpenFile(false); }} 
            langCode={currentLang} 
            autoOpen={autoOpenFile}
          />
        )}
        {showFormFiller && (
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 100,
            }}
          >
            <FormFiller 
              onClose={() => { setShowFormFiller(false); setSubMicActive(false); }} 
              langCode={currentLang} 
              onMicStatusChange={setSubMicActive}
            />
          </motion.div>
        )}
        {showHelpPage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 300,
            }}
          >
            <HelpPage 
              langCode={currentLang}
              setCurrentLang={setCurrentLang}
              onBack={() => setShowHelpPage(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', width: '100%' }}>
        {/* Top Bar - Hide if any overlay is active */}
        {!showImageUpload && !showFormFiller && !showHelpPage && (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={24} />
            <span>{UI_STRINGS[currentLang]?.back || 'Back'}</span>
          </Link>
          
          <select 
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '12px',
              background: 'rgba(101, 155, 185, 0.1)',
              border: '1px solid rgba(101, 155, 185, 0.3)',
              color: 'var(--primary-dark)',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              outline: 'none',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {Object.entries(DISPLAY_LANG).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
        )}

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {actionData && (actionData.type === 'Recharge' || actionData.type === 'Send Money') ? (
          <AnimatePresence>
            <TaskConfirm
              type={actionData.type}
              params={actionData.params}
              promptText={actionData.promptText!}
              langCode={actionData.langCode!}
              onSuccess={() => {
                setTimeout(() => {
                  setActionData(null);
                  setStatusMessage('tapToSpeak');
                }, 3000);
              }}
              onCancel={() => {
                setTimeout(() => {
                  setActionData(null);
                  setStatusMessage('tapToSpeak');
                }, 3000);
              }}
            />
          </AnimatePresence>
        ) : (
          <>
            {/* Active Action Display (For Help or Others) */}
            <AnimatePresence>
              {actionData && actionData.type === 'Help' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '1.5rem 2rem',
                    borderRadius: '24px',
                    textAlign: 'center',
                    maxWidth: '80%',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <HelpCircle size={32} color="#10B981" style={{ margin: '0 auto 0.5rem auto' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#10B981' }}>{actionData.type} Initiated</h3>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulsing rings when listening */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Ripple Effect Background */}
              {(isListening || isProcessing) && (
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    backgroundColor: isListening ? '#10B981' : 'var(--primary)',
                    zIndex: 0
                  }}
                />
              )}

              <motion.div
                animate={{
                  scale: isListening ? 1.05 : isProcessing ? [1, 1.02, 1] : 1,
                }}
                transition={{
                  repeat: isProcessing ? Infinity : 0,
                  duration: 1,
                }}
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  backgroundColor: isListening ? '#10B981' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isListening 
                    ? '0 0 40px rgba(16, 185, 129, 0.4)' 
                    : '0 20px 40px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  zIndex: 1,
                  position: 'relative'
                }}
                onClick={toggleListen}
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{
                      width: '60px',
                      height: '60px',
                      border: '6px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  <Mic size={80} color="white" />
                )}
              </motion.div>
            </div>

            <div style={{ minHeight: '80px', padding: '0.5rem 1.5rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.25rem', opacity: 0.8, textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
                {UI_STRINGS[currentLang]?.[statusMessage] || statusMessage}
              </div>
              
              <AnimatePresence mode="wait">
                {assistantResponse ? (
                  <motion.div 
                    key="response"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ fontSize: '1.15rem', color: 'var(--text-main)', textAlign: 'center', lineHeight: 1.4, maxWidth: '90%', fontWeight: 500 }}
                  >
                    {assistantResponse}
                  </motion.div>
                ) : (transcript) ? (
                  <motion.div 
                    key="transcript"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isListening ? 0.8 : 0.6 }}
                    style={{ 
                      fontSize: '1.1rem', 
                      textAlign: 'center', 
                      fontStyle: 'italic',
                      color: isListening ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: isListening ? '600' : 'normal'
                    }}
                  >
                    "{transcript}"
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '2rem',
        background: 'linear-gradient(to top, rgba(255, 252, 239, 1), transparent)',
        zIndex: 10
      }}>
        <button style={actionButtonStyle} onClick={() => { stopListening(); setShowImageUpload(true); }}>
          <div style={iconWrapperStyle}>
            <Camera size={32} />
          </div>
          <span style={labelStyle}>{UI_STRINGS[currentLang]?.image || 'Image'}</span>
        </button>
        
        <button style={actionButtonStyle} onClick={() => { stopListening(); setShowFormFiller(true); }}>
          <div style={iconWrapperStyle}>
            <FileText size={32} />
          </div>
          <span style={labelStyle}>{UI_STRINGS[currentLang]?.form || 'Form'}</span>
        </button>
        
        <button style={actionButtonStyle} onClick={enterHelpMode}>
          <div style={iconWrapperStyle}>
            <HelpCircle size={32} />
          </div>
          <span style={labelStyle}>{UI_STRINGS[currentLang]?.help || 'Help'}</span>
        </button>
      </div>

      {/* Global Voice Navigator */}
      <VoiceNavigator
        langCode={currentLang}
        onNavigateImage={() => { setShowImageUpload(true); setAutoOpenFile(true); }}
        onNavigateForm={() => setShowFormFiller(true)}
        onNavigateHelp={enterHelpMode}
        onTriggerRecharge={(text) => handleRecharge({}, text, currentLang)}
        onTriggerSendMoney={(text) => handleSendMoney({}, text, currentLang)}
        disabled={showFormFiller || showImageUpload || showHelpPage || isListening || isProcessing || isSpeaking || subMicActive || statusMessage === 'listening' || statusMessage === 'thinking'}
      />
      </div>
      </div>
    </div>
  );
}

const actionButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-main)',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  opacity: 0.8,
  transition: 'opacity 0.2s'
};

const iconWrapperStyle = {
  width: '64px',
  height: '64px',
  borderRadius: '20px',
  background: 'rgba(101, 155, 185, 0.1)',
  border: '1px solid rgba(101, 155, 185, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const labelStyle = {
  fontSize: '1rem',
  fontWeight: '500'
};
