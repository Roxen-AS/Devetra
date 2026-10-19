import React from 'react';
import type { SearchResult } from '../types/search';
import { ExternalLink, Star, MessageSquare, ThumbsUp, Calendar, User } from 'lucide-react';

interface ResultCardProps {
  result: SearchResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative rounded-xl p-5 border border-zinc-800/90 bg-zinc-900/60 hover:bg-zinc-850/80 transition-all duration-300 hover:scale-[1.01] hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50"
    >
      <div className="flex items-start gap-4">
        {/* Source Badge */}
        <span className="shrink-0 text-xl font-black font-mono tracking-wider px-3 py-1.5 bg-black/70 border border-zinc-700/80 rounded-lg text-fuchsia-300 shadow-md group-hover:border-fuchsia-500/80 group-hover:text-fuchsia-200 transition">
          {result.badge}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-base font-semibold text-white group-hover:text-emerald-300 transition truncate">
              {result.title}
            </h3>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition shrink-0" />
          </div>

          <p className="mt-1.5 text-zinc-300/80 text-xs sm:text-sm font-mono line-clamp-2 leading-relaxed">
            {result.excerpt}
          </p>

          {/* Metadata Footer */}
          <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-zinc-400">
            {result.stars !== undefined && (
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{result.stars.toLocaleString()} stars</span>
              </span>
            )}

            {result.points !== undefined && (
              <span className="flex items-center gap-1 text-emerald-400">
                <ThumbsUp className="w-3 h-3" />
                <span>{result.points} points</span>
              </span>
            )}

            {result.commentsCount !== undefined && (
              <span className="flex items-center gap-1 text-cyan-400">
                <MessageSquare className="w-3 h-3" />
                <span>{result.commentsCount} comments</span>
              </span>
            )}

            {result.author && (
              <span className="flex items-center gap-1 text-zinc-400">
                <User className="w-3 h-3" />
                <span>{result.author}</span>
              </span>
            )}

            {result.date && (
              <span className="flex items-center gap-1 text-zinc-500">
                <Calendar className="w-3 h-3" />
                <span>{result.date}</span>
              </span>
            )}

            {result.tags && result.tags.length > 0 && (
              <div className="flex items-center gap-1.5 ml-auto">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50 text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};
