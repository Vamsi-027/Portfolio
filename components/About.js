import Image from 'next/image'

const rules = [
  {
    title: 'Design for Failure',
    body: [
      'In a distributed environment, failures are guaranteed. Network latency, service crashes, thread starvation, and database bottlenecks are inevitably going to happen. My core philosophy is to design architectures that anticipate and absorb these failures gracefully.',
      'This means keeping microservices single-responsibility, enforcing strict timeouts, implementing circuit breakers, and enforcing idempotent operations. I rely heavily on proper observability (logging, metrics, tracing) because you cannot fix what you cannot see.',
    ],
  },
  {
    title: 'Boring Technology is Good Technology',
    body: [
      'When reliability matters, I prefer battle-tested, “boring” technology. Tools like Java, Spring Boot, Kafka, and PostgreSQL have massive ecosystems, predictable failure modes at scale, and proven track records. Innovation should happen in the product logic, not in gambling on unproven infrastructure.',
    ],
  },
  {
    title: 'Current Explorations',
    body: [
      'My M.S. in AI pulled me to where distributed systems meet ML: agent pipelines, evals, and the queues and caches that stop a paid model call from running twice. I build them daily with Claude Code and Codex, and I judge them the way I judged Kural: speed, failure rate, cost.',
    ],
  },
]

const About = () => {
  return (
    <section id="about" className="section section--l" aria-labelledby="about-title">
      <div className="container about">
        <figure className="about__portrait">
          <div className="portrait" data-slot="portrait" data-alt="Vamsi Cheruku, illustrated portrait">
            <Image src="/images/profile-tile.png" alt="Illustrated portrait of Vamsi Cheruku in black ink, in a dark shirt" fill sizes="(min-width: 60rem) 30vw, 22rem" />
          </div>
          <figcaption className="caption">Vamsi Cheruku, Saint Louis, MO</figcaption>
        </figure>

        <div className="about__body">
          <div className="about__head">
            <h2 id="about-title">Failures are guaranteed</h2>
            <p className="lead">
              I build systems that solve problems at the infrastructure level, where design decisions directly dictate reliability, scalability, and performance.
            </p>
          </div>
          <ol className="rules">
            {rules.map((rule) => (
              <li key={rule.title}>
                <h3>{rule.title}</h3>
                {rule.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default About
