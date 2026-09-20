import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Ear,
  Expand,
  Lightbulb,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/friendease-hero.jpg.asset.json";
import familyImage from "@/assets/sammy-family-cafe.jpg";
import gardenImage from "@/assets/green-garden-cafe.jpg";
import riversideImage from "@/assets/riverside-cafe.jpg";

type DeckSearch = { slide?: number; print?: boolean };

export const Route = createFileRoute("/deck")({
  validateSearch: (search: Record<string, unknown>): DeckSearch => ({
    slide: Math.min(7, Math.max(1, Number(search["slide"]) || 1)),
    print: search["print"] === true || search["print"] === "true",
  }),
  head: () => ({
    meta: [
      { title: "FriendEase presentation — Private, inclusive social planning" },
      { name: "description", content: "A seven-slide overview of FriendEase and its zero-disclosure approach to accessible social planning." },
      { property: "og:title", content: "FriendEase presentation" },
      { property: "og:description", content: "See how FriendEase privately matches groups with accessible places." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

const slides = [
  { title: "Social plans that work for everybody", content: <CoverSlide /> },
  { title: "Accessibility should not require disclosure", content: <ProblemSlide /> },
  { title: "Real needs, privately matched", content: <PreferencesSlide /> },
  { title: "One simple, private journey", content: <JourneySlide /> },
  { title: "Ranked recommendations", content: <RecommendationsSlide /> },
  { title: "The why behind every match", content: <WhySlide /> },
  { title: "Your outing is ready", content: <ReadySlide /> },
];

function Deck() {
  const { slide = 1, print = false } = Route.useSearch();
  const navigate = useNavigate({ from: "/deck" });
  const [fullscreen, setFullscreen] = useState(false);
  const current = slide - 1;

  const go = (next: number) => navigate({ search: { slide: Math.min(slides.length, Math.max(1, next)) }, replace: true });

  useEffect(() => {
    document.title = `${slide}/${slides.length} — ${slides[current]?.title ?? "FriendEase"}`;
    const onKey = (event: KeyboardEvent) => {
      if (print) return;
      if (event.key === "ArrowRight" || event.key === " ") go(slide + 1);
      if (event.key === "ArrowLeft") go(slide - 1);
    };
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [current, print, slide]);

  useEffect(() => {
    if (!print) return;
    const timer = window.setTimeout(() => window.print(), 500);
    return () => window.clearTimeout(timer);
  }, [print]);

  if (print) {
    return <div className="deck-print">{slides.map((item, index) => <div className="deck-print-page" key={item.title}><SlideFrame index={index}>{item.content}</SlideFrame></div>)}</div>;
  }

  const enterFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  };

  return (
    <div className={`deck-app ${fullscreen ? "deck-fullscreen" : ""}`}>
      <div className="deck-toolbar">
        <Link to="/" className="deck-brand"><span className="deck-brand-mark"><Sparkles /></span>Friend<span>Ease</span></Link>
        <div className="deck-actions">
          <Button variant="outline" size="sm" onClick={enterFullscreen}><Expand /> <span className="hidden sm:inline">Present</span></Button>
          <Button size="sm" asChild><Link to="/deck" search={{ slide: 1, print: true }} target="_blank"><Download /> <span className="hidden sm:inline">Download PDF</span></Link></Button>
        </div>
      </div>
      <div className="deck-stage"><ScaledSlide><SlideFrame index={current}>{slides[current]?.content}</SlideFrame></ScaledSlide></div>
      <div className="deck-controls">
        <Button variant="outline" size="icon" aria-label="Previous slide" disabled={slide === 1} onClick={() => go(slide - 1)}><ArrowLeft /></Button>
        <div className="deck-progress" aria-label={`Slide ${slide} of ${slides.length}`}>
          {slides.map((item, index) => <button key={item.title} aria-label={`Go to slide ${index + 1}`} className={index === current ? "active" : ""} onClick={() => go(index + 1)} />)}
        </div>
        <span className="deck-counter">{String(slide).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <Button variant="outline" size="icon" aria-label="Next slide" disabled={slide === slides.length} onClick={() => go(slide + 1)}><ArrowRight /></Button>
      </div>
    </div>
  );
}

function ScaledSlide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const resize = () => parent.style.setProperty("--deck-scale", String(Math.min(parent.clientWidth / 1920, parent.clientHeight / 1080)));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="slide-wrapper">{children}</div>;
}

function SlideFrame({ children, index }: { children: ReactNode; index: number }) {
  return <section className="slide-content"><div className="slide-top"><div className="slide-logo"><Sparkles /> Friend<span>Ease</span></div><div className="slide-page">0{index + 1} / 07</div></div>{children}<div className="slide-footer"><span>Private by design</span><span>friendease-connect.lovable.app</span></div></section>;
}

function CoverSlide() {
  return <div className="slide-cover"><img src={heroAsset.url} alt="Friends planning an accessible outing together" /><div className="slide-cover-shade"/><div className="slide-cover-copy"><div className="slide-badge"><LockKeyhole /> Zero-disclosure social coordination</div><h1 className="slide-title-lg">Social plans that work for everybody.</h1><p className="slide-body-lg">FriendEase privately matches accessibility preferences with places the whole group can enjoy.</p></div></div>;
}

function ProblemSlide() {
  return <div className="slide-body-area slide-problem"><div><p className="slide-kicker">Designed around dignity</p><h1 className="slide-title">Accessibility should not require repeated disclosure.</h1><p className="slide-body-lg slide-muted">People should be able to shape a workable social plan without sharing medical or disability requirements with every venue—or every friend.</p></div><div className="privacy-orbit"><div className="privacy-core"><ShieldCheck /><strong>Private needs</strong><span>Stay with you</span></div><div className="orbit-item orbit-one"><UsersRound /> Group</div><div className="orbit-item orbit-two"><MapPin /> Venue</div><div className="orbit-item orbit-three"><Sparkles /> Match</div></div></div>;
}

function PreferencesSlide() {
  const needs = [[Volume2,"Low-noise environment","Required"],[Lightbulb,"Sensory-friendly lighting","Important"],[Accessibility,"Accessible seating","Required"]] as const;
  return <div className="slide-body-area slide-split"><div><p className="slide-kicker">Step 01 · Private preferences</p><h1 className="slide-title">Real needs, privately matched.</h1><p className="slide-body">Angie and Doug can set what helps their son Sammy feel at ease—without turning those details into a public profile.</p><div className="preference-list">{needs.map(([Icon,label,priority])=><div className="preference-row" key={label}><span className="preference-icon"><Icon /></span><strong>{label}</strong><span className="slide-badge">{priority}</span></div>)}</div></div><img className="slide-photo portrait" src={familyImage} alt="Family enjoying a calm café environment" /></div>;
}

function JourneySlide() {
  const steps = [[LockKeyhole,"Set preferences","Required, important, or nice to have"],[UsersRound,"Plan the outing","Place, date, and group size"],[Sparkles,"Resolve the match","Balance the whole group privately"],[Check,"Share the plan","Only outing details leave FriendEase"]] as const;
  return <div className="slide-body-area"><p className="slide-kicker">The FriendEase flow</p><h1 className="slide-title">One simple, private journey.</h1><div className="journey-grid">{steps.map(([Icon,title,text],index)=><div className="journey-step" key={title}><span className="journey-number">0{index+1}</span><Icon/><h2 className="slide-subtitle">{title}</h2><p className="slide-body">{text}</p></div>)}</div><div className="privacy-strip"><ShieldCheck/><strong>Accessibility constraints never appear in the shared recommendation.</strong></div></div>;
}

function RecommendationsSlide() {
  const cards = [{name:"Green Garden Café",place:"Richmond · 0.8 miles",score:94,image:gardenImage},{name:"Riverside Kitchen",place:"Kew · 1.4 miles",score:89,image:riversideImage},{name:"The Common Cup",place:"Chiswick · 2.1 miles",score:84,image:familyImage}];
  return <div className="slide-body-area"><p className="slide-kicker">Step 03 · Recommendations</p><h1 className="slide-title">Strong matches, clearly ranked.</h1><div className="venue-grid">{cards.map((card,index)=><div className={`venue-card ${index===0?"top":""}`} key={card.name}><div className="venue-image"><img src={card.image} alt={`${card.name} interior`}/>{index===0&&<span className="slide-badge">Top match</span>}</div><div className="venue-copy"><div><h2 className="slide-subtitle">{card.name}</h2><p className="slide-caption"><MapPin/> {card.place}</p></div><strong className="venue-score">{card.score}%<span>match</span></strong></div></div>)}</div></div>;
}

function WhySlide() {
  return <div className="slide-body-area slide-why"><div className="why-image"><img src={gardenImage} alt="Green Garden Café interior"/><span className="score-disc">94%<small>match</small></span></div><div><p className="slide-kicker">Green Garden Café</p><h1 className="slide-title">The “why” behind every match.</h1><p className="slide-body-lg">The wall aquarium provides visual engagement, while acoustic zoning keeps ambient noise low and predictable for Sammy.</p><div className="feature-grid"><span><Check/> Step-free entrance</span><span><Check/> Accessible restroom</span><span><Ear/> Quiet corner seating</span><span><Accessibility/> Wide table spacing</span></div></div></div>;
}

function ReadySlide() {
  return <div className="slide-ready"><div className="ready-copy"><div className="ready-check"><Check/></div><p className="slide-kicker">Plan confirmed</p><h1 className="slide-title-lg">Your outing is ready.</h1><p className="slide-body-lg">Green Garden Café · 26 Sep 2026 · 3 people</p><div className="share-note"><ShieldCheck/><div><strong>Safe to share</strong><span>Friends see the venue and outing—not anyone’s accessibility constraints.</span></div></div></div><img src={familyImage} alt="Family enjoying their day out together"/></div>;
}