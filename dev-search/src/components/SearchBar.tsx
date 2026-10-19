import React, { useEffect, useRef } from 'react';
import { Search, X, Loader2, Sparkles } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  'React 19 Server Components',
  'TypeScript Const Type Parameters',
  'Tailwind CSS Responsive Grid',
  'Git Rebase vs Merge',
  'Next.js App Router Caching',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSearch,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-emerald-400 rounded-2xl blur-md opacity-40 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-500" />
        
        <div className="relative flex items-center bg-zinc-900/95 border border-zinc-700/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="pl-4 text-zinc-400 group-focus-within:text-fuchsia-400 transition">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            className="w-full px-3.5 py-4 bg-transparent text-white placeholder:text-zinc-500 font-mono text-sm sm:text-base focus:outline-none"
            placeholder="Search code, errors, docs or algorithms... (Press / to focus)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-2 text-zinc-400 hover:text-white transition"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="pr-2">
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-500 via-pink-500 to-emerald-400 text-zinc-950 font-mono font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Searching</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Suggestion Pills */}
      <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs font-mono">
        <span className="text-zinc-500">Popular:</span>
        {SUGGESTIONS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setQuery(item);
              onSearch(item);
            }}
            className="px-2.5 py-1 rounded-md bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
