'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiUser, 
  FiFolderOpen, 
  FiFileText, 
  FiMail, 
  FiGithub, 
  FiLinkedin,
  FiDownload,
  FiChevronDown,
  FiTerminal
} from 'react-icons/fi'

const COMMANDS = {
  help: {
    description: 'Show available commands',
    execute: () => ({
      output: `Available commands:
  
  whoami          - About me
  ls projects     - View my projects  
  cat resume.pdf  - Download resume
  contact         - Get in touch
  skills          - Technical skills
  experience      - Work history
  clear           - Clear terminal
  exit            - Continue to site
  
  Easter eggs:
  sudo hire-me    - Why you should hire me
  coffee          - ☕ Coffee status
  vim             - Try to exit vim
  matrix          - Enter the matrix
  
Type any command or press 'Enter' to continue to the main site.`,
      type: 'info'
    })
  },
  
  whoami: {
    description: 'Display user information',
    execute: () => ({
      output: `Vamsi Cheruku
Backend Engineer & Systems Architect

🚀 Engineering enterprise-scale solutions with measurable business impact

Previously: Backend Engineer at Zoho Corporation (Jul 2022 - Jul 2024)
Learn more: https://www.zoho.com
Experience: 2+ years in distributed systems and microservices
Location: Chennai, India (Open to remote opportunities)
Status: Available for new opportunities

Performance Achievements:
• 40% performance improvements across critical microservices
• 1M+ messages/day processing capacity
• $500K+ infrastructure cost savings delivered
• 50% system downtime reduction through reliability engineering`,
      type: 'success'
    })
  },

  'ls projects': {
    description: 'List project directories',
    execute: () => ({
      output: `total 3
drwxr-xr-x  saamcars/          Enterprise inventory system (80% error reduction)
drwxr-xr-x  medical-ai/        AI-powered detection (99.5% accuracy) 
drwxr-xr-x  clinical-ai/       Healthcare ML system ($10M+ savings)

Use 'cd <project>' to explore or scroll down to see detailed case studies.`,
      type: 'info'
    })
  },

  'cat resume.pdf': {
    description: 'Download resume',
    execute: () => {
      // Trigger resume download
      window.open('https://drive.google.com/file/d/13-sjCHM2lqgB5vPldlglvLq82Ulf3U7S/view?usp=sharing', '_blank')
      return {
        output: `📄 resume.pdf
   
Downloading resume... 
✅ Download started in new tab

Contains:
• Complete work history
• Technical skills matrix  
• Project achievements
• Contact information`,
        type: 'success'
      }
    }
  },

  contact: {
    description: 'Display contact information',
    execute: () => ({
      output: `📧 Contact Information

Email:    vamsicheruku027@gmail.com
LinkedIn: linkedin.com/in/vamsi-cheruku-05a19a1b4
GitHub:   github.com/Vamsi-027
Location: Chennai, India

📅 Available for:
• Full-time positions
• Contract projects  
• Technical consultations
• Remote opportunities

⏰ Response time: Usually within 24 hours
🌍 Timezone: IST (UTC+5:30)`,
      type: 'info'
    })
  },

  skills: {
    description: 'Show technical skills',
    execute: () => ({
      output: `🛠️ Technical Skills Matrix

Backend Engineering     ████████████████████ 95%
├─ Java, Spring Boot, Microservices    
├─ Node.js, Express
├─ REST APIs, Message Queues
└─ Apache Kafka

Database Systems        ████████████████░░░░ 90%  
├─ PostgreSQL, MySQL
├─ Redis, Elasticsearch
├─ Database Design & Optimization
└─ Query Performance Tuning

Cloud & DevOps          ███████████████░░░░░ 85%
├─ AWS (EC2, S3, RDS, Lambda)
├─ Docker, Kubernetes  
├─ Jenkins CI/CD Pipelines
└─ Infrastructure as Code

System Architecture     ███████████████░░░░░ 88%
├─ Distributed Systems Design
├─ Performance Engineering
├─ Scalability Patterns
└─ Enterprise Monitoring (Grafana)`,
      type: 'success'
    })
  },

  experience: {
    description: 'Show work experience',
    execute: () => ({
      output: `💼 Professional Experience

🏢 Zoho Corporation (Jul 2022 - Jul 2024) - https://www.zoho.com
   Backend Engineer - Enterprise Software
   • Architected microservices serving millions of enterprise users
   • Led performance optimization achieving 40% improvement
   • Built distributed messaging systems (1M+ messages/day)
   • Implemented cost optimization strategies ($500K+ savings)
   • Developed enterprise monitoring and disaster recovery

🎓 Zoho Corporation (Feb 2022 - Jul 2022) - https://www.zoho.com
   Backend Development Intern
   • Developed backend services using Java and Spring Boot
   • Worked on MySQL database design and optimization
   • Collaborated on enterprise-scale distributed systems
   • Learned microservices architecture concepts
   • Transitioned from intern to full-time backend engineer`,
      type: 'info'
    })
  },

  'sudo hire-me': {
    description: 'Executive summary for hiring managers',
    execute: () => ({
      output: `🔐 [SUDO] Executive Hire Summary

Permission granted. Accessing executive briefing...

WHY HIRE VAMSI CHERUKU:

🎯 STRATEGIC VALUE
• Backend engineer with systems architecture mindset
• Proven ability to scale systems while reducing costs
• Enterprise experience at Zoho Corporation (12K+ employees)
• Translates technical improvements into measurable business impact

💰 QUANTIFIED RESULTS  
• $500K+ infrastructure cost optimization delivered
• 40% performance improvement across critical microservices
• 1M+ daily messages processed with sub-100ms latency
• 50% reduction in system downtime through reliability engineering
• 80% error reduction in production systems

🚀 TECHNICAL LEADERSHIP
• Architected distributed systems serving millions of users
• Led performance optimization initiatives with measurable impact
• Experience with enterprise-scale monitoring and disaster recovery
• Ready for senior backend/systems engineer challenges

[ASSESSMENT: High-impact engineer ready for immediate contribution]

sudo access granted. You have permission to hire.`,
      type: 'success'
    })
  },

  coffee: {
    description: 'Check coffee status',
    execute: () => ({
      output: `☕ Coffee Status Monitor
   
Current level: ████████░░ 80%
Last refill:   2 hours ago
Type:          Strong filter coffee
Mood:          Fully caffeinated and ready to code
   
Status: OPTIMAL FOR CODING 🚀`,
      type: 'warning'
    })
  },

  vim: {
    description: 'Try to exit vim',
    execute: () => ({
      output: `Opening vim...

~
~
~                        VIM - Vi IMproved
~
~                         version 8.2
~                    by Bram Moolenaar et al.
~
~        Vim is open source and freely distributable
~
~              Become a registered Vim user!
~
~ (Good luck exiting! Hint: try :q! or just scroll down to continue)

--INSERT--`,
      type: 'info'
    })
  },

  matrix: {
    description: 'Enter the matrix',
    execute: () => ({
      output: `Wake up, Neo...

01100001 01110010 01100101 01011001 01101111 01110101
01010100 01101000 01100101 01001111 01101110 01100101

The Matrix has you...
Follow the white rabbit 🐰

Wake up and hire me.`,
      type: 'success'
    })
  },

  clear: {
    description: 'Clear terminal screen',
    execute: () => ({ output: '', type: 'clear' })
  },

  exit: {
    description: 'Exit terminal and continue to main site',
    execute: () => ({
      output: `Exiting terminal...
    
👋 Thanks for exploring! 
🚀 Scrolling to main portfolio...`,
      type: 'success',
      action: 'exit'
    })
  }
}

const AUTO_SEQUENCE = [
  { command: 'whoami', delay: 1000 },
  { command: 'ls projects', delay: 3000 },
  { command: 'skills', delay: 2000 },
  { command: '', delay: 2000, output: 'Type "help" for commands, or press Enter to continue...', type: 'info' }
]

export default function Terminal({ onExit }) {
  const [history, setHistory] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [autoMode, setAutoMode] = useState(true)
  const [autoIndex, setAutoIndex] = useState(0)
  const [isInputFocused, setIsInputFocused] = useState(false)
  
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // Auto-sequence for demo mode
  useEffect(() => {
    if (!autoMode || autoIndex >= AUTO_SEQUENCE.length) return

    const timer = setTimeout(() => {
      const sequence = AUTO_SEQUENCE[autoIndex]
      
      if (sequence.command) {
        executeCommand(sequence.command, true)
      } else {
        setHistory(prev => [...prev, {
          command: '',
          output: sequence.output,
          type: sequence.type,
          timestamp: Date.now()
        }])
      }
      
      setAutoIndex(prev => prev + 1)
    }, AUTO_SEQUENCE[autoIndex].delay)

    return () => clearTimeout(timer)
  }, [autoMode, autoIndex])

  // Disable auto mode on user interaction
  const handleUserInteraction = useCallback(() => {
    setAutoMode(false)
    setIsInputFocused(true)
    inputRef.current?.focus()
  }, [])

  const executeCommand = useCallback((command, isAuto = false) => {
    const cmd = command.toLowerCase().trim()
    const commandDef = COMMANDS[cmd]
    
    let result
    if (commandDef) {
      result = commandDef.execute()
    } else if (cmd === '') {
      // Empty command - exit to main site
      onExit?.()
      return
    } else {
      result = {
        output: `Command '${command}' not found. Type 'help' for available commands.`,
        type: 'error'
      }
    }

    const historyEntry = {
      command,
      output: result.output,
      type: result.type,
      timestamp: Date.now()
    }

    if (result.type === 'clear') {
      setHistory([])
    } else {
      setHistory(prev => [...prev, historyEntry])
      
      if (result.action === 'exit') {
        setTimeout(() => onExit?.(), 2000)
      }
    }

    if (!isAuto) {
      setCurrentInput('')
    }
  }, [onExit])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    handleUserInteraction()
    executeCommand(currentInput)
  }, [currentInput, executeCommand, handleUserInteraction])

  const handleInputChange = useCallback((e) => {
    handleUserInteraction()
    setCurrentInput(e.target.value)
  }, [handleUserInteraction])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus management for cursor display
  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false)
  }, [])

  // Auto-focus when not in auto mode
  useEffect(() => {
    if (!autoMode && inputRef.current) {
      inputRef.current.focus()
      setIsInputFocused(true)
    }
  }, [autoMode])

  return (
    <motion.div 
      className="terminal-window max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleUserInteraction}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <button className="terminal-button close" />
        <button className="terminal-button minimize" />
        <button className="terminal-button maximize" />
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-400 font-terminal">
            vamsi@portfolio:~$
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="terminal-content overflow-y-auto max-h-[500px]"
      >
        {/* Welcome Message */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="terminal-info font-terminal">
            Welcome to Vamsi's Interactive Portfolio Terminal
          </div>
          <div className="text-xs text-gray-500 font-terminal">
            Type 'help' for commands or just watch the demo...
          </div>
        </motion.div>

        {/* Command History */}
        <AnimatePresence>
          {history.map((entry, _) => (
            <motion.div
              key={entry.timestamp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              {entry.command && (
                <div className="terminal-line">
                  <span className="terminal-prompt font-terminal">➜</span>
                  <span className="font-terminal">{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className={`terminal-output terminal-${entry.type} font-terminal text-sm`}>
                  <pre className="whitespace-pre-wrap">{entry.output}</pre>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="terminal-line">
          <span className="terminal-prompt font-terminal">➜</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full bg-transparent border-none outline-none text-white font-terminal caret-transparent"
              placeholder={autoMode ? "Watching demo... (click to interact)" : "Type a command..."}
              autoComplete="off"
              spellCheck="false"
            />
            {(isInputFocused || autoMode) && (
              <span 
                className="absolute top-0 font-terminal text-white pointer-events-none animate-pulse"
                style={{
                  left: `${currentInput.length * 0.6}em`,
                  animation: 'cursor-blink 1s infinite'
                }}
              >
                |
              </span>
            )}
          </div>
        </form>

        {/* Easter Egg Hints */}
        <motion.div 
          className="mt-6 pt-4 border-t border-gray-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="text-center">
            <div className="text-gray-500 text-xs font-terminal mb-4">
              💡 Try: sudo hire-me, coffee, matrix
            </div>
            
            <div className="text-gray-500 text-xs font-terminal mb-3">
              Press Enter anytime to continue to the main site
            </div>
            <motion.button
              onClick={() => onExit?.()}
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-500/10 min-h-[36px]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-terminal">Skip to Portfolio</span>
              <FiChevronDown className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}