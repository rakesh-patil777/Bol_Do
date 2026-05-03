<div align="center">
  <img src="https://raw.githubusercontent.com/rakesh-patil777/Bol_Do/main/frontend/src/assets/app-bg.jpg" alt="BolDo Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px; max-height: 400px; object-fit: cover;" />
  
  <h1>🎙️ BolDo (बोलदो)</h1>
  <p><strong>Empowering the Unread Through the Power of Voice.</strong></p>

  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Groq](https://img.shields.io/badge/AI_Engine-Groq_Llama_3.3-f55036.svg?style=for-the-badge&logo=ai)](https://groq.com/)
</div>

<br/>

## 🌍 The Problem
In an increasingly digital world, millions of citizens—particularly in rural areas—are left behind due to the **literacy barrier**. Filling out complex government forms, understanding medical reports, or simply navigating a smartphone app can be an overwhelming task for non-readers. 

## 💡 Our Solution: BolDo
**BolDo** ("Speak Up") is a revolutionary, voice-first digital assistant designed specifically for the next billion users. It completely removes the need for typing, reading, or navigating complex UI menus. **If you can speak, you can use BolDo.**

By bridging cutting-edge **Generative AI (Groq + Llama 3.3)** with an ultra-accessible interface, we translate the digital world into simple, spoken local languages.

---

## ✨ Features That Wow

### 🗣️ 1. Dual-Engine Voice Assistant
*   **"Hey Assistant" Wake-Word Navigation:** A persistent, background listener allows users to jump between app sections completely hands-free.
*   **General Conversational AI:** A powerful, dedicated voice assistant powered by Groq's Llama-3.3-70b-versatile model that answers general knowledge questions dynamically and converses in native languages.

### 📝 2. Intelligent Auto-Form Filling
Forms are hard. BolDo makes them easy.
*   The AI visually scans blank forms, extracts required fields, and then **interviews the user conversationally**. 
*   *"What is your name?", "What is your date of birth?"* — BolDo listens, understands the context, and perfectly maps spoken answers to structured form data. 

### 📄 3. Medical & Document Snapshot Analyzer
*   **Snap & Listen:** Take a photo of a medicine strip, a government notice, or a hospital report.
*   **Critical Alerts:** BolDo's AI instantly analyzes the OCR text and flags urgent information (e.g., *abnormal blood sugar levels* or *expiring prescriptions*) and translates the summary into simple, spoken Hindi, Kannada, or English.

### 🎨 4. Premium, Immersive 3D Interface
Accessibility shouldn't mean boring.
*   BolDo features a **stunning, glassmorphism UI** with a dynamic, CSS-driven **wind-blown 3D parallax background**.
*   Smooth framer-motion transitions, interactive floating elements, and a distraction-free mobile-first design.

---

## 🏗️ Technical Architecture

BolDo is built for speed, resilience, and scale.

*   **⚡ AI Inference:** **Groq API** running *Llama-3.3-70b-versatile* for lightning-fast, real-time voice conversations and complex intent detection.
*   **👁️ Optical Character Recognition (OCR):** Tesseract.js integrated for entirely client-side image-to-text processing.
*   **🎙️ Speech Engine:** Highly optimized Web Speech API wrapper for continuous STT (Speech-to-Text) with robust hardware-contention management and automatic TTS (Text-to-Speech) transliteration routing.
*   **💻 Frontend:** React (Vite) + TypeScript.
*   **✨ Animations:** Framer Motion & pure CSS 3D masking for ultra-smooth UI interactions.

---

## 🚀 How to Run Locally

Get BolDo running on your machine in seconds.

### Prerequisites
* Node.js (v18+)
* A free [Groq API Key](https://console.groq.com/keys)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rakesh-patil777/Bol_Do.git
   cd Bol_Do
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file in the `frontend` folder and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Launch the App:**
   ```bash
   npm run dev
   ```
   *Open `http://localhost:5173` and allow microphone access.*

---

## 🔮 The Future of BolDo
We believe BolDo has the potential to become a universal accessibility layer for rural digital infrastructure. Future updates include:
* Full offline LLM support using quantized models (Llama.cpp).
* Integration with WhatsApp for low-bandwidth users.
* Expanded regional language dialects (Tamil, Telugu, Marathi).

<br/>

<div align="center">
  <i>Built with ❤️ to bridge the digital divide.</i>
</div>
