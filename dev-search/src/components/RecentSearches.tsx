import React from 'react';
import { History, X } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (q: string) => void;
  onClear: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelect,
  onClear,
}) => {
  if (searches.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap font-mono text-xs text-zinc-400">
      <div className="flex items-center gap-1.5 text-zinc-500">
        <History className="w-3.5 h-3.5" />
        <span>Recent:</span>
      </div>

      {searches.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-emerald-300 hover:border-zinc-700 transition"
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="p-1 text-zinc-500 hover:text-zinc-300 transition ml-auto"
        title="Clear recent searches"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
