import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { z } from "zod";
import {
  ArrowRight, ArrowUp, ArrowUpRight, Brain, Code2, Lightbulb, Mail, Puzzle, Rocket, Send, ShieldCheck, Terminal, CheckCircle2,
} from "lucide-react";
import { profile, languages, interests, projects, repositories, journey } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhavishya Patil — CS Engineering Student & Aspiring Developer" },
      { name: "description", content: "Portfolio of Bhavishya Patil: Computer Science Engineering student building projects in Python, C, C++, AI and cybersecurity." },
      { property: "og:title", content: "Bhavishya Patil — Developer in the Making" },
      { property: "og:description", content: "A problem solver by mindset and a builder driven by curiosity. Explore projects in Python, C/C++, AI and cybersecurity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["home", "about", "skills", "projects", "journey", "contact"] as const;

function GithubIcon({ className = "size-5" }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.9 18 5.2 18 5.2c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>);
}
function LinkedinIcon({ className = "size-5" }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/></svg>);
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="reveal mb-14">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">{eyebrow}</p>
        <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Nav() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav aria-label="Main" className="glass mx-auto flex max-w-4xl items-center justify-between rounded-full px-4 py-2">
        <a href="#home" className="font-display text-lg font-bold"><span className="text-gradient">BP</span><span className="text-muted-foreground">.dev</span></a>
        <ul className="hidden gap-1 md:flex">
          {NAV.map((id) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${active === id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {id}
                {active === id && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-brand" />}
              </a>
            </li>
          ))}
        </ul>
        <button className="rounded-full px-3 py-1.5 text-sm md:hidden" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      </nav>
      {open && (
        <ul className="glass mx-auto mt-2 max-w-4xl rounded-2xl p-2 md:hidden">
          {NAV.map((id) => (<li key={id}><a onClick={() => setOpen(false)} href={`#${id}`} className={`block rounded-xl px-4 py-3 capitalize ${active === id ? "bg-secondary" : ""}`}>{id}</a></li>))}
        </ul>
      )}
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-8 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary/30" />
      <div className="absolute inset-10 animate-spin-slow rounded-full border border-accent/20 [animation-direction:reverse]" />
      <div className="glass glow absolute inset-16 flex animate-float flex-col justify-center rounded-3xl p-6 font-mono text-sm">
        <div className="mb-4 flex gap-1.5"><span className="size-2.5 rounded-full bg-destructive" /><span className="size-2.5 rounded-full bg-primary" /><span className="size-2.5 rounded-full bg-cyan" /></div>
        <p><span className="text-primary">class</span> <span className="text-cyan">Developer</span>:</p>
        <p className="pl-4"><span className="text-primary">def</span> <span className="text-accent">mindset</span>(self):</p>
        <p className="pl-8 text-muted-foreground">return <span className="text-cyan">"solve → build → learn"</span></p>
        <p className="mt-3 text-muted-foreground"># loading curiosity<span className="animate-pulse">_</span></p>
      </div>
      <div className="glass absolute left-0 top-10 animate-float rounded-2xl p-3 [animation-delay:1s]"><Brain className="size-6 text-primary" /></div>
      <div className="glass absolute bottom-12 right-0 animate-float rounded-2xl p-3 [animation-delay:2s]"><ShieldCheck className="size-6 text-cyan" /></div>
      <div className="glass absolute -bottom-2 left-12 animate-float rounded-2xl p-3 [animation-delay:3s]"><Terminal className="size-6 text-accent" /></div>
    </div>
  );
}

const btnPrimary = "group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground glow transition-transform hover:-translate-y-0.5";
const btnGhost = "inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-semibold transition-colors hover:border-primary/50";

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -left-40 top-20 size-96 animate-drift rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 size-96 animate-drift rounded-full bg-accent/15 blur-3xl [animation-delay:4s]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.2fr_1fr]">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <p className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-75" /><span className="relative size-2 rounded-full bg-cyan" /></span>
            Computer Science Engineering Student | Aspiring Developer
          </p>
          <h1>
            <span className="block font-mono text-sm tracking-[0.4em] text-muted-foreground">BHAVISHYA PATIL</span>
            <span className="mt-4 block text-5xl font-extrabold leading-[1.05] md:text-7xl">Building Digital Experiences. <span className="text-gradient">Solving Real-World Problems.</span></span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">I'm a Computer Science Engineering student passionate about software development, Python programming, artificial intelligence, cybersecurity, and creating technology that makes a difference.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className={btnPrimary}>Explore My Projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
            <a href="#contact" className={btnGhost}>Let's Connect</a>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function About() {
  const cards = [
    { icon: Puzzle, t: "Problem Solver", d: "I enjoy breaking down complex problems into manageable solutions." },
    { icon: Lightbulb, t: "Continuous Learner", d: "I consistently explore new technologies and improve my technical skills." },
    { icon: Rocket, t: "Creative Builder", d: "I enjoy turning ideas into functional projects and useful digital experiences." },
  ];
  return (
    <Section id="about" eyebrow="01 — About" title="A Little About Me">
      <p className="reveal mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        I got into programming because I love the moment a messy problem finally clicks into a clean solution. Today I'm studying Computer Science Engineering and spending my time writing Python, C and C++, exploring <span className="text-foreground">artificial intelligence</span> and <span className="text-foreground">cybersecurity</span>, and building small, practical projects that sharpen how I think. I'm a developer in the making — a problem solver by mindset, and a builder driven by curiosity.
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, t, d }, i) => (
          <article key={t} className="reveal glass group rounded-2xl p-7 transition-all hover:-translate-y-1 hover:glow" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="mb-5 inline-flex rounded-xl bg-gradient-brand p-3 text-primary-foreground"><Icon className="size-5" /></div>
            <h3 className="mb-2 text-xl font-semibold">{t}</h3>
            <p className="text-muted-foreground">{d}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="02 — Skills" title={<>Tools I <span className="text-gradient">Think In</span></>}>
      <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="reveal glass rounded-2xl p-7">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold"><Code2 className="size-5 text-primary" /> Programming Languages</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {languages.map((l) => (
              <div key={l.name} className="rounded-xl border bg-secondary/40 p-5 transition-colors hover:border-primary/50">
                <p className="font-mono text-2xl font-bold text-gradient">{l.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{l.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal glass rounded-2xl p-7">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold"><Brain className="size-5 text-cyan" /> Areas of Interest</h3>
          <ul className="flex flex-wrap gap-2.5">
            {interests.map((x) => (<li key={x} className="rounded-full border px-4 py-2 text-sm transition-colors hover:border-cyan/60 hover:text-cyan">{x}</li>))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="03 — Projects" title="Things I've Built">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <article key={p.title} className="reveal glass group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1.5 hover:glow" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b bg-secondary/60" role="img" aria-label={`Preview artwork for ${p.title}`}>
              <div className="grid-bg absolute inset-0" />
              <div className="absolute size-40 rounded-full bg-gradient-brand opacity-30 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <span className="relative font-mono text-3xl font-bold text-gradient transition-transform duration-500 group-hover:scale-110">{p.glyph}</span>
              <span className={`absolute right-3 top-3 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${p.status === "Concept" ? "border border-primary/50 text-primary" : "border border-cyan/50 text-cyan"}`}>{p.status === "Concept" ? "Concept / Prototype" : "Working Code"}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm"><span className="font-semibold text-cyan">Problem: </span><span className="text-muted-foreground">{p.problem}</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs">{t}</li>)}</ul>
              <div className="mt-auto flex gap-3 pt-6">
                {p.projectUrl ? <a href={p.projectUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">View Project <ArrowUpRight className="size-4" /></a>
                  : <span className="text-sm text-muted-foreground">Demo coming soon</span>}
                {p.sourceUrl && <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold hover:text-cyan"><GithubIcon className="size-4" /> View Source Code</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function GitHubSection() {
  return (
    <Section id="github" eyebrow="04 — Open Source" title={<>Code. Learn. <span className="text-gradient">Improve.</span></>}>
      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="reveal glass glow flex flex-col justify-between rounded-2xl p-8">
          <div>
            <GithubIcon className="size-10" />
            <p className="mt-5 text-muted-foreground">Everything I practise ends up on GitHub — programs, experiments and documentation of what I learn along the way.</p>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className={`${btnPrimary} mt-8 self-start`}>Explore my repositories <ArrowUpRight className="size-4" /></a>
        </div>
        <div className="grid gap-4">
          {repositories.map((r) => (
            <a key={r.name} href={profile.github} target="_blank" rel="noreferrer" className="reveal glass group rounded-2xl p-6 transition-colors hover:border-primary/50">
              <div className="flex items-center justify-between"><p className="font-mono font-semibold">{r.name}</p><ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
              <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2.5 rounded-full bg-cyan" />{r.language}</p>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Journey() {
  return (
    <Section id="journey" eyebrow="05 — Journey" title="My Journey So Far">
      <ol className="relative ml-3 border-l border-primary/30">
        {journey.map((j, i) => (
          <li key={i} className="reveal relative mb-10 pl-10 last:mb-0">
            <span className="absolute -left-[7px] top-1.5 size-3.5 rounded-full bg-gradient-brand glow" />
            <p className="font-mono text-xs uppercase tracking-widest text-cyan">{j.date}</p>
            <h3 className="mt-1 text-xl font-semibold">{j.title}</h3>
            <p className="mt-1 text-muted-foreground">{j.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({});
    const body = encodeURIComponent(`${r.data.message}\n\n— ${r.data.name} (${r.data.email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio enquiry from " + r.data.name)}&body=${body}`;
    setSent(true);
    e.currentTarget.reset();
  }
  const input = "w-full rounded-xl border bg-secondary/50 px-4 py-3 outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
  return (
    <Section id="contact" eyebrow="06 — Contact" title={<>Have an Idea? <span className="text-gradient">Let's Build Something.</span></>}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="reveal">
          <p className="text-lg text-muted-foreground">I'm always interested in learning, collaborating on meaningful projects, and connecting with people who enjoy building innovative technology.</p>
          <div className="mt-8 grid gap-3">
            {[
              { href: `mailto:${profile.email}`, label: profile.email, icon: <Mail className="size-5" /> },
              { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
              { href: profile.github, label: "GitHub", icon: <GithubIcon /> },
            ].map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-primary/50">
                <span className="rounded-xl bg-secondary p-2.5 text-cyan">{l.icon}</span>{l.label}<ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={submit} noValidate className="reveal glass space-y-4 rounded-2xl p-7">
          {sent ? (
            <div role="status" className="flex flex-col items-center py-12 text-center">
              <CheckCircle2 className="size-12 text-cyan" />
              <p className="mt-4 text-xl font-semibold">Thanks for reaching out!</p>
              <p className="mt-1 text-muted-foreground">Your email app should open with the message ready to send.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm text-primary hover:underline">Send another message</button>
            </div>
          ) : (<>
            {(["name", "email"] as const).map((f) => (
              <div key={f}>
                <label htmlFor={f} className="mb-1.5 block text-sm capitalize">{f}</label>
                <input id={f} name={f} type={f === "email" ? "email" : "text"} maxLength={f === "email" ? 255 : 100} className={input} aria-invalid={!!errors[f]} placeholder={f === "email" ? "you@example.com" : "Your name"} />
                {errors[f] && <p className="mt-1 text-sm text-destructive">{errors[f]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm">Message</label>
              <textarea id="message" name="message" rows={5} maxLength={1000} className={input} aria-invalid={!!errors.message} placeholder="Tell me about your idea…" />
              {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className={`${btnPrimary} w-full justify-center`}>Send Message <Send className="size-4" /></button>
          </>)}
        </form>
      </div>
    </Section>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 700); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  if (!show) return null;
  return <a href="#home" aria-label="Back to top" className="glass glow fixed bottom-6 right-6 z-40 rounded-full p-3 transition-transform hover:-translate-y-1"><ArrowUp className="size-5" /></a>;
}

function Index() {
  useReveal();
  return (
    <div className="overflow-x-hidden">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-primary focus:px-4 focus:py-2">Skip to content</a>
      <Nav />
      <main>
        <Hero /><About /><Skills /><Projects /><GitHubSection /><Journey /><Contact />
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} <span className="text-foreground">Bhavishya Patil</span> · Developer in the making.</p>
          <div className="flex gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground"><GithubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground"><LinkedinIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-foreground"><Mail className="size-5" /></a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
