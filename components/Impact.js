'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'

const projects = [
  {
    title: 'TaraHub – Multi-Vendor Marketplace',
    role: 'Backend Architecture',
    description: 'A scalable multi-vendor commerce platform with an event-driven lifecycle pipeline ensuring downstream systems remain consistent without polling.',
    bullets: [
      'Built Java 17/Spring Boot backend services documented with OpenAPI/Swagger.',
      'Implemented an event-driven order lifecycle pipeline using Kafka to propagate state transitions.',
      'Containerized services with Docker and deployed on AWS EC2 with CI/CD.'
    ],
    architectureConcept: {
      title: 'Case Study: Decoupling with Kafka',
      content: 'In an e-commerce system, a single action like placing an order can trigger many downstream processes (payments, inventory, notifications). If implemented with synchronous REST calls, the order service becomes a central point of cascading failure. By introducing Kafka, I decoupled these services. The Order service simply publishes an "OrderCreated" event, and downstream services consume it asynchronously. This eliminated tight coupling, improved fault tolerance, and easily allowed for future pipeline extensions (like analytics) without modifying the core order flow.'
    },
    tech: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Stripe', 'Docker', 'AWS'],
    links: {
      github: 'https://github.com/Vamsi-027/tara-hub'
    }
  },
  {
    title: 'SaamCars – Vehicle Dealership Platform',
    role: 'Full-Stack Development',
    description: 'A comprehensive vehicle inventory management and booking workflow system with role-based access control and strict transactional consistency.',
    bullets: [
      'Designed a RESTful backend with Node.js and PostgreSQL.',
      'Built concurrency-safe reservation logic with stock validation and timeout handling.',
      'Integrated Stripe webhooks with signature verification for atomic payment states.'
    ],
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Docker'],
    links: {
      github: 'https://github.com/vamsi-rebounz/SamCars-BE' 
    }
  }
]

const Impact = () => {
  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Selected Work</h2>
            <p className="text-muted-foreground text-sm">Case studies from production systems.</p>
          </div>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="minimal-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  
                  {/* Left Column: Context */}
                  <div className="p-8 lg:p-10 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border bg-[#050505]">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      {project.role}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-border rounded text-xs font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="p-8 lg:p-10 lg:col-span-3 bg-black flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold mb-6 flex items-center text-foreground uppercase tracking-wider">
                        Key Deliverables
                      </h4>
                      <ul className="space-y-4 mb-8">
                        {project.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start text-muted-foreground text-sm">
                            <span className="text-border mr-3">—</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {project.architectureConcept && (
                        <div className="pt-6 border-t border-border mt-4">
                          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center tracking-wide">
                            <svg className="w-4 h-4 mr-2 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {project.architectureConcept.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.architectureConcept.content}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-12 pt-6 border-t border-border flex gap-4">
                      {project.links.github && (
                        <a 
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                          <FiGithub /> View Source <FiArrowUpRight className="opacity-50" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Impact
