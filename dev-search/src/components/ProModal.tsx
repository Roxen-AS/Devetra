import React, { useState, useEffect } from 'react';
import { X, Sparkles, Key, Check, Zap, Shield, Database, Trash2 } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('devetra_gemini_key') || '';
    setApiKey(existing);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('devetra_gemini_key', apiKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const handleRemove = () => {
    localStorage.removeItem('devetra_gemini_key');
    setApiKey('');
    setSaved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden font-mono text-zinc-200">
        {/* Glow border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-emerald-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-emerald-500/20 border border-fuchsia-500/30 text-fuchsia-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">Devetra Pro</h2>
        </div>
        <p className="text-xs text-zinc-400 mb-6">
          Supercharge your search with live Gemini AI reasoning, high-speed API aggregation, and private indexing.
        </p>

        {/* Features list */}
        <div className="grid gap-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white block">Gemini 2.5 Flash Oracle</span>
              <span className="text-zinc-400">Deep architectural analysis with custom code syntheses.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <Database className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white block">Multi-Source Live Querying</span>
              <span className="text-zinc-400">Aggregated results from GitHub, Dev.to, Hacker News, & Stack Overflow.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <Shield className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white block">Client-Side Key Privacy</span>
              <span className="text-zinc-400">Keys are stored solely in your local browser and never logged.</span>
            </div>
          </div>
        </div>

        {/* Custom API Key Input */}
        <form onSubmit={handleSave} className="border-t border-zinc-800/80 pt-5">
          <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Connect Custom Gemini API Key:</span>
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 px-3 py-2 text-xs bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-lg transition active:scale-95"
            >
              {saved ? 'Saved!' : 'Save'}
            </button>
            {apiKey && (
              <button
                type="button"
                onClick={handleRemove}
                title="Remove saved API key"
                className="p-2 text-zinc-400 hover:text-red-400 bg-zinc-900 border border-zinc-800 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {saved && (
            <p className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-2">
              <Check className="w-3.5 h-3.5" />
              <span>Key saved! Devetra will now use live Gemini AI for searches.</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
