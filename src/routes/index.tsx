import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ear, Lightbulb, LockKeyhole, UsersRound, Volume2, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/friendease-hero.jpg.asset.json";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "FriendEase — Social plans that work for everybody" },
    { name: "description", content: "Privately match accessibility preferences with places everyone can enjoy." },
    { property: "og:title", content: "FriendEase — Social plans that work for everybody" },
    { property: "og:description", content: "Private, accessibility-aware social planning for every group." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-primary"><LockKeyhole className="size-4" />Private by design</span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl">Social plans that work for everybody.</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">FriendEase privately matches your accessibility preferences with places where everyone can enjoy the experience.</p>
          <Button asChild variant="hero" size="lg" className="mt-8"><Link to="/preferences">Find a place <ArrowRight /></Link></Button>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"><div className="flex -space-x-2"><span className="size-8 rounded-full border-2 border-background bg-accent"/><span className="size-8 rounded-full border-2 border-background bg-secondary"/><span className="size-8 rounded-full border-2 border-background bg-success-soft"/></div>Built for the whole group, never just one person.</div>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-secondary shadow-2xl"><img src={heroAsset.url} alt="A diverse group of friends using FriendEase to plan an accessible outing" className="aspect-[16/10] h-full w-full object-cover" /></div>
      </section>
      <section className="border-y bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-bold uppercase text-primary">Designed around dignity</p><h2 className="mt-3 text-3xl font-bold">Everyone belongs in the plan.</h2></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
            {[{icon:LockKeyhole,title:"Private preferences",text:"Your needs stay with you—not the venue or the group."},{icon:Accessibility,title:"Accessibility-aware matching",text:"Compare the details that make an outing genuinely workable."},{icon:UsersRound,title:"Inclusive social planning",text:"Find a place that balances everyone’s needs without awkward trade-offs."}].map(({icon:Icon,title,text})=><article key={title} className="bg-background p-7"><Icon className="size-7 text-primary"/><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></article>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-3 text-sm font-semibold"><Accessibility className="size-5 text-primary"/>Wheelchair Accessible</span>
            <span className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-3 text-sm font-semibold"><Volume2 className="size-5 text-primary"/>Low Noise</span>
            <span className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-3 text-sm font-semibold"><Lightbulb className="size-5 text-primary"/>Sensory-Friendly Lighting</span>
            <span className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-3 text-sm font-semibold"><Ear className="size-5 text-primary"/>Hearing Accessibility</span>
          </div>
        </div>
      </section>
    </div>
  );
}
