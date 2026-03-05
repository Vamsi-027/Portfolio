'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    type: 'work',
    role: 'Software Developer',
    company: 'Zoho Corporation',
    location: 'Chennai, India',
    period: '07/2022 – 07/2024',
    highlights: [
      'Core backend engineer on a greenfield distributed social communication platform built for ~20,000 employees using Java, Spring Boot, and Kafka.',
      'Designed and maintained Java/Spring Boot microservices for a high-concurrency feed platform, applying reliability-first principles.',
      'Built event-driven pipelines using Kafka to fan out post events to follower timelines asynchronously, supporting ~10,000 simulated concurrent users.',
      'Owned Redis caching subsystem with a hybrid write-through/cache-aside strategy, reducing feed read latency and preventing cache stampede.',
      'Designed RESTful APIs using OpenAPI/Swagger specifications for feed, user profile, and notification services.',
      'Modeled relational data in MySQL with range partitioning; applied ArangoDB graph modeling for follower relationship traversals.',
      'Refined Elasticsearch index mappings to improve relevance and low-latency delivery of search results.'
    ],
    deepDive: {
      title: 'Deep Dive: Thread Pool Exhaustion',
      content: 'Diagnosed a critical production issue where high API traffic caused request timeouts. I analyzed thread dumps and discovered threads were starving while waiting on downstream I/O. By implementing request batching (aggregating calls within a short time window), I significantly reduced thread blocking, stabilized the pool, and restored latency to baseline during peak loads.'
    }
  },
  {
    type: 'work',
    role: 'Project Intern',
    company: 'Zoho Corporation',
    location: 'Chennai, India',
    period: '02/2022 – 07/2022',
    highlights: [
      'Evaluated ArangoDB vs Neo4j for graph-heavy relationship workloads, informing the team\'s production architecture decision.',
      'Built REST API endpoints within a Java Spring Boot microservices codebase.',
      'Integrated Redis cache-aside layers for user metadata, reducing redundant database reads and improving endpoint response times.'
    ]
  },
  {
    type: 'education',
    role: 'MS in Artificial Intelligence',
    company: 'Saint Louis University',
    location: 'Saint Louis, MO, USA',
    period: '08/2024 – 05/2026',
    highlights: [
      'GPA: 3.74/4.00'
    ]
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-24 max-w-5xl mx-auto px-6 border-t border-border">
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2">Experience</h2>
        <p className="text-muted-foreground text-sm">Professional timeline and education.</p>
      </motion.div>

      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="md:grid md:grid-cols-4 md:gap-8 items-start group"
          >
            
            {/* Timeline metadata */}
            <div className="mb-4 md:mb-0">
              <div className="text-sm font-mono text-muted-foreground mb-1 group-hover:text-foreground transition-colors">{exp.period}</div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
              <div className="text-base text-foreground mb-1">{exp.company}</div>
              <div className="text-sm text-muted-foreground mb-6">{exp.location}</div>
              
              <ul className="space-y-4 text-muted-foreground text-sm">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-border mr-3">—</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {exp.deepDive && (
                <div className="mt-8 p-6 bg-[#050505] border border-border rounded-lg">
                  <h4 className="text-sm font-bold text-foreground mb-2 flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    {exp.deepDive.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.deepDive.content}
                  </p>
                </div>
              )}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
