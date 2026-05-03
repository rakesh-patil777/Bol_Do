import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Mic, CheckCircle2, Upload, FileDown, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { extractText } from '../services/ocrService';
import { extractFormFields } from '../services/groqService';
import jsPDF from 'jspdf';

interface FormFillerProps {
  onClose: () => void;
  langCode?: string;
  onMicStatusChange?: (active: boolean) => void;
}

const UI_STRINGS: Record<string, any> = {
  'en-IN': { title:"Voice Form", uploadPrompt:"Upload a form to begin", uploadDesc:"Upload any form image or PDF and I'll fill it using your voice.", uploadBtn:"Select File", demoBtn:"Demo Mode", analyzing:"Reading the form...", tapToSpeak:"Tap mic & speak your answer", listening:"Listening...", speaking:"Speaking...", complete:"Form Complete!", successMsg:"Form filled successfully!", downloadPdf:"Download PDF", downloadTxt:"Download Text", prompts:{ complete:"Thank you! Your form is complete. Download it below." } },
  'hi-IN': { title:"वॉयस फॉर्म", uploadPrompt:"फॉर्म अपलोड करें", uploadDesc:"कोई भी फॉर्म की इमेज या PDF अपलोड करें, मैं आवाज़ से भरूँगा।", uploadBtn:"फ़ाइल चुनें", demoBtn:"डेमो मोड", analyzing:"फॉर्म पढ़ रहा हूँ...", tapToSpeak:"माइक दबाकर बोलें", listening:"सुन रहा हूँ...", speaking:"बोल रहा हूँ...", complete:"फॉर्म पूरा!", successMsg:"फॉर्म सफलतापूर्वक भर गया!", downloadPdf:"PDF डाउनलोड", downloadTxt:"टेक्स्ट डाउनलोड", prompts:{ complete:"धन्यवाद! फॉर्म पूरा हो गया। नीचे डाउनलोड करें।" } },
  'kn-IN': { title:"ಧ್ವನಿ ಫಾರ್ಮ್", uploadPrompt:"ಫಾರ್ಮ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", uploadDesc:"ಯಾವುದೇ ಫಾರ್ಮ್ ಚಿತ್ರ ಅಥವಾ PDF ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.", uploadBtn:"ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ", demoBtn:"ಡೆಮೋ", analyzing:"ಫಾರ್ಮ್ ಓದಲಾಗುತ್ತಿದೆ...", tapToSpeak:"ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ", listening:"ಆಲಿಸಲಾಗುತ್ತಿದೆ...", speaking:"ಮಾತನಾಡುತ್ತಿದೆ...", complete:"ಫಾರ್ಮ್ ಪೂರ್ಣ!", successMsg:"ಫಾರ್ಮ್ ಭರ್ತಿಯಾಗಿದೆ!", downloadPdf:"PDF ಡೌನ್‌ಲೋಡ್", downloadTxt:"ಪಠ್ಯ ಡೌನ್‌ಲೋಡ್", prompts:{ complete:"ಧಧನ್ಯವಾದ! ಫಾರ್ಮ್ ಪೂರ್ಣಗೊಂಡಿದೆ." } }
};

const DEMO_FIELDS: Record<string, string[]> = {
  'en-IN': ['Full Name', 'Age', 'Phone Number', 'Address', 'Occupation'],
  'hi-IN': ['पूरा नाम', 'आयु', 'फ़ोन नंबर', 'पता', 'व्यवसाय'],
  'kn-IN': ['ಪೂರ್ಣ ಹೆಸರು', 'ವಯಸ್ಸು', 'ಫೋನ್ ಸಂಖ್ಯೆ', 'ವಿಳಾಸ', 'ವೃತ್ತಿ'],
};
const DEFAULT_DEMO = DEMO_FIELDS['en-IN'];

function buildQuestion(fieldName: string, langCode: string): string {
  const prefixes: Record<string, string> = {
    'en-IN': `What is your ${fieldName}?`,
    'hi-IN': `आपका ${fieldName} क्या है?`,
    'kn-IN': `ನಿಮ್ಮ ${fieldName} ಏನು?`,
  };
  return prefixes[langCode] || `What is your ${fieldName}?`;
}

function cleanValue(text: string, fieldName: string): string {
  let cleaned = text.trim();
  const fLow = fieldName.toLowerCase();
  if (fLow.includes('email') || fLow.includes('mail')) {
    cleaned = cleaned.toLowerCase().replace(/\s+at\s+the\s+rate\s+/gi, '@').replace(/\s+at\s+the\s+rate/gi, '@').replace(/\s+at\s+/gi, '@').replace(/\s+dot\s+/gi, '.').replace(/\s+/g, '');
  }
  if (fLow.includes('date') || fLow.includes('dob')) {
    const months: Record<string, string> = { january:'01', february:'02', march:'03', april:'04', may:'05', june:'06', july:'07', august:'08', september:'09', october:'10', november:'11', december:'12', jan:'01', feb:'02', mar:'03', apr:'04', jun:'06', jul:'07', aug:'08', sep:'09', oct:'10', nov:'11', dec:'12' };
    Object.keys(months).forEach(m => { cleaned = cleaned.replace(new RegExp(`\\b${m}\\b`, 'gi'), months[m]); });
    cleaned = cleaned.replace(/\s+of\s+/gi, ' ').replace(/\s+the\s+/gi, ' ').replace(/(\d+)(st|nd|rd|th)/gi, '$1').replace(/\s+/g, '-');
  }
  return cleaned;
}

const FieldRow = ({ label, value, isActive, isDone, transcript }: { label:string; value:string; isActive:boolean; isDone:boolean; transcript?: string }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'0.2rem' }}>
    <label style={{ fontSize:'0.8rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--primary)' : isDone ? '#059669' : 'var(--text-main)', opacity: isActive || isDone ? 1 : 0.55 }}> {isDone && !isActive ? '✓ ' : ''}{label} </label>
    <div style={{ padding:'0.65rem 0.9rem', borderRadius:'10px', background: isActive ? 'rgba(101,155,185,0.05)' : isDone ? 'rgba(16,185,129,0.04)' : '#F9FAFB', border: isActive ? '2px solid var(--primary)' : isDone ? '2px solid rgba(16,185,129,0.4)' : '2px solid #E5E7EB', color: value || transcript ? 'var(--text-main)' : 'rgba(0,0,0,0.28)', minHeight:'22px', fontSize:'0.95rem' }}>
      {value || transcript || (isActive ? '…' : '')}
    </div>
  </div>
);

// Global AudioContext Singleton to avoid hitting browser limits
let globalAudioCtx: AudioContext | null = null;
function playBeep() {
  try {
    if (!globalAudioCtx) {
      globalAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = globalAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  } catch(_) {}
}

export default function FormFiller({ onClose, langCode = 'en-IN', onMicStatusChange }: FormFillerProps) {
  const t = UI_STRINGS[langCode] || UI_STRINGS['en-IN'];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<'upload' | 'analyzing' | 'filling' | 'complete'>('upload');
  const [fields, setFields] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const fieldsRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const [listeningUI, setListeningUI] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const transcriptRef = useRef('');
  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  const [currentIdx, setCurrentIdx] = useState(0);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // ── Auto-Scroll Logic ──
  useEffect(() => {
    if (status === 'filling') {
      const activeElement = document.getElementById(`field-${currentIdx}`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentIdx, status]);

  // ── Handlers Ref to avoid stale closures ──
  const saveAnswerRef = useRef<(text: string, idx: number) => void>(() => {});

  // ── Core: Voice Capture ───────────────────────────────────────────────────
  const startVoiceCapture = useCallback((targetIdx: number) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch(_) {}
    }

    // Pre-emptively disable navigation assistant to prevent hardware conflict
    onMicStatusChange?.(true);

    const recog = new SR();
    recog.continuous = false;
    recog.interimResults = true;
    recog.lang = langCode;
    let isCaptured = false;

    recog.onstart = () => {
      console.log('[FormFiller] Recognition started');
      setListeningUI(true);
      isListeningRef.current = true;
      setMicError(null);
      setTranscript('');
      playBeep();
    };

    recog.onresult = (e: any) => {
      let currentT = '';
      let isFinal = false;
      for (let i = 0; i < e.results.length; i++) {
        currentT += e.results[i][0].transcript;
        if (e.results[i].isFinal) isFinal = true;
      }
      setTranscript(currentT);
      if (isFinal && currentT.trim() && !isCaptured) {
        isCaptured = true;
        saveAnswerRef.current(currentT, targetIdx);
        try { recog.stop(); } catch(_) {}
      }
    };

    recog.onend = () => {
      setListeningUI(false);
      isListeningRef.current = false;
      onMicStatusChange?.(false); // Re-enable assistant
      // Fallback: if we have a transcript but it didn't mark as "final" yet
      if (!isCaptured && transcriptRef.current.trim()) {
        isCaptured = true;
        saveAnswerRef.current(transcriptRef.current, targetIdx);
      }
      setTranscript('');
    };

    recog.onerror = (err: any) => {
      console.error('[FormFiller] Mic error:', err.error);
      setMicError(err.error || 'unknown');
      setListeningUI(false);
      isListeningRef.current = false;
      onMicStatusChange?.(false); // Re-enable assistant on error
    };

    recognitionRef.current = recog;
    
    // Give the OS 300ms to truly release the mic from the assistant before we grab it
    setTimeout(() => {
      try { 
        recog.start(); 
      } catch(err: any) { 
        console.error('[FormFiller] Failed to start:', err);
        setMicError('Failed to start');
        setListeningUI(false);
        onMicStatusChange?.(false);
      }
    }, 300);
  }, [langCode, onMicStatusChange]);

  // ── Flow Actions ──────────────────────────────────────────────────────────
  const askAndListen = useCallback(async (idx: number, allFields: string[]) => {
    if (idx >= allFields.length) return;
    setCurrentIdx(idx);
    currentIndexRef.current = idx;
    const q = buildQuestion(allFields[idx], langCode);
    
    // Stop any existing speech before asking
    window.speechSynthesis.cancel();
    
    await speak(q, langCode);
    
    // Longer delay to ensure speech hardware is fully released
    setTimeout(() => {
      if (currentIndexRef.current === idx) {
        startVoiceCapture(idx);
      }
    }, 1200);
  }, [langCode, speak, startVoiceCapture]);

  // saveAnswer logic moved to saveAnswerRef to avoid stale closures
  useEffect(() => {
    saveAnswerRef.current = (text: string, idx: number) => {
      const allFields = fieldsRef.current;
      const fieldName = allFields[idx];
      if (!fieldName) return;

      const cleaned = cleanValue(text, fieldName);
      setFormData(prev => ({ ...prev, [fieldName]: cleaned }));

      const next = idx + 1;
      currentIndexRef.current = next;
      setCurrentIdx(next);

      if (next < allFields.length) {
        setTimeout(() => askAndListen(next, allFields), 800);
      } else {
        setStatus('complete');
        speak(t.prompts.complete, langCode);
      }
    };
  }, [langCode, speak, t, askAndListen]);

  const startFilling = useCallback(async (detectedFields: string[]) => {
    fieldsRef.current = detectedFields;
    setFields(detectedFields);
    setFormData({});
    setCurrentIdx(0);
    currentIndexRef.current = 0;
    setStatus('filling');
    setTimeout(() => askAndListen(0, detectedFields), 500);
  }, [askAndListen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setOriginalImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
    setStatus('analyzing');
    speak(t.analyzing, langCode); 
    try {
      const text = await extractText(file);
      const detected = await extractFormFields(text, langCode);
      const validFields = Array.isArray(detected) && detected.length > 0 ? detected : DEFAULT_DEMO;
      window.speechSynthesis.cancel();
      startFilling(validFields);
    } catch {
      window.speechSynthesis.cancel();
      startFilling(DEFAULT_DEMO);
    }
  };

  const startDemo = () => startFilling(DEFAULT_DEMO);

  const toggleMic = () => {
    if (isListeningRef.current) {
      try { recognitionRef.current?.stop(); } catch (_) {}
      setListeningUI(false);
      isListeningRef.current = false;
    } else {
      startVoiceCapture(currentIdx);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18); doc.setFont('helvetica', 'bold'); doc.text('Filled Form', 20, 20); doc.setFontSize(11);
    let y = 36;
    fields.forEach(field => {
      doc.setFont('helvetica', 'bold'); doc.text(`${field}:`, 20, y);
      doc.setFont('helvetica', 'normal');
      const val = formData[field] || '—';
      const lines = doc.splitTextToSize(val, 140); doc.text(lines, 75, y);
      y += lines.length * 7 + 5;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    doc.save('filled_form.pdf');
  };

  const generateTxt = () => {
    let c = 'FILLED FORM\n' + '─'.repeat(30) + '\n\n';
    fields.forEach(f => { c += `${f}: ${formData[f] || '—'}\n`; });
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([c], { type: 'text/plain' }));
    a.download = 'filled_form.txt'; a.click();
  };

  return (
    <div style={{ position:'absolute', inset:0, background:'var(--bg-color)', zIndex:200, display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(101,155,185,0.12)' }}>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--primary-dark)', display:'flex', padding:'0.4rem' }}>
            <ArrowLeft size={22} />
          </button>
          <h2 style={{ margin:'0 0 0 0.75rem', color:'var(--primary-dark)', fontSize:'1.2rem', fontWeight:700 }}>{t.title}</h2>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          <AnimatePresence mode="wait">
            {status === 'upload' && (
              <motion.div key="upload" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem', padding:'2.5rem 1.25rem', background:'white', borderRadius:'24px', boxShadow:'0 8px 32px rgba(101,155,185,0.1)', textAlign:'center' }}>
                <div style={{ padding:'1.25rem', background:'rgba(101,155,185,0.1)', borderRadius:'50%' }}> <FileDown size={44} color="var(--primary)" /> </div>
                <div>
                  <h3 style={{ margin:'0 0 0.5rem', color:'var(--primary-dark)', fontSize:'1.1rem' }}>{t.uploadPrompt}</h3>
                  <p style={{ margin:0, color:'var(--text-main)', opacity:0.65, fontSize:'0.875rem', lineHeight:1.6 }}>{t.uploadDesc}</p>
                </div>
                <input type="file" accept="image/*,.pdf" style={{ display:'none' }} ref={fileInputRef} onChange={handleFileUpload} />
                <button onClick={() => fileInputRef.current?.click()} style={{ padding:'0.9rem 2rem', background:'var(--primary)', color:'white', border:'none', borderRadius:'99px', fontSize:'1rem', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'0.5rem', boxShadow:'0 4px 14px rgba(101,155,185,0.35)' }}>
                  <Upload size={18} /> {t.uploadBtn}
                </button>
                <button onClick={startDemo} style={{ padding:'0.7rem 1.5rem', background:'rgba(245,158,11,0.1)', color:'#92400E', border:'1.5px solid rgba(245,158,11,0.4)', borderRadius:'99px', fontSize:'0.875rem', fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                  <Zap size={14} /> {t.demoBtn}
                </button>
              </motion.div>
            )}
            {status === 'analyzing' && (
              <motion.div key="analyzing" initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem', padding:'4rem 2rem', textAlign:'center' }}>
                <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1.2, ease:'linear' }}> <Loader2 size={46} color="var(--primary)" /> </motion.div>
                <p style={{ color:'var(--primary-dark)', fontWeight:600, fontSize:'1.1rem', margin:0 }}>{t.analyzing}</p>
              </motion.div>
            )}
            {(status === 'filling' || status === 'complete') && (
              <motion.div key="filling" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                {originalImage && ( <div style={{ borderRadius:'14px', overflow:'hidden', maxHeight:'100px', border:'1px solid rgba(0,0,0,0.08)' }}> <img src={originalImage} alt="Form" style={{ width:'100%', objectFit:'cover', opacity:0.45 }} /> </div> )}
                <div style={{ padding:'1.25rem', background:'white', borderRadius:'20px', boxShadow:'0 6px 24px rgba(101,155,185,0.1)', display:'flex', flexDirection:'column', gap:'1rem' }}>
                  {fields.map((field, idx) => {
                    const isActive = status === 'filling' && idx === currentIdx;
                    return (
                      <div id={`field-${idx}`} key={idx}>
                        <FieldRow label={field} value={formData[field]} isActive={isActive} transcript={isActive ? transcript : ''} isDone={!!formData[field]} />
                      </div>
                    );
                  })}
                </div>
                {status === 'complete' && (
                  <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', justifyContent:'center', color:'#059669', background:'rgba(16,185,129,0.1)', padding:'0.875rem', borderRadius:'14px', fontWeight:700 }}> <CheckCircle2 size={22} /> {t.successMsg} </div>
                    <button onClick={generatePDF} style={{ padding:'0.9rem', background:'var(--primary-dark)', color:'white', border:'none', borderRadius:'12px', fontSize:'0.95rem', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}> <FileDown size={18} /> {t.downloadPdf} </button>
                    <button onClick={generateTxt} style={{ padding:'0.9rem', background:'transparent', color:'var(--primary-dark)', border:'2px solid var(--primary-dark)', borderRadius:'12px', fontSize:'0.95rem', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}> <FileDown size={18} /> {t.downloadTxt} </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {status === 'filling' && (
            <motion.div initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }} style={{ padding:'1.5rem 2rem 2rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', background:'linear-gradient(to top, rgba(255,252,239,1) 60%, transparent)' }}>
              <p style={{ margin:0, fontSize:'0.95rem', fontWeight:600, color: micError ? '#EF4444' : listeningUI ? '#D97706' : isSpeaking ? 'var(--primary)' : 'var(--text-main)', opacity: micError || listeningUI || isSpeaking ? 1 : 0.55 }}>
                {micError ? `Mic Error: ${micError}` : listeningUI ? t.listening : isSpeaking ? t.speaking : t.tapToSpeak}
              </p>
              {transcript && ( <p style={{ margin:0, fontSize:'0.875rem', color:'var(--text-main)', opacity:0.7, fontStyle:'italic' }}>"{transcript}"</p> )}
              <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
                <motion.button whileHover={{ scale:1.06 }} whileTap={{ scale:0.93 }} onClick={toggleMic}
                  style={{ width:'76px', height:'76px', borderRadius:'50%', backgroundColor: listeningUI ? '#F59E0B' : 'var(--primary)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', boxShadow: listeningUI ? '0 0 28px rgba(245,158,11,0.45)' : '0 8px 24px rgba(101,155,185,0.3)', cursor:'pointer' }}>
                  {listeningUI
                    ? <motion.div animate={{ scale:[1,1.18,1] }} transition={{ repeat:Infinity, duration:1.4 }}><Mic size={34} color="white" /></motion.div>
                    : <Mic size={34} color="white" />}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
