// ─── Offline-first keyword router ─────────────────────────────────────────────
// Runs BEFORE calling Groq. If a match is found, returns immediately with no
// network request, giving <50ms response time even on offline devices.

export interface LocalCommandResult {
  route: 'form' | 'help' | 'image' | 'home' | 'recharge' | 'send_money' | null;
  response_text: string;
  matched: boolean;
}

// Keyword tables per language — extend as needed
const KEYWORD_MAP: Array<{ patterns: RegExp; route: LocalCommandResult['route']; responses: Record<string, string> }> = [
  {
    patterns: /form|bharna|fill|फॉर्म|ಫಾರ್ಮ್/i,
    route: 'form',
    responses: { 'en-IN':'Opening form filler.', 'hi-IN':'फॉर्म खुल रहा है।', 'kn-IN':'ಫಾರ್ಮ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' }
  },
  {
    patterns: /help|sahay|madad|मदद|सहायता|ಸಹಾಯ|chahiye/i,
    route: 'help',
    responses: { 'en-IN':'Opening help.', 'hi-IN':'मदद मोड खुल रहा है।', 'kn-IN':'ಸಹಾಯ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' }
  },
  {
    patterns: /image|photo|scan|document|tasveer|तस्वीर|ದಸ್ತಾವೇಜು|ಚಿತ್ರ|karo/i,
    route: 'image',
    responses: { 'en-IN':'Opening document scanner.', 'hi-IN':'दस्तावेज़ स्कैनर खुल रहा है।', 'kn-IN':'ದಾಖಲೆ ಸ್ಕ್ಯಾನರ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' }
  },
  {
    patterns: /home|main screen|wapas|वापस|ghar|ಮನೆ|back/i,
    route: 'home',
    responses: { 'en-IN':'Going home.', 'hi-IN':'होम स्क्रीन पर जा रहा हूँ।', 'kn-IN':'ಮನೆಗೆ ಹೋಗಲಾಗುತ್ತಿದೆ.' }
  },
  {
    patterns: /recharge|mobile recharge|रिचार्ज|ರೀಚಾರ್ಜ್/i,
    route: 'recharge',
    responses: { 'en-IN':'Starting recharge.', 'hi-IN':'रिचार्ज शुरू हो रहा है।', 'kn-IN':'ರೀಚಾರ್ಜ್ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ.' }
  },
  {
    patterns: /money|transfer|send|paisa|पैसा|भेजो|ಹಣ/i,
    route: 'send_money',
    responses: { 'en-IN':'Starting money transfer.', 'hi-IN':'पैसे भेजना शुरू हो रहा है।', 'kn-IN':'ಹಣ ಕಳುಹಿಸುವಿಕೆ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ.' }
  },
];

export function matchLocalCommand(text: string, langCode: string): LocalCommandResult {
  for (const entry of KEYWORD_MAP) {
    if (entry.patterns.test(text)) {
      const response_text = entry.responses[langCode] || entry.responses['en-IN'];
      return { route: entry.route, response_text, matched: true };
    }
  }
  return { route: null, response_text: '', matched: false };
}

// Wake word patterns — "Hey Assistant" is primary, BolDo kept as fallback
const WAKE_PATTERNS = [
  /hey[,\s]*assistant/i,
  /hi[,\s]*assistant/i,
  /hello[,\s]*assistant/i,
  /ok[,\s]*assistant/i,
  /okay[,\s]*assistant/i,
  /hey[,\s]*a[,\s]*system/i, // Phonetic variation
  /hey[,\s]*as[,\s]*sister/i, // Phonetic variation
  /hey[,\s]*listen/i,
  /assistant/i,
  /listen/i,
  /hey[,\s]*bold?o/i,
  /hi[,\s]*bold?o/i,
  /boldo/i,
  /bol[,\s]*do/i,
  /bowl[,\s]*do/i,
  /ball[,\s]*do/i,
  /build[,\s]*do/i,
  /bol[,\s]*du/i,
  /बोलदो/i,
  /बोल[,\s]*दो/i,
  /सुनो/i,
  /सुनाओ/i,
];


export function isWakeWord(text: string): boolean {
  return WAKE_PATTERNS.some(p => p.test(text));
}
