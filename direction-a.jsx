// Direction A — AURORA
// Cinematic dark mode. The ring constellation becomes architectural — an enormous
// orb of layered, drifting rings on the right side of the hero. Aurora gradient
// field behind. Type is large, balanced, atmospheric. Sections breathe; section
// transitions are gradient bleeds rather than hard cuts.

/* eslint-disable no-undef */

// ── TestimonialCarousel — cycles through TESTIMONIALS with prev/next + dots
function TestimonialCarousel({ accent }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = TESTIMONIALS.length;
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 8000);
    return () => clearInterval(t);
  }, [paused, n]);
  const t = TESTIMONIALS[i];
  const go = (delta) => setI((x) => (x + delta + n) % n);

  return (
    <div
      className="container"
      style={{ maxWidth: 880, textAlign: 'center', position: 'relative' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        fontFamily: '"Instrument Serif", Georgia, serif',
        fontStyle: 'italic',
        fontSize: 180, color: accent, lineHeight: 0.4,
        margin: '40px 0 -28px',
        userSelect: 'none',
      }} aria-hidden="true">“</div>

      <blockquote
        key={i}
        style={{
          margin: 0, padding: 0, fontSize: 28, lineHeight: 1.3, fontWeight: 400, letterSpacing: '-0.012em',
          color: '#0a0a0a', textWrap: 'balance',
          fontFamily: '"Sora", system-ui, sans-serif',
          minHeight: '6em',
          animation: 'dirA-testi-in 480ms ease-out both',
        }}
      >
        {t.quote}
      </blockquote>

      <div style={{
        marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
      }}>
        <img src={t.img} alt="" style={{ width: 44, height: 44, borderRadius: 99, objectFit: 'cover', background: '#eee' }} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>{t.name}</div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(10,10,10,0.55)', marginTop: 2 }}>{t.role}</div>
        </div>
      </div>

      <div style={{
        marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }} role="tablist" aria-label="Testimonials">
        {TESTIMONIALS.map((_, k) => (
          <button
            key={k}
            role="tab"
            aria-selected={k === i}
            aria-label={`Testimonial ${k + 1}`}
            onClick={() => setI(k)}
            style={{
              width: k === i ? 40 : 28, height: 4, borderRadius: 999, padding: 0, border: 0, cursor: 'pointer',
              background: k === i ? '#0a0a0a' : 'rgba(10,10,10,0.18)',
              transition: 'background 160ms, width 160ms',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── ApproachStepper — auto-cycling highlight across the 4 phases ──
function ApproachStepper({ accent }) {
  const n = APPROACH.length;
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [tick, setTick] = React.useState(0); // bumps to restart progress fill on manual nav
  const CYCLE_MS = 4200;

  // Auto-advance loop — pauses while hovered or when the section is offscreen
  const wrapRef = React.useRef(null);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    if (!wrapRef.current || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (paused || !visible) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % n), CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, paused, visible, n, tick]);

  const goTo = (i) => {
    setActive(i);
    setTick((t) => t + 1); // restart the countdown bar
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      {/* base connecting line */}
      <div style={{
        position: 'absolute', top: 36, left: '12%', right: '12%', height: 1,
        background: 'rgba(255,255,255,0.10)', zIndex: 0,
      }} />
      {/* progress line — fills proportionally to active step */}
      <div style={{
        position: 'absolute', top: 36, left: '12%', height: 1,
        width: `calc((100% - 24%) * ${active / Math.max(1, n - 1)})`,
        background: `linear-gradient(90deg, ${accent}aa 0%, ${accent}ff 100%)`,
        transition: 'width 700ms cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 0,
      }} />

      {APPROACH.map((step, i) => {
        const isActive = i === active;
        return (
          <div
            key={step.n}
            onClick={() => goTo(i)}
            role="button"
            tabIndex={0}
            style={{ position: 'relative', padding: '0 14px', cursor: 'pointer' }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: 99, margin: '0 auto 28px',
              background: isActive ? accent : 'rgba(255,255,255,0.04)',
              border: isActive ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.15)',
              boxShadow: isActive ? `0 0 40px ${accent}88` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"JetBrains Mono",monospace', fontSize: 14, fontWeight: 500,
              letterSpacing: '0.05em',
              position: 'relative', zIndex: 2,
              transform: isActive ? 'scale(1.06)' : 'scale(1)',
              color: '#fff',
              transition: 'background 360ms ease, border-color 360ms ease, box-shadow 480ms ease, transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>{step.n}</div>
            <h3 style={{
              fontSize: 24, fontWeight: 500, marginBottom: 12, textAlign: 'center', letterSpacing: '-0.018em',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.78)',
              transition: 'color 360ms ease',
            }}>{step.name}</h3>
            <p style={{
              fontSize: 14, lineHeight: 1.55, textAlign: 'center', fontWeight: 300,
              color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
              transition: 'color 360ms ease',
            }}>{step.blurb}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── ContactForm — two-column contact info + form ──
function ContactForm({ accent, secondary }) {
  const [form, setForm] = React.useState({
    name: '', company: '', email: '', service: '', budget: '', brief: '',
  });
  const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // For deployment: replace with real endpoint. For now, simulate + mailto fallback.
    const body = `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.brief}`;
    const href = `mailto:contact@realitytunnel.ai?subject=${encodeURIComponent('New project brief — ' + (form.name || 'unsigned'))}&body=${encodeURIComponent(body)}`;
    // Open mail client in a new tab
    window.open(href, '_blank');
    setSent(true);
  };

  const fieldStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', color: '#fff',
    border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10,
    padding: '14px 16px', fontSize: 15, fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 160ms, background 160ms',
  };
  const labelStyle = {
    display: 'block', fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)', marginBottom: 8,
  };

  if (sent) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: '64px 32px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 99, margin: '0 auto 24px',
          background: accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
        }}>✓</div>
        <h3 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>Thanks — your brief is on its way.</h3>
        <p style={{ marginTop: 16, fontSize: 17, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
          We'll reply within one business day with a shaped scope. In the meantime,
          your default mail client should have opened with the message — review and hit send.
        </p>
        <button
          type="button"
          onClick={() => { setSent(false); setForm({ name: '', company: '', email: '', service: '', budget: '', brief: '' }); }}
          style={{
            marginTop: 32, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)',
            color: '#fff', padding: '12px 22px', borderRadius: 99, cursor: 'pointer',
            fontSize: 13, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1100, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 56,
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 24, padding: '48px 48px',
    }}>
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: accent, marginBottom: 14,
          }}>Reach us directly</div>
          <a href="mailto:contact@realitytunnel.ai" style={{ display: 'block', fontSize: 16, color: '#fff', marginBottom: 8, textDecoration: 'none' }}>contact@realitytunnel.ai</a>
          <a href="tel:+51958967616" style={{ display: 'block', fontSize: 16, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>+51 958 967 616</a>
        </div>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: accent, marginBottom: 14,
          }}>Response time</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.55 }}>
            One business day. We'll come back with a written scope, a budget range, and a delivery schedule.
          </p>
        </div>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: accent, marginBottom: 14,
          }}>Studio</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.55 }}>
            Lima, Peru<br />Serving US &amp; LATAM
          </p>
        </div>
      </aside>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <label>
            <span style={labelStyle}>Name</span>
            <input required value={form.name} onChange={set('name')} type="text" placeholder="Your name" style={fieldStyle} />
          </label>
          <label>
            <span style={labelStyle}>Company</span>
            <input value={form.company} onChange={set('company')} type="text" placeholder="Brand or studio" style={fieldStyle} />
          </label>
        </div>
        <label>
          <span style={labelStyle}>Email</span>
          <input required value={form.email} onChange={set('email')} type="email" placeholder="you@company.com" style={fieldStyle} />
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <label>
            <span style={labelStyle}>What are you exploring?</span>
            <select required value={form.service} onChange={set('service')} style={{ ...fieldStyle, appearance: 'none' }}>
              <option value="" style={{ background: '#050913' }}>Select a service</option>
              <option value="ar" style={{ background: '#050913' }}>Augmented reality</option>
              <option value="vr" style={{ background: '#050913' }}>Virtual reality &amp; 360°</option>
              <option value="3d" style={{ background: '#050913' }}>3D visualization</option>
              <option value="ai" style={{ background: '#050913' }}>AI &amp; computer vision</option>
              <option value="event" style={{ background: '#050913' }}>Event activation</option>
              <option value="integration" style={{ background: '#050913' }}>Integration</option>
              <option value="other" style={{ background: '#050913' }}>Not sure yet</option>
            </select>
          </label>
          <label>
            <span style={labelStyle}>Budget range</span>
            <select value={form.budget} onChange={set('budget')} style={{ ...fieldStyle, appearance: 'none' }}>
              <option value="" style={{ background: '#050913' }}>Select a range</option>
              <option value="<25k" style={{ background: '#050913' }}>Under $25k</option>
              <option value="25-50k" style={{ background: '#050913' }}>$25k – $50k</option>
              <option value="50-100k" style={{ background: '#050913' }}>$50k – $100k</option>
              <option value="100k+" style={{ background: '#050913' }}>$100k+</option>
              <option value="discuss" style={{ background: '#050913' }}>Let's discuss</option>
            </select>
          </label>
        </div>
        <label>
          <span style={labelStyle}>Brief - Tell us all about it</span>
          <textarea
            required value={form.brief} onChange={set('brief')} rows={5}
            placeholder="What do you want to build? Audience, surface (web / iOS / event / headset), rough deadline."
            style={{ ...fieldStyle, resize: 'vertical', minHeight: 120, fontFamily: 'inherit' }}
          />
        </label>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 0, flexWrap: 'wrap' }}>
          <button
            type="submit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: accent, color: '#fff', fontSize: 15, fontWeight: 600,
              padding: '14px 28px', borderRadius: 99,
              border: 0, cursor: 'pointer',
              boxShadow: `0 12px 40px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
              transition: 'transform 200ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Send brief <span style={{ opacity: 0.8 }}>→</span>
          </button>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginTop: 18,
          }}>
            By submitting, you consent to be contacted by Reality Tunnel.
          </span>
        </div>
      </form>
    </div>
  );
}

function DirectionA({ accent, navPalette, keylineColor }) {
  // accent palette: [primary, secondary, tertiary, quaternary (ember)]
  const A = accent.primary;    // headline glow / CTA
  const B = accent.secondary;  // ring 2 / chip glow
  const C = accent.tertiary;   // ring 1 / deep glow
  const D = accent.quaternary; // ring 4 / inner ember

  // Ring colors for the LARGE hero orb + contact CTA mark (palette-driven).
  const ringColors = [C, B, A, D];
  // Independent palette for the small NAV ringmark.
  const navRingColors = navPalette || ringColors;
  // Independent color for the nav eye keyline (defaults to outer nav color).
  const navKeyline = keylineColor || navRingColors[0];

  // Hamburger / full-screen menu
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <div className="dirA" style={{
      position: 'relative', width: '100%', minHeight: '100%',
      background: '#050913', color: '#fff',
      fontFamily: '"Sora", system-ui, sans-serif',
      fontWeight: 400, lineHeight: 1.5,
      overflow: 'hidden',
    }}>
      <style>{`
        .dirA *{box-sizing:border-box;}
        .dirA h1,.dirA h2,.dirA h3,.dirA h4{margin:0;letter-spacing:-0.03em;font-weight:600;}
        .dirA a{color:inherit;text-decoration:none;}
        .dirA .mono{font-family:"JetBrains Mono",ui-monospace,monospace;letter-spacing:0.02em;}
        .dirA .container{max-width:1280px;margin:0 auto;padding:0 64px;}
        .dirA .eyebrow{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${A};display:inline-flex;align-items:center;gap:10px;}
        .dirA .eyebrow::before{content:"";width:6px;height:6px;border-radius:99px;background:${A};box-shadow:0 0 12px ${A};}
        @keyframes dirA-orb-drift{0%,100%{transform:translate(0,0) rotate(0deg) scale(1);}25%{transform:translate(0,3%) rotate(-2deg) scale(1.02);}50%{transform:translate(0,-3%) rotate(3deg) scale(0.98);}75%{transform:translate(0,2%) rotate(-1deg) scale(1.01);}}
        @keyframes dirA-orb-pulse{0%,100%{filter:drop-shadow(0 0 80px ${A}88) drop-shadow(0 0 200px ${B}66);}50%{filter:drop-shadow(0 0 120px ${A}aa) drop-shadow(0 0 260px ${B}88);}}
        .dirA .mq-wrap{display:flex;flex-direction:column;gap:24px;position:relative;}
        .dirA .mq-row{display:flex;overflow:hidden;width:100%;}
        .dirA .mq-row:hover .mq-track{animation-play-state:paused;}
        .dirA .mq-track{display:flex;align-items:center;gap:56px;flex-shrink:0;}
        .dirA .mq-fwd{animation:dirA-mq-fwd 50s linear infinite;}
        .dirA .mq-rev{animation:dirA-mq-fwd 60s linear infinite reverse;}
        .dirA .mq-logo{height:36px;width:auto;max-width:160px;object-fit:contain;opacity:0.55;flex-shrink:0;filter:brightness(0) invert(1);transition:opacity 200ms;}
        .dirA .mq-logo:hover{opacity:1;}
        @keyframes dirA-mq-fwd{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes dirA-shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
        .dirA .origin-blobs{position:absolute;inset:-10%;z-index:0;pointer-events:none;filter:blur(90px);overflow:hidden;}
        .dirA .origin-blobs .ob{position:absolute;border-radius:50%;mix-blend-mode:screen;will-change:transform;}
        .dirA .origin-blobs .ob1{width:50%;height:50%;background:#0a2a5e;opacity:0.55;top:-8%;left:-6%;animation:dirA-ob1 28s ease-in-out infinite;}
        .dirA .origin-blobs .ob2{width:42%;height:42%;background:#1a0a4a;opacity:0.50;top:18%;right:-8%;animation:dirA-ob2 36s ease-in-out infinite;}
        .dirA .origin-blobs .ob3{width:46%;height:46%;background:#04263a;opacity:0.45;bottom:-12%;left:18%;animation:dirA-ob3 32s ease-in-out infinite;}
        .dirA .origin-blobs .ob4{width:36%;height:36%;background:#2a0a3a;opacity:0.35;bottom:6%;right:12%;animation:dirA-ob4 40s ease-in-out infinite;}
        @keyframes dirA-ob1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(8%,6%) scale(1.1);}}
        @keyframes dirA-ob2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-12%,10%) scale(0.92);}}
        @keyframes dirA-ob3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(10%,-8%) scale(1.06);}}
        @keyframes dirA-ob4{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-8%,-12%) scale(1.12);}}
        @media (prefers-reduced-motion:reduce){.dirA .origin-blobs .ob{animation:none!important;}}
        @keyframes dirA-menu-bg-in{from{opacity:0;}to{opacity:1;}}
        @keyframes dirA-menu-link-in{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @media (prefers-reduced-motion:reduce){
          [role="dialog"][aria-modal="true"]{animation:none!important;}
          .dirA .menu-link{animation:none!important;opacity:1!important;transform:none!important;}
        }
        @keyframes dirA-testi-in{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}

        .dirA .shimmer{background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.08) 50%,transparent 100%);background-size:200% 100%;animation:dirA-shimmer 4s ease-in-out infinite;}
        .dirA .rt-wordmark{display:flex;flex-direction:column;line-height:1;}
        .dirA .rt-wordmark .rt-word{font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:300;font-size:27px;letter-spacing:0.28em;line-height:1;color:#fff;white-space:nowrap;}
        .dirA .rt-wordmark .rt-word .ch{display:inline-block;opacity:0;transform:var(--from) rotate(var(--rot));animation-name:dirA-char-in;animation-timing-function:cubic-bezier(0.22,1,0.36,1);animation-fill-mode:forwards;will-change:transform,opacity;}
        .dirA .rt-wordmark .rt-word .sp{display:inline-block;}
        @keyframes dirA-char-in{from{opacity:0;transform:var(--from) rotate(var(--rot));}to{opacity:1;transform:translate(0,0) rotate(0deg);}}
        .dirA .rt-wordmark .rt-tag{font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:400;font-size:10px;letter-spacing:0.48em;line-height:1;color:rgba(255,255,255,0.55);white-space:nowrap;text-transform:uppercase;margin-top:8px;opacity:0;animation:dirA-tag-in 0.9s cubic-bezier(0.22,1,0.36,1) 2.4s both;}
        @keyframes dirA-tag-in{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
        @media (prefers-reduced-motion:reduce){
          .dirA .rt-wordmark .rt-word .ch{animation:none!important;opacity:1!important;transform:none!important;}
          .dirA .rt-wordmark .rt-tag{animation:none!important;opacity:1!important;}
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: 900, overflow: 'hidden' }}>
        <AuroraField accent={[A, B, C]} />

        {/* Enormous ring orb — architectural element. Constrained to the same 1280
            container as the page content so the orb tracks the right edge of the
            content area instead of hanging off the viewport edge. */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="container" style={{ position: 'relative', height: '100%' }}>
            <div style={{
              position: 'absolute', top: '50%', right: -180, transform: 'translateY(-50%)',
              width: 1400, height: 1400, pointerEvents: 'none',
              animation: 'dirA-orb-drift 14s ease-in-out infinite, dirA-orb-pulse 7s ease-in-out infinite',
            }}>
              <svg viewBox="0 0 42 50" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <g transform="translate(0 25)">
                  <ellipse cx="20.74" cy="0"    rx="20.26" ry="25.08" fill={ringColors[0]} opacity="0.55" />
                  <ellipse cx="23.77" cy="0.56" rx="16.68" ry="20.64" fill={ringColors[1]} opacity="0.65" />
                  <ellipse cx="27.79" cy="0.62" rx="12.21" ry="15.11" fill={ringColors[2]} opacity="0.85" />
                  <ellipse cx="31.47" cy="1.17" rx="7.83"  ry="9.69"  fill={ringColors[3]} opacity="0.95" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Header */}
        <header style={{
          position: 'relative', zIndex: 2,
          padding: '32px 0',
        }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width={89} height={89 * (50 / 42)} viewBox="0 0 42 50" style={{ display: 'block', overflow: 'hidden' }} aria-hidden="true">
              <defs>
                <clipPath id="rt-nav-clip">
                  <path d="M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z" />
                </clipPath>
              </defs>
              <style>{`
                .tunnel-ring{transform-box:fill-box;transform-origin:center;opacity:0;animation:tunnel-flow 3.6s cubic-bezier(0.4,0,0.7,0.6) infinite;will-change:transform,opacity;}
                .tr1{animation-delay:-3.0s;}
                .tr2{animation-delay:-2.28s;}
                .tr3{animation-delay:-1.56s;}
                .tr4{animation-delay:-0.84s;}
                .tr5{animation-delay:-0.12s;}
                @keyframes tunnel-flow{
                  0%   { transform:scale(0.12); opacity:0;   }
                  8%   { opacity:0.95; }
                  70%  { opacity:0.85; }
                  100% { transform:scale(3.8);  opacity:0;   }
                }
                @media (prefers-reduced-motion:reduce){
                  .tunnel-ring{animation:none!important;opacity:1!important;transform:scale(1)!important;}
                }
              `}</style>
              {/* Static orange keyline — thick stroke around the same eye path so the keyline
                  sits flush against the filled eye with no dark gap between. Half the stroke
                  width sits inside the fill (invisible, same color); the other half extends
                  beyond, creating the visible halo. */}
              {/* Eye fill (defines the clipped region for the tunnel) */}
              <path d="M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z" fill={navRingColors[0]} />
              {/* Keyline — same shape, shifted up a hair, independent of the fill + tunnel */}
              <path d="M 5,24 Q 21,3 37,24 Q 21,45 5,24 Z"
                    fill="none" stroke={navKeyline} strokeWidth="4" strokeLinejoin="miter" />
              {/* Tunnel rings spawning near the top, scaling down through the eye */}
              <g clipPath="url(#rt-nav-clip)">
                <circle className="tunnel-ring tr1" cx="21" cy="15" r="5" fill={navRingColors[1]} />
                <circle className="tunnel-ring tr2" cx="21" cy="15" r="5" fill={navRingColors[2]} />
                <circle className="tunnel-ring tr3" cx="21" cy="15" r="5" fill={navRingColors[1]} />
                <circle className="tunnel-ring tr4" cx="21" cy="15" r="5" fill={navRingColors[2]} />
                <circle className="tunnel-ring tr5" cx="21" cy="15" r="5" fill={navRingColors[1]} />
              </g>
            </svg>
            <div className="rt-wordmark">
              <ScatterWord className="rt-word" text="REALITY TUNNEL" baseDelay={1.4} stagger={0.06} duration={1.2} />
              <span className="rt-tag">Immersive Experiences Studio</span>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[
              ['Work', '#work'],
              ['Services', '#services'],
              ['Approach', '#approach'],
              ['Contact', '#contact'],
            ].map(([l, href]) => (
              <a key={l} href={href} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', padding: '8px 14px', borderRadius: 99 }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="mono" style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.75)', fontSize: 11, padding: '8px 12px', borderRadius: 99,
              cursor: 'pointer',
            }}>EN · ES</button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', borderRadius: 99,
                width: 44, height: 44,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                transition: 'background 160ms, border-color 160ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M1 2 L17 2" />
                <path d="M1 7 L17 7" />
                <path d="M1 12 L11 12" />
              </svg>
            </button>
          </div>
          </div>
        </header>

        {/* Hero content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 16 }}>
          <div style={{ maxWidth: 920 }}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>Creating alternate realities since 2024</div>
          <h1 style={{
            fontSize: 80, lineHeight: 1.0, letterSpacing: '-0.015em',
            fontWeight: 600, color: '#fff',
            textShadow: `0 2px 32px rgba(0,0,0,0.5), 0 0 60px ${A}22`,
          }}>
            Unforgettable<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.85)', display: 'inline-block', transform: 'translateY(6px)' }}>AR, VR &amp; 3D</span><br />
            experiences that<br />
            move the needle.
          </h1>
          <p style={{
            marginTop: 24, fontSize: 19, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)',
            maxWidth: 540, fontWeight: 300,
            textShadow: '0 1px 12px rgba(0,0,0,0.5)',
          }}>
            We design, build, and integrate brand experiences that customers remember — and act upon with a senior team that's shipped together for a decade.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="#contact" style={{
              background: A, color: '#fff', fontSize: 15, fontWeight: 600,
              padding: '16px 28px', borderRadius: 99,
              boxShadow: `0 12px 40px ${A}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>Start a project <span style={{ opacity: 0.7 }}>→</span></a>
            <a href="#" style={{
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
              color: '#fff', fontSize: 15, fontWeight: 500,
              padding: '15px 26px', borderRadius: 99,
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                width: 26, height: 26, borderRadius: 99, background: 'rgba(255,255,255,0.12)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
              }}>▶</span>
              Watch the showreel
            </a>
          </div>

          </div>
        </div>

        {/* trust strip at bottom of hero */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
          padding: '24px 0',
        }}>
          <div className="container">
          <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Trusted by</span>
            <span>Manchester United</span><span>·</span>
            <span>Hewlett Packard</span><span>·</span>
            <span>Interbank</span><span>·</span>
            <span>BBVA</span><span>·</span>
            <span>Sony</span><span>·</span>
            <span>Ford</span>
          </div>
          </div>
        </div>
      </section>

      {/* ── HAMBURGER MENU OVERLAY ──────────────────────── */}
      {menuOpen && (
        <div
          role="dialog" aria-modal="true" aria-label="Site menu"
          onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(105,0,233,0.35) 0%, transparent 65%), linear-gradient(180deg, #07061a 0%, #050913 60%, #02030c 100%)',
            animation: 'dirA-menu-bg-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both',
            overflow: 'hidden',
          }}
        >
          {/* Drifting accent orbs behind the menu */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', width: 700, height: 700, top: '-15%', right: '-10%',
              background: `radial-gradient(circle, ${A}55 0%, transparent 65%)`,
              filter: 'blur(80px)',
              animation: 'dirA-orb-drift 18s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', width: 600, height: 600, bottom: '-15%', left: '-10%',
              background: `radial-gradient(circle, ${B}44 0%, transparent 65%)`,
              filter: 'blur(80px)',
              animation: 'dirA-orb-drift 22s ease-in-out infinite reverse',
            }} />
          </div>

          {/* Menu header — close button positioned to mirror the hero hamburger */}
          <header style={{ position: 'relative', zIndex: 2, padding: '32px 0' }}>
            <div className="container" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              minHeight: 106, // matches hero logo height (89 * 50/42) so close button shares burger's y
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

          {/* Menu content grid: large nav links + contact info */}
          <div className="container" style={{
            position: 'relative', zIndex: 2,
            padding: '200px 64px 64px',
            display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 80,
            alignItems: 'start',
          }}>
            <nav aria-label="Primary" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                ['Work', '#work'],
                ['Services', '#services'],
                ['Approach', '#approach'],
                ['Contact', '#contact'],
              ].map(([l, href], i) => (
                <a
                  key={l}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="menu-link"
                  style={{
                    fontSize: 96, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.04,
                    color: '#fff', textDecoration: 'none',
                    opacity: 0, transform: 'translateY(28px)',
                    animation: `dirA-menu-link-in 720ms cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.08}s both`,
                    position: 'relative', display: 'inline-block', width: 'fit-content',
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
              animation: 'dirA-menu-link-in 720ms cubic-bezier(0.22, 1, 0.36, 1) 0.55s both',
            }}>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Start a project</div>
                <a href="#contact" onClick={() => setMenuOpen(false)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: A, color: '#fff', fontSize: 15, fontWeight: 600,
                  padding: '18px 28px', borderRadius: 99,
                  boxShadow: `0 12px 40px ${A}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
                }}>Book a call →</a>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Reach us</div>
                <a href="mailto:contact@realitytunnel.ai" style={{ display: 'block', fontSize: 17, color: '#fff', marginBottom: 6 }}>contact@realitytunnel.ai</a>
                <a href="tel:+51958967616" style={{ display: 'block', fontSize: 17, color: 'rgba(255,255,255,0.75)' }}>+51 958 967 616</a>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Follow</div>
                <div style={{ display: 'flex', gap: 18 }}>
                  {['Instagram', 'LinkedIn', 'Vimeo'].map((soc) => (
                    <a key={soc} href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{soc}</a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ── CLIENTS (logo scroll) — directly below the hero ────────────── */}
      <section style={{
        position: 'relative', padding: '88px 0 96px',
        background:
          'radial-gradient(ellipse 60% 55% at 80% 20%, rgba(105,0,233,0.30) 0%, transparent 65%),' +
          'radial-gradient(ellipse 50% 45% at 12% 80%, rgba(0,174,239,0.18) 0%, transparent 65%),' +
          'radial-gradient(ellipse 45% 35% at 55% 95%, rgba(254,88,40,0.14) 0%, transparent 60%),' +
          'linear-gradient(180deg, #1c1f3a 0%, #14172a 55%, #0e1124 100%)',
        overflow: 'hidden',
      }}>
        <div className="container" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>46 brands · 100+ projects</div>
          <h2 style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.024em', lineHeight: 1.05, maxWidth: 900 }}>
            Trusted by the brands that <span style={{ color: A }}>can't afford to be ignored.</span>
          </h2>
        </div>
        <div className="mq-wrap">
          <div className="mq-row">
            <div className="mq-track mq-fwd">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => (
                <img key={'a-' + i} src={src} alt="" className="mq-logo" />
              ))}
            </div>
          </div>
          <div className="mq-row">
            <div className="mq-track mq-rev">
              {[...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse()].map((src, i) => (
                <img key={'b-' + i} src={src} alt="" className="mq-logo" />
              ))}
            </div>
          </div>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(90deg, #171a2c 0%, transparent 6%, transparent 94%, #171a2c 100%)',
          }} />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section id="services" style={{ position: 'relative', padding: '88px 0 96px', background: '#ffffff', color: '#0a0a0a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, marginBottom: 40 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 28 }}>Capabilities · 06</div>
              <h2 style={{ fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.028em', color: '#0a0a0a' }}>
                Six practices.<br />
                <span style={{ color: A }}>One delivery team.</span>
              </h2>
            </div>
            <div style={{ paddingTop: 60 }}>
              <p style={{ fontSize: 19, lineHeight: 1.55, color: 'rgba(10,10,10,0.7)', fontWeight: 400, maxWidth: 480 }}>
                No pyramid. The people pitching are the people prototyping, building, and pushing pixels at 3am the night before launch.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {SERVICES.map((s, i) => {
              const tints = [
                [A, '#7a2509'],         // brand accent orange (tweakable)
                ['#2c95b8', '#0e4c63'], // brand cyan
                ['#6b2cc4', '#2a0b6e'], // brand violet
                ['#2c5180', '#15355c'], // medium dark blue
                ['#3f8f5c', '#1c4d33'], // green
                ['#161e3a', '#06090f'], // midnight
              ];
              const grad = `linear-gradient(135deg, ${tints[i % tints.length][0]} 0%, ${tints[i % tints.length][1]} 100%)`;
              return (
              <div key={s.num} style={{
                padding: 32, borderRadius: 20,
                background: grad,
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative', overflow: 'hidden',
                minHeight: 240,
                transition: 'background 200ms, border-color 200ms',
              }}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.1em' }}>{s.num} / 06</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 14,
                  }}>↗</div>
                </div>
                <h3 style={{ fontSize: 26, marginBottom: 14, fontWeight: 600, letterSpacing: '-0.02em', color: '#ffffff', position: 'relative' }}>{s.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', fontWeight: 400, position: 'relative' }}>{s.blurb}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS MARQUEE — refined band, lifted brand-tinted slate */}
      <section style={{
        position: 'relative',
        background: '#1c2138',
        color: '#fff',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* Subtle brand-color wash, low opacity */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 900px 360px at 80% 50%, ${C}33 0%, transparent 70%), radial-gradient(ellipse 600px 320px at 15% 30%, ${B}1f 0%, transparent 70%)`,
        }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1280, margin: '0 auto' }}>
          {[
            { label: 'projects shipped',             value: '100', suffix: '+' },
            { label: 'years in AR / VR development', value: '12' },
            { label: 'average KPI lift',             prefix: '↑', value: '28', suffix: '%' },
            { label: 'concept to deployment',        value: '6',   unit: 'weeks' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '44px 40px',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div className="mono" style={{
                fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', marginBottom: 18,
              }}>{s.label}</div>
              <div style={{
                fontSize: 44, fontWeight: 500, color: '#fff',
                letterSpacing: '-0.025em', lineHeight: 1,
                display: 'flex', alignItems: 'baseline', gap: 2,
              }}>
                {s.prefix && <span style={{ color: A, marginRight: 4 }}>{s.prefix}</span>}
                <span>{s.value}</span>
                {s.suffix && <span style={{ color: A }}>{s.suffix}</span>}
                {s.unit && <span style={{ fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.6)', marginLeft: 8, letterSpacing: 0 }}>{s.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────── */}
      <section id="work" style={{ position: 'relative', padding: '104px 0 80px', background: '#ffffff', color: '#0a0a0a' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 28 }}>Selected work · 2022–2025</div>
              <h2 style={{ fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.028em', color: '#0a0a0a' }}>
                Built with brands that<br />
                <span style={{ color: A }}>need to move metrics.</span>
              </h2>
            </div>
            <a href="#" style={{
              fontSize: 13, fontWeight: 500, color: '#0a0a0a',
              padding: '12px 20px', borderRadius: 99,
              border: '1px solid rgba(10,10,10,0.20)',
              background: '#ffffff',
            }}>All 47 projects →</a>
          </div>

          {/* Featured project — cinematic (image background + readability overlay) */}
          <div style={{
            position: 'relative', borderRadius: 24, overflow: 'hidden',
            background: `linear-gradient(135deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.0) 40%, rgba(10,10,15,0.85) 100%), url("projects/manchester-united.webp") center/cover no-repeat`,
            aspectRatio: '21 / 9', marginBottom: 24,
            border: '1px solid rgba(10,10,10,0.08)',
            boxShadow: '0 1px 0 rgba(10,10,10,0.04), 0 16px 48px rgba(10,10,10,0.08)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.3\'/></svg>")',
              mixBlendMode: 'overlay',
            }} />
            {/* fake stadium silhouette via gradient */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
            }} />
            <div style={{ position: 'absolute', top: 32, right: 32 }}>
              <EyeMark size={64} colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.92)']} keylineColor="rgba(255,255,255,0.70)" strokeWidth={3} scope="feat" />
            </div>
            <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Featured · Virtual reality</div>
                <h3 style={{ fontSize: 56, lineHeight: 0.98, color: '#fff', letterSpacing: '-0.03em', maxWidth: 720 }}>
                  Manchester United VR
                </h3>
                <p style={{ marginTop: 14, fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 460, fontWeight: 300 }}>
                  An Old Trafford experience that brought 14M global fans into the stadium without leaving home.
                </p>
              </div>
              <div className="mono" style={{ textAlign: 'right', color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.8 }}>
                <div style={{ opacity: 0.55, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Client</div>
                <div>Manchester United F.C.</div>
                <div style={{ opacity: 0.55, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 12 }}>Outcome</div>
                <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>14M views</div>
              </div>
            </div>
          </div>

          {/* 5 more projects grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {PROJECTS.slice(1, 4).map((p, i) => (
              <div key={p.title} style={{
                padding: 28, borderRadius: 18,
                background: '#fafaf7', border: '1px solid rgba(10,10,10,0.08)',
                minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{
                  width: '100%', aspectRatio: '4/3', borderRadius: 10, marginBottom: 24,
                  background: [
                    `linear-gradient(180deg, rgba(0,0,0,0.10) 0%, transparent 35%, rgba(0,0,0,0.45) 100%), url("projects/interbank-360.webp") center/cover no-repeat`,
                    `linear-gradient(180deg, rgba(0,0,0,0.10) 0%, transparent 35%, rgba(0,0,0,0.45) 100%), url("projects/hp-ar.webp") center/cover no-repeat`,
                    `linear-gradient(180deg, rgba(0,0,0,0.10) 0%, transparent 35%, rgba(0,0,0,0.45) 100%), url("projects/talentolandia.webp") center/cover no-repeat`,
                  ][i],
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    <EyeMark size={30} colors={['rgba(255,255,255,0.14)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.95)']} keylineColor="rgba(255,255,255,0.75)" strokeWidth={3} scope={`tile-${p.title.replace(/\W+/g,'').toLowerCase()}`} />
                  </div>
                  <div className="mono" style={{
                    position: 'absolute', bottom: 10, right: 12,
                    fontSize: 10, color: '#fff', opacity: 0.7, letterSpacing: '0.12em',
                  }}>{p.year}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: A, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>{p.tag}</div>
                  <h4 style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.018em', marginBottom: 6, color: '#0a0a0a' }}>{p.title}</h4>
                  <div style={{ fontSize: 13, color: 'rgba(10,10,10,0.65)', fontWeight: 400, lineHeight: 1.5, marginBottom: 14 }}>{p.sub}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(10,10,10,0.08)' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'rgba(10,10,10,0.55)' }}>{p.client}</span>
                    <span className="mono" style={{ fontSize: 11, color: A }}>{p.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ─────────────────────────────────────── */}
      <section id="approach" style={{ position: 'relative', padding: '88px 0 120px', background: 'linear-gradient(180deg, #081a30 0%, #0a1530 60%, #0a1228 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="eyebrow" style={{ marginBottom: 28 }}>How we work</div>
            <h2 style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: 900, margin: '0 auto' }}>
              Four phases.<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.7)' }}>No surprises.</span>
            </h2>
          </div>

          <ApproachStepper accent={A} />
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────── */}
      <section style={{
        position: 'relative', padding: '80px 0 112px',
        background: '#ffffff', color: '#0a0a0a',
      }}>
        <TestimonialCarousel accent={A} />
      </section>

      {/* ── ABOUT THE NAME — gradient bg + slow drifting dark blobs ── */}
      <section id="studio" style={{
        position: 'relative', padding: '88px 0 80px',
        background: 'linear-gradient(180deg, #081a30 0%, #0a1530 60%, #0a1228 100%)',
        color: '#eaf2ff',
        overflow: 'hidden', isolation: 'isolate',
      }}>
        {/* Dark drifting blobs — low-opacity deep brand tones blended via screen so they
            lift the gradient subtly without obscuring the foreground text */}
        <div className="origin-blobs" aria-hidden="true">
          <div className="ob ob1" />
          <div className="ob ob2" />
          <div className="ob ob3" />
          <div className="ob ob4" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 28, color: '#fff' }}>About the name</div>
              <h2 style={{
                fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.028em',
                color: '#ffffff', fontWeight: 600, textWrap: 'balance',
              }}>
                Why we’re called <span style={{ color: A }}>Reality Tunnel.</span>
              </h2>
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 640,
              fontSize: 17, lineHeight: 1.6, color: '#f5efff',
            }}>
              <p style={{ margin: 0 }}>
                The phrase <em style={{ fontStyle: 'italic', color: A }}>Reality Tunnel</em> was coined by writer and futurist Robert Anton Wilson in the 1980s, building on Timothy Leary’s earlier work on the eight-circuit model of consciousness. Wilson’s idea is deceptively simple: every person inhabits a unique perceptual reality shaped by their language, beliefs, conditioning, and senses — a “tunnel” of interpretation through which the world reaches them. No two people see the same world; we all navigate slightly different versions of it. The metaphor stuck because it captures something true about human experience: reality is not received, it’s constructed.
              </p>
              <p style={{ margin: 0 }}>
                That premise sits at the heart of what we do. When we build augmented reality, virtual reality, and 3D experiences, we’re designing new tunnels — deliberate, crafted environments that change how people perceive a product, a place, a story, or each other. Our work is the practical application of Wilson’s insight: if perception can be reshaped, then experience can be designed. Every project we ship is a tunnel built with intention, taking customers somewhere their default reality doesn’t reach, and leaving them with something they’ll remember and act on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT — full contact section with form ──────────────────── */}
      <section id="contact" style={{ position: 'relative', padding: '88px 0 64px', overflow: 'hidden', background: '#050913' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 80% at 50% 30%, ${A}33 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 85% 75%, ${B}33 0%, transparent 60%)`,
          filter: 'blur(40px)',
        }} />

        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 980, marginBottom: 64 }}>
          <div style={{ display: 'inline-block', marginBottom: 20 }}>
            <EyeMark size={88} colors={navRingColors} keylineColor={navKeyline} strokeWidth={4} scope="contact" />
          </div>
          <h2 style={{ fontSize: 72, lineHeight: 1.04, letterSpacing: '-0.035em', fontWeight: 600 }}>
            Tell us what you want<br />to build <span style={{ fontStyle: 'italic', fontWeight: 300, color: A }}>next.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '24px auto 0', fontWeight: 300, lineHeight: 1.5 }}>
            Give us a call or fill out a brief— whichever is easiest. We'll come back to you with a scope that meets your budget.
          </p>
        </div>

        <div className="container" style={{ position: 'relative' }}>
          <ContactForm accent={A} secondary={B} />
        </div>

          <div style={{
            paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.08)',
            maxWidth: 1100, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '2.2fr 0.7fr 1fr 1fr', gap: 56,
            textAlign: 'left',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <EyeMark size={36} colors={navRingColors} keylineColor={navKeyline} strokeWidth={3} scope="ft" />
                <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300, letterSpacing: '0.28em', fontSize: 13, color: '#fff' }}>REALITY TUNNEL</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', maxWidth: 280, lineHeight: 1.55, margin: 0 }}>
                Providing US &amp; LATAM markets with immersive experiences since 2014.
              </p>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 11, color: A, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Studio</div>
              {[
                ['Work', '#work'],
                ['Services', '#services'],
                ['Approach', '#approach'],
                ['Contact', '#contact'],
              ].map(([l, href]) => (
                <a
                  key={l}
                  href={href}
                  onClick={(e) => {
                    const target = document.querySelector(href);
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.75)', padding: '4px 0', textDecoration: 'none' }}
                >{l}</a>
              ))}
            </div>

            <div>
              <div className="mono" style={{ fontSize: 11, color: A, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Reach us</div>
              <a href="mailto:contact@realitytunnel.ai" style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.75)', padding: '4px 0', textDecoration: 'none' }}>contact@realitytunnel.ai</a>
              <a href="tel:+51958967616" style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.75)', padding: '4px 0', textDecoration: 'none' }}>+51 958 967 616</a>
              <span style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.75)', padding: '4px 0' }}>Lima · LATAM &amp; US</span>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 11, color: A, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Follow</div>
              {['Instagram', 'LinkedIn', 'Vimeo', 'GitHub'].map((s) => (
                <a key={s} href="#" style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.75)', padding: '4px 0', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>

          <div style={{
            maxWidth: 1100, margin: '40px auto 0',
            paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              ©2026 Reality Tunnel · US · Lima · LATAM
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              All rights reserved
            </div>
          </div>
      </section>
    </div>
  );
}

window.DirectionA = DirectionA;
