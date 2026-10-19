import type { AiAnswer } from '../types/search';

export async function generateDevAnswer(query: string): Promise<AiAnswer> {
  const customKey = localStorage.getItem('devetra_gemini_key') || import.meta.env.VITE_GEMINI_API_KEY;

  if (customKey && customKey.trim().length > 10) {
    try {
      const result = await callGeminiApi(query, customKey.trim());
      if (result) return result;
    } catch (e) {
      console.warn('Gemini API call failed, falling back to local Dev Oracle:', e);
    }
  }

  // Graceful, fast local synthesis oracle
  return generateLocalDevOracle(query);
}

async function callGeminiApi(query: string, apiKey: string): Promise<AiAnswer | null> {
  const prompt = `You are Devetra AI Oracle, an elite developer search engine and code assistant.
Analyze this developer query: "${query}"

Return a valid JSON object with the following structure (no markdown fences, just pure JSON):
{
  "title": "Concise headline answer (max 10 words)",
  "summary": "Clear, expert technical explanation of the solution, architecture, or concept (2-4 sentences)",
  "codeSnippet": {
    "language": "e.g. typescript, python, javascript, bash, etc.",
    "title": "Brief title for this snippet",
    "code": "A clean, modern, production-ready code example answering the query"
  },
  "keyTakeaways": [
    "Crucial insight or best practice 1",
    "Crucial insight or best practice 2",
    "Common pitfall to avoid or performance note"
  ]
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const parsed = JSON.parse(rawText);
  return {
    title: parsed.title || 'AI Developer Oracle',
    summary: parsed.summary || 'Solution analyzed.',
    codeSnippet: parsed.codeSnippet,
    keyTakeaways: parsed.keyTakeaways || [],
    sourceModel: 'Gemini 2.5 Flash',
  };
}

function generateLocalDevOracle(query: string): AiAnswer {
  const lower = query.toLowerCase();

  // Pattern matching for tailored high-quality dev responses
  if (lower.includes('react') || lower.includes('hook') || lower.includes('state') || lower.includes('suspense')) {
    return {
      title: 'React Architecture & State Management',
      summary:
        'In modern React (React 18 & 19), state transitions and asynchronous loading are decoupled using Concurrent features like Suspense, useTransition, and Server Components to prevent blocking the main thread while data resolves.',
      codeSnippet: {
        language: 'tsx',
        title: 'Modern React Suspense & Transition Pattern',
        code: `import { Suspense, useTransition, useState } from 'react';

export function ModernSearch() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleUpdate = (next: string) => {
    // Keep input responsive while deferring heavy view updates
    startTransition(() => {
      setQuery(next);
    });
  };

  return (
    <Suspense fallback={<div className="animate-pulse">Loading Dev Results...</div>}>
      <SearchFeed query={query} isPending={isPending} onSearch={handleUpdate} />
    </Suspense>
  );
}`,
      },
      keyTakeaways: [
        'Wrap asynchronous boundaries in <Suspense> with accessible fallback skeletons.',
        'Use useTransition to mark non-urgent state updates and avoid UI jank.',
        'Prefer immutable state updates and keep effects (useEffect) minimal.',
      ],
      sourceModel: 'Devetra Oracle Engine',
    };
  }

  if (lower.includes('typescript') || lower.includes('type') || lower.includes('interface') || lower.includes('generic')) {
    return {
      title: 'TypeScript Type Safety & Utility Types',
      summary:
        'TypeScript provides conditional types, template literal types, and const type parameters (TS 5.0+) to infer precise literal types and prevent runtime boundary errors without manual casting.',
      codeSnippet: {
        language: 'typescript',
        title: 'Type-Safe API & Const Type Parameters',
        code: `// Const type parameter infers exact literal tuples & objects
function defineEndpoints<const T extends Record<string, string>>(endpoints: T) {
  return endpoints;
}

const API = defineEndpoints({
  search: '/v1/search',
  details: '/v1/details',
});

// Type is strongly inferred as '/v1/search' | '/v1/details'
type EndpointKey = keyof typeof API;
type EndpointPath = (typeof API)[EndpointKey];`,
      },
      keyTakeaways: [
        'Use "const T" in generic functions to preserve exact string/number literals.',
        'Prefer "unknown" over "any" when dealing with external API responses, validating with Zod.',
        'Leverage discriminated unions with a "type" or "status" field for foolproof state handling.',
      ],
      sourceModel: 'Devetra Oracle Engine',
    };
  }

  if (lower.includes('css') || lower.includes('tailwind') || lower.includes('center') || lower.includes('flex') || lower.includes('grid')) {
    return {
      title: 'Modern CSS & Tailwind Layout Engine',
      summary:
        'Modern responsive layouts leverage CSS Grid with "repeat(auto-fit, minmax(...))" and Flexbox with gap utilities, eliminating manual breakpoint media queries for fluid card layouts.',
      codeSnippet: {
        language: 'html',
        title: 'Fluid Responsive Card Grid in Tailwind CSS',
        code: `<!-- Fluid card grid: automatically wraps based on min-width without media queries -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-6">
  <div class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-md transition-all hover:scale-[1.02] hover:border-emerald-500/50">
    <h3 class="font-mono text-lg text-emerald-400">Card Item</h3>
    <p class="text-sm text-zinc-300">Fluid responsive layout without media query clutter.</p>
  </div>
</div>`,
      },
      keyTakeaways: [
        'Use auto-fit with minmax() for self-adjusting grid cards across all screen sizes.',
        'Use "backdrop-blur-md" and subtle border gradients for modern glassmorphism.',
        'Prefer CSS gap over margin child hacks for cleaner spacing maintenance.',
      ],
      sourceModel: 'Devetra Oracle Engine',
    };
  }

  if (lower.includes('git') || lower.includes('branch') || lower.includes('commit') || lower.includes('merge') || lower.includes('rebase')) {
    return {
      title: 'Git Version Control & Workflow Best Practices',
      summary:
        'A clean Git workflow uses atomic commits, short-lived feature branches, and interactive rebasing to keep repository histories linear, bisectable, and production-safe.',
      codeSnippet: {
        language: 'bash',
        title: 'Safe Feature Branch & Rebase Workflow',
        code: `# 1. Create and switch to a descriptive branch
git checkout -b feature/search-enhancement

# 2. Stage and commit atomically with conventional commits
git add -A
git commit -m "feat(search): add multi-source developer aggregation"

# 3. Pull latest main and rebase cleanly before pushing
git fetch origin
git rebase origin/main

# 4. Push branch and open pull request
git push -u origin feature/search-enhancement`,
      },
      keyTakeaways: [
        'Follow Conventional Commits (feat:, fix:, chore:, refactor:) for automated changelogs.',
        'Never force push to shared branches (main/staging); use --force-with-lease on personal branches.',
        'Keep commits atomic so bugs can be isolated using "git bisect".',
      ],
      sourceModel: 'Devetra Oracle Engine',
    };
  }

  // Default general developer synthesis
  return {
    title: `Developer Solution: ${query}`,
    summary: `Synthesized answer for "${query}". When building performant web and software solutions, isolate state, handle async failures with timeouts or circuit breakers, and validate all boundary inputs with strict schemas.`,
    codeSnippet: {
      language: 'typescript',
      title: 'Robust Async Fetch with Retry & Validation',
      code: `async function fetchWithRetry<T>(url: string, retries = 3, delayMs = 500): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return (await response.json()) as T;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((res) => setTimeout(res, delayMs * attempt));
    }
  }
  throw new Error('All retry attempts exhausted');
}`,
    },
    keyTakeaways: [
      'Always implement exponential backoff on flaky external API calls.',
      'Enforce runtime schema validation (e.g. Zod) to catch corrupted API payloads.',
      'Log structured errors with timestamps and request IDs for frictionless debugging.',
    ],
    sourceModel: 'Devetra Oracle Engine',
  };
}
