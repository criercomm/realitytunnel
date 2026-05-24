// App shell — renders the Aurora homepage with a Tweaks panel for live palette
// + backdrop switching.

/* eslint-disable no-undef */
const { useState, useEffect, useMemo } = React;

// Curated accent palettes — each is [primary, secondary, tertiary, quaternary].
// Order matches the brand mark's ring stack from inside to outside, so the
// fourth value is always the deepest 'ember' tone.
const PALETTES = [
  ['#fe5828', '#00AEEF', '#6900E9', '#8c3622'], // Brand original
  ['#ff3b00', '#ffb800', '#6900E9', '#3a0c00'], // Heat · vivid orange / amber / violet / ember
  ['#22d3ee', '#a855f7', '#1e1b4b', '#0a0b1f'], // Cyber · cyan / violet / indigo / midnight
  ['#10b981', '#fbbf24', '#0f172a', '#052e1d'], // Forest · emerald / amber / slate / moss
  ['#ec4899', '#0ea5e9', '#1e1b4b', '#3b0d35'], // Aurora · magenta / sky / indigo / wine
  ['#f59e0b', '#dc2626', '#1c1917', '#3e0a07'], // Ember · amber / red / charcoal / blood
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#fe5828", "#00AEEF", "#6900E9", "#8c3622"],
  "navPalette": ["#fe5828", "#00AEEF", "#6900E9"],
  "keylineColor": "#5e567b"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const accent = useMemo(() => ({
    primary:    t.palette[0],
    secondary:  t.palette[1],
    tertiary:   t.palette[2],
    quaternary: t.palette[3],
  }), [t.palette]);

  return (
    <>
      <DirectionA accent={accent} navPalette={t.navPalette} keylineColor={t.keylineColor} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent palette">
          <TweakColor
            label="Preset"
            value={t.palette}
            onChange={(v) => setTweak('palette', v)}
            options={PALETTES}
          />
        </TweakSection>

        <TweakSection label="Edit colors">
          {['Primary', 'Secondary', 'Tertiary', 'Ember'].map((name, i) => (
            <TweakColor
              key={name}
              label={name}
              value={t.palette[i]}
              onChange={(c) => {
                const next = [...t.palette];
                next[i] = c;
                setTweak('palette', next);
              }}
            />
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {t.palette.map((c, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ width: '100%', height: 22, borderRadius: 5, background: c, border: '1px solid rgba(0,0,0,0.08)' }} />
                <div style={{ marginTop: 4, fontSize: 9.5, fontFamily: 'ui-monospace, monospace', textAlign: 'center', opacity: 0.7, letterSpacing: '-0.02em' }}>{c}</div>
              </div>
            ))}
          </div>
        </TweakSection>

        <TweakSection label="Nav ringmark">
          {['Outer', 'Mid', 'Inner'].map((name, i) => (
            <TweakColor
              key={name}
              label={name}
              value={t.navPalette[i]}
              onChange={(c) => {
                const next = [...t.navPalette];
                next[i] = c;
                setTweak('navPalette', next);
              }}
            />
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, marginBottom: 8 }}>
            {t.navPalette.slice(0, 3).map((c, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ width: '100%', height: 22, borderRadius: 5, background: c, border: '1px solid rgba(0,0,0,0.08)' }} />
                <div style={{ marginTop: 4, fontSize: 9.5, fontFamily: 'ui-monospace, monospace', textAlign: 'center', opacity: 0.7, letterSpacing: '-0.02em' }}>{c}</div>
              </div>
            ))}
          </div>
          <TweakButton label="Sync with main palette" onClick={() => setTweak('navPalette', t.palette.slice(0, 3))} secondary />
        </TweakSection>

        <TweakSection label="Eye keyline">
          <TweakColor
            label="Keyline"
            value={t.keylineColor}
            onChange={(c) => setTweak('keylineColor', c)}
          />
          <div style={{ display: 'flex', gap: 6, marginTop: 10, marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ width: '100%', height: 22, borderRadius: 5, background: t.keylineColor, border: '1px solid rgba(0,0,0,0.08)' }} />
              <div style={{ marginTop: 4, fontSize: 9.5, fontFamily: 'ui-monospace, monospace', textAlign: 'center', opacity: 0.7, letterSpacing: '-0.02em' }}>{t.keylineColor}</div>
            </div>
          </div>
          <TweakButton label="Match outer ring" onClick={() => setTweak('keylineColor', t.navPalette[0])} secondary />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
