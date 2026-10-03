import type { Article, SavedFeed, Story } from "@/domain/news";

const publishers = {
  ledger: { id: "pub-ledger", name: "Civic Ledger", country: "India", transparencyNote: "Demo publisher with named editorial contact and corrections policy." },
  wire: { id: "pub-wire", name: "Sample News Wire", country: "India", transparencyNote: "Demo wire service; methodology supplied for this prototype." },
  journal: { id: "pub-journal", name: "Asia Technology Journal", country: "Japan", transparencyNote: "Demo trade publication; ownership is disclosed." },
  record: { id: "pub-record", name: "Public Record Desk", country: "India", transparencyNote: "Demo primary-document monitor." },
};

export const articles: Article[] = [
  { id:"a1", publisher:publishers.ledger, headline:"RBI keeps policy rate unchanged in scheduled review", dek:"The monetary policy committee retained its benchmark rate while outlining its inflation outlook.", url:"#demo-source", publishedAt:"2026-09-30T06:30:00Z", language:"English", contentKind:"reporting", isPrimarySource:false, sample:true },
  { id:"a2", publisher:publishers.wire, headline:"Banks respond after central bank policy decision", dek:"Lenders and economists offered initial responses to the scheduled announcement.", url:"#demo-source", publishedAt:"2026-09-30T07:15:00Z", language:"English", contentKind:"analysis", isPrimarySource:false, sample:true },
  { id:"a3", publisher:publishers.record, headline:"Monetary Policy Committee publishes resolution", dek:"The official resolution records the committee decision and member votes.", url:"#demo-source", publishedAt:"2026-09-30T06:00:00Z", language:"English", contentKind:"reporting", isPrimarySource:true, sample:true },
  { id:"a4", publisher:publishers.ledger, headline:"Delhi agencies begin seasonal air-quality measures", dek:"Public agencies announced staged measures ahead of the winter pollution period.", url:"#demo-source", publishedAt:"2026-09-29T10:00:00Z", language:"English", contentKind:"reporting", isPrimarySource:false, sample:true },
  { id:"a5", publisher:publishers.record, headline:"Delhi environment department releases action calendar", dek:"The demo public notice lists dates for monitoring and enforcement activity.", url:"#demo-source", publishedAt:"2026-09-29T08:00:00Z", language:"Hindi", contentKind:"reporting", isPrimarySource:true, sample:true },
  { id:"a6", publisher:publishers.journal, headline:"Japan outlines new semiconductor research partnership", dek:"Universities and manufacturers are included in a multi-year research proposal.", url:"#demo-source", publishedAt:"2026-09-28T04:00:00Z", language:"Japanese", contentKind:"reporting", isPrimarySource:false, sample:true },
  { id:"a7", publisher:publishers.wire, headline:"Manufacturers assess Japan chip research plan", dek:"Industry groups welcomed the direction while noting that funding details remain open.", url:"#demo-source", publishedAt:"2026-09-28T08:00:00Z", language:"English", contentKind:"analysis", isPrimarySource:false, sample:true },
  { id:"a8", publisher:publishers.record, headline:"Transport authority shares Metro expansion update", dek:"The published update describes milestone dates for two sample corridors.", url:"#demo-source", publishedAt:"2026-09-27T12:00:00Z", language:"English", contentKind:"reporting", isPrimarySource:true, sample:true }
];

export const stories: Story[] = [
  {
    id:"rbi-policy-review", kicker:"Economy · India", location:"India", imageTone:"bg-[#dfe8dc]", topics:["RBI","Banking","Nifty 50"],
    headline:"RBI holds policy rate as banks weigh the outlook",
    summary:"India’s central bank retained its benchmark policy rate at its scheduled review. The published resolution confirms the decision; projections and market implications remain the subject of analysis.",
    lastUpdated:"2026-09-30T08:20:00Z", independentSourceCount:3, articles:articles.slice(0,3), relatedStoryIds:["japan-chip-partnership"],
    claims:[
      { id:"c1", kind:"fact", text:"The monetary policy committee left the benchmark policy rate unchanged.", sourceArticleIds:["a1","a3"], explanation:"Confirmed by the official resolution and independently reported by Civic Ledger." },
      { id:"c2", kind:"claim", text:"Some lenders expect credit demand to strengthen during the next quarter.", attribution:"Bank executives quoted by Sample News Wire", sourceArticleIds:["a2"], explanation:"An attributed forecast, not an established outcome." },
      { id:"c3", kind:"disputed", text:"Analysts differ on when the next rate change is likely.", sourceArticleIds:["a1","a2"], explanation:"The publications cite forecasts with different timing; no future decision has been made." },
      { id:"c4", kind:"opinion", text:"The pause gives policymakers useful room to observe incoming data.", attribution:"Sample News Wire analysis", sourceArticleIds:["a2"], explanation:"Interpretation presented in an analysis article." }
    ],
    timeline:[
      { id:"t1", at:"30 Sep · 11:30", title:"Official resolution published", description:"The committee decision and recorded vote became available." },
      { id:"t2", at:"30 Sep · 12:00", title:"Newsrooms report the decision", description:"Initial reports summarize the rate decision and guidance." },
      { id:"t3", at:"30 Sep · 12:45", title:"Industry response follows", description:"Bank representatives and economists publish early reactions." }
    ]
  },
  {
    id:"delhi-air-action", kicker:"Environment · Delhi NCR", location:"Delhi NCR", imageTone:"bg-[#e9e3d6]", topics:["Pollution","Local government"],
    headline:"Delhi agencies publish seasonal air-quality action calendar", summary:"Local agencies have released a schedule of monitoring and mitigation steps for the winter season. Implementation outcomes are not yet available.", lastUpdated:"2026-09-29T12:10:00Z", independentSourceCount:2, articles:articles.slice(3,5), relatedStoryIds:["delhi-metro-update"],
    claims:[{ id:"c5", kind:"fact", text:"The environment department published a seasonal action calendar.", sourceArticleIds:["a4","a5"], explanation:"Supported by a public notice and a separate report." },{ id:"c6", kind:"claim", text:"Officials say enforcement teams will increase field inspections.", attribution:"Delhi environment officials", sourceArticleIds:["a4"], explanation:"This is a forward-looking statement attributed to officials." }],
    timeline:[{ id:"t4", at:"29 Sep · 13:30", title:"Calendar released", description:"The department posted the monitoring schedule." },{ id:"t5", at:"29 Sep · 15:30", title:"Agency briefing", description:"Officials described planned enforcement activity." }]
  },
  {
    id:"japan-chip-partnership", kicker:"Technology · Japan", location:"Japan", imageTone:"bg-[#dde5eb]", topics:["Semiconductors","AI","Robotics"], headline:"Japan proposes semiconductor research partnership", summary:"A proposed research program would connect universities and manufacturers. Funding allocations and participation terms have not yet been finalized.", lastUpdated:"2026-09-28T09:00:00Z", independentSourceCount:2, articles:articles.slice(5,7), relatedStoryIds:["rbi-policy-review"],
    claims:[{id:"c7",kind:"fact",text:"The proposal names university and manufacturing partners.",sourceArticleIds:["a6","a7"],explanation:"Both demo reports describe the named categories of participant."},{id:"c8",kind:"claim",text:"Industry groups say the program could shorten research cycles.",attribution:"Manufacturing groups",sourceArticleIds:["a7"],explanation:"A projected benefit attributed to interested groups."}],
    timeline:[{id:"t6",at:"28 Sep · 13:00",title:"Proposal announced",description:"Program scope and prospective partners were outlined."}]
  },
  {
    id:"delhi-metro-update", kicker:"Infrastructure · Delhi NCR", location:"Delhi NCR", imageTone:"bg-[#e4e0eb]", topics:["Metro","Infrastructure"], headline:"Metro authority updates expansion milestones", summary:"A transport authority update gives revised milestone dates for two sample corridors. This prototype does not assert that the corridors or dates are real.", lastUpdated:"2026-09-27T13:00:00Z", independentSourceCount:1, articles:articles.slice(7,8), relatedStoryIds:["delhi-air-action"], claims:[{id:"c9",kind:"claim",text:"Two corridor milestones are described in the authority update.",attribution:"Demo transport authority update",sourceArticleIds:["a8"],explanation:"Only one primary demo document is represented; independent corroboration is absent."}], timeline:[{id:"t7",at:"27 Sep · 17:30",title:"Update published",description:"The authority shared its project note."}]
  }
];

const base = { companies:[], people:[], keywords:[], excludedKeywords:[], languages:["English"], sort:"relevance" as const };
export const feeds: SavedFeed[] = [
  { id:"market-brief", name:"My Market Brief", description:"Rates, banks and major Indian companies", filters:{...base,topics:["Nifty 50","RBI","Banking","Reliance","Tata"],locations:["India"],timeRange:"24h"},storyIds:["rbi-policy-review","japan-chip-partnership"],updatedAt:"2026-09-30T08:30:00Z" },
  { id:"delhi-watch", name:"Delhi Watch", description:"Local environment, transit and government", filters:{...base,topics:["Pollution","Metro","Infrastructure","Local government"],locations:["Delhi NCR"],timeRange:"48h"},storyIds:["delhi-air-action","delhi-metro-update"],updatedAt:"2026-09-29T12:30:00Z" },
  { id:"japan-tech", name:"Japan Deep Tech", description:"AI, robotics and semiconductor signals", filters:{...base,topics:["AI","Robotics","Semiconductors"],locations:["Japan"],languages:["English","Japanese"],timeRange:"3d"},storyIds:["japan-chip-partnership"],updatedAt:"2026-09-28T09:10:00Z" }
];
