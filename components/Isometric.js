'use client'

import { useEffect, useRef, useState } from 'react'

// Isometric line drawings of real systems. Flat (x, y) on a floor at height z,
// projected to the 400 x 240 viewBox. Moving parts animate in screen space.
const O = { x: 200, y: 128 }
const K = 0.68
const C = 0.866 * K
const S = 0.5 * K
const iso = (x, y, z = 0) => [O.x + C * (x - y), O.y + S * (x + y) - z * K]
const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
// screen offset for a move of d along the floor's x or y axis, or straight down
const along = (d, axis = 'x') => (axis === 'x' ? [C * d, S * d] : axis === 'y' ? [-C * d, S * d] : [0, d * K])

const Grid = () => {
  const lines = []
  for (let i = -320; i <= 320; i += 40) {
    lines.push(<line key={`a${i}`} className="iso-grid" x1={iso(i, -320)[0]} y1={iso(i, -320)[1]} x2={iso(i, 320)[0]} y2={iso(i, 320)[1]} />)
    lines.push(<line key={`b${i}`} className="iso-grid" x1={iso(-320, i)[0]} y1={iso(-320, i)[1]} x2={iso(320, i)[0]} y2={iso(320, i)[1]} />)
  }
  return <g>{lines}</g>
}

// a flat plate with optional thickness and corner nodes
const Plate = ({ x, y, w, h, z = 0, t = 0, nodes = true, strong = false, className = '' }) => {
  const lift = z > 0 && nodes ? ' iso-lift' : ''
  const top = [iso(x, y, z), iso(x + w, y, z), iso(x + w, y + h, z), iso(x, y + h, z)]
  const down = (p) => [p[0], p[1] + t]
  return (
    <g className={`${className}${lift}`}>
      {t > 0 && (
        <>
          <polygon className="iso-side" points={pts([top[1], top[2], down(top[2]), down(top[1])])} />
          <polygon className="iso-side iso-side--dark" points={pts([top[2], top[3], down(top[3]), down(top[2])])} />
        </>
      )}
      <polygon className={strong ? 'iso-face iso-face--strong' : 'iso-face'} points={pts(top)} />
      {nodes && top.map((p, i) => <circle key={i} className="iso-node" cx={p[0]} cy={p[1]} r="2.4" />)}
    </g>
  )
}

// a vertical panel standing on the floor, along the x axis
const Panel = ({ x, y, w, hgt, z = 0, lines = 4, className = '' }) => {
  const c = [iso(x, y, z), iso(x + w, y, z), iso(x + w, y, z + hgt), iso(x, y, z + hgt)]
  const rows = []
  for (let i = 1; i <= lines; i++) {
    const zz = z + hgt - (hgt / (lines + 1)) * i
    const a = iso(x + 8, y, zz)
    const b = iso(x + w * (i % 2 ? 0.8 : 0.55), y, zz)
    rows.push(<line key={i} className="iso-line" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />)
  }
  return (
    <g className={className}>
      <polygon className="iso-face" points={pts(c)} />
      {rows}
      {c.map((p, i) => <circle key={i} className="iso-node" cx={p[0]} cy={p[1]} r="2.4" />)}
    </g>
  )
}

const Dash = ({ from, to }) => {
  const a = iso(...from)
  const b = iso(...to)
  return <line className="iso-dash" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
}

// a small block that travels d units along an axis, delayed by i steps
const Packet = ({ at, d, axis = 'x', i = 0, size = 9 }) => {
  const [dx, dy] = along(d, axis)
  const [x, y, z] = at
  return (
    <g className="iso-move" style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, '--i': i }}>
      <Plate x={x} y={y} w={size} h={size} z={z} t={3} nodes={false} strong />
    </g>
  )
}

// a square cell that blinks, for hits, frames and replicas
const Cell = ({ x, y, z = 0, s = 12, i = 0 }) => (
  <g className="iso-blink" style={{ '--i': i }}>
    <Plate x={x} y={y} w={s} h={s} z={z} nodes={false} strong />
  </g>
)

// one piece of an assembling figure: it settles into place after d seconds
const Part = ({ d, line = false, children }) => (
  <g className={line ? 'part part--line' : 'part'} style={{ '--d': `${d}s` }}>{children}</g>
)

// ---------- the run: tokens travel waypoints on one shared timeline ----------
// a waypoint is [x, y, z, t], t a fraction of the cycle; repeating a point holds it
const EASE = { both: '0.42 0 0.58 1', in: '0.42 0 1 1', out: '0 0 0.58 1', none: '0 0 1 1' }
const same = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]

function motion(wps) {
  const list = [...wps]
  if (list[0][3] > 0) list.unshift([...list[0].slice(0, 3), 0])
  if (list[list.length - 1][3] < 1) list.push([...list[list.length - 1].slice(0, 3), 1])
  const sp = list.map(([x, y, z]) => iso(x, y, z))
  const lens = [0]
  for (let i = 1; i < sp.length; i++) lens.push(lens[i - 1] + Math.hypot(sp[i][0] - sp[i - 1][0], sp[i][1] - sp[i - 1][1]))
  const total = lens[lens.length - 1] || 1
  const stop = (i) => i === 0 || i === list.length - 1 || same(list[i], list[i - 1]) || (list[i + 1] && same(list[i], list[i + 1]))
  const splines = []
  for (let i = 0; i < list.length - 1; i++) {
    if (same(list[i], list[i + 1])) { splines.push(EASE.none); continue }
    const a = stop(i)
    const b = stop(i + 1)
    splines.push(a && b ? EASE.both : a ? EASE.in : b ? EASE.out : EASE.none)
  }
  return {
    path: 'M' + sp.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L'),
    keyPoints: lens.map((l) => (l / total).toFixed(4)).join(';'),
    keyTimes: list.map((w) => w[3].toFixed(4)).join(';'),
    keySplines: splines.join(';'),
    start: wps[0][3],
    end: wps[wps.length - 1][3],
  }
}

const span = (a, b, e = 0.012) =>
  a <= 0
    ? { values: '0;1;1;0;0', keyTimes: `0;${e};${(b - e).toFixed(4)};${b.toFixed(4)};1` }
    : { values: '0;0;1;1;0;0', keyTimes: `0;${a.toFixed(4)};${(a + e).toFixed(4)};${(b - e).toFixed(4)};${b.toFixed(4)};1` }

// a small blue block, drawn around its own origin so animateMotion can carry it
const tokenFaces = (() => {
  const o = (x, y, z) => [C * (x - y), S * (x + y) - z * K]
  const top = [o(-4, -4, 4), o(4, -4, 4), o(4, 4, 4), o(-4, 4, 4)]
  const dn = (p) => [p[0], p[1] + 4 * K]
  return {
    top: pts(top),
    right: pts([top[1], top[2], dn(top[2]), dn(top[1])]),
    left: pts([top[2], top[3], dn(top[3]), dn(top[2])]),
  }
})()

const Token = ({ wps, T, runs }) => {
  const m = motion(wps)
  const w = span(m.start, m.end)
  return (
    <g className="token" opacity="0">
      <polygon className="token__side" points={tokenFaces.right} />
      <polygon className="token__side token__side--dark" points={tokenFaces.left} />
      <polygon className="token__top" points={tokenFaces.top} />
      <animateMotion dur={`${T}s`} begin="indefinite" repeatCount={runs} fill="freeze" path={m.path} keyPoints={m.keyPoints} keyTimes={m.keyTimes} calcMode="spline" keySplines={m.keySplines} />
      <animate attributeName="opacity" dur={`${T}s`} begin="indefinite" repeatCount={runs} fill="freeze" values={w.values} keyTimes={w.keyTimes} />
    </g>
  )
}

// a plate face that lights up while a token is on it
const Flash = ({ x, y, w, h, z = 0, at: [a, b], T, runs, soft = false }) => {
  const top = [iso(x, y, z), iso(x + w, y, z), iso(x + w, y + h, z), iso(x, y + h, z)]
  const win = span(a, b, 0.03)
  return (
    <polygon className={soft ? 'flash flash--soft' : 'flash'} points={pts(top)} opacity="0">
      <animate attributeName="opacity" dur={`${T}s`} begin="indefinite" repeatCount={runs} fill="freeze" values={win.values} keyTimes={win.keyTimes} />
    </polygon>
  )
}

// how each system runs, in fractions of one cycle of T seconds
const flows = {
  motif: {
    T: 7.5,
    assembly: 2.1,
    tokens: [
      // the prompt: UI to planner, held for the plan, held again for your approval, onto the queue
      [[-224, -58, 0, 0.02], [-160, -47, 0, 0.1], [-128, -47, 0, 0.14], [-128, -47, 0, 0.19], [-128, 38, 0, 0.26], [-128, 38, 0, 0.36], [-80, 38, 0, 0.41], [-5, 0, 0, 0.44]],
      // three parallel jobs take the queue lanes to their workers, then converge on the renderer
      [[-5, -25, 0, 0.45], [45, -55, 0, 0.55], [85, -71, 0, 0.6], [115, -71, 0, 0.63], [115, -71, 0, 0.7], [145, -71, 0, 0.73], [266, 0, 0, 0.86]],
      [[-5, 0, 0, 0.46], [45, 0, 0, 0.56], [85, -6, 0, 0.6], [115, -6, 0, 0.63], [115, -6, 0, 0.71], [145, -6, 0, 0.74], [266, 0, 0, 0.87]],
      // the critic sends its job back once, a retry, then lets it through
      [[-5, 25, 0, 0.47], [45, 55, 0, 0.57], [85, 62, 0, 0.61], [115, 62, 0, 0.64], [95, 52, 0, 0.68], [115, 62, 0, 0.72], [115, 62, 0, 0.75], [145, 62, 0, 0.78], [266, 0, 0, 0.9]],
    ],
    flashes: [
      { x: -160, y: -75, w: 64, h: 56, at: [0.14, 0.19], soft: true },
      { x: -160, y: 15, w: 64, h: 46, at: [0.26, 0.36] },
      { x: 85, y: -90, w: 60, h: 38, at: [0.63, 0.7], soft: true },
      { x: 85, y: -25, w: 60, h: 38, at: [0.63, 0.71], soft: true },
      { x: 85, y: 40, w: 60, h: 44, at: [0.64, 0.75], soft: true },
      { x: 235, y: -40, w: 62, h: 80, at: [0.86, 0.96] },
    ],
  },
  echo: {
    T: 8.5,
    assembly: 2.2,
    tokens: [
      // 1. GitHub watcher to SQLite
      [[-235, -69, 0, 0.02], [-115, -15, 0, 0.08], [-80, 0, 0, 0.12]],
      // 2. Files/Browser watcher to SQLite
      [[-160, 36, 0, 0.04], [-115, 20, 0, 0.10], [-80, 0, 0, 0.14]],
      // 3. 21:00 Digest enters LangGraph, queries LanceDB, reflects, then crafts draft
      [[-80, 0, 0, 0.22], [37, -34, 0, 0.30], [35, -135, 0, 0.35], [37, 2, 0, 0.40], [37, 26, 0, 0.45], [70, 0, 0, 0.49], [37, 2, 0, 0.52], [37, 60, 0, 0.56]],
      // 4. Draft waits in Telegram for your approval, passes atomic lock, publishes to LinkedIn
      [[37, 60, 0, 0.58], [164, 0, 0, 0.64], [164, 0, 0, 0.74], [222, 0, 0, 0.78], [269, -58, 0, 0.90]],
      // 5. Atomic lock branches to X
      [[164, 0, 0, 0.74], [222, 0, 0, 0.78], [269, 52, 0, 0.92]],
    ],
    flashes: [
      { x: -115, y: -50, w: 70, h: 100, at: [0.12, 0.22] },
      { x: -5, y: -160, w: 80, h: 38, at: [0.33, 0.40], soft: true },
      { x: -15, y: -75, w: 105, h: 155, at: [0.30, 0.56], soft: true },
      { x: 125, y: -45, w: 78, h: 95, at: [0.64, 0.74] },
      { x: 208, y: -14, w: 28, h: 28, at: [0.76, 0.82] },
      { x: 245, y: -80, w: 48, h: 44, at: [0.88, 0.97], soft: true },
      { x: 245, y: 30, w: 48, h: 44, at: [0.90, 0.98], soft: true },
    ],
  },
}

const RUNS = 2
const Flow = ({ kind }) => {
  const f = flows[kind]
  return (
    <g className="flow" aria-hidden="true">
      {f.flashes.map((fl, i) => <Flash key={i} {...fl} T={f.T} runs={RUNS} />)}
      {f.tokens.map((wps, i) => <Token key={i} wps={wps} T={f.T} runs={RUNS} />)}
    </g>
  )
}

const drawings = {
  motif: (
    <>
      {/* 1. Next.js 15 Web UI */}
      <Part d={0}>
        <Plate x={-250} y={-80} w={52} h={44} t={6} />
        {/* Browser window chrome */}
        <line x1={iso(-248, -72)[0]} y1={iso(-248, -72)[1]} x2={iso(-202, -72)[0]} y2={iso(-202, -72)[1]} className="iso-line" />
        <circle cx={iso(-245, -76)[0]} cy={iso(-245, -76)[1]} r="1.3" className="iso-node" />
        <circle cx={iso(-240, -76)[0]} cy={iso(-240, -76)[1]} r="1.3" className="iso-node" />
        <circle cx={iso(-235, -76)[0]} cy={iso(-235, -76)[1]} r="1.3" className="iso-node" />
        {/* URL Pill Bar */}
        <polygon points={pts([iso(-228, -77), iso(-205, -77), iso(-205, -74), iso(-228, -74)])} className="iso-face" />
        {/* Text prompt box & input indicator */}
        <polygon points={pts([iso(-244, -68), iso(-206, -68), iso(-206, -44), iso(-244, -44)])} className="iso-face iso-subtle" />
        <line x1={iso(-240, -60)[0]} y1={iso(-240, -60)[1]} x2={iso(-214, -60)[0]} y2={iso(-214, -60)[1]} className="iso-line" />
      </Part>

      {/* 2. MCP Server & CLI Terminal */}
      <Part d={0.12}>
        <Plate x={-250} y={15} w={52} h={44} t={6} />
        {/* Terminal title rule */}
        <line x1={iso(-248, 22)[0]} y1={iso(-248, 22)[1]} x2={iso(-202, 22)[0]} y2={iso(-202, 22)[1]} className="iso-line" strokeWidth="1.2" />
        {/* Shell prompt >_ */}
        <path d={`M ${iso(-244, 30).join(' ')} L ${iso(-238, 33).join(' ')} L ${iso(-244, 36).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.4" />
        <line x1={iso(-234, 34)[0]} y1={iso(-234, 34)[1]} x2={iso(-224, 34)[0]} y2={iso(-224, 34)[1]} className="iso-line" strokeWidth="1.5" />
        {/* Stdio socket stream nodes */}
        <circle cx={iso(-240, 47)[0]} cy={iso(-240, 47)[1]} r="1.8" className="iso-node" />
        <circle cx={iso(-228, 47)[0]} cy={iso(-228, 47)[1]} r="1.8" className="iso-node" />
        <circle cx={iso(-216, 47)[0]} cy={iso(-216, 47)[1]} r="1.8" className="iso-node" />
      </Part>

      {/* Traces from UI & CLI into Storyboard Planner */}
      <Part d={0.22} line>
        <line x1={iso(-198, -58)[0]} y1={iso(-198, -58)[1]} x2={iso(-160, -47)[0]} y2={iso(-160, -47)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-198, 37)[0]} y1={iso(-198, 37)[1]} x2={iso(-160, 38)[0]} y2={iso(-160, 38)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 3. Creative Directors & Storyboard Planner */}
      <Part d={0.3}>
        <Plate x={-160} y={-75} w={64} h={56} t={8} />
        {/* Multi-act storyboard scene cards */}
        <polygon points={pts([iso(-154, -68), iso(-138, -68), iso(-138, -50), iso(-154, -50)])} className="iso-face" />
        <polygon points={pts([iso(-134, -68), iso(-118, -68), iso(-118, -50), iso(-134, -50)])} className="iso-face" />
        <polygon points={pts([iso(-114, -68), iso(-102, -68), iso(-102, -50), iso(-114, -50)])} className="iso-face" />
        {/* Narrative & emotional arc line */}
        <path d={`M ${iso(-154, -40).join(' ')} Q ${iso(-130, -48).join(' ')} ${iso(-102, -34).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.3" />
        <circle cx={iso(-154, -40)[0]} cy={iso(-154, -40)[1]} r="1.8" className="iso-node" />
        <circle cx={iso(-128, -44)[0]} cy={iso(-128, -44)[1]} r="1.8" className="iso-node" />
        <circle cx={iso(-102, -34)[0]} cy={iso(-102, -34)[1]} r="1.8" className="iso-node" />
        {/* Director review / taste critic feedback loop */}
        <path
          d={`M ${iso(-102, -42).join(' ')} Q ${iso(-88, -60).join(' ')} ${iso(-116, -72).join(' ')}`}
          className="iso-dash"
          fill="none"
          markerEnd="url(#arrow-iso)"
        />
      </Part>

      {/* Trace from Planner down to Approval Gate */}
      <Part d={0.4} line>
        <line x1={iso(-128, -19)[0]} y1={iso(-128, -19)[1]} x2={iso(-128, 15)[0]} y2={iso(-128, 15)[1]} className="iso-dash" strokeWidth="1.3" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 4. Human-in-the-Loop Storyboard Gate */}
      <Part d={0.45}>
        <Plate x={-160} y={15} w={64} h={46} t={8} strong />
        {/* Storyboard thumbnail frame */}
        <polygon points={pts([iso(-154, 21), iso(-126, 21), iso(-126, 42), iso(-154, 42)])} className="iso-face" />
        <line x1={iso(-150, 27)[0]} y1={iso(-150, 27)[1]} x2={iso(-130, 27)[0]} y2={iso(-130, 27)[1]} className="iso-line" />
        <line x1={iso(-150, 34)[0]} y1={iso(-150, 34)[1]} x2={iso(-134, 34)[0]} y2={iso(-134, 34)[1]} className="iso-line" />
        {/* Tactile APPROVE button */}
        <Plate x={-120} y={24} w={18} h={18} t={3} strong />
        <path d={`M ${iso(-117, 33).join(' ')} L ${iso(-113, 36).join(' ')} L ${iso(-105, 28).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.5" />
        {/* Gate status beacon */}
        <circle cx={iso(-128, 52)[0]} cy={iso(-128, 52)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(-128, 52)[0]} cy={iso(-128, 52)[1]} r="6" className="iso-radar" />
      </Part>

      {/* Trace from Gate into BullMQ Queue */}
      <Part d={0.55} line>
        <line x1={iso(-96, 38)[0]} y1={iso(-96, 38)[1]} x2={iso(-55, 38)[0]} y2={iso(-55, 38)[1]} className="iso-dash" strokeWidth="1.3" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 5. BullMQ & Redis Queue State Engine */}
      <Part d={0.62}>
        <Plate x={-55} y={-80} w={100} h={160} t={10} />
        {/* Engineering crosshatch background */}
        <polygon points={pts([iso(-50, -75), iso(40, -75), iso(40, 75), iso(-50, 75)])} fill="url(#hatch-iso)" opacity="0.35" />
        {/* 3 Queue partitioned lanes */}
        <line x1={iso(-50, -25)[0]} y1={iso(-50, -25)[1]} x2={iso(40, -25)[0]} y2={iso(40, -25)[1]} className="iso-line iso-subtle" strokeDasharray="3 3" />
        <line x1={iso(-50, 25)[0]} y1={iso(-50, 25)[1]} x2={iso(40, 25)[0]} y2={iso(40, 25)[1]} className="iso-line iso-subtle" strokeDasharray="3 3" />
        {/* MD5 Asset Cache Vault */}
        <Plate x={-45} y={-70} w={38} h={32} t={4} strong />
        {/* Lock shackle & hash indicator */}
        <path d={`M ${iso(-32, -62).join(' ')} L ${iso(-32, -66).join(' ')} Q ${iso(-28, -70).join(' ')} ${iso(-24, -66).join(' ')} L ${iso(-24, -62).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.3" />
        <circle cx={iso(-28, -54)[0]} cy={iso(-28, -54)[1]} r="1.8" className="iso-node" />
        {/* Active job accumulator cell */}
        <Cell x={12} y={35} s={16} i={0} />
      </Part>

      {/* Traces from Queue to 3 Workers */}
      <Part d={0.78} line>
        <line x1={iso(45, -55)[0]} y1={iso(45, -55)[1]} x2={iso(85, -71)[0]} y2={iso(85, -71)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(45, 0)[0]} y1={iso(45, 0)[1]} x2={iso(85, -6)[0]} y2={iso(85, -6)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(45, 55)[0]} y1={iso(45, 55)[1]} x2={iso(85, 62)[0]} y2={iso(85, 62)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 6. Parallel Workers & Structural QA Critic */}
      {/* Top: DALL-E 3 Image Generation */}
      <Part d={0.9}>
        <Plate x={85} y={-90} w={60} h={38} t={6} />
        {/* Image canvas border */}
        <polygon points={pts([iso(91, -84), iso(139, -84), iso(139, -58), iso(91, -58)])} className="iso-face" />
        {/* Landscape mountain & sun */}
        <polygon points={pts([iso(97, -62), iso(111, -74), iso(123, -62)])} className="iso-face iso-subtle" />
        <circle cx={iso(127, -74)[0]} cy={iso(127, -74)[1]} r="2" className="iso-node" />
      </Part>

      {/* Mid: ElevenLabs Voice & Audio DSP */}
      <Part d={1.0}>
        <Plate x={85} y={-25} w={60} h={38} t={6} />
        {/* Audio waveform equalizer bars */}
        {[95, 102, 109, 116, 123, 130].map((x, idx) => {
          const hgt = [7, 13, 9, 15, 11, 6][idx]
          return (
            <line
              key={x}
              x1={iso(x, -6)[0]}
              y1={iso(x, -6)[1]}
              x2={iso(x, -6)[0]}
              y2={iso(x, -6)[1] - hgt}
              className="iso-line"
              strokeWidth="1.5"
            />
          )
        })}
        {/* Ducking envelope curve */}
        <path d={`M ${iso(93, -18).join(' ')} Q ${iso(113, -22).join(' ')} ${iso(137, -15).join(' ')}`} className="iso-dash" fill="none" />
      </Part>

      {/* Bottom: Claude 3.5 Sonnet Code-Gen & QA Critic */}
      <Part d={1.1}>
        <Plate x={85} y={40} w={60} h={44} t={6} strong />
        {/* Code editor syntax lines */}
        <line x1={iso(92, 48)[0]} y1={iso(92, 48)[1]} x2={iso(136, 48)[0]} y2={iso(136, 48)[1]} className="iso-line" strokeWidth="1.4" />
        <line x1={iso(98, 56)[0]} y1={iso(98, 56)[1]} x2={iso(128, 56)[0]} y2={iso(128, 56)[1]} className="iso-line" />
        <line x1={iso(98, 64)[0]} y1={iso(98, 64)[1]} x2={iso(138, 64)[0]} y2={iso(138, 64)[1]} className="iso-line" />
        <line x1={iso(92, 72)[0]} y1={iso(92, 72)[1]} x2={iso(116, 72)[0]} y2={iso(116, 72)[1]} className="iso-line" strokeWidth="1.4" />
        {/* Structural QA Critic retry loop (back to queue) */}
        <path
          d={`M ${iso(135, 75).join(' ')} Q ${iso(155, 95).join(' ')} ${iso(110, 95).join(' ')} L ${iso(50, 75).join(' ')}`}
          className="iso-dash"
          fill="none"
          markerEnd="url(#arrow-iso)"
        />
      </Part>

      {/* Traces from 3 Workers converging to Remotion Renderer */}
      <Part d={1.25} line>
        <line x1={iso(145, -71)[0]} y1={iso(145, -71)[1]} x2={iso(235, -20)[0]} y2={iso(235, -20)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(145, -6)[0]} y1={iso(145, -6)[1]} x2={iso(235, 0)[0]} y2={iso(235, 0)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(145, 62)[0]} y1={iso(145, 62)[1]} x2={iso(235, 20)[0]} y2={iso(235, 20)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 7. Remotion + FFmpeg Headless Renderer */}
      <Part d={1.35}>
        <Plate x={235} y={-40} w={62} h={80} t={14} strong />
        {/* Viewport video screen */}
        <polygon points={pts([iso(241, -32), iso(289, -32), iso(289, 4), iso(241, 4)])} className="iso-face" />
        {/* Play triangle */}
        <polygon points={pts([iso(260, -18), iso(272, -14), iso(260, -10)])} className="iso-line" strokeWidth="1.2" />
        {/* Timeline filmstrip ruler */}
        <line x1={iso(241, 14)[0]} y1={iso(241, 14)[1]} x2={iso(289, 14)[0]} y2={iso(289, 14)[1]} className="iso-line" />
        {[245, 253, 261, 269, 277, 285].map((x) => (
          <line key={x} x1={iso(x, 14)[0]} y1={iso(x, 14)[1]} x2={iso(x, 14)[0]} y2={iso(x, 14)[1] + 4} className="iso-line" />
        ))}
        {/* Playhead scrubber */}
        <line x1={iso(261, 10)[0]} y1={iso(261, 10)[1]} x2={iso(261, 10)[0]} y2={iso(261, 10)[1] + 18} className="iso-line" strokeWidth="1.5" />
        <circle cx={iso(261, 10)[0]} cy={iso(261, 10)[1]} r="1.8" className="iso-node" />
        {/* MP4 Broadcast waves */}
        <path d={`M ${iso(289, -20).join(' ')} Q ${iso(298, 0).join(' ')} ${iso(289, 20).join(' ')}`} className="iso-line" fill="none" strokeDasharray="2 2" />
      </Part>
    </>
  ),
  echo: (
    <>
      {/* 1. GitHub Ingestion Watcher: Commits, Git Branching Tree */}
      <Part d={0}>
        <Plate x={-260} y={-90} w={50} h={42} t={6} />
        {/* Git trunk and branch */}
        <line x1={iso(-250, -78)[0]} y1={iso(-250, -78)[1]} x2={iso(-218, -78)[0]} y2={iso(-218, -78)[1]} className="iso-line" />
        <circle cx={iso(-248, -78)[0]} cy={iso(-248, -78)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(-234, -78)[0]} cy={iso(-234, -78)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(-220, -78)[0]} cy={iso(-220, -78)[1]} r="2.2" className="iso-node" />
        {/* Forked branch */}
        <path d={`M ${iso(-234, -78).join(' ')} Q ${iso(-230, -62).join(' ')} ${iso(-222, -62).join(' ')}`} className="iso-line" fill="none" />
        <circle cx={iso(-222, -62)[0]} cy={iso(-222, -62)[1]} r="2.2" className="iso-node" />
      </Part>

      {/* 2. Notion Ingestion Watcher: Structured Document & Blocks */}
      <Part d={0.1}>
        <Plate x={-185} y={-90} w={50} h={42} t={6} />
        {/* Header rule */}
        <line x1={iso(-178, -82)[0]} y1={iso(-178, -82)[1]} x2={iso(-146, -82)[0]} y2={iso(-146, -82)[1]} className="iso-line" strokeWidth="1.6" />
        {/* Checklist item 1 */}
        <polygon points={pts([iso(-178, -72), iso(-173, -72), iso(-173, -67), iso(-178, -67)])} className="iso-face" />
        <line x1={iso(-170, -70)[0]} y1={iso(-170, -70)[1]} x2={iso(-142, -70)[0]} y2={iso(-142, -70)[1]} className="iso-line" />
        {/* Checklist item 2 */}
        <polygon points={pts([iso(-178, -60), iso(-173, -60), iso(-173, -55), iso(-178, -55)])} className="iso-face" />
        <line x1={iso(-170, -58)[0]} y1={iso(-170, -58)[1]} x2={iso(-146, -58)[0]} y2={iso(-146, -58)[1]} className="iso-line" />
        {/* Divider rule */}
        <line x1={iso(-178, -50)[0]} y1={iso(-178, -50)[1]} x2={iso(-140, -50)[0]} y2={iso(-140, -50)[1]} className="iso-line iso-subtle" strokeDasharray="2 2" />
      </Part>

      {/* 3. Browser Ingestion Watcher: Active Tabs & Window Chrome */}
      <Part d={0.2}>
        <Plate x={-260} y={15} w={50} h={42} t={6} />
        {/* Window Chrome Titlebar */}
        <line x1={iso(-258, 23)[0]} y1={iso(-258, 23)[1]} x2={iso(-212, 23)[0]} y2={iso(-212, 23)[1]} className="iso-line" />
        <circle cx={iso(-255, 19)[0]} cy={iso(-255, 19)[1]} r="1.3" className="iso-node" />
        <circle cx={iso(-250, 19)[0]} cy={iso(-250, 19)[1]} r="1.3" className="iso-node" />
        <circle cx={iso(-245, 19)[0]} cy={iso(-245, 19)[1]} r="1.3" className="iso-node" />
        {/* Address pill bar */}
        <polygon points={pts([iso(-238, 18), iso(-214, 18), iso(-214, 21), iso(-238, 21)])} className="iso-face" />
        {/* Viewport card panes */}
        <polygon points={pts([iso(-255, 27), iso(-238, 27), iso(-238, 50), iso(-255, 50)])} className="iso-face iso-subtle" />
        <polygon points={pts([iso(-234, 27), iso(-214, 27), iso(-214, 50), iso(-234, 50)])} className="iso-face iso-subtle" />
      </Part>

      {/* 4. Files Ingestion Watcher: Directory Tree & Diffs */}
      <Part d={0.3}>
        <Plate x={-185} y={15} w={50} h={42} t={6} />
        {/* Directory tree hierarchy */}
        <line x1={iso(-176, 25)[0]} y1={iso(-176, 25)[1]} x2={iso(-176, 49)[0]} y2={iso(-176, 49)[1]} className="iso-line" />
        {/* File branch 1 */}
        <line x1={iso(-176, 33)[0]} y1={iso(-176, 33)[1]} x2={iso(-148, 33)[0]} y2={iso(-148, 33)[1]} className="iso-line" />
        <circle cx={iso(-148, 33)[0]} cy={iso(-148, 33)[1]} r="2" className="iso-node" />
        {/* File branch 2 */}
        <line x1={iso(-176, 43)[0]} y1={iso(-176, 43)[1]} x2={iso(-152, 43)[0]} y2={iso(-152, 43)[1]} className="iso-line" />
        <circle cx={iso(-152, 43)[0]} cy={iso(-152, 43)[1]} r="2" className="iso-node" />
      </Part>

      {/* Ingestion Traces from 4 Watchers to SQLite with arrowheads */}
      <Part d={0.42} line>
        <line x1={iso(-210, -69)[0]} y1={iso(-210, -69)[1]} x2={iso(-115, -15)[0]} y2={iso(-115, -15)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-135, -69)[0]} y1={iso(-135, -69)[1]} x2={iso(-115, -5)[0]} y2={iso(-115, -5)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-210, 36)[0]} y1={iso(-210, 36)[1]} x2={iso(-115, 10)[0]} y2={iso(-115, 10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-135, 36)[0]} y1={iso(-135, 36)[1]} x2={iso(-115, 25)[0]} y2={iso(-115, 25)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 5. APScheduler: Interval Timer Dial & Sweep Hand */}
      <Part d={0.5}>
        <Plate x={-120} y={-148} w={72} h={34} t={6} className="iso-dlq" />
        {/* Isometric chronometer dial */}
        <ellipse cx={iso(-84, -131)[0]} cy={iso(-84, -131)[1]} rx="14" ry="8" className="iso-frame" />
        {/* Radial tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
          const rad = (ang * Math.PI) / 180
          const cx = iso(-84, -131)[0]
          const cy = iso(-84, -131)[1]
          const x1 = cx + 11 * Math.cos(rad)
          const y1 = cy + 6.3 * Math.sin(rad)
          const x2 = cx + 14 * Math.cos(rad)
          const y2 = cy + 8 * Math.sin(rad)
          return <line key={ang} x1={x1} y1={y1} x2={x2} y2={y2} className="iso-clock" />
        })}
        {/* Dial sweep hand */}
        <line x1={iso(-84, -131)[0]} y1={iso(-84, -131)[1]} x2={iso(-84, -131)[0] + 8} y2={iso(-84, -131)[1] - 4.5} className="iso-line" strokeWidth="1.4" />
        <circle cx={iso(-84, -131)[0]} cy={iso(-84, -131)[1]} r="1.8" className="iso-node" />
      </Part>

      {/* Trigger trace from APScheduler down to SQLite */}
      <Part d={0.58} line>
        <line x1={iso(-84, -114)[0]} y1={iso(-84, -114)[1]} x2={iso(-84, -50)[0]} y2={iso(-84, -50)[1]} className="iso-dash" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 6. SQLite Digest & Event Store */}
      <Part d={0.6}>
        <Plate x={-115} y={-50} w={70} h={100} t={10} />
        {/* Database partition lines across face */}
        <line x1={iso(-110, -28)[0]} y1={iso(-110, -28)[1]} x2={iso(-48, -28)[0]} y2={iso(-48, -28)[1]} className="iso-line iso-subtle" />
        <line x1={iso(-110, -8)[0]} y1={iso(-110, -8)[1]} x2={iso(-48, -8)[0]} y2={iso(-48, -8)[1]} className="iso-line iso-subtle" />
        <line x1={iso(-110, 12)[0]} y1={iso(-110, 12)[1]} x2={iso(-48, 12)[0]} y2={iso(-48, 12)[1]} className="iso-line iso-subtle" />
        <line x1={iso(-110, 32)[0]} y1={iso(-110, 32)[1]} x2={iso(-48, 32)[0]} y2={iso(-48, 32)[1]} className="iso-line iso-subtle" />
        {/* Crosshatch table zone */}
        <polygon points={pts([iso(-110, -45), iso(-50, -45), iso(-50, -32), iso(-110, -32)])} fill="url(#hatch-iso)" />
        {/* Partition indicators */}
        {[-38, -18, 2, 22].map((y) => (
          <circle key={y} cx={iso(-106, y)[0]} cy={iso(-106, y)[1]} r="1.4" className="iso-node" />
        ))}
        {/* Nightly 21:00 digest synthesis cell */}
        <Cell x={-78} y={35} s={16} i={0} />
      </Part>

      {/* Connecting Trace from SQLite to LangGraph */}
      <Part d={0.72} line>
        <line x1={iso(-45, 0)[0]} y1={iso(-45, 0)[1]} x2={iso(-15, 0)[0]} y2={iso(-15, 0)[1]} className="iso-dash" strokeWidth="1.3" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 7. LanceDB Persona Vector Store */}
      <Part d={0.8}>
        <Plate x={-5} y={-160} w={80} h={38} t={6} />
        {/* Isometric vector space coordinate triad */}
        <line x1={iso(10, -145)[0]} y1={iso(10, -145)[1]} x2={iso(28, -145)[0]} y2={iso(28, -145)[1]} className="iso-line" />
        <line x1={iso(10, -145)[0]} y1={iso(10, -145)[1]} x2={iso(10, -130)[0]} y2={iso(10, -130)[1]} className="iso-line" />
        <line x1={iso(10, -145)[0]} y1={iso(10, -145)[1]} x2={iso(10, -145)[0]} y2={iso(10, -145)[1] - 10} className="iso-line" />
        {/* Persona embedding cluster dots */}
        <circle cx={iso(25, -150)[0]} cy={iso(25, -150)[1]} r="2" className="iso-node" />
        <circle cx={iso(38, -144)[0]} cy={iso(38, -144)[1]} r="2" className="iso-node" />
        <circle cx={iso(46, -152)[0]} cy={iso(46, -152)[1]} r="2" className="iso-node" />
        <circle cx={iso(58, -138)[0]} cy={iso(58, -138)[1]} r="2" className="iso-node" />
        <circle cx={iso(64, -146)[0]} cy={iso(64, -146)[1]} r="2" className="iso-node" />
        {/* Cosine similarity distance projection lines */}
        <line x1={iso(25, -150)[0]} y1={iso(25, -150)[1]} x2={iso(38, -144)[0]} y2={iso(38, -144)[1]} className="iso-dash" />
        <line x1={iso(38, -144)[0]} y1={iso(38, -144)[1]} x2={iso(46, -152)[0]} y2={iso(46, -152)[1]} className="iso-dash" />
        <line x1={iso(46, -152)[0]} y1={iso(46, -152)[1]} x2={iso(64, -146)[0]} y2={iso(64, -146)[1]} className="iso-dash" />
      </Part>

      {/* Bidirectional retrieval query & context traces between LangGraph and LanceDB */}
      <Part d={0.86} line>
        <line x1={iso(35, -75)[0]} y1={iso(35, -75)[1]} x2={iso(35, -122)[0]} y2={iso(35, -122)[1]} className="iso-dash" markerEnd="url(#arrow-iso)" />
        <line x1={iso(45, -122)[0]} y1={iso(45, -122)[1]} x2={iso(45, -75)[0]} y2={iso(45, -75)[1]} className="iso-dash" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 8. LangGraph Stateful Reasoning Engine Chassis */}
      <Part d={0.9}>
        <Plate x={-15} y={-75} w={105} h={155} t={10} />
        {/* Crosshatch engineering backdrop */}
        <polygon points={pts([iso(-10, -70), iso(85, -70), iso(85, 75), iso(-10, 75)])} fill="url(#hatch-iso)" opacity="0.35" />

        {/* 4 Execution Stage Chips inside LangGraph */}
        {/* Stage 1: Classify */}
        <Plate x={18} y={-58} w={38} h={24} t={4} />
        <line x1={iso(22, -52)[0]} y1={iso(22, -52)[1]} x2={iso(50, -52)[0]} y2={iso(50, -52)[1]} className="iso-line" />
        <line x1={iso(22, -46)[0]} y1={iso(22, -46)[1]} x2={iso(42, -46)[0]} y2={iso(42, -46)[1]} className="iso-line" />

        {/* Stage 2: Persona Integration */}
        <Plate x={18} y={-22} w={38} h={24} t={4} />
        <circle cx={iso(37, -10)[0]} cy={iso(37, -10)[1]} r="2.2" className="iso-node" />

        {/* Stage 3: LLM Synthesis (Active Core) */}
        <Plate x={18} y={14} w={38} h={24} t={4} strong />
        <circle cx={iso(37, 26)[0]} cy={iso(37, 26)[1]} r="2.6" className="iso-node" />

        {/* Stage 4: Media Synthesis */}
        <Plate x={18} y={50} w={38} h={24} t={4} />
        <line x1={iso(22, 56)[0]} y1={iso(22, 56)[1]} x2={iso(50, 56)[0]} y2={iso(50, 56)[1]} className="iso-line" />
        <line x1={iso(26, 56)[0]} y1={iso(26, 56)[1]} x2={iso(26, 68)[0]} y2={iso(26, 68)[1]} className="iso-line" strokeDasharray="2 2" />
        <line x1={iso(46, 56)[0]} y1={iso(46, 56)[1]} x2={iso(46, 68)[0]} y2={iso(46, 68)[1]} className="iso-line" strokeDasharray="2 2" />
      </Part>

      {/* Internal pipeline traces between LangGraph stages & Reflection loop */}
      <Part d={1.1} line>
        {/* Stage 1 -> 2 */}
        <line x1={iso(37, -34)[0]} y1={iso(37, -34)[1]} x2={iso(37, -22)[0]} y2={iso(37, -22)[1]} className="iso-line" markerEnd="url(#arrow-iso)" />
        {/* Stage 2 -> 3 */}
        <line x1={iso(37, 2)[0]} y1={iso(37, 2)[1]} x2={iso(37, 14)[0]} y2={iso(37, 14)[1]} className="iso-line" markerEnd="url(#arrow-iso)" />
        {/* Stage 3 -> 4 */}
        <line x1={iso(37, 38)[0]} y1={iso(37, 38)[1]} x2={iso(37, 50)[0]} y2={iso(37, 50)[1]} className="iso-line" markerEnd="url(#arrow-iso)" />

        {/* Self-Reflection & Critic Loop: from Stage 3 back to Stage 2 */}
        <path
          d={`M ${iso(56, 26).join(' ')} Q ${iso(86, 0).join(' ')} ${iso(56, -10).join(' ')}`}
          className="iso-dash"
          fill="none"
          markerEnd="url(#arrow-iso)"
        />
      </Part>

      {/* Forward Trace to Telegram Gate */}
      <Part d={1.25} line>
        <line x1={iso(90, 0)[0]} y1={iso(90, 0)[1]} x2={iso(125, 0)[0]} y2={iso(125, 0)[1]} className="iso-dash" strokeWidth="1.3" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 9. Human-in-the-Loop Telegram Gate Console */}
      <Part d={1.35}>
        <Plate x={125} y={-45} w={78} h={95} t={10} strong />
        {/* Message preview panel */}
        <polygon points={pts([iso(133, -35), iso(195, -35), iso(195, -6), iso(133, -6)])} className="iso-face" />
        <line x1={iso(138, -27)[0]} y1={iso(138, -27)[1]} x2={iso(190, -27)[0]} y2={iso(190, -27)[1]} className="iso-line" />
        <line x1={iso(138, -20)[0]} y1={iso(138, -20)[1]} x2={iso(182, -20)[0]} y2={iso(182, -20)[1]} className="iso-line" />
        <line x1={iso(138, -13)[0]} y1={iso(138, -13)[1]} x2={iso(174, -13)[0]} y2={iso(174, -13)[1]} className="iso-line" />

        {/* 3 Physical Tactile Action Buttons */}
        {/* APPROVE (Active / Highlighted) */}
        <Plate x={132} y={6} w={18} h={18} t={3} strong />
        {/* Checkmark icon */}
        <path d={`M ${iso(136, 15).join(' ')} L ${iso(140, 18).join(' ')} L ${iso(148, 10).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.5" />

        {/* EDIT button */}
        <Plate x={155} y={6} w={18} h={18} t={3} />
        <line x1={iso(160, 15)[0]} y1={iso(160, 15)[1]} x2={iso(168, 15)[0]} y2={iso(168, 15)[1]} className="iso-line" />

        {/* SKIP button */}
        <Plate x={178} y={6} w={18} h={18} t={3} />
        <line x1={iso(182, 11)[0]} y1={iso(182, 11)[1]} x2={iso(192, 21)[0]} y2={iso(192, 21)[1]} className="iso-line" />
        <line x1={iso(192, 11)[0]} y1={iso(192, 11)[1]} x2={iso(182, 21)[0]} y2={iso(182, 21)[1]} className="iso-line" />

        {/* Gate status beacon */}
        <circle cx={iso(164, 35)[0]} cy={iso(164, 35)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(164, 35)[0]} cy={iso(164, 35)[1]} r="6" className="iso-radar" />
      </Part>

      {/* Trace from Telegram to Mutex Lock */}
      <Part d={1.45} line>
        <line x1={iso(203, 0)[0]} y1={iso(203, 0)[1]} x2={iso(208, 0)[0]} y2={iso(208, 0)[1]} className="iso-dash" strokeWidth="1.3" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 10. Atomic Publisher with Concurrency Mutex Lock */}
      <Part d={1.5}>
        <Plate x={208} y={-14} w={28} h={28} t={6} strong />
        {/* Padlock / Mutex Icon */}
        {/* Shackle loop */}
        <path
          d={`M ${iso(219, -4).join(' ')} L ${iso(219, -8).join(' ')} Q ${iso(222, -12).join(' ')} ${iso(225, -8).join(' ')} L ${iso(225, -4).join(' ')}`}
          className="iso-line"
          fill="none"
          strokeWidth="1.4"
        />
        {/* Lock body keyhole */}
        <circle cx={iso(222, 0)[0]} cy={iso(222, 0)[1]} r="1.8" className="iso-node" />
        <line x1={iso(222, 1)[0]} y1={iso(222, 1)[1]} x2={iso(222, 5)[0]} y2={iso(222, 5)[1]} className="iso-line" strokeWidth="1.4" />
      </Part>

      {/* Traces from Lock to LinkedIn and X */}
      <Part d={1.55} line>
        <line x1={iso(236, -4)[0]} y1={iso(236, -4)[1]} x2={iso(245, -58)[0]} y2={iso(245, -58)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(236, 4)[0]} y1={iso(236, 4)[1]} x2={iso(245, 52)[0]} y2={iso(245, 52)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 11. LinkedIn Destination Card */}
      <Part d={1.6}>
        <Plate x={245} y={-80} w={48} h={44} t={6} />
        {/* Profile Avatar & Name */}
        <circle cx={iso(253, -71)[0]} cy={iso(253, -71)[1]} r="2.8" className="iso-node" />
        <line x1={iso(260, -71)[0]} y1={iso(260, -71)[1]} x2={iso(286, -71)[0]} y2={iso(286, -71)[1]} className="iso-line" strokeWidth="1.4" />
        {/* Feed text lines */}
        <line x1={iso(250, -60)[0]} y1={iso(250, -60)[1]} x2={iso(288, -60)[0]} y2={iso(288, -60)[1]} className="iso-line" />
        <line x1={iso(250, -52)[0]} y1={iso(250, -52)[1]} x2={iso(282, -52)[0]} y2={iso(282, -52)[1]} className="iso-line" />
        <line x1={iso(250, -44)[0]} y1={iso(250, -44)[1]} x2={iso(274, -44)[0]} y2={iso(274, -44)[1]} className="iso-line" />
        {/* Broadcast waves */}
        <path d={`M ${iso(288, -75).join(' ')} Q ${iso(295, -60).join(' ')} ${iso(288, -45).join(' ')}`} className="iso-line" fill="none" strokeDasharray="2 2" />
      </Part>

      {/* 12. X / Twitter Destination Card */}
      <Part d={1.65}>
        <Plate x={245} y={30} w={48} h={44} t={6} />
        {/* Thread header */}
        <circle cx={iso(253, 39)[0]} cy={iso(253, 39)[1]} r="2.2" className="iso-node" />
        <line x1={iso(260, 39)[0]} y1={iso(260, 39)[1]} x2={iso(284, 39)[0]} y2={iso(284, 39)[1]} className="iso-line" />
        {/* Thread text line */}
        <line x1={iso(250, 48)[0]} y1={iso(250, 48)[1]} x2={iso(286, 48)[0]} y2={iso(286, 48)[1]} className="iso-line" />
        {/* Thread connection line to child tweet */}
        <line x1={iso(253, 44)[0]} y1={iso(253, 44)[1]} x2={iso(253, 62)[0]} y2={iso(253, 62)[1]} className="iso-line" strokeDasharray="2 2" />
        <circle cx={iso(253, 62)[0]} cy={iso(253, 62)[1]} r="1.6" className="iso-node" />
        <line x1={iso(260, 62)[0]} y1={iso(260, 62)[1]} x2={iso(280, 62)[0]} y2={iso(280, 62)[1]} className="iso-line" />
        {/* Broadcast waves */}
        <path d={`M ${iso(288, 35).join(' ')} Q ${iso(295, 52).join(' ')} ${iso(288, 68).join(' ')}`} className="iso-line" fill="none" strokeDasharray="2 2" />
      </Part>
    </>
  ),
  cards: (
    <>
      <Plate x={-235} y={-100} w={50} h={42} t={6} />
      <Plate x={-235} y={-22} w={50} h={42} t={6} />
      <Plate x={-235} y={56} w={50} h={42} t={6} />
      <Dash from={[-210, -58]} to={[-210, -22]} />
      <Dash from={[-210, 20]} to={[-210, 56]} />
      {[-79, -1, 77].map((y) => <Dash key={y} from={[-185, y]} to={[-100, 0]} />)}
      <Plate x={-100} y={-80} w={140} h={160} t={10} />
      <Plate x={-80} y={-55} w={100} h={110} z={62} t={6} strong />
      {[[-80, -55], [20, -55], [20, 55], [-80, 55]].map(([x, y]) => <Dash key={`${x}${y}`} from={[x, y, 0]} to={[x, y, 56]} />)}
      <Packet at={[-180, -80, 0]} d={90} i={0} size={8} />
      <Packet at={[-180, 72, 0]} d={90} i={1} size={8} />
      <Dash from={[40, 0]} to={[110, 0]} />
      <Plate x={110} y={-22} w={44} h={44} t={32} />
    </>
  ),
  dealer: (
    <>
      <Plate x={-135} y={-95} w={270} h={170} nodes={false} className="iso-dlq" />
      <Plate x={-240} y={-80} w={52} h={46} t={6} />
      <Plate x={-240} y={6} w={52} h={46} t={6} />
      <Dash from={[-188, -57]} to={[-150, -40]} />
      <Dash from={[-188, 29]} to={[-150, 10]} />
      <Plate x={-150} y={-80} w={14} h={135} t={34} strong />
      <Plate x={-115} y={-75} w={115} h={125} t={8} />
      <Plate x={-95} y={-55} w={75} h={55} z={30} t={6} />
      <Dash from={[0, -10]} to={[55, -10]} />
      <Plate x={55} y={-45} w={62} h={62} t={36} />
      <Plate x={-75} y={110} w={64} h={40} t={6} />
      <Dash from={[-43, 110]} to={[-43, 50]} />
      <Packet at={[-180, -60, 0]} d={60} i={0} size={8} />
      <Packet at={[-180, 26, 0]} d={60} i={1} size={8} />
    </>
  ),
  events: (
    <>
      <Plate x={-210} y={-28} w={50} h={56} t={8} />
      <Plate x={-130} y={-46} w={170} h={92} t={6} />
      <Dash from={[-130, -15]} to={[40, -15]} />
      <Dash from={[-130, 15]} to={[40, 15]} />
      <Plate x={80} y={-120} w={56} h={50} t={8} />
      <Plate x={80} y={-25} w={56} h={50} t={8} />
      <Plate x={80} y={70} w={56} h={50} t={8} />
      <Dash from={[40, 0]} to={[80, -95]} />
      <Dash from={[40, 0]} to={[80, 0]} />
      <Dash from={[40, 0]} to={[80, 95]} />
      <Plate x={-60} y={90} w={60} h={46} z={0} t={6} className="iso-dlq" />
      <Dash from={[-30, 46]} to={[-30, 90]} />
      <Packet at={[-160, -6, 0]} d={150} i={0} />
      <Packet at={[-160, -24, 0]} d={150} i={1} />
      <Packet at={[-160, 12, 0]} d={150} i={2} />
    </>
  ),
  cache: (
    <>
      <Plate x={-110} y={-80} w={220} h={160} t={10} />
      {[-50, -10, 30].map((v) => <Dash key={v} from={[-110, v]} to={[110, v]} />)}
      <Plate x={-80} y={-55} w={160} h={110} z={78} t={6} />
      {[[-80, -55], [80, -55], [80, 55], [-80, 55]].map(([x, y]) => (
        <Dash key={`${x}${y}`} from={[x, y, 0]} to={[x, y, 72]} />
      ))}
      {[0, 1, 2, 3].map((c) => [0, 1, 2].map((r) => (
        <Cell key={`${c}${r}`} x={-64 + c * 34} y={-40 + r * 30} z={78} s={20} i={c * 3 + r} />
      )))}
      <Packet at={[-5, 0, 150]} d={66} axis="down" i={0} />
    </>
  ),
  agents: (
    <>
      <Plate x={-190} y={-60} w={380} h={120} nodes={false} />
      <Panel x={-170} y={0} w={90} hgt={96} />
      <Panel x={-40} y={0} w={90} hgt={96} lines={3} />
      <Panel x={90} y={0} w={90} hgt={96} lines={5} />
      <Dash from={[-80, 0, 48]} to={[-40, 0, 48]} />
      <Dash from={[50, 0, 48]} to={[90, 0, 48]} />
      <Dash from={[5, 0, 108]} to={[-125, 0, 108]} />
      <Packet at={[-80, -5, 44]} d={40} i={0} size={8} />
      <Packet at={[50, -5, 44]} d={40} i={2} size={8} />
      <Packet at={[-5, -5, 104]} d={-120} i={1} size={8} />
    </>
  ),
  media: (
    <>
      <Plate x={-230} y={-40} w={60} h={80} t={6} />
      <Plate x={-224} y={-34} w={48} h={68} z={14} t={4} nodes={false} />
      <Plate x={-130} y={-50} w={170} h={100} t={6} />
      {[0, 1, 2, 3, 4].map((f) => <Cell key={f} x={-118 + f * 32} y={-22} s={24} i={f} />)}
      <Dash from={[-170, 0]} to={[-130, 0]} />
      <Dash from={[40, 0]} to={[90, -60]} />
      <Dash from={[40, 0]} to={[90, 10]} />
      <Dash from={[40, 0]} to={[90, 72]} />
      <Plate x={90} y={-90} w={70} h={56} t={6} />
      <Plate x={90} y={-12} w={52} h={42} t={6} />
      <Plate x={90} y={56} w={36} h={30} t={6} />
    </>
  ),
  cluster: (
    <>
      <Plate x={-170} y={-110} w={340} h={220} t={8} />
      {[-110, -40, 30, 100].map((x, i) => [-70, 10].map((y, j) => (
        <g key={`${x}${y}`} className={i === 3 && j === 1 ? 'iso-blink' : undefined} style={{ '--i': 0 }}>
          <Plate x={x} y={y} w={44} h={44} z={0} t={30} strong={i === 3 && j === 1} />
        </g>
      )))}
      <Dash from={[-170, 90]} to={[170, 90]} />
      <Packet at={[-160, 84, 0]} d={300} i={0} size={8} />
      <Packet at={[-160, 84, 0]} d={300} i={2} size={8} />
    </>
  ),
}

// labels sit on the drawing as HTML, so they stay readable at any size
const labels = {
  motif: [
    [-235, -80, 0, 'Next.js UI', false, false, 0.2, 16],
    [-240, 59, -8, 'MCP / CLI', false, true, 0.4, 16],
    [-115, -75, 0, 'Storyboard', false, false, 0.6, 16],
    [-150, 61, -12, 'Approval', true, true, 0.8, 20],
    [-40, -80, 0, 'BullMQ', false, false, 1.0, 16],
    [115, -90, 0, 'DALL·E 3', false, false, 1.2, 16],
    [115, 84, -12, 'Claude Code & QA', false, true, 1.4, 16],
    [266, 40, -16, 'Remotion MP4', false, true, 1.6, 16],
  ],
  echo: [
    [-245, -90, 0, 'GitHub', false, false, 0.2, 16],
    [-150, -90, 0, 'Notion', false, false, 0.35, 16],
    [-245, 57, -8, 'Browser', false, true, 0.5, 16],
    [-170, 57, -8, 'Files', false, true, 0.65, 16],
    [-84, -148, 0, 'Scheduler', false, false, 0.8, 16],
    [-100, 50, -28, 'SQLite', false, true, 1.0, 20],
    [35, -160, 0, 'LanceDB', false, false, 1.2, 16],
    [25, 80, -32, 'LangGraph', false, true, 1.4, 16],
    [140, 50, -32, 'Telegram', true, true, 1.6, 16],
    [269, 74, -12, 'LinkedIn & X', false, true, 1.8, 16],
  ],
  cards: [
    [-210, -79, 14, 'iOS'],
    [-210, -1, 14, 'Android'],
    [-210, 77, 14, 'Desktop'],
    [-232, 18, 30, 'WebRTC voice, peer to peer'],
    [-30, 0, 76, 'WebSocket room'],
    [-30, 60, 14, 'Next.js on Vercel'],
    [132, 0, 42, 'AI opponent for solo'],
  ],
  dealer: [
    [-214, -57, 14, 'Dealer'],
    [-214, 29, 14, 'Buyer'],
    [-143, -12, 48, 'RBAC middleware'],
    [-57, -27, 44, 'Reservations: stock check, timeout'],
    [-57, 40, 14, 'Node.js API'],
    [86, -14, 46, 'PostgreSQL'],
    [-43, 130, 14, 'Stripe webhooks, verified, idempotent'],
    [100, 70, 6, 'Docker Compose'],
  ],
}

export default function Isometric({ kind, label, variant = 'iso', fig, title }) {
  const ref = useRef(null)
  const art = useRef(null)
  const stage = useRef(null)
  const timers = useRef([])
  // architecture drawings crop to their own bounds so they fill the frame
  const [view, setView] = useState([0, 0, 400, 240])
  // idle, running, paused or done; only figures with a flow have a run
  const [run, setRun] = useState('idle')
  const flow = variant === 'manual' ? flows[kind] : null

  useEffect(() => {
    if (!labels[kind] || !art.current) return
    const b = art.current.getBBox()
    const pad = 22
    setView([b.x - pad, b.y - pad * 1.6, b.width + pad * 2, b.height + pad * 2.6])
  }, [kind])

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = () => {
    const el = stage.current
    const svg = ref.current
    if (!el || !svg || !flow) return
    clear()
    el.classList.remove('is-live')
    void el.offsetWidth
    el.classList.add('is-live')
    svg.unpauseAnimations()
    setRun('running')
    timers.current.push(setTimeout(() => {
      svg.querySelectorAll('.flow animate, .flow animateMotion').forEach((a) => a.beginElement())
    }, flow.assembly * 1000))
    timers.current.push(setTimeout(() => setRun('done'), (flow.assembly + flow.T * RUNS) * 1000))
  }

  const toggle = () => {
    const svg = ref.current
    if (run === 'running') { svg.pauseAnimations(); setRun('paused'); clear(); return }
    if (run === 'paused') { svg.unpauseAnimations(); setRun('running'); timers.current.push(setTimeout(() => setRun('done'), flow.T * 1000)); return }
    play()
  }

  useEffect(() => {
    const el = flow ? stage.current : ref.current
    if (!el) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (flow && !still) el.classList.add('is-armed')
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (!flow) { el.classList.add('is-live'); return }
      if (!still) play()
    }, { threshold: 0.35 })
    io.observe(el)
    return () => { io.disconnect(); clear() }
  }, [])

  const svg = (
    <svg ref={ref} className={`iso iso--${variant} diagram`} viewBox={view.join(' ')} role="img" aria-label={label}>
      <defs>
        <pattern id="hatch-iso" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)">
          <line x1="3.5" y1="0" x2="3.5" y2="7" className="iso-hatch" />
        </pattern>
        <marker id="arrow-iso" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0 0.5 L6 3 L0 5.5 L1.2 3 Z" fill="currentColor" />
        </marker>
      </defs>
      <Grid />
      <g ref={art}>{drawings[kind]}</g>
      {flow && <Flow kind={kind} />}
    </svg>
  )
  const body = !labels[kind] ? svg : (
    <div className="arch" style={{ aspectRatio: `${view[2]} / ${view[3]}` }}>
      {svg}
      <ul className="arch__labels" aria-hidden="true">
        {labels[kind].map(([x, y, z, text, you, below, d, len]) => {
          const [sx, sy] = iso(x, y, z)
          const cls = [you && 'is-you', below && 'is-below'].filter(Boolean).join(' ') || undefined
          return (
            <li
              key={typeof text === 'string' ? text : `${x}-${y}`}
              className={cls}
              style={{
                left: `${((sx - view[0]) / view[2]) * 100}%`,
                top: `${((sy - view[1]) / view[3]) * 100}%`,
                '--d': `${d ?? 0}s`,
                ...(len ? { '--line-h': `${len}px` } : {}),
              }}
            >
              {text}
            </li>
          )
        })}
      </ul>
    </div>
  )
  if (variant !== 'manual') return body
  return (
    <div className="plate" ref={stage}>
      {fig && <span className="plate__fig" aria-hidden="true">FIG_{String(fig).padStart(3, '0')}</span>}
      {title && <span className="plate__title" aria-hidden="true">[ {title} ]</span>}
      {body}
      {flow && run !== 'idle' && (
        <button type="button" className="plate__run" onClick={toggle}>
          {run === 'running' ? 'pause' : run === 'paused' ? 'resume' : 'replay'}
        </button>
      )}
    </div>
  )
}
