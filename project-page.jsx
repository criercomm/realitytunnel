/* eslint-disable no-undef */

// ProjectPage — light-theme project detail page. Slim white nav at top,
// breadcrumb → title → subtitle → divider → meta strip → embedded video →
// divider → The brief + What we built (two columns) → carousel of all
// other projects (constrained to site width). Nothing below the carousel.
//
// Each per-project HTML file sets `window.RT_PROJECT_SLUG` before this
// script loads.

(function () {
  const A          = '#fe5828';                // brand orange
  const B          = '#00AEEF';                // cyan
  const C          = '#6900E9';                // violet
  const INK        = '#0a0a0a';                // body text
  const INK_MUTED  = 'rgba(10,10,10,0.6)';     // labels / meta
  const RULE       = 'rgba(10,10,10,0.10)';    // dividers
  const NAV_KEY    = '#5e567b';                // keyline — matches main site

  const navRingColors = [A, B, C];

  // ───────────────────────────────────────────────────────────────────────
  // SiteNav — slim WHITE version of the main-site header for project pages.
  // Ringmark + textmark match the main nav exactly (size, animations,
  // styling); colors inverted for the white background.
  // ───────────────────────────────────────────────────────────────────────
  function SiteNav() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
      <React.Fragment>
        {/* Logo type styles — mirror main nav (.dirA .rt-wordmark) but inverted for white bg */}
        <style>{`
          .pp-nav .pp-wordmark{display:flex;flex-direction:column;line-height:1;}
          .pp-nav .pp-wordmark .rt-word{font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:300;font-size:27px;letter-spacing:0.28em;line-height:1;color:#0a0a0a;white-space:nowrap;}
          .pp-nav .pp-wordmark .rt-word .ch{display:inline-block;opacity:0;transform:var(--from) rotate(var(--rot));animation-name:pp-char-in;animation-timing-function:cubic-bezier(0.22,1,0.36,1);animation-fill-mode:forwards;will-change:transform,opacity;}
          .pp-nav .pp-wordmark .rt-word .sp{display:inline-block;}
          @keyframes pp-char-in{from{opacity:0;transform:var(--from) rotate(var(--rot));}to{opacity:1;transform:translate(0,0) rotate(0deg);}}
          .pp-nav .pp-wordmark .rt-tag{font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:400;font-size:10px;letter-spacing:0.48em;line-height:1;color:rgba(10,10,10,0.55);white-space:nowrap;text-transform:uppercase;margin-top:8px;opacity:0;animation:pp-tag-in 0.9s cubic-bezier(0.22,1,0.36,1) 2.4s both;}
          @keyframes pp-tag-in{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
          @media (prefers-reduced-motion:reduce){
            .pp-nav .pp-wordmark .rt-word .ch{animation:none!important;opacity:1!important;transform:none!important;}
            .pp-nav .pp-wordmark .rt-tag{animation:none!important;opacity:1!important;}
          }
        `}</style>

        <header className="pp-nav" style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(160%) blur(10px)',
          WebkitBackdropFilter: 'saturate(160%) blur(10px)',
          borderBottom: `1px solid ${RULE}`,
        }}>
          <div className="container" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 64px',
          }}>
            <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: 'inherit' }}>
              <svg width={89} height={89 * (50 / 42)} viewBox="0 0 42 50" style={{ display: 'block', overflow: 'hidden' }} aria-hidden="true">
                <defs>
                  <clipPath id="rt-nav-clip-proj">
                    <path d="M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z" />
                  </clipPath>
                </defs>
                <style>{`
                  .pp-tunnel-ring{transform-box:fill-box;transform-origin:center;opacity:0;animation:pp-tunnel-flow 3.6s cubic-bezier(0.4,0,0.7,0.6) infinite;will-change:transform,opacity;}
                  .pp-tr1{animation-delay:-3.0s;}
                  .pp-tr2{animation-delay:-2.28s;}
                  .pp-tr3{animation-delay:-1.56s;}
                  .pp-tr4{animation-delay:-0.84s;}
                  .pp-tr5{animation-delay:-0.12s;}
                  @keyframes pp-tunnel-flow{
                    0%   { transform:scale(0.12); opacity:0;   }
                    8%   { opacity:0.95; }
                    70%  { opacity:0.85; }
                    100% { transform:scale(3.8);  opacity:0;   }
                  }
                  @media (prefers-reduced-motion:reduce){
                    .pp-tunnel-ring{animation:none!important;opacity:1!important;transform:scale(1)!important;}
                  }
                `}</style>
                {/* Eye fill */}
                <path d="M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z" fill={navRingColors[0]} />
                {/* Keyline */}
                <path d="M 5,24 Q 21,3 37,24 Q 21,45 5,24 Z"
                      fill="none" stroke={NAV_KEY} strokeWidth="4" strokeLinejoin="miter" />
                {/* Tunnel rings — alternating cyan / violet, same as main nav */}
                <g clipPath="url(#rt-nav-clip-proj)">
                  <circle className="pp-tunnel-ring pp-tr1" cx="21" cy="15" r="5" fill={navRingColors[1]} />
                  <circle className="pp-tunnel-ring pp-tr2" cx="21" cy="15" r="5" fill={navRingColors[2]} />
                  <circle className="pp-tunnel-ring pp-tr3" cx="21" cy="15" r="5" fill={navRingColors[1]} />
                  <circle className="pp-tunnel-ring pp-tr4" cx="21" cy="15" r="5" fill={navRingColors[2]} />
                  <circle className="pp-tunnel-ring pp-tr5" cx="21" cy="15" r="5" fill={navRingColors[1]} />
                </g>
              </svg>
              <div className="pp-wordmark">
                <ScatterWord className="rt-word" text="REALITY TUNNEL" baseDelay={1.4} stagger={0.06} duration={1.2} />
                <span className="rt-tag">Immersive Experiences Studio</span>
              </div>
            </a>

            <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {[
                ['Work',     'index.html#work'],
                ['Services', 'index.html#services'],
                ['Approach', 'index.html#approach'],
                ['Contact',  'index.html#contact'],
              ].map(([l, href]) => (
                <a
                  key={l}
                  href={href}
                  style={{
                    fontSize: 13, fontWeight: 500,
                    color: INK,
                    padding: '8px 14px', borderRadius: 99,
                    textDecoration: 'none',
                    transition: 'color 160ms ease, background 160ms ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = A; e.currentTarget.style.background = 'rgba(10,10,10,0.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = INK; e.currentTarget.style.background = 'transparent'; }}
                >{l}</a>
              ))}
            </nav>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="mono" style={{
                background: 'transparent', border: `1px solid ${RULE}`,
                color: INK_MUTED, fontSize: 11, padding: '7px 12px', borderRadius: 99,
                cursor: 'pointer',
              }}>EN · ES</button>
              <a
                href="index.html#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: INK, color: '#fff',
                  fontSize: 12, fontWeight: 600,
                  padding: '9px 16px', borderRadius: 99,
                  textDecoration: 'none',
                  transition: 'background 160ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = A; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = INK; }}
              >Start a project →</a>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${RULE}`,
                  color: INK, borderRadius: 99,
                  width: 38, height: 38,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 160ms, border-color 160ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(10,10,10,0.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <svg width="16" height="12" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M1 2 L17 2" />
                  <path d="M1 7 L17 7" />
                  <path d="M1 12 L11 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div
            role="dialog" aria-modal="true" aria-label="Site menu"
            onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(105,0,233,0.35) 0%, transparent 65%), linear-gradient(180deg, #07061a 0%, #050913 60%, #02030c 100%)',
              animation: 'pp-menu-bg-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both',
              overflow: 'hidden',
            }}
          >
            <style>{`
              @keyframes pp-menu-bg-in { from { opacity: 0; } to { opacity: 1; } }
              @keyframes pp-menu-link-in { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <header style={{ position: 'relative', zIndex: 2, padding: '32px 0' }}>
              <div className="container" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                minHeight: 106,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                    <span style={{ color: A }}>●</span>&nbsp;&nbsp;Reality Tunnel · Menu
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#fff', borderRadius: 99,
                    width: 44, height: 44,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 160ms, border-color 160ms, transform 200ms',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <path d="M2 2 L12 12" />
                    <path d="M12 2 L2 12" />
                  </svg>
                </button>
              </div>
            </header>

            <div className="container" style={{
              position: 'relative', zIndex: 2,
              padding: '200px 64px 64px',
              display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 80,
              alignItems: 'start',
            }}>
              <nav aria-label="Primary" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  ['Work',     'index.html#work'],
                  ['Services', 'index.html#services'],
                  ['Approach', 'index.html#approach'],
                  ['Contact',  'index.html#contact'],
                ].map(([l, href], i) => (
                  <a
                    key={l}
                    href={href}
                    style={{
                      fontSize: 96, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.04,
                      color: '#fff', textDecoration: 'none',
                      opacity: 0, transform: 'translateY(28px)',
                      animation: `pp-menu-link-in 720ms cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.08}s both`,
                      display: 'inline-block', width: 'fit-content',
                      transition: 'color 220ms ease, transform 220ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = A; e.currentTarget.style.transform = 'translateX(12px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    {l}
                  </a>
                ))}
              </nav>

              <aside style={{
                display: 'flex', flexDirection: 'column', gap: 32,
                opacity: 0,
                animation: 'pp-menu-link-in 720ms cubic-bezier(0.22, 1, 0.36, 1) 0.55s both',
              }}>
                <div>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Start a project</div>
                  <a href="index.html#contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: A, color: '#fff', fontSize: 15, fontWeight: 600,
                    padding: '18px 28px', borderRadius: 99,
                    textDecoration: 'none',
                    boxShadow: `0 12px 40px ${A}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  }}>Book a call →</a>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Reach us</div>
                  <a href="mailto:jp@realitytunnel.ai" style={{ display: 'block', fontSize: 17, color: '#fff', marginBottom: 6, textDecoration: 'none' }}>jp@realitytunnel.ai</a>
                  <a href="tel:+51958967616" style={{ display: 'block', fontSize: 17, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>+51 958 967 616</a>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Follow</div>
                  <div style={{ display: 'flex', gap: 18 }}>
                    {['Instagram', 'LinkedIn', 'Vimeo'].map((soc) => (
                      <a key={soc} href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{soc}</a>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // Breadcrumb — "← All work · {tag}". Both halves are functional links
  // back to the Selected Work section on the main page.
  // ───────────────────────────────────────────────────────────────────────
  function Breadcrumb({ project }) {
    const linkBase = {
      color: INK_MUTED, textDecoration: 'none',
      transition: 'color 160ms ease',
    };
    return (
      <div className="mono" style={{
        display: 'flex', alignItems: 'center', gap: 14,
        fontSize: 12, letterSpacing: '0.06em',
        color: INK_MUTED, marginBottom: 28, marginTop: 64,
      }}>
        <a href="index.html#work"
          style={linkBase}
          onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = INK_MUTED; }}
        >← All work</a>
        <span style={{ color: A }}>●</span>
        <a href="index.html#work"
          style={{ ...linkBase, color: INK }}
          onMouseEnter={(e) => { e.currentTarget.style.color = A; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = INK; }}
        >{project.tag}</a>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // ProjectHero — title + subtitle (no full-bleed image; video below)
  // ───────────────────────────────────────────────────────────────────────
  function ProjectHero({ project }) {
    return (
      <header style={{ paddingBottom: 40 }}>
        <h1 style={{
          fontSize: 'clamp(56px, 8.2vw, 112px)',
          lineHeight: 0.96, letterSpacing: '-0.028em',
          fontWeight: 700, color: INK, margin: 0,
          textWrap: 'pretty',
        }}>{project.title}</h1>
        <p style={{
          marginTop: 20, fontSize: 22, lineHeight: 1.45,
          color: INK_MUTED, fontWeight: 400,
          maxWidth: 820, margin: '20px 0 0',
        }}>{project.hero || project.sub}</p>
      </header>
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // MetaStrip — inline "● Client: X    ● Platform: Y    ● Market: Z"
  // ───────────────────────────────────────────────────────────────────────
  function MetaStrip({ project }) {
    const pairs = [];
    if (project.client)   pairs.push(['Client',   project.client]);
    if (project.platform) pairs.push(['Platform', project.platform]);
    if (project.market)   pairs.push(['Market',   project.market]);
    if (project.audience) pairs.push(['Audience', project.audience]);
    return (
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 40,
        padding: '28px 0',
        borderTop: `1px solid ${RULE}`,
        borderBottom: `1px solid ${RULE}`,
        fontSize: 14,
        color: INK,
      }}>
        {pairs.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: A, fontSize: 8 }}>●</span>
            <span style={{ color: INK_MUTED }}>{label}:</span>
            <span style={{ color: INK, fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // ProjectVideo — rounded YouTube iframe (16:9). Hidden when no youtube id.
  // ───────────────────────────────────────────────────────────────────────
  function ProjectVideo({ project }) {
    if (!project.youtube) return null;
    return (
      <div style={{ marginTop: 48 }}>
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '16 / 9',
          borderRadius: 18, overflow: 'hidden',
          background: '#000',
          boxShadow: '0 24px 60px rgba(10,10,10,0.18), 0 1px 0 rgba(10,10,10,0.06)',
        }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${project.youtube}?rel=0&modestbranding=1&color=white`}
            title={`${project.title} — video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              border: 0,
            }}
          />
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // ProjectBrief — "THE BRIEF" + "WHAT WE BUILT" two-column
  // ───────────────────────────────────────────────────────────────────────
  function ProjectBrief({ project }) {
    const cols = [
      ['The brief',    project.brief],
      ['What we built', project.built],
    ].filter(([, text]) => !!text);
    if (!cols.length) return null;
    return (
      <section style={{
        padding: '72px 0',
        borderTop: `1px solid ${RULE}`,
        marginTop: 56,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: cols.length > 1 ? '1fr 1fr' : '1fr',
          gap: 80,
        }}>
          {cols.map(([label, text]) => (
            <div key={label}>
              <div className="mono" style={{
                fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: A, marginBottom: 18,
              }}>{label}</div>
              <p style={{
                fontSize: 19, lineHeight: 1.55, color: INK,
                fontWeight: 400, margin: 0, textWrap: 'pretty',
              }}>{text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // ProjectsCarousel — constrained to site width. Other projects, scroll-
  // snap, prev/next + dots.
  // ───────────────────────────────────────────────────────────────────────
  function ProjectsCarousel({ current }) {
    const items = PROJECTS.filter((p) => p.slug !== current.slug);
    const trackRef = React.useRef(null);
    const [active, setActive] = React.useState(0);

    const scrollToIdx = (i) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[i];
      if (!card) return;
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    };

    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < track.children.length; i++) {
        const c = track.children[i];
        const dist = Math.abs(c.offsetLeft - track.scrollLeft);
        if (dist < bestDist) { bestDist = dist; best = i; }
      }
      setActive(best);
    };

    return (
      <section style={{
        background: '#fafaf7', borderTop: `1px solid ${RULE}`,
        padding: '80px 0 96px',
      }}>
        <div className="container">
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 32, gap: 24, flexWrap: 'wrap',
          }}>
            <div>
              <div className="mono" style={{
                fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: A, marginBottom: 14,
              }}>More work</div>
              <h3 style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.024em', margin: 0, lineHeight: 1.05, color: INK }}>
                Other projects from the studio
              </h3>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(() => {
                const atStart = active <= 0;
                const atEnd   = active >= items.length - 1;
                const btn = (disabled) => ({
                  ...carouselBtnStyle,
                  opacity: disabled ? 0.32 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  pointerEvents: disabled ? 'none' : 'auto',
                });
                return (
                  <React.Fragment>
                    <button
                      type="button"
                      aria-label="Previous project"
                      aria-disabled={atStart}
                      onClick={() => scrollToIdx(Math.max(0, active - 1))}
                      style={btn(atStart)}
                      onMouseEnter={(e) => { if (atStart) return; e.currentTarget.style.background = INK; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = INK; }}
                      onMouseLeave={(e) => { if (atStart) return; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = RULE; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        <path d="M9 2 L4 7 L9 12" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Next project"
                      aria-disabled={atEnd}
                      onClick={() => scrollToIdx(Math.min(items.length - 1, active + 1))}
                      style={btn(atEnd)}
                      onMouseEnter={(e) => { if (atEnd) return; e.currentTarget.style.background = INK; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = INK; }}
                      onMouseLeave={(e) => { if (atEnd) return; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = RULE; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        <path d="M5 2 L10 7 L5 12" />
                      </svg>
                    </button>
                  </React.Fragment>
                );
              })()}
            </div>
          </div>

          {/* Track — stays within the container so it respects site width */}
          <style>{`.pp-carousel-track::-webkit-scrollbar{display:none;}`}</style>
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="pp-carousel-track"
            style={{
              display: 'flex', gap: 20,
              overflowX: 'auto', overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              padding: '4px 4px',
              margin: '0 -4px',
              scrollbarWidth: 'none',
            }}
          >
            {items.map((p) => {
              const isExternal = p.url && /^https?:\/\//.test(p.url);
              const Tag = p.url ? 'a' : 'div';
              const tagProps = p.url
                ? { href: p.url, ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                : {};
              return (
                <Tag
                  key={p.slug || p.title}
                  {...tagProps}
                  style={{
                    flex: '0 0 calc((100% - 40px) / 3)',
                    scrollSnapAlign: 'start',
                    textDecoration: 'none', color: 'inherit',
                    borderRadius: 16, overflow: 'hidden',
                    background: '#ffffff', border: `1px solid ${RULE}`,
                    display: 'flex', flexDirection: 'column',
                    transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms ease, border-color 280ms ease',
                    cursor: p.url ? 'pointer' : 'default',
                  }}
                  onMouseEnter={p.url ? (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(10,10,10,0.22)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(10,10,10,0.10)'; } : undefined}
                  onMouseLeave={p.url ? (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = RULE; e.currentTarget.style.boxShadow = 'none'; } : undefined}
                >
                  <div style={{
                    width: '100%', aspectRatio: '4/3',
                    background: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 35%, rgba(0,0,0,0.4) 100%), url("${p.img}") center/cover no-repeat`,
                    position: 'relative',
                  }}>
                    <div className="mono" style={{
                      position: 'absolute', bottom: 10, right: 12,
                      fontSize: 10, color: '#fff', opacity: 0.78, letterSpacing: '0.12em',
                    }}>{p.year}</div>
                  </div>
                  <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
                    <div>
                      <div className="mono" style={{ fontSize: 10, color: A, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>{p.tag}</div>
                      <h4 style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.018em', marginBottom: 6, color: INK, margin: 0 }}>{p.title}</h4>
                      <div style={{ marginTop: 6, fontSize: 13.5, color: INK_MUTED, fontWeight: 400, lineHeight: 1.5 }}>{p.sub}</div>
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      paddingTop: 12, borderTop: `1px solid ${RULE}`,
                    }}>
                      <span className="mono" style={{ fontSize: 11, color: INK_MUTED }}>{p.client}</span>
                      <span className="mono" style={{ fontSize: 11, color: A }}>{p.metric}</span>
                    </div>
                  </div>
                </Tag>
              );
            })}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
            {items.map((p, i) => (
              <button
                key={p.slug || p.title}
                type="button"
                aria-label={`Go to ${p.title}`}
                onClick={() => scrollToIdx(i)}
                style={{
                  width: i === active ? 26 : 8, height: 8, borderRadius: 99,
                  border: 0, padding: 0, cursor: 'pointer',
                  background: i === active ? INK : 'rgba(10,10,10,0.18)',
                  transition: 'width 280ms ease, background 280ms ease',
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const carouselBtnStyle = {
    background: 'transparent',
    border: `1px solid ${RULE}`,
    color: INK, borderRadius: 99,
    width: 40, height: 40,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease',
  };

  // ───────────────────────────────────────────────────────────────────────
  // ProjectPage — composes everything. Nothing renders below the carousel.
  // ───────────────────────────────────────────────────────────────────────
  function ProjectPage() {
    const slug = window.RT_PROJECT_SLUG;
    const project = PROJECTS.find((p) => p.slug === slug);

    React.useEffect(() => {
      if (project) document.title = `${project.title} — Reality Tunnel`;
    }, [project && project.title]);

    if (!project) {
      return (
        <div style={{ minHeight: '100vh', background: '#fff', color: INK }}>
          <SiteNav />
          <div className="container" style={{ padding: '120px 0' }}>
            <h1 style={{ fontSize: 48, fontWeight: 600 }}>Project not found.</h1>
            <p>
              <a href="index.html#work" style={{ color: A }}>Back to selected work →</a>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="dirA" style={{ background: '#ffffff', color: INK, minHeight: '100vh' }}>
        <style>{`
          .dirA .container{max-width:1200px;margin:0 auto;padding:0 64px;}
          .dirA .mono{font-family:"JetBrains Mono",ui-monospace,monospace;letter-spacing:0.02em;}
          .dirA a{color:inherit;text-decoration:none;}
        `}</style>

        <main>
          <div className="container">
            <Breadcrumb project={project} />
            <ProjectHero project={project} />
            <MetaStrip project={project} />
            <ProjectVideo project={project} />
            <ProjectBrief project={project} />
          </div>
          <ProjectsCarousel current={project} />
        </main>
      </div>
    );
  }

  function mount() {
    const root = document.getElementById('root');
    if (!root) return;
    ReactDOM.createRoot(root).render(<ProjectPage />);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
