"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Compass, Home, Menu, Search, Settings } from "./icons";
import { cn } from "@/lib/utils";

const links = [{href:"/",label:"Home",icon:Home},{href:"/explore",label:"Explore",icon:Compass},{href:"/feeds",label:"My feeds",icon:Bookmark},{href:"/settings",label:"Settings",icon:Settings}];

export function SiteHeader() {
  const pathname = usePathname();
  return <>
    <header className="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-7 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-md font-serif text-xl font-bold tracking-tight"><span className="grid size-8 place-items-center rounded-lg bg-forest text-sm text-white">S</span>Signal Desk</Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">{links.slice(0,3).map(({href,label,icon:Icon})=><Link key={href} href={href} className={cn("focus-ring flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold",pathname===href?"bg-moss text-forest":"text-muted hover:bg-white hover:text-ink")}><Icon size={16}/>{label}</Link>)}</nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/explore" aria-label="Search stories" className="focus-ring grid size-9 place-items-center rounded-full border bg-white text-muted hover:text-ink"><Search size={17}/></Link>
          <Link href="/settings" className="focus-ring hidden rounded-lg px-2 py-1.5 text-sm font-semibold text-muted sm:block">AM</Link>
          <button aria-label="Open menu" className="focus-ring grid size-9 place-items-center rounded-lg md:hidden"><Menu size={20}/></button>
        </div>
      </div>
    </header>
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t bg-white px-2 py-2 md:hidden" aria-label="Mobile navigation">{links.map(({href,label,icon:Icon})=><Link key={href} href={href} className={cn("flex min-w-16 flex-col items-center gap-1 rounded-md py-1 text-[11px]",pathname===href?"text-forest":"text-muted")}><Icon size={18}/>{label}</Link>)}</nav>
  </>
}
