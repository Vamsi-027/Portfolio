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
  cards: {
    T: 7.2,
    assembly: 2.0,
    tokens: [
      // 1. Client card move into WebSocket Gateway and Room Arbiter
      [[-226, -25, 0, 0.04], [-140, -5, 0, 0.16], [-55, -50, 0, 0.28], [-15, -50, 0, 0.35]],
      // 2. Peer-to-peer WebRTC voice ping between iOS and Android
      [[-226, -70, 0, 0.12], [-226, -5, 0, 0.24], [-226, -5, 0, 0.28], [-226, -70, 0, 0.40]],
      // 3. AI Opponent evaluates and submits counter-card
      [[135, 0, 0, 0.30], [80, 0, 0, 0.42], [25, 0, 0, 0.48]],
      // 4. Battle Resolver decides winner, updates Trump Deck, broadcasts to clients
      [[25, 0, 0, 0.54], [-30, 42, 0, 0.62], [-140, -5, 0, 0.74], [-226, 60, 0, 0.88]],
      [[-140, -5, 0, 0.74], [-226, -70, 0, 0.88]],
    ],
    flashes: [
      { x: -165, y: -70, w: 56, h: 130, at: [0.16, 0.26], soft: true },
      { x: -55, y: -75, w: 48, h: 44, at: [0.28, 0.38] },
      { x: 105, y: -45, w: 62, h: 90, at: [0.32, 0.44], soft: true },
      { x: 5, y: -35, w: 40, h: 70, at: [0.48, 0.60] },
      { x: -55, y: 15, w: 48, h: 55, at: [0.62, 0.72], soft: true },
    ],
  },
  dealer: {
    T: 7.6,
    assembly: 2.0,
    tokens: [
      // 1. Dealer pushes inventory: Dealer Portal -> RBAC -> API -> PostgreSQL write
      [[-226, -68, 0, 0.03], [-148, -45, 0, 0.12], [-20, -50, 0, 0.22], [115, -10, 0, 0.32]],
      // 2. Buyer 1 locks vehicle reservation: Storefront -> RBAC -> Stock Lock & 15-min TTL hold -> DB marked HELD
      [[-226, 57, 0, 0.15], [-148, 15, 0, 0.24], [-20, -25, 0, 0.35], [115, -10, 0, 0.44]],
      // 3. Buyer 2 concurrent collision: attempts same car -> rejected by Concurrency Lock
      [[-226, 57, 0, 0.30], [-148, 15, 0, 0.38], [-55, -25, 0, 0.46], [-148, 25, 0, 0.54]],
      // 4. Stripe Checkout sends Webhook -> Signature verified -> Idempotency check -> DB marked SOLD
      [[230, 46, 0, 0.54], [120, 80, 0, 0.62], [-20, 60, 0, 0.70], [115, -10, 0, 0.80], [-226, 57, 0, 0.92]],
    ],
    flashes: [
      { x: -165, y: -75, w: 34, h: 145, at: [0.12, 0.24], soft: true },
      { x: -75, y: -75, w: 110, h: 80, at: [0.22, 0.48] },
      { x: 85, y: -50, w: 68, h: 90, at: [0.32, 0.84], soft: true },
      { x: -75, y: 35, w: 110, h: 56, at: [0.70, 0.78] },
    ],
  },
  events: {
    T: 7.0,
    assembly: 1.8,
    tokens: [
      [[-215, -20, 0, 0.05], [-150, -20, 0, 0.18], [-100, -20, 0, 0.28]],
      [[-60, -50, 0, 0.32], [20, -70, 0, 0.48], [85, -20, 0, 0.60]],
      [[-60, -15, 0, 0.34], [20, -15, 0, 0.46], [-35, 65, 0, 0.62], [20, -15, 0, 0.76]],
      [[-60, 20, 0, 0.36], [20, 45, 0, 0.52]],
      [[-60, -15, 0, 0.50], [45, 100, 0, 0.72]],
    ],
    flashes: [
      { x: -200, y: -45, w: 46, h: 48, at: [0.05, 0.18] },
      { x: -115, y: -68, w: 85, h: 96, at: [0.28, 0.42] },
      { x: 20, y: -85, w: 50, h: 140, at: [0.48, 0.70], soft: true },
      { x: 25, y: 75, w: 58, h: 40, at: [0.72, 0.85] },
    ],
  },
  cache: {
    T: 6.8,
    assembly: 1.8,
    tokens: [
      [[-135, -55, 0, 0.05], [-60, -25, 40, 0.20], [0, -25, 40, 0.30], [-135, -55, 0, 0.45]],
      [[-135, -55, 0, 0.35], [-60, -25, 40, 0.48], [-40, 45, 0, 0.60], [40, 45, 0, 0.70], [40, -25, 40, 0.82], [-135, -55, 0, 0.94]],
    ],
    flashes: [
      { x: -170, y: -70, w: 48, h: 44, at: [0.05, 0.15] },
      { x: -80, y: -50, w: 155, h: 55, at: [0.20, 0.40] },
      { x: -105, y: 15, w: 205, h: 80, at: [0.60, 0.75], soft: true },
    ],
  },
  agents: {
    T: 7.5,
    assembly: 1.9,
    tokens: [
      [[-215, -10, 0, 0.04], [-115, -10, 0, 0.18], [-25, -40, 0, 0.32], [70, -10, 0, 0.44]],
      [[70, -10, 0, 0.48], [-50, 45, 0, 0.58], [-115, -10, 0, 0.68]],
      [[-115, -10, 0, 0.70], [70, -10, 0, 0.80], [170, -10, 0, 0.92]],
    ],
    flashes: [
      { x: -125, y: -45, w: 56, h: 70, at: [0.18, 0.30] },
      { x: -40, y: -68, w: 48, h: 42, at: [0.32, 0.42], soft: true },
      { x: 20, y: -45, w: 56, h: 70, at: [0.44, 0.56] },
      { x: 115, y: -40, w: 48, h: 60, at: [0.90, 0.98] },
    ],
  },
  media: {
    T: 7.2,
    assembly: 1.9,
    tokens: [
      [[-225, -5, 0, 0.04], [-140, -5, 0, 0.16]],
      [[-140, -5, 0, 0.18], [-55, -55, 0, 0.32], [45, -5, 0, 0.55]],
      [[-140, -5, 0, 0.19], [-55, 0, 0, 0.33], [45, -5, 0, 0.56]],
      [[-140, -5, 0, 0.20], [-55, 55, 0, 0.34], [45, -5, 0, 0.57]],
      [[45, -5, 0, 0.60], [160, -5, 0, 0.78]],
    ],
    flashes: [
      { x: -240, y: -40, w: 50, h: 68, at: [0.04, 0.16] },
      { x: -75, y: -75, w: 56, h: 145, at: [0.32, 0.55], soft: true },
      { x: 25, y: -35, w: 56, h: 64, at: [0.55, 0.68] },
      { x: 130, y: -45, w: 65, h: 80, at: [0.78, 0.95] },
    ],
  },
  cluster: {
    T: 7.6,
    assembly: 2.0,
    tokens: [
      [[-225, -10, 0, 0.04], [-135, -10, 0, 0.16], [-55, -10, 0, 0.26]],
      [[-135, -10, 0, 0.28], [-55, -10, 0, 0.38], [10, -50, 0, 0.48]],
      [[-135, -10, 0, 0.30], [-55, -10, 0, 0.40], [10, 20, 0, 0.50]],
      [[60, -20, 0, 0.54], [170, -10, 0, 0.72], [170, 25, 0, 0.88]],
    ],
    flashes: [
      { x: -155, y: -45, w: 50, h: 75, at: [0.28, 0.42] },
      { x: -65, y: -65, w: 32, h: 115, at: [0.38, 0.50] },
      { x: -18, y: -75, w: 125, h: 130, at: [0.48, 0.75], soft: true },
      { x: 145, y: -45, w: 60, h: 75, at: [0.72, 0.92] },
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
      {/* 1. iOS Mobile Client */}
      <Part d={0}>
        <Plate x={-250} y={-95} w={48} h={42} t={6} />
        {/* Dynamic Island pill & speaker */}
        <polygon points={pts([iso(-244, -91), iso(-236, -91), iso(-236, -88), iso(-244, -88)])} className="iso-face--strong" />
        {/* Mobile screen card display outline */}
        <polygon points={pts([iso(-242, -84), iso(-222, -84), iso(-222, -62), iso(-242, -62)])} className="iso-face iso-subtle" />
        <line x1={iso(-238, -78)[0]} y1={iso(-238, -78)[1]} x2={iso(-226, -78)[0]} y2={iso(-226, -78)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-238, -72)[0]} y1={iso(-238, -72)[1]} x2={iso(-228, -72)[0]} y2={iso(-228, -72)[1]} className="iso-line" />
        <circle cx={iso(-226, -74)[0]} cy={iso(-226, -74)[1]} r="1.5" className="iso-node" />
      </Part>

      {/* 2. Android Mobile Client */}
      <Part d={0.12}>
        <Plate x={-250} y={-25} w={48} h={42} t={6} />
        {/* Punch-hole camera */}
        <circle cx={iso(-243, -20)[0]} cy={iso(-243, -20)[1]} r="1.3" className="iso-node" />
        {/* Card stat selection pill */}
        <polygon points={pts([iso(-242, -14), iso(-222, -14), iso(-222, 8), iso(-242, 8)])} className="iso-face iso-subtle" />
        <line x1={iso(-238, -7)[0]} y1={iso(-238, -7)[1]} x2={iso(-226, -7)[0]} y2={iso(-226, -7)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-238, -1)[0]} y1={iso(-238, -1)[1]} x2={iso(-230, -1)[0]} y2={iso(-230, -1)[1]} className="iso-line" />
      </Part>

      {/* 3. Desktop Web Client */}
      <Part d={0.24}>
        <Plate x={-250} y={45} w={48} h={42} t={6} />
        {/* Browser window chrome dots & address bar */}
        <line x1={iso(-248, 52)[0]} y1={iso(-248, 52)[1]} x2={iso(-204, 52)[0]} y2={iso(-204, 52)[1]} className="iso-line" strokeWidth="1.1" />
        <circle cx={iso(-245, 48)[0]} cy={iso(-245, 48)[1]} r="1.2" className="iso-node" />
        <circle cx={iso(-240, 48)[0]} cy={iso(-240, 48)[1]} r="1.2" className="iso-node" />
        <polygon points={pts([iso(-235, 47), iso(-210, 47), iso(-210, 50), iso(-235, 50)])} className="iso-face" />
        {/* Hand of 3 cricket cards fanned on desktop */}
        <polygon points={pts([iso(-244, 58), iso(-234, 58), iso(-234, 78), iso(-244, 78)])} className="iso-face" />
        <polygon points={pts([iso(-232, 58), iso(-222, 58), iso(-222, 78), iso(-232, 78)])} className="iso-face iso-face--strong" />
        <polygon points={pts([iso(-220, 58), iso(-210, 58), iso(-210, 78), iso(-220, 78)])} className="iso-face" />
      </Part>

      {/* WebRTC Peer-to-Peer Voice Mesh */}
      <Part d={0.3} line>
        {/* Signaling & audio channels linking clients directly */}
        <line x1={iso(-226, -53)[0]} y1={iso(-226, -53)[1]} x2={iso(-226, -25)[0]} y2={iso(-226, -25)[1]} className="iso-dash" strokeWidth="1.2" />
        <line x1={iso(-226, 17)[0]} y1={iso(-226, 17)[1]} x2={iso(-226, 45)[0]} y2={iso(-226, 45)[1]} className="iso-dash" strokeWidth="1.2" />
        <path d={`M ${iso(-202, -74).join(' ')} Q ${iso(-185, -15).join(' ')} ${iso(-202, 66).join(' ')}`} className="iso-dash" fill="none" strokeWidth="1.2" />
        {/* Audio mic / wave indicator nodes */}
        <circle cx={iso(-226, -39)[0]} cy={iso(-226, -39)[1]} r="2" className="iso-node" />
        <circle cx={iso(-226, -39)[0]} cy={iso(-226, -39)[1]} r="5" className="iso-radar" />
        <circle cx={iso(-226, 31)[0]} cy={iso(-226, 31)[1]} r="2" className="iso-node" />
        <circle cx={iso(-226, 31)[0]} cy={iso(-226, 31)[1]} r="5" className="iso-radar" />
        <circle cx={iso(-188, -4)[0]} cy={iso(-188, -4)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(-188, -4)[0]} cy={iso(-188, -4)[1]} r="6" className="iso-radar" />
      </Part>

      {/* WebSocket duplex traces from clients into Gateway */}
      <Part d={0.4} line>
        <line x1={iso(-202, -74)[0]} y1={iso(-202, -74)[1]} x2={iso(-165, -45)[0]} y2={iso(-165, -45)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-202, -4)[0]} y1={iso(-202, -4)[1]} x2={iso(-165, -5)[0]} y2={iso(-165, -5)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-202, 66)[0]} y1={iso(-202, 66)[1]} x2={iso(-165, 35)[0]} y2={iso(-165, 35)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 4. Next.js on Vercel & WebSocket Gateway */}
      <Part d={0.48}>
        <Plate x={-165} y={-70} w={56} h={130} t={8} />
        {/* Gateway title rule */}
        <line x1={iso(-163, -62)[0]} y1={iso(-163, -62)[1]} x2={iso(-111, -62)[0]} y2={iso(-111, -62)[1]} className="iso-line" strokeWidth="1.2" />
        {/* Three full-duplex socket channel pins */}
        <circle cx={iso(-160, -45)[0]} cy={iso(-160, -45)[1]} r="2" className="iso-node" />
        <circle cx={iso(-160, -5)[0]} cy={iso(-160, -5)[1]} r="2" className="iso-node" />
        <circle cx={iso(-160, 35)[0]} cy={iso(-160, 35)[1]} r="2" className="iso-node" />
        {/* Heartbeat connection monitor */}
        <circle cx={iso(-137, -15)[0]} cy={iso(-137, -15)[1]} r="6" className="iso-clock" />
        <line x1={iso(-137, -15)[0]} y1={iso(-137, -15)[1]} x2={iso(-137, -15)[0] + 3} y2={iso(-137, -15)[1] - 3} className="iso-line" strokeWidth="1.2" />
        {/* JWT Auth validator block */}
        <Plate x={-155} y={15} w={36} h={28} t={4} strong />
        <polygon points={pts([iso(-151, 20), iso(-123, 20), iso(-123, 24), iso(-151, 24)])} className="iso-face" />
      </Part>

      {/* Trace from Gateway to Room Engine */}
      <Part d={0.58} line>
        <line x1={iso(-109, -5)[0]} y1={iso(-109, -5)[1]} x2={iso(-65, -5)[0]} y2={iso(-65, -5)[1]} className="iso-dash" strokeWidth="1.4" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 5. Master Multiplayer Room Controller */}
      <Part d={0.65}>
        <Plate x={-65} y={-85} w={115} h={170} t={10} />
        {/* Blueprint engineering grid hatch */}
        <polygon points={pts([iso(-60, -80), iso(45, -80), iso(45, 80), iso(-60, 80)])} fill="url(#hatch-iso)" opacity="0.35" />

        {/* 5a. Room State & Turn Arbiter */}
        <Plate x={-55} y={-75} w={50} h={46} t={5} strong />
        {/* Active turn countdown timer */}
        <circle cx={iso(-42, -52)[0]} cy={iso(-42, -52)[1]} r="7" className="iso-clock" />
        <path d={`M ${iso(-42, -52).join(' ')} L ${iso(-42, -57).join(' ')}`} className="iso-line" strokeWidth="1.3" />
        {/* State indicator pills */}
        <polygon points={pts([iso(-28, -68), iso(-12, -68), iso(-12, -60), iso(-28, -60)])} className="iso-face" />
        <line x1={iso(-26, -64)[0]} y1={iso(-26, -64)[1]} x2={iso(-14, -64)[0]} y2={iso(-14, -64)[1]} className="iso-line" strokeWidth="1.2" />

        {/* 5b. 50-Card Trump Deck Vault */}
        <Plate x={-55} y={15} w={50} h={58} t={6} />
        {/* Stacked 3D deck cards */}
        <polygon points={pts([iso(-50, 20), iso(-10, 20), iso(-10, 68), iso(-50, 68)])} className="iso-face" />
        <polygon points={pts([iso(-48, 22), iso(-8, 22), iso(-8, 70), iso(-48, 70)])} className="iso-face" />
        <polygon points={pts([iso(-46, 24), iso(-6, 24), iso(-6, 72), iso(-46, 72)])} className="iso-face iso-face--strong" />
        {/* Cricket card photo & stat bars */}
        <polygon points={pts([iso(-43, 27), iso(-22, 27), iso(-22, 45), iso(-43, 45)])} className="iso-face" />
        <line x1={iso(-19, 32)[0]} y1={iso(-19, 32)[1]} x2={iso(-9, 32)[0]} y2={iso(-9, 32)[1]} className="iso-line" strokeWidth="1.3" />
        <line x1={iso(-19, 38)[0]} y1={iso(-19, 38)[1]} x2={iso(-12, 38)[0]} y2={iso(-12, 38)[1]} className="iso-line" />
        <line x1={iso(-43, 52)[0]} y1={iso(-43, 52)[1]} x2={iso(-9, 52)[0]} y2={iso(-9, 52)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-43, 58)[0]} y1={iso(-43, 58)[1]} x2={iso(-16, 58)[0]} y2={iso(-16, 58)[1]} className="iso-line" />
        <line x1={iso(-43, 64)[0]} y1={iso(-43, 64)[1]} x2={iso(-22, 64)[0]} y2={iso(-22, 64)[1]} className="iso-line" />

        {/* 5c. Round Resolver & Card Battle Arena */}
        <Plate x={5} y={-38} w={42} h={76} t={6} strong />
        {/* Stat battle comparator (Card A vs Card B) */}
        <polygon points={pts([iso(9, -30), iso(21, -30), iso(21, -10), iso(9, -10)])} className="iso-face" />
        <polygon points={pts([iso(27, -30), iso(39, -30), iso(39, -10), iso(27, -10)])} className="iso-face" />
        <path d={`M ${iso(15, -6).join(' ')} L ${iso(24, 0).join(' ')} L ${iso(33, -6).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.4" />
        {/* Win / score distribution bars */}
        <polygon points={pts([iso(9, 10), iso(41, 10), iso(41, 30), iso(9, 30)])} className="iso-face iso-subtle" />
        <line x1={iso(13, 17)[0]} y1={iso(13, 17)[1]} x2={iso(37, 17)[0]} y2={iso(37, 17)[1]} className="iso-line" strokeWidth="1.3" />
        <line x1={iso(13, 23)[0]} y1={iso(13, 23)[1]} x2={iso(28, 23)[0]} y2={iso(28, 23)[1]} className="iso-line" />
      </Part>

      {/* Trace between Round Resolver and Solo AI Opponent */}
      <Part d={0.75} line>
        <line x1={iso(47, 0)[0]} y1={iso(47, 0)[1]} x2={iso(105, 0)[0]} y2={iso(105, 0)[1]} className="iso-trace-arrow" strokeWidth="1.3" markerEnd="url(#arrow-iso)" />
        <line x1={iso(105, 10)[0]} y1={iso(105, 10)[1]} x2={iso(47, 10)[0]} y2={iso(47, 10)[1]} className="iso-dash" strokeWidth="1.2" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 6. Solo AI Opponent Bot */}
      <Part d={0.82}>
        <Plate x={105} y={-45} w={64} h={90} t={12} strong />
        {/* AI Bot logic chip core */}
        <Plate x={115} y={-35} w={44} h={42} t={4} />
        {/* Heuristic decision radar */}
        <circle cx={iso(137, -14)[0]} cy={iso(137, -14)[1]} r="7" className="iso-radar" />
        <circle cx={iso(137, -14)[0]} cy={iso(137, -14)[1]} r="2" className="iso-node" />
        <line x1={iso(137, -23)[0]} y1={iso(137, -23)[1]} x2={iso(137, -5)[0]} y2={iso(137, -5)[1]} className="iso-crosshair" />
        <line x1={iso(128, -14)[0]} y1={iso(128, -14)[1]} x2={iso(146, -14)[0]} y2={iso(146, -14)[1]} className="iso-crosshair" />
        {/* AI Card hand representation */}
        <polygon points={pts([iso(113, 16), iso(127, 16), iso(127, 36), iso(113, 36)])} className="iso-face" />
        <polygon points={pts([iso(129, 16), iso(143, 16), iso(143, 36), iso(129, 36)])} className="iso-face iso-face--strong" />
        <polygon points={pts([iso(145, 16), iso(159, 16), iso(159, 36), iso(145, 36)])} className="iso-face" />
      </Part>

      {/* Precision blueprint boundary and corner ticks */}
      <Part d={0.9} line>
        <rect x={iso(-255, -100)[0]} y={iso(-255, -100)[1]} width="12" height="12" className="iso-frame" />
        <line x1={iso(-255, -100)[0]} y1={iso(-255, -100)[1]} x2={iso(-255, -100)[0] + 6} y2={iso(-255, -100)[1]} className="iso-frame-tick" />
        <line x1={iso(-255, -100)[0]} y1={iso(-255, -100)[1]} x2={iso(-255, -100)[0]} y2={iso(-255, -100)[1] + 6} className="iso-frame-tick" />
      </Part>
    </>
  ),
  dealer: (
    <>
      {/* 1. Dealer Inventory & Admin Portal */}
      <Part d={0}>
        <Plate x={-250} y={-90} w={48} h={44} t={6} />
        {/* Desktop window controls */}
        <line x1={iso(-248, -82)[0]} y1={iso(-248, -82)[1]} x2={iso(-204, -82)[0]} y2={iso(-204, -82)[1]} className="iso-line" strokeWidth="1.1" />
        <circle cx={iso(-245, -86)[0]} cy={iso(-245, -86)[1]} r="1.2" className="iso-node" />
        <circle cx={iso(-240, -86)[0]} cy={iso(-240, -86)[1]} r="1.2" className="iso-node" />
        {/* URL Pill Bar */}
        <polygon points={pts([iso(-235, -87), iso(-210, -87), iso(-210, -84), iso(-235, -84)])} className="iso-face" />
        {/* Inventory Table Grid / Vehicle Data Rows */}
        <line x1={iso(-244, -74)[0]} y1={iso(-244, -74)[1]} x2={iso(-208, -74)[0]} y2={iso(-208, -74)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-244, -66)[0]} y1={iso(-244, -66)[1]} x2={iso(-214, -66)[0]} y2={iso(-214, -66)[1]} className="iso-line" />
        <line x1={iso(-244, -58)[0]} y1={iso(-244, -58)[1]} x2={iso(-210, -58)[0]} y2={iso(-210, -58)[1]} className="iso-line" />
        {/* [Add / Edit VIN] badge */}
        <Plate x={-222} y={-64} w={14} h={12} t={3} strong />
        <line x1={iso(-219, -58)[0]} y1={iso(-219, -58)[1]} x2={iso(-211, -58)[0]} y2={iso(-211, -58)[1]} className="iso-line" strokeWidth="1.1" />
      </Part>

      {/* 2. Buyer Mobile & Web Storefront */}
      <Part d={0.12}>
        <Plate x={-250} y={35} w={48} h={44} t={6} />
        {/* Punch-hole camera & top bar */}
        <circle cx={iso(-243, 40)[0]} cy={iso(-243, 40)[1]} r="1.2" className="iso-node" />
        <polygon points={pts([iso(-238, 38), iso(-210, 38), iso(-210, 42), iso(-238, 42)])} className="iso-face" />
        {/* Vehicle card outline / Car silhouette */}
        <polygon points={pts([iso(-244, 46), iso(-212, 46), iso(-212, 64), iso(-244, 64)])} className="iso-face iso-subtle" />
        {/* Stylized sports car profile */}
        <path
          d={`M ${iso(-240, 58).join(' ')} L ${iso(-236, 54).join(' ')} L ${iso(-228, 54).join(' ')} L ${iso(-222, 57).join(' ')} L ${iso(-216, 58).join(' ')}`}
          className="iso-line"
          fill="none"
          strokeWidth="1.3"
        />
        <circle cx={iso(-236, 59)[0]} cy={iso(-236, 59)[1]} r="1.5" className="iso-node" />
        <circle cx={iso(-220, 59)[0]} cy={iso(-220, 59)[1]} r="1.5" className="iso-node" />
        {/* "Hold Vehicle" button with countdown clock */}
        <Plate x={-242} y={67} w={32} h={9} t={2} strong />
        <circle cx={iso(-238, 71.5)[0]} cy={iso(-238, 71.5)[1]} r="2" className="iso-clock" />
        <line x1={iso(-234, 71.5)[0]} y1={iso(-234, 71.5)[1]} x2={iso(-216, 71.5)[0]} y2={iso(-216, 71.5)[1]} className="iso-line" strokeWidth="1" />
      </Part>

      {/* Traces from Portals to RBAC Middleware */}
      <Part d={0.22} line>
        <line x1={iso(-202, -68)[0]} y1={iso(-202, -68)[1]} x2={iso(-165, -45)[0]} y2={iso(-165, -45)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-202, 57)[0]} y1={iso(-202, 57)[1]} x2={iso(-165, 15)[0]} y2={iso(-165, 15)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        {/* Trace label badges */}
        <circle cx={iso(-182, -56)[0]} cy={iso(-182, -56)[1]} r="2" className="iso-node" />
        <circle cx={iso(-182, 36)[0]} cy={iso(-182, 36)[1]} r="2" className="iso-node" />
      </Part>

      {/* 3. RBAC Middleware & Security Shield */}
      <Part d={0.32}>
        <Plate x={-165} y={-75} w={34} h={145} t={14} strong />
        {/* Keyhole / Shield emblem */}
        <circle cx={iso(-148, -60)[0]} cy={iso(-148, -60)[1]} r="3.5" className="iso-node" />
        <path d={`M ${iso(-151, -57).join(' ')} L ${iso(-148, -50).join(' ')} L ${iso(-145, -57).join(' ')}`} className="iso-line" strokeWidth="1.4" fill="none" />
        {/* Channel partition divider */}
        <line x1={iso(-163, -5)[0]} y1={iso(-163, -5)[1]} x2={iso(-133, -5)[0]} y2={iso(-133, -5)[1]} className="iso-dash" strokeWidth="1.2" />
        {/* Top Channel: Dealer JWT Validator */}
        <polygon points={pts([iso(-161, -48), iso(-135, -48), iso(-135, -20), iso(-161, -20)])} className="iso-face" />
        <line x1={iso(-157, -34)[0]} y1={iso(-157, -34)[1]} x2={iso(-139, -34)[0]} y2={iso(-139, -34)[1]} className="iso-line" strokeWidth="1.1" />
        <circle cx={iso(-148, -34)[0]} cy={iso(-148, -34)[1]} r="1.8" className="iso-node" />
        {/* Bottom Channel: Buyer Role Guard & 403 Rejection Shunt */}
        <polygon points={pts([iso(-161, 8), iso(-135, 8), iso(-135, 36), iso(-161, 36)])} className="iso-face" />
        <line x1={iso(-157, 22)[0]} y1={iso(-157, 22)[1]} x2={iso(-139, 22)[0]} y2={iso(-139, 22)[1]} className="iso-line" strokeWidth="1.1" />
        {/* Unauthorized Rejection 403 indicator */}
        <path d={`M ${iso(-148, 48).join(' ')} Q ${iso(-138, 58).join(' ')} ${iso(-148, 65).join(' ')}`} className="iso-dash" fill="none" strokeWidth="1.2" />
        <circle cx={iso(-148, 65)[0]} cy={iso(-148, 65)[1]} r="1.6" className="iso-node" />
      </Part>

      {/* 4. Docker Compose Container Boundary */}
      <Part d={0.42}>
        <Plate x={-95} y={-105} w={260} h={215} nodes={false} className="iso-dlq" />
        {/* Container corner ticks */}
        <line x1={iso(-95, -105)[0]} y1={iso(-95, -105)[1]} x2={iso(-95, -105)[0] + 8} y2={iso(-95, -105)[1]} className="iso-frame-tick" />
        <line x1={iso(-95, -105)[0]} y1={iso(-95, -105)[1]} x2={iso(-95, -105)[0]} y2={iso(-95, -105)[1] + 8} className="iso-frame-tick" />
        <line x1={iso(165, -105)[0]} y1={iso(165, -105)[1]} x2={iso(165, -105)[0] - 8} y2={iso(165, -105)[1]} className="iso-frame-tick" />
        <line x1={iso(165, 110)[0]} y1={iso(165, 110)[1]} x2={iso(165, 110)[0] - 8} y2={iso(165, 110)[1]} className="iso-frame-tick" />
        {/* Internal Docker Bridge Network trace */}
        <line x1={iso(35, -35)[0]} y1={iso(35, -35)[1]} x2={iso(85, -35)[0]} y2={iso(85, -35)[1]} className="iso-dash" strokeWidth="1.5" />
        <line x1={iso(35, 15)[0]} y1={iso(35, 15)[1]} x2={iso(85, 15)[0]} y2={iso(85, 15)[1]} className="iso-dash" strokeWidth="1.5" />
      </Part>

      {/* Trace from RBAC to Node.js API Service */}
      <Part d={0.46} line>
        <line x1={iso(-131, -35)[0]} y1={iso(-131, -35)[1]} x2={iso(-75, -35)[0]} y2={iso(-75, -35)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-131, 20)[0]} y1={iso(-131, 20)[1]} x2={iso(-75, -10)[0]} y2={iso(-75, -10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 5. Node.js API Service & Concurrency Engine */}
      <Part d={0.52}>
        <Plate x={-75} y={-75} w={110} h={80} t={10} strong />
        {/* Service title rule */}
        <line x1={iso(-73, -65)[0]} y1={iso(-73, -65)[1]} x2={iso(33, -65)[0]} y2={iso(33, -65)[1]} className="iso-line" strokeWidth="1.2" />
        {/* Sub-block A: Stock Validation & Concurrency Lock */}
        <polygon points={pts([iso(-70, -60), iso(30, -60), iso(30, -30), iso(-70, -30)])} className="iso-face" />
        {/* Concurrency Mutex Padlock */}
        <circle cx={iso(-58, -45)[0]} cy={iso(-58, -45)[1]} r="2.5" className="iso-node" />
        <path d={`M ${iso(-61, -48).join(' ')} L ${iso(-61, -52).join(' ')} Q ${iso(-58, -55).join(' ')} ${iso(-55, -52).join(' ')} L ${iso(-55, -48).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.2" />
        <line x1={iso(-48, -45)[0]} y1={iso(-48, -45)[1]} x2={iso(20, -45)[0]} y2={iso(20, -45)[1]} className="iso-line" strokeWidth="1.3" />
        <line x1={iso(-48, -38)[0]} y1={iso(-48, -38)[1]} x2={iso(5, -38)[0]} y2={iso(5, -38)[1]} className="iso-line" />

        {/* Sub-block B: 15-Minute Reservation TTL Timer State Machine */}
        <polygon points={pts([iso(-70, -22), iso(30, -22), iso(30, 0), iso(-70, 0)])} className="iso-face" />
        {/* Clock dial with ticking hand */}
        <circle cx={iso(-58, -11)[0]} cy={iso(-58, -11)[1]} r="4.5" className="iso-clock" />
        <line x1={iso(-58, -11)[0]} y1={iso(-58, -11)[1]} x2={iso(-58, -11)[0] + 3} y2={iso(-58, -11)[1] - 2} className="iso-line" strokeWidth="1.2" />
        {/* State transition pipeline: AVAILABLE -> HELD -> SOLD / EXPIRED */}
        <line x1={iso(-48, -11)[0]} y1={iso(-48, -11)[1]} x2={iso(-15, -11)[0]} y2={iso(-15, -11)[1]} className="iso-line" strokeWidth="1.3" />
        <circle cx={iso(-15, -11)[0]} cy={iso(-15, -11)[1]} r="1.8" className="iso-node" />
        <line x1={iso(-10, -11)[0]} y1={iso(-10, -11)[1]} x2={iso(20, -11)[0]} y2={iso(20, -11)[1]} className="iso-dash" strokeWidth="1.2" />
      </Part>

      {/* 6. Stripe Webhook Listener & Idempotency Vault */}
      <Part d={0.62}>
        <Plate x={-75} y={35} w={110} h={56} t={8} />
        {/* Vault header */}
        <line x1={iso(-73, 43)[0]} y1={iso(-73, 43)[1]} x2={iso(33, 43)[0]} y2={iso(33, 43)[1]} className="iso-line" strokeWidth="1.2" />
        {/* HMAC Signature Check Shield */}
        <polygon points={pts([iso(-68, 50), iso(-45, 50), iso(-45, 78), iso(-68, 78)])} className="iso-face iso-face--strong" />
        <path d={`M ${iso(-62, 60).join(' ')} L ${iso(-57, 65).join(' ')} L ${iso(-50, 56).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.4" />
        <circle cx={iso(-56, 72)[0]} cy={iso(-56, 72)[1]} r="1.5" className="iso-node" />
        {/* Idempotency Event Deduplication Ledger */}
        <polygon points={pts([iso(-38, 50), iso(28, 50), iso(28, 78), iso(-38, 78)])} className="iso-face" />
        <line x1={iso(-32, 58)[0]} y1={iso(-32, 58)[1]} x2={iso(20, 58)[0]} y2={iso(20, 58)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-32, 66)[0]} y1={iso(-32, 66)[1]} x2={iso(12, 66)[0]} y2={iso(12, 66)[1]} className="iso-line" />
        <line x1={iso(-32, 74)[0]} y1={iso(-32, 74)[1]} x2={iso(16, 74)[0]} y2={iso(16, 74)[1]} className="iso-line" />
      </Part>

      {/* Connecting Trace between Webhook Vault and API */}
      <Part d={0.68} line>
        <line x1={iso(-20, 35)[0]} y1={iso(-20, 35)[1]} x2={iso(-20, 5)[0]} y2={iso(-20, 5)[1]} className="iso-dash" strokeWidth="1.3" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* Traces from API & Webhook Vault to PostgreSQL */}
      <Part d={0.72} line>
        <line x1={iso(35, -35)[0]} y1={iso(35, -35)[1]} x2={iso(85, -20)[0]} y2={iso(85, -20)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(35, 60)[0]} y1={iso(35, 60)[1]} x2={iso(85, 10)[0]} y2={iso(85, 10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 7. PostgreSQL Database Cluster (ACID Relational Storage) */}
      <Part d={0.78}>
        {/* Persistent Volume Base Disk */}
        <Plate x={80} y={-55} w={78} h={100} t={6} nodes={false} className="iso-dlq" />
        {/* 3D Database Tower */}
        <Plate x={85} y={-50} w={68} h={90} t={28} strong />
        {/* Relational Table Schema Grid Lines */}
        <line x1={iso(92, -40)[0]} y1={iso(92, -40)[1]} x2={iso(146, -40)[0]} y2={iso(146, -40)[1]} className="iso-line" strokeWidth="1.4" />
        <line x1={iso(92, -26)[0]} y1={iso(92, -26)[1]} x2={iso(142, -26)[0]} y2={iso(142, -26)[1]} className="iso-line" />
        <line x1={iso(92, -12)[0]} y1={iso(92, -12)[1]} x2={iso(138, -12)[0]} y2={iso(138, -12)[1]} className="iso-line" />
        <line x1={iso(92, 2)[0]} y1={iso(92, 2)[1]} x2={iso(144, 2)[0]} y2={iso(144, 2)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(92, 16)[0]} y1={iso(92, 16)[1]} x2={iso(130, 16)[0]} y2={iso(130, 16)[1]} className="iso-line" />
        <line x1={iso(92, 30)[0]} y1={iso(92, 30)[1]} x2={iso(140, 30)[0]} y2={iso(140, 30)[1]} className="iso-line" strokeWidth="1.2" />
        {/* Column dividers */}
        <line x1={iso(116, -40)[0]} y1={iso(116, -40)[1]} x2={iso(116, 32)[0]} y2={iso(116, 32)[1]} className="iso-dash" strokeWidth="1" />
        {/* Database activity LED status beacons */}
        <circle cx={iso(92, -44)[0]} cy={iso(92, -44)[1]} r="2" className="iso-node" />
        <circle cx={iso(100, -44)[0]} cy={iso(100, -44)[1]} r="2" className="iso-node" />
        <circle cx={iso(108, -44)[0]} cy={iso(108, -44)[1]} r="2" className="iso-node" />
      </Part>

      {/* 8. Stripe External Payment Cloud & Checkout */}
      <Part d={0.88}>
        <Plate x={205} y={20} w={52} h={52} t={8} />
        {/* Card checkout visual / Credit card glyph */}
        <polygon points={pts([iso(212, 28), iso(250, 28), iso(250, 52), iso(212, 52)])} className="iso-face" />
        {/* Magnetic stripe */}
        <line x1={iso(212, 34)[0]} y1={iso(212, 34)[1]} x2={iso(250, 34)[0]} y2={iso(250, 34)[1]} className="iso-line" strokeWidth="2.2" />
        {/* EMV Chip */}
        <polygon points={pts([iso(218, 40), iso(226, 40), iso(226, 46), iso(218, 46)])} className="iso-face--strong" />
        {/* Cardholder dots */}
        <circle cx={iso(234, 46)[0]} cy={iso(234, 46)[1]} r="1.3" className="iso-node" />
        <circle cx={iso(240, 46)[0]} cy={iso(240, 46)[1]} r="1.3" className="iso-node" />
        {/* Payment confirmation wave */}
        <path d={`M ${iso(250, 35).join(' ')} Q ${iso(258, 46).join(' ')} ${iso(250, 57).join(' ')}`} className="iso-line" fill="none" strokeDasharray="2 2" />
      </Part>

      {/* Verified Webhook Ingress Loop back from Stripe into Webhook Gateway */}
      <Part d={0.94} line>
        <path
          d={`M ${iso(205, 46).join(' ')} Q ${iso(140, 100).join(' ')} ${iso(35, 62).join(' ')}`}
          className="iso-dash"
          fill="none"
          strokeWidth="1.4"
          markerEnd="url(#arrow-iso)"
        />
        <circle cx={iso(120, 80)[0]} cy={iso(120, 80)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(120, 80)[0]} cy={iso(120, 80)[1]} r="6" className="iso-radar" />
      </Part>

      {/* Precision blueprint boundary and corner ticks */}
      <Part d={1.0} line>
        <rect x={iso(-255, -95)[0]} y={iso(-255, -95)[1]} width="12" height="12" className="iso-frame" />
        <line x1={iso(-255, -95)[0]} y1={iso(-255, -95)[1]} x2={iso(-255, -95)[0] + 6} y2={iso(-255, -95)[1]} className="iso-frame-tick" />
        <line x1={iso(-255, -95)[0]} y1={iso(-255, -95)[1]} x2={iso(-255, -95)[0]} y2={iso(-255, -95)[1] + 6} className="iso-frame-tick" />
      </Part>
    </>
  ),
  events: (
    <>
      {/* 1. Spring Boot Event Producer */}
      <Part d={0}>
        <Plate x={-200} y={-45} w={46} h={48} t={6} strong />
        {/* Spring leaf / server symbol */}
        <polygon points={pts([iso(-194, -38), iso(-160, -38), iso(-160, -12), iso(-194, -12)])} className="iso-face" />
        <path d={`M ${iso(-185, -28).join(' ')} Q ${iso(-177, -35).join(' ')} ${iso(-170, -22).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.3" />
        <circle cx={iso(-177, -26)[0]} cy={iso(-177, -26)[1]} r="1.5" className="iso-node" />
        <line x1={iso(-190, -18)[0]} y1={iso(-190, -18)[1]} x2={iso(-164, -18)[0]} y2={iso(-164, -18)[1]} className="iso-line" strokeWidth="1.1" />
      </Part>

      {/* Trace from Producer into Kafka Topic */}
      <Part d={0.15} line>
        <line x1={iso(-154, -21)[0]} y1={iso(-154, -21)[1]} x2={iso(-115, -21)[0]} y2={iso(-115, -21)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 2. Partitioned Apache Kafka Topic (P0, P1, P2) */}
      <Part d={0.25}>
        <Plate x={-115} y={-68} w={85} h={96} t={8} strong />
        {/* 3 Partition Lanes */}
        <polygon points={pts([iso(-110, -60), iso(-35, -60), iso(-35, -35), iso(-110, -35)])} className="iso-face" />
        <line x1={iso(-105, -48)[0]} y1={iso(-105, -48)[1]} x2={iso(-40, -48)[0]} y2={iso(-40, -48)[1]} className="iso-line" strokeWidth="1.2" />
        {[-95, -80, -65, -50].map((x) => (
          <circle key={x} cx={iso(x, -48)[0]} cy={iso(x, -48)[1]} r="1.5" className="iso-node" />
        ))}

        <polygon points={pts([iso(-110, -28), iso(-35, -28), iso(-35, -3), iso(-110, -3)])} className="iso-face" />
        <line x1={iso(-105, -16)[0]} y1={iso(-105, -16)[1]} x2={iso(-40, -16)[0]} y2={iso(-40, -16)[1]} className="iso-line" strokeWidth="1.2" />
        {[-95, -80, -65, -50].map((x) => (
          <circle key={x} cx={iso(x, -16)[0]} cy={iso(x, -16)[1]} r="1.5" className="iso-node" />
        ))}

        <polygon points={pts([iso(-110, 4), iso(-35, 4), iso(-35, 22), iso(-110, 22)])} className="iso-face" />
        <line x1={iso(-105, 13)[0]} y1={iso(-105, 13)[1]} x2={iso(-40, 13)[0]} y2={iso(-40, 13)[1]} className="iso-line" strokeWidth="1.2" />
        {[-95, -80, -65, -50].map((x) => (
          <circle key={x} cx={iso(x, 13)[0]} cy={iso(x, 13)[1]} r="1.5" className="iso-node" />
        ))}
      </Part>

      {/* Fan-Out Traces from Kafka Partitions to Consumer Group */}
      <Part d={0.38} line>
        <line x1={iso(-30, -48)[0]} y1={iso(-30, -48)[1]} x2={iso(20, -70)[0]} y2={iso(20, -70)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-30, -16)[0]} y1={iso(-30, -16)[1]} x2={iso(20, -16)[0]} y2={iso(20, -16)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-30, 13)[0]} y1={iso(-30, 13)[1]} x2={iso(20, 38)[0]} y2={iso(20, 38)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 3. Idempotent Consumer Group Tier */}
      {/* Consumer 0: Order / Billing */}
      <Part d={0.48}>
        <Plate x={20} y={-85} w={50} h={32} t={6} />
        <line x1={iso(26, -72)[0]} y1={iso(26, -72)[1]} x2={iso(64, -72)[0]} y2={iso(64, -72)[1]} className="iso-line" strokeWidth="1.1" />
        <circle cx={iso(32, -72)[0]} cy={iso(32, -72)[1]} r="1.4" className="iso-node" />
      </Part>

      {/* Consumer 1: Notification Engine */}
      <Part d={0.54}>
        <Plate x={20} y={-32} w={50} h={32} t={6} />
        <line x1={iso(26, -18)[0]} y1={iso(26, -18)[1]} x2={iso(64, -18)[0]} y2={iso(64, -18)[1]} className="iso-line" strokeWidth="1.1" />
        <circle cx={iso(32, -18)[0]} cy={iso(32, -18)[1]} r="1.4" className="iso-node" />
      </Part>

      {/* Consumer 2: Analytics Sink */}
      <Part d={0.60}>
        <Plate x={20} y={22} w={50} h={32} t={6} />
        <line x1={iso(26, 36)[0]} y1={iso(26, 36)[1]} x2={iso(64, 36)[0]} y2={iso(64, 36)[1]} className="iso-line" strokeWidth="1.1" />
        <circle cx={iso(32, 36)[0]} cy={iso(32, 36)[1]} r="1.4" className="iso-node" />
      </Part>

      {/* Trace to Idempotency Store */}
      <Part d={0.66} line>
        <line x1={iso(70, -70)[0]} y1={iso(70, -70)[1]} x2={iso(100, -50)[0]} y2={iso(100, -50)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 4. Idempotency Key Vault (Deduplication) */}
      <Part d={0.72}>
        <Plate x={100} y={-60} w={42} h={48} t={8} strong />
        <circle cx={iso(121, -42)[0]} cy={iso(121, -42)[1]} r="2.8" className="iso-node" />
        <path d={`M ${iso(117, -39).join(' ')} L ${iso(121, -33).join(' ')} L ${iso(125, -39).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.2" />
        <line x1={iso(106, -24)[0]} y1={iso(106, -24)[1]} x2={iso(136, -24)[0]} y2={iso(136, -24)[1]} className="iso-line" strokeWidth="1.1" />
      </Part>

      {/* 5. Retry Topic with Exponential Backoff */}
      <Part d={0.80}>
        <Plate x={-65} y={48} w={62} h={40} t={6} />
        {/* Backoff Clock / Loop */}
        <circle cx={iso(-34, 68)[0]} cy={iso(-34, 68)[1]} r="4" className="iso-clock" />
        <line x1={iso(-34, 68)[0]} y1={iso(-34, 68)[1]} x2={iso(-34, 68)[0] + 3} y2={iso(-34, 68)[1] - 2} className="iso-line" strokeWidth="1.2" />
        {/* Curved Retry Route from Consumer */}
        <path
          d={`M ${iso(20, -10).join(' ')} Q ${iso(5, 55).join(' ')} ${iso(-3, 65).join(' ')}`}
          className="iso-dash"
          fill="none"
          strokeWidth="1.2"
          markerEnd="url(#arrow-iso)"
        />
      </Part>

      {/* 6. Dead-Letter Queue (DLQ Vault) */}
      <Part d={0.90}>
        <Plate x={25} y={75} w={58} h={40} t={6} className="iso-dlq" />
        {/* Poison Quarantine Warning Polygon */}
        <polygon points={pts([iso(42, 87), iso(66, 87), iso(54, 105)])} className="iso-face--strong" />
        <line x1={iso(54, 91)[0]} y1={iso(54, 91)[1]} x2={iso(54, 98)[0]} y2={iso(54, 98)[1]} className="iso-line" strokeWidth="1.3" />
        <circle cx={iso(54, 101)[0]} cy={iso(54, 101)[1]} r="1" className="iso-node" />
        {/* Route into DLQ from retry */}
        <line x1={iso(-3, 72)[0]} y1={iso(-3, 72)[1]} x2={iso(25, 85)[0]} y2={iso(25, 85)[1]} className="iso-dash" strokeWidth="1.2" markerEnd="url(#arrow-iso)" />
      </Part>
    </>
  ),
  cache: (
    <>
      {/* 1. Feed Query Router */}
      <Part d={0}>
        <Plate x={-170} y={-70} w={48} h={44} t={6} />
        {/* Router glyph */}
        <polygon points={pts([iso(-164, -62), iso(-128, -62), iso(-128, -34), iso(-164, -34)])} className="iso-face" />
        <circle cx={iso(-146, -48)[0]} cy={iso(-146, -48)[1]} r="2.5" className="iso-node" />
        <line x1={iso(-160, -48)[0]} y1={iso(-160, -48)[1]} x2={iso(-132, -48)[0]} y2={iso(-132, -48)[1]} className="iso-line" strokeWidth="1.2" />
      </Part>

      {/* Query routing trace into Redis Cache */}
      <Part d={0.15} line>
        <line x1={iso(-122, -48)[0]} y1={iso(-122, -48)[1]} x2={iso(-80, -25)[0]} y2={iso(-80, -25)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 2. Elevated Redis Cache-Aside RAM Slab */}
      <Part d={0.25}>
        <Plate x={-80} y={-50} w={155} h={55} z={42} t={8} strong />
        {/* Grid of Keyed Cache Cells */}
        {[0, 1, 2, 3].map((c) => (
          <polygon
            key={c}
            points={pts([
              iso(-70 + c * 35, -42, 42),
              iso(-40 + c * 35, -42, 42),
              iso(-40 + c * 35, -10, 42),
              iso(-70 + c * 35, -10, 42),
            ])}
            className={c === 1 ? 'iso-face--strong' : 'iso-face'}
          />
        ))}
        {/* Key-Value lines inside cells */}
        {[0, 1, 2, 3].map((c) => (
          <line
            key={`l-${c}`}
            x1={iso(-66 + c * 35, -26, 42)[0]}
            y1={iso(-66 + c * 35, -26, 42)[1]}
            x2={iso(-44 + c * 35, -26, 42)[0]}
            y2={iso(-44 + c * 35, -26, 42)[1]}
            className="iso-line"
            strokeWidth="1.1"
          />
        ))}
        {/* Lightning Cache Hit Emblem */}
        <path
          d={`M ${iso(-50, -32, 44).join(' ')} L ${iso(-56, -24, 44).join(' ')} L ${iso(-49, -24, 44).join(' ')} L ${iso(-54, -14, 44).join(' ')}`}
          className="iso-line"
          fill="none"
          strokeWidth="1.4"
        />
      </Part>

      {/* Vertical Stanchion Connectors between Redis and DB */}
      <Part d={0.35} line>
        <line x1={iso(-80, -50, 0)[0]} y1={iso(-80, -50, 0)[1]} x2={iso(-80, -50, 42)[0]} y2={iso(-80, -50, 42)[1]} className="iso-dash" strokeWidth="1.2" />
        <line x1={iso(75, -50, 0)[0]} y1={iso(75, -50, 0)[1]} x2={iso(75, -50, 42)[0]} y2={iso(75, -50, 42)[1]} className="iso-dash" strokeWidth="1.2" />
        <line x1={iso(75, 5, 0)[0]} y1={iso(75, 5, 0)[1]} x2={iso(75, 5, 42)[0]} y2={iso(75, 5, 42)[1]} className="iso-dash" strokeWidth="1.2" />
        <line x1={iso(-80, 5, 0)[0]} y1={iso(-80, 5, 0)[1]} x2={iso(-80, 5, 42)[0]} y2={iso(-80, 5, 42)[1]} className="iso-dash" strokeWidth="1.2" />
      </Part>

      {/* 3. Range-Partitioned Database Cluster (MySQL / Postgres) */}
      <Part d={0.45}>
        <Plate x={-105} y={15} w={205} h={80} t={16} />
        {/* Range Partition Partitions: p_q1, p_q2, p_q3 */}
        <polygon points={pts([iso(-98, 24), iso(-35, 24), iso(-35, 82), iso(-98, 82)])} className="iso-face" />
        <polygon points={pts([iso(-30, 24), iso(33, 24), iso(33, 82), iso(-30, 82)])} className="iso-face" />
        <polygon points={pts([iso(38, 24), iso(95, 24), iso(95, 82), iso(38, 82)])} className="iso-face" />
        {/* Table Schema Lines */}
        {[-85, -17, 51].map((x) => (
          <g key={x}>
            <line x1={iso(x - 10, 36)[0]} y1={iso(x - 10, 36)[1]} x2={iso(x + 22, 36)[0]} y2={iso(x + 22, 36)[1]} className="iso-line" strokeWidth="1.3" />
            <line x1={iso(x - 10, 48)[0]} y1={iso(x - 10, 48)[1]} x2={iso(x + 18, 48)[0]} y2={iso(x + 18, 48)[1]} className="iso-line" />
            <line x1={iso(x - 10, 60)[0]} y1={iso(x - 10, 60)[1]} x2={iso(x + 14, 60)[0]} y2={iso(x + 14, 60)[1]} className="iso-line" />
            <line x1={iso(x - 10, 72)[0]} y1={iso(x - 10, 72)[1]} x2={iso(x + 20, 72)[0]} y2={iso(x + 20, 72)[1]} className="iso-line" />
          </g>
        ))}
      </Part>

      {/* Cache Miss Drop & Backfill Paths */}
      <Part d={0.58} line>
        {/* Cache Miss fall-through */}
        <path
          d={`M ${iso(-5, -20, 42).join(' ')} L ${iso(-5, 24, 0).join(' ')}`}
          className="iso-trace-arrow"
          markerEnd="url(#arrow-iso)"
        />
        {/* Backfill upward arrow */}
        <path
          d={`M ${iso(35, 30, 0).join(' ')} L ${iso(35, -15, 42).join(' ')}`}
          className="iso-dash"
          strokeWidth="1.3"
          markerEnd="url(#arrow-iso)"
        />
      </Part>
    </>
  ),
  agents: (
    <>
      {/* 1. Durable Task Queue */}
      <Part d={0}>
        <Plate x={-205} y={-42} w={44} h={64} t={8} />
        {/* Queue slots */}
        <polygon points={pts([iso(-200, -34), iso(-166, -34), iso(-166, -14), iso(-200, -14)])} className="iso-face" />
        <polygon points={pts([iso(-200, -8), iso(-166, -8), iso(-166, 12), iso(-200, 12)])} className="iso-face" />
        <line x1={iso(-196, -24)[0]} y1={iso(-196, -24)[1]} x2={iso(-170, -24)[0]} y2={iso(-170, -24)[1]} className="iso-line" strokeWidth="1.1" />
        <line x1={iso(-196, 2)[0]} y1={iso(-196, 2)[1]} x2={iso(-170, 2)[0]} y2={iso(-170, 2)[1]} className="iso-line" strokeWidth="1.1" />
      </Part>

      {/* Trace to Planner */}
      <Part d={0.15} line>
        <line x1={iso(-161, -10)[0]} y1={iso(-161, -10)[1]} x2={iso(-125, -10)[0]} y2={iso(-125, -10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 2. Planner Agent (DAG Builder) */}
      <Part d={0.25}>
        <Plate x={-125} y={-45} w={56} h={70} t={10} strong />
        {/* DAG Graph Node Structure */}
        <circle cx={iso(-110, -28)[0]} cy={iso(-110, -28)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(-85, -35)[0]} cy={iso(-85, -35)[1]} r="2.2" className="iso-node" />
        <circle cx={iso(-85, -15)[0]} cy={iso(-85, -15)[1]} r="2.2" className="iso-node" />
        <line x1={iso(-110, -28)[0]} y1={iso(-110, -28)[1]} x2={iso(-85, -35)[0]} y2={iso(-85, -35)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-110, -28)[0]} y1={iso(-110, -28)[1]} x2={iso(-85, -15)[0]} y2={iso(-85, -15)[1]} className="iso-line" strokeWidth="1.2" />
        {/* Code / execution lines */}
        <line x1={iso(-118, 5)[0]} y1={iso(-118, 5)[1]} x2={iso(-75, 5)[0]} y2={iso(-75, 5)[1]} className="iso-line" strokeWidth="1.1" />
        <line x1={iso(-118, 14)[0]} y1={iso(-118, 14)[1]} x2={iso(-85, 14)[0]} y2={iso(-85, 14)[1]} className="iso-line" />
      </Part>

      {/* Traces from Planner to Tools and Critic */}
      <Part d={0.36} line>
        <line x1={iso(-69, -32)[0]} y1={iso(-69, -32)[1]} x2={iso(-40, -50)[0]} y2={iso(-40, -50)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-69, -10)[0]} y1={iso(-69, -10)[1]} x2={iso(20, -10)[0]} y2={iso(20, -10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 3. Tools & RAG Retrieval */}
      <Part d={0.44}>
        <Plate x={-40} y={-68} w={48} h={42} t={6} />
        {/* RAG Vector Reticle */}
        <circle cx={iso(-16, -47)[0]} cy={iso(-16, -47)[1]} r="4" className="iso-radar" />
        <circle cx={iso(-16, -47)[0]} cy={iso(-16, -47)[1]} r="1.5" className="iso-node" />
        <line x1={iso(-32, -34)[0]} y1={iso(-32, -34)[1]} x2={iso(0, -34)[0]} y2={iso(0, -34)[1]} className="iso-line" strokeWidth="1.1" />
      </Part>

      {/* 4. Critic & QA Evaluation Agent */}
      <Part d={0.52}>
        <Plate x={20} y={-45} w={56} h={70} t={10} strong />
        {/* Check & Scoring Matrix */}
        <polygon points={pts([iso(28, -35), iso(68, -35), iso(68, -8), iso(28, -8)])} className="iso-face" />
        <path d={`M ${iso(34, -22).join(' ')} L ${iso(40, -16).join(' ')} L ${iso(50, -28).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.4" />
        <line x1={iso(26, 4)[0]} y1={iso(26, 4)[1]} x2={iso(68, 4)[0]} y2={iso(68, 4)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(26, 14)[0]} y1={iso(26, 14)[1]} x2={iso(56, 14)[0]} y2={iso(56, 14)[1]} className="iso-line" />
      </Part>

      {/* Corrective Retry Feedback Loop (Critic -> Planner) */}
      <Part d={0.62} line>
        <path
          d={`M ${iso(48, 25).join(' ')} Q ${iso(-20, 65).join(' ')} ${iso(-95, 25).join(' ')}`}
          className="iso-dash"
          fill="none"
          strokeWidth="1.3"
          markerEnd="url(#arrow-iso)"
        />
        <circle cx={iso(-20, 48)[0]} cy={iso(-20, 48)[1]} r="2" className="iso-node" />
      </Part>

      {/* Trace from Critic to Human Review Gate */}
      <Part d={0.72} line>
        <line x1={iso(76, -10)[0]} y1={iso(76, -10)[1]} x2={iso(115, -10)[0]} y2={iso(115, -10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 5. Human-in-the-Loop Review Gate */}
      <Part d={0.80}>
        <Plate x={115} y={-40} w={48} h={60} t={8} strong />
        {/* Shield / Gate Button */}
        <polygon points={pts([iso(122, -30), iso(156, -30), iso(156, -6), iso(122, -6)])} className="iso-face--strong" />
        <circle cx={iso(139, -18)[0]} cy={iso(139, -18)[1]} r="3" className="iso-node" />
        <path d={`M ${iso(130, 8).join(' ')} L ${iso(136, 14).join(' ')} L ${iso(148, 2).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.4" />
      </Part>
    </>
  ),
  media: (
    <>
      {/* 1. S3 Direct-to-Storage Presigned Upload */}
      <Part d={0}>
        <Plate x={-240} y={-40} w={50} h={68} t={8} />
        {/* Cloud / Storage Bucket glyph */}
        <polygon points={pts([iso(-234, -30), iso(-196, -30), iso(-196, 0), iso(-234, 0)])} className="iso-face" />
        <path d={`M ${iso(-215, -22).join(' ')} L ${iso(-215, -6).join(' ')}`} className="iso-line" strokeWidth="1.4" />
        <path d={`M ${iso(-221, -12).join(' ')} L ${iso(-215, -6).join(' ')} L ${iso(-209, -12).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.4" />
        {/* Upload progress meter */}
        <line x1={iso(-230, 14)[0]} y1={iso(-230, 14)[1]} x2={iso(-200, 14)[0]} y2={iso(-200, 14)[1]} className="iso-line" strokeWidth="1.5" />
      </Part>

      {/* Trace to Decoupled Queue */}
      <Part d={0.15} line>
        <line x1={iso(-190, -6)[0]} y1={iso(-190, -6)[1]} x2={iso(-155, -6)[0]} y2={iso(-155, -6)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 2. Decoupled Job Queue (BullMQ / SQS) */}
      <Part d={0.25}>
        <Plate x={-155} y={-36} w={42} h={60} t={6} />
        {/* Queue lanes */}
        <line x1={iso(-150, -22)[0]} y1={iso(-150, -22)[1]} x2={iso(-118, -22)[0]} y2={iso(-118, -22)[1]} className="iso-line" strokeWidth="1.1" />
        <line x1={iso(-150, -6)[0]} y1={iso(-150, -6)[1]} x2={iso(-118, -6)[0]} y2={iso(-118, -6)[1]} className="iso-line" strokeWidth="1.1" />
        <line x1={iso(-150, 10)[0]} y1={iso(-150, 10)[1]} x2={iso(-118, 10)[0]} y2={iso(-118, 10)[1]} className="iso-line" strokeWidth="1.1" />
      </Part>

      {/* Fan-Out Traces to 3 Transcode Workers */}
      <Part d={0.35} line>
        <line x1={iso(-113, -22)[0]} y1={iso(-113, -22)[1]} x2={iso(-75, -55)[0]} y2={iso(-75, -55)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-113, -6)[0]} y1={iso(-113, -6)[1]} x2={iso(-75, -6)[0]} y2={iso(-75, -6)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-113, 10)[0]} y1={iso(-113, 10)[1]} x2={iso(-75, 42)[0]} y2={iso(-75, 42)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 3. Parallel Worker Fleet */}
      {/* Worker 1: FFmpeg 1080p H.264 Transcoder */}
      <Part d={0.45}>
        <Plate x={-75} y={-75} w={56} h={40} t={6} strong />
        {/* Filmstrip perforations */}
        <line x1={iso(-70, -66)[0]} y1={iso(-70, -66)[1]} x2={iso(-24, -66)[0]} y2={iso(-24, -66)[1]} className="iso-line" strokeWidth="1.2" />
        {[-65, -53, -41, -29].map((x) => (
          <line key={x} x1={iso(x, -66)[0]} y1={iso(x, -66)[1]} x2={iso(x, -66)[0]} y2={iso(x, -66)[1] + 3} className="iso-line" />
        ))}
        <polygon points={pts([iso(-54, -58), iso(-40, -52), iso(-54, -46)])} className="iso-line" strokeWidth="1.1" />
      </Part>

      {/* Worker 2: ImageMagick Thumbnails & WebP */}
      <Part d={0.52}>
        <Plate x={-75} y={-22} w={56} h={40} t={6} />
        {/* Image Grid */}
        <polygon points={pts([iso(-68, -14), iso(-48, -14), iso(-48, 6), iso(-68, 6)])} className="iso-face" />
        <circle cx={iso(-58, -4)[0]} cy={iso(-58, -4)[1]} r="2" className="iso-node" />
        <line x1={iso(-42, -10)[0]} y1={iso(-42, -10)[1]} x2={iso(-24, -10)[0]} y2={iso(-24, -10)[1]} className="iso-line" strokeWidth="1.1" />
        <line x1={iso(-42, 0)[0]} y1={iso(-42, 0)[1]} x2={iso(-28, 0)[0]} y2={iso(-28, 0)[1]} className="iso-line" />
      </Part>

      {/* Worker 3: Remotion Code-Rendered React Video */}
      <Part d={0.58}>
        <Plate x={-75} y={30} w={56} h={40} t={6} />
        {/* Code React TSX lines */}
        <line x1={iso(-68, 40)[0]} y1={iso(-68, 40)[1]} x2={iso(-28, 40)[0]} y2={iso(-28, 40)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-64, 48)[0]} y1={iso(-64, 48)[1]} x2={iso(-34, 48)[0]} y2={iso(-34, 48)[1]} className="iso-line" />
        <line x1={iso(-64, 56)[0]} y1={iso(-64, 56)[1]} x2={iso(-24, 56)[0]} y2={iso(-24, 56)[1]} className="iso-line" strokeWidth="1.2" />
      </Part>

      {/* Traces from 3 Workers to HLS Muxer */}
      <Part d={0.65} line>
        <line x1={iso(-19, -55)[0]} y1={iso(-19, -55)[1]} x2={iso(25, -20)[0]} y2={iso(25, -20)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-19, -6)[0]} y1={iso(-19, -6)[1]} x2={iso(25, -6)[0]} y2={iso(25, -6)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
        <line x1={iso(-19, 45)[0]} y1={iso(-19, 45)[1]} x2={iso(25, 12)[0]} y2={iso(25, 12)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 4. Adaptive Bitrate HLS Packager (.m3u8) */}
      <Part d={0.72}>
        <Plate x={25} y={-35} w={56} h={64} t={10} strong />
        {/* Stream resolutions ladder: 1080p, 720p, 480p */}
        <line x1={iso(32, -24)[0]} y1={iso(32, -24)[1]} x2={iso(74, -24)[0]} y2={iso(74, -24)[1]} className="iso-line" strokeWidth="1.4" />
        <line x1={iso(32, -10)[0]} y1={iso(32, -10)[1]} x2={iso(68, -10)[0]} y2={iso(68, -10)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(32, 4)[0]} y1={iso(32, 4)[1]} x2={iso(60, 4)[0]} y2={iso(60, 4)[1]} className="iso-line" />
        {/* Playlist index pill */}
        <polygon points={pts([iso(32, 14), iso(72, 14), iso(72, 22), iso(32, 22)])} className="iso-face" />
      </Part>

      {/* Trace to CDN Edge */}
      <Part d={0.80} line>
        <line x1={iso(81, -4)[0]} y1={iso(81, -4)[1]} x2={iso(130, -4)[0]} y2={iso(130, -4)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 5. Global Edge CDN & Cache Distribution */}
      <Part d={0.88}>
        <Plate x={130} y={-45} w={65} h={80} t={14} strong />
        {/* CDN Edge Server Shelves */}
        <polygon points={pts([iso(138, -35), iso(186, -35), iso(186, -15), iso(138, -15)])} className="iso-face" />
        <polygon points={pts([iso(138, -5), iso(186, -5), iso(186, 15), iso(138, 15)])} className="iso-face" />
        {/* Status LEDs */}
        <circle cx={iso(145, -25)[0]} cy={iso(145, -25)[1]} r="1.6" className="iso-node" />
        <circle cx={iso(155, -25)[0]} cy={iso(155, -25)[1]} r="1.6" className="iso-node" />
        <circle cx={iso(145, 5)[0]} cy={iso(145, 5)[1]} r="1.6" className="iso-node" />
        <circle cx={iso(155, 5)[0]} cy={iso(155, 5)[1]} r="1.6" className="iso-node" />
        {/* Edge Broadcast Waves */}
        <path d={`M ${iso(186, -20).join(' ')} Q ${iso(196, -2).join(' ')} ${iso(186, 16).join(' ')}`} className="iso-line" fill="none" strokeDasharray="2 2" />
      </Part>
    </>
  ),
  cluster: (
    <>
      {/* 1. GitHub Actions CI/CD Pipeline */}
      <Part d={0}>
        <Plate x={-245} y={-45} w={50} h={68} t={8} />
        {/* CI Build Icon */}
        <polygon points={pts([iso(-238, -35), iso(-202, -35), iso(-202, -10), iso(-238, -10)])} className="iso-face" />
        <path d={`M ${iso(-228, -25).join(' ')} L ${iso(-222, -19).join(' ')} L ${iso(-212, -29).join(' ')}`} className="iso-line" fill="none" strokeWidth="1.4" />
        <line x1={iso(-234, 4)[0]} y1={iso(-234, 4)[1]} x2={iso(-206, 4)[0]} y2={iso(-206, 4)[1]} className="iso-line" strokeWidth="1.2" />
        <line x1={iso(-234, 14)[0]} y1={iso(-234, 14)[1]} x2={iso(-212, 14)[0]} y2={iso(-212, 14)[1]} className="iso-line" />
      </Part>

      {/* Trace from CI to Load Test Engine */}
      <Part d={0.15} line>
        <line x1={iso(-195, -10)[0]} y1={iso(-195, -10)[1]} x2={iso(-155, -10)[0]} y2={iso(-155, -10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 2. Distributed Load Test Engine (10k Concurrency Storm) */}
      <Part d={0.25}>
        <Plate x={-155} y={-45} w={50} h={75} t={8} />
        {/* High-frequency load waves */}
        <path
          d={`M ${iso(-148, -30).join(' ')} Q ${iso(-130, -38).join(' ')} ${iso(-115, -30).join(' ')}`}
          className="iso-line"
          fill="none"
          strokeWidth="1.3"
        />
        <path
          d={`M ${iso(-148, -15).join(' ')} Q ${iso(-130, -23).join(' ')} ${iso(-115, -15).join(' ')}`}
          className="iso-line"
          fill="none"
          strokeWidth="1.3"
        />
        <path
          d={`M ${iso(-148, 0).join(' ')} Q ${iso(-130, -8).join(' ')} ${iso(-115, 0).join(' ')}`}
          className="iso-line"
          fill="none"
          strokeWidth="1.3"
        />
        <line x1={iso(-148, 18)[0]} y1={iso(-148, 18)[1]} x2={iso(-115, 18)[0]} y2={iso(-115, 18)[1]} className="iso-line" strokeWidth="1.2" />
      </Part>

      {/* Trace to K8s Ingress */}
      <Part d={0.35} line>
        <line x1={iso(-105, -10)[0]} y1={iso(-105, -10)[1]} x2={iso(-65, -10)[0]} y2={iso(-65, -10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 3. Kubernetes Ingress & Envoy Service Mesh */}
      <Part d={0.42}>
        <Plate x={-65} y={-65} w={32} h={115} t={10} strong />
        {/* Ingress Gateway Ports */}
        <circle cx={iso(-49, -45)[0]} cy={iso(-49, -45)[1]} r="2" className="iso-node" />
        <circle cx={iso(-49, -10)[0]} cy={iso(-49, -10)[1]} r="2" className="iso-node" />
        <circle cx={iso(-49, 25)[0]} cy={iso(-49, 25)[1]} r="2" className="iso-node" />
        <line x1={iso(-60, -28)[0]} y1={iso(-60, -28)[1]} x2={iso(-38, -28)[0]} y2={iso(-38, -28)[1]} className="iso-dash" strokeWidth="1" />
        <line x1={iso(-60, 8)[0]} y1={iso(-60, 8)[1]} x2={iso(-38, 8)[0]} y2={iso(-38, 8)[1]} className="iso-dash" strokeWidth="1" />
      </Part>

      {/* 4. Pod Replica Fleet Grid (8 Containers with HPA scaling) */}
      <Part d={0.52}>
        <Plate x={-18} y={-75} w={125} h={130} t={6} nodes={false} className="iso-dlq" />
        {/* 2x4 Container Pod Grid */}
        {[-8, 48].map((x, col) =>
          [-60, -25, 10, 45].map((y, row) => {
            const isScaling = col === 1 && row >= 2
            return (
              <g key={`${col}-${row}`} className={isScaling ? 'iso-blink' : undefined} style={{ '--i': row * 0.2 }}>
                <Plate x={x} y={y} w={38} h={26} z={0} t={12} strong={isScaling} />
                <circle cx={iso(x + 19, y + 13)[0]} cy={iso(x + 19, y + 13)[1]} r="1.3" className="iso-node" />
              </g>
            )
          })
        )}
      </Part>

      {/* Trace from Cluster to Observability Engine */}
      <Part d={0.68} line>
        <line x1={iso(107, -10)[0]} y1={iso(107, -10)[1]} x2={iso(145, -10)[0]} y2={iso(145, -10)[1]} className="iso-trace-arrow" markerEnd="url(#arrow-iso)" />
      </Part>

      {/* 5. Observability & Telemetry Engine (p99 < 120ms) */}
      <Part d={0.78}>
        <Plate x={145} y={-45} w={60} h={75} t={12} strong />
        {/* Latency Histogram Bar Graph */}
        {[152, 164, 176, 188].map((x, i) => {
          const heights = [14, 26, 38, 18]
          const h = heights[i]
          return (
            <polygon
              key={x}
              points={pts([
                iso(x, -5 - h),
                iso(x + 8, -5 - h),
                iso(x + 8, -5),
                iso(x, -5),
              ])}
              className={i === 2 ? 'iso-face--strong' : 'iso-face'}
            />
          )
        })}
        {/* p99 benchmark line */}
        <line x1={iso(149, -28)[0]} y1={iso(149, -28)[1]} x2={iso(199, -28)[0]} y2={iso(199, -28)[1]} className="iso-dash" strokeWidth="1.2" />
        {/* Telemetry pulse node */}
        <circle cx={iso(175, 15)[0]} cy={iso(175, 15)[1]} r="2" className="iso-node" />
        <circle cx={iso(175, 15)[0]} cy={iso(175, 15)[1]} r="5" className="iso-radar" />
      </Part>
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
    [-245, -100, 0, 'iOS Client', false, false, 0.2, 18],
    [-265, -30, 0, 'Android Client', false, false, 0.35, 18],
    [-245, 92, -10, 'Desktop Web', false, true, 0.5, 18],
    [-175, 40, 24, 'WebRTC Voice (P2P)', false, true, 0.7, 20],
    [-145, -80, 0, 'WebSocket Gateway', false, false, 0.9, 18],
    [-40, -90, 0, 'Room & Turn Arbiter', false, false, 1.1, 18],
    [-40, 85, -12, '50-Card Trump Deck', false, true, 1.3, 18],
    [35, -45, 0, 'Round Resolver', false, false, 1.5, 18],
    [137, 50, -16, 'Solo AI Opponent', true, true, 1.7, 22],
  ],
  dealer: [
    [-245, -100, 0, 'Dealer Portal', false, false, 0.2, 18],
    [-215, 60, -8, 'Buyer Storefront', false, true, 0.4, 16],
    [-160, -85, 0, 'RBAC Middleware', false, false, 0.6, 20],
    [-160, 68, -12, 'Role Separation', false, true, 0.8, 18],
    [-75, -112, 0, 'Docker Compose', false, false, 1.0, 18],
    [-20, -85, 0, 'Stock Lock & Concurrency', false, false, 1.2, 18],
    [-20, 10, -8, '15-min TTL Hold', false, true, 1.4, 18],
    [-20, 95, -12, 'Stripe Idempotency', false, true, 1.6, 20],
    [120, -60, 0, 'PostgreSQL (ACID)', true, false, 1.8, 22],
    [210, 52, -8, 'Stripe Checkout', false, true, 2.0, 16],
  ],
  events: [
    [-205, -90, 0, 'Event Producer', false, false, 0.2, 18],
    [-110, -125, 0, 'Kafka Topic (Partitions)', false, false, 0.4, 20],
    [35, -140, 0, 'Consumer Group', false, false, 0.6, 18],
    [115, -95, 0, 'Idempotency Key', true, false, 0.8, 18],
    [-45, 110, -10, 'Retry Topic (Backoff)', false, true, 1.0, 18],
    [55, 135, -10, 'Dead-Letter Queue', false, true, 1.2, 18],
  ],
  cache: [
    [-160, -115, 0, 'Feed Query Router', false, false, 0.2, 18],
    [-25, -115, 42, 'Redis Cache-Aside', false, false, 0.4, 20],
    [75, -80, 42, '80ms Hit Rate', true, false, 0.6, 18],
    [-70, 130, -10, 'Range Partitions', false, true, 0.8, 18],
    [35, 130, -10, 'MySQL Clustered Storage', false, true, 1.0, 18],
  ],
  agents: [
    [-195, -90, 0, 'Durable Queue', false, false, 0.2, 18],
    [-105, -105, 0, 'Planner Agent', false, false, 0.4, 20],
    [-25, -115, 0, 'RAG & Context', false, false, 0.6, 20],
    [55, -110, 0, 'Critic & QA Evaluator', false, false, 0.8, 18],
    [-15, 110, -10, 'Critique Retry Loop', false, true, 1.0, 18],
    [125, 75, -10, 'Human Review Gate', true, true, 1.2, 18],
  ],
  media: [
    [-230, -90, 0, 'S3 Presigned Upload', false, false, 0.2, 18],
    [-150, -105, 0, 'Off-Path Queue', false, false, 0.4, 20],
    [-65, -125, 0, 'FFmpeg Transcoder', false, false, 0.6, 20],
    [-45, 110, -10, 'ImageMagick & Remotion', false, true, 0.8, 18],
    [25, -125, 0, 'Adaptive HLS Packager', false, false, 1.0, 20],
    [165, 85, -10, 'Global Edge CDN', true, true, 1.2, 18],
  ],
  cluster: [
    [-230, -90, 0, 'GitHub Actions CI/CD', false, false, 0.2, 18],
    [-150, -105, 0, 'Load Test Storm (10k)', false, false, 0.4, 20],
    [-65, -120, 0, 'K8s Ingress & Envoy', false, false, 0.6, 20],
    [15, -135, 0, 'Pod Replica Fleet', false, false, 0.8, 20],
    [45, 125, -10, 'Horizontal Autoscaling', false, true, 1.0, 18],
    [175, 80, -10, 'p99 < 120ms Latency', true, true, 1.2, 18],
  ],
}

// tightly aligned block callouts for the enlarged lightbox modal
const enlargedLabels = {
  events: [
    [-177, -45, 0, 'Event Producer', false, false, 0.2, 20],
    [-72, -95, 0, 'Kafka Topic (Partitions)', false, false, 0.4, 22],
    [70, -90, 0, 'Consumer Group', false, false, 0.6, 22],
    [121, -60, 0, 'Idempotency Key', true, false, 0.8, 20],
    [-48, 107, 0, 'Retry Topic (Backoff)', false, true, 1.0, 20],
    [54, 115, 0, 'Dead-Letter Queue', false, true, 1.2, 20],
  ],
  cache: [
    [-146, -70, 0, 'Feed Query Router', false, false, 0.2, 20],
    [-25, -50, 42, 'Redis Cache-Aside', false, false, 0.4, 22],
    [45, -50, 42, '80ms Hit Rate', true, false, 0.6, 20],
    [-66, 95, 0, 'Range Partitions', false, true, 0.8, 20],
    [66, 95, 0, 'MySQL Clustered Storage', false, true, 1.0, 20],
  ],
  agents: [
    [-183, -42, 0, 'Durable Queue', false, false, 0.2, 20],
    [-97, -45, 0, 'Planner Agent', false, false, 0.4, 22],
    [-16, -68, 0, 'RAG & Context', false, false, 0.6, 20],
    [48, -45, 0, 'Critic & QA Evaluator', false, false, 0.8, 22],
    [-20, 65, 0, 'Critique Retry Loop', false, true, 1.0, 20],
    [139, -40, 0, 'Human Review Gate', true, false, 1.2, 20],
  ],
  media: [
    [-215, -40, 0, 'S3 Presigned Upload', false, false, 0.2, 20],
    [-134, -36, 0, 'Off-Path Queue', false, false, 0.4, 20],
    [-47, -75, 0, 'FFmpeg Transcoder', false, false, 0.6, 22],
    [-47, 70, 0, 'ImageMagick & Remotion', false, true, 0.8, 20],
    [53, -35, 0, 'Adaptive HLS Packager', false, false, 1.0, 20],
    [155, 60, 0, 'Global Edge CDN', true, true, 1.2, 20],
  ],
  cluster: [
    [-220, -45, 0, 'GitHub Actions CI/CD', false, false, 0.2, 20],
    [-130, -45, 0, 'Load Test Storm (10k)', false, false, 0.4, 20],
    [-49, -65, 0, 'K8s Ingress & Envoy', false, false, 0.6, 22],
    [45, -75, 0, 'Pod Replica Fleet', false, false, 0.8, 22],
    [45, 60, 0, 'Horizontal Autoscaling', false, true, 1.0, 20],
    [175, 50, 0, 'p99 < 120ms Latency', true, true, 1.2, 20],
  ],
}

export default function Isometric({ kind, label, variant = 'iso', fig, title, showLabels = true, enlarged = false }) {
  const ref = useRef(null)
  const art = useRef(null)
  const stage = useRef(null)
  const timers = useRef([])
  // architecture drawings crop to their own bounds so they fill the frame
  const [view, setView] = useState([0, 0, 400, 240])
  // idle, running, paused or done; only figures with a flow have a run
  const [run, setRun] = useState('idle')
  const flow = variant === 'manual' ? flows[kind] : null
  const currentLabels = showLabels ? (enlarged && enlargedLabels[kind] ? enlargedLabels[kind] : labels[kind]) : null

  useEffect(() => {
    if (!art.current) return
    const b = art.current.getBBox()
    const padX = enlarged ? 52 : showLabels ? 35 : 22
    const padTop = enlarged ? 68 : showLabels ? 48 : 24
    const padBottom = enlarged ? 68 : showLabels ? 50 : 26
    setView([b.x - padX, b.y - padTop, b.width + padX * 2, b.height + padTop + padBottom])
  }, [kind, enlarged, showLabels])

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
    el.classList.add('is-live')

    if (!flow || still) return

    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight + 200 && rect.bottom > -200
    if (inView) {
      play()
      return
    }

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      play()
    }, { threshold: 0.05, rootMargin: '200px 0px' })
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
  const body = !currentLabels ? (
    <div className="arch" style={{ aspectRatio: `${view[2]} / ${view[3]}` }}>
      {svg}
    </div>
  ) : (
    <div className="arch" style={{ aspectRatio: `${view[2]} / ${view[3]}` }}>
      {svg}
      <ul className="arch__labels" aria-hidden="true">
        {currentLabels.map(([x, y, z, text, you, below, d, len]) => {
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
