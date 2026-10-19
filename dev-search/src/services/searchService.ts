import type { SearchResult } from '../types/search';

const TIMEOUT_MS = 6000;

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function fetchGitHub(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetchWithTimeout(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=5`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item: any) => ({
      id: `gh-${item.id}`,
      title: item.full_name,
      url: item.html_url,
      excerpt: item.description || 'No description provided.',
      source: 'github' as const,
      badge: 'GH',
      gradient: 'from-emerald-500/90 via-cyan-600 to-blue-700 border-cyan-500/60 text-white',
      stars: item.stargazers_count,
      author: item.owner?.login,
      tags: [item.language].filter(Boolean),
    }));
  } catch {
    return [];
  }
}

async function fetchHackerNews(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetchWithTimeout(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=5`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.hits || []).map((hit: any) => ({
      id: `hn-${hit.objectID}`,
      title: hit.title || 'Hacker News Thread',
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      excerpt: hit.story_text ? hit.story_text.slice(0, 160) + '...' : `Discussion with ${hit.num_comments ?? 0} comments and ${hit.points ?? 0} points on Hacker News.`,
      source: 'hackernews' as const,
      badge: 'HN',
      gradient: 'from-amber-500/90 via-orange-600 to-red-700 border-amber-500/60 text-white',
      points: hit.points,
      commentsCount: hit.num_comments,
      author: hit.author,
      date: hit.created_at ? new Date(hit.created_at).toLocaleDateString() : undefined,
    }));
  } catch {
    return [];
  }
}

async function fetchDevTo(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetchWithTimeout(
      `https://dev.to/api/articles?per_page=5&q=${encodeURIComponent(query)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((item: any) => ({
      id: `dev-${item.id}`,
      title: item.title,
      url: item.url,
      excerpt: item.description || item.readable_publish_date || 'Read full article on Dev.to',
      source: 'devto' as const,
      badge: 'DEV',
      gradient: 'from-indigo-600 via-sky-700 to-purple-900 border-indigo-400/60 text-white',
      points: item.positive_reactions_count,
      commentsCount: item.comments_count,
      author: item.user?.name,
      tags: Array.isArray(item.tag_list) ? item.tag_list.slice(0, 3) : [],
    }));
  } catch {
    return [];
  }
}

async function fetchStackOverflow(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetchWithTimeout(
      `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${encodeURIComponent(query)}&site=stackoverflow&pagesize=5`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item: any) => ({
      id: `so-${item.question_id}`,
      title: decodeHtmlEntities(item.title),
      url: item.link,
      excerpt: `Answered question with score of ${item.score} and ${item.answer_count} answer(s). Click to view accepted answers.`,
      source: 'stackoverflow' as const,
      badge: 'SO',
      gradient: 'from-pink-500 via-fuchsia-600 to-violet-800 border-fuchsia-400/60 text-white',
      points: item.score,
      commentsCount: item.answer_count,
      author: item.owner?.display_name,
      tags: Array.isArray(item.tags) ? item.tags.slice(0, 3) : [],
    }));
  } catch {
    return [];
  }
}

function decodeHtmlEntities(str: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.textContent || str;
}

export async function searchAllSources(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const [ghResult, hnResult, devResult, soResult] = await Promise.allSettled([
    fetchGitHub(query),
    fetchHackerNews(query),
    fetchDevTo(query),
    fetchStackOverflow(query),
  ]);

  const ghItems = ghResult.status === 'fulfilled' ? ghResult.value : [];
  const hnItems = hnResult.status === 'fulfilled' ? hnResult.value : [];
  const devItems = devResult.status === 'fulfilled' ? devResult.value : [];
  const soItems = soResult.status === 'fulfilled' ? soResult.value : [];

  // Interleave results smoothly for a balanced dev feed
  const combined: SearchResult[] = [];
  const maxLen = Math.max(ghItems.length, hnItems.length, devItems.length, soItems.length);

  for (let i = 0; i < maxLen; i++) {
    if (soItems[i]) combined.push(soItems[i]);
    if (ghItems[i]) combined.push(ghItems[i]);
    if (devItems[i]) combined.push(devItems[i]);
    if (hnItems[i]) combined.push(hnItems[i]);
  }

  // Fallback if network was blocked or completely empty
  if (combined.length === 0) {
    return [
      {
        id: 'fallback-so',
        title: `Search Stack Overflow for "${query}"`,
        url: `https://stackoverflow.com/search?q=${encodeURIComponent(query)}`,
        excerpt: 'Explore answers, debug traces, and community solutions directly on Stack Overflow.',
        source: 'stackoverflow',
        badge: 'SO',
        gradient: 'from-pink-500 via-fuchsia-600 to-violet-800 border-fuchsia-400/60 text-white',
      },
      {
        id: 'fallback-gh',
        title: `GitHub Repositories for "${query}"`,
        url: `https://github.com/search?q=${encodeURIComponent(query)}`,
        excerpt: 'Browse open-source implementations, tools, and code repositories on GitHub.',
        source: 'github',
        badge: 'GH',
        gradient: 'from-emerald-500/90 via-cyan-600 to-blue-700 border-cyan-500/60 text-white',
      },
      {
        id: 'fallback-dev',
        title: `Dev.to Community Articles on "${query}"`,
        url: `https://dev.to/search?q=${encodeURIComponent(query)}`,
        excerpt: 'Read deep dives, tutorials, and practical developer guides on Dev.to.',
        source: 'devto',
        badge: 'DEV',
        gradient: 'from-indigo-600 via-sky-700 to-purple-900 border-indigo-400/60 text-white',
      },
    ];
  }

  return combined;
}
