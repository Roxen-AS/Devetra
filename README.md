# Devetra ⚡

> **An AI-Powered Custom Developer Search Engine & Technical Oracle**

[![Live Demo](https://img.shields.io/badge/Live_Demo-dev--search--drab.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dev-search-drab.vercel.app)

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&logoColor=white)](https://dev-search-drab.vercel.app)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald)](LICENSE)

🌐 **Live Application:** [**https://dev-search-drab.vercel.app**](https://dev-search-drab.vercel.app)

---

Devetra synthesizes developer knowledge across the open web in real-time. Instead of jumping between tabs, Devetra queries top technical platforms in parallel and generates AI-driven technical solutions with copy-ready code snippets.

---

## 🚀 Key Features

* **⚡ Real-Time Multi-Source Aggregation:** Queries live developer resources simultaneously:
  * **Stack Overflow:** Questions, scores, and accepted answers
  * **GitHub:** Top star-ranked repositories and code implementations
  * **Dev.to:** Community technical write-ups and in-depth tutorials
  * **Hacker News (Algolia API):** Community discussions, engineering debates, and points
* **🪄 AI Developer Oracle:**
  * Direct architectural summaries and conceptual breakdown
  * Formatted code blocks with 1-click clipboard copy
  * Key takeaways and best practices
  * Powered by **Google Gemini 2.5 Flash** (with instant offline Dev Oracle fallback)
* **💎 Pro Mode & Client-Side Privacy:**
  * Connect your own Gemini API Key directly in the UI
  * All keys remain local in `localStorage` — zero tracking or telemetry
* **⌨️ Keyboard-First Workflow:**
  * Press `/` or `Ctrl+K` from anywhere on the page to focus the search bar
  * Quick suggestions for popular frameworks and patterns
  * Source tabs with live result count badges
* **🎨 Cyberpunk Neon Aesthetic:**
  * High-contrast dark mode with glow borders and fluid animations

---

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Tailwind CSS
* **Build Tool:** Vite
* **Deployment:** Vercel (Continuous Deployment via GitHub)
* **Icons:** Lucide React
* **APIs:** GitHub REST API, Hacker News Algolia API, Dev.to API, Stack Exchange API, Google Gemini API

---

## 📦 Getting Started

### Prerequisites
* Node.js (v18+)
* npm, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Roxen-AS/Devetra.git
   cd Devetra/dev-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Gemini API Key:
   Create a `.env` file in `dev-search/`:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: You can also enter your key inside the app's Pro Mode dialog without editing `.env`)*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🔗 Deployment

Live on Vercel: [**https://dev-search-drab.vercel.app**](https://dev-search-drab.vercel.app)

---

## 👤 Author

Developed and maintained by [**Roxen-AS**](https://github.com/Roxen-AS).
