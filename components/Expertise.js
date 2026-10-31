'use client'

import { useEffect, useState, useCallback } from 'react'
import Isometric from './Isometric'

const areas = [
  {
    kind: 'events',
    title: 'Event-driven backends',
    label: 'Diagram: a producer writes to a partitioned Kafka topic that fans out to three consumers, with a dead-letter queue beside it',
    text: 'Kafka fan-out, retry topics with backoff, dead-letter queues and idempotent consumers, so a failed message is retried, never dropped and never processed twice.',
    tools: ['Apache Kafka', 'BullMQ', 'SQS', 'Spring Boot', 'Node.js', 'REST', 'OpenAPI', 'Microservices', 'Java concurrency', 'Rate limiting'],
  },
  {
    kind: 'cache',
    title: 'Caching and data',
    label: 'Diagram: a Redis cache layer of keyed cells above range-partitioned MySQL tables, with cache-aside reads between them',
    text: 'Query profiling, range partitioning and a cache-aside Redis layer. It is how Kural’s feed went from 900 ms to 80 ms.',
    tools: ['Redis', 'MySQL', 'PostgreSQL', 'ArangoDB', 'Elasticsearch', 'DynamoDB', 'SQLite', 'pgvector'],
  },
  {
    kind: 'agents',
    title: 'Agent pipelines',
    label: 'Diagram: planner, critic and render agents as three panels in a row, with a retry path from the critic back to the planner',
    text: 'Planner, critic and QA agents on a job queue, with evals and a human gate before anything costs money or goes public.',
    tools: ['LLM agents', 'Claude API', 'OpenAI API', 'MCP', 'LangGraph', 'RAG', 'Evals', 'Human-in-the-loop review'],
  },
  {
    kind: 'media',
    title: 'Media pipelines',
    label: 'Diagram: uploads leave the request path for a transcode stage of frames, which fans out to three renditions of falling size',
    text: 'Uploads off the request path: FFmpeg transcodes, thumbnails and ImageMagick resizing, renditions served from a CDN, and video rendered from code with Remotion.',
    tools: ['FFmpeg', 'ImageMagick', 'Object storage and CDN', 'Remotion'],
    wide: true,
  },
  {
    kind: 'cluster',
    title: 'Cloud, tests and tooling',
    label: 'Diagram: a cluster of eight containers on one platform, one of them scaling, with load-test traffic running past',
    text: 'Containers, CI and load tests, so a latency figure is measured before it ships, in Java, Python, TypeScript and SQL.',
    tools: ['Java (17+)', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'AWS (Lambda, S3, SQS, ECS, DynamoDB)', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Vercel', 'JUnit 5', 'Mockito', 'pytest', 'Load testing', 'Profiling', 'Benchmarking', 'Claude Code', 'Codex', 'Cursor'],
    wide: true,
  },
]

const Expertise = ({ art = 'iso' }) => {
  const [activeModal, setActiveModal] = useState(null)

  const closeModal = useCallback(() => {
    setActiveModal(null)
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#inspect-')) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.__openBlueprint = (kind) => {
      const match = areas.find(a => a.kind === kind)
      if (match) setActiveModal(match)
    }
    const checkHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#inspect-')) {
        const k = hash.replace('#inspect-', '')
        const match = areas.find(a => a.kind === k)
        if (match) setActiveModal(match)
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  useEffect(() => {
    if (!activeModal) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeModal, closeModal])

  return (
    <section id="expertise" className="band band--skills" aria-labelledby="expertise-title">
      <div className="container">
        <div className="head">
          <h2 id="expertise-title">Distributed systems & core infrastructure</h2>
          <p className="lead">Architectural domains I engineer across the stack, and the battle-tested tooling behind each.</p>
        </div>
        <ul className="svcs">
          {areas.map((a, i) => (
            <li key={a.kind} className={a.wide ? 'svc svc--wide' : 'svc'}>
              <h3>{a.title}</h3>
              <div
                className={art === 'manual' ? 'svc__art svc__art--manual svc__art--interactive' : 'svc__art svc__art--interactive'}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Enlarge architecture diagram for ${a.title}`}
                onClick={(e) => {
                  if (e.target.closest('.plate__run')) return
                  setActiveModal({ ...a, fig: i + 5 })
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveModal({ ...a, fig: i + 5 })
                  }
                }}
              >
                <Isometric
                  kind={a.kind}
                  label={a.label}
                  variant={art}
                  fig={i + 5}
                  title={a.wide ? a.title.toLowerCase() : undefined}
                  showLabels={false}
                />
                <span className="svc__zoom-hint" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  Click to inspect architecture
                </span>
              </div>
              <p>{a.text}</p>
              <ul className="chips" aria-label={`${a.title} tools`}>
                {a.tools.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {activeModal && (() => {
        const activeFigNum = activeModal.fig || (areas.findIndex(a => a.kind === activeModal.kind) + 5)
        return (
          <div
            className="arch-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="arch-modal-title"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          >
            <div className="arch-modal-window">
              <header className="arch-modal-header">
                <div className="arch-modal-meta">
                  <span className="arch-modal-fig">FIG_{String(activeFigNum).padStart(3, '0')}</span>
                  <h4 id="arch-modal-title">{activeModal.title}</h4>
                </div>
                <div className="arch-modal-actions">
                  <span className="arch-modal-hint" aria-hidden="true">ESC to close</span>
                  <button
                    type="button"
                    className="arch-modal-close"
                    onClick={closeModal}
                    aria-label="Close enlarged diagram"
                  >
                    ✕
                  </button>
                </div>
              </header>

              <div className="arch-modal-stage">
                <Isometric
                  kind={activeModal.kind}
                  label={activeModal.label}
                  variant={art}
                  fig={activeFigNum}
                  title={activeModal.title.toLowerCase()}
                  showLabels={true}
                  enlarged={true}
                />
              </div>

              <footer className="arch-modal-footer">
                <p className="arch-modal-desc">{activeModal.text}</p>
                <ul className="chips chips--modal" aria-label={`${activeModal.title} tools`}>
                  {activeModal.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </footer>
            </div>
          </div>
        )
      })()}
    </section>
  )
}

export default Expertise
