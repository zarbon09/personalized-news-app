import Link from "next/link";
import { Search } from "./icons";

export function EmptyState({title="No stories match yet",description="Try widening the time range or removing one of your filters."}:{title?:string;description?:string}) {
  return <div className="card col-span-full px-6 py-14 text-center"><Search className="mx-auto text-muted"/><h2 className="mt-4 font-serif text-2xl font-bold">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p><Link href="/explore" className="mt-5 inline-block rounded-lg bg-forest px-4 py-2 text-sm font-bold text-white">Explore all stories</Link></div>;
}
