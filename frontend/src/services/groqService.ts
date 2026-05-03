// @ts-ignore
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = `https://api.groq.com/openai/v1/chat/completions`;

const REVERSE_LANG_MAP: Record<string, string> = {
  'hi-IN': 'hindi',
  'kn-IN': 'kannada',
  'en-IN': 'english'
};

export async function detectIntent(text: string, forceHelp: boolean = false, userLangCode: string = 'hi-IN') {
  const expectedLang = REVERSE_LANG_MAP[userLangCode] || 'hindi';
  
  if (!GROQ_API_KEY) {
    console.warn('VITE_GROQ_API_KEY is not set. Returning mock intent.');
    return { 
      intent: forceHelp ? 'help' : 'unknown', 
      language: expectedLang,
      params: {},
      response_text: forceHelp ? "यह मदद है।" : "API Key नहीं है।" 
    };
  }

  const systemPrompt = forceHelp 
    ? `You are BolDo, a friendly voice AI assistant for Indian users.  
Analyze the user's speech and answer their question clearly.
The user's language is: ${expectedLang.toUpperCase()}.
You MUST respond in ${expectedLang.toUpperCase()} script for response_text and transliterated (Latin script) for spoken_text.
Respond ONLY with a JSON object:  
{  
  "intent": "help",  
  "language": "${expectedLang}",  
  "params": {},  
  "response_text": "<Your helpful answer in NATIVE SCRIPT. Max 2 sentences.>",
  "spoken_text": "<The transliterated answer in English alphabet.>"
}  
CRITICAL: If the user asks about you, say you are "BolDo, your voice assistant."`
    : `You are BolDo, a smart and helpful voice assistant. Analyze the user's speech and return ONLY a JSON object.
The user's language is: ${expectedLang.toUpperCase()}.
{  
  "intent": "<recharge | send_money | general | unknown>",  
  "language": "${expectedLang}",  
  "params": { <number, amount, operator> },  
  "response_text": "<Answer or confirmation in NATIVE SCRIPT. Max 2 sentences.>",
  "spoken_text": "<Answer or confirmation transliterated into English/Latin script.>"
}  
Intent Rules:
- "recharge" -> user wants mobile top-up/recharge.
- "send_money" -> user wants to transfer/send money/paisa.
- "general" -> user asks a general question (e.g., "Who is the PM?", "What is 2+2?", "How are you?"). You MUST ANSWER the question directly and concisely in the response fields.
- "unknown" -> completely unintelligible noise.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        temperature: 0.2,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON safely
    try {
      const cleanContent = content.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanContent);
      return {
        intent: parsed.intent || 'unknown',
        language: parsed.language || 'hindi',
        params: parsed.params || {},
        response_text: parsed.response_text || 'Sorry, I did not understand.',
        spoken_text: parsed.spoken_text || parsed.response_text || 'Sorry, I did not understand.'
      };
    } catch (parseError) {
      console.error('Error parsing GROQ JSON response:', parseError);
      return {
        intent: 'unknown',
        language: 'hindi',
        params: {},
        response_text: 'There was an error understanding your request.'
      };
    }
  } catch (error) {
    console.error('Error detecting intent with GROQ. USING DEMO FALLBACK:', error);
    
    // Fast Response Simulation for Demo
    const lowerText = text.toLowerCase();
    
    // Hindi/English Recharge Fallback
    if (lowerText.includes('रिचार्ज') || lowerText.includes('recharge') || lowerText.includes('jio')) {
      return {
        intent: "recharge",
        language: lowerText.includes('रिचार्ज') ? "hindi" : "english",
        params: { number: "9876543210", operator: "Jio", amount: "299" },
        response_text: lowerText.includes('रिचार्ज') 
          ? "क्या आप जिओ नंबर 9876543210 पर 299 का रिचार्ज करना चाहते हैं?" 
          : "Do you want to recharge Jio number 9876543210 with 299?"
      };
    }
    
    // Hindi/English Send Money Fallback
    if (lowerText.includes('भेज') || lowerText.includes('send') || lowerText.includes('money')) {
      return {
        intent: "send_money",
        language: lowerText.includes('भेज') ? "hindi" : "english",
        params: { contact_name: "Rahul", amount: "500" },
        response_text: lowerText.includes('भेज') 
          ? "क्या आप राहुल को 500 रुपये भेजना चाहते हैं?" 
          : "Do you want to send 500 rupees to Rahul?"
      };
    }
    
    // Help Mode Fallback
    return {
      intent: "help",
      language: lowerText.includes('क्या') || lowerText.includes('मदद') ? "hindi" : "english",
      params: {},
      response_text: lowerText.includes('क्या') || lowerText.includes('मदद')
        ? "मैं आपकी मदद के लिए हूँ। आप मुझसे रिचार्ज या पैसे भेजने के लिए कह सकते हैं।"
        : "I am your voice assistant. I can help you recharge your phone or send money. Just ask!"
    };
  }
}

export async function generateExplanation(ocrText: string, languageCode: string = 'hi-IN') {
  const language = REVERSE_LANG_MAP[languageCode] || 'hindi';
  
  if (!GROQ_API_KEY) {
    console.warn('VITE_GROQ_API_KEY is not set. Returning mock explanation.');
    const mocks: Record<string, any> = {
      hindi: { text: "यह एक दवा का पत्ता है।", spoken_text: "Yeh ek dawa ka patta hai.", is_critical: false, suggestion: "दवा लें।", spoken_suggestion: "Dawa lein." },
      kannada: { text: "ಇದು ಔಷಧದ ಎಲೆ.", spoken_text: "Idu oushadada ele.", is_critical: false, suggestion: "ಔಷಧ ತೆಗೆದುಕೊಳ್ಳಿ.", spoken_suggestion: "Oushadha tegedukolli." },
      english: { text: "This is a medicine strip.", spoken_text: "This is a medicine strip.", is_critical: false, suggestion: "Take your medicine.", spoken_suggestion: "Take your medicine." }
    };
    return mocks[language] || mocks.hindi;
  }

  const systemPrompt = `You are a document assistant for rural users.
Extracted text:
---
${ocrText}
---
Tasks:
1. Summarize this in very simple ${language} (Max 2 sentences).
2. Detect any CRITICAL ISSUES (abnormal medical results, urgent deadlines, high bills).
3. Provide a simple suggestion for what they should do next in ${language}.

Respond ONLY with this JSON:
{
  "text": "<Summary in ${language} script>",
  "spoken_text": "<Summary transliterated to English letters>",
  "is_critical": boolean,
  "suggestion": "<Advice in ${language} script>",
  "spoken_suggestion": "<Advice transliterated to English letters>"
}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt }
        ],
        temperature: 0.2,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const cleanContent = content.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanContent);
      return {
        text: parsed.text || 'Done.',
        spoken_text: parsed.spoken_text || parsed.text || 'Done.',
        is_critical: !!parsed.is_critical,
        suggestion: parsed.suggestion || '',
        spoken_suggestion: parsed.spoken_suggestion || parsed.suggestion || ''
      };
    } catch (e) {
      return { text: content, spoken_text: content, is_critical: false, suggestion: '', spoken_suggestion: '' };
    }
  } catch (error) {
    console.error('Error generating explanation with GROQ. USING DEMO FALLBACK:', error);
    return language === 'hindi'
      ? { text: "यह एक ब्लड टेस्ट की रिपोर्ट है।", spoken_text: "Yeh ek blood test ki report hai." }
      : { text: "This looks like a medical blood report.", spoken_text: "This looks like a medical blood report." };
  }
}

export async function extractFormFields(ocrText: string, langCode: string): Promise<string[]> {
  const expectedLang = REVERSE_LANG_MAP[langCode] || 'english';
  
  if (!GROQ_API_KEY) {
    return ['Name', 'Phone Number', 'Address'];
  }

  const systemPrompt = `You are an AI assistant that reads blank forms and extracts field names.
The user uploaded an image of a blank form. Here is the OCR text extracted from it.
Your job:
1. Identify all the blank fields/questions that need to be answered (e.g. Name, Date of Birth, Address, etc.)
2. Translate each field name into ${expectedLang.toUpperCase()}
3. Return ONLY this JSON object (no explanation, no markdown):
{"fields": ["field1", "field2", "field3"]}

Rules:
- Include only fields that require USER INPUT (skip headers, instructions, logos)
- Maximum 10 fields
- Keep field names short and clear
- If OCR text is empty or unreadable, return common form fields

OCR Text:
---
${ocrText.slice(0, 2000)}
---`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }],
        temperature: 0.1,
        max_tokens: 400,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const content = data.choices[0].message.content;
    const clean = content.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(clean);

    // Robust extraction — handle any wrapping key
    if (parsed.fields && Array.isArray(parsed.fields) && parsed.fields.length > 0) {
      return parsed.fields as string[];
    }
    // Fallback: find any array value in the object
    const anyArray = Object.values(parsed).find(v => Array.isArray(v) && (v as any[]).length > 0);
    if (anyArray) return anyArray as string[];

    return ['Name', 'Age', 'Phone Number', 'Address'];
  } catch (error) {
    console.error('Error extracting form fields:', error);
    return ['Name', 'Age', 'Phone Number', 'Address'];
  }
}

// ─── Voice Navigation ──────────────────────────────────────────────────────────

export async function detectNavigationIntent(text: string) {
  if (!GROQ_API_KEY) {
    // Client-side keyword fallback (no API key)
    const lower = text.toLowerCase();
    if (lower.match(/form|bharna|upload form|fill/)) return { route: 'form', response_text: 'Opening form filler.' };
    if (lower.match(/help|sahay|madad|question|chahiye/)) return { route: 'help', response_text: 'Opening help section.' };
    if (lower.match(/document|image|photo|scan|tasveer|tsveer/)) return { route: 'image', response_text: 'Opening document scanner.' };
    if (lower.match(/home|main|back|wapas|ghar/)) return { route: 'home', response_text: 'Going back to home.' };
    if (lower.match(/recharge|mobile|top.?up/)) return { route: 'recharge', response_text: 'Starting recharge.' };
    if (lower.match(/money|transfer|send|paisa|bhejo/)) return { route: 'send_money', response_text: 'Starting money transfer.' };
    return { route: 'unknown', response_text: 'Sorry, I did not understand. Please try again.' };
  }

  const systemPrompt = `You are a voice navigation assistant for the BolDo app.
Analyze the user's speech and return ONLY a JSON object.
{
  "route": "<form | help | home | image | recharge | send_money | unknown>",
  "params": { "name": "...", "dob": "...", "address": "...", "phone": "..." },
  "response_text": "<Native script confirmation. Max 1 sentence.>",
  "spoken_text": "<Transliterated confirmation in English alphabet.>"
}

Navigation Rules:
- "form" -> "form bharna hai", "upload form", "application filling"
- "help" -> "help chahiye", "how to use", "assistance"
- "image" -> "photo scan", "upload image", "scan document", "tasveer", "document"
- "home" -> "wapas jao", "go back", "main menu"
- "recharge" -> "mobile recharge", "top up"
- "send_money" -> "transfer money", "paisa bhejo"
- "unknown" -> irrelevant speech

CRITICAL: Return ONLY valid JSON. No conversational filler.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        temperature: 0.1,
        max_tokens: 200,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const content = data.choices[0].message.content;
    const cleanContent = content.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanContent);

    return {
      route: parsed.route || 'unknown',
      params: parsed.params || {},
      response_text: parsed.response_text || 'Done.',
      spoken_text: parsed.spoken_text || parsed.response_text || 'Done.'
    };
  } catch (error) {
    console.error('Navigation intent detection error:', error);
    return { route: 'unknown', response_text: 'Sorry, I did not understand. Please try again.' };
  }
}
