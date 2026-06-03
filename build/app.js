/* Compiled from app.jsx — do not edit directly; edit the .jsx source and rebuild. */
;(function(){
// App shell — renders the Aurora homepage with a Tweaks panel for live palette
// + backdrop switching.

/* eslint-disable no-undef */
const {
  useState,
  useEffect,
  useMemo
} = React;

// Curated accent palettes — each is [primary, secondary, tertiary, quaternary].
// Order matches the brand mark's ring stack from inside to outside, so the
// fourth value is always the deepest 'ember' tone.
const PALETTES = [['#fe5828', '#00AEEF', '#6900E9', '#8c3622'],
// Brand original
['#ff3b00', '#ffb800', '#6900E9', '#3a0c00'],
// Heat · vivid orange / amber / violet / ember
['#22d3ee', '#a855f7', '#1e1b4b', '#0a0b1f'],
// Cyber · cyan / violet / indigo / midnight
['#10b981', '#fbbf24', '#0f172a', '#052e1d'],
// Forest · emerald / amber / slate / moss
['#ec4899', '#0ea5e9', '#1e1b4b', '#3b0d35'],
// Aurora · magenta / sky / indigo / wine
['#f59e0b', '#dc2626', '#1c1917', '#3e0a07'] // Ember · amber / red / charcoal / blood
];
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#fe5828", "#00AEEF", "#6900E9", "#8c3622"],
  "navPalette": ["#fe5828", "#00AEEF", "#6900E9"],
  "keylineColor": "#5e567b"
} /*EDITMODE-END*/;
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Resolve `#section` from URLs like `index.html#work` AFTER React mounts.
  // Without this, the browser tries to scroll before the React tree exists
  // and the hash silently fails — so deep-links from project pages land at
  // the top instead of the targeted section.
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) return;
      // wait for next frame so the section has rendered + layout settled
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({
          behavior: 'instant',
          block: 'start'
        });
      });
    };
    // initial mount
    const id = setTimeout(scrollToHash, 80);
    // also respond to hash changes (in-page nav)
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(id);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);
  const accent = useMemo(() => ({
    primary: t.palette[0],
    secondary: t.palette[1],
    tertiary: t.palette[2],
    quaternary: t.palette[3]
  }), [t.palette]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DirectionA, {
    accent: accent,
    navPalette: t.navPalette,
    keylineColor: t.keylineColor
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Accent palette"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Preset",
    value: t.palette,
    onChange: v => setTweak('palette', v),
    options: PALETTES
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Edit colors"
  }, ['Primary', 'Secondary', 'Tertiary', 'Ember'].map((name, i) => /*#__PURE__*/React.createElement(TweakColor, {
    key: name,
    label: name,
    value: t.palette[i],
    onChange: c => {
      const next = [...t.palette];
      next[i] = c;
      setTweak('palette', next);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 10
    }
  }, t.palette.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 22,
      borderRadius: 5,
      background: c,
      border: '1px solid rgba(0,0,0,0.08)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 9.5,
      fontFamily: 'ui-monospace, monospace',
      textAlign: 'center',
      opacity: 0.7,
      letterSpacing: '-0.02em'
    }
  }, c))))), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Nav ringmark"
  }, ['Outer', 'Mid', 'Inner'].map((name, i) => /*#__PURE__*/React.createElement(TweakColor, {
    key: name,
    label: name,
    value: t.navPalette[i],
    onChange: c => {
      const next = [...t.navPalette];
      next[i] = c;
      setTweak('navPalette', next);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 10,
      marginBottom: 8
    }
  }, t.navPalette.slice(0, 3).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 22,
      borderRadius: 5,
      background: c,
      border: '1px solid rgba(0,0,0,0.08)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 9.5,
      fontFamily: 'ui-monospace, monospace',
      textAlign: 'center',
      opacity: 0.7,
      letterSpacing: '-0.02em'
    }
  }, c)))), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Sync with main palette",
    onClick: () => setTweak('navPalette', t.palette.slice(0, 3)),
    secondary: true
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Eye keyline"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Keyline",
    value: t.keylineColor,
    onChange: c => setTweak('keylineColor', c)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 22,
      borderRadius: 5,
      background: t.keylineColor,
      border: '1px solid rgba(0,0,0,0.08)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 9.5,
      fontFamily: 'ui-monospace, monospace',
      textAlign: 'center',
      opacity: 0.7,
      letterSpacing: '-0.02em'
    }
  }, t.keylineColor))), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Match outer ring",
    onClick: () => setTweak('keylineColor', t.navPalette[0]),
    secondary: true
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
