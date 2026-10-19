import React from 'react';
import type { SearchSource } from '../types/search';
import { Layers, Github, MessageSquare, BookOpen, HelpCircle } from 'lucide-react';

interface FilterBarProps {
  activeSource: SearchSource;
  onChange: (source: SearchSource) => void;
  counts: Record<SearchSource, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeSource,
  onChange,
  counts,
}) => {
  const tabs: { id: SearchSource; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Sources', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'stackoverflow', label: 'Stack Overflow', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'github', label: 'GitHub', icon: <Github className="w-3.5 h-3.5" /> },
    { id: 'devto', label: 'Dev.to', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'hackernews', label: 'Hacker News', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800/80 mb-6">
      {tabs.map((tab) => {
        const isActive = activeSource === tab.id;
        const count = counts[tab.id] ?? 0;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition ${
              isActive
                ? 'bg-zinc-800 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80 border border-transparent'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive
                  ? 'bg-emerald-400/20 text-emerald-300 font-bold'
                  : 'bg-zinc-800/60 text-zinc-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
