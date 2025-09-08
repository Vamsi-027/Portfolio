'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaEnvelope, FaTerminal, FaCode, FaBriefcase, FaRocket, FaComments } from 'react-icons/fa'

const navigationItems = [
  { id: 'status', label: 'Professional Overview', icon: FaTerminal },
  { id: 'mission-log', label: 'Engineering Projects', icon: FaCode },
  { id: 'experience', label: 'Professional Experience', icon: FaBriefcase },
  { id: 'directives', label: 'Technical Expertise', icon: FaRocket },
  { id: 'comms', label: 'Contact & Resume', icon: FaComments },
]

const socialLinks = [
  { 
    icon: FaGithub, 
    href: 'https://github.com/Vamsi-027',
    label: 'GitHub',
    hoverColor: 'hover:text-purple-400'
  },
  { 
    icon: FaLinkedin, 
    href: 'https://www.linkedin.com/in/vamsi-cheruku-05a19a1b4/',
    label: 'LinkedIn',
    hoverColor: 'hover:text-blue-400'
  },
  { 
    icon: FaEnvelope, 
    href: 'mailto:vamsicheruku027@gmail.com',
    label: 'Email',
    hoverColor: 'hover:text-green-400'
  },
]

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('status')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id)
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.aside
      initial={{ x: -64 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-700 flex flex-col z-50"
    >
      {/* Header Section */}
      <div className="p-6 border-b border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Professional Logo & Profile */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Vamsi Cheruku Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain bg-white/10 rounded-lg border-2 border-blue-500 p-1"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-gray-900 rounded-full pulse-green"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Vamsi Cheruku</h1>
              <p className="text-xs text-gray-400">Backend Engineer</p>
            </div>
          </div>
          
          {/* Live Time Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-green"></div>
              <span className="text-green-400 font-mono">{currentTime} UTC</span>
            </div>
            <span className="text-xs text-gray-500">OPERATIONAL</span>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  <span>{item.label}</span>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="p-6 border-t border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">Connect</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  className={`p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 ${link.hoverColor} transition-all duration-200 transform hover:scale-110`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}