import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Phone, MessageSquare, Send, ArrowLeft, Bot, Loader2, Mic, X } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { detectIntent } from '../services/groqService';

interface HelpPageProps {
  onBack: () => void;
  langCode: string;
  setCurrentLang: (lang: string) => void;
}

const UI_STRINGS: Record<string, any> = {
  'en-IN': {
    title: "BolDo Support",
    quickSupport: "Quick Support",
    avgResponse: "Avg. response time: 2 mins",
    startChat: "Start Chat",
    faqsTitle: "FAQs",
    writeToUs: "Write to us",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    howCanWeHelp: "How can we help you?",
    sendMessage: "Send Message",
    sentSuccessfully: "Sent Successfully",
    faqs: [
      {
        question: "How do I send money?",
        answer: "Sending money is instant. Simply tap 'Send' on the home screen, enter the recipient's phone number or scan their QR code, enter the amount, and confirm with your secure PIN."
      },
      {
        question: "How to recharge my phone?",
        answer: "Navigate to the 'Payments' tab, select 'Mobile Recharge', choose your operator, enter your plan amount, and proceed to pay. Your recharge will be active immediately."
      },
      {
        question: "What are the transaction limits?",
        answer: "Standard accounts have a daily limit of ₹1,00,000 for UPI transfers. For higher limits, please complete your Full KYC through a quick video call with our representatives."
      }
    ]
  },
  'hi-IN': {
    title: "बोल-दो सहायता",
    quickSupport: "त्वरित सहायता",
    avgResponse: "औसत उत्तर समय: 2 मिनट",
    startChat: "चैट शुरू करें",
    faqsTitle: "सामान्य प्रश्न",
    writeToUs: "हमें लिखें",
    fullName: "पूरा नाम",
    phoneNumber: "फ़ोन नंबर",
    howCanWeHelp: "हम आपकी कैसे मदद कर सकते हैं?",
    sendMessage: "संदेश भेजें",
    sentSuccessfully: "सफलतापूर्वक भेजा गया",
    faqs: [
      {
        question: "मैं पैसे कैसे भेजूं?",
        answer: "पैसे भेजना तुरंत होता है। बस होम स्क्रीन पर 'भेजें' पर टैप करें, प्राप्तकर्ता का फोन नंबर दर्ज करें या उनका क्यूआर कोड स्कैन करें, राशि दर्ज करें और अपने सुरक्षित पिन से पुष्टि करें।"
      },
      {
        question: "मेरा फोन कैसे रिचार्ज करें?",
        answer: "'भुगतान' टैब पर जाएं, 'मोबाइल रिचार्ज' चुनें, अपना ऑपरेटर चुनें, अपनी योजना राशि दर्ज करें, और भुगतान करने के लिए आगे बढ़ें। आपका रिचार्ज तुरंत सक्रिय हो जाएगा।"
      },
      {
        question: "लेनदेन की सीमाएं क्या हैं?",
        answer: "मानक खातों में UPI ट्रांसफर के लिए ₹1,00,000 की दैनिक सीमा होती है। उच्च सीमाओं के लिए, कृपया हमारे प्रतिनिधियों के साथ एक त्वरित वीडियो कॉल के माध्यम से अपना पूर्ण केवाईसी पूरा करें।"
      }
    ]
  },
  'kn-IN': {
    title: "BolDo ಬೆಂಬಲ",
    quickSupport: "ತ್ವರಿತ ಬೆಂಬಲ",
    avgResponse: "ಸರಾವರಿ ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ: 2 ನಿಮಿಷಗಳು",
    startChat: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
    faqsTitle: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    writeToUs: "ನಮಗೆ ಬರೆಯಿರಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    howCanWeHelp: "ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    sentSuccessfully: "ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    faqs: [
      {
        question: "ನಾನು ಹಣವನ್ನು ಹೇಗೆ ಕಳುಹಿಸುವುದು?",
        answer: "ಹಣವನ್ನು ಕಳುಹಿಸುವುದು ತಕ್ಷಣವೇ ಆಗುತ್ತದೆ. ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ನಲ್ಲಿ 'ಕಳುಹಿಸು' ಟ್ಯಾಪ್ ಮಾಡಿ, ಸ್ವೀಕರಿಸುವವರ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಅವರ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ, ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸುರಕ್ಷಿತ ಪಿನ್ ಮೂಲಕ ಖಚಿತಪಡಿಸಿ."
      },
      {
        question: "ನನ್ನ ಫೋನ್ ರೀಚಾರ್ಜ್ ಮಾಡುವುದು ಹೇಗೆ?",
        answer: "'ಪಾವತಿಗಳು' ಟ್ಯಾಬ್‌ಗೆ ಹೋಗಿ, 'ಮೊಬೈಲ್ ರೀಚಾರ್ಜ್' ಆಯ್ಕೆಮಾಡಿ, ನಿಮ್ಮ ಆಪರೇಟರ್ ಅನ್ನು ಆರಿಸಿ, ನಿಮ್ಮ ಯೋಜನೆ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಪಾವತಿಸಲು ಮುಂದುವರಿಯಿರಿ. ನಿಮ್ಮ ರೀಚಾರ್ಜ್ ತಕ್ಷಣವೇ ಸಕ್ರಿಯವಾಗಿರುತ್ತದೆ."
      },
      {
        question: "ವಹಿವಾಟಿನ ಮಿತಿಗಳೇನು?",
        answer: "ಪ್ರಮಾಣಿತ ಖಾತೆಗಳು UPI ವರ್ಗಾವಣೆಗಳಿಗೆ ₹1,00,000 ದೈನಂದಿನ ಮಿತಿಯನ್ನು ಹೊಂದಿವೆ. ಹೆಚ್ಚಿನ ಮಿತಿಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು ನಮ್ಮ ಪ್ರತಿನಿಧಿಗಳೊಂದಿಗೆ ತ್ವರಿತ ವೀಡಿಯೊ ಕರೆಯ ಮೂಲಕ ನಿಮ್ಮ ಪೂರ್ಣ KYC ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ."
      }
    ]
  }
};

const HelpPage: React.FC<HelpPageProps> = ({ onBack, langCode, setCurrentLang }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([
    { role: 'bot', text: 'Namaste! I am BolDo Assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const t = UI_STRINGS[langCode] || UI_STRINGS['en-IN'];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const handleChatSend = async (textOverride?: string) => {
    const text = textOverride || chatInput;
    if (!text.trim()) return;

    const newMessages = [...chatMessages, { role: 'user' as const, text }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsBotTyping(true);

    try {
      // Use existing detectIntent for help context
      const response = await detectIntent(text, true, langCode);
      const botText = response.response_text;
      const spokenText = response.spoken_text || botText;

      setChatMessages(prev => [...prev, { role: 'bot', text: botText }]);
      speak(spokenText, 'en-IN'); // Use en-IN for transliterated speech or detectLang
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting. Please try again.' }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Sync transcript to chat input when voice is used
  React.useEffect(() => {
    if (transcript && isChatOpen) {
      setChatInput(transcript);
    }
  }, [transcript, isChatOpen]);

  const toggleMic = () => {
    if (isListening) {
      stopListening();
      if (chatInput) handleChatSend(chatInput);
    } else {
      resetTranscript();
      startListening(langCode);
    }
  };

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      background: 'var(--bg-color)', zIndex: 200,
    }}>
        
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          
          {/* SECTION 1: HEADER */}
          <header style={{
            position: 'sticky', top: 0, left: 0, width: '100%', zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 1.5rem', height: '4rem',
            backgroundColor: 'rgba(255, 252, 239, 0.9)',
            backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(101, 155, 185, 0.2)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <button onClick={onBack} style={{
              padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'transparent',
              color: 'var(--primary-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ArrowLeft size={24} />
            </button>
            <h1 style={{
              fontSize: '1.25rem', fontWeight: 'bold', margin: 0,
              fontFamily: "'Outfit', sans-serif", color: 'var(--primary-dark)'
            }}>
              {t.title}
            </h1>
            <div style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <select 
                value={langCode}
                onChange={(e) => setCurrentLang(e.target.value)}
                style={{
                  padding: '0.25rem 0.5rem',
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
                <option value="en-IN">English IN</option>
                <option value="hi-IN">Hindi IN</option>
                <option value="kn-IN">Kannada IN</option>
              </select>
            </div>
          </header>

          <main style={{
            padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '2.5rem'
          }}>
            
            {/* SECTION 4: QUICK SUPPORT */}
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                borderRadius: '20px', border: '1px solid rgba(101, 155, 185, 0.2)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
                backdropFilter: 'blur(10px)', boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ position: 'relative' }}>
                <div style={{
                  padding: '0.75rem', borderRadius: '50%',
                  backgroundColor: 'rgba(101, 155, 185, 0.15)', color: 'var(--primary-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Bot size={28} />
                </div>
                {/* Subtle pulse animation */}
                <motion.div 
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    borderRadius: '50%', border: '2px solid var(--primary-light)', pointerEvents: 'none'
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.125rem', color: 'var(--text-main)', fontFamily: "'Outfit', sans-serif" }}>
                  {t.quickSupport}
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                  {t.avgResponse}
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                style={{
                  padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.875rem',
                  backgroundColor: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {t.startChat}
              </motion.button>
            </motion.section>

            {/* SECTION 2: FAQ */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: '0 0.5rem', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: "'Outfit', sans-serif", color: 'var(--primary-dark)' }}>
                {t.faqsTitle}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {t.faqs.map((faq: { question: string; answer: string }, index: number) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div 
                      key={index}
                      style={{ 
                        borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(101, 155, 185, 0.15)',
                        background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-sm)'
                      }}
                      whileHover={{ scale: 1.01, boxShadow: '0 8px 20px -5px rgba(101, 155, 185, 0.15)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <button 
                        onClick={() => toggleFaq(index)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '1.25rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontWeight: 'bold', fontSize: '0.9375rem', color: 'var(--text-main)' }}>{faq.question}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <ChevronDown size={20} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{
                              padding: '0 1.25rem 1.25rem 1.25rem', fontSize: '0.9375rem', lineHeight: 1.6,
                              color: 'var(--text-muted)', borderTop: '1px solid rgba(101, 155, 185, 0.1)'
                            }}>
                              <div style={{ paddingTop: '0.75rem' }}>{faq.answer}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: CONTACT FORM */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: '0 0.5rem', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: "'Outfit', sans-serif", color: 'var(--primary-dark)' }}>
                {t.writeToUs}
              </h3>
              
              <motion.div 
                style={{ 
                  padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.6)',
                  position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Subtle background glow */}
                <div style={{
                  position: 'absolute', top: '-5rem', right: '-5rem', width: '12rem', height: '12rem',
                  borderRadius: '50%', background: 'var(--primary)', opacity: 0.1, filter: 'blur(40px)', pointerEvents: 'none'
                }}></div>
                
                <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 10 }}>
                  
                  {/* Name Input */}
                  <div style={{ position: 'relative', paddingTop: '0.5rem' }}>
                    <div style={{
                      position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                      color: focusedField === 'name' ? 'var(--primary)' : 'var(--text-muted)',
                      transition: 'color 0.3s', marginTop: '0.25rem', display: 'flex', alignItems: 'center'
                    }}>
                      <User size={20} />
                    </div>
                    <input 
                      type="text" 
                      id="name"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      style={{ 
                        width: '100%', padding: '1.25rem 1rem 0.5rem 3rem', borderRadius: '12px',
                        border: '1px solid', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        outline: 'none', transition: 'all 0.3s', fontWeight: 500, boxSizing: 'border-box',
                        borderColor: focusedField === 'name' ? 'var(--primary)' : 'rgba(101, 155, 185, 0.2)',
                        boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(101, 155, 185, 0.15)' : 'none',
                        color: 'var(--text-main)'
                      }}
                    />
                    <label 
                      htmlFor="name" 
                      style={{
                        position: 'absolute', left: '3rem', top: '1.125rem',
                        transition: 'all 0.3s ease-out', pointerEvents: 'none',
                        color: focusedField === 'name' ? 'var(--primary)' : 'var(--text-muted)',
                        transform: (focusedField === 'name' || formData.name) ? 'translateY(-12px)' : 'none',
                        fontSize: (focusedField === 'name' || formData.name) ? '0.75rem' : '0.875rem'
                      }}
                    >
                      {t.fullName}
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div style={{ position: 'relative', paddingTop: '0.5rem' }}>
                    <div style={{
                      position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                      color: focusedField === 'phone' ? 'var(--primary)' : 'var(--text-muted)',
                      transition: 'color 0.3s', marginTop: '0.25rem', display: 'flex', alignItems: 'center'
                    }}>
                      <Phone size={20} />
                    </div>
                    <input 
                      type="tel" 
                      id="phone"
                      required
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      style={{ 
                        width: '100%', padding: '1.25rem 1rem 0.5rem 3rem', borderRadius: '12px',
                        border: '1px solid', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        outline: 'none', transition: 'all 0.3s', fontWeight: 500, boxSizing: 'border-box',
                        borderColor: focusedField === 'phone' ? 'var(--primary)' : 'rgba(101, 155, 185, 0.2)',
                        boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(101, 155, 185, 0.15)' : 'none',
                        color: 'var(--text-main)'
                      }}
                    />
                    <label 
                      htmlFor="phone" 
                      style={{
                        position: 'absolute', left: '3rem', top: '1.125rem',
                        transition: 'all 0.3s ease-out', pointerEvents: 'none',
                        color: focusedField === 'phone' ? 'var(--primary)' : 'var(--text-muted)',
                        transform: (focusedField === 'phone' || formData.phone) ? 'translateY(-12px)' : 'none',
                        fontSize: (focusedField === 'phone' || formData.phone) ? '0.75rem' : '0.875rem'
                      }}
                    >
                      {t.phoneNumber}
                    </label>
                  </div>

                  {/* Message Input */}
                  <div style={{ position: 'relative', paddingTop: '0.5rem' }}>
                    <div style={{
                      position: 'absolute', left: '1rem', top: '1.5rem',
                      color: focusedField === 'message' ? 'var(--primary)' : 'var(--text-muted)',
                      transition: 'color 0.3s', display: 'flex', alignItems: 'center'
                    }}>
                      <MessageSquare size={20} />
                    </div>
                    <textarea 
                      id="message"
                      required
                      rows={4}
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      style={{ 
                        width: '100%', padding: '1.5rem 1rem 0.5rem 3rem', borderRadius: '12px',
                        border: '1px solid', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        outline: 'none', transition: 'all 0.3s', fontWeight: 500, resize: 'none', boxSizing: 'border-box',
                        borderColor: focusedField === 'message' ? 'var(--primary)' : 'rgba(101, 155, 185, 0.2)',
                        boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(101, 155, 185, 0.15)' : 'none',
                        color: 'var(--text-main)'
                      }}
                    />
                    <label 
                      htmlFor="message" 
                      style={{
                        position: 'absolute', left: '3rem', top: '1rem',
                        transition: 'all 0.3s ease-out', pointerEvents: 'none',
                        color: focusedField === 'message' ? 'var(--primary)' : 'var(--text-muted)',
                        transform: (focusedField === 'message' || formData.message) ? 'translateY(-12px)' : 'none',
                        fontSize: (focusedField === 'message' || formData.message) ? '0.75rem' : '0.875rem'
                      }}
                    >
                      {t.howCanWeHelp}
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 20px -5px rgba(101, 155, 185, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSending || isSent}
                    style={{ 
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '1rem 0', borderRadius: '16px', color: 'white', fontWeight: 'bold', fontSize: '1rem',
                      border: 'none', cursor: 'pointer', transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
                      background: isSent ? '#10B981' : 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    {isSending ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <Loader2 size={22} />
                      </motion.div>
                    ) : isSent ? (
                      <span>{t.sentSuccessfully}</span>
                    ) : (
                      <>
                        <span>{t.sendMessage}</span>
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </section>

          </main>
        </div>

        {/* CHATBOT OVERLAY */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'var(--bg-color)', zIndex: 300,
                display: 'flex', flexDirection: 'column'
              }}
            >
              {/* Chat Header */}
              <div style={{
                padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
                borderBottom: '1px solid rgba(101, 155, 185, 0.2)', backgroundColor: 'white'
              }}>
                <button onClick={() => { setIsChatOpen(false); stopListening(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-dark)' }}>
                  <ArrowLeft size={24} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: 'rgba(101, 155, 185, 0.1)', color: 'var(--primary)' }}>
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>BolDo Support</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                      <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 500 }}>Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      padding: '0.75rem 1rem',
                      borderRadius: msg.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                      backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'white',
                      color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.5
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                {isBotTyping && (
                  <div style={{ alignSelf: 'flex-start', background: 'white', padding: '0.75rem 1rem', borderRadius: '18px 18px 18px 2px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <Loader2 size={18} className="animate-spin" style={{ color: 'var(--primary)' }} />
                  </div>
                )}
                <div id="chat-end"></div>
              </div>

              {/* Chat Input */}
              <div style={{ padding: '1.25rem', backgroundColor: 'white', borderTop: '1px solid rgba(101, 155, 185, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Ask anything..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                      style={{
                        width: '100%', padding: '0.875rem 1.25rem', borderRadius: '99px',
                        border: '1.5px solid rgba(101, 155, 185, 0.2)', background: '#F9FAFB',
                        outline: 'none', fontSize: '0.9375rem', transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  {/* Mic Button beside input */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMic}
                    style={{
                      width: '46px', height: '46px', borderRadius: '50%',
                      backgroundColor: isListening ? '#EF4444' : 'rgba(101, 155, 185, 0.1)',
                      color: isListening ? 'white' : 'var(--primary)',
                      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.3s'
                    }}
                  >
                    {isListening ? (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <X size={20} />
                      </motion.div>
                    ) : (
                      <Mic size={20} />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleChatSend()}
                    disabled={!chatInput.trim() || isBotTyping}
                    style={{
                      width: '46px', height: '46px', borderRadius: '50%',
                      backgroundColor: 'var(--primary)', color: 'white',
                      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', opacity: (!chatInput.trim() || isBotTyping) ? 0.5 : 1
                    }}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default HelpPage;
