import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, XCircle, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { extractText } from '../services/ocrService';
import { generateExplanation } from '../services/groqService';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface ImageUploadProps {
  onClose: () => void;
  langCode: string;
  autoOpen?: boolean;
}

const UI_STRINGS: Record<string, Record<string, string>> = {
  'hi-IN': {
    readImageTitle: "फ़ोटो पढ़ें",
    scanInstruction: "दस्तावेज़ या तस्वीर स्कैन करें",
    scanningText: "टेक्स्ट स्कैन हो रहा है...",
    analyzingAI: "AI द्वारा विश्लेषण हो रहा है...",
    scanAnother: "दूसरी तस्वीर स्कैन करें",
    fileSelected: "फ़ाइल चुनी गई: "
  },
  'kn-IN': {
    readImageTitle: "ಚಿತ್ರವನ್ನು ಓದಿ",
    scanInstruction: "ದಾಖಲೆ ಅಥವಾ ಚಿತ್ರವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    scanningText: "ಪಠ್ಯವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    analyzingAI: "AI ನೊಂದಿಗೆ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    scanAnother: "ಮತ್ತೊಂದು ಚಿತ್ರವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    fileSelected: "ಆಯ್ಕೆ ಮಾಡಿದ ಫೈಲ್: "
  },
  'en-IN': {
    readImageTitle: "Read Image",
    scanInstruction: "Scan Document or Image",
    scanningText: "Scanning Text...",
    analyzingAI: "Analyzing with AI...",
    scanAnother: "Scan Another Image",
    fileSelected: "File selected: "
  }
};

export default function ImageUpload({ onClose, langCode, autoOpen }: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'analyzing' | 'done' | 'error'>('idle');
  const [resultText, setResultText] = useState<string>('');
  const [isCritical, setIsCritical] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>('');
  
  const { speak, stop } = useSpeechSynthesis();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Automatically trigger file explorer if requested (voice navigation)
  useEffect(() => {
    if (autoOpen && fileInputRef.current) {
      // Small delay to ensure the modal animation has started
      const timer = setTimeout(() => {
        fileInputRef.current?.click();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus('scanning');
    setProgress(0);

    try {
      // 1. Extract Text using OCR
      const text = await extractText(file, (p) => setProgress(Math.round(p * 100)));
      
      if (!text.trim() || text.length < 5) {
        throw new Error('No clear text found in image');
      }

      setStatus('analyzing');

      // 2. Groq AI Explanation
      const explanation = await generateExplanation(text, langCode);
      setResultText(explanation.text);
      setIsCritical(explanation.is_critical);
      setSuggestion(explanation.suggestion);
      setStatus('done');

      // 3. Speak the output
      await speak(explanation.spoken_text, langCode);
      if (explanation.spoken_suggestion) {
        await speak(explanation.spoken_suggestion, langCode);
      }
      
    } catch (err) {
      console.error(err);
      setStatus('error');
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred.';
      setResultText(`Error: ${errorMsg}`);
      await speak('Sorry, there was an error reading the file.', langCode);
    }
  };

  const closeHandler = () => {
    stop();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 200,
        background: 'var(--bg-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5rem 1.5rem',
        overflowY: 'auto'
      }}
    >
      <button 
        onClick={closeHandler}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)'
        }}
      >
        <XCircle size={36} color="var(--primary-dark)" />
      </button>

      <h2 style={{ color: 'var(--primary-dark)', fontSize: '2rem', marginBottom: '2rem' }}>
        {UI_STRINGS[langCode]?.readImageTitle || 'Read Image'}
      </h2>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          style={{
            flex: 1, width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
            border: '2px dashed var(--primary)', borderRadius: '24px', cursor: 'pointer',
            background: 'rgba(101, 155, 185, 0.05)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <Upload size={80} color="var(--primary)" />
          <p style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
            {UI_STRINGS[langCode]?.scanInstruction || 'Scan Document or Image'}
          </p>
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            style={{ display: 'none' }} 
          />
        </div>
      ) : (
        <div style={{ flex: 1, width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
          <AnimatePresence>
            {previewUrl && (
              <div style={{ position: 'relative', width: '100%' }}>
                {image?.type.startsWith('image/') ? (
                  <motion.img 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={previewUrl} 
                    alt="Preview" 
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} 
                  />
                ) : (
                  <div style={{ padding: '2rem', background: 'rgba(101, 155, 185, 0.1)', borderRadius: '16px', color: 'var(--primary)', textAlign: 'center' }}>
                    {UI_STRINGS[langCode]?.fileSelected || 'File selected: '} {image?.name}
                  </div>
                )}
                
                {/* Scanner overlay effect */}
                {status === 'scanning' && (
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '4px',
                      backgroundColor: 'var(--accent-red)',
                      boxShadow: '0 0 10px 2px var(--accent-red)',
                      zIndex: 10,
                      borderRadius: '4px'
                    }}
                  />
                )}
              </div>
            )}
          </AnimatePresence>

          {(status === 'scanning' || status === 'analyzing') && (
            <div style={{
              width: '100%',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--glass-border)'
            }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Loader2 size={64} color="var(--primary)" />
              </motion.div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-dark)', fontSize: '1.5rem' }}>
                  {status === 'scanning' ? (UI_STRINGS[langCode]?.scanningText || 'Extracting Text...') : (UI_STRINGS[langCode]?.analyzingAI || 'Thinking...')}
                </h3>
                {status === 'scanning' && (
                  <div style={{ width: '200px', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', margin: '0 auto' }}>
                    <motion.div style={{ height: '100%', background: 'var(--primary)' }} animate={{ width: `${progress}%` }} />
                  </div>
                )}
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.6 }}>
                  {status === 'scanning' ? 'Reading document content...' : 'Analyzing with AI intelligence...'}
                </p>
              </div>
            </div>
          )}

          {status === 'analyzing' && (
             <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ color: 'var(--primary-dark)', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
               {UI_STRINGS[langCode]?.analyzingAI || 'Analyzing with AI...'}
             </motion.div>
          )}

          {status === 'done' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                padding: '1.5rem', 
                background: isCritical ? '#FEF2F2' : '#E6F4EA', 
                borderRadius: '24px', 
                color: isCritical ? '#991B1B' : '#137333', 
                fontSize: '1.2rem', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                border: isCritical ? '3px solid #EF4444' : '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: isCritical ? '0 10px 25px rgba(239, 68, 68, 0.2)' : 'var(--shadow-sm)'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {isCritical ? (
                  <AlertTriangle size={60} color="#EF4444" />
                ) : (
                  <CheckCircle size={48} color="#137333" />
                )}
              </motion.div>
              
              <div style={{ width: '100%' }}>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.4, margin: '0 0 1rem 0', fontWeight: '600' }}>
                  {resultText}
                </p>
                
                {suggestion && (
                  <div style={{ 
                    background: isCritical ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    padding: '1rem',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    textAlign: 'left',
                    borderLeft: `5px solid ${isCritical ? '#EF4444' : '#10B981'}`
                  }}>
                    <strong style={{ display: 'block', marginBottom: '0.2rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                      {isCritical ? '⚠️ Urgent Action' : '💡 Suggestion'}
                    </strong>
                    {suggestion}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {status === 'error' && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               style={{ color: '#EF4444', fontSize: '1.2rem', textAlign: 'center', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}
             >
               {resultText}
             </motion.div>
          )}

          {(status === 'done' || status === 'error') && (
            <button 
              onClick={() => { setImage(null); setStatus('idle'); setResultText(''); setPreviewUrl(null); }}
              style={{ 
                padding: '1rem 2.5rem', borderRadius: '99px', border: 'none', 
                background: 'var(--primary)', color: 'white', fontSize: '1.2rem', fontWeight: 'bold',
                cursor: 'pointer', boxShadow: 'var(--shadow-md)', marginTop: '1rem' 
              }}
            >
              {UI_STRINGS[langCode]?.scanAnother || 'Scan Another Image'}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
