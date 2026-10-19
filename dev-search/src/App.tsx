import React, { useState, useEffect } from 'react';
import type { SearchResult, SearchSource, AiAnswer } from './types/search';
import { searchAllSources } from './services/searchService';
import { generateDevAnswer } from './services/aiService';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { AiAnswerCard } from './components/AiAnswerCard';
import { ResultCard } from './components/ResultCard';
import { RecentSearches } from './components/RecentSearches';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ProModal } from './components/ProModal';
import { Terminal, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'devetra_recent_searches';

export default function App() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiAnswer, setAiAnswer] = useState<AiAnswer | null>(null);
  const [activeSource, setActiveSource] = useState<SearchSource>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isProOpen, setIsProOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveRecentSearch = (text: string) => {
    try {
      const filtered = [text, ...recentSearches.filter((s) => s.toLowerCase() !== text.toLowerCase())].slice(0, 5);
      setRecentSearches(filtered);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      // Ignore
    }
  };

  const handleClearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const executeSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setSubmittedQuery(searchQuery);
    saveRecentSearch(searchQuery);

    try {
      // Execute live search and AI synthesis concurrently
      const [searchResults, answer] = await Promise.all([
        searchAllSources(searchQuery),
        generateDevAnswer(searchQuery),
      ]);

      setResults(searchResults);
      setAiAnswer(answer);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter results according to active source tab
  const filteredResults = results.filter((res) => {
    if (activeSource === 'all') return true;
    return res.source === activeSource;
  });

  // Calculate counts per source
  const counts: Record<SearchSource, number> = {
    all: results.length,
    stackoverflow: results.filter((r) => r.source === 'stackoverflow').length,
    github: results.filter((r) => r.source === 'github').length,
    devto: results.filter((r) => r.source === 'devto').length,
    hackernews: results.filter((r) => r.source === 'hackernews').length,
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background radial effects */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 80% 15%, #2e026d33 0%, #0d0e15 65%, #08080c 100%)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(rgba(79, 249, 243, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Navbar */}
      <Navbar onOpenPro={() => setIsProOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-14">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Multi-Source Developer Search & AI Oracle</span>
          </div>

          <h1 className="font-mono text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-300 to-emerald-300 tracking-tight pb-3">
            DEVETRA
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-mono">
            Synthesizing solutions from <span className="text-pink-400">Stack Overflow</span>,{' '}
            <span className="text-emerald-400">GitHub</span>,{' '}
            <span className="text-indigo-400">Dev.to</span>, and{' '}
            <span className="text-amber-400">Hacker News</span>.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={executeSearch}
            isLoading={isLoading}
          />
        </div>

        {/* Recent Searches */}
        <RecentSearches
          searches={recentSearches}
          onSelect={(q) => {
            setQuery(q);
            executeSearch(q);
          }}
          onClear={handleClearSearches}
        />

        {/* Loading State */}
        {isLoading && <SkeletonLoader />}

        {/* Search Results & AI Section */}
        {!isLoading && hasSearched && (
          <div className="animate-in fade-in duration-500">
            {/* AI Developer Oracle Answer */}
            {aiAnswer && <AiAnswerCard answer={aiAnswer} query={submittedQuery} />}

            {/* Filter Bar */}
            <FilterBar
              activeSource={activeSource}
              onChange={setActiveSource}
              counts={counts}
            />

            {/* Results Feed */}
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-zinc-800 rounded-2xl bg-zinc-900/40">
                <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                <p className="font-mono text-sm text-zinc-400">
                  No results found for this source. Try selecting "All Sources" or rephrasing your query.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial Empty State / Feature Grid */}
        {!hasSearched && (
          <div className="mt-12 grid sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
              <span className="text-emerald-400 font-bold block mb-1">⚡ Live Aggregation</span>
              <span className="text-zinc-400">
                Simultaneously queries GitHub, Dev.to, Hacker News, & Stack Exchange APIs in parallel.
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
              <span className="text-fuchsia-400 font-bold block mb-1">🪄 AI Developer Oracle</span>
              <span className="text-zinc-400">
                Synthesizes concepts, best practices, and code blocks ready to copy-paste.
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
              <span className="text-cyan-400 font-bold block mb-1">🔒 Client-Side & Fast</span>
              <span className="text-zinc-400">
                Zero telemetry, instant keyboard navigation, and custom Gemini API key support.
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/80 py-6 text-center text-xs font-mono text-zinc-500">
        <p>
          Devetra Search Engine • Built with React, TypeScript & Tailwind CSS • Maintained by{' '}
          <a
            href="https://github.com/Roxen-AS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-emerald-400 transition underline underline-offset-4"
          >
            Roxen-AS
          </a>
        </p>
      </footer>

      {/* Pro Modal */}
      <ProModal isOpen={isProOpen} onClose={() => setIsProOpen(false)} />
    </div>
  );
}
