import React, { useState } from 'react';
import type { AiAnswer } from '../types/search';
import { Sparkles, Copy, Check, Terminal, CheckCircle2 } from 'lucide-react';

interface AiAnswerCardProps {
  answer: AiAnswer;
  query: string;
}

export const AiAnswerCard: React.FC<AiAnswerCardProps> = ({ answer, query }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (answer.codeSnippet?.code) {
      navigator.clipboard.writeText(answer.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="mb-8 relative group">
      {/* Glow border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-fuchsia-500/30 to-cyan-500/30 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      <div className="relative bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-950/95 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-base sm:text-lg text-emerald-400 flex items-center gap-2">
                <span>{answer.title}</span>
              </h2>
              <span className="text-xs font-mono text-zinc-500">Query: "{query}"</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30">
              {answer.sourceModel}
            </span>
          </div>
        </div>

        {/* Technical Summary */}
        <div className="mt-4 text-zinc-200 font-mono text-sm leading-relaxed">
          <p>{answer.summary}</p>
        </div>

        {/* Code Snippet Block */}
        {answer.codeSnippet && (
          <div className="mt-5 rounded-xl border border-zinc-800/90 bg-black/60 overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/70">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>{answer.codeSnippet.title || answer.codeSnippet.language}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
                  {answer.codeSnippet.language}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300/95 leading-relaxed selection:bg-emerald-500/30">
              <code>{answer.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Key Takeaways */}
        {answer.keyTakeaways && answer.keyTakeaways.length > 0 && (
          <div className="mt-5 pt-4 border-t border-zinc-800/80">
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
              Key Insights & Best Practices:
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
              {answer.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
