import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400&family=Outfit:wght@300;400;500;600;700&display=swap');`;

export default function AptIQ() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = FONTS + `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; }
      .fraunces { font-family: 'Fraunces', serif; }
      .outfit { font-family: 'Outfit', sans-serif; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes floatY {
        0%,100% { transform: translateY(0px) rotate(-1deg); }
        50%      { transform: translateY(-14px) rotate(1deg); }
      }
      @keyframes pulse-ring {
        0%   { transform: scale(1); opacity: .6; }
        100% { transform: scale(1.6); opacity: 0; }
      }
      @keyframes dash {
        to { stroke-dashoffset: 0; }
      }
      @keyframes shimmer {
        0%   { background-position: -400px 0; }
        100% { background-position: 400px 0; }
      }
      @keyframes spin-slow {
        to { transform: rotate(360deg); }
      }

      .fade-up   { animation: fadeUp .7s ease both; }
      .delay-1   { animation-delay: .12s; }
      .delay-2   { animation-delay: .24s; }
      .delay-3   { animation-delay: .36s; }
      .delay-4   { animation-delay: .48s; }
      .delay-5   { animation-delay: .60s; }
      .float-anim { animation: floatY 5s ease-in-out infinite; }

      .card-hover {
        transition: transform .25s ease, box-shadow .25s ease;
      }
      .card-hover:hover {
        transform: translateY(-6px) rotate(.4deg);
      }

      .btn-primary {
        position: relative;
        overflow: hidden;
        transition: transform .2s, box-shadow .2s;
      }
      .btn-primary::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%);
        background-size: 400px 100%;
        opacity: 0;
        transition: opacity .2s;
      }
      .btn-primary:hover::after {
        opacity: 1;
        animation: shimmer .7s ease;
      }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,.35); }

      .notebook-lines {
        background-image: repeating-linear-gradient(
          transparent, transparent 29px, rgba(148,163,184,.18) 30px
        );
      }

      .grid-pattern {
        background-image:
          linear-gradient(rgba(148,163,184,.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148,163,184,.07) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      .tag-badge {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
        padding: 5px 12px; border-radius: 100px;
      }

      .anticheat-item {
        transition: background .2s, transform .2s;
      }
      .anticheat-item:hover {
        transform: translateX(6px);
      }

      .preview-card {
        transition: transform .3s ease, box-shadow .3s ease;
        cursor: default;
      }
      .preview-card:hover {
        transform: scale(1.04) rotate(-.5deg);
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(37,99,235,.3); border-radius: 3px; }
    `;
    document.head.appendChild(style);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); document.head.removeChild(style); };
  }, []);

  // ─── TOKENS ───────────────────────────────────────────────────────
  const t = dark ? {
    bg:        "#0D1117",
    bg2:       "#161B22",
    bg3:       "#1C2333",
    border:    "rgba(255,255,255,.08)",
    text:      "#E6EDF3",
    muted:     "#8B949E",
    card:      "#161B22",
    navBg:     "rgba(13,17,23,.88)",
    amber:     "#F5A623",
    amberBg:   "rgba(245,166,35,.14)",
    blue:      "#58A6FF",
    blueBg:    "rgba(88,166,255,.12)",
    indigo:    "#818CF8",
    indigoBg:  "rgba(129,140,248,.12)",
    green:     "#3FB950",
    greenBg:   "rgba(63,185,80,.12)",
    red:       "#FF7B72",
    shadow:    "0 8px 32px rgba(0,0,0,.5)",
    heroGrad:  "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,.18) 0%, transparent 70%)",
  } : {
    bg:        "#F4F7FB",
    bg2:       "#FFFFFF",
    bg3:       "#EBF0FA",
    border:    "rgba(37,99,235,.12)",
    text:      "#1E293B",
    muted:     "#64748B",
    card:      "#FFFFFF",
    navBg:     "rgba(244,247,251,.92)",
    amber:     "#D97706",
    amberBg:   "rgba(217,119,6,.10)",
    blue:      "#2563EB",
    blueBg:    "rgba(37,99,235,.08)",
    indigo:    "#4F46E5",
    indigoBg:  "rgba(79,70,229,.08)",
    green:     "#059669",
    greenBg:   "rgba(5,150,105,.08)",
    red:       "#DC2626",
    shadow:    "0 4px 24px rgba(37,99,235,.10)",
    heroGrad:  "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,.10) 0%, transparent 70%)",
  };

  const navLinks = ["Features", "Who Uses", "Anti-Cheat", "Preview"];

  return (
    <div className="outfit" style={{ background: t.bg, color: t.text, minHeight: "100vh", transition: "background .4s, color .3s" }}>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 999,
        background: t.navBg,
        backdropFilter: "blur(16px)",
        borderBottom: `1.5px solid ${t.border}`,
        transition: "background .4s, box-shadow .3s",
        boxShadow: scrolled ? t.shadow : "none",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `linear-gradient(135deg, ${t.blue}, ${t.indigo})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 18, color: "#fff",
              boxShadow: `0 4px 14px ${t.blueBg}`
            }}>A</div>
            <span className="fraunces" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.02em", color: t.text }}>
              Apt<span style={{ color: t.blue }}>IQ</span>
            </span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{
                fontSize: 14, fontWeight: 500, color: t.muted, textDecoration: "none",
                transition: "color .2s",
              }}
              onMouseEnter={e => e.target.style.color = t.blue}
              onMouseLeave={e => e.target.style.color = t.muted}
              >{l}</a>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Toggle */}
            <button onClick={() => setDark(!dark)} style={{
              width: 44, height: 24, borderRadius: 12,
              background: dark ? t.blue : t.border,
              border: `1.5px solid ${t.border}`,
              cursor: "pointer", position: "relative", transition: "background .3s",
              outline: "none",
            }}>
              <div style={{
                position: "absolute", top: 2,
                left: dark ? 22 : 2,
                width: 16, height: 16, borderRadius: 8,
                background: dark ? "#fff" : t.muted,
                transition: "left .25s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8,
              }}>{dark ? "🌙" : "☀️"}</div>
            </button>
            <a href="#login" style={{
              fontSize: 14, fontWeight: 600, color: t.blue, textDecoration: "none",
              padding: "7px 16px", borderRadius: 8, border: `1.5px solid ${t.blue}`,
              transition: "background .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = t.blueBg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Log in</a>
            <a href="#signup" style={{
              fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none",
              padding: "7px 16px", borderRadius: 8,
              background: `linear-gradient(135deg, ${t.blue}, ${t.indigo})`,
              boxShadow: `0 4px 12px rgba(37,99,235,.25)`,
              transition: "opacity .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Sign up</a>
          </div>
        </div>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section id="hero" style={{
        position: "relative", overflow: "hidden",
        minHeight: "calc(100vh - 64px)",
        display: "flex", alignItems: "center",
        background: t.bg,
      }}>
        {/* Notebook horizontal lines */}
        <div className="notebook-lines" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: dark ? .6 : 1 }} />
        {/* Grid overlay */}
        <div className="grid-pattern" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        {/* Radial glow */}
        <div style={{ position: "absolute", inset: 0, background: t.heroGrad, pointerEvents: "none" }} />
        {/* Left red margin line (notebook) */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 80, width: 2,
          background: "rgba(220,38,38,.15)", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* Left */}
          <div>
            <div className="fade-up tag-badge" style={{ background: t.amberBg, color: t.amber, marginBottom: 24 }}>
              🆓 100% Free & Open Source
            </div>
            <h1 className="fraunces fade-up delay-1" style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900,
              lineHeight: 1.08, letterSpacing: "-.03em", marginBottom: 24,
              color: t.text,
            }}>
              Learn. Practice.<br />
              Compete.<br />
             <span style={{ 
                background: `linear-gradient(135deg, ${t.blue} 0%, ${t.indigo} 100%)`, 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                display: "inline-block" 
              }}>Without Cheating.</span>
            </h1>
            <p className="fade-up delay-2" style={{
              fontSize: 18, lineHeight: 1.7, color: t.muted, maxWidth: 480, marginBottom: 40,
            }}>
              AptIQ is a free, open-source aptitude platform with <strong style={{ color: t.text, fontWeight: 600 }}>anti-cheat testing</strong>, real rankings, and smart analytics for students & colleges.
            </p>
            <div className="fade-up delay-3" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary" style={{
                padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer",
                background: `linear-gradient(135deg, ${t.amber} 0%, #F97316 100%)`,
                color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                boxShadow: "0 6px 20px rgba(245,166,35,.35)",
              }}>🚀 Start Learning Free</button>
              <button style={{
                padding: "14px 28px", borderRadius: 10, cursor: "pointer",
                background: "transparent", color: t.text, fontSize: 16, fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                border: `1.5px solid ${t.border}`,
                transition: "background .2s, border-color .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = t.bg3; e.currentTarget.style.borderColor = t.blue; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = t.border; }}
              >Log in / Sign up</button>
            </div>
            {/* Trust badges */}
            <div className="fade-up delay-4" style={{ display: "flex", gap: 20, marginTop: 40, flexWrap: "wrap" }}>
              {[["⭐","Open Source"], ["🔒","Anti-Cheat"], ["🏆","Real Rankings"]].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: t.muted, fontWeight: 500 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right – Illustration / hero card */}
          <div className="float-anim fade-up delay-2" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: "100%", maxWidth: 440,
              background: t.card,
              borderRadius: 20,
              border: `1.5px solid ${t.border}`,
              boxShadow: dark ? "0 24px 60px rgba(0,0,0,.5)" : "0 24px 60px rgba(37,99,235,.14)",
              overflow: "hidden",
            }}>
              {/* Mock browser bar */}
              <div style={{
                padding: "12px 18px", display: "flex", alignItems: "center", gap: 8,
                borderBottom: `1px solid ${t.border}`,
                background: dark ? t.bg3 : "#F8FAFF"
              }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
                ))}
                <div style={{
                  flex: 1, marginLeft: 8, height: 24, borderRadius: 6,
                  background: t.bg, border: `1px solid ${t.border}`,
                  display: "flex", alignItems: "center", paddingLeft: 10,
                  fontSize: 11, color: t.muted
                }}>aptiq.io/test/quantitative-aptitude</div>
              </div>
              {/* Mock test UI */}
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>Quantitative Aptitude</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginTop: 2 }}>Question 12 / 30</div>
                  </div>
                  <div style={{
                    background: t.amberBg, color: t.amber,
                    padding: "6px 14px", borderRadius: 8,
                    fontSize: 15, fontWeight: 700,
                    fontFamily: "'Fraunces', serif"
                  }}>⏱ 18:42</div>
                </div>
                {/* Progress bar */}
                <div style={{ height: 5, background: t.bg3, borderRadius: 3, marginBottom: 20 }}>
                  <div style={{ width: "40%", height: "100%", background: `linear-gradient(90deg, ${t.blue}, ${t.indigo})`, borderRadius: 3 }} />
                </div>
                <div style={{
                  background: t.bg3, borderRadius: 12, padding: 16, fontSize: 14, color: t.text, lineHeight: 1.6, marginBottom: 16, fontWeight: 500
                }}>
                  A train travels 360 km at uniform speed. If the speed had been 10 km/h more, the journey would have taken 1 hour less. Find the original speed.
                </div>
                {["40 km/h", "60 km/h", "72 km/h", "80 km/h"].map((opt, i) => (
                  <div key={opt} style={{
                    padding: "10px 14px", borderRadius: 8, marginBottom: 8,
                    border: `1.5px solid ${i === 1 ? t.blue : t.border}`,
                    background: i === 1 ? t.blueBg : "transparent",
                    fontSize: 13, fontWeight: i === 1 ? 700 : 400,
                    color: i === 1 ? t.blue : t.text,
                    cursor: "pointer", transition: "all .15s",
                    display: "flex", alignItems: "center", gap: 10
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 4, border: `1.5px solid ${i === 1 ? t.blue : t.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700,
                      background: i === 1 ? t.blue : "transparent", color: i === 1 ? "#fff" : t.muted
                    }}>{String.fromCharCode(65+i)}</span>
                    {opt}
                  </div>
                ))}
                {/* Anti-cheat badge */}
                <div style={{
                  marginTop: 16, padding: "8px 12px", borderRadius: 8,
                  background: t.greenBg, display: "flex", alignItems: "center", gap: 8,
                  fontSize: 12, color: t.green, fontWeight: 600
                }}>
                  <span>🔒</span> Anti-cheat active – Tab monitoring ON
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section id="features" style={{ padding: "100px 24px", background: dark ? t.bg2 : "#EEF3FC", position: "relative" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-badge" style={{ background: t.blueBg, color: t.blue, margin: "0 auto 16px" }}>✦ Features</div>
            <h2 className="fraunces" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, letterSpacing: "-.03em", color: t.text }}>
              What Makes AptIQ <span style={{ color: t.blue }}>Different?</span>
            </h2>
            <p style={{ fontSize: 17, color: t.muted, marginTop: 14, maxWidth: 480, margin: "14px auto 0" }}>Not another quiz app. AptIQ is built for trust, performance, and real results.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              {
                icon: "🔒", color: t.blue, bg: t.blueBg,
                title: "100% Anti-Cheat",
                desc: "Industry-grade integrity for every test.",
                items: ["Tab monitoring & focus detection", "Auto violation detection", "Secure timed test environment"],
              },
              {
                icon: "🏆", color: t.amber, bg: t.amberBg,
                title: "Real Leaderboard",
                desc: "See where you truly stand, no inflated scores.",
                items: ["College-level ranking", "National ranking system", "Live performance tracking"],
              },
              {
                icon: "📊", color: t.indigo, bg: t.indigoBg,
                title: "Smart Analytics",
                desc: "Know exactly what to study next.",
                items: ["Weak area detection by topic", "Accuracy & speed tracking", "Beautiful performance charts"],
              },
              {
                icon: "🆓", color: t.green, bg: t.greenBg,
                title: "Free & Open Source",
                desc: "Zero paywalls, ever.",
                items: ["Completely free to use", "Source code on GitHub", "Community-driven roadmap"],
              },
            ].map((f, i) => (
              <div key={f.title} className="card-hover" style={{
                background: t.card,
                borderRadius: 20, padding: 32,
                border: `1.5px solid ${t.border}`,
                boxShadow: dark ? "0 4px 24px rgba(0,0,0,.3)" : "0 4px 24px rgba(37,99,235,.07)",
                animationDelay: `${i * .1}s`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: f.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 20,
                }}>{f.icon}</div>
                <h3 className="fraunces" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", color: t.text, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: t.muted, marginBottom: 16, lineHeight: 1.6 }}>{f.desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {f.items.map(item => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: t.text, lineHeight: 1.5 }}>
                      <span style={{ color: f.color, fontWeight: 700, marginTop: 1 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHO USES ══════════════════ */}
      <section id="who-uses" style={{ padding: "100px 24px", background: t.bg, position: "relative", overflow: "hidden" }}>
        <div className="grid-pattern" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-badge" style={{ background: t.indigoBg, color: t.indigo, margin: "0 auto 16px" }}>👥 Users</div>
            <h2 className="fraunces" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, letterSpacing: "-.03em", color: t.text }}>
              Built For <span style={{ color: t.indigo }}>Everyone</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 28 }}>
            {[
              {
                icon: "🎓", color: t.blue, bg: t.blueBg,
                role: "Students",
                tagline: "Train smarter, rank higher.",
                perks: [
                  { e: "📚", t: "Structured aptitude learning path" },
                  { e: "📝", t: "Unlimited mock tests" },
                  { e: "🏅", t: "Earn skill badges & certificates" },
                ],
              },
              {
                icon: "🏫", color: t.indigo, bg: t.indigoBg,
                role: "Colleges",
                tagline: "Run fair, transparent exams.",
                perks: [
                  { e: "🖥️", t: "Conduct internal exams online" },
                  { e: "📈", t: "Track batch progress over time" },
                  { e: "🔐", t: "Full anti-cheat control panel" },
                ],
              },
              {
                icon: "👨‍💻", color: t.amber, bg: t.amberBg,
                role: "Admins",
                tagline: "Full control at your fingertips.",
                perks: [
                  { e: "🗂️", t: "Manage & import question banks" },
                  { e: "📊", t: "Monitor platform analytics" },
                  { e: "📋", t: "Download detailed reports" },
                ],
              },
            ].map((u, i) => (
              <div key={u.role} className="card-hover" style={{
                background: t.card,
                borderRadius: 24, padding: "36px 32px",
                border: `1.5px solid ${t.border}`,
                boxShadow: dark ? "0 8px 32px rgba(0,0,0,.3)" : "0 8px 32px rgba(37,99,235,.08)",
              }}>
                <div style={{
                  width: 68, height: 68, borderRadius: 18,
                  background: u.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 30, marginBottom: 20,
                }}>{u.icon}</div>
                <h3 className="fraunces" style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-.02em", color: u.color, marginBottom: 6 }}>{u.role}</h3>
                <p style={{ fontSize: 14, color: t.muted, marginBottom: 22, fontStyle: "italic" }}>{u.tagline}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {u.perks.map(p => (
                    <div key={p.t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, background: u.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, flexShrink: 0
                      }}>{p.e}</div>
                      <span style={{ fontSize: 14, color: t.text, lineHeight: 1.5, paddingTop: 8, fontWeight: 500 }}>{p.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ ANTI-CHEAT ══════════════════ */}
      <section id="anti-cheat" style={{
        padding: "100px 24px",
        background: dark ? "#0A0F1A" : "#0F172A",
        position: "relative", overflow: "hidden",
      }}>
        {/* bg glow */}
        <div style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(37,99,235,.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div className="tag-badge" style={{ background: "rgba(220,38,38,.15)", color: "#F87171", marginBottom: 20 }}>🔐 Anti-Cheat Engine</div>
              <h2 className="fraunces" style={{ fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 900, letterSpacing: "-.03em", color: "#F1F5F9", marginBottom: 16 }}>
                The Most Secure<br /><span style={{ color: "#58A6FF" }}>Free</span> Testing Platform
              </h2>
              <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, marginBottom: 36 }}>
                Our multi-layer integrity system monitors every test session in real time—so scores actually mean something.
              </p>

              {/* Detection list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  { icon: "🔀", label: "Tab switching & focus loss detection" },
                  { icon: "📋", label: "Copy-paste & clipboard blocking" },
                  { icon: "👁️", label: "Suspicious activity pattern analysis" },
                  { icon: "⚡", label: "Auto submission on violations" },
                  { icon: "📷", label: "Screenshot & screen capture detection" },
                  { icon: "📜", label: "Full activity log per session" },
                  { icon: "⚠️", label: "Graduated warning system (3-strike)" },
                ].map((item) => (
                  <div key={item.label} className="anticheat-item" style={{
                    display: "flex", gap: 14, alignItems: "center",
                    padding: "12px 16px", borderRadius: 10,
                    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                  }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: "#CBD5E1", fontWeight: 500 }}>{item.label}</span>
                    <span style={{ marginLeft: "auto", color: "#3FB950", fontSize: 16 }}>✅</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – visual */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "100%", maxWidth: 380,
                background: "rgba(255,255,255,.04)",
                borderRadius: 20, border: "1.5px solid rgba(255,255,255,.1)",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,.6)",
              }}>
                {/* Top bar */}
                <div style={{
                  background: "rgba(220,38,38,.2)", padding: "14px 20px",
                  display: "flex", alignItems: "center", gap: 10,
                  borderBottom: "1px solid rgba(220,38,38,.3)",
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 5,
                    background: "#FF5F57", position: "relative"
                  }}>
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: 5,
                      background: "#FF5F57", animation: "pulse-ring 1.5s ease-out infinite",
                    }} />
                  </div>
                  <span style={{ fontSize: 13, color: "#FECACA", fontWeight: 600, letterSpacing: ".06em" }}>⚠️ VIOLATION DETECTED</span>
                </div>
                <div style={{ padding: 24 }}>
                  {/* Warning log */}
                  {[
                    { t: "14:32:01", msg: "Tab switch detected", lvl: "warn" },
                    { t: "14:32:45", msg: "Copy action blocked", lvl: "warn" },
                    { t: "14:33:10", msg: "Focus loss #3 – Final warning", lvl: "error" },
                  ].map((log, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", borderRadius: 8, marginBottom: 10,
                      background: log.lvl === "error" ? "rgba(220,38,38,.15)" : "rgba(245,166,35,.10)",
                      border: `1px solid ${log.lvl === "error" ? "rgba(220,38,38,.3)" : "rgba(245,166,35,.2)"}`,
                      display: "flex", gap: 12, alignItems: "center",
                    }}>
                      <span style={{ fontSize: 11, color: "#64748B", fontFamily: "monospace" }}>{log.t}</span>
                      <span style={{ fontSize: 13, color: log.lvl === "error" ? "#FCA5A5" : "#FDE68A", flex: 1 }}>{log.msg}</span>
                      <span style={{ width: 8, height: 8, borderRadius: 4, background: log.lvl === "error" ? "#EF4444" : "#F59E0B", flexShrink: 0 }} />
                    </div>
                  ))}
                  {/* Auto-submit banner */}
                  <div style={{
                    marginTop: 16, padding: "14px 18px", borderRadius: 10,
                    background: "rgba(220,38,38,.2)", border: "1.5px solid rgba(220,38,38,.4)",
                    textAlign: "center", fontSize: 14, color: "#FCA5A5", fontWeight: 700,
                  }}>
                    🚨 Test auto-submitted — Integrity report generated
                  </div>
                  {/* Scores */}
                  <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Violations", "3"], ["Warnings", "2"], ["Score", "Invalidated"], ["Status", "Flagged"]].map(([k, v]) => (
                      <div key={k} style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
                        <div style={{ fontSize: 11, color: "#64748B", marginBottom: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{k}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", fontFamily: "'Fraunces', serif" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PAGE PREVIEW ══════════════════ */}
      <section id="preview" style={{ padding: "100px 24px", background: dark ? t.bg2 : "#F0F4FF" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-badge" style={{ background: t.blueBg, color: t.blue, margin: "0 auto 16px" }}>🖥️ Platform</div>
            <h2 className="fraunces" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, letterSpacing: "-.03em", color: t.text }}>
              Everything in One <span style={{ color: t.blue }}>Place</span>
            </h2>
            <p style={{ fontSize: 17, color: t.muted, marginTop: 14 }}>Four powerful views, designed for clarity.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              {
                label: "Dashboard", icon: "🏠", color: t.blue, bg: t.blueBg,
                mockup: [
                  { type: "stat", items: ["Score 84%", "Rank #12", "Tests 47"] },
                  { type: "bar" },
                ],
              },
              {
                label: "Test Page", icon: "📝", color: t.indigo, bg: t.indigoBg,
                mockup: [
                  { type: "question" },
                  { type: "options" },
                ],
              },
              {
                label: "Analytics", icon: "📊", color: t.amber, bg: t.amberBg,
                mockup: [
                  { type: "chart" },
                ],
              },
              {
                label: "Leaderboard", icon: "🏆", color: t.green, bg: t.greenBg,
                mockup: [
                  { type: "ranks" },
                ],
              },
            ].map((p) => (
              <div key={p.label} className="preview-card" style={{
                background: t.card, borderRadius: 18,
                border: `1.5px solid ${t.border}`,
                overflow: "hidden",
                boxShadow: dark ? "0 8px 32px rgba(0,0,0,.4)" : "0 8px 32px rgba(37,99,235,.09)",
              }}>
                {/* Header bar */}
                <div style={{
                  padding: "12px 16px", display: "flex", alignItems: "center", gap: 8,
                  borderBottom: `1px solid ${t.border}`,
                  background: dark ? t.bg3 : "#F8FAFF"
                }}>
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: p.color, letterSpacing: ".06em" }}>{p.label.toUpperCase()}</span>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                    {[p.color, t.border, t.border].map((c, i) => (
                      <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: c, opacity: i === 0 ? 1 : .5 }} />
                    ))}
                  </div>
                </div>
                {/* Mockup content */}
                <div style={{ padding: 16 }}>
                  {p.mockup.map((m, mi) => (
                    <div key={mi} style={{ marginBottom: 10 }}>
                      {m.type === "stat" && (
                        <div style={{ display: "flex", gap: 8 }}>
                          {m.items.map(s => (
                            <div key={s} style={{
                              flex: 1, padding: "8px 4px", borderRadius: 8, textAlign: "center",
                              background: p.bg, fontSize: 11, fontWeight: 700, color: p.color
                            }}>{s}</div>
                          ))}
                        </div>
                      )}
                      {m.type === "bar" && (
                        <div style={{ marginTop: 10 }}>
                          {[70, 90, 55, 80, 65].map((h, i) => (
                            <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                              <div style={{ width: 40, height: 10, borderRadius: 3, background: t.bg3, overflow: "hidden" }}>
                                <div style={{ width: `${h}%`, height: "100%", background: p.color, opacity: .7 + (i * .06), borderRadius: 3 }} />
                              </div>
                              <span style={{ fontSize: 9, color: t.muted }}>{["Quant","LR","Verbal","DI","GA"][i]}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {m.type === "question" && (
                        <div>
                          <div style={{ height: 8, borderRadius: 4, background: t.bg3, marginBottom: 6 }} />
                          <div style={{ height: 8, borderRadius: 4, background: t.bg3, width: "80%", marginBottom: 12 }} />
                          {[...Array(3)].map((_, i) => (
                            <div key={i} style={{
                              height: 24, borderRadius: 6, marginBottom: 6,
                              border: `1px solid ${i === 1 ? p.color : t.border}`,
                              background: i === 1 ? p.bg : "transparent",
                            }} />
                          ))}
                        </div>
                      )}
                      {m.type === "options" && (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ height: 28, width: 80, borderRadius: 6, background: p.bg, border: `1px solid ${p.color}` }} />
                          <div style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>⏱ 12:30</div>
                        </div>
                      )}
                      {m.type === "chart" && (
                        <svg viewBox="0 0 200 80" style={{ width: "100%" }}>
                          <polyline
                            points="0,60 40,40 80,50 120,20 160,30 200,10"
                            fill="none" stroke={p.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          />
                          <polyline
                            points="0,60 40,40 80,50 120,20 160,30 200,10 200,80 0,80"
                            fill={p.color} opacity=".08"
                          />
                          {[0,40,80,120,160,200].map((x,i) => (
                            <circle key={i} cx={x} cy={[60,40,50,20,30,10][i]} r="3.5" fill={p.color} />
                          ))}
                        </svg>
                      )}
                      {m.type === "ranks" && (
                        <div>
                          {[["🥇","Priya S.","98%"],["🥈","Arjun K.","94%"],["🥉","You","84%"],["4","Ravi M.","80%"]].map(([rank,name,score]) => (
                            <div key={name} style={{
                              display: "flex", gap: 8, alignItems: "center", padding: "6px 0",
                              borderBottom: `1px solid ${t.border}`,
                              background: name === "You" ? p.bg : "transparent",
                              borderRadius: 4, paddingInline: 4,
                            }}>
                              <span style={{ fontSize: 13, width: 20, textAlign: "center" }}>{rank}</span>
                              <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: name === "You" ? p.color : t.text }}>{name}</span>
                              <span style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{score}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section id="cta" style={{
        padding: "120px 24px", textAlign: "center",
        background: `linear-gradient(135deg, #1E40AF 0%, #1E1B6B 50%, #312E81 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative dots */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(99,102,241,.3) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="tag-badge" style={{ background: "rgba(255,255,255,.12)", color: "#E0E7FF", margin: "0 auto 24px" }}>🚀 Get Started Today</div>
          <h2 className="fraunces" style={{
            fontSize: "clamp(36px,5vw,64px)", fontWeight: 900,
            letterSpacing: "-.03em", color: "#fff", marginBottom: 20, lineHeight: 1.1
          }}>
            Ready to Test<br />Your <span style={{
              background: "linear-gradient(135deg, #FCD34D, #F97316)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Real Skills?</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(224,231,255,.75)", lineHeight: 1.7, marginBottom: 48 }}>
            Join thousands of students and colleges already using AptIQ for fair, smart aptitude testing.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{
              padding: "15px 30px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #F59E0B, #EF4444)",
              color: "#fff", fontSize: 16, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 8px 24px rgba(245,158,11,.4)",
            }}>🟡 Start Free</button>
            <button style={{
              padding: "15px 30px", borderRadius: 12, cursor: "pointer",
              background: "rgba(255,255,255,.1)", color: "#fff",
              fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif",
              border: "1.5px solid rgba(255,255,255,.25)",
              transition: "background .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
            
            >⭐ Star on GitHub</button>
          </div>
          {/* Stats */}
          
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{
        background: dark ? "#080C14" : "#0F172A",
        borderTop: "1px solid rgba(255,255,255,.06)",
        padding: "64px 24px 32px",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: "linear-gradient(135deg, #2563EB, #4F46E5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 16, color: "#fff"
                }}>A</div>
                <span className="fraunces" style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9" }}>
                  Apt<span style={{ color: "#58A6FF" }}>IQ</span>
                </span>
              </div>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, maxWidth: 280 }}>
                Free, open-source aptitude platform with anti-cheat testing and smart analytics.
              </p>
              {/* Social */}
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {[
                  { icon: "🐙", label: "GitHub" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "💼", label: "LinkedIn" },
                  { icon: "💬", label: "Discord" },
                ].map(s => (
                  <div key={s.label} title={s.label} style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, cursor: "pointer", transition: "background .2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.06)"}
                  >{s.icon}</div>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { heading: "Product", links: ["Features", "Anti-Cheat", "Leaderboard", "Analytics", "GitHub"] },
              { heading: "Company", links: ["About", "Contact", "Blog", "Careers"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map(col => (
              <div key={col.heading}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16 }}>{col.heading}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <a key={l} href="#" style={{
                      fontSize: 14, color: "#64748B", textDecoration: "none",
                      transition: "color .2s",
                    }}
                    onMouseEnter={e => e.target.style.color = "#94A3B8"}
                    onMouseLeave={e => e.target.style.color = "#64748B"}
                    >{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#475569" }}>© 2025 AptIQ. Open source under MIT License.</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#475569" }}>Built with</span>
              <span style={{ fontSize: 14 }}>❤️</span>
              <span style={{ fontSize: 13, color: "#475569" }}>for fair learning</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}