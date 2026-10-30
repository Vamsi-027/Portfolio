const experiences = [
  {
    role: 'Software Engineer',
    company: 'Zoho Corporation, on Kural',
    location: 'Chennai, India',
    from: ['2022-07', '07/2022'],
    to: ['2024-07', '07/2024'],
    highlights: [
      'Crushed feed latency from 900ms to 80ms (91% drop) by range-partitioning write-heavy MySQL tables and building a domain-keyed Redis cache (94% hit rate).',
      'Architected hybrid push/pull Kafka timeline fan-out scaling to 10k concurrent users at p99 < 120ms.',
      'Built async media transcode pipeline (FFmpeg/CDN) and fault-tolerant worker fleet with dead-letter queues and idempotent consumers.',
      'Owned core Java / Spring Boot microservices and served as primary on-call, absorbing traffic spikes with Kafka buffering and rate limiting.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Zoho Corporation',
    location: 'Chennai, India',
    from: ['2022-02', '02/2022'],
    to: ['2022-07', '07/2022'],
    highlights: [
      'Ran a six-workload ArangoDB vs. Neo4j benchmark that decided the team’s graph database, then designed the ArangoDB schemas and traversals for followers, recommendations and permissions.',
    ],
  },
  {
    role: 'MS in Artificial Intelligence',
    company: 'Saint Louis University',
    location: 'Saint Louis, MO, USA',
    from: ['2024-08', '08/2024'],
    to: ['2026-05', '05/2026'],
    reading: { label: 'GPA', value: '3.77/4.00' },
    link: { href: 'https://github.com/nagatharun/Enhance-Data-Diversity-and-Robustness', label: 'Capstone source on GitHub' },
    highlights: [
      'Capstone: multi-organ segmentation for da Vinci surgical video. Labeled surgical data was scarce, so I generated synthetic training frames with a diffusion model and ran YOLOv11 for real-time inference.',
    ],
  },
  {
    role: 'B.Tech in Computer Science',
    company: 'Vishnu Institute of Technology',
    location: 'Bhimavaram, India',
    from: ['2018', '2018'],
    to: ['2022', '2022'],
    reading: { label: 'GPA', value: '8.1/10' },
  },
]

const Experience = () => {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <div className="head">
          <h2 id="experience-title">Zoho, then Saint Louis University</h2>
          <p className="lead">Two and a half years on Kural, Zoho’s X-style social platform: the feed, the queues, the caches and the pager.</p>
        </div>

        <dl className="record" aria-label="The record">
          <div>
            <dt>Kural feed load, down from 900 ms</dt>
            <dd>80{'\u00a0'}ms</dd>
          </div>
          <div>
            <dt>Hit rate on the Redis layer I designed, now the team standard</dt>
            <dd>94%</dd>
          </div>
          <div>
            <dt>Concurrent users load-tested on the Kafka fan-out, p99 under 120 ms</dt>
            <dd>10,000</dd>
          </div>
          <div>
            <dt>Zoho employees on Kural</dt>
            <dd>~30,000</dd>
          </div>
        </dl>

        <ol className="panel roles">
          {experiences.map((exp) => (
            <li key={exp.role} className="role">
              <div className="role__when">
                <span>
                  <time dateTime={exp.from[0]}>{exp.from[1]}</time> to <time dateTime={exp.to[0]}>{exp.to[1]}</time>
                </span>
                <span>{exp.location}</span>
              </div>
              <div className="role__who">
                <h3>{exp.role}</h3>
                <p>{exp.company}</p>
              </div>
              <div className="role__what">
                {exp.reading && (
                  <p className="gpa"><b>{exp.reading.value}</b> <span className="muted">{exp.reading.label}</span></p>
                )}
                {exp.highlights && (
                  <ul className="bullets">
                    {exp.highlights.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {exp.link && (
                  <a className="link role__link" href={exp.link.href} target="_blank" rel="noreferrer">{exp.link.label}</a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
