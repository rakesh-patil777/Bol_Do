import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Smartphone, Send } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface TaskConfirmProps {
  type: string;
  params: any;
  promptText: string;
  langCode: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TaskConfirm({ type, params, promptText, langCode, onSuccess, onCancel }: TaskConfirmProps) {
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();
  const [phase, setPhase] = useState<'prompting' | 'listening' | 'success' | 'cancelled'>('prompting');

  useEffect(() => {
    let mounted = true;
    const runFlow = async () => {
      // Speak the prompt first
      await speak(promptText, langCode);
      if (mounted) {
        setPhase('listening');
        resetTranscript();
        startListening(langCode);
      }
    };
    runFlow();
    
    return () => {
      mounted = false;
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === 'listening' && transcript && !isListening) {
      // Analyze yes/no
      const lower = transcript.toLowerCase();
      const yesWords = ['yes', 'haan', 'ha', 's', 'aama', 'avunu', 'howdu', 'confirm', 'correct', 'right', 'ok', 'okay'];
      const noWords = ['no', 'nahi', 'illa', 'vaddu', 'beda', 'cancel', 'stop', 'wrong', 'incorrect'];
      
      const isYes = yesWords.some(w => lower.includes(w));
      const isNo = noWords.some(w => lower.includes(w));

      if (isYes) {
        setPhase('success');
        speak('Action confirmed successfully. Thank you.', langCode).then(() => {
            onSuccess();
        });
      } else if (isNo) {
        setPhase('cancelled');
        speak('Action cancelled.', langCode).then(() => {
            onCancel();
        });
      } else {
        // Didn't understand, ask again
        speak('Sorry, please say yes or no.', langCode).then(() => {
           resetTranscript();
           startListening(langCode);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, isListening, phase, langCode]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-panel"
      style={{
        padding: '2.5rem',
        maxWidth: '90%',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        background: 'var(--bg-color)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 100
      }}
    >
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(101, 155, 185, 0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {type === 'Recharge' && <Smartphone size={40} color="var(--primary)" />}
        {type === 'Send Money' && <Send size={40} color="var(--primary)" />}
      </div>
      
      <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--primary-dark)', fontWeight: 'bold' }}>{type}</h2>
      
      <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.5)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        {Object.entries(params).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1.1rem', borderBottom: '1px dashed rgba(101, 155, 185, 0.2)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}</span>
            <span style={{ fontWeight: '600', color: 'var(--text-main)', textAlign: 'right' }}>{String(v)}</span>
          </div>
        ))}
      </div>

      <div style={{ height: '40px', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-dark)', textAlign: 'center' }}>
        {phase === 'prompting' && 'Listening to details...'}
        {phase === 'listening' && (
           <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
             Please say "Yes" or "No"
           </motion.div>
        )}
        {phase === 'success' && (
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <CheckCircle size={32} /> 
             <span>{type === 'Send Money' ? 'Transfer Successful!' : 'Recharge Successful!'}</span>
           </motion.div>
        )}
        {phase === 'cancelled' && (
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <XCircle size={32} /> Cancelled
           </motion.div>
        )}
      </div>
      
      {phase === 'listening' && (
         <div style={{
           marginTop: '1rem',
           padding: '0.5rem 1rem',
           background: 'var(--primary-light)',
           color: 'var(--dark)',
           borderRadius: '99px',
           fontSize: '0.9rem',
           fontWeight: '600'
         }}>
           Listening...
         </div>
      )}
    </motion.div>
  );
}
