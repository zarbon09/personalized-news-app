import { ChevronDown, SlidersHorizontal } from "./icons";
const filters=["All topics","All locations","Last 7 days"];
export function FilterBar(){return <div className="flex gap-2 overflow-x-auto pb-1"><button className="focus-ring flex shrink-0 items-center gap-2 rounded-lg bg-forest px-3.5 py-2 text-sm font-semibold text-white"><SlidersHorizontal size={15}/>Filters</button>{filters.map(f=><button key={f} className="focus-ring flex shrink-0 items-center gap-2 rounded-lg border bg-white px-3.5 py-2 text-sm font-semibold">{f}<ChevronDown size={14}/></button>)}</div>}
