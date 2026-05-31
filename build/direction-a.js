/* Compiled from direction-a.jsx — do not edit directly; edit the .jsx source and rebuild. */
;(function(){
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Direction A — AURORA
// Cinematic dark mode. The ring constellation becomes architectural — an enormous
// orb of layered, drifting rings on the right side of the hero. Aurora gradient
// field behind. Type is large, balanced, atmospheric. Sections breathe; section
// transitions are gradient bleeds rather than hard cuts.

/* eslint-disable no-undef */

// ── TestimonialCarousel — cycles through TESTIMONIALS with prev/next + dots
function TestimonialCarousel({
  accent
}) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = TESTIMONIALS.length;
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI(x => (x + 1) % n), 8000);
    return () => clearInterval(t);
  }, [paused, n]);
  const t = TESTIMONIALS[i];
  const go = delta => setI(x => (x + delta + n) % n);
  return /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 880,
      textAlign: 'center',
      position: 'relative'
    },
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontStyle: 'italic',
      fontSize: 180,
      color: accent,
      lineHeight: 0.4,
      margin: '40px 0 -28px',
      userSelect: 'none'
    },
    "aria-hidden": "true"
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", {
    key: i,
    style: {
      margin: 0,
      padding: 0,
      fontSize: 28,
      lineHeight: 1.3,
      fontWeight: 400,
      letterSpacing: '-0.012em',
      color: '#0a0a0a',
      textWrap: 'balance',
      fontFamily: '"Sora", system-ui, sans-serif',
      minHeight: '6em',
      animation: 'dirA-testi-in 480ms ease-out both'
    }
  }, t.quote), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: t.img,
    alt: "",
    style: {
      width: 44,
      height: 44,
      borderRadius: 99,
      objectFit: 'cover',
      background: '#eee'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#0a0a0a'
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'rgba(10,10,10,0.55)',
      marginTop: 2
    }
  }, t.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    },
    role: "tablist",
    "aria-label": "Testimonials"
  }, TESTIMONIALS.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    role: "tab",
    "aria-selected": k === i,
    "aria-label": `Testimonial ${k + 1}`,
    onClick: () => setI(k),
    style: {
      width: k === i ? 40 : 28,
      height: 4,
      borderRadius: 999,
      padding: 0,
      border: 0,
      cursor: 'pointer',
      background: k === i ? '#0a0a0a' : 'rgba(10,10,10,0.18)',
      transition: 'background 160ms, width 160ms'
    }
  }))));
}

// ── ApproachStepper — auto-cycling highlight across the 4 phases ──
function ApproachStepper({
  accent
}) {
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
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25
    });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (paused || !visible) return;
    const id = setTimeout(() => setActive(a => (a + 1) % n), CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, paused, visible, n, tick]);
  const goTo = i => {
    setActive(i);
    setTick(t => t + 1); // restart the countdown bar
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    className: "approach-row",
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "approach-line",
    style: {
      position: 'absolute',
      top: 36,
      left: '12%',
      right: '12%',
      height: 1,
      background: 'rgba(255,255,255,0.10)',
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "approach-line",
    style: {
      position: 'absolute',
      top: 36,
      left: '12%',
      height: 1,
      width: `calc((100% - 24%) * ${active / Math.max(1, n - 1)})`,
      background: `linear-gradient(90deg, ${accent}aa 0%, ${accent}ff 100%)`,
      transition: 'width 700ms cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 0
    }
  }), APPROACH.map((step, i) => {
    const isActive = i === active;
    return /*#__PURE__*/React.createElement("div", {
      key: step.n,
      onClick: () => goTo(i),
      role: "button",
      tabIndex: 0,
      style: {
        position: 'relative',
        padding: '0 14px',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 72,
        height: 72,
        borderRadius: 99,
        margin: '0 auto 28px',
        background: isActive ? accent : 'rgba(255,255,255,0.04)',
        border: isActive ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.15)',
        boxShadow: isActive ? `0 0 40px ${accent}88` : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"JetBrains Mono",monospace',
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.05em',
        position: 'relative',
        zIndex: 2,
        transform: isActive ? 'scale(1.06)' : 'scale(1)',
        color: '#fff',
        transition: 'background 360ms ease, border-color 360ms ease, box-shadow 480ms ease, transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    }, step.n), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: '-0.018em',
        color: isActive ? '#fff' : 'rgba(255,255,255,0.78)',
        transition: 'color 360ms ease'
      }
    }, step.name), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        lineHeight: 1.55,
        textAlign: 'center',
        fontWeight: 300,
        color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
        transition: 'color 360ms ease'
      }
    }, step.blurb));
  }));
}

// ── ContactForm — two-column contact info + form ──
function ContactForm({
  accent,
  secondary
}) {
  const [form, setForm] = React.useState({
    name: '',
    company: '',
    email: '',
    service: '',
    budget: '',
    brief: ''
  });
  const [sent, setSent] = React.useState(false);
  const set = k => e => setForm({
    ...form,
    [k]: e.target.value
  });
  const onSubmit = e => {
    e.preventDefault();
    // For deployment: replace with real endpoint. For now, simulate + mailto fallback.
    const body = `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.brief}`;
    const href = `mailto:info@realitytunnel.com?subject=${encodeURIComponent('New project brief — ' + (form.name || 'unsigned'))}&body=${encodeURIComponent(body)}`;
    // Open mail client in a new tab
    window.open(href, '_blank');
    setSent(true);
  };
  const fieldStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 10,
    padding: '14px 16px',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 160ms, background 160ms'
  };
  const labelStyle = {
    display: 'block',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8
  };
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 720,
        margin: '0 auto',
        textAlign: 'center',
        padding: '64px 32px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 80,
        height: 80,
        borderRadius: 99,
        margin: '0 auto 24px',
        background: accent,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36
      }
    }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 36,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: '#fff'
      }
    }, "Thanks \u2014 your brief is on its way."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16,
        fontSize: 17,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: 300
      }
    }, "We'll reply within one business day with a shaped scope. In the meantime, your default mail client should have opened with the message \u2014 review and hit send."), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => {
        setSent(false);
        setForm({
          name: '',
          company: '',
          email: '',
          service: '',
          budget: '',
          brief: ''
        });
      },
      style: {
        marginTop: 32,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.18)',
        color: '#fff',
        padding: '12px 22px',
        borderRadius: 99,
        cursor: 'pointer',
        fontSize: 13,
        fontFamily: '"JetBrains Mono", monospace',
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      }
    }, "Send another"));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "contact-grid",
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1.6fr',
      gap: 56,
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 24,
      padding: '48px 48px'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: accent,
      marginBottom: 14
    }
  }, "Reach us directly"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@realitytunnel.com",
    style: {
      display: 'block',
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      lineHeight: 1.55,
      textDecoration: 'none'
    }
  }, "info@realitytunnel.com")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: accent,
      marginBottom: 14
    }
  }, "Response time"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      margin: 0,
      lineHeight: 1.55
    }
  }, "One business day. We'll come back with a written scope, a budget range, and a delivery schedule.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: accent,
      marginBottom: 14
    }
  }, "US Office"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      margin: 0,
      lineHeight: 1.55
    }
  }, "Los Angeles, California"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+13104081881",
    style: {
      display: 'block',
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      marginTop: 4,
      textDecoration: 'none'
    }
  }, "1 (310) 408-1881")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: accent,
      marginBottom: 14
    }
  }, "Studio"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      margin: 0,
      lineHeight: 1.55
    }
  }, "Lima, Peru", /*#__PURE__*/React.createElement("br", null), "Serving US & LATAM"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+51958967616",
    style: {
      display: 'block',
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      marginTop: 4,
      textDecoration: 'none'
    }
  }, "+51 958 967 616"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: onSubmit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    value: form.name,
    onChange: set('name'),
    type: "text",
    placeholder: "Your name",
    style: fieldStyle
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Company"), /*#__PURE__*/React.createElement("input", {
    value: form.company,
    onChange: set('company'),
    type: "text",
    placeholder: "Brand or studio",
    style: fieldStyle
  }))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    required: true,
    value: form.email,
    onChange: set('email'),
    type: "email",
    placeholder: "you@company.com",
    style: fieldStyle
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "What are you exploring?"), /*#__PURE__*/React.createElement("select", {
    required: true,
    value: form.service,
    onChange: set('service'),
    style: {
      ...fieldStyle,
      appearance: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    style: {
      background: '#050913'
    }
  }, "Select a service"), /*#__PURE__*/React.createElement("option", {
    value: "ar",
    style: {
      background: '#050913'
    }
  }, "Augmented reality"), /*#__PURE__*/React.createElement("option", {
    value: "vr",
    style: {
      background: '#050913'
    }
  }, "Virtual reality & 360\xB0"), /*#__PURE__*/React.createElement("option", {
    value: "3d",
    style: {
      background: '#050913'
    }
  }, "3D visualization"), /*#__PURE__*/React.createElement("option", {
    value: "ai",
    style: {
      background: '#050913'
    }
  }, "AI & computer vision"), /*#__PURE__*/React.createElement("option", {
    value: "event",
    style: {
      background: '#050913'
    }
  }, "Event activation"), /*#__PURE__*/React.createElement("option", {
    value: "integration",
    style: {
      background: '#050913'
    }
  }, "Integration"), /*#__PURE__*/React.createElement("option", {
    value: "other",
    style: {
      background: '#050913'
    }
  }, "Not sure yet"))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Budget range"), /*#__PURE__*/React.createElement("select", {
    value: form.budget,
    onChange: set('budget'),
    style: {
      ...fieldStyle,
      appearance: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    style: {
      background: '#050913'
    }
  }, "Select a range"), /*#__PURE__*/React.createElement("option", {
    value: "<25k",
    style: {
      background: '#050913'
    }
  }, "Under $25k"), /*#__PURE__*/React.createElement("option", {
    value: "25-50k",
    style: {
      background: '#050913'
    }
  }, "$25k \u2013 $50k"), /*#__PURE__*/React.createElement("option", {
    value: "50-100k",
    style: {
      background: '#050913'
    }
  }, "$50k \u2013 $100k"), /*#__PURE__*/React.createElement("option", {
    value: "100k+",
    style: {
      background: '#050913'
    }
  }, "$100k+"), /*#__PURE__*/React.createElement("option", {
    value: "discuss",
    style: {
      background: '#050913'
    }
  }, "Let's discuss")))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Brief - Tell us all about it"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    value: form.brief,
    onChange: set('brief'),
    rows: 5,
    placeholder: "What do you want to build? Audience, surface (web / iOS / event / headset), rough deadline.",
    style: {
      ...fieldStyle,
      resize: 'vertical',
      minHeight: 120,
      fontFamily: 'inherit'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: 0,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      background: accent,
      color: '#fff',
      fontSize: 15,
      fontWeight: 600,
      padding: '14px 28px',
      borderRadius: 99,
      border: 0,
      cursor: 'pointer',
      boxShadow: `0 12px 40px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
      transition: 'transform 200ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, "Send brief ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.8
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)',
      marginTop: 18
    }
  }, "By submitting, you consent to be contacted by Reality Tunnel."))));
}

// ── LangToggle — EN / ES switch wired to the i18n live DOM translator ──
function LangToggle() {
  const [lang, setSiteLang] = useLang();
  const isES = lang === 'es';
  const cellStyle = active => ({
    color: active ? '#fff' : 'rgba(255,255,255,0.55)',
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    padding: '0 4px',
    transition: 'color 160ms ease'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.15)',
      fontSize: 11,
      padding: '8px 8px',
      borderRadius: 99,
      letterSpacing: '0.05em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "English",
    onClick: () => setSiteLang('en'),
    style: cellStyle(!isES)
  }, "EN"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,0.3)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Espa\xF1ol",
    onClick: () => setSiteLang('es'),
    style: cellStyle(isES)
  }, "ES"));
}
function DirectionA({
  accent,
  navPalette,
  keylineColor
}) {
  // accent palette: [primary, secondary, tertiary, quaternary (ember)]
  const A = accent.primary; // headline glow / CTA
  const B = accent.secondary; // ring 2 / chip glow
  const C = accent.tertiary; // ring 1 / deep glow
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
    const onKey = e => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // Scroll-triggered floating nav — appears once the user scrolls past the
  // hero. The hero already has its own header up top.
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "dirA",
    style: {
      position: 'relative',
      width: '100%',
      minHeight: '100%',
      background: '#050913',
      color: '#fff',
      fontFamily: '"Sora", system-ui, sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
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

        /* ── MOBILE / RESPONSIVE ─────────────────────────────────────── */
        @media (max-width: 768px){
          .dirA .container{padding:0 20px!important;}
          .dirA h1{font-size:clamp(34px,9vw,52px)!important;line-height:1.06!important;}
          .dirA h2{font-size:clamp(28px,7.5vw,42px)!important;line-height:1.08!important;}

          /* hero */
          .dirA .hero-sec{height:auto!important;padding-bottom:56px!important;}
          .dirA .hero-orb{display:none!important;}
          .dirA .hero-head{padding:18px 0!important;}
          .dirA .hero-head nav{display:none!important;}
          .dirA .hero-head .rt-wordmark{display:none!important;}
          .dirA .hero-cta{flex-wrap:wrap!important;}
          .dirA .trust-strip{display:none!important;}

          /* scroll bar — keep eye logo + burger only */
          .dirA .scroll-bar nav{display:none!important;}
          .dirA .scroll-bar a[href="#contact"]{display:none!important;}
          .dirA .scroll-bar .container > a > span{display:none!important;}
          .dirA .scroll-bar svg{width:40px!important;height:48px!important;}

          /* fullscreen menu */
          .dirA .menu-grid{grid-template-columns:1fr!important;gap:36px!important;padding:120px 20px 48px!important;}
          .dirA .menu-link{font-size:clamp(44px,13vw,72px)!important;}

          /* services */
          .dirA .svc-intro{grid-template-columns:1fr!important;gap:28px!important;}
          .dirA .svc-cards{grid-template-columns:1fr!important;}

          /* stats — 2×2 */
          .dirA .stats-grid{grid-template-columns:1fr 1fr!important;}
          .dirA .stats-grid > div{border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;padding:26px 20px!important;}

          /* work */
          .dirA .work-grid{grid-template-columns:1fr!important;}
          .dirA .feat-card{aspect-ratio:auto!important;min-height:440px!important;}
          .dirA .feat-inner{flex-direction:column!important;align-items:flex-start!important;gap:18px!important;}
          .dirA .feat-inner > div:last-child{text-align:left!important;}
          .dirA .feat-card h3{font-size:30px!important;}

          /* approach — stacked, no connector lines */
          .dirA .approach-row{display:flex!important;flex-direction:column!important;gap:28px!important;}
          .dirA .approach-line{display:none!important;}

          /* about + contact + footer */
          .dirA .about-grid{grid-template-columns:1fr!important;gap:28px!important;}
          .dirA .contact-grid{grid-template-columns:1fr!important;gap:28px!important;padding:32px 20px!important;}
          .dirA .form-row{grid-template-columns:1fr!important;}
          .dirA .footer-grid{grid-template-columns:1fr 1fr!important;gap:28px!important;}
        }

        @media (max-width: 460px){
          .dirA .footer-grid{grid-template-columns:1fr!important;}
          .dirA .stats-grid{grid-template-columns:1fr!important;}
          .dirA .stats-grid > div{border-left:none!important;}
        }
      `), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !scrolled,
    className: "scroll-bar",
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      padding: '10px 0',
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)',
      backdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(10,10,10,0.10)' : '1px solid transparent',
      boxShadow: scrolled ? '0 1px 0 rgba(10,10,10,0.04), 0 8px 24px rgba(10,10,10,0.05)' : 'none',
      transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
      opacity: scrolled ? 1 : 0,
      pointerEvents: scrolled ? 'auto' : 'none',
      transition: 'transform 360ms cubic-bezier(0.22,1,0.36,1), opacity 280ms ease, background 280ms ease, border-color 280ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://criercomm.github.io/realitytunnel/",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      color: '#0a0a0a'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 52,
    height: 52 * (50 / 42),
    viewBox: "0 0 42 50",
    style: {
      display: 'block',
      overflow: 'hidden'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "rt-scroll-clip"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z",
    fill: navRingColors[0]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 5,24 Q 21,3 37,24 Q 21,45 5,24 Z",
    fill: "none",
    stroke: navKeyline,
    strokeWidth: "4",
    strokeLinejoin: "miter"
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#rt-scroll-clip)"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr1",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[1]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr2",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[2]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr3",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[1]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr4",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[2]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr5",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[1]
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      letterSpacing: '0.28em',
      fontSize: 21,
      color: '#0a0a0a',
      lineHeight: 1,
      whiteSpace: 'nowrap'
    }
  }, "REALITY TUNNEL")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, [['Work', '#work'], ['Services', '#services'], ['Approach', '#approach'], ['Contact', '#contact']].map(([l, href]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: href,
    onClick: e => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: '#0a0a0a',
      padding: '8px 14px',
      borderRadius: 99,
      transition: 'color 160ms ease, background 160ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = A;
      e.currentTarget.style.background = 'rgba(10,10,10,0.04)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = '#0a0a0a';
      e.currentTarget.style.background = 'transparent';
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    onClick: e => {
      const target = document.querySelector('#contact');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: '#0a0a0a',
      color: '#fff',
      fontSize: 12,
      fontWeight: 600,
      padding: '9px 16px',
      borderRadius: 99,
      transition: 'background 160ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = A;
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = '#0a0a0a';
    }
  }, "Start a project \u2192"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Open menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(true),
    style: {
      background: 'transparent',
      border: '1px solid rgba(10,10,10,0.18)',
      color: '#0a0a0a',
      borderRadius: 99,
      width: 38,
      height: 38,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background 160ms, border-color 160ms'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'rgba(10,10,10,0.04)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    viewBox: "0 0 18 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 2 L17 2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 7 L17 7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 12 L11 12"
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "hero-sec",
    style: {
      position: 'relative',
      height: 900,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(AuroraField, {
    accent: [A, B, C]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-orb",
    style: {
      position: 'absolute',
      top: '50%',
      right: -180,
      transform: 'translateY(-50%)',
      width: 1400,
      height: 1400,
      pointerEvents: 'none',
      animation: 'dirA-orb-drift 14s ease-in-out infinite, dirA-orb-pulse 7s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 42 50",
    style: {
      width: '100%',
      height: '100%',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(0 25)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "20.74",
    cy: "0",
    rx: "20.26",
    ry: "25.08",
    fill: ringColors[0],
    opacity: "0.55"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "23.77",
    cy: "0.56",
    rx: "16.68",
    ry: "20.64",
    fill: ringColors[1],
    opacity: "0.65"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "27.79",
    cy: "0.62",
    rx: "12.21",
    ry: "15.11",
    fill: ringColors[2],
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "31.47",
    cy: "1.17",
    rx: "7.83",
    ry: "9.69",
    fill: ringColors[3],
    opacity: "0.95"
  })))))), /*#__PURE__*/React.createElement("header", {
    className: "hero-head",
    style: {
      position: 'relative',
      zIndex: 2,
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 89,
    height: 89 * (50 / 42),
    viewBox: "0 0 42 50",
    style: {
      display: 'block',
      overflow: 'hidden'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "rt-nav-clip"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z"
  }))), /*#__PURE__*/React.createElement("style", null, `
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
              `), /*#__PURE__*/React.createElement("path", {
    d: "M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z",
    fill: navRingColors[0]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 5,24 Q 21,3 37,24 Q 21,45 5,24 Z",
    fill: "none",
    stroke: navKeyline,
    strokeWidth: "4",
    strokeLinejoin: "miter"
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#rt-nav-clip)"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr1",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[1]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr2",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[2]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr3",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[1]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr4",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[2]
  }), /*#__PURE__*/React.createElement("circle", {
    className: "tunnel-ring tr5",
    cx: "21",
    cy: "15",
    r: "5",
    fill: navRingColors[1]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rt-wordmark"
  }, /*#__PURE__*/React.createElement(ScatterWord, {
    className: "rt-word",
    text: "REALITY TUNNEL",
    baseDelay: 1.4,
    stagger: 0.06,
    duration: 1.2
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-tag"
  }, "Immersive Experiences Studio"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, [['Work', '#work'], ['Services', '#services'], ['Approach', '#approach'], ['Contact', '#contact']].map(([l, href]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: href,
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.7)',
      padding: '8px 14px',
      borderRadius: 99
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(LangToggle, null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Open menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(true),
    style: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.18)',
      color: '#fff',
      borderRadius: 99,
      width: 44,
      height: 44,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      transition: 'background 160ms, border-color 160ms'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "14",
    viewBox: "0 0 18 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 2 L17 2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 7 L17 7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 12 L11 12"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 2,
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 28
    }
  }, "Creating alternate realities since 2014"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 80,
      lineHeight: 1.0,
      letterSpacing: '-0.015em',
      fontWeight: 600,
      color: '#fff',
      textShadow: `0 2px 32px rgba(0,0,0,0.5), 0 0 60px ${A}22`
    }
  }, "Unforgettable", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      fontWeight: 300,
      color: 'rgba(255,255,255,0.85)',
      display: 'inline-block',
      transform: 'translateY(6px)'
    }
  }, "AR, VR & 3D"), /*#__PURE__*/React.createElement("br", null), "experiences that", /*#__PURE__*/React.createElement("br", null), "move the needle."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontSize: 19,
      lineHeight: 1.5,
      color: 'rgba(255,255,255,0.7)',
      maxWidth: 540,
      fontWeight: 300,
      textShadow: '0 1px 12px rgba(0,0,0,0.5)'
    }
  }, "We design, build, and integrate brand experiences that customers remember \u2014 and act upon \u2014 with a senior team that's shipped together for a decade."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta",
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    style: {
      background: A,
      color: '#fff',
      fontSize: 15,
      fontWeight: 600,
      padding: '16px 28px',
      borderRadius: 99,
      boxShadow: `0 12px 40px ${A}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, "Start a project ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.7
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(12px)',
      color: '#fff',
      fontSize: 15,
      fontWeight: 500,
      padding: '15px 26px',
      borderRadius: 99,
      border: '1px solid rgba(255,255,255,0.18)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 99,
      background: 'rgba(255,255,255,0.12)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10
    }
  }, "\u25B6"), "Watch the showreel")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      padding: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono trust-strip",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      fontSize: 11,
      color: 'rgba(255,255,255,0.55)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,0.4)'
    }
  }, "Trusted by"), /*#__PURE__*/React.createElement("span", null, "Manchester United"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Hewlett Packard"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Interbank"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "BBVA"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Sony"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Ford"))))), menuOpen && /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Site menu",
    onClick: e => {
      if (e.target === e.currentTarget) setMenuOpen(false);
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(105,0,233,0.35) 0%, transparent 65%), linear-gradient(180deg, #07061a 0%, #050913 60%, #02030c 100%)',
      animation: 'dirA-menu-bg-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 700,
      height: 700,
      top: '-15%',
      right: '-10%',
      background: `radial-gradient(circle, ${A}55 0%, transparent 65%)`,
      filter: 'blur(80px)',
      animation: 'dirA-orb-drift 18s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 600,
      height: 600,
      bottom: '-15%',
      left: '-10%',
      background: `radial-gradient(circle, ${B}44 0%, transparent 65%)`,
      filter: 'blur(80px)',
      animation: 'dirA-orb-drift 22s ease-in-out infinite reverse'
    }
  })), /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      zIndex: 2,
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 106 // matches hero logo height (89 * 50/42) so close button shares burger's y
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.55)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: A
    }
  }, "\u25CF"), "\xA0\xA0Reality Tunnel \xB7 Menu")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close menu",
    onClick: () => setMenuOpen(false),
    style: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.18)',
      color: '#fff',
      borderRadius: 99,
      width: 44,
      height: 44,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background 160ms, border-color 160ms, transform 200ms'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
      e.currentTarget.style.transform = 'rotate(90deg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.transform = 'rotate(0deg)';
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2 L12 12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2 L2 12"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "container menu-grid",
    style: {
      position: 'relative',
      zIndex: 2,
      padding: '200px 64px 64px',
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 80,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, [['Work', '#work'], ['Services', '#services'], ['Approach', '#approach'], ['Contact', '#contact']].map(([l, href], i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: href,
    onClick: () => setMenuOpen(false),
    className: "menu-link",
    style: {
      fontSize: 96,
      fontWeight: 600,
      letterSpacing: '-0.035em',
      lineHeight: 1.04,
      color: '#fff',
      textDecoration: 'none',
      opacity: 0,
      transform: 'translateY(28px)',
      animation: `dirA-menu-link-in 720ms cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.08}s both`,
      position: 'relative',
      display: 'inline-block',
      width: 'fit-content',
      transition: 'color 220ms ease, transform 220ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = A;
      e.currentTarget.style.transform = 'translateX(12px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = '#fff';
      e.currentTarget.style.transform = 'translateX(0)';
    }
  }, l))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      opacity: 0,
      animation: 'dirA-menu-link-in 720ms cubic-bezier(0.22, 1, 0.36, 1) 0.55s both'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: 14
    }
  }, "Start a project"), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    onClick: () => setMenuOpen(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      background: A,
      color: '#fff',
      fontSize: 15,
      fontWeight: 600,
      padding: '18px 28px',
      borderRadius: 99,
      boxShadow: `0 12px 40px ${A}66, inset 0 1px 0 rgba(255,255,255,0.2)`
    }
  }, "Book a call \u2192")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: 14
    }
  }, "Reach us"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@realitytunnel.com",
    style: {
      display: 'block',
      fontSize: 17,
      color: '#fff',
      marginBottom: 6
    }
  }, "info@realitytunnel.com"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+13104081881",
    style: {
      display: 'block',
      fontSize: 17,
      color: 'rgba(255,255,255,0.75)'
    }
  }, "+1 (310) 408-1881")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: 14
    }
  }, "Follow"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, ['Instagram', 'LinkedIn', 'Vimeo'].map(soc => /*#__PURE__*/React.createElement("a", {
    key: soc,
    href: "#",
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)'
    }
  }, soc))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '88px 0 96px',
      background: 'radial-gradient(ellipse 60% 55% at 80% 20%, rgba(105,0,233,0.30) 0%, transparent 65%),' + 'radial-gradient(ellipse 50% 45% at 12% 80%, rgba(0,174,239,0.18) 0%, transparent 65%),' + 'radial-gradient(ellipse 45% 35% at 55% 95%, rgba(254,88,40,0.14) 0%, transparent 60%),' + 'linear-gradient(180deg, #1c1f3a 0%, #14172a 55%, #0e1124 100%)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 20
    }
  }, "46 brands \xB7 100+ projects"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 56,
      fontWeight: 500,
      letterSpacing: '-0.024em',
      lineHeight: 1.05,
      maxWidth: 900
    }
  }, "Trusted by the brands that ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: A
    }
  }, "can't afford to be ignored."))), /*#__PURE__*/React.createElement("div", {
    className: "mq-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mq-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mq-track mq-fwd"
  }, [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: 'a-' + i,
    src: src,
    alt: "",
    className: "mq-logo"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mq-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mq-track mq-rev"
  }, [...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse()].map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: 'b-' + i,
    src: src,
    alt: "",
    className: "mq-logo"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(90deg, #171a2c 0%, transparent 6%, transparent 94%, #171a2c 100%)'
    }
  }))), /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      position: 'relative',
      padding: '88px 0 96px',
      background: '#ffffff',
      color: '#0a0a0a'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-intro",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 96,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 28
    }
  }, "Capabilities"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 64,
      lineHeight: 1.02,
      letterSpacing: '-0.028em',
      color: '#0a0a0a'
    }
  }, "Six practices.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: A
    }
  }, "One delivery team."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 28
    }
  }, "About Us"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.55,
      color: 'rgba(10,10,10,0.7)',
      fontWeight: 400,
      maxWidth: 480
    }
  }, "Reality Tunnel is the US headquarters of", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://www.nextlatam.com",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: A,
      fontWeight: 500,
      borderBottom: `1px solid ${A}66`,
      paddingBottom: 1,
      transition: 'border-color 160ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = A;
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = `${A}66`;
    }
  }, "NextLATAM.com"), ", founded in Lima, Peru in 2014 to serve Latin America. The work featured here was produced by NextLATAM."))), /*#__PURE__*/React.createElement("div", {
    className: "svc-cards",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, SERVICES.map((s, i) => {
    const tints = [[A, '#7a2509'],
    // brand accent orange (tweakable)
    ['#2c95b8', '#0e4c63'],
    // brand cyan
    ['#6b2cc4', '#2a0b6e'],
    // brand violet
    ['#2c5180', '#15355c'],
    // medium dark blue
    ['#3f8f5c', '#1c4d33'],
    // green
    ['#161e3a', '#06090f'] // midnight
    ];
    const grad = `linear-gradient(135deg, ${tints[i % tints.length][0]} 0%, ${tints[i % tints.length][1]} 100%)`;
    return /*#__PURE__*/React.createElement("div", {
      key: s.num,
      style: {
        padding: '32px 32px 18px',
        borderRadius: 20,
        background: grad,
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 150,
        transition: 'background 200ms, border-color 200ms'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 26,
        marginBottom: 14,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: '#ffffff',
        position: 'relative'
      }
    }, s.name), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        lineHeight: 1.55,
        color: 'rgba(255,255,255,0.72)',
        fontWeight: 400,
        position: 'relative'
      }
    }, s.blurb));
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: '#1c2138',
      color: '#fff',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: `radial-gradient(ellipse 900px 360px at 80% 50%, ${C}33 0%, transparent 70%), radial-gradient(ellipse 600px 320px at 15% 30%, ${B}1f 0%, transparent 70%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "stats-grid",
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, [{
    label: 'projects shipped',
    value: '100',
    suffix: '+'
  }, {
    label: 'years in AR / VR development',
    value: '12'
  }, {
    label: 'average KPI lift',
    prefix: '↑',
    value: '28',
    suffix: '%'
  }, {
    label: 'concept to deployment',
    value: '6',
    unit: 'weeks'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      padding: '44px 40px',
      borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.55)',
      marginBottom: 18
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      fontWeight: 500,
      color: '#fff',
      letterSpacing: '-0.025em',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'baseline',
      gap: 2
    }
  }, s.prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: A,
      marginRight: 4
    }
  }, s.prefix), /*#__PURE__*/React.createElement("span", null, s.value), s.suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: A
    }
  }, s.suffix), s.unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 400,
      color: 'rgba(255,255,255,0.6)',
      marginLeft: 8,
      letterSpacing: 0
    }
  }, s.unit)))))), /*#__PURE__*/React.createElement("section", {
    id: "work",
    style: {
      position: 'relative',
      padding: '104px 0 80px',
      background: '#ffffff',
      color: '#0a0a0a'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 28
    }
  }, "Selected work \xB7 2022\u20132025"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 64,
      lineHeight: 1.02,
      letterSpacing: '-0.028em',
      color: '#0a0a0a'
    }
  }, "Built with brands that", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: A
    }
  }, "need to move metrics.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      fontSize: 15,
      lineHeight: 1.5,
      color: 'rgba(10,10,10,0.62)',
      fontWeight: 400,
      maxWidth: 640
    }
  }, "Selected work presented in partnership with our sister company,", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://www.nextlatam.com",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: '#0a0a0a',
      fontWeight: 500,
      borderBottom: `1px solid ${A}`,
      paddingBottom: 1,
      transition: 'color 160ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = A;
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = '#0a0a0a';
    }
  }, "Next LATAM"), ".")), /*#__PURE__*/React.createElement("a", {
    className: "feat-card",
    href: PROJECTS[0].url || '#',
    style: {
      display: 'block',
      textDecoration: 'none',
      color: 'inherit',
      position: 'relative',
      borderRadius: 24,
      overflow: 'hidden',
      background: `linear-gradient(135deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.0) 40%, rgba(10,10,15,0.85) 100%), url("${PROJECTS[0].img}") center/cover no-repeat`,
      aspectRatio: '21 / 9',
      marginBottom: 24,
      border: '1px solid rgba(10,10,10,0.08)',
      boxShadow: '0 1px 0 rgba(10,10,10,0.04), 0 16px 48px rgba(10,10,10,0.08)',
      transition: 'transform 360ms cubic-bezier(0.22,1,0.36,1), box-shadow 360ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 1px 0 rgba(10,10,10,0.04), 0 24px 64px rgba(10,10,10,0.14)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 0 rgba(10,10,10,0.04), 0 16px 48px rgba(10,10,10,0.08)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.3\'/></svg>")',
      mixBlendMode: 'overlay'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 32,
      right: 32
    }
  }, /*#__PURE__*/React.createElement(EyeMark, {
    size: 64,
    colors: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.92)'],
    keylineColor: "rgba(255,255,255,0.70)",
    strokeWidth: 3,
    scope: "feat"
  })), /*#__PURE__*/React.createElement("div", {
    className: "feat-inner",
    style: {
      position: 'absolute',
      bottom: 32,
      left: 32,
      right: 32,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.7)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      marginBottom: 14
    }
  }, "Featured \xB7 Virtual reality"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 56,
      lineHeight: 0.98,
      color: '#fff',
      letterSpacing: '-0.03em',
      maxWidth: 720
    }
  }, "Manchester United VR"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 17,
      color: 'rgba(255,255,255,0.75)',
      maxWidth: 460,
      fontWeight: 300
    }
  }, "An Old Trafford experience that brought 14M global fans into the stadium without leaving home.")), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'right',
      color: 'rgba(255,255,255,0.85)',
      fontSize: 13,
      lineHeight: 1.8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.55,
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase'
    }
  }, "Client"), /*#__PURE__*/React.createElement("div", null, "Manchester United F.C."), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.55,
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      marginTop: 12
    }
  }, "Outcome"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 500,
      letterSpacing: '-0.02em'
    }
  }, "14M views")))), /*#__PURE__*/React.createElement("div", {
    className: "work-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 18
    }
  }, PROJECTS.slice(1, 7).map((p, i) => {
    const Tag = p.url ? 'a' : 'div';
    const tagProps = p.url ? {
      href: p.url,
      style: {
        textDecoration: 'none',
        color: 'inherit'
      }
    } : {};
    return /*#__PURE__*/React.createElement(Tag, _extends({
      key: p.title
    }, tagProps, {
      style: {
        ...(tagProps.style || {}),
        padding: 28,
        borderRadius: 18,
        background: '#fafaf7',
        border: '1px solid rgba(10,10,10,0.08)',
        minHeight: 260,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms ease, border-color 280ms ease',
        cursor: p.url ? 'pointer' : 'default'
      },
      onMouseEnter: p.url ? e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(10,10,10,0.08)';
        e.currentTarget.style.borderColor = 'rgba(10,10,10,0.18)';
      } : undefined,
      onMouseLeave: p.url ? e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(10,10,10,0.08)';
      } : undefined
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: 10,
        marginBottom: 24,
        background: `linear-gradient(180deg, rgba(0,0,0,0.10) 0%, transparent 35%, rgba(0,0,0,0.45) 100%), url("${p.img}") center/cover no-repeat`,
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 12,
        left: 12
      }
    }, /*#__PURE__*/React.createElement(EyeMark, {
      size: 30,
      colors: ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.95)'],
      keylineColor: "rgba(255,255,255,0.75)",
      strokeWidth: 3,
      scope: `tile-${p.title.replace(/\W+/g, '').toLowerCase()}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "mono",
      style: {
        position: 'absolute',
        bottom: 10,
        right: 12,
        fontSize: 10,
        color: '#fff',
        opacity: 0.7,
        letterSpacing: '0.12em'
      }
    }, p.year)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "mono",
      style: {
        fontSize: 10,
        color: A,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: 10
      }
    }, p.tag), /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: '-0.018em',
        marginBottom: 6,
        color: '#0a0a0a'
      }
    }, p.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'rgba(10,10,10,0.65)',
        fontWeight: 400,
        lineHeight: 1.5,
        marginBottom: 14
      }
    }, p.sub), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 14,
        borderTop: '1px solid rgba(10,10,10,0.08)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 11,
        color: 'rgba(10,10,10,0.55)'
      }
    }, p.client), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 11,
        color: A
      }
    }, p.metric))));
  })))), /*#__PURE__*/React.createElement("section", {
    id: "approach",
    style: {
      position: 'relative',
      padding: '88px 0 120px',
      background: 'linear-gradient(180deg, #081a30 0%, #0a1530 60%, #0a1228 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 28
    }
  }, "How we work"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 72,
      lineHeight: 1.02,
      letterSpacing: '-0.03em',
      maxWidth: 900,
      margin: '0 auto'
    }
  }, "Four phases.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      fontWeight: 300,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "No surprises."))), /*#__PURE__*/React.createElement(ApproachStepper, {
    accent: A
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '80px 0 112px',
      background: '#ffffff',
      color: '#0a0a0a'
    }
  }, /*#__PURE__*/React.createElement(TestimonialCarousel, {
    accent: A
  })), /*#__PURE__*/React.createElement("section", {
    id: "studio",
    style: {
      position: 'relative',
      padding: '88px 0 80px',
      background: 'linear-gradient(180deg, #081a30 0%, #0a1530 60%, #0a1228 100%)',
      color: '#eaf2ff',
      overflow: 'hidden',
      isolation: 'isolate'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "origin-blobs",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ob ob1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ob ob2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ob ob3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ob ob4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr',
      gap: 80,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 28,
      color: '#fff'
    }
  }, "About the name"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 56,
      lineHeight: 1.02,
      letterSpacing: '-0.028em',
      color: '#ffffff',
      fontWeight: 600,
      textWrap: 'balance'
    }
  }, "Why we\u2019re called ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: A
    }
  }, "Reality Tunnel."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      maxWidth: 640,
      fontSize: 17,
      lineHeight: 1.6,
      color: '#f5efff'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "The phrase ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: A
    }
  }, "Reality Tunnel"), " was coined by writer and futurist Robert Anton Wilson in the 1980s, building on Timothy Leary\u2019s earlier work on the eight-circuit model of consciousness. Wilson\u2019s idea is deceptively simple: every person inhabits a unique perceptual reality shaped by their language, beliefs, conditioning, and senses \u2014 a \u201Ctunnel\u201D of interpretation through which the world reaches them. No two people see the same world; we all navigate slightly different versions of it. The metaphor stuck because it captures something true about human experience: reality is not received, it\u2019s constructed."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "That premise sits at the heart of what we do. When we build augmented reality, virtual reality, and 3D experiences, we\u2019re designing new tunnels \u2014 deliberate, crafted environments that change how people perceive a product, a place, a story, or each other. Our work is the practical application of Wilson\u2019s insight: if perception can be reshaped, then experience can be designed. Every project we ship is a tunnel built with intention, taking customers somewhere their default reality doesn\u2019t reach, and leaving them with something they\u2019ll remember and act on."))))), /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      position: 'relative',
      padding: '88px 0 64px',
      overflow: 'hidden',
      background: '#050913'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.6,
      pointerEvents: 'none',
      background: `radial-gradient(ellipse 60% 80% at 50% 30%, ${A}33 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 85% 75%, ${B}33 0%, transparent 60%)`,
      filter: 'blur(40px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      textAlign: 'center',
      maxWidth: 980,
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(EyeMark, {
    size: 88,
    colors: navRingColors,
    keylineColor: navKeyline,
    strokeWidth: 4,
    scope: "contact"
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 72,
      lineHeight: 1.04,
      letterSpacing: '-0.035em',
      fontWeight: 600
    }
  }, "Tell us what you want", /*#__PURE__*/React.createElement("br", null), "to build ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      fontWeight: 300,
      color: A
    }
  }, "next.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: 'rgba(255,255,255,0.7)',
      maxWidth: 600,
      margin: '24px auto 0',
      fontWeight: 300,
      lineHeight: 1.5
    }
  }, "Give us a call or fill out a brief\u2014 whichever is easiest. We'll come back to you with a scope that meets your budget.")), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ContactForm, {
    accent: A,
    secondary: B
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer-grid",
    style: {
      paddingTop: 48,
      borderTop: '1px solid rgba(255,255,255,0.08)',
      maxWidth: 1100,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '2.2fr 0.7fr 1fr 1fr',
      gap: 56,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(EyeMark, {
    size: 36,
    colors: navRingColors,
    keylineColor: navKeyline,
    strokeWidth: 3,
    scope: "ft"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      letterSpacing: '0.28em',
      fontSize: 13,
      color: '#fff'
    }
  }, "REALITY TUNNEL")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.55)',
      maxWidth: 280,
      lineHeight: 1.55,
      margin: 0
    }
  }, "Providing US & LATAM markets with immersive experiences since 2014.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: A,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      marginBottom: 14
    }
  }, "Studio"), [['Work', '#work'], ['Services', '#services'], ['Approach', '#approach'], ['Contact', '#contact']].map(([l, href]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: href,
    onClick: e => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    style: {
      display: 'block',
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      padding: '4px 0',
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: A,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      marginBottom: 14
    }
  }, "Reach us"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@realitytunnel.com",
    style: {
      display: 'block',
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      padding: '4px 0',
      textDecoration: 'none'
    }
  }, "info@realitytunnel.com"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+13104081881",
    style: {
      display: 'block',
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      padding: '4px 0',
      textDecoration: 'none'
    }
  }, "+1 (310) 408-1881")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: A,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      marginBottom: 14
    }
  }, "Follow"), ['Instagram', 'LinkedIn', 'Vimeo', 'GitHub'].map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    style: {
      display: 'block',
      fontSize: 14,
      color: 'rgba(255,255,255,0.75)',
      padding: '4px 0',
      textDecoration: 'none'
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '40px auto 0',
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase'
    }
  }, "\xA92026 Reality Tunnel \xB7 US \xB7 Lima \xB7 LATAM"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "privacy-policy.html",
    className: "mono",
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      textDecoration: 'none'
    }
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase'
    }
  }, "All rights reserved")))));
}
window.DirectionA = DirectionA;
})();
