import Image from 'next/image'
import { FiPlus } from 'react-icons/fi'

const motif = {
  stages: [
    { name: 'Planning', by: 'Claude Opus', out: 'Storyboard JSON', mono: true },
    { name: 'Asset gathering', by: 'DALL-E 3 and ElevenLabs, over MCP', out: 'Images and narration' },
    { name: 'Motion direction', by: 'Storyboard contract', out: 'Motion per scene' },
    { name: 'TSX codegen', by: 'Claude Sonnet', out: 'Remotion TSX', mono: true },
    { name: 'Render', by: 'Remotion and FFmpeg', out: 'MP4', mono: true },
  ],
  bullets: [
    ['Agent platform with guardrails', 'runs as a structured multi-agent chain (planning, asset gathering, motion direction, TSX codegen, render), with authorization boundaries, per-job audit trails, and cost-gated degradation.'],
    ['Durable orchestration', 'Redis + BullMQ functions as a lightweight durable workflow engine: each job carries full state, survives process restarts, and retries idempotently with per-step status tracking.'],
    ['Strict inter-agent contract', 'Storyboard JSON (Zod-validated) is the rigid schema binding all agents, enforcing system-wide consistency and making schema drift structurally impossible.'],
    ['MCP & multi-provider LLM strategy', 'Claude Opus drives story planning; Claude Sonnet handles critique and codegen; DALL-E 3 and ElevenLabs are called via MCP-style tool interfaces.'],
  ],
  caseTitle: 'Case Study: Durable Queue State Engines',
  caseText:
    'Integrating dynamic image, audio, and code-generation models into an end-to-end rendering pipeline is prone to transient service failures and high LLM token costs. By leveraging Redis and BullMQ, we created a lightweight stateful workflow engine. If a rendering step fails, the queue maintains the job state and retries the specific step idempotently, saving compute and API costs.',
  tech: 'Remotion, Redis, BullMQ, SQLite/Prisma, Claude API, OpenAI API, ElevenLabs, FFmpeg, MCP',
}

const echo = {
  trail: [
    ['Collect', 'GitHub commits, Notion notes, browser history and local file changes, merged into one daily log'],
    ['Synthesize', 'Claude condenses the day into highlights and drops routine noise'],
    ['Draft and critique', 'A LangGraph loop drafts, critiques itself and revises'],
    ['Review', 'A Telegram bot sends the draft to you to edit or approve', true],
    ['Publish', 'A scheduler posts it once approved'],
  ],
  bullets: [
    ['Multi-source activity aggregation', 'pulls GitHub commits, Notion notes, browser history, and local file-system changes into a unified daily activity log.'],
    ['LLM-driven synthesis', 'Claude condenses a day’s raw, heterogeneous activity into structured highlights, filtering post-worthy work from routine noise.'],
    ['Agentic drafting pipeline', 'LangGraph orchestrates a stateful multi-step graph (synthesis, drafting, self-critique and revision) to produce polished post drafts.'],
    ['Human-in-the-loop publishing', 'A Telegram bot delivers drafts for review, edit, and approval, with a scheduler handling timed publishing once approved.'],
  ],
  caseTitle: 'Case Study: LangGraph Stateful Orchestration',
  caseText:
    'Transforming raw daily activity logs into engaging narratives requires multiple loops of refinement (synthesis, drafting, reflection, and critique). Instead of using a single-shot LLM prompt, we model the workflow as a stateful graph in LangGraph. This allows nodes to reflect on their own outputs and iterate until they meet quality criteria.',
  tech: 'Python, TypeScript, React, Remotion, Node.js, SQLite, Claude API, ElevenLabs, Manim, FFmpeg',
}

const saamcars = {
  bullets: [
    ['Authorization primitives', 'middleware-level RBAC separates dealer and buyer capabilities at the API layer, making unauthorized access structurally hard.'],
    ['Concurrency-safe reservations', 'reservation logic enforces stock validation and timeout handling to prevent double-bookings when two buyers attempt to reserve the same vehicle.'],
    ['Payment integrity', 'Stripe webhooks use signature verification and idempotent event handling to atomically synchronize payment events with booking state.'],
    ['Containerized environment', 'Docker Compose packages the API and PostgreSQL together for consistent local development and deployment parity.'],
  ],
  tech: 'Node.js, TypeScript, PostgreSQL, Stripe, Docker',
}

const Bullets = ({ items }) => (
  <ul className="bullets">
    {items.map(([lead, rest]) => (
      <li key={lead}><strong>{lead}:</strong> {rest}</li>
    ))}
  </ul>
)

const More = ({ label, children }) => (
  <details className="more">
    <summary>
      {label}
      <FiPlus aria-hidden="true" />
    </summary>
    <div className="more__body">{children}</div>
  </details>
)

const Impact = () => {
  return (
    <>
      {/* Agent Motif: the signature, the job drawn as the system it is */}
      <section id="projects" className="section section--tight-top section--run" aria-labelledby="motif-title">
        <div className="container">
          <div className="head">
            <h2 id="motif-title">Agent Motif</h2>
            <p className="lead">
              A local-first AI platform that turns a plain-English prompt into a fully rendered MP4, with no timeline editor.
            </p>
          </div>

          <figure className="job-figure" aria-label="Agent Motif pipeline: five agents on one Redis and BullMQ queue">
            <ol className="panels job">
              {motif.stages.map((s) => (
                <li key={s.name}>
                  <span className="job__name">{s.name}</span>
                  <span className="job__by">{s.by}</span>
                  <span />
                  <span className={s.mono ? 'job__out measured' : 'job__out'}>{s.out}</span>
                </li>
              ))}
              <li className="job__spine">
                <b className="cool">Redis + BullMQ</b>
                <p>Every job carries its full state, survives a process restart and retries only the step that failed.</p>
              </li>
            </ol>
          </figure>

          <div className="case">
            <div className="case__text">
              <p>
                A multi-agent pipeline handles story planning, asset generation, motion synthesis, and final rendering end-to-end. Storyboard JSON, validated with Zod, is the one contract every agent reads and writes.
              </p>
              <ul className="linkrow">
                <li><a className="link" href="https://github.com/Vamsi-027/agent-motif" target="_blank" rel="noreferrer">View source on GitHub</a></li>
              </ul>
            </div>
            <div className="case__aside">
              <dl className="facts">
                <div><dt>Stack</dt><dd>{motif.tech}</dd></div>
              </dl>
              <More label="Key deliverables">
                <Bullets items={motif.bullets} />
              </More>
              <More label={motif.caseTitle}>
                <p className="muted">{motif.caseText}</p>
              </More>
            </div>
          </div>
        </div>
      </section>

      {/* Back2Cards: the live game, captured */}
      <section className="section section--run" aria-labelledby="b2c-title">
        <div className="container split">
          <div className="split__head">
            <h2 id="b2c-title">Back2Cards</h2>
            <p className="lead">The 90s tabletop cricket trump cards, playable in a browser. Pick a card, call a stat, take the deck.</p>
          </div>
          <figure className="split__visual">
            <div className="shot shot--wide" data-slot="back2cards" data-kind="product" data-alt="Back2Cards home screen with the hand of cricket cards fanned out">
              <Image
                src="/work/back2cards/screen-home-desktop.png"
                alt="Back2Cards home screen: a fanned hand of illustrated cricket cards under the line The trump cards you grew up playing"
                fill
                sizes="(min-width: 60rem) 56vw, 100vw"
              />
            </div>
            <figcaption className="caption">The home screen at back2cards.fun, a hand of 50 cards.</figcaption>
          </figure>
          <div className="split__facts">
            <dl className="facts">
              <div><dt>Modes</dt><dd>Solo against an AI captain, or a live two-player duel with voice</dd></div>
              <div><dt>Networking</dt><dd>PeerJS over WebRTC, with a BroadcastChannel fallback for testing across local tabs</dd></div>
              <div><dt>Sound</dt><dd>Synthesized with the Web Audio API, no audio files</dd></div>
              <div><dt>Stack</dt><dd>TanStack Start, TypeScript, Tailwind CSS v4, Vite</dd></div>
            </dl>
            <ul className="linkrow">
              <li><a className="link" href="https://www.back2cards.fun/" target="_blank" rel="noreferrer">Play it at back2cards.fun</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Agent Echo and SaamCars: two panels cut from one surface */}
      <section className="section section--run" aria-label="Agent Echo and SaamCars">
        <div className="container">
          <div className="panels pair">
            <article aria-labelledby="echo-title">
              <h2 id="echo-title">Agent Echo</h2>
              <p className="lead">An autonomous, local-first agent that turns a developer’s actual daily work into ready-to-review LinkedIn content.</p>
              <ol className="trail" aria-label="Agent Echo pipeline">
                {echo.trail.map(([step, line, person]) => (
                  <li key={step} className={person ? 'is-person' : undefined}>
                    <b className={person ? 'person' : undefined}>{step}</b>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
              <dl className="facts">
                <div><dt>Stack</dt><dd>{echo.tech}</dd></div>
              </dl>
              <div>
                <More label="Key deliverables">
                  <Bullets items={echo.bullets} />
                </More>
                <More label={echo.caseTitle}>
                  <p className="muted">{echo.caseText}</p>
                </More>
              </div>
              <ul className="linkrow">
                <li><a className="link" href="https://github.com/Vamsi-027/Agent-Echo" target="_blank" rel="noreferrer">View source on GitHub</a></li>
              </ul>
            </article>

            <article aria-labelledby="saam-title">
              <h2 id="saam-title">SaamCars</h2>
              <p className="lead">A vehicle dealership backend where dealers manage inventory and buyers book vehicles, with strict concurrency control and real-money payments via Stripe.</p>
              <figure className="shot-figure">
                <div className="shot shot--card" data-slot="saamcars" data-kind="product" data-alt="SaamCars home screen">
                  <Image
                    src="/work/saamcars/screen-home-desktop.png"
                    alt="SaamCars home screen: a sports car under the line Find Your Perfect Car, with Browse Inventory and Contact Us"
                    fill
                    sizes="(min-width: 60rem) 34vw, 100vw"
                  />
                </div>
                <figcaption className="caption">Full-stack development, live at saamcars.com.</figcaption>
              </figure>
              <dl className="facts">
                <div><dt>Stack</dt><dd>{saamcars.tech}</dd></div>
              </dl>
              <More label="Key deliverables">
                <Bullets items={saamcars.bullets} />
              </More>
              <ul className="linkrow">
                <li><a className="link" href="https://www.saamcars.com/" target="_blank" rel="noreferrer">Live site</a></li>
                <li><a className="link" href="https://github.com/vamsi-rebounz/SamCars-BE" target="_blank" rel="noreferrer">View source</a></li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

export default Impact
