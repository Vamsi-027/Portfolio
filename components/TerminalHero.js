'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Terminal from './Terminal'
import { 
  FiTerminal, 
  FiCode, 
  FiChevronDown
} from 'react-icons/fi'

export default function TerminalHero() {
  const [showTerminal, setShowTerminal] = useState(false)
  
  useEffect(() => {
    // Show terminal after a brief delay
    const timer = setTimeout(() => {
      setShowTerminal(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const handleTerminalExit = () => {
    // Smooth scroll to next section
    const nextSection = document.getElementById('impact')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSkipToSite = () => {
    handleTerminalExit()
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 pb-16"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)
        `
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Floating Code Symbols - More Subtle */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => {
            // Use deterministic values based on index to prevent hydration mismatch
            const symbols = ['{ }', '[ ]', '< >', '/>', '=>', '&&', '||', 'fn']
            const leftPos = (i * 23.7) % 100
            const topPos = (i * 31.3) % 100
            const symbol = symbols[i % symbols.length]
            const duration = 20 + (i % 8) * 3
            const delay = (i % 4) * 2
            
            return (
              <motion.div
                key={i}
                className="absolute text-slate-600/20 font-mono text-lg select-none font-light"
                style={{
                  left: `${leftPos}%`,
                  top: `${topPos}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              >
                {symbol}
              </motion.div>
            )
          })}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Subtle Scanning Line Effect */}
        <motion.div
          className="absolute inset-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          animate={{
            y: ['0vh', '100vh']
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto">
        
        {/* Header Info */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-mono mb-8 backdrop-blur-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FiTerminal className="w-5 h-5" />
            <span className="font-semibold">Interactive Portfolio Terminal</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-blue-400">$</span> <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">whoami</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Discover my journey through an interactive command-line experience
          </motion.p>
        </motion.div>

        {/* Terminal Container with Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showTerminal ? 1 : 0, scale: showTerminal ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col xl:flex-row items-center xl:items-center gap-12 xl:gap-16"
        >
          {showTerminal && (
            <>
              {/* Profile Picture */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                className="flex-shrink-0 order-2 xl:order-1"
              >
                <div className="relative group">
                  {/* Outer glow ring */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full opacity-30 group-hover:opacity-50 animate-pulse transition-opacity duration-1000"></div>
                  
                  {/* Main image container */}
                  <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 p-1 rounded-full">
                    <img 
                      src="/images/profile-pic.jpg" 
                      alt="Vamsi Cheruku - Systems Architect" 
                      className="w-64 h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full object-cover border-4 border-slate-600/50 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-6 right-6 w-8 h-8 bg-emerald-500 border-4 border-slate-800 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Professional badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg border border-blue-500/50">
                      Available for Hire
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Terminal */}
              <motion.div 
                className="flex-1 order-1 xl:order-2 w-full max-w-4xl"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              >
                <Terminal onExit={handleTerminalExit} />
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
        >
          <motion.button
            onClick={handleSkipToSite}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 transition-all duration-300 shadow-xl min-h-[56px] min-w-[200px] overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10">Explore Portfolio</span>
            <FiChevronDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform duration-200" />
          </motion.button>

          <motion.a
            href="https://drive.google.com/file/d/13-sjCHM2lqgB5vPldlglvLq82Ulf3U7S/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center space-x-3 border-2 border-slate-600/50 bg-slate-800/50 text-slate-200 px-8 py-4 rounded-2xl font-semibold text-base hover:bg-slate-700/50 hover:border-slate-500/70 hover:text-white transition-all duration-300 shadow-xl min-h-[56px] min-w-[200px] backdrop-blur-sm overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <FiCode className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View Resume</span>
          </motion.a>
        </motion.div>

      </div>


      {/* SEO Fallback (hidden by default, visible to crawlers) */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <img 
              src="/images/profile-pic.jpg" 
              alt="Vamsi Cheruku" 
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-6">Vamsi Cheruku</h1>
            <h2 className="text-2xl text-blue-400 mb-8">Systems Architect & Performance Engineer</h2>
            <p className="text-xl mb-8">
              I don't just build systems—I engineer competitive advantages. 
              Backend engineer at Zoho Corporation with proven track record of 
              building scalable systems that serve millions while delivering measurable business impact.
            </p>
            <div className="space-y-4">
              <div>📧 vamsicheruku027@gmail.com</div>
              <div>💼 linkedin.com/in/vamsi-cheruku-05a19a1b4</div>
              <div>💻 github.com/Vamsi-027</div>
            </div>
          </div>
        </div>
      </noscript>
    </section>
  )
}