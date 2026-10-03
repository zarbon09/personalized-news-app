export type ClaimKind = "fact" | "claim" | "disputed" | "opinion";
export type ContentKind = "reporting" | "analysis" | "opinion";

export interface Publisher {
  id: string;
  name: string;
  country: string;
  transparencyNote: string;
}

export interface Article {
  id: string;
  publisher: Publisher;
  headline: string;
  dek: string;
  url: string;
  publishedAt: string;
  language: string;
  contentKind: ContentKind;
  isPrimarySource: boolean;
  sample: true;
}

export interface StoryClaim {
  id: string;
  kind: ClaimKind;
  text: string;
  attribution?: string;
  sourceArticleIds: string[];
  explanation: string;
}

export interface TimelineEntry { id: string; at: string; title: string; description: string }

export interface Story {
  id: string;
  headline: string;
  summary: string;
  kicker: string;
  location: string;
  topics: string[];
  lastUpdated: string;
  independentSourceCount: number;
  articles: Article[];
  claims: StoryClaim[];
  timeline: TimelineEntry[];
  relatedStoryIds: string[];
  imageTone: string;
}

export interface FeedFilters {
  topics: string[];
  locations: string[];
  companies: string[];
  people: string[];
  keywords: string[];
  excludedKeywords: string[];
  languages: string[];
  timeRange: "24h" | "48h" | "3d" | "7d" | "30d";
  sort: "relevance" | "newest" | "most-sourced";
}

export interface SavedFeed { id: string; name: string; description: string; filters: FeedFilters; storyIds: string[]; updatedAt: string }
