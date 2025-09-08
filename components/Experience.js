'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiBriefcase, 
  FiTrendingUp, 
  FiClock, 
  FiMapPin, 
  FiExternalLink,
  FiAward,
  FiTarget,
  FiZap,
  FiChevronDown,
  FiCode,
  FiDatabase,
  FiCloud,
  FiGitBranch
} from 'react-icons/fi'

const experiences = [
  {
    id: 'zoho',
    company: 'Zoho Corporation',
    logo: '/images/zoho-logo.png',
    position: 'Backend Engineer',
    level: 'Mid-Level',
    duration: 'Jul 2022 - Jul 2024',
    location: 'Chennai, India',
    type: 'Full-time',
    companySize: '12,000+ employees',
    companyValue: '$15B+ valuation',
    companyDescription: 'Global leader in cloud-based business software',
    
    keyAchievements: [
      {
        title: 'Performance Optimization Leadership',
        description: 'Led critical microservices optimization achieving 40% performance improvement',
        impact: '40% faster response times',
        icon: FiZap,
        color: 'from-yellow-500 to-orange-500'
      },
      {
        title: 'High-Volume Message Processing',
        description: 'Architected distributed messaging systems handling enterprise-scale traffic',
        impact: '1M+ messages/day processed',
        icon: FiTrendingUp,
        color: 'from-green-500 to-emerald-500'
      },
      {
        title: 'Infrastructure Cost Optimization',
        description: 'Implemented monitoring and optimization strategies reducing operational overhead',
        impact: '$500K+ cost savings',
        icon: FiTarget,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        title: 'System Reliability Engineering',
        description: 'Built enterprise-grade monitoring and disaster recovery solutions',
        impact: '50% downtime reduction',
        icon: FiAward,
        color: 'from-purple-500 to-pink-500'
      }
    ],
    
    responsibilities: [
      'Design and maintain high-scale distributed systems serving millions of enterprise users',
      'Optimize critical microservices architecture for performance and reliability',
      'Implement enterprise monitoring, logging, and disaster recovery solutions',
      'Collaborate with cross-functional teams to deliver sub-100ms API response times',
      'Lead performance optimization initiatives with measurable business impact'
    ],
    
    technologies: [
      'Java', 'Spring Boot', 'Microservices', 'Apache Kafka', 
      'Redis', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 
      'Elasticsearch', 'Grafana', 'Jenkins'
    ],
    
    current: false,
    featured: true,
    gradient: 'from-blue-600 to-indigo-700',
    bgGradient: 'from-blue-50 to-indigo-100'
  },
  {
    id: 'zoho-intern',
    company: 'Zoho Corporation',
    logo: '/images/zoho-logo.png',
    position: 'Backend Development Intern',
    level: 'Entry-Level',
    duration: 'Feb 2022 - Jul 2022',
    location: 'Chennai, India',
    type: 'Internship',
    companySize: '12,000+ employees',
    companyValue: '$15B+ valuation',
    companyDescription: 'Global leader in cloud-based business software - Internship Program',
    
    keyAchievements: [
      {
        title: 'Backend Development Foundation',
        description: 'Built foundational skills in Java/Spring Boot through real-world enterprise projects',
        impact: 'Core skills developed',
        icon: FiCode,
        color: 'from-blue-500 to-indigo-500'
      },
      {
        title: 'Database Management',
        description: 'Gained hands-on experience with MySQL database design and optimization',
        impact: 'Database expertise gained',
        icon: FiDatabase,
        color: 'from-green-500 to-emerald-500'
      },
      {
        title: 'Enterprise Systems Learning',
        description: 'Exposed to large-scale distributed systems serving millions of users',
        impact: 'Enterprise knowledge',
        icon: FiTrendingUp,
        color: 'from-purple-500 to-pink-500'
      },
      {
        title: 'Professional Growth',
        description: 'Transitioned from intern to full-time backend engineer role',
        impact: 'Career advancement',
        icon: FiAward,
        color: 'from-orange-500 to-red-500'
      }
    ],
    
    responsibilities: [
      'Developed backend services using Java and Spring Boot framework',
      'Worked on database design and query optimization with MySQL',
      'Collaborated with senior engineers on enterprise-scale projects',
      'Learned microservices architecture and distributed systems concepts',
      'Participated in code reviews and agile development processes'
    ],
    
    technologies: [
      'Java', 'Spring Boot', 'MySQL', 'REST APIs', 
      'Git', 'Linux', 'Maven', 'JUnit'
    ],
    
    current: false,
    featured: false,
    gradient: 'from-indigo-600 to-blue-700',
    bgGradient: 'from-indigo-50 to-blue-100'
  }
]

const skillCategories = [
  {
    category: 'Backend Engineering',
    icon: FiCode,
    skills: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Microservices', 'REST APIs'],
    proficiency: 95,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    category: 'Database Systems',
    icon: FiDatabase,
    skills: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Database Design'],
    proficiency: 90,
    color: 'from-green-500 to-emerald-500'
  },
  {
    category: 'Cloud & DevOps',
    icon: FiCloud,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure'],
    proficiency: 85,
    color: 'from-purple-500 to-pink-500'
  },
  {
    category: 'System Architecture',
    icon: FiGitBranch,
    skills: ['Distributed Systems', 'Performance Optimization', 'Scalability'],
    proficiency: 88,
    color: 'from-orange-500 to-red-500'
  }
]

export default function Experience() {
  const [expandedCard, setExpandedCard] = useState(null)

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section 
      id="experience" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold mb-8 shadow-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiBriefcase className="w-5 h-5" />
            <span>Professional Journey</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Engineering Excellence{" "}
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              At Enterprise Scale
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From startup agility to enterprise scale, I've architected systems that serve millions 
            while maintaining exceptional performance, reliability, and measurable business impact.
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                
                {/* Header */}
                <div className={`relative p-8 bg-gradient-to-br ${exp.gradient} text-white overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-black/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                          <FiBriefcase className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                          <a 
                            href={exp.company === 'Zoho Corporation' ? 'https://www.zoho.com' : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/90 text-lg font-semibold hover:text-white transition-colors"
                          >
                            {exp.company}
                          </a>
                          <p className="text-white/75 text-sm">{exp.companyDescription}</p>
                        </div>
                      </div>
                      
                      {exp.current && (
                        <div className="flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-2 rounded-xl backdrop-blur-sm">
                          <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                          <span className="text-emerald-100 text-xs font-semibold">Current</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-white/70 text-sm">
                          <FiClock className="w-4 h-4" />
                          <span>Duration</span>
                        </div>
                        <div className="text-white font-semibold">{exp.duration}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-white/70 text-sm">
                          <FiMapPin className="w-4 h-4" />
                          <span>Location</span>
                        </div>
                        <div className="text-white font-semibold">{exp.location}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  
                  {/* Key Achievements Grid */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center space-x-2">
                      <FiAward className="w-5 h-5 text-blue-600" />
                      <span>Key Achievements</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {exp.keyAchievements.map((achievement, achIndex) => (
                        <motion.div
                          key={achIndex}
                          className="group/achievement relative p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 hover:border-blue-200/80 hover:shadow-md transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: achIndex * 0.1 }}
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-xl bg-gradient-to-r ${achievement.color} text-white shadow-sm`}>
                              <achievement.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-slate-900 text-sm mb-1 leading-tight">
                                {achievement.title}
                              </h5>
                              <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg inline-block">
                                {achievement.impact}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default border border-slate-200"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.03 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedCard(expandedCard === exp.id ? null : exp.id)}
                    className="w-full flex items-center justify-center space-x-2 py-3 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group border-t border-slate-200 pt-6"
                  >
                    <span>{expandedCard === exp.id ? 'Show Less' : 'View Details'}</span>
                    <motion.div
                      animate={{ rotate: expandedCard === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedCard === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-slate-200 pt-6"
                      >
                        <div className="space-y-6">
                          <div>
                            <h5 className="font-bold text-slate-900 mb-4">Key Responsibilities</h5>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((responsibility, idx) => (
                                <li key={idx} className="flex items-start space-x-3 text-slate-600">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm leading-relaxed">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900 mb-3">Company Info</h5>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500">Type:</span>
                                <span className="ml-2 font-semibold text-slate-900">{exp.type}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Level:</span>
                                <span className="ml-2 font-semibold text-slate-900">{exp.level}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Size:</span>
                                <span className="ml-2 font-semibold text-slate-900">{exp.companySize}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Value:</span>
                                <span className="ml-2 font-semibold text-slate-900">{exp.companyValue}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-3xl font-bold text-slate-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Technical Expertise
            </motion.h3>
            <motion.p 
              className="text-lg text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Core competencies developed through enterprise-scale engineering challenges
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h4 className="font-bold text-slate-900 text-lg mb-6">{category.category}</h4>
                
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600">Proficiency</span>
                    <span className="text-sm font-bold text-slate-900">{category.proficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1 + skillIndex * 0.05 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48" />
          </div>
          
          <div className="relative z-10">
            <motion.div 
              className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Ready for Next Challenge</span>
            </motion.div>
            
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Let's Build Something Exceptional
            </h3>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Ready to bring enterprise-scale systems thinking and proven results to your team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Conversation</span>
              </motion.button>
              
              <motion.a
                href="https://drive.google.com/file/d/15VPBnEDxgSEzjsk1cRxNe4bd-mY6Q0WY/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="w-5 h-5" />
                <span>View Resume</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}