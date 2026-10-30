import Image from 'next/image'
import { FiPlus, FiGithub, FiPlay, FiGlobe } from 'react-icons/fi'
import Isometric from './Isometric'
import ArchSwitch from './ArchSwitch'

const motif = {
  bullets: [
    ['Solo, end to end', 'from the React and Next.js UI to the planner and code-generation agents on the Claude API, so one text prompt becomes a finished motion video with no manual editing.'],
    ['Bad output never reaches the renderer', 'critic and QA agents plus an eval harness score each step, and a failed step retries up to three times instead of breaking the run.'],
    ['Nobody pays for output they didn’t want', 'paid image and voice APIs charge per call, so jobs split into plan and render phases and the storyboard waits for your approval first.'],
    ['Retries never pay twice', 'jobs run on a BullMQ and Redis worker with bounded retries, generated assets are cached, and the pipeline is also driven from an MCP server and a CLI.'],
  ],
  caseTitle: 'Case Study: Durable Queue State Engines',
  caseText:
    'Integrating dynamic image, audio, and code-generation models into an end-to-end rendering pipeline is prone to transient service failures and high LLM token costs. On Redis and BullMQ I built a lightweight stateful workflow engine. If a rendering step fails, the queue maintains the job state and retries the specific step idempotently, saving compute and API costs.',
  tech: ['TypeScript', 'Next.js', 'React', 'Node.js', 'Claude API', 'MCP', 'BullMQ', 'Redis', 'Prisma', 'Remotion'],
}

const echo = {
  bullets: [
    ['Scheduled, not prompted', 'APScheduler watchers pull GitHub, Notion, browser and files every 30 minutes; a 21:00 job folds them into a SQLite digest.'],
    ['A graph, not a single prompt', 'LangGraph runs digest → pillar → format → LanceDB persona → Claude draft, then Remotion or Manim if the format is video.'],
    ['Human approval before anything publishes', 'Telegram lets you approve, edit or skip; the publisher ticks every 15 minutes with a lock so a post never goes out twice.'],
  ],
  caseTitle: 'Case Study: LangGraph Stateful Orchestration',
  caseText:
    'Transforming raw daily activity logs into engaging narratives requires multiple loops of refinement (synthesis, drafting, reflection, and critique). Instead of using a single-shot LLM prompt, we model the workflow as a stateful graph in LangGraph. This allows nodes to reflect on their own outputs and iterate until they meet quality criteria.',
  tech: ['Python', 'LangGraph', 'Claude API', 'APScheduler', 'SQLite', 'LanceDB', 'Telegram API', 'Remotion'],
}

const saamcars = {
  bullets: [
    ['Authorization primitives', 'middleware-level RBAC separates dealer and buyer capabilities at the API layer, making unauthorized access structurally hard.'],
    ['Concurrency-safe reservations', 'reservation logic enforces stock validation and timeout handling to prevent double-bookings when two buyers attempt to reserve the same vehicle.'],
    ['Payment integrity', 'Stripe webhooks use signature verification and idempotent event handling to atomically synchronize payment events with booking state.'],
    ['Containerized environment', 'Docker Compose packages the API and PostgreSQL together for consistent local development and deployment parity.'],
  ],
  tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Docker'],
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

const Chips = ({ items, label }) => (
  <ul className="chips" aria-label={label}>
    {items.map((t) => <li key={t}>{t}</li>)}
  </ul>
)

const Impact = ({ art = 'iso' }) => {
  const plate = art === 'manual' ? ' spot__visual--manual' : ''
  return (
    <section id="projects" className="band" aria-labelledby="projects-title">
      <div className="container">
        <div className="head">
          <h2 id="projects-title">Recent work, built end to end</h2>
          <p className="lead">A selection, from agent pipelines on the Claude API to products with real players and real payments.</p>
        </div>

        <section className="group" aria-labelledby="group-agents">
          <div className="group__head">
            <h3 id="group-agents">Agent systems</h3>
            <p>Prompt in, finished video or post out, with a human gate before anything costs money or goes public.</p>
          </div>
          <ol className="spots">
          {/* Agent Motif: the signature, the job drawn as the system it is */}
          <li className="spot spot--arch spot--flip" id="agent-motif" aria-labelledby="motif-title">
            <figure className={`spot__visual spot__visual--arch${plate}`}>
              <Isometric kind="motif" variant={art} fig={1} title="agent motif" label="Agent Motif architecture: the Next.js UI or the MCP server and CLI send a prompt to the planner agent; you approve the storyboard; jobs go onto a BullMQ and Redis queue; workers call image and voice APIs with cached assets, a code agent writes Remotion TSX, and critic and QA agents retry failed steps up to three times; Remotion renders the MP4." />
            </figure>
            <div className="spot__body">
              <h4 id="motif-title">Agent Motif</h4>
              <p>One text prompt in, a finished motion video out, no editor. Built solo, from the Next.js UI to the agents, with a gate before every paid API call.</p>
              <p className="safe"><b>Retries never pay twice.</b> Plan and render run as separate phases with bounded retries, and cached assets mean a retried job never repeats paid generation.</p>
              <Chips items={motif.tech} label="Stack" />
              <div className="spot__foot">
                <More label="Key deliverables"><Bullets items={motif.bullets} /></More>
                <More label={motif.caseTitle}><p>{motif.caseText}</p></More>
                <div className="spot__actions">
                  <a className="pill" href="https://github.com/Vamsi-027/agent-motif" target="_blank" rel="noreferrer">
                    <FiGithub aria-hidden="true" /> View source
                  </a>
                </div>
              </div>
            </div>
          </li>

          {/* Agent Echo: a trail with one human step */}
          <li className="spot spot--arch" id="agent-echo" aria-labelledby="echo-title">
            <figure className={`spot__visual spot__visual--arch${plate}`}>
              <Isometric kind="echo" variant={art} fig={2} title="agent echo" label="Agent Echo architecture: APScheduler watchers capture GitHub, Notion, browser and files into SQLite every 30 minutes; a 21:00 digest feeds a LangGraph agent that classifies, formats, retrieves LanceDB persona context, drafts with Claude and may render Remotion or Manim video; you approve, edit or skip in Telegram; then the publisher posts to LinkedIn and X with a lock against double posting." />
            </figure>
            <div className="spot__body">
              <h4 id="echo-title">Agent Echo</h4>
              <p>A scheduled agent that turns a day of real engineering work into drafts, optional Remotion or Manim video, and posts for LinkedIn and X.</p>
              <p className="safe"><b>Nothing posts on its own.</b> Every draft waits in Telegram until you approve, edit or skip it; the publisher then ticks with a lock so a post never goes out twice.</p>
              <Chips items={echo.tech} label="Stack" />
              <div className="spot__foot">
                <More label="Key deliverables"><Bullets items={echo.bullets} /></More>
                <More label={echo.caseTitle}><p>{echo.caseText}</p></More>
                <div className="spot__actions">
                  <a className="pill" href="https://github.com/Vamsi-027/Agent-Echo" target="_blank" rel="noreferrer">
                    <FiGithub aria-hidden="true" /> View source
                  </a>
                </div>
              </div>
            </div>
          </li>

          </ol>
        </section>

        <section className="group" aria-labelledby="group-products">
          <div className="group__head">
            <h3 id="group-products">Full-stack products</h3>
            <p>Shipped and live: a multiplayer game with real players, and a dealership backend that takes real payments.</p>
          </div>
          <ol className="spots">
          {/* Back2Cards: the live game, captured */}
          <li className="spot spot--arch spot--flip" id="back2cards" aria-labelledby="b2c-title">
            <figure className={`spot__visual spot__visual--arch${plate}`}>
              <ArchSwitch id="b2c" variant={art} fig={3} title="back2cards" kind="cards" label="Back2Cards architecture: players on iOS, Android and desktop browsers join a WebSocket room in the Next.js app on Vercel, talk over WebRTC voice peer to peer, and play an AI opponent when solo.">
                  <div className="shot" data-slot="back2cards" data-kind="product" data-alt="Back2Cards home screen with the hand of cricket cards fanned out">
                    <Image
                      src="/work/back2cards/screen-home-desktop.png"
                      alt="Back2Cards home screen: a fanned hand of illustrated cricket cards under the line The trump cards you grew up playing"
                      fill
                      sizes="(min-width: 60rem) 48vw, 100vw"
                    />
                  </div>
                  <p className="spot__caption">The home screen at back2cards.fun, a hand of 50 cards.</p>
              </ArchSwitch>
            </figure>
            <div className="spot__body">
              <h4 id="b2c-title">Back2Cards</h4>
              <p>The 90s tabletop cricket trump cards, rebuilt as a real-time multiplayer game. Shipped on Vercel, and it has real players.</p>
              <dl className="facts">
                <div><dt>Rooms</dt><dd>WebSocket rooms, with WebRTC voice chat between players</dd></div>
                <div><dt>Solo</dt><dd>An AI opponent when nobody else is online</dd></div>
                <div><dt>Plays on</dt><dd>iOS, Android and desktop browsers, all in the same room</dd></div>
              </dl>
              <Chips items={['TypeScript', 'Next.js', 'React', 'WebSocket', 'WebRTC', 'Vercel']} label="Stack" />
              <div className="spot__foot">
                <div className="spot__actions">
                  <a className="pill" href="https://www.back2cards.fun/" target="_blank" rel="noreferrer">
                    <FiPlay aria-hidden="true" /> Play at back2cards.fun
                  </a>
                </div>
              </div>
            </div>
          </li>

          {/* SaamCars: the live site, captured */}
          <li className="spot spot--arch" id="saamcars" aria-labelledby="saam-title">
            <figure className={`spot__visual spot__visual--arch${plate}`}>
              <ArchSwitch id="saam" variant={art} fig={4} title="saamcars" kind="dealer" label="SaamCars architecture: dealer and buyer requests pass RBAC middleware into the Node.js API, whose reservation logic checks stock and times out holds before writing to PostgreSQL; Stripe webhooks come in verified and idempotent; the API and PostgreSQL run together in Docker Compose.">
                  <div className="shot" data-slot="saamcars" data-kind="product" data-alt="SaamCars home screen">
                    <Image
                      src="/work/saamcars/screen-home-desktop.png"
                      alt="SaamCars home screen: a sports car under the line Find Your Perfect Car, with Browse Inventory and Contact Us"
                      fill
                      sizes="(min-width: 60rem) 48vw, 100vw"
                    />
                  </div>
                  <p className="spot__caption">Full-stack development, live at saamcars.com.</p>
              </ArchSwitch>
            </figure>
            <div className="spot__body">
              <h4 id="saam-title">SaamCars</h4>
              <p>A vehicle dealership backend where dealers manage inventory and buyers book vehicles, requiring strict concurrency control and real-money payment handling via Stripe.</p>
              <p className="safe"><b>Two buyers, one car.</b> Stock validation and reservation timeouts stop the double booking, and idempotent Stripe webhooks keep payment and booking in step.</p>
              <Chips items={saamcars.tech} label="Stack" />
              <div className="spot__foot">
                <More label="Key deliverables"><Bullets items={saamcars.bullets} /></More>
                <div className="spot__actions">
                  <a className="pill" href="https://www.saamcars.com/" target="_blank" rel="noreferrer">
                    <FiGlobe aria-hidden="true" /> Visit saamcars.com
                  </a>
                  <a className="link" href="https://github.com/vamsi-rebounz/SamCars-BE" target="_blank" rel="noreferrer">View source</a>
                </div>
              </div>
            </div>
          </li>
          </ol>
        </section>
      </div>
    </section>
  )
}

export default Impact
