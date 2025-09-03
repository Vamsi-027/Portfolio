'use client'

import { motion } from 'framer-motion'
import { FaServer, FaRocket, FaChartLine, FaCogs } from 'react-icons/fa'

const directives = [
  {
    id: '01',
    title: 'End-to-End System Ownership',
    icon: FaServer,
    description: 'I don\'t just write code; I architect complete solutions. From designing PostgreSQL schemas that handle 1M+ daily transactions to deploying containerized microservices on AWS, I own the entire system lifecycle and ensure 99.5% uptime.',
    metrics: ['1M+ transactions', '99.5% uptime', 'Full-stack ownership'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: '02', 
    title: 'Performance-First Engineering',
    icon: FaRocket,
    description: 'My systems deliver measurable results: 40% performance improvements, 50% downtime reduction, and sub-100ms API response times. I optimize for scale, not just functionality, ensuring your infrastructure grows with your business.',
    metrics: ['40% performance boost', '50% downtime reduction', '<100ms response'],
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: '03',
    title: 'Business Impact Focus', 
    icon: FaChartLine,
    description: 'I understand engineering serves business goals. My solutions reduce operational costs by $500K+, prevent $10M+ in liability, and improve user satisfaction by 35%. I translate technical decisions into business value.',
    metrics: ['$500K+ cost savings', '$10M+ liability prevention', '35% satisfaction boost'],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: '04',
    title: 'Production-Ready Mindset',
    icon: FaCogs,
    description: 'At Zoho Corporation, I\'ve deployed systems serving millions of users. I build with monitoring, logging, and disaster recovery from day one—not as an afterthought.',
    metrics: ['Millions of users', 'Enterprise deployment', '24/7 monitoring'],
    color: 'from-orange-500 to-orange-600', 
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
]

export default function Directives() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="directives" className="min-h-screen py-20 px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-blue-400 rounded-full pulse-green"></div>
            <span className="text-blue-400 font-semibold text-lg uppercase tracking-wider">
              CORE DIRECTIVES
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Hire Me?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I drive measurable business impact through engineering excellence and strategic thinking
          </p>
        </motion.div>

        {/* Directives Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {directives.map((directive, index) => {
            const Icon = directive.icon
            return (
              <motion.div
                key={directive.id}
                variants={itemVariants}
                className="group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 h-full">
                  {/* Directive Number & Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${directive.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-white">
                          DIRECTIVE {directive.id}
                        </span>
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full pulse-green"></div>
                          <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {directive.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {directive.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="space-y-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                      KEY METRICS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {directive.metrics.map((metric, metricIndex) => (
                        <motion.span
                          key={metricIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 + metricIndex * 0.05 }}
                          className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full border border-white/30"
                        >
                          {metric}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${directive.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants} 
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Deploy These Capabilities?
            </h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              I bring proven results and enterprise-scale experience to your engineering challenges.
              Let's build systems that deliver measurable business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://drive.google.com/file/d/1Ic1DF0AZ9FKnnwCnxWRlvdV3YLHXFvro/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download Full Resume</span>
              </motion.a>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('comms')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center justify-center space-x-3 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Initiate Contact</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}