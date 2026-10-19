export type SearchSource = 'all' | 'github' | 'hackernews' | 'devto' | 'stackoverflow';

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  source: 'github' | 'hackernews' | 'devto' | 'stackoverflow';
  badge: string;
  gradient: string;
  tags?: string[];
  stars?: number;
  points?: number;
  commentsCount?: number;
  author?: string;
  date?: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
  title?: string;
}

export interface AiAnswer {
  title: string;
  summary: string;
  codeSnippet?: CodeSnippet;
  keyTakeaways: string[];
  sourceModel: string;
}
