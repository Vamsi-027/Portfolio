'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Philosophy', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
  ]

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Vamsi-027' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/vamsi-cheruku-05a19a1b4' },
    { icon: FiMail, href: 'mailto:vamsicheruku18@gmail.com' },
  ]

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled ? 'bg-black border-b border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a 
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          Vamsi Cheruku.
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={link.href} className="hover:text-foreground transition-colors">
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center space-x-5 border-l border-border pl-6">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex space-x-6 pt-4 mt-2 border-t border-border">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navigation
