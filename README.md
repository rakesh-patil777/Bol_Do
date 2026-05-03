# 🎙️ BolDo (बोलदो) - Voice-Driven Support for the Unread

BolDo is a cutting-edge, voice-first assistant designed to empower non-readers and rural users in India. By leveraging advanced AI, BolDo converts visual and textual information into simple, spoken local language, helping users navigate complex documents, medicine strips, and government forms with ease.

![BolDo Landing Page Showcase](frontend/public/landing_preview.png) *(Note: Placeholder for actual screenshot)*

## 🌟 Key Features

*   **Snap & Listen**: Take a photo of any text (medicine strips, signboards, documents) and BolDo explains it aloud in a simple, conversational way.
*   **Voice-First Navigation**: Use the "Bol Do" wake-word to navigate the app entirely by voice. No menus, no typing.
*   **Interactive Chat Support**: A built-in AI chatbot that supports voice input and provides real-time assistance for app usage and general queries.
*   **Auto-Form Filling**: Complex forms are broken down into simple spoken questions. BolDo captures the answers and auto-fills the fields for you.
*   **Multilingual Support**: Natively supports Hindi, Kannada, and English with dynamic language switching.
*   **Premium 3D Interface**: Features a stunning, interactive 3D landing page and a modern, high-contrast UI designed for clarity and ease of use.

## 🚀 Tech Stack

*   **Frontend**: React (Vite), TypeScript
*   **Styling**: Vanilla CSS, Framer Motion (Animations)
*   **3D Elements**: Three.js, @react-three/fiber, @react-three/drei
*   **AI/ML**: Groq API (Llama 3.3), Tesseract.js (OCR), Web Speech API (STT/TTS)
*   **Navigation**: Lenis (Smooth Scrolling)

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18+)
*   NPM or Yarn
*   A Groq API Key (Sign up at [groq.com](https://groq.com))

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/rakesh-patil777/Bol_Do.git
    cd Bol_Do
    ```

2.  **Install dependencies**:
    ```bash
    cd frontend
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the `frontend` directory:
    ```env
    VITE_GROQ_API_KEY=your_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
Bol_Do/
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # UI Components (VoiceNavigator, HelpPage, etc.)
│   │   ├── hooks/        # Custom hooks (STT, TTS, Form logic)
│   │   ├── services/     # API services (Groq, OCR, LocalCommands)
│   │   └── App.tsx       # Main application entry
│   └── index.css         # Global design system
├── files/                # Project assets and documentation
└── README.md             # This file
```

## 🤝 Contributing

We welcome contributions! Whether it's fixing bugs, improving translations, or adding new features, feel free to open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ by the BolDo Team to bridge the literacy gap through voice.*
