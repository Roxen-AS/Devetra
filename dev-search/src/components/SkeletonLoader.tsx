import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* AI Answer Skeleton */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-zinc-800" />
          <div className="h-5 w-48 bg-zinc-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-800/80 rounded" />
          <div className="h-4 w-5/6 bg-zinc-800/80 rounded" />
        </div>
        <div className="h-32 w-full bg-zinc-950/80 rounded-xl border border-zinc-800" />
      </div>

      {/* Result Card Skeletons */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 flex items-center gap-4">
            <div className="w-12 h-10 rounded-lg bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-zinc-800 rounded" />
              <div className="h-3 w-3/4 bg-zinc-800/60 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
