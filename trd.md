TECHNICAL REQUIREMENTS DOCUMENT \(TRD\)

__Project: BolDo ΓÇö Multilingual Voice AI \+ Image Understanding__

Stack: React \+ Groq API \+ Web Speech API \+ Tesseract\.js  |  100% Free

# 1\. Complete Technology Stack

__Layer__

__Technology__

__Purpose__

__Cost__

Frontend

React \(Vite\)

UI, state, routing

Free

Voice Input

Web Speech API \(SpeechRecognition\)

Browser\-native STT

Free

Voice Output

Web Speech API \(SpeechSynthesis\)

Browser\-native TTS

Free

AI / LLM

Groq API \(llama3\-8b\-8192\)

Intent detection, responses

Free tier

Vision / OCR

Tesseract\.js

Extract text from images \(browser\)

Free

Image Understanding

Groq API \(text prompt with OCR output\)

Explain extracted text

Free tier

Styling

Tailwind CSS

Rapid UI development

Free

Icons

Lucide React

Icon library

Free

Hosting \(demo\)

Vercel / Netlify

One\-click deploy

Free tier

# 2\. System Architecture

BolDo is a fully client\-side React application\. There is no custom backend server\. All processing happens in the browser or via direct API calls to Groq\.

## 2\.1 Voice Flow Architecture

__Step 1: __User taps mic button ΓåÆ SpeechRecognition\.start\(\)

__Step 2: __Browser captures audio ΓåÆ converts to text \(Web Speech API\)

__Step 3: __Text sent to Groq API with intent\-detection system prompt

__Step 4: __Groq returns: \{ intent, language, params, response\_text \}

__Step 5: __App routes to correct task handler based on intent

__Step 6: __Task handler executes mock action \+ generates confirmation text

__Step 7: __SpeechSynthesis speaks the response in detected language

## 2\.2 Image Flow Architecture

__Step 1: __User taps ≡ƒô╖ button ΓåÆ file input dialog opens

__Step 2: __User selects image ΓåÆ preview shown on screen

__Step 3: __Tesseract\.js processes image ΓåÆ extracts raw text in browser

__Step 4: __Extracted text \+ user language sent to Groq API

__Step 5: __Groq returns simple explanation in detected language

__Step 6: __SpeechSynthesis speaks the explanation aloud

# 3\. Groq API Integration

__Model to use: llama3\-8b\-8192 \(fast, free tier generous limit\)__

Base URL: https://api\.groq\.com/openai/v1/chat/completions

Auth: Bearer token from VITE\_GROQ\_API\_KEY environment variable

## 3\.1 Intent Detection System Prompt

Send this as the system message for ALL voice inputs:

You are BolDo, a voice AI assistant for low\-literacy Indian users\.  
Analyze the user's speech and respond ONLY with a JSON object \(no explanation, no markdown\):  
\{  
  "intent": "<recharge | send\_money | help | unknown>",  
  "language": "<hindi | tamil | telugu | kannada | english>",  
  "params": \{ <extracted fields like number, amount, operator> \},  
  "response\_text": "<Friendly confirmation or answer in the SAME language as input\. Use simple words\. Max 2 sentences\.>"  
\}  
If intent is 'help', answer the question in response\_text\.  
Always respond in the same language the user spoke in\.

## 3\.2 Image Explanation Prompt

System: You are a helpful assistant explaining text to someone who cannot read\.  
User: \[Detected language: \{language\}\]  
The following text was extracted from an image the user photographed:  
\-\-\-  
\{extracted\_text\}  
\-\-\-  
Explain what this says in very simple \{language\} that a 10\-year\-old can understand\.  
Keep it under 3 sentences\. Speak as if talking to the person directly\.

# 4\. Project Folder Structure

bold╨╛/  
Γö£ΓöÇΓöÇ public/  
Γöé   ΓööΓöÇΓöÇ index\.html  
Γö£ΓöÇΓöÇ src/  
Γöé   Γö£ΓöÇΓöÇ components/  
Γöé   Γöé   Γö£ΓöÇΓöÇ MicButton\.jsx          ΓåÉ Main voice trigger button  
Γöé   Γöé   Γö£ΓöÇΓöÇ ImageUpload\.jsx        ΓåÉ OCR \+ image explain feature  
Γöé   Γöé   Γö£ΓöÇΓöÇ FormFiller\.jsx         ΓåÉ Voice form filling component  
Γöé   Γöé   Γö£ΓöÇΓöÇ HelpMode\.jsx           ΓåÉ Q&A help component  
Γöé   Γöé   Γö£ΓöÇΓöÇ TaskConfirm\.jsx        ΓåÉ Confirmation screen \(recharge/money\)  
Γöé   Γöé   ΓööΓöÇΓöÇ SpeechOutput\.jsx       ΓåÉ TTS wrapper component  
Γöé   Γö£ΓöÇΓöÇ hooks/  
Γöé   Γöé   Γö£ΓöÇΓöÇ useSpeechRecognition\.js ΓåÉ Web Speech API STT hook  
Γöé   Γöé   ΓööΓöÇΓöÇ useSpeechSynthesis\.js  ΓåÉ Web Speech API TTS hook  
Γöé   Γö£ΓöÇΓöÇ services/  
Γöé   Γöé   Γö£ΓöÇΓöÇ groqService\.js         ΓåÉ All Groq API calls  
Γöé   Γöé   ΓööΓöÇΓöÇ ocrService\.js          ΓåÉ Tesseract\.js wrapper  
Γöé   Γö£ΓöÇΓöÇ data/  
Γöé   Γöé   ΓööΓöÇΓöÇ mockTasks\.js           ΓåÉ Mock recharge/money data  
Γöé   Γö£ΓöÇΓöÇ App\.jsx                    ΓåÉ Root component, routing logic  
Γöé   Γö£ΓöÇΓöÇ main\.jsx  
Γöé   ΓööΓöÇΓöÇ index\.css  
Γö£ΓöÇΓöÇ \.env                           ΓåÉ VITE\_GROQ\_API\_KEY=your\_key  
Γö£ΓöÇΓöÇ vite\.config\.js  
ΓööΓöÇΓöÇ package\.json

# 5\. Language & Voice Configuration

__Language__

__SpeechRecognition lang__

__SpeechSynthesis lang__

__Groq language value__

Hindi

hi\-IN

hi\-IN

hindi

Tamil

ta\-IN

ta\-IN

tamil

Telugu

te\-IN

te\-IN

telugu

Kannada

kn\-IN

kn\-IN

kannada

English \(fallback\)

en\-IN

en\-IN

english

Important: Start SpeechRecognition with lang="hi\-IN" as default\. After Groq detects language from first utterance, switch dynamically for subsequent calls\.

# 6\. Key Component Specifications

__Component__

__Props / State__

__Responsibility__

MicButton

isListening, onResult\(text\)

Start/stop STT, visual pulse animation

groqService\.js

detectIntent\(text\) ΓåÆ JSON

Single Groq API call, JSON parse, error handle

ocrService\.js

extractText\(imageFile\) ΓåÆ string

Tesseract\.js worker, progress state

ImageUpload

onExplanation\(text\)

File input, OCR, send to Groq, speak result

TaskConfirm

intent, params, onConfirm, onCancel

Show parsed task, get voice yes/no confirm

FormFiller

fields\[\], onComplete\(data\)

Ask each field by voice, fill form visually

HelpMode

onAnswer\(text\)

Open mic for free Q&A, pass to Groq help intent

# 7\. Environment Setup

__1\. __npm create vite@latest boldo \-\- \-\-template react

__2\. __cd boldo && npm install

__3\. __npm install tesseract\.js

__4\. __npm install \-D tailwindcss postcss autoprefixer && npx tailwindcss init \-p

__5\. __npm install lucide\-react

__6\. __Create \.env file: VITE\_GROQ\_API\_KEY=gsk\_xxxxxxxxxxxxxxxxxxxx

__7\. __Get free Groq API key at: console\.groq\.com

__8\. __npm run dev ΓåÆ open localhost:5173

