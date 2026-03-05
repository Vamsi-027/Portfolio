'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java (17+)', 'TypeScript', 'JavaScript', 'Python', 'SQL']
  },
  {
    title: 'Backend Frameworks',
    skills: ['Spring Boot', 'Apache Struts', 'Express.js', 'REST APIs', 'Microservices']
  },
  {
    title: 'API Design & Testing',
    skills: ['RESTful APIs', 'OpenAPI/Swagger', 'JUnit 5', 'Mockito', 'Integration Testing']
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'Redis', 'ArangoDB', 'DynamoDB']
  },
  {
    title: 'Messaging & EDA',
    skills: ['Apache Kafka', 'Event-Driven Architecture', 'Asynchronous Processing']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3)', 'Docker', 'Kubernetes', 'GitHub Actions CI/CD']
  }
]

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 bg-[#050505] border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">Technical Capabilities</h2>
          <p className="text-muted-foreground text-sm">Skills and frameworks I work with daily.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {category.title}
              </h3>
              
              <ul className="flex flex-col space-y-2">
                {category.skills.map((skill, i) => (
                  <li 
                    key={i} 
                    className="text-foreground text-sm font-medium flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-border rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}

export default Expertise
