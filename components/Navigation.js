'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'

const navItems = [
  { href: '#hero', label: 'Overview' },
  { href: '#impact', label: 'Impact' },
  { href: '#experience', label: 'Experience' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 20)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-sm' 
            : 'bg-white/90 backdrop-blur-sm border-b border-neutral-200/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0"
            >
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#hero')
                }}
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center font-mono font-bold text-white text-lg">
                  VC
                </div>
                <div className="hidden sm:block">
                  <div className="font-semibold text-neutral-900">Vamsi Cheruku</div>
                  <div className="text-xs text-neutral-500 font-mono">Systems Architect</div>
                </div>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      activeSection === item.href.slice(1)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary-50 border border-primary-100 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <motion.a
                  href="https://github.com/Vamsi-027"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="GitHub Profile"
                >
                  <FiGithub className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/vamsi-cheruku-05a19a1b4"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:vamsicheruku027@gmail.com"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Email Contact"
                >
                  <FiMail className="w-5 h-5" />
                </motion.a>
              </div>
              
              <motion.a
                href="https://drive.google.com/file/d/13-sjCHM2lqgB5vPldlglvLq82Ulf3U7S/view"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 hover:scale-105"
              >
                <FiDownload className="w-4 h-4" />
                <span>Resume</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] md:hidden"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center font-mono font-bold text-white text-lg">
                      VC
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Vamsi Cheruku</div>
                      <div className="text-xs text-neutral-500 font-mono">Systems Architect</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 py-6">
                  <nav className="px-6">
                    <div className="space-y-2">
                      {navItems.map((item, index) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(item.href)
                          }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            activeSection === item.href.slice(1)
                              ? 'text-primary-600 bg-primary-50'
                              : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                          }`}
                        >
                          {item.label}
                        </motion.a>
                      ))}
                    </div>
                  </nav>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-neutral-200">
                  <div className="space-y-4">
                    
                    {/* Social Links */}
                    <div className="flex items-center space-x-4">
                      <a
                        href="https://github.com/Vamsi-027"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-neutral-700 hover:text-neutral-900"
                      >
                        <FiGithub className="w-5 h-5" />
                        <span className="text-sm">GitHub</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/vamsi-cheruku-05a19a1b4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-neutral-700 hover:text-neutral-900"
                      >
                        <FiLinkedin className="w-5 h-5" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                      <a
                        href="mailto:vamsicheruku027@gmail.com"
                        className="flex items-center space-x-3 text-neutral-700 hover:text-neutral-900"
                      >
                        <FiMail className="w-5 h-5" />
                        <span className="text-sm">Email</span>
                      </a>
                    </div>
                    
                    {/* Resume Button */}
                    <a
                      href="https://drive.google.com/file/d/13-sjCHM2lqgB5vPldlglvLq82Ulf3U7S/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 rounded-lg text-base font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                    >
                      <FiDownload className="w-5 h-5" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}