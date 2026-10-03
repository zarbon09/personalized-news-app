import type { FeedFilters } from "@/domain/news";
import type { EvidenceAnalyzer, NewsProvider, StoryClusterer } from "@/domain/providers";
import { articles, stories } from "./mock-data";

/** Deterministic demo adapter. Replace via the NewsProvider interface, not the UI. */
export class MockNewsProvider implements NewsProvider {
  async getArticles(filters?: Partial<FeedFilters>) {
    if (!filters?.languages?.length) return articles;
    return articles.filter((article) => filters.languages?.includes(article.language));
  }
}

export class MockStoryClusterer implements StoryClusterer {
  async cluster() { return stories; }
}

export class DeterministicEvidenceAnalyzer implements EvidenceAnalyzer {
  async analyze(story: (typeof stories)[number]) {
    const primaryEvidence = story.articles.some((article) => article.isPrimarySource);
    return { independentSources: story.independentSourceCount, primaryEvidence, explanation: `${story.independentSourceCount} separately represented demo publishers${primaryEvidence ? ", including a primary document" : ""}.` };
  }
}
