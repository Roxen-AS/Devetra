import React from 'react';
import { Sparkles, Github, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenPro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPro }) => {
  return (
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-emerald-400 p-[1.5px] shadow-lg shadow-fuchsia-500/20">
            <div className="h-full w-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-mono font-bold text-xl tracking-wider text-white flex items-center gap-1.5">
              DEVETRA
              <span className="text-xs px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">
                v2.0
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Roxen-AS/Devetra"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Roxen-AS/Devetra</span>
          </a>

          <button
            onClick={onOpenPro}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold text-zinc-950 bg-gradient-to-r from-fuchsia-400 via-pink-300 to-emerald-300 hover:opacity-95 shadow-lg shadow-fuchsia-500/20 active:scale-95 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
            <span>Pro Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
