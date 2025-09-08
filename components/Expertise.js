'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCode, 
  FiDatabase, 
  FiCloud, 
  FiZap, 
  FiShield, 
  FiTrendingUp,
  FiCheckCircle,
  FiAward
} from 'react-icons/fi'

const expertiseAreas = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: FiCode,
    level: 'Expert',
    years: '3+',
    description: 'Building robust, scalable server-side applications with enterprise-grade architecture',
    gradient: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    skills: [
      { name: 'Java', proficiency: 95, icon: '☕', projects: 12 },
      { name: 'Spring Boot', proficiency: 94, icon: '🍃', projects: 10 },
      { name: 'Node.js', proficiency: 90, icon: '📗', projects: 8 },
      { name: 'Express.js', proficiency: 88, icon: '⚡', projects: 6 },
      { name: 'RESTful APIs', proficiency: 95, icon: '🔌', projects: 15 },
      { name: 'Microservices', proficiency: 85, icon: '🔗', projects: 5 }
    ],
    achievements: [
      'Built systems serving 1M+ users daily',
      'Optimized APIs to sub-100ms response times',
      'Designed fault-tolerant microservices architecture',
      'Led performance improvements saving $500K+'
    ]
  },
  {
    id: 'databases',
    title: 'Database Systems',
    icon: FiDatabase,
    level: 'Advanced',
    years: '3+',
    description: 'Designing efficient data models and optimizing query performance at scale',
    gradient: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    skills: [
      { name: 'PostgreSQL', proficiency: 92, icon: '🐘', projects: 8 },
      { name: 'MySQL', proficiency: 88, icon: '🐬', projects: 12 },
      { name: 'Redis', proficiency: 85, icon: '🔴', projects: 6 },
      { name: 'Elasticsearch', proficiency: 80, icon: '🔍', projects: 4 },
      { name: 'Database Design', proficiency: 90, icon: '📊', projects: 10 },
      { name: 'Query Optimization', proficiency: 87, icon: '⚡', projects: 8 }
    ],
    achievements: [
      'Optimized queries processing 10M+ records',
      'Designed schemas handling 1TB+ data',
      'Implemented caching reducing load by 60%',
      'Built real-time analytics dashboards'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: FiCloud,
    level: 'Advanced',
    years: '2+',
    description: 'Deploying and managing scalable cloud infrastructure with modern DevOps practices',
    gradient: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    skills: [
      { name: 'AWS', proficiency: 85, icon: '☁️', projects: 10 },
      { name: 'Docker', proficiency: 88, icon: '🐳', projects: 12 },
      { name: 'Kubernetes', proficiency: 80, icon: '⚙️', projects: 6 },
      { name: 'CI/CD', proficiency: 85, icon: '🔄', projects: 8 },
      { name: 'Infrastructure as Code', proficiency: 78, icon: '📝', projects: 5 },
      { name: 'Monitoring', proficiency: 82, icon: '📊', projects: 7 }
    ],
    achievements: [
      'Deployed systems with 99.5% uptime',
      'Automated CI/CD for 20+ projects',
      'Reduced deployment time by 70%',
      'Managed infrastructure for millions of users'
    ]
  },
  {
    id: 'performance',
    title: 'Performance Engineering',
    icon: FiZap,
    level: 'Expert',
    years: '3+',
    description: 'Optimizing system performance and building high-throughput, low-latency applications',
    gradient: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    skills: [
      { name: 'System Optimization', proficiency: 92, icon: '⚡', projects: 8 },
      { name: 'Load Testing', proficiency: 88, icon: '📊', projects: 6 },
      { name: 'Caching Strategies', proficiency: 90, icon: '🚀', projects: 10 },
      { name: 'Memory Management', proficiency: 85, icon: '🧠', projects: 7 },
      { name: 'Distributed Systems', proficiency: 87, icon: '🌐', projects: 5 },
      { name: 'Concurrency', proficiency: 86, icon: '🔀', projects: 6 }
    ],
    achievements: [
      'Achieved 40% performance improvements',
      'Built systems handling 1M+ messages/day',
      'Optimized memory usage by 50%',
      'Reduced response times to sub-100ms'
    ]
  }
]


export default function Expertise() {
  const [selectedArea, setSelectedArea] = useState(expertiseAreas[0])
  const [activeSkill, setActiveSkill] = useState(null)

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
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section 
      id="expertise" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FiAward className="w-4 h-4" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Deep Technical
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Specialized skills honed through enterprise-scale challenges and continuous learning. 
            Every technology mastered through real-world application.
          </p>
        </motion.div>


        {/* Expertise Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Area Selection */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xl font-bold text-neutral-900 mb-6">Expertise Areas</h3>
            <div className="space-y-3">
              {expertiseAreas.map((area) => (
                <motion.button
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedArea.id === area.id
                      ? `bg-gradient-to-r ${area.gradient} text-white shadow-lg`
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedArea.id === area.id 
                        ? 'bg-white/20' 
                        : 'bg-neutral-200'
                    }`}>
                      <area.icon className={`w-5 h-5 ${
                        selectedArea.id === area.id 
                          ? 'text-white' 
                          : 'text-neutral-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{area.title}</div>
                      <div className="flex items-center space-x-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedArea.id === area.id
                            ? 'bg-white/20 text-white'
                            : 'bg-primary-100 text-primary-700'
                        }`}>
                          {area.level}
                        </span>
                        <span className={`${
                          selectedArea.id === area.id 
                            ? 'text-white/80' 
                            : 'text-neutral-500'
                        }`}>
                          {area.years} years
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Selected Area Details */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArea.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${selectedArea.bgColor} p-1`}
              >
                <div className="bg-white rounded-2xl p-8">
                  
                  {/* Area Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedArea.gradient} text-white`}>
                      <selectedArea.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-neutral-900">{selectedArea.title}</h4>
                      <p className="text-neutral-600">{selectedArea.description}</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="mb-8">
                    <h5 className="font-semibold text-neutral-900 mb-4">Core Technologies</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedArea.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="group p-4 bg-neutral-50 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-primary-100 cursor-pointer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{skill.icon}</span>
                              <div>
                                <div className="font-medium text-neutral-900">{skill.name}</div>
                                <div className="text-xs text-neutral-500">{skill.projects} projects</div>
                              </div>
                            </div>
                            <div className="text-sm font-bold text-primary-600">
                              {skill.proficiency}%
                            </div>
                          </div>
                          
                          {/* Proficiency Bar */}
                          <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
                            <motion.div
                              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            />
                          </div>
                          
                          {/* Skill Level Indicator */}
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>Beginner</span>
                            <span>Expert</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-8">
                    <h5 className="font-semibold text-neutral-900 mb-4">Key Achievements</h5>
                    <div className="space-y-3">
                      {selectedArea.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <FiCheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700 leading-relaxed">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-br from-neutral-50 to-blue-50 rounded-2xl p-8 lg:p-12">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <FiTrendingUp className="w-4 h-4" />
              <span>Performance Metrics</span>
            </div>
            
            <h3 className="text-3xl font-bold text-neutral-900 mb-6">
              Proven Track Record
            </h3>
            <p className="text-lg text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              These metrics represent real achievements from production systems I've built and optimized
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '99.5%', label: 'System Uptime', icon: FiShield, color: 'text-emerald-600' },
                { value: '<100ms', label: 'API Response', icon: FiZap, color: 'text-blue-600' },
                { value: '1M+', label: 'Messages/Day', icon: FiTrendingUp, color: 'text-purple-600' },
                { value: '$500K+', label: 'Cost Savings', icon: FiAward, color: 'text-orange-600' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`inline-flex p-4 rounded-2xl mb-4 ${metric.color} bg-opacity-10`}>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-neutral-900 mb-2">{metric.value}</div>
                  <div className="text-neutral-600 font-medium">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}