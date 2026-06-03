/* Compiled from shared.jsx — do not edit directly; edit the .jsx source and rebuild. */
;(function(){
// Shared bits across all three Reality Tunnel direction mocks.
// - RingMark: the 4-ellipse brand mark, recolorable via props
// - useAccent: pulls the current accent palette from window.__rtAccent (set by app.jsx)
// - CLIENTS / TESTIMONIALS / PROJECTS / SERVICES data
// - PosterBg: cinematic backdrop reused across directions (uses the poster jpg
//   or the CSS-driven Aurora field depending on the "video" toggle)

/* eslint-disable no-undef */
const {
  useState,
  useEffect
} = React;

// ── Ring mark: 4 stacked offset ellipses ──────────────────────────
function RingMark({
  size = 36,
  colors,
  style
}) {
  const c = colors || ['#6900E9', '#00AEEF', '#fe5828', '#8c3622'];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size * (50 / 42),
    viewBox: "0 0 42 50",
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(0 25)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "20.74",
    cy: "0",
    rx: "20.26",
    ry: "25.08",
    fill: c[0]
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "23.77",
    cy: "0.56",
    rx: "16.68",
    ry: "20.64",
    fill: c[1]
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "27.79",
    cy: "0.62",
    rx: "12.21",
    ry: "15.11",
    fill: c[2]
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "31.47",
    cy: "1.17",
    rx: "7.83",
    ry: "9.69",
    fill: c[3]
  })));
}

// Animated mark — same as the original site's perpetual motion.
function AnimatedRingMark({
  size = 56,
  colors,
  scope = 'a',
  speed = 1
}) {
  const c = colors || ['#6900E9', '#00AEEF', '#fe5828', '#8c3622'];
  const id = `rmk-${scope}`;
  // animations: rings drift, pulse, brighten/dim
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size * (50 / 42),
    viewBox: "0 0 42 50",
    style: {
      display: 'block',
      overflow: 'visible'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("style", null, `
        .${id} .r{transform-box:fill-box;transform-origin:center;}
        .${id} .r1{animation:${id}-s1 ${5.9 / speed}s ease-in-out infinite;}
        .${id} .r2{animation:${id}-s2 ${5.3 / speed}s ease-in-out infinite;}
        .${id} .r3{animation:${id}-s3 ${6.1 / speed}s ease-in-out infinite;}
        .${id} .r4{animation:${id}-s4 ${5.7 / speed}s ease-in-out infinite;}
        @keyframes ${id}-s1{0%,100%{transform:scale(1);}50%{transform:scale(1.10);}}
        @keyframes ${id}-s2{0%,100%{transform:rotate(0);}50%{transform:rotate(-8deg);}}
        @keyframes ${id}-s3{0%,100%{transform:scale(1,1);}50%{transform:scale(1.20,0.80);}}
        @keyframes ${id}-s4{0%,100%{transform:scale(1);}50%{transform:scale(0.86);}}
      `), /*#__PURE__*/React.createElement("g", {
    className: id,
    transform: "translate(0 25)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    className: "r r1",
    cx: "20.74",
    cy: "0",
    rx: "20.26",
    ry: "25.08",
    fill: c[0]
  }), /*#__PURE__*/React.createElement("ellipse", {
    className: "r r2",
    cx: "23.77",
    cy: "0.56",
    rx: "16.68",
    ry: "20.64",
    fill: c[1]
  }), /*#__PURE__*/React.createElement("ellipse", {
    className: "r r3",
    cx: "27.79",
    cy: "0.62",
    rx: "12.21",
    ry: "15.11",
    fill: c[2]
  }), /*#__PURE__*/React.createElement("ellipse", {
    className: "r r4",
    cx: "31.47",
    cy: "1.17",
    rx: "7.83",
    ry: "9.69",
    fill: c[3]
  })));
}

// ── Data ─────────────────────────────────────────────────────────
const CLIENT_LOGOS = ['clients/1america.png', 'clients/5bcp.png', 'clients/8ford.png', 'clients/10sony.png', 'clients/14lenovo.png', 'clients/16hp.png', 'clients/18cisco.png', 'clients/31falabella.png', 'clients/33gloria.png', 'clients/22promperu.png', 'clients/12sodexo.png', 'clients/45thewoodsandco.png'];
const CLIENT_NAMES = ['Manchester United', 'Hewlett Packard', 'Interbank', 'BBVA', 'Sony', 'Ford', 'Cisco', 'Lenovo', 'Falabella', 'Real Plaza', 'BCP', 'Sodexo', 'Sodimac', 'America', 'Gloria', 'Pro·Perú', 'Maestro', 'McCann', 'Oncosalud', 'DDB', 'Wunderman', 'Unique', 'Yambal'];
const TESTIMONIALS = [{
  quote: 'I have worked with Carlos and his team for over a decade. From full-stack Web development, AR/VR work and apps, you could not be in better hands. They deliver on time and on budget and have never let me down.',
  name: 'JP Lincoln',
  role: 'President, Crier PR',
  img: 'clients-testimonials/jp_lincoln.png'
}, {
  quote: "The final product met the end client's expectations and effectively boosted their customer engagement. They were a collaborative partner, utilizing various tools to communicate with the client and track their tasks. They were flexible and understanding of scope changes.",
  name: 'Kavita Joshi',
  role: 'COO, Simplyaugmented Inc.',
  img: 'clients-testimonials/kavita_yoshi.png'
}, {
  quote: "Very methodical about their work and operates in sprints. They communicate with the client about upcoming deadlines and expected delays. They're committed to excellence and their team often proposes new approaches to ongoing processes to improve the final product.",
  name: 'Lisa Furfine',
  role: 'CEO, Bogotash LLC',
  img: 'clients-testimonials/lisa_furfine.png'
}, {
  quote: 'Carlos and his firm are the utmost professionals. They are responsive, hard working, solution driven and cost effective. We have worked with many IT firms and his stands out as a true gem.',
  name: 'Susan Woods',
  role: 'CEO, The Woods & Co',
  img: 'clients-testimonials/susan_woods.png'
}];
const PROJECTS = [{
  slug: 'manchester-united',
  tag: 'Virtual reality',
  title: 'Manchester United VR',
  sub: 'An Old Trafford experience for global fans.',
  client: 'Manchester United F.C.',
  year: '2024',
  metric: '14M views',
  platform: 'Standalone VR · Web',
  market: 'Global',
  img: 'projects/manchester-united.webp',
  url: 'manchester-united.html',
  hero: 'Putting fans inside Old Trafford — without a match ticket.',
  youtube: 'PZ5ALzc_6-s',
  brief: 'Manchester United wanted to give their global fanbase — many of whom will never visit Old Trafford — a visceral sense of belonging to the world\'s most watched club. The experience needed to feel worthy of the badge and work at scale, across devices.',
  built: 'We built a fully immersive VR experience placing fans on the pitch, inside the dressing rooms, and in the stands at Old Trafford. Deployed on standalone VR headsets and web, it extended the club\'s emotional reach to millions of supporters who will never hold a match ticket — deepening loyalty without a single seat.'
}, {
  slug: 'interbank-360',
  tag: '360° photography',
  title: 'Interbank 360°',
  sub: 'Walk every branch from a single web link.',
  client: 'Interbank',
  year: '2023',
  metric: '+38% NPS',
  platform: 'Web · Any device',
  market: 'Peru',
  img: 'projects/interbank-360.webp',
  url: 'interbank-360.html',
  hero: 'Every branch, navigable from anywhere.',
  youtube: 'x_1dgw7lJHw',
  brief: 'Interbank operates branches across Peru and needed a way for customers to explore their spaces remotely — reducing friction for new clients deciding which branch to visit and extending reach during periods of reduced in-person traffic.',
  built: 'We photographed every branch in high-resolution 360° and built a single web platform letting any customer walk any location from any device — no app required. It runs in the browser, requires no download, and scales as the branch network grows.'
}, {
  slug: 'hp-ar',
  tag: 'AR · e-commerce',
  title: 'Hewlett Packard AR',
  sub: 'Try the laptop on your desk before you buy.',
  client: 'Hewlett Packard',
  year: '2024',
  metric: '+41% CVR',
  platform: 'Web · iOS · Android',
  market: 'Global',
  img: 'projects/hp-ar.webp',
  url: 'hp-ar.html',
  hero: 'Try the laptop on your desk before you click add-to-cart.',
  youtube: '',
  brief: 'HP wanted online buyers to feel confident about the fit, weight, and footprint of a new laptop before committing — turning a flat product page into something closer to a showroom visit, without sending customers to a physical store.',
  built: 'We built a web-based AR product viewer that drops a true-to-scale 3D model of the laptop onto any flat surface, viewable through a phone camera. Rotate it, lift it, place it on the desk where it will live — then return to the spec page already knowing the device.'
}, {
  slug: 'talentolandia',
  tag: 'AR · computer vision',
  title: 'Talentolandia',
  sub: "Character recognition for kids' learning.",
  client: 'Artesco',
  year: '2022',
  metric: '92k installs',
  platform: 'iOS · Android',
  market: 'Peru',
  img: 'projects/talentolandia.webp',
  url: 'talentolandia.html',
  hero: 'AR-powered learning that makes kids reach for the product again.',
  youtube: '8MmZxITwtuw',
  brief: 'Artesco, Peru\'s leading school supplies brand, wanted to transform their Talentolandia character IP into an interactive experience — turning everyday stationery packaging into a reason for kids to engage with the brand well beyond the store shelf.',
  built: 'We built an AR app using computer vision to recognise Talentolandia characters printed on Artesco products. Point the camera at the packaging and the characters come alive — animations, games, and educational activities that give kids a reason to reach for the product again.'
}, {
  slug: 'millie-the-robot',
  tag: 'Educational VR',
  title: 'Millie the Robot',
  sub: 'A VR science investigation that turns students into detectives.',
  client: 'Students · US',
  year: '2024',
  metric: 'K-12 classrooms',
  platform: 'Standalone VR',
  market: 'United States',
  audience: 'Students',
  img: 'https://www.nextlatam.com/projects/millie_the_robot.webp',
  url: 'millie-the-robot.html',
  hero: 'A VR science investigation that turns students into detectives.',
  youtube: '5gkQoN33B1I',
  brief: 'The challenge was making science genuinely engaging for students — not through videos or textbooks, but through direct participation. The experience needed to teach real investigative techniques while keeping students invested in the outcome from start to finish.',
  built: 'We built a VR mystery investigation guided by Millie, an intelligent robot, set on a "bring your robot to school" day. Students apply biometrics, DNA barcoding, and colorimetry to identify which robot ate a jelly donut — every technique has a purpose, every clue has a consequence, and the answer only emerges when all the science is applied correctly.'
}, {
  slug: 'hackers-worst-nightmare',
  tag: 'VR training',
  title: "Hacker's Worst Nightmare",
  sub: 'Cybersecurity training that employees actually remember.',
  client: 'Hewlett Packard',
  year: '2023',
  metric: '4.8/5 retention',
  platform: 'Standalone VR',
  market: 'United States',
  img: 'https://www.nextlatam.com/projects/hp_hacker.webp',
  url: 'hackers-worst-nightmare.html',
  hero: 'Cybersecurity training that employees actually remember.',
  youtube: '4HSagkO28Fs',
  brief: 'HP\'s cybersecurity division needed to train enterprise employees across the US on recognising and responding to attacks. The existing approach — slides, videos, compliance checkboxes — produced no lasting behaviour change. People clicked through and forgot everything by the following week.',
  built: 'We built a standalone VR simulation that puts employees inside an active cyber-attack as it unfolds. Alerts fire, systems lock down, and every decision has a consequence — all within a safe environment where real pressure drives real learning. When the stakes feel genuine, the training sticks.'
}, {
  slug: 'ra-link-bcp',
  tag: 'Augmented reality',
  title: 'RA Link — BCP',
  sub: "A year of BCP innovation — each product given its own moment.",
  client: 'Banco de Crédito del Perú',
  year: '2018',
  metric: '18 products',
  platform: 'iOS · Android',
  market: 'Peru',
  img: 'https://www.nextlatam.com/projects/ra_link_bcp.webp',
  url: 'ra-link-bcp.html',
  hero: "A year's worth of BCP innovation — each product given its own moment to land.",
  youtube: 'VKi_8uaGsZQ',
  brief: 'Banco de Crédito del Perú needed a way to present eighteen new products at a single event — from mobile payment apps to AI-powered assistants — without the reveal feeling like a catalogue. The challenge was making each product feel distinct and worth discovering, not just announced.',
  built: 'We built RA Link, a custom augmented reality mobile app paired with physical tokens placed throughout a darkened room. Each token, when scanned, unlocked an AR experience revealing one of the eighteen products BCP launched that year — including Yape, their peer-to-peer payment app, and Arturito BCP, their AI assistant. Visitors moved through the space at their own pace, discovering the full range of innovation one token at a time.'
}];
const SERVICES = [{
  num: '01',
  name: 'Augmented reality',
  blurb: 'Face filters, product try-on, on-set markers — web, iOS, Android, in-store.'
}, {
  num: '02',
  name: 'Virtual reality & 360°',
  blurb: 'Standalone VR builds and 360° tours of venues, branches, factories.'
}, {
  num: '03',
  name: '3D visualization',
  blurb: 'Real-time configurators and product viewers in Unity, Three.js, WebGL.'
}, {
  num: '04',
  name: 'AI & computer vision',
  blurb: 'Detection, tracking, and generative layers that make immersive UX feel intelligent.'
}, {
  num: '05',
  name: 'Event activations',
  blurb: 'Stand-out interactive booths and keynote demos — designed, built, operated.'
}, {
  num: '06',
  name: 'Integration',
  blurb: 'Wire immersive products into your CRM, e-commerce, analytics — never a silo.'
}];
const APPROACH = [{
  n: '01',
  name: 'Discover',
  blurb: 'We start by identifying project objectives and end with a scope, budget, and delivery schedule.'
}, {
  n: '02',
  name: 'Prototype',
  blurb: 'A working prototype on real hardware in four to six weeks — never a slide deck.'
}, {
  n: '03',
  name: 'Build',
  blurb: 'Senior team, fixed-price sprints, constant updates and production-grade code from day one.'
}, {
  n: '04',
  name: 'Operate',
  blurb: 'On-site operators for events, tier-1 SLA for retail, analytics piped into your stack.'
}];

// ── Aurora background field — CSS-only animated gradient + rings ──
// Used as the "live" alternative to the static poster image.
function AuroraField({
  accent = ['#fe5828', '#00AEEF', '#6900E9']
}) {
  const [a, b, c] = accent;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: '#050913'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '85%',
      height: '110%',
      top: '-15%',
      left: '12%',
      background: `radial-gradient(ellipse at 50% 50%, ${a}55 0%, ${a}00 55%)`,
      filter: 'blur(60px)',
      animation: 'rt-aurora-1 22s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '70%',
      height: '90%',
      top: '20%',
      left: '-20%',
      background: `radial-gradient(ellipse at 50% 50%, ${b}66 0%, ${b}00 55%)`,
      filter: 'blur(80px)',
      animation: 'rt-aurora-2 28s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '70%',
      height: '90%',
      top: '-5%',
      right: '-15%',
      background: `radial-gradient(ellipse at 50% 50%, ${c}55 0%, ${c}00 55%)`,
      filter: 'blur(90px)',
      animation: 'rt-aurora-3 32s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.25,
      mixBlendMode: 'overlay',
      backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.5\'/></svg>")'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)'
    }
  }), /*#__PURE__*/React.createElement("style", null, `
        @keyframes rt-aurora-1 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-6%,4%) scale(1.08);} }
        @keyframes rt-aurora-2 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(8%,-3%) scale(1.12);} }
        @keyframes rt-aurora-3 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-4%,5%) scale(0.92);} }
      `));
}

// ── ScatterWord — "characters fly in and assemble" entrance ─────────
// Replicates the hd-logo-word animation from the source repo: each character
// starts at a random translate/rotate offset, then assembles into place with
// a per-character delay stagger. Deterministic per char index so renders are
// stable across reloads.
function ScatterWord({
  text,
  baseDelay = 1.4,
  stagger = 0.06,
  duration = 1.2,
  className = '',
  style
}) {
  const chars = React.useMemo(() => {
    return text.split('').map((c, i) => {
      // deterministic "random" via sin(seed) trick
      const seed = (i + 1) * 1031;
      const rand = n => {
        const x = Math.sin(seed * n) * 10000;
        return x - Math.floor(x);
      };
      return {
        c,
        dx: Math.round((rand(1) - 0.5) * 600),
        dy: Math.round((rand(2) - 0.5) * 400),
        rot: Math.round((rand(3) - 0.5) * 360),
        delay: +(baseDelay + i * stagger).toFixed(3)
      };
    });
  }, [text, baseDelay, stagger]);
  return /*#__PURE__*/React.createElement("span", {
    className: `rt-scatter ${className}`,
    style: {
      display: 'inline-block',
      ...style
    }
  }, chars.map(({
    c,
    dx,
    dy,
    rot,
    delay
  }, i) => c === ' ' ? /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "sp"
  }, "\xA0") : /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "ch",
    style: {
      '--from': `translate(${dx}px, ${dy}px)`,
      '--rot': `${rot}deg`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }
  }, c)));
}

// 3-ring variant — used in the nav lockup. Rings are redistributed inward so
// the visual footprint matches the 4-ring mark without an inner void.
function AnimatedRingMark3({
  size = 56,
  colors,
  scope = 'a3',
  speed = 1
}) {
  const c = colors || ['#6900E9', '#00AEEF', '#fe5828'];
  const id = `rm3-${scope}`;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size * (50 / 42),
    viewBox: "0 0 42 50",
    style: {
      display: 'block',
      overflow: 'visible'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("style", null, `
        .${id} .r{transform-box:fill-box;transform-origin:center;}
        .${id} .r1{animation:${id}-s1 ${5.9 / speed}s ease-in-out infinite;}
        .${id} .r2{animation:${id}-s2 ${5.3 / speed}s ease-in-out infinite;}
        .${id} .r3{animation:${id}-s3 ${6.1 / speed}s ease-in-out infinite;}
        @keyframes ${id}-s1{0%,100%{transform:scale(1);}50%{transform:scale(1.10);}}
        @keyframes ${id}-s2{0%,100%{transform:rotate(0);}50%{transform:rotate(-8deg);}}
        @keyframes ${id}-s3{0%,100%{transform:scale(1,1);}50%{transform:scale(1.20,0.80);}}
      `), /*#__PURE__*/React.createElement("g", {
    className: id,
    transform: "translate(0 25)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    className: "r r1",
    cx: "20.74",
    cy: "0",
    rx: "20.26",
    ry: "25.08",
    fill: c[0]
  }), /*#__PURE__*/React.createElement("ellipse", {
    className: "r r2",
    cx: "24.5",
    cy: "0.6",
    rx: "15.5",
    ry: "19.20",
    fill: c[1]
  }), /*#__PURE__*/React.createElement("ellipse", {
    className: "r r3",
    cx: "29.0",
    cy: "1.0",
    rx: "10.5",
    ry: "13.00",
    fill: c[2]
  })));
}

// ── EyeMark — the new animated brand mark: filled eye + tunnel rings ─────
// Reusable across nav, contact CTA, and project tiles. Takes:
//   colors:       3-array [outerFill, tunnelA, tunnelB]
//   keylineColor: optional stroke color (defaults to outerFill)
//   strokeWidth:  viewBox units (default 4)
//   scope:        unique id suffix so multiple instances don't collide
//   size:         pixel width
function EyeMark({
  size = 89,
  colors,
  keylineColor,
  strokeWidth = 4,
  scope = 'em'
}) {
  const c = colors || ['#fe5828', '#00AEEF', '#6900E9'];
  const stroke = keylineColor || c[0];
  const id = `eye-${scope}`;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size * (50 / 42),
    viewBox: "0 0 42 50",
    style: {
      display: 'block',
      overflow: 'hidden'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: `${id}-clip`
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z"
  }))), /*#__PURE__*/React.createElement("style", null, `
        .${id}-tr{transform-box:fill-box;transform-origin:center;opacity:0;animation:${id}-flow 3.6s cubic-bezier(0.4,0,0.7,0.6) infinite;will-change:transform,opacity;}
        .${id}-tr.t1{animation-delay:-3.0s;}
        .${id}-tr.t2{animation-delay:-2.28s;}
        .${id}-tr.t3{animation-delay:-1.56s;}
        .${id}-tr.t4{animation-delay:-0.84s;}
        .${id}-tr.t5{animation-delay:-0.12s;}
        @keyframes ${id}-flow{
          0%   { transform:scale(0.12); opacity:0; }
          8%   { opacity:0.95; }
          70%  { opacity:0.85; }
          100% { transform:scale(3.8);  opacity:0; }
        }
        @media (prefers-reduced-motion:reduce){
          .${id}-tr{animation:none!important;opacity:0!important;}
        }
      `), /*#__PURE__*/React.createElement("path", {
    d: "M 5,25 Q 21,4 37,25 Q 21,46 5,25 Z",
    fill: c[0]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 5,24 Q 21,3 37,24 Q 21,45 5,24 Z",
    fill: "none",
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeLinejoin: "miter"
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: `url(#${id}-clip)`
  }, /*#__PURE__*/React.createElement("circle", {
    className: `${id}-tr t1`,
    cx: "21",
    cy: "15",
    r: "5",
    fill: c[1]
  }), /*#__PURE__*/React.createElement("circle", {
    className: `${id}-tr t2`,
    cx: "21",
    cy: "15",
    r: "5",
    fill: c[2]
  }), /*#__PURE__*/React.createElement("circle", {
    className: `${id}-tr t3`,
    cx: "21",
    cy: "15",
    r: "5",
    fill: c[1]
  }), /*#__PURE__*/React.createElement("circle", {
    className: `${id}-tr t4`,
    cx: "21",
    cy: "15",
    r: "5",
    fill: c[2]
  }), /*#__PURE__*/React.createElement("circle", {
    className: `${id}-tr t5`,
    cx: "21",
    cy: "15",
    r: "5",
    fill: c[1]
  })));
}
Object.assign(window, {
  RingMark,
  AnimatedRingMark,
  AnimatedRingMark3,
  ScatterWord,
  EyeMark,
  CLIENT_LOGOS,
  CLIENT_NAMES,
  TESTIMONIALS,
  PROJECTS,
  SERVICES,
  APPROACH,
  AuroraField
});
})();
