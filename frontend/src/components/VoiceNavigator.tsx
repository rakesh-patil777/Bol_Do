// Global AudioContext Singleton for navigator
let globalNavAudioCtx: AudioContext | null = null;
function playBeep() {
  try {
    if (!globalNavAudioCtx) {
      globalNavAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = globalNavAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (_) {}
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, Radio } from 'lucide-react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { detectNavigationIntent } from '../services/groqService';
import { matchLocalCommand, isWakeWord } from '../services/localCommandService';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Phase = 'watching' | 'activated' | 'processing' | 'speaking';

interface VoiceNavigatorProps {
  langCode?: string;
  onNavigateImage?: () => void;
  onNavigateForm?: (params?: any) => void;
  onNavigateHelp?: () => void;
  onTriggerRecharge?: (text: string) => void;
  onTriggerSendMoney?: (text: string) => void;
  disabled?: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────
const VoiceNavigator: React.FC<VoiceNavigatorProps> = ({
  langCode = 'hi-IN',
  onNavigateImage,
  onNavigateForm,
  onNavigateHelp,
  onTriggerRecharge,
  onTriggerSendMoney,
  disabled = false,
}) => {
  const navigate  = useNavigate();
  const { speak } = useSpeechSynthesis();

  const [phase, setPhase]           = useState<Phase>('watching');
  const [feedbackText, setFeedbackText] = useState('');
  const [tooltip, setTooltip]       = useState(false);

  // ── Refs ────────────────────────────────────────────────────────────────────
  const phaseRef    = useRef<Phase>('watching');
  const recogRef    = useRef<any>(null);
  const restartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deadTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef      = useRef(langCode);

  // Keep refs in sync
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { langRef.current = langCode; }, [langCode]);

  // ── Route helper ────────────────────────────────────────────────────────────
  const executeRoute = useCallback(async (route: string | null, response: string, spokenText: string, originalText: string) => {
    setFeedbackText(response);
    setPhase('speaking');
    phaseRef.current = 'speaking';
    
    // Play the voice response
    await speak(spokenText || response, 'en-IN');

    switch (route) {
      case 'form':       onNavigateForm   ? onNavigateForm(originalText)   : navigate('/app'); break;
      case 'help':       onNavigateHelp   ? onNavigateHelp()              : navigate('/app'); break;
      case 'image':      onNavigateImage  ? onNavigateImage()             : navigate('/app'); break;
      case 'home':       navigate('/app'); break;
      case 'recharge':   onTriggerRecharge   ? onTriggerRecharge(originalText)   : navigate('/app'); break;
      case 'send_money': onTriggerSendMoney  ? onTriggerSendMoney(originalText)  : navigate('/app'); break;
      default: break;
    }

    setTimeout(() => {
      setFeedbackText('');
      setPhase('watching');
      phaseRef.current = 'watching';
      scheduleRestart(600);
    }, 1800);
  }, [navigate, speak, onNavigateForm, onNavigateHelp, onNavigateImage, onTriggerRecharge, onTriggerSendMoney]);

  // ── Process spoken command ──────────────────────────────────────────────────
  const handleCommand = useCallback(async (text: string) => {
    setPhase('processing');
    phaseRef.current = 'processing';
    setFeedbackText('...');

    // 1) Offline local match (instant)
    const local = matchLocalCommand(text, langRef.current);
    if (local.matched) {
      await executeRoute(local.route, local.response_text, local.response_text, text);
      return;
    }

    // 2) Groq fallback
    try {
      const { route, response_text, spoken_text } = await detectNavigationIntent(text);
      await executeRoute(route, response_text, spoken_text, text);
    } catch {
      await executeRoute(null, 'Sorry, please try again.', 'Sorry, please try again.', text);
    }
  }, [executeRoute]);

  // ── Core: create & start one SpeechRecognition instance ─────────────────────
  const startListening = useCallback((expectCommand: boolean) => {
    if (restartTimer.current) clearTimeout(restartTimer.current);
    if (deadTimer.current)    clearTimeout(deadTimer.current);

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    try { recogRef.current?.stop(); } catch (_) {}

    const recog = new SR();
    // Use continuous for watching to avoid constant restarts
    recog.continuous      = !expectCommand; 
    recog.interimResults  = true; 
    recog.lang            = langRef.current; // Use dynamic language for better phonetic matching

    console.log(`[Voice] Starting SR: ${expectCommand ? 'COMMAND' : 'WAKE'} mode (${recog.lang})`);

    recog.onresult = (e: any) => {
      if (expectCommand) {
        const lastIndex = e.results.length - 1;
        const result = e.results[lastIndex];
        const transcript = result[0].transcript;
        setFeedbackText(transcript);
        if (result.isFinal) {
          console.log('[Voice] Command captured:', transcript);
          handleCommand(transcript);
        }
      } else {
        // Wake-word mode: Check the full accumulated transcript across segments
        let fullTranscript = '';
        for (let i = 0; i < e.results.length; i++) {
          fullTranscript += e.results[i][0].transcript + ' ';
        }
        
        if (isWakeWord(fullTranscript)) {
          console.log('[Voice] Wake word detected in:', fullTranscript);
          // Briefly stop to switch modes
          try { recog.abort(); } catch(_) {}
          activateSession();
        }
      }
    };

    recog.onerror = (e: any) => {
      if (e.error === 'aborted' || e.error === 'no-speech') {
        if (phaseRef.current === 'watching') scheduleRestart(100);
        return;
      }
      console.error('[Voice] SR Error:', e.error);
      if (phaseRef.current === 'watching') scheduleRestart(1000);
    };

    recog.onend = () => {
      if (phaseRef.current === 'watching') scheduleRestart(100);
    };

    recogRef.current = recog;
    try { 
      recog.start(); 
      // Heartbeat to keep it alive
      if (deadTimer.current) clearTimeout(deadTimer.current);
      deadTimer.current = setTimeout(() => {
        if (phaseRef.current === 'watching' && !disabled) {
          console.log('[Voice] Heartbeat restart');
          startListening(false);
        }
      }, 15000); // 15s heartbeat
    } catch (err) {
      console.error('[Voice] Failed to start SR:', err);
      scheduleRestart(2000);
    }
  }, [handleCommand]); // eslint-disable-line

  const scheduleRestart = (delayMs: number) => {
    if (restartTimer.current) clearTimeout(restartTimer.current);
    restartTimer.current = setTimeout(() => {
      if (phaseRef.current === 'watching') startListening(false);
    }, delayMs);
  };

  // ── Activate: switch from wake-mode to command-mode ─────────────────────────
  const activateSession = useCallback(() => {
    if (phaseRef.current !== 'watching') return;

    // Stop current recognizer immediately
    try { 
      if (recogRef.current) {
        recogRef.current.onend = null; // Prevent restart loops
        recogRef.current.stop(); 
      }
    } catch (_) {}
    
    if (restartTimer.current) clearTimeout(restartTimer.current);

    setPhase('activated');
    phaseRef.current = 'activated';
    setFeedbackText('Listening…');

    // Instant audio cue
    playBeep();

    // Start command listener after tiny gap (much faster now)
    setTimeout(() => startListening(true), 150);
  }, [startListening]);

  // ── Bootstrap on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    if (disabled) {
      try { recogRef.current?.abort(); } catch (_) {}
      if (restartTimer.current) clearTimeout(restartTimer.current);
      setPhase('watching');
      phaseRef.current = 'watching';
      return;
    }

    scheduleRestart(800); // small delay to let page settle
    return () => {
      if (restartTimer.current) clearTimeout(restartTimer.current);
      if (deadTimer.current)    clearTimeout(deadTimer.current);
      try { recogRef.current?.abort(); } catch (_) {}
      window.speechSynthesis.cancel();
    };
  }, [disabled]); // eslint-disable-line

  // ── Manual tap ──────────────────────────────────────────────────────────────
  const handleManualTap = () => {
    if (phase === 'watching') {
      activateSession();
    } else if (phase === 'activated') {
      // Cancel
      try { recogRef.current?.abort(); } catch (_) {}
      setFeedbackText('');
      setPhase('watching');
      phaseRef.current = 'watching';
      scheduleRestart(600);
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────────────
  const isWatching   = phase === 'watching';
  const isActivated  = phase === 'activated';
  const isProcessing = phase === 'processing';
  const isSpeaking   = phase === 'speaking';

  const btnColor = isActivated
    ? '#F59E0B'
    : isProcessing || isSpeaking
    ? '#8aafcc'
    : 'var(--primary, #659bb9)';

  if (disabled) return null;

  return (
    <>
      {/* Feedback pill */}
      <AnimatePresence>
        {feedbackText && !isActivated && (
          <motion.div key="pill"
            initial={{ opacity:0, y:14, scale:0.94 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:8 }}
            style={{ position:'fixed', bottom:'112px', left:'50%', transform:'translateX(-50%)', zIndex:9999,
              background:'rgba(22,22,32,0.91)', backdropFilter:'blur(12px)', color:'white',
              padding:'0.6rem 1.35rem', borderRadius:'99px', fontSize:'0.88rem', fontWeight:500,
              maxWidth:'290px', textAlign:'center', boxShadow:'0 6px 24px rgba(0,0,0,0.2)',
              pointerEvents:'none', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
            {feedbackText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listening banner */}
      <AnimatePresence>
        {isActivated && (
          <motion.div key="banner"
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
            style={{ position:'fixed', bottom:'112px', left:'50%', transform:'translateX(-50%)', zIndex:9999,
              background:'rgba(245,158,11,0.93)', backdropFilter:'blur(10px)', color:'white',
              padding:'0.6rem 1.35rem', borderRadius:'99px', fontSize:'0.88rem', fontWeight:700,
              display:'flex', alignItems:'center', gap:'0.45rem',
              boxShadow:'0 6px 24px rgba(245,158,11,0.35)', pointerEvents:'none' }}>
            <motion.span animate={{ opacity:[1,0.2,1] }} transition={{ repeat:Infinity, duration:1 }}>●</motion.span>
            Speak your command…
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div style={{ position:'absolute', bottom:'24px', right:'24px', zIndex:9998 }}
        onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && isWatching && (
            <motion.div initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
              style={{ position:'absolute', right:'64px', top:'50%', transform:'translateY(-50%)',
                background:'rgba(22,22,32,0.88)', color:'white', padding:'0.35rem 0.75rem',
                borderRadius:'8px', fontSize:'0.77rem', whiteSpace:'nowrap', pointerEvents:'none' }}>
              Say "Hey Assistant" or tap
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse rings */}
        <AnimatePresence>
          {isActivated && (
            <>
              <motion.div key="r1" initial={{ scale:1, opacity:0.5 }} animate={{ scale:2.5, opacity:0 }}
                transition={{ repeat:Infinity, duration:1.4, ease:'easeOut' }}
                style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#F59E0B' }} />
              <motion.div key="r2" initial={{ scale:1, opacity:0.3 }} animate={{ scale:1.75, opacity:0 }}
                transition={{ repeat:Infinity, duration:1.4, ease:'easeOut', delay:0.35 }}
                style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#F59E0B' }} />
            </>
          )}
        </AnimatePresence>

        {/* Idle breathing ring — shows wake listener is active */}
        {isWatching && (
          <motion.div animate={{ opacity:[0.12, 0.3, 0.12] }} transition={{ repeat:Infinity, duration:2.8 }}
            style={{ position:'absolute', inset:'-5px', borderRadius:'50%', background:'var(--primary)', pointerEvents:'none' }} />
        )}

        <motion.button whileHover={{ scale:1.09 }} whileTap={{ scale:0.91 }}
          onClick={handleManualTap}
          disabled={isProcessing || isSpeaking}
          style={{ position:'relative', width:'54px', height:'54px', borderRadius:'50%',
            backgroundColor: btnColor, border:'none', display:'flex', alignItems:'center', justifyContent:'center',
            cursor: isProcessing || isSpeaking ? 'not-allowed' : 'pointer',
            boxShadow: isActivated ? '0 0 0 3px rgba(245,158,11,0.4), 0 8px 22px rgba(245,158,11,0.3)' : '0 4px 18px rgba(101,155,185,0.45)',
            transition:'background-color 0.2s, box-shadow 0.2s' }}
          aria-label="Voice Navigation"
        >
          {isProcessing ? (
            <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:0.85, ease:'linear' }}>
              <Loader2 size={22} color="white" />
            </motion.div>
          ) : isSpeaking ? (
            <Radio size={22} color="white" />
          ) : isActivated ? (
            <motion.div animate={{ scale:[1,1.18,1] }} transition={{ repeat:Infinity, duration:1.1 }}>
              <Mic size={22} color="white" />
            </motion.div>
          ) : (
            <Mic size={20} color="white" />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default VoiceNavigator;
