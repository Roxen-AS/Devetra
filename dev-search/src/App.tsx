import type React from "react";
import { useState } from "react";

const mysteriousBackground = {
  background:
    "radial-gradient(ellipse at 80% 20%, #2e026d44 0%, #16161a 60%, #0f172a 100%)",
};

const neonShadow = {
  textShadow: "0 0 8px #4ff9f3, 0 0 4px #e521fa",
};

const AI_RESULT = {
  title: "AI Answer",
  body:
    "Welcome, Code Explorer. Enter your query to unlock hidden developer knowledge. Our AI Oracle will answer first, followed by the web's secrets.",
};

const FEATURED_RESULTS = [
  {
    title: "Stack Overflow",
    url: "https://stackoverflow.com/",
    excerpt:
      "Top answers from the largest programming Q&A site. Your query, expertly answered.",
    badge: "SO",
    gradient:
      "from-pink-500 via-fuchsia-500/80 to-violet-700 text-white border-fuchsia-700",
  },
  {
    title: "GitHub Discussions",
    url: "https://github.com/discussions",
    excerpt:
      "Insights from developer discussions. Explore current thinking and community wisdom.",
    badge: "GH",
    gradient: "from-emerald-500/90 via-cyan-600 to-blue-700 border-blue-700 text-white",
  },
  {
    title: "Dev.to Features",
    url: "https://dev.to/",
    excerpt: "Best dev articles for your query, handpicked by community curators.",
    badge: "DEV",
    gradient: "from-indigo-500 via-sky-700 to-black border-indigo-800",
  },
];

function App() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen w-full " style={mysteriousBackground}>
      <div className="max-w-2xl mx-auto pt-20 px-4">
        {/* Lucrative mysterious header */}
        <h1
          className="font-mono text-4xl md:text-5xl text-center pb-8 drop-shadow-lg select-none"
          style={neonShadow}
        >
          Devetra
        </h1>
        <p className="text-center mb-10 text-slate-300/80 text-lg">
          Enter your dev query. AI answers appear in the dark first.<br />
          <span className="text-emerald-400">Stay curious. Stay lucrative.</span>
        </p>
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 justify-center items-center mb-12">
          <input
            type="text"
            className="rounded-l-lg px-5 py-3 w-full max-w-md bg-zinc-800/80 border-2 border-fuchsia-700 focus:outline-none text-white placeholder:text-zinc-400 font-mono placeholder:text-sm shadow-lg focus:ring-2 focus:ring-emerald-400/50"
            style={{ letterSpacing: "0.03em" }}
            placeholder="e.g. How does React suspense work?"
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="rounded-r-lg px-5 py-3 text-black bg-gradient-to-r from-fuchsia-400 via-pink-400 to-emerald-300 font-bold focus:from-cyan-300 focus:via-blue-300 focus:to-fuchsia-400"
            type="submit"
          >
            Search
          </button>
        </form>
        {/* Results */}
        {submitted && (
          <>
            <section className="mb-8 animate-in fade-in slide-in-from-top-6 duration-700">
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-fuchsia-950/70 border border-zinc-800/60 rounded-xl p-6 shadow-lg">
                <div className="mb-1 text-lg font-mono text-emerald-400 flex gap-2 items-center">
                  <span className="relative">
                    <span className="animate-pulse text-fuchsia-400 pr-2">🪄</span>
                  </span>
                  {AI_RESULT.title}
                </div>
                <div className="text-slate-200/90 font-mono text-md pl-7">
                  {AI_RESULT.body}
                  <br />
                  <span className="opacity-60 italic">(Your query: {query})</span>
                </div>
              </div>
            </section>
            <section className="grid gap-5">
              {FEATURED_RESULTS.map((res) => (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={res.url}
                  className={`group bg-gradient-to-r ${res.gradient} rounded-xl p-5 border-2 shadow-md transition-all hover:scale-[1.02] hover:shadow-fuchsia-700/40 cursor-pointer flex items-center gap-6`}
                >
                  <span className="text-2xl font-black font-mono tracking-widest px-3 py-2 bg-black/60 border rounded-md border-fuchsia-500 text-fuchsia-300 shadow-md group-hover:bg-fuchsia-800/60 transition">
                    {res.badge}
                  </span>
                  <span className="flex-1">
                    <span className="block font-mono text-lg text-white mb-1">
                      {res.title}
                    </span>
                    <span className="block text-slate-200/80 text-sm font-mono">
                      {res.excerpt}
                    </span>
                  </span>
                  <span className="ml-auto opacity-50 group-hover:opacity-100 text-lg">→</span>
                </a>
              ))}
            </section>
          </>
        )}
        {/* Mysterious lucrative coin/banner */}
        <div className="fixed right-4 top-6 md:right-12 md:top-8 z-50 animate-bounce">
          <span className="px-5 py-2 bg-gradient-to-r from-fuchsia-600/90 via-emerald-400/80 to-black font-semibold rounded-xl shadow-2xl border-2 border-fuchsia-800 text-zinc-50 font-mono text-lg select-none cursor-pointer">
            💎 Unlock Pro Mode
          </span>
        </div>
      </div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Futuristic animated cyber matrix: bg visuals */}
        <div className="absolute w-full h-full animate-pulse opacity-10 blur-md"
          style={{
            background:
              "repeating-linear-gradient(120deg, #e521fa22, #14ffea18 50px, #05001705 100px)",
          }}
        />
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-64 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 100%, #4ff9f388 0%, #18181b 80%)",
          }}
        />
      </div>
    </div>
  );
}

export default App;
