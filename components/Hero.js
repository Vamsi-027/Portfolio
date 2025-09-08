'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  FiArrowRight, 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiDownload,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiCpu
} from 'react-icons/fi'

const impactMetrics = [
  {
    icon: FiTrendingUp,
    value: '40%',
    label: 'Performance Boost',
    description: 'System optimization improvements',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: FiZap,
    value: '1M+',
    label: 'Messages/Day',
    description: 'High-throughput processing',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: FiShield,
    value: '99.5%',
    label: 'System Uptime',
    description: 'Enterprise reliability',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: FiCpu,
    value: '<100ms',
    label: 'API Response',
    description: 'Sub-second performance',
    color: 'from-orange-500 to-orange-600'
  }
]

const rotatingKeywords = [
  'High-Performance Systems',
  'Scalable Architecture',
  'Distributed Processing',
  'Performance Optimization',
  'System Reliability'
]

export default function Hero() {
  const [currentKeyword, setCurrentKeyword] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false)
      setTimeout(() => {
        setCurrentKeyword((prev) => (prev + 1) % rotatingKeywords.length)
        setIsTyping(true)
      }, 500)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99] 
      },
    },
  }

  const scrollToNextSection = () => {
    const element = document.getElementById('impact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-blue-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%239C92AC' fill-opacity='0.02'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Available for opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="space-y-2 mb-6">
              <div className="text-neutral-600 text-lg sm:text-xl font-medium">
                Hi, I'm Vamsi Cheruku
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                I don't just build systems—
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
                I engineer competitive advantages
              </div>
            </motion.h1>

            {/* Dynamic Keywords */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="text-xl sm:text-2xl text-neutral-700 mb-4">
                Specializing in
              </div>
              <motion.div 
                className="h-12 flex items-center justify-center lg:justify-start"
                key={currentKeyword}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl sm:text-3xl font-bold text-primary-600 font-mono">
                  {rotatingKeywords[currentKeyword]}
                  <motion.span
                    animate={{ opacity: isTyping ? [1, 0] : 1 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-primary-400"
                  >
                    |
                  </motion.span>
                </span>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants} 
              className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Backend engineer at <span className="font-semibold text-neutral-900">Zoho Corporation</span> with 
              a proven track record of building enterprise systems that serve millions of users while 
              delivering measurable business impact through performance optimization and scalable architecture.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <motion.button
                onClick={scrollToNextSection}
                className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Impact</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.a
                href="https://drive.google.com/file/d/1Ic1DF0AZ9FKnnwCnxWRlvdV3YLHXFvro/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center space-x-6 justify-center lg:justify-start">
              <motion.a
                href="https://github.com/Vamsi-027"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/vamsi-cheruku-05a19a1b4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:vamsicheruku027@gmail.com"
                className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div variants={itemVariants} className="relative">
            
            {/* Main Profile Image */}
            <div className="relative mx-auto lg:ml-auto w-80 h-80 lg:w-96 lg:h-96">
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                
                {/* Image Container */}
                <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-white">
                  <Image
                    src="/images/profile-pic.jpg"
                    alt="Vamsi Cheruku - Systems Architect & Performance Engineer"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-2xl"
                    priority
                  />
                </div>
                
                {/* Floating Status Indicator */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-neutral-200"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 500, damping: 30 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Online</div>
                      <div className="text-xs text-neutral-500">Building at Zoho</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Metric Cards */}
            {impactMetrics.map((metric, index) => {
              const positions = [
                { top: '10%', left: '-10%' },      // Top Left
                { top: '20%', right: '-15%' },     // Top Right
                { bottom: '30%', left: '-15%' },   // Bottom Left
                { bottom: '15%', right: '-10%' },  // Bottom Right
              ]
              
              return (
                <motion.div
                  key={metric.label}
                  className="absolute hidden lg:block"
                  style={positions[index]}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 1.5 + index * 0.2,
                    duration: 0.5,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group cursor-default">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color} text-white`}>
                        <metric.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-neutral-900">{metric.value}</div>
                        <div className="text-xs text-neutral-600">{metric.label}</div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {metric.description}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNextSection}
            className="flex flex-col items-center space-y-2 text-neutral-500 hover:text-primary-600 transition-colors group"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-current rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}