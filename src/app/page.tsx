import Link from "next/link";
import { FilterBar } from "@/components/filter-bar";
import { StoryCard } from "@/components/story-card";
import { Clock3, Headphones, Plus } from "@/components/icons";
import { getFeeds, getStories } from "@/lib/data";

export default async function HomePage(){const stories=await getStories();const feeds=await getFeeds();return <div>
  <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="eyebrow mb-2">Thursday, 1 October</p><h1 className="balance font-serif text-4xl font-bold tracking-tight sm:text-5xl">Good morning, Alex.</h1><p className="mt-3 max-w-xl text-muted">Your briefing brings together the events that matter to your saved interests.</p></div><button disabled title="Planned for a later phase" className="flex w-fit cursor-not-allowed items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-semibold text-muted opacity-70"><Headphones size={17}/>Audio briefing <span className="rounded bg-paper px-1.5 py-0.5 text-[10px] uppercase">Planned</span></button></section>
  <FilterBar/>
  <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <section><div className="mb-4 flex items-end justify-between"><div><p className="eyebrow">Your briefing</p><h2 className="mt-1 font-serif text-2xl font-bold">Top stories</h2></div><Link className="text-sm font-semibold text-forest" href="/explore">View all →</Link></div><div className="grid gap-5 md:grid-cols-2"><StoryCard story={stories[0]} featured/><div className="grid gap-5">{stories.slice(1,3).map(s=><StoryCard key={s.id} story={s}/>)}</div></div></section>
    <aside className="space-y-6"><section className="card p-5"><div className="flex items-center justify-between"><h2 className="font-serif text-xl font-bold">Saved feeds</h2><Link href="/feeds/new" aria-label="New feed" className="focus-ring grid size-8 place-items-center rounded-lg bg-moss text-forest"><Plus size={16}/></Link></div><div className="mt-4 divide-y">{feeds.map(feed=><Link key={feed.id} href={`/feeds/${feed.id}`} className="focus-ring block py-3 first:pt-0 last:pb-0"><div className="font-semibold">{feed.name}</div><div className="mt-1 flex items-center gap-1 text-xs text-muted"><Clock3 size={12}/>{feed.filters.timeRange} · {feed.storyIds.length} stories</div></Link>)}</div></section><section className="card p-5"><p className="eyebrow">Trending in your interests</p><ol className="mt-4 space-y-4">{["RBI policy","Delhi air quality","Semiconductor research","Metro expansion"].map((t,i)=><li key={t} className="flex items-baseline gap-3"><span className="font-serif text-xl text-line">0{i+1}</span><Link href="/explore" className="font-semibold hover:text-forest">{t}</Link></li>)}</ol></section></aside>
  </div>
</div>}
