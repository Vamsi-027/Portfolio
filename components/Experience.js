const experiences = [
  {
    role: 'Software Developer',
    company: 'Zoho Corporation',
    location: 'Chennai, India',
    from: ['2022-07', '07/2022'],
    to: ['2024-07', '07/2024'],
    highlights: [
      'Core backend engineer on a greenfield distributed social communication platform built for ~20,000 employees using Java, Spring Boot, and Kafka.',
      'Designed and maintained Java/Spring Boot microservices for a high-concurrency feed platform, applying reliability-first principles.',
      'Built event-driven pipelines using Kafka to fan out post events to follower timelines asynchronously, supporting ~10,000 simulated concurrent users.',
      'Owned Redis caching subsystem with a hybrid write-through/cache-aside strategy, reducing feed read latency and preventing cache stampede.',
      'Designed RESTful APIs using OpenAPI/Swagger specifications for feed, user profile, and notification services.',
      'Modeled relational data in MySQL with range partitioning; applied ArangoDB graph modeling for follower relationship traversals.',
      'Refined Elasticsearch index mappings to improve relevance and low-latency delivery of search results.',
    ],
    deepDive: {
      title: 'Deep Dive: Thread Pool Exhaustion',
      before: 'High API traffic left threads starving while they waited on downstream I/O, and requests timed out.',
      after: 'Calls aggregated within a short time window: thread blocking down, the pool stable, latency back to baseline at peak.',
      content:
        'Diagnosed a critical production issue where high API traffic caused request timeouts. I analyzed thread dumps and discovered threads were starving while waiting on downstream I/O. By implementing request batching (aggregating calls within a short time window), I significantly reduced thread blocking, stabilized the pool, and restored latency to baseline during peak loads.',
    },
  },
  {
    role: 'Project Intern',
    company: 'Zoho Corporation',
    location: 'Chennai, India',
    from: ['2022-02', '02/2022'],
    to: ['2022-07', '07/2022'],
    highlights: [
      'Evaluated ArangoDB vs Neo4j for graph-heavy relationship workloads, informing the team’s production architecture decision.',
      'Built REST API endpoints within a Java Spring Boot microservices codebase.',
      'Integrated Redis cache-aside layers for user metadata, reducing redundant database reads and improving endpoint response times.',
    ],
  },
  {
    role: 'MS in Artificial Intelligence',
    company: 'Saint Louis University',
    location: 'Saint Louis, MO, USA',
    from: ['2024-08', '08/2024'],
    to: ['2026-05', '05/2026'],
    reading: { label: 'GPA', value: '3.74/4.00' },
  },
]

const Experience = () => {
  return (
    <section id="experience" className="section section--band" aria-labelledby="experience-title">
      <div className="container">
        <div className="head">
          <h2 id="experience-title">Zoho, then Saint Louis University</h2>
          <p className="lead">3+ years of experience designing high-concurrency, event-driven microservices.</p>
        </div>

        <div className="record">
          <ol>
            {experiences.map((exp) => (
              <li key={exp.role} className="entry">
                <div className="entry__when">
                  <span className="measured">
                    <time dateTime={exp.from[0]}>{exp.from[1]}</time>
                    <span className="muted"> to </span>
                    <time dateTime={exp.to[0]}>{exp.to[1]}</time>
                  </span>
                  <span className="muted">{exp.location}</span>
                </div>

                <div className="entry__what">
                  <div>
                    <h3>{exp.role}</h3>
                    <p className="entry__org">{exp.company}</p>
                  </div>

                  {exp.reading && (
                    <p>
                      <span className="reading">{exp.reading.value}</span>
                      <span className="muted"> {exp.reading.label}</span>
                    </p>
                  )}

                  {exp.highlights && (
                    <ul className="bullets">
                      {exp.highlights.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}

                  {exp.deepDive && (
                    <div className="panels diff" role="group" aria-labelledby="deep-dive-title">
                      <div className="diff__head">
                        <h4 id="deep-dive-title">{exp.deepDive.title}</h4>
                        <span className="diff__where">Production, Zoho feed platform</span>
                      </div>
                      <div className="diff__row diff__row--minus">
                        <span aria-label="Before">−</span>
                        <p>{exp.deepDive.before}</p>
                      </div>
                      <div className="diff__row diff__row--plus">
                        <span aria-label="After">+</span>
                        <p>{exp.deepDive.after}</p>
                      </div>
                    </div>
                  )}

                  {exp.deepDive && (
                    <details className="more">
                      <summary>Full write-up</summary>
                      <div className="more__body"><p className="muted">{exp.deepDive.content}</p></div>
                    </details>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Experience
