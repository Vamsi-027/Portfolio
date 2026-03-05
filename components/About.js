'use client'

import { motion } from 'framer-motion'
import { FiTerminal, FiLayers, FiCpu } from 'react-icons/fi'

const About = () => {
  return (
    <section id="about" className="py-24 max-w-5xl mx-auto px-6 border-t border-border bg-[#020202]">
      
      <div className="md:grid md:grid-cols-3 gap-16 items-start">
        
        {/* Left Col: Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-1 mb-12 md:mb-0"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Engineering Philosophy</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I build systems that solve problems at the infrastructure level—where design decisions directly dictate reliability, scalability, and performance.
          </p>
        </motion.div>

        {/* Right Col: Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-2 space-y-12"
        >
          
          <div>
            <div className="flex items-center text-foreground mb-4">
              <FiTerminal className="mr-3" />
              <h3 className="text-xl font-bold">Design for Failure</h3>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                In a distributed environment, failures are guaranteed. Network latency, service crashes, thread starvation, and database bottlenecks are inevitably going to happen. My core philosophy is to design architectures that anticipate and absorb these failures gracefully.
              </p>
              <p>
                This means keeping microservices single-responsibility, enforcing strict timeouts, implementing circuit breakers, and enforcing idempotent operations. I rely heavily on proper observability (logging, metrics, tracing) because you cannot fix what you cannot see.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center text-foreground mb-4">
              <FiLayers className="mr-3" />
              <h3 className="text-xl font-bold">Boring Technology is Good Technology</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              When reliability matters, I prefer battle-tested, "boring" technology. Tools like Java, Spring Boot, Kafka, and PostgreSQL have massive ecosystems, predictable failure modes at scale, and proven track records. Innovation should happen in the product logic, not in gambling on unproven infrastructure.
            </p>
          </div>

          <div>
            <div className="flex items-center text-foreground mb-4">
              <FiCpu className="mr-3" />
              <h3 className="text-xl font-bold">Current Explorations</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Outside of my core Java/Kafka stack, my MS in Artificial Intelligence has pushed me toward the intersection of distributed systems and ML. I am currently exploring Kubernetes internals, Redis caching strategies at scale, and the backend infrastructure required for MLOps—specifically data pipelines, vector databases, and scalable inference APIs. Long-term, I want to build the platforms that allow ML models to run reliably for millions of users.
            </p>
          </div>

        </motion.div>
      </div>

    </section>
  )
}

export default About
