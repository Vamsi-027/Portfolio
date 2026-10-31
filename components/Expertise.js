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
              <div className={art === 'manual' ? 'svc__art svc__art--manual' : 'svc__art'}>
                <Isometric kind={a.kind} label={a.label} variant={art} fig={i + 5} title={a.wide ? a.title.toLowerCase() : undefined} />
              </div>
              <p>{a.text}</p>
              <ul className="chips" aria-label={`${a.title} tools`}>
                {a.tools.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Expertise
