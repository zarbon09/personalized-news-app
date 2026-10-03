import Link from "next/link";
import { Layers3 } from "./icons";
import type { Story } from "@/domain/news";
import { formatRelativeTime } from "@/lib/utils";

export function StoryCard({story,featured=false}:{story:Story;featured?:boolean}){
  return <article className="card group overflow-hidden">
    <Link href={`/story/${story.id}`} className="focus-ring block rounded-2xl">
      <div className={`${story.imageTone} relative ${featured?"h-52 sm:h-64":"h-36"} overflow-hidden border-b`} aria-hidden="true">
        <div className="absolute -bottom-16 right-6 size-48 rounded-full border-[28px] border-white/50"/><div className="absolute left-8 top-7 h-1 w-20 bg-forest/50"/><div className="absolute left-8 top-12 h-1 w-36 bg-forest/25"/>
        <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">Sample story</span>
      </div>
      <div className={featured?"p-6":"p-5"}>
        <div className="eyebrow mb-3">{story.kicker}</div>
        <h2 className={`${featured?"text-2xl sm:text-3xl":"text-lg"} balance font-serif font-bold leading-tight group-hover:text-forest`}>{story.headline}</h2>
        <p className={`mt-3 ${featured?"line-clamp-3":"line-clamp-2"} text-sm leading-6 text-muted`}>{story.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted"><span className="flex items-center gap-1.5"><Layers3 size={14}/>{story.independentSourceCount} independent source{story.independentSourceCount!==1&&"s"}</span><span>{formatRelativeTime(story.lastUpdated)}</span></div>
      </div>
    </Link>
  </article>
}
