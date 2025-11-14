'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaDownload, FaEye } from 'react-icons/fa'

const keywords = ['Scalable Systems', 'Microservices', 'Cloud Architecture', 'API Design', 'Distributed Systems']

export default function HeroStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Simulate system status checks
    const statusInterval = setInterval(() => {
      setIsOnline(prev => Math.random() > 0.1 ? true : prev) // 90% uptime simulation
    }, 3000)

    return () => clearInterval(statusInterval)
  }, [])

  useEffect(() => {
    // Typing animation for keywords
    const currentKeyword = keywords[currentKeywordIndex]
    let charIndex = 0
    let timeoutId
    
    setDisplayedText('')
    setIsTyping(true)

    const typeKeyword = () => {
      if (charIndex < currentKeyword.length) {
        setDisplayedText(currentKeyword.slice(0, charIndex + 1))
        charIndex++
        timeoutId = setTimeout(typeKeyword, 100 + Math.random() * 50) // Variable typing speed
      } else {
        setIsTyping(false)
        // Pause before starting next keyword
        timeoutId = setTimeout(() => {
          setCurrentKeywordIndex((prev) => (prev + 1) % keywords.length)
        }, 2000)
      }
    }

    timeoutId = setTimeout(typeKeyword, 300)
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentKeywordIndex])

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    
    return () => clearInterval(cursorInterval)
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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const scrollToMissionLog = () => {
    const element = document.getElementById('mission-log')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="status" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-8 py-20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Status Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 font-mono">SYSTEM STATUS:</span>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400 pulse-green' : 'bg-red-400'}`}></div>
              <span className={`text-sm font-semibold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {isOnline ? 'OPERATIONAL' : 'MAINTENANCE'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Main Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-8">
              {/* Professional Title Container */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
                  Backend Engineer
                </h1>
                <div className="text-gray-700 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium mb-4">
                  Specializing in
                </div>
                <div className="relative h-8 md:h-10 lg:h-12 xl:h-14 flex items-center justify-center">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    {displayedText}
                  </span>
                  <motion.span
                    className="ml-1 text-blue-500 font-normal text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    |
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="https://drive.google.com/file/d/13-sjCHM2lqgB5vPldlglvLq82Ulf3U7S/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.a>
              
              <motion.button
                onClick={scrollToMissionLog}
                className="inline-flex items-center justify-center space-x-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEye className="w-5 h-5" />
                <span>View Mission Log</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Professional Photo */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl transform -rotate-3 blur-sm"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl transform rotate-2 blur-lg"></div>
              
              {/* Main Photo Container */}
              <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-gray-200">
                <Image
                  src="/images/profile-pic.jpg"
                  alt="Vamsi Cheruku - Backend Engineer Specializing in Scalable Systems"
                  width={400}
                  height={400}
                  className="w-72 h-72 lg:w-96 lg:h-96 object-cover rounded-2xl border-4 border-white/60"
                  priority
                />
                
                {/* Live Status Overlay */}
                <div className="absolute -top-3 -right-3 bg-white p-3 rounded-full shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-400 rounded-full pulse-green"></div>
                    <span className="text-sm font-bold text-green-600">LIVE</span>
                  </div>
                </div>
                
                {/* Performance Badge */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-xl font-bold">99.5%</div>
                    <div className="text-sm font-medium">Uptime</div>
                  </div>
                </div>
                
                {/* Scale Badge */}
                <div className="absolute top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold">1M+</div>
                    <div className="text-xs font-medium">Requests</div>
                  </div>
                </div>
                
                {/* Engineering Badge */}
                <div className="absolute bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl shadow-lg transform rotate-3">
                  <div className="text-center">
                    <div className="text-lg font-bold">40%</div>
                    <div className="text-xs font-medium">Faster</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}