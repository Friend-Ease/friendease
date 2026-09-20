import { Link } from "@tanstack/react-router";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";

export function AppHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
    <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:px-8">
      <Link to="/" className="flex min-w-0 items-center gap-2 text-xl font-extrabold text-foreground"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles className="size-5"/></span><span>Friend<span className="text-primary">Ease</span></span></Link>
      <nav className="hidden items-center gap-7 text-sm font-semibold md:flex"><Link to="/preferences" activeProps={{className:"text-primary"}}>Preferences</Link><Link to="/plan" activeProps={{className:"text-primary"}}>Plan an outing</Link><Link to="/recommendations" activeProps={{className:"text-primary"}}>Recommendations</Link><Link to="/deck" search={{slide:1}} activeProps={{className:"text-primary"}}>View deck</Link></nav>
      <button aria-label="Toggle menu" onClick={()=>setOpen(!open)} className="grid size-10 place-items-center rounded-md border md:hidden"><Menu className="size-5"/></button>
    </div>
    {open && <nav className="grid gap-1 border-t p-4 text-sm font-semibold md:hidden"><Link to="/preferences" className="p-3" onClick={()=>setOpen(false)}>Preferences</Link><Link to="/plan" className="p-3" onClick={()=>setOpen(false)}>Plan an outing</Link><Link to="/recommendations" className="p-3" onClick={()=>setOpen(false)}>Recommendations</Link><Link to="/deck" search={{slide:1}} className="p-3" onClick={()=>setOpen(false)}>View deck</Link></nav>}
  </header>
}