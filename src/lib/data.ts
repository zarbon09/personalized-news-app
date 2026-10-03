import { feeds, stories } from "@/infrastructure/news/mock-data";

export async function getStories() { return stories }
export async function getStory(id: string) { return stories.find((story) => story.id === id) }
export async function getFeeds() { return feeds }
export async function getFeed(id: string) { return feeds.find((feed) => feed.id === id) }
