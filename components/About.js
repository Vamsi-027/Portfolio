import Image from 'next/image'

const rules = [
  {
    title: 'Design for Failure',
    body: [
      'Networks partition, threads starve, downstream services crash. I build architectures that absorb failure by default: strict deadline propagation, circuit breakers, bounded retries, and idempotent mutations so retried operations never corrupt state. If it isn’t measured with traces and metrics, it’s already broken.',
    ],
  },
  {
    title: 'Battle-Tested Primitives',
    body: [
      'Production runs on proven primitives: Java, Spring Boot, Kafka, Postgres, Redis. Known performance envelopes and transparent failure modes at scale. Novelty belongs in product leverage, not gambling system availability on unproven infrastructure.',
    ],
  },
  {
    title: 'Distributed Systems × AI',
    body: [
      'Applying backend rigor to LLM orchestration: durable state machines, eval harnesses, and cached token pipelines. Non-deterministic models demand deterministic infrastructure: paid API calls never run twice, bad outputs never bypass QA, and runs are benchmarked strictly on latency, cost, and failure rate.',
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
              I engineer backends at the infrastructure layer—where throughput, latency, and fault tolerance are decided by architecture, not hope.
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
