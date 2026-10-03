import type { Metadata } from "next";
import { DemoNotice } from "@/components/demo-notice";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = { title:{default:"Signal Desk",template:"%s · Signal Desk"}, description:"A transparent, personalized news intelligence workspace." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><DemoNotice/><SiteHeader/><main className="mx-auto min-h-[calc(100vh-7rem)] max-w-[1440px] px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pt-10">{children}</main><footer className="hidden border-t px-10 py-8 text-xs text-muted md:block"><div className="mx-auto flex max-w-[1360px] justify-between"><span>Signal Desk prototype · Evidence over labels</span><span>Mock data only</span></div></footer></body></html>}
