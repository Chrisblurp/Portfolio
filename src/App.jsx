import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ─── TOKENS ─── */
const C = {
  bg:          "#FAFAF7",
  surface:     "#F3EFE8",
  card:        "#FFFFFF",
  border:      "#E8E1D6",
  borderHi:    "#D4C9B8",
  accent:      "#F26419",
  accentLight: "#F2641912",
  accentMid:   "#F2641940",
  text:        "#1C1815",
  sub:         "#6B5D50",
  muted:       "#B0A092",
  mutedLight:  "#D4C9B8",
  white:       "#FFFFFF",
};

/* ─── RESPONSIVE HOOK ─── */
function useW() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ─── BILINGUAL CONTENT ─── */
const CONTENT = {
  en: {
    nav:          ["about", "skills", "projects", "contact"],
    badge:        "● open to work",
    langBtn:      "DE 🇩🇪",
    heroLabel:    "— DevOps & Cloud Engineer",
    heroGreet:    "Hi, I'm",
    heroName:     "Christopher",
    heroSurname:  "Adeyemi.",
    heroPara:     "I build and automate scalable cloud infrastructure across AWS, Azure & GCP. Specialised in Kubernetes, CI/CD pipelines and Infrastructure-as-Code. Open to roles in Germany, the EU and internationally.",
    btnWork:      "See My Work",
    btnCVen:      "Resume (EN) ↗",
    btnCVde:      "Lebenslauf (DE) ↗",
    btnEmail:     "Email Me",
    statLabels:   ["Projects", "Cloud Platforms", "Tools & Stacks", "Passion"],
    aboutLabel:   "// About Me",
    aboutTitle:   "My Journey",
    aboutStory: [
      { icon:"🎓", heading:"University Background",         body:"I studied Business Administration at university — but technology has always been my true calling. From learning computer graphic design at 14, to teaching myself how to code at 16, the pull towards tech was undeniable. Alongside my studies, driven by a deep curiosity for how digital systems are built and how they can be made to work better, I enrolled in intensive programmes including the AYA Backend and ALT Africa Software Engineering bootcamps." },
      { icon:"💻", heading:"From Full-Stack Developer…",    body:"Alongside my formal education, I built and shipped full-stack applications using React, Node.js, Django, PHP (Laravel), PostgreSQL and MongoDB — entirely self-taught. I also served in the Nigerian Navy, working across departments including IT, Signal & Communications, and Navigation, where I gained real-world experience managing critical systems under pressure. That combination of operational discipline and hands-on engineering shaped how I think about infrastructure." },
      { icon:"☁️", heading:"…to DevOps & Cloud Engineer",   body:"The turning point came when I realised the bottleneck was never the code — it was the pipeline, the infrastructure and the delivery process. I retrained in cloud platforms, Kubernetes, Terraform and CI/CD systems. I now design and operate the infrastructure that lets engineering teams ship faster, safer and at scale." },
      { icon:"🇩🇪", heading:"Based in Germany",              body:"I am currently based in Braunschweig, Germany and actively seeking DevOps / Cloud Engineer roles across Germany, the EU and internationally. I am a native English speaker and I speak German at C1 level — a skill I work to sharpen every day." },
    ],
    skillsLabel:    "// Skills",
    skillsTitle:    "Tech Stack",
    projectsLabel:  "// Projects",
    projectsTitle:  "Selected Work",
    projectsHint:   "click to open on GitHub ↗",
    contactLabel:   "// Contact",
    contactTitle:   "Let's Build",
    contactItalic:  "Together.",
    contactPara:    "Open to DevOps & Cloud Engineer roles in Germany, the EU and internationally. Always happy to connect and talk infrastructure.",
    footer:         "Built by Chris",
  },
  de: {
    nav:          ["über mich", "fähigkeiten", "projekte", "kontakt"],
    badge:        "● offen für Stellen",
    langBtn:      "EN 🇬🇧",
    heroLabel:    "— DevOps & Cloud Engineer",
    heroGreet:    "Hallo, ich bin",
    heroName:     "Christopher",
    heroSurname:  "Adeyemi.",
    heroPara:     "Ich entwerfe und automatisiere skalierbare Cloud-Infrastrukturen auf AWS, Azure & GCP. Spezialisiert auf Kubernetes, CI/CD-Pipelines und Infrastructure-as-Code. Offen für Stellen in Deutschland, der EU und weltweit.",
    btnWork:      "Meine Projekte",
    btnCVen:      "Resume (EN) ↗",
    btnCVde:      "Lebenslauf (DE) ↗",
    btnEmail:     "E-Mail schreiben",
    statLabels:   ["Projekte", "Cloud-Plattformen", "Tools & Stacks", "Leidenschaft"],
    aboutLabel:   "// Über mich",
    aboutTitle:   "Mein Werdegang",
    aboutStory: [
      { icon:"🎓", heading:"Universitärer Hintergrund",         body:"Ich habe Betriebswirtschaftslehre studiert — doch Technologie war schon immer meine wahre Leidenschaft. Mit 14 Jahren lernte ich Computer-Grafikdesign, mit 16 brachte ich mir selbst das Programmieren bei. Parallel zu meinem Studium, angetrieben von tiefer Neugier für digitale Systeme, absolvierte ich intensive Programme wie den AYA Backend- und den ALT Africa Software-Engineering-Bootcamp." },
      { icon:"💻", heading:"Von der Full-Stack-Entwicklung…",    body:"Neben meinem Studium entwickelte und veröffentlichte ich vollständig autodidaktisch Full-Stack-Anwendungen mit React, Node.js, Django, PHP (Laravel), PostgreSQL und MongoDB. Außerdem diente ich in der nigerianischen Marine in den Bereichen IT, Signal & Kommunikation sowie Navigation — dort sammelte ich praktische Erfahrung im Betrieb kritischer Systeme unter Druck. Diese Kombination aus operativer Disziplin und technischem Handwerk prägt bis heute meine Denkweise als Infrastrukturingenieur." },
      { icon:"☁️", heading:"…zum DevOps & Cloud Engineer",       body:"Der Wendepunkt kam, als mir klar wurde: Der Engpass lag nie im Code — sondern in der Pipeline, der Infrastruktur und dem Delivery-Prozess. Ich bildete mich gezielt in Cloud-Plattformen, Kubernetes, Terraform und CI/CD-Systemen weiter. Heute entwerfe und betreibe ich die Infrastruktur, die es Teams ermöglicht, schneller, sicherer und in größerem Maßstab zu liefern." },
      { icon:"🇩🇪", heading:"Standort Deutschland",               body:"Ich lebe derzeit in Braunschweig und suche aktiv nach DevOps- / Cloud-Engineer-Stellen in Deutschland, der EU und weltweit. Englisch ist meine Muttersprache und ich spreche Deutsch auf C1-Niveau — eine Fähigkeit, die ich täglich weiter vertiefe." },
    ],
    skillsLabel:    "// Fähigkeiten",
    skillsTitle:    "Tech-Stack",
    projectsLabel:  "// Projekte",
    projectsTitle:  "Ausgewählte Projekte",
    projectsHint:   "klicken um auf GitHub zu öffnen ↗",
    contactLabel:   "// Kontakt",
    contactTitle:   "Gemeinsam",
    contactItalic:  "bauen.",
    contactPara:    "Offen für DevOps- & Cloud-Engineer-Stellen in Deutschland, der EU und weltweit. Ich freue mich jederzeit über einen Austausch rund um das Thema Infrastruktur.",
    footer:         "Erstellt by Chris",
  },
};

/* ─── PROJECTS —  ─── */
const PROJECTS = {
  en: [
    { n:"01", title:"Blood Donor Management System",  desc:"Full-stack app for managing blood donation records, donors and hospital requests. Containerised with Docker, deployed via Helm on Kubernetes with a full CI/CD pipeline.", tech:["Docker","Kubernetes","Helm","Django","CI/CD"],       url:"https://github.com/Chrisblurp/blood-donor-app",            img:"/projects/blood-donor.png" },
    { n:"02", title:"AKS Cloud-Native Platform",      desc:"Production Kubernetes platform on Azure with Helm, ArgoCD GitOps, Terraform IaC and Prometheus + Grafana observability.",                                             tech:["Azure AKS","Terraform","ArgoCD","Prometheus","Grafana"], url:"https://github.com/Chrisblurp/gitops-project.git",          img:"/projects/aks.png"         },
    { n:"03", title:"AWS ECS Blue-Green Deployment",  desc:"Zero-downtime deployment using ECS, ALB, Jenkins CI/CD, Terraform and CloudWatch monitoring.",                                                                         tech:["AWS ECS","Jenkins","Terraform","CloudWatch","ALB"],     url:"https://github.com/Chrisblurp/Blue-Green-Deploy.git",       img:"/projects/ecs.png"         },
    { n:"04", title:"Microservices DevOps Platform",  desc:"Distributed microservices architecture with Docker, Kubernetes, GitOps CI/CD and observability stack.",                                                                tech:["Kubernetes","Docker","GitOps","Prometheus","Helm"],     url:"https://github.com/Chrisblurp/Microservice-Project.git",   img:"/projects/microservices.png"},
    { n:"05", title:"Jenkins CI/CD Pipeline",         desc:"Automated Jenkins pipeline running in Docker with GitHub integration and auto deployment.",                                                                             tech:["Jenkins","Docker","GitHub"],                            url:"https://github.com/Chrisblurp/simple-devops-project.git",  img:"/projects/jenkins.png"     },
    { n:"06", title:"AWS DMS Migration Project",      desc:"On-premise to cloud database migration using AWS DMS and Terraform automation.",                                                                                        tech:["AWS DMS","Terraform","RDS","AWS"],                      url:"https://github.com/Chrisblurp/dms_migration.git",          img:"/projects/dms.gif"         },
  ],
  de: [
    { n:"01", title:"Blutspende-Verwaltungssystem",   desc:"Full-Stack-App zur Verwaltung von Blutspendeaufzeichnungen, Spendern und Krankenhausanfragen. Mit Docker containerisiert, per Helm auf Kubernetes deployt.",           tech:["Docker","Kubernetes","Helm","Django","CI/CD"],       url:"https://github.com/Chrisblurp/blood-donor-app",            img:"/projects/blood-donor.png" },
    { n:"02", title:"AKS Cloud-Native-Plattform",     desc:"Produktionsreife Kubernetes-Plattform auf Azure mit Helm, ArgoCD GitOps, Terraform IaC sowie Prometheus + Grafana.",                                                  tech:["Azure AKS","Terraform","ArgoCD","Prometheus","Grafana"], url:"https://github.com/Chrisblurp/gitops-project.git",       img:"/projects/aks.png"         },
    { n:"03", title:"AWS ECS Blue-Green-Deployment",  desc:"Zero-Downtime-Deployment-Pipeline mit ECS, ALB, Jenkins CI/CD, Terraform und CloudWatch-Monitoring.",                                                                 tech:["AWS ECS","Jenkins","Terraform","CloudWatch","ALB"],     url:"https://github.com/Chrisblurp/Blue-Green-Deploy.git",      img:"/projects/ecs.png"         },
    { n:"04", title:"Microservices DevOps-Plattform", desc:"Verteilte Microservices-Architektur mit Docker, Kubernetes, GitOps CI/CD und vollständigem Observability-Stack.",                                                      tech:["Kubernetes","Docker","GitOps","Prometheus","Helm"],     url:"https://github.com/Chrisblurp/Microservice-Project.git",  img:"/projects/microservices.png"},
    { n:"05", title:"Jenkins CI/CD-Pipeline",         desc:"Vollautomatische Pipeline mit Jenkins in Docker, GitHub-Integration und automatischem Deployment.",                                                                     tech:["Jenkins","Docker","GitHub"],                            url:"https://github.com/Chrisblurp/simple-devops-project.git", img:"/projects/jenkins.png"     },
    { n:"06", title:"AWS DMS Migrationsprojekt",      desc:"Migration von On-Premise auf die Cloud mit AWS DMS und Terraform, inkl. Datenverlust-Validierung.",                                                                    tech:["AWS DMS","Terraform","RDS","AWS"],                      url:"https://github.com/Chrisblurp/dms_migration.git",         img:"/projects/dms.gif"         },
  ],
};

const SKILLS = [
  { cat:"Cloud",         catDe:"Cloud",         items:["AWS","Azure","GCP"]                      },
  { cat:"Containers",    catDe:"Container",      items:["Docker","Kubernetes","Helm"]             },
  { cat:"IaC",           catDe:"IaC",            items:["Terraform","Ansible"]                   },
  { cat:"CI / CD",       catDe:"CI / CD",        items:["Jenkins","GitHub Actions","ArgoCD"]     },
  { cat:"Observability", catDe:"Observability",  items:["Prometheus","Grafana","CloudWatch"]     },
  { cat:"Scripting",     catDe:"Skripting",      items:["Bash","Python","Linux"]                 },
];

const TICKER = ["AWS","Azure","GCP","Kubernetes","Helm","Terraform","Jenkins","ArgoCD","Docker","Prometheus","Grafana","GitHub Actions","Ansible","Bash","Python","Linux"];

/* ─── CURSOR (desktop only) ─── */
function Cursor() {
  const [pos, setPos] = useState({ x:-100, y:-100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x:e.clientX, y:e.clientY });
    window.addEventListener("mousemove", move);
    const on  = () => setBig(true);
    const off = () => setBig(false);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <motion.div animate={{ x:pos.x-6,  y:pos.y-6,  scale:big?0:1   }} transition={{ type:"spring", stiffness:800, damping:40 }}
        style={{ position:"fixed", top:0, left:0, width:12,  height:12,  borderRadius:"50%", background:C.accent, pointerEvents:"none", zIndex:9999, mixBlendMode:"multiply" }} />
      <motion.div animate={{ x:pos.x-20, y:pos.y-20, scale:big?1.5:1 }} transition={{ type:"spring", stiffness:300, damping:30 }}
        style={{ position:"fixed", top:0, left:0, width:40,  height:40,  borderRadius:"50%", border:`1.5px solid ${C.accentMid}`, pointerEvents:"none", zIndex:9998 }} />
    </>
  );
}

/* ─── SCROLL BAR ─── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:200, damping:30 });
  return <motion.div style={{ position:"fixed", top:0, left:0, right:0, height:3, background:C.accent, transformOrigin:"left", scaleX, zIndex:200 }} />;
}

/* ─── COUNT UP ─── */
function CountUp({ end, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let i = 0;
        const id = setInterval(() => {
          i = Math.min(i + Math.ceil(end / 40), end);
          setVal(i);
          if (i >= end) clearInterval(id);
        }, 30);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── TAG ─── */
function Tag({ children, inverted }) {
  return (
    <span style={{
      fontSize:11, fontFamily:"'JetBrains Mono',monospace",
      padding:"3px 9px", borderRadius:4, whiteSpace:"nowrap", letterSpacing:".04em",
      background: inverted ? "rgba(255,255,255,.2)" : C.surface,
      border:`1px solid ${inverted ? "rgba(255,255,255,.3)" : C.border}`,
      color: inverted ? "#fff" : C.sub,
    }}>{children}</span>
  );
}

/* ─── BUTTONS ─── */
function SolidBtn({ href, children, target, fullWidth }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target?"noreferrer":undefined}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6,
               padding:".7rem 1.5rem", borderRadius:8, fontSize:13, fontWeight:700,
               fontFamily:"'Outfit',sans-serif", textDecoration:"none", letterSpacing:".02em",
               background:h?"#D4540F":C.accent, color:"#fff", transition:"background .15s",
               width:fullWidth?"100%":"auto" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{children}</a>
  );
}

function OutlineBtn({ href, children, target, fullWidth }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target?"noreferrer":undefined}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6,
               padding:".7rem 1.4rem", borderRadius:8, fontSize:13, fontWeight:600,
               fontFamily:"'Outfit',sans-serif", textDecoration:"none", letterSpacing:".02em",
               background:h?C.accentLight:"transparent", color:h?C.accent:C.sub,
               border:`1.5px solid ${h?C.accent:C.border}`, transition:"all .15s",
               width:fullWidth?"100%":"auto" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{children}</a>
  );
}

/* ─── PROJECT CARD —  ─── */
function ProjectCard({ p, i }) {
  const [h, setH] = useState(false);
  return (
    <motion.a
      href={p.url} target="_blank" rel="noreferrer"
      initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.45, delay:i*.08 }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ position:"relative", borderRadius:14, overflow:"hidden",
               border:`1.5px solid ${h?C.accentMid:C.border}`,
               background:C.card, textDecoration:"none", display:"block",
               transition:"border-color .2s, box-shadow .2s",
               boxShadow: h?"0 8px 32px rgba(242,100,25,.12)":"0 1px 4px rgba(0,0,0,.04)" }}
    >
      {/* Image */}
      <div style={{ width:"100%", height:180, overflow:"hidden", background:C.surface }}>
        <img src={p.img} alt={p.title}
          style={{ width:"100%", height:"100%", objectFit:"cover",
                   transform:h?"scale(1.07)":"scale(1)", transition:"transform .4s ease" }} />
      </div>

      {/* Orange top-border accent on hover */}
      <div style={{ height:3, background:h?C.accent:"transparent", transition:"background .2s" }} />

      {/* Content */}
      <div style={{ padding:"1.4rem", display:"flex", flexDirection:"column", gap:".875rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".1em" }}>{p.n}</span>
          <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:h?C.accent:C.muted, transition:"color .2s" }}>GitHub →</span>
        </div>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:C.text, lineHeight:1.3 }}>{p.title}</h3>
        <p style={{ fontSize:13, color:C.sub, lineHeight:1.65 }}>{p.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {p.tech.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </motion.a>
  );
}

/* ─── SKILL CARD ─── */
function SkillCard({ cat, items, i }) {
  const [h, setH] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.4, delay:i*.07 }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background:h?C.accent:C.card, border:`1.5px solid ${h?C.accent:C.border}`,
               borderRadius:12, padding:"1.25rem 1.5rem", transition:"all .2s" }}
    >
      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".14em", textTransform:"uppercase", marginBottom:".75rem", color:h?"rgba(255,255,255,.7)":C.accent }}>{cat}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:".4rem" }}>
        {items.map(t => (
          <span key={t} style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", padding:"3px 9px", borderRadius:4,
                                  border:`1px solid ${h?"rgba(255,255,255,.3)":C.border}`,
                                  background:h?"rgba(255,255,255,.15)":"transparent",
                                  color:h?"#fff":C.sub }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── ABOUT STORY CARD ─── */
function StoryCard({ icon, heading, body, i }) {
  return (
    <motion.div
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.45, delay:i*.1 }}
      style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"1.75rem", display:"flex", flexDirection:"column", gap:".75rem" }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
        <span style={{ fontSize:26 }}>{icon}</span>
        <h3 style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:17, color:C.text, lineHeight:1.2 }}>{heading}</h3>
      </div>
      <div style={{ width:36, height:2, background:C.accent, borderRadius:2 }} />
      <p style={{ fontSize:13.5, color:C.sub, lineHeight:1.85 }}>{body}</p>
    </motion.div>
  );
}

/* ─── PAGE ─── */
export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [active, setActive] = useState("about");
  const w = useW();
  const isMobile = w < 768;
  const isTablet = w < 1024;
  const t = CONTENT[lang];
  const projects = PROJECTS[lang];

  const PAD  = isMobile ? "1rem" : isTablet ? "1.5rem" : "max(1.5rem,calc(50vw - 520px))";
  const MAXW = 1040;

  useEffect(() => {
    const ids = ["about","skills","projects","contact"];
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if(e.isIntersecting) setActive(e.target.id); });
    }, { threshold:.35 });
    ids.forEach(id => { const el=document.getElementById(id); if(el) obs.observe(el); });
    return () => obs.disconnect();
  }, [lang]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;background:${C.bg}}
        body{background:${C.bg};color:${C.text};font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased}
        @media(min-width:768px){html{cursor:none}a,button{cursor:none}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:${C.surface}}
        ::-webkit-scrollbar-thumb{background:${C.accentMid};border-radius:3px}
        ::selection{background:${C.accent};color:#fff}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>

      {/* Custom cursor — desktop only */}
      {!isMobile && <Cursor />}
      <ScrollBar />

      {/* ── NAV ── */}
      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:`8px ${PAD}` }}>
        <div style={{
          background:"rgba(250,250,247,.92)", backdropFilter:"blur(16px)",
          borderRadius:12, border:`1px solid ${C.border}`,
          padding:isMobile?"0 1rem":"0 1.5rem",
          height:52, display:"flex", alignItems:"center", justifyContent:"space-between",
          boxShadow:"0 1px 24px rgba(0,0,0,.06)",
        }}>
          <span style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:18, color:C.text, letterSpacing:"-.02em", flexShrink:0 }}>
            C.<span style={{ color:C.accent }}>A</span>
          </span>

          {/* Nav links hidden on mobile */}
          {!isMobile && (
            <nav style={{ display:"flex", gap:".25rem" }}>
              {t.nav.map((label, idx) => (
                <a key={idx} href={`#${["about","skills","projects","contact"][idx]}`}
                  style={{ padding:".4rem .85rem", borderRadius:7, fontSize:13, fontWeight:600,
                           fontFamily:"'Outfit',sans-serif", textDecoration:"none", transition:"all .15s",
                           background:active===["about","skills","projects","contact"][idx]?C.accentLight:"transparent",
                           color:active===["about","skills","projects","contact"][idx]?C.accent:C.sub }}>
                  {label}
                </a>
              ))}
            </nav>
          )}

          <div style={{ display:"flex", gap:".5rem", alignItems:"center" }}>
            {!isMobile && (
              <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", background:C.accentLight, color:C.accent, border:`1px solid ${C.accentMid}`, padding:"5px 10px", borderRadius:6 }}>
                {t.badge}
              </span>
            )}
            {/* Language toggle */}
            <button onClick={() => setLang(l => l==="en"?"de":"en")}
              style={{ padding:"6px 12px", borderRadius:7, border:`1.5px solid ${C.accent}`,
                       background:C.accentLight, color:C.accent,
                       fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700,
                       cursor:"pointer", transition:"all .15s", flexShrink:0 }}>
              {t.langBtn}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:`80px ${PAD} 2rem` }}>
        <div style={{ width:"100%", maxWidth:MAXW, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:isMobile||isTablet?"1fr":"1fr 300px", gap:isMobile?"2.5rem":"4rem", alignItems:"center" }}>

            {/* LEFT — text */}
            <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, ease:[.16,1,.3,1] }}>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.2 }}
                style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:"1.25rem", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ display:"inline-block", width:28, height:1.5, background:C.accent, flexShrink:0 }} />
                {t.heroLabel}
              </motion.p>

              <h1 style={{ fontFamily:"'Fraunces',serif", fontWeight:900,
                           fontSize:isMobile?"clamp(38px,11vw,56px)":"clamp(44px,6vw,78px)",
                           lineHeight:.97, letterSpacing:"-.03em", color:C.text, marginBottom:"1.75rem" }}>
                {t.heroGreet}<br />
                <em style={{ fontStyle:"italic", color:C.accent }}>{t.heroName}</em><br />
                {t.heroSurname}
              </h1>

              <p style={{ fontSize:15, color:C.sub, lineHeight:1.9, maxWidth:440, marginBottom:"2.25rem" }}>
                {t.heroPara}
              </p>

              <div style={{ display:"flex", flexWrap:"wrap", gap:".65rem" }}>
                <SolidBtn href="#projects">{t.btnWork}</SolidBtn>
                <OutlineBtn href="/cv-en.pdf" target="_blank">{t.btnCVen}</OutlineBtn>
                <OutlineBtn href="/cv-de.pdf" target="_blank">{t.btnCVde}</OutlineBtn>
                <OutlineBtn href="mailto:adeyemi504@gmail.com">{t.btnEmail}</OutlineBtn>
              </div>
            </motion.div>

            {/* RIGHT — photo, always visible, responsive */}
            <motion.div
              initial={{ opacity:0, x:isMobile?0:30, y:isMobile?-20:0 }}
              animate={{ opacity:1, x:0, y:0 }}
              transition={{ duration:.7, delay:.15, ease:[.16,1,.3,1] }}
              style={{ position:"relative", display:"flex", justifyContent:"center",
                       order:isMobile?-1:0,
                       marginBottom:isMobile?"0":"0" }}>

              {/* Decorative blobs */}
              <div style={{ position:"absolute", top:-20, right: isMobile?"calc(50% - 100px)":"-10px", width:160, height:160, borderRadius:"60% 40% 70% 30% / 50% 60% 40% 50%", background:C.accent, opacity:.1 }} />
              <div style={{ position:"absolute", bottom:10, left: isMobile?"calc(50% - 55px)":"-10px", width:90, height:90, borderRadius:"50%", background:C.surface, border:`1px solid ${C.border}` }} />

              <img src="/me.png" alt="Christopher Adeyemi"
                style={{ position:"relative", zIndex:1,
                         width: isMobile?"65%":"100%",
                         maxWidth: isMobile?220:280,
                         display:"block",
                         objectFit:"contain", objectPosition:"top",
                         filter:"drop-shadow(0 20px 40px rgba(242,100,25,.15))" }} />

              {/* Floating badges — desktop only (would overflow on mobile) */}
              {!isMobile && (
                <>
                  <motion.div animate={{ y:[0,-7,0] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                    style={{ position:"absolute", zIndex:2, bottom:30, left:-10, background:C.card, border:`1.5px solid ${C.border}`, borderRadius:10, padding:".7rem .9rem", boxShadow:"0 8px 32px rgba(0,0,0,.08)" }}>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.muted }}>Status</p>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:C.text, marginTop:2 }}>
                      <span style={{ color:C.accent }}>●</span> Open to Work
                    </p>
                  </motion.div>

                  <motion.div animate={{ y:[0,7,0] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut", delay:.5 }}
                    style={{ position:"absolute", zIndex:2, top:20, right:-20, background:C.card, border:`1.5px solid ${C.border}`, borderRadius:10, padding:".7rem .9rem", boxShadow:"0 8px 32px rgba(0,0,0,.08)" }}>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.muted }}>Location</p>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12, color:C.text, marginTop:2 }}>Braunschweig, DE 🇩🇪</p>
                  </motion.div>
                </>
              )}

              {/* Mobile-only status pill under photo */}
              {isMobile && (
                <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
                              background:C.card, border:`1.5px solid ${C.border}`, borderRadius:20,
                              padding:"5px 14px", display:"flex", alignItems:"center", gap:6,
                              boxShadow:"0 4px 16px rgba(0,0,0,.07)", whiteSpace:"nowrap", zIndex:2 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#22C55E", display:"inline-block" }} />
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12, color:C.text }}>Open to Work</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* STATS */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.5 }}
            style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:"1px", background:C.border, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden", marginTop:"3rem" }}>
            {[{end:6,suffix:"+"},{end:3,suffix:""},{end:10,suffix:"+"},{end:100,suffix:"%"}].map(({ end, suffix }, i) => (
              <div key={i} style={{ background:C.card, padding:isMobile?"1rem":"1.25rem", textAlign:"center" }}>
                <p style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:isMobile?28:34, color:C.accent, lineHeight:1, letterSpacing:"-.02em" }}>
                  <CountUp end={end} suffix={suffix} />
                </p>
                <p style={{ fontSize:11, color:C.muted, marginTop:7, fontFamily:"'JetBrains Mono',monospace", letterSpacing:".06em" }}>{t.statLabels[i]}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ overflow:"hidden", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:".85rem 0", background:C.surface }}>
        <div style={{ display:"flex", animation:"ticker 24s linear infinite", width:"max-content" }}>
          {[0,1].map(ri=>(
            <div key={ri} style={{ display:"flex", gap:"2.5rem", paddingRight:"2.5rem" }}>
              {TICKER.map(t2=>(
                <span key={t2} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:C.muted, letterSpacing:".06em", whiteSpace:"nowrap" }}>
                  <span style={{ color:C.accent, marginRight:8 }}>✦</span>{t2}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT / STORY ── */}
      <section style={{ padding:`5rem ${PAD}` }}>
        <div style={{ maxWidth:MAXW, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45 }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:".6rem" }}>{t.aboutLabel}</p>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(28px,4vw,50px)", color:C.text, letterSpacing:"-.025em", marginBottom:"2.5rem", lineHeight:1.05 }}>{t.aboutTitle}</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:".875rem" }}>
            {t.aboutStory.map((s, i) => <StoryCard key={i} {...s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:`0 ${PAD} 5rem`, background:C.surface }}>
        <div style={{ maxWidth:MAXW, margin:"0 auto", paddingTop:"4rem" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45 }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:".6rem" }}>{t.skillsLabel}</p>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(28px,4vw,50px)", color:C.text, letterSpacing:"-.025em", marginBottom:"2.5rem", lineHeight:1.05 }}>{t.skillsTitle}</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3,1fr)", gap:".75rem" }}>
            {SKILLS.map((s,i) => (
              <SkillCard key={s.cat} cat={lang==="de"?s.catDe:s.cat} items={s.items} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:`5rem ${PAD}` }}>
        <div style={{ maxWidth:MAXW, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45 }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:".6rem" }}>{t.projectsLabel}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
              <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(28px,4vw,50px)", color:C.text, letterSpacing:"-.025em", lineHeight:1.05 }}>{t.projectsTitle}</h2>
              {!isMobile && <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.muted }}>{t.projectsHint}</p>}
            </div>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:".875rem" }}>
            {projects.map((p,i) => <ProjectCard key={p.n} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:`0 ${PAD} 6rem`, background:C.surface }}>
        <div style={{ maxWidth:MAXW, margin:"0 auto", paddingTop:"4rem" }}>
          <motion.div
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.5 }}
            style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:20, overflow:"hidden" }}
          >
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr" }}>
              {/* Left */}
              <div style={{ padding:isMobile?"2rem":"3rem" }}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:".6rem" }}>{t.contactLabel}</p>
                <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(26px,3.5vw,46px)", color:C.text, letterSpacing:"-.025em", lineHeight:1.05, marginBottom:".875rem" }}>
                  {t.contactTitle}<br /><em style={{ color:C.accent, fontStyle:"italic" }}>{t.contactItalic}</em>
                </h2>
                <p style={{ fontSize:14, color:C.sub, lineHeight:1.85 }}>{t.contactPara}</p>
              </div>
              {/* Right */}
              <div style={{ background:C.surface, borderLeft:isMobile?"none":`1px solid ${C.border}`, borderTop:isMobile?`1px solid ${C.border}`:"none", padding:isMobile?"2rem":"3rem", display:"flex", flexDirection:"column", gap:".75rem", justifyContent:"center" }}>
                <SolidBtn href="mailto:adeyemi504@gmail.com" fullWidth>✉ adeyemi504@gmail.com</SolidBtn>
                <OutlineBtn href="https://www.linkedin.com/in/christopher-adeyemi-44952923a/" target="_blank" fullWidth>LinkedIn ↗</OutlineBtn>
                <OutlineBtn href="https://github.com/Chrisblurp" target="_blank" fullWidth>GitHub ↗</OutlineBtn>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".75rem" }}>
                  <OutlineBtn href="/cv-en.pdf" target="_blank" fullWidth>Resume (EN) ↗</OutlineBtn>
                  <OutlineBtn href="/cv-de.pdf" target="_blank" fullWidth>Lebenslauf (DE) ↗</OutlineBtn>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:isMobile?`1.25rem ${PAD}`:`1.5rem ${PAD}`, display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"1rem" }}>
        <span style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:16, color:C.text }}>C.<span style={{ color:C.accent }}>A</span></span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.muted }}>© 2025 Christopher Adeyemi · {t.footer}</span>
        <div style={{ display:"flex", gap:"1rem" }}>
          {[["https://www.linkedin.com/in/christopher-adeyemi-44952923a/","LinkedIn"],["https://github.com/Chrisblurp","GitHub"]].map(([href,label])=>(
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.muted, textDecoration:"none" }}>{label} ↗</a>
          ))}
        </div>
      </footer>
    </>
  );
}