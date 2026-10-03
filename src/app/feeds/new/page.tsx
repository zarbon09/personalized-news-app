import Link from "next/link";import { FeedForm } from "./feed-form";
export const metadata={title:"Create a feed"};
export default function NewFeed(){return <div className="mx-auto max-w-4xl"><Link href="/feeds" className="text-sm font-semibold text-muted">← My feeds</Link><div className="mt-6"><p className="eyebrow">Personalize your intelligence</p><h1 className="mt-2 font-serif text-4xl font-bold">Create a news feed</h1><p className="mt-3 max-w-2xl text-muted">Combine subjects, entities, places and exclusions. You can tune every filter later.</p></div><FeedForm/></div>}
