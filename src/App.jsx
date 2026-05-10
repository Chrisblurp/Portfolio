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

/* ─── DATA ─── */
const PROJECTS = [
  {
    n:"01",
    title:"Blood Donor Management System",
    desc:"Full-stack app for managing blood donation records, donors and hospital requests. Containerised with Docker, deployed via Helm on Kubernetes with a full CI/CD pipeline.",
    tech:["Docker","Kubernetes","Helm","Django","CI/CD"],
    url:"https://github.com/Chrisblurp/blood-donor-app",
    img:"/projects/blood-donor.png"
  },
  {
    n:"02",
    title:"AKS Cloud-Native Platform",
    desc:"Production Kubernetes platform on Azure with Helm, ArgoCD GitOps, Terraform IaC and Prometheus + Grafana observability.",
    tech:["Azure AKS","Terraform","ArgoCD","Prometheus","Grafana"],
    url:"https://github.com/Chrisblurp/gitops-project.git",
    img:"/projects/aks.png"
  },
  {
    n:"03",
    title:"AWS ECS Blue-Green Deployment",
    desc:"Zero-downtime deployment using ECS, ALB, Jenkins CI/CD, Terraform and CloudWatch monitoring.",
    tech:["AWS ECS","Jenkins","Terraform","CloudWatch","ALB"],
    url:"https://github.com/Chrisblurp/Blue-Green-Deploy.git",
    img:"/projects/ecs.png"
  },
  {
    n:"04",
    title:"Microservices DevOps Platform",
    desc:"Distributed microservices architecture with Docker, Kubernetes, GitOps CI/CD and observability stack.",
    tech:["Kubernetes","Docker","GitOps","Prometheus","Helm"],
    url:"https://github.com/Chrisblurp/Microservice-Project.git",
    img:"/projects/microservices.png"
  },
  {
    n:"05",
    title:"Jenkins CI/CD Pipeline",
    desc:"Automated Jenkins pipeline running in Docker with GitHub integration and auto deployment.",
    tech:["Jenkins","Docker","GitHub"],
    url:"https://github.com/Chrisblurp/simple-devops-project.git",
    img:"/projects/jenkins.png"
  },
  {
    n:"06",
    title:"AWS DMS Migration Project",
    desc:"On-premise to cloud database migration using AWS DMS and Terraform automation.",
    tech:["AWS DMS","Terraform","RDS","AWS"],
    url:"https://github.com/Chrisblurp/dms_migration.git",
    img:"/projects/dms.gif"
  }
];

const SKILLS = [
  { cat:"Cloud",         items:["AWS","Azure","GCP"]                          },
  { cat:"Containers",    items:["Docker","Kubernetes","Helm"]                 },
  { cat:"IaC",           items:["Terraform","Ansible"]                        },
  { cat:"CI / CD",       items:["Jenkins","GitHub Actions","ArgoCD"]          },
  { cat:"Observability", items:["Prometheus","Grafana","CloudWatch"]          },
  { cat:"Scripting",     items:["Bash","Python","Linux"]                      },
];

const TICKER = ["AWS","Azure","GCP","Kubernetes","Helm","Terraform","Jenkins","ArgoCD","Docker","Prometheus","Grafana","GitHub Actions","Ansible","Bash","Python","Linux"];

const STATS = [
  { end:6,   suffix:"+", label:"Projects"        },
  { end:3,   suffix:"",  label:"Cloud Platforms" },
  { end:10,  suffix:"+", label:"Tools & Stacks"  },
  { end:100, suffix:"%", label:"Passion"         },
];

/* ─── CURSOR ─── */
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const on   = () => setBig(true);
    const off  = () => setBig(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <motion.div
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: big ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 40 }}
        style={{ position:"fixed", top:0, left:0, width:12, height:12, borderRadius:"50%", background:C.accent, pointerEvents:"none", zIndex:9999, mixBlendMode:"multiply" }}
      />
      <motion.div
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: big ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:`1.5px solid ${C.accentMid}`, pointerEvents:"none", zIndex:9998 }}
      />
    </>
  );
}

/* ─── SCROLL PROGRESS BAR ─── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div style={{
      position:"fixed", top:0, left:0, right:0, height:3, background:C.accent,
      transformOrigin:"left", scaleX, zIndex:200,
    }} />
  );
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
        const step = Math.ceil(end / 40);
        const id = setInterval(() => {
          i = Math.min(i + step, end);
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

/* ─── PILL TAG ─── */
function Tag({ children }) {
  return (
    <span style={{
      fontSize:11, fontFamily:"'JetBrains Mono',monospace",
      padding:"3px 10px", borderRadius:4,
      background:C.surface, border:`1px solid ${C.border}`,
      color:C.sub, whiteSpace:"nowrap", letterSpacing:".04em",
    }}>{children}</span>
  );
}

/* ─── BUTTONS ─── */
function SolidBtn({ href, children, target }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target?"noreferrer":undefined}
      style={{ display:"inline-flex", alignItems:"center", gap:6, padding:".7rem 1.6rem", borderRadius:8,
               fontSize:13, fontWeight:700, fontFamily:"'Outfit',sans-serif", textDecoration:"none",
               background: h ? "#D4540F" : C.accent, color:"#fff", transition:"background .15s", letterSpacing:".02em" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{children}</a>
  );
}

function OutlineBtn({ href, children, target }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target?"noreferrer":undefined}
      style={{ display:"inline-flex", alignItems:"center", gap:6, padding:".7rem 1.4rem", borderRadius:8,
               fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif", textDecoration:"none",
               background: h ? C.accentLight : "transparent",
               color: h ? C.accent : C.sub,
               border:`1.5px solid ${h ? C.accent : C.border}`, transition:"all .15s", letterSpacing:".02em" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{children}</a>
  );
}

/* ─── PROJECT CARD (hover reveal) ─── */
function ProjectCard({ p, i }) {
  const [h, setH] = useState(false);

  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:.45, delay:i*.08 }}
      onMouseEnter={()=>setH(true)}
      onMouseLeave={()=>setH(false)}
      style={{
        position:"relative",
        borderRadius:14,
        overflow:"hidden",
        border:`1.5px solid ${h ? C.accentMid : C.border}`,
        background:C.card,
        textDecoration:"none",
        display:"block",
        cursor:"pointer"
      }}
    >

      {/* IMAGE PREVIEW */}
      <div style={{
        width:"100%",
        height:180,
        overflow:"hidden",
        background:"#f0f0f0"
      }}>
        <img
          src={p.img}
          alt={p.title}
          style={{
            width:"100%",
            height:"100%",
            objectFit:"cover",
            transform:h ? "scale(1.08)" : "scale(1)",
            transition:"transform .4s ease"
          }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:11,
            color:C.accent
          }}>
            {p.n}
          </span>

          <span style={{
            fontSize:11,
            fontFamily:"'JetBrains Mono',monospace",
            color:C.muted
          }}>
            GitHub →
          </span>
        </div>

        <h3 style={{
          fontFamily:"'Outfit',sans-serif",
          fontWeight:700,
          fontSize:16,
          color:C.text,
          lineHeight:1.3
        }}>
          {p.title}
        </h3>

        <p style={{
          fontSize:13,
          color:C.sub,
          lineHeight:1.6
        }}>
          {p.desc}
        </p>

        <div style={{
          display:"flex",
          flexWrap:"wrap",
          gap:6
        }}>
          {p.tech.map(t => (
            <span
              key={t}
              style={{
                fontSize:11,
                fontFamily:"'JetBrains Mono',monospace",
                padding:"3px 8px",
                borderRadius:4,
                background:C.surface,
                border:`1px solid ${C.border}`,
                color:C.sub
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
/* ─── SKILL CARD (hover highlight) ─── */
function SkillCard({ cat, items, i }) {
  const [h, setH] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.4, delay:i*.07 }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background: h ? C.accent : C.card, border:`1.5px solid ${h ? C.accent : C.border}`,
               borderRadius:12, padding:"1.5rem 1.75rem", transition:"all .2s" }}
    >
      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".14em", textTransform:"uppercase", marginBottom:".85rem", color: h ? "rgba(255,255,255,.7)" : C.accent }}>{cat}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
        {items.map(t=>(
          <span key={t} style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", padding:"4px 10px", borderRadius:4, border:`1px solid ${h?"rgba(255,255,255,.3)":C.border}`, background: h?"rgba(255,255,255,.15)":"transparent", color: h?"#fff":C.sub }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── PAGE ─── */
export default function Portfolio() {
  const PAD = "max(1.5rem,calc(50vw - 500px))";

  /* Active nav section tracking */
  const [active, setActive] = useState("about");
  useEffect(() => {
    const ids = ["about","skills","projects","contact"];
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if(e.isIntersecting) setActive(e.target.id); });
    }, { threshold:.4 });
    ids.forEach(id => { const el=document.getElementById(id); if(el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;background:${C.bg};cursor:none}
        body{background:${C.bg};color:${C.text};font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased}
        a,button{cursor:none}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${C.surface}}
        ::-webkit-scrollbar-thumb{background:${C.accentMid};border-radius:4px}
        ::selection{background:${C.accent};color:#fff}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>

      <Cursor />
      <ScrollBar />

      {/* ── NAV ── */}
      <header style={{ position:"fixed", top:3, left:0, right:0, zIndex:100, padding:`0 ${PAD}` }}>
        <div style={{ background:"rgba(250,250,247,.88)", backdropFilter:"blur(16px)", borderRadius:12, border:`1px solid ${C.border}`, padding:"0 1.5rem", height:52, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 24px rgba(0,0,0,.06)" }}>
          <span style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:18, color:C.text, letterSpacing:"-.02em" }}>
            C.<span style={{ color:C.accent }}>A</span>
          </span>
          <nav style={{ display:"flex", gap:"0.25rem" }}>
            {[["#about","about"],["#skills","skills"],["#projects","projects"],["#contact","contact"]].map(([href,label])=>(
              <a key={href} href={href} style={{ padding:".4rem .85rem", borderRadius:7, fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif", textDecoration:"none", transition:"all .15s", background: active===label ? C.accentLight : "transparent", color: active===label ? C.accent : C.sub }}>
                {label}
              </a>
            ))}
          </nav>
          <span style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", background:C.accentLight, color:C.accent, border:`1px solid ${C.accentMid}`, padding:"5px 12px", borderRadius:6 }}>
            ● open to work
          </span>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:`80px ${PAD} 2rem` }}>
        <div style={{ width:"100%", maxWidth:1000, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:"5rem", alignItems:"center" }}>

            {/* LEFT */}
            <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, ease:[.16,1,.3,1] }}>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.2 }}
                style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:C.accent, letterSpacing:".18em", textTransform:"uppercase", marginBottom:"1.25rem", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ display:"inline-block", width:28, height:1.5, background:C.accent }} />
                DevOps &amp; Cloud Engineer
              </motion.p>

              <h1 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(46px,6.5vw,82px)", lineHeight:.95, letterSpacing:"-.03em", color:C.text, marginBottom:"1.75rem" }}>
                Hi, I'm<br />
                <em style={{ fontStyle:"italic", color:C.accent }}>Christopher</em><br />
                Adeyemi.
              </h1>

              <p style={{ fontSize:15, color:C.sub, lineHeight:1.9, maxWidth:430, marginBottom:"2.25rem" }}>
                I build and automate scalable cloud infrastructure across AWS, Azure &amp; GCP.
                Specialised in Kubernetes, CI/CD pipelines and Infrastructure-as-Code.
                Open to roles in <strong style={{ color:C.text, fontWeight:600 }}>Germany, EU &amp; USA</strong>.
              </p>

              <div style={{ display:"flex", flexWrap:"wrap", gap:".75rem" }}>
                <SolidBtn href="#projects">See My Work</SolidBtn>
                <OutlineBtn href="/cv-en.pdf" target="_blank">Resume (EN) ↗</OutlineBtn>
                <OutlineBtn href="/cv-de.pdf" target="_blank">Lebenslauf (DE) ↗</OutlineBtn>
                <OutlineBtn href="mailto:adeyemi504@gmail.com">Email Me</OutlineBtn>
              </div>
            </motion.div>

            {/* RIGHT — photo, no frame */}
            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, delay:.15, ease:[.16,1,.3,1] }}
              style={{ position:"relative" }}>
              {/* Decorative orange blob behind photo */}
              <div style={{ position:"absolute", top:-20, right:-20, width:200, height:200, borderRadius:"60% 40% 70% 30% / 50% 60% 40% 50%", background:C.accent, opacity:.12, zIndex:0 }} />
              <div style={{ position:"absolute", bottom:10, left:-15, width:120, height:120, borderRadius:"50%", background:C.surface, border:`1px solid ${C.border}`, zIndex:0 }} />

              <img src="/me.png" alt="Christopher Adeyemi"
                style={{ position:"relative", zIndex:1, width:"100%", display:"block", objectFit:"contain", objectPosition:"top", filter:"drop-shadow(0 20px 40px rgba(242,100,25,.15))" }} />

              {/* Floating badge */}
              <motion.div
                animate={{ y:[0,-6,0] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                style={{ position:"absolute", zIndex:2, bottom:30, left:-20, background:C.card, border:`1.5px solid ${C.border}`, borderRadius:10, padding:".75rem 1rem", boxShadow:"0 8px 32px rgba(0,0,0,.08)" }}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.muted }}>Status</p>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:C.text, marginTop:2 }}>
                  <span style={{ color:C.accent }}>●</span> Open to Work
                </p>
              </motion.div>

              <motion.div
                animate={{ y:[0,6,0] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut", delay:.5 }}
                style={{ position:"absolute", zIndex:2, top:20, right:-25, background:C.card, border:`1.5px solid ${C.border}`, borderRadius:10, padding:".75rem 1rem", boxShadow:"0 8px 32px rgba(0,0,0,.08)" }}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.muted }}>Location</p>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:C.text, marginTop:2 }}>Braunschweig, DE</p>
              </motion.div>
            </motion.div>
          </div>

          {/* STATS */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.5 }}
            style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:C.border, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden", marginTop:"4rem" }}>
            {STATS.map(({ end, suffix, label }) => (
              <div key={label} style={{ background:C.card, padding:"1.5rem", textAlign:"center" }}>
                <p style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:36, color:C.accent, lineHeight:1, letterSpacing:"-.02em" }}>
                  <CountUp end={end} suffix={suffix} />
                </p>
                <p style={{ fontSize:12, color:C.muted, marginTop:8, fontFamily:"'JetBrains Mono',monospace", letterSpacing:".06em" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ overflow:"hidden", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:".9rem 0", background:C.surface }}>
        <div style={{ display:"flex", animation:"ticker 24s linear infinite", width:"max-content" }}>
          {[0,1].map(ri=>(
            <div key={ri} style={{ display:"flex", gap:"2.5rem", paddingRight:"2.5rem" }}>
              {TICKER.map(t=>(
                <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:C.muted, letterSpacing:".06em", whiteSpace:"nowrap" }}>
                  <span style={{ color:C.accent, marginRight:8 }}>✦</span>{t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:`6rem ${PAD}` }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45 }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:".6rem" }}>// Skills</p>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(30px,4vw,52px)", color:C.text, letterSpacing:"-.025em", marginBottom:"3rem", lineHeight:1.05 }}>
              Tech Stack
            </h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".875rem" }}>
            {SKILLS.map((s,i)=><SkillCard key={s.cat} {...s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:`0 ${PAD} 6rem`, background:C.surface }}>
        <div style={{ maxWidth:1000, margin:"0 auto", paddingTop:"4rem" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45 }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:".6rem" }}>// Projects</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"3rem" }}>
              <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(30px,4vw,52px)", color:C.text, letterSpacing:"-.025em", lineHeight:1.05 }}>Selected Work</h2>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.muted }}>hover to reveal ↗</p>
            </div>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".875rem" }}>
            {PROJECTS.map((p,i)=><ProjectCard key={p.n} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:`6rem ${PAD} 8rem` }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.5 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center", background:C.card, borderRadius:20, padding:"3.5rem", border:`1.5px solid ${C.border}` }}>
              <div>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.accent, letterSpacing:".16em", textTransform:"uppercase", marginBottom:".6rem" }}>// Contact</p>
                <h2 style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:"clamp(28px,3.5vw,48px)", color:C.text, letterSpacing:"-.025em", lineHeight:1.05, marginBottom:"1rem" }}>
                  Let's Build<br /><em style={{ color:C.accent, fontStyle:"italic" }}>Together.</em>
                </h2>
                <p style={{ fontSize:14, color:C.sub, lineHeight:1.85 }}>
                  Open to DevOps &amp; Cloud Engineer roles in Germany, the EU and the USA.
                  Always happy to connect and talk infrastructure.
                </p>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:".875rem" }}>
                <SolidBtn href="mailto:adeyemi504@gmail.com">✉ adeyemi504@gmail.com</SolidBtn>
                <OutlineBtn href="https://www.linkedin.com/in/christopher-adeyemi-44952923a/" target="_blank">LinkedIn ↗</OutlineBtn>
                <OutlineBtn href="https://github.com/Chrisblurp" target="_blank">GitHub ↗</OutlineBtn>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".875rem" }}>
                  <OutlineBtn href="/cv-en.pdf" target="_blank">Resume (EN) ↗</OutlineBtn>
                  <OutlineBtn href="/cv-de.pdf" target="_blank">Lebenslauf (DE) ↗</OutlineBtn>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:`1.5rem ${PAD}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:14, color:C.text }}>C.<span style={{ color:C.accent }}>A</span></span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.muted }}>© 2025 Christopher Adeyemi · Built with React &amp; Framer Motion</span>
        <div style={{ display:"flex", gap:"1rem" }}>
          {[["https://www.linkedin.com/in/christopher-adeyemi-44952923a/","LinkedIn"],["https://github.com/Chrisblurp","GitHub"]].map(([href,label])=>(
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.muted, textDecoration:"none" }}>
              {label} ↗
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}