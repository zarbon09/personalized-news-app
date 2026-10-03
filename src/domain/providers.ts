import type { Article, FeedFilters, Story, StoryClaim } from "./news";

export interface NewsProvider {
  getArticles(filters?: Partial<FeedFilters>): Promise<Article[]>;
}
export interface StoryClusterer { cluster(articles: Article[]): Promise<Story[]> }
export interface StorySummarizer { summarize(articles: Article[]): Promise<string> }
export interface ClaimExtractor { extract(articles: Article[]): Promise<StoryClaim[]> }
export interface EvidenceAnalysis { independentSources: number; primaryEvidence: boolean; explanation: string }
export interface EvidenceAnalyzer { analyze(story: Story): Promise<EvidenceAnalysis> }
