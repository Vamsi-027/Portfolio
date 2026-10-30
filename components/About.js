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
      'Outside of my core Java/Kafka stack, my MS in Artificial Intelligence has pushed me toward the intersection of distributed systems and ML. I am currently exploring Kubernetes internals, Redis caching strategies at scale, and the backend infrastructure required for MLOps: specifically data pipelines, vector databases, and scalable inference APIs. Long-term, I want to build the platforms that allow ML models to run reliably for millions of users.',
    ],
  },
]

const About = () => {
  return (
    <section id="about" className="section section--l" aria-labelledby="about-title">
      <div className="container creed">
        <figure className="creed__portrait">
          <div className="portrait" data-slot="portrait" data-alt="Vamsi Cheruku, portrait">
            <Image src="/profile.jpg" alt="Vamsi Cheruku" fill sizes="(min-width: 60rem) 30vw, 22rem" />
          </div>
          <figcaption className="caption">Vamsi Cheruku, Saint Louis, MO</figcaption>
        </figure>

        <div className="creed__body">
          <div className="head head--stack head--flush">
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
