'use client'

import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi'

const Contact = () => {
  return (
    <section id="contact" className="py-24 border-t border-border bg-[#050505]">
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="md:grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text/CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-0"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Let's talk systems.</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
              I'm actively seeking new roles in Backend Engineering or Systems Architecture starting May 2026. 
              My inbox is always open.
            </p>
            <a 
              href="mailto:vamsicheruku18@gmail.com"
              className="minimal-button"
            >
              <FiMail className="mr-2" /> Send Email
            </a>
          </motion.div>

          {/* Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <a 
              href="mailto:vamsicheruku18@gmail.com"
              className="minimal-card p-6 flex flex-col items-start hover:bg-white/5"
            >
              <FiMail size={20} className="text-muted-foreground mb-4" />
              <div className="text-sm font-semibold">Email</div>
              <div className="text-xs text-muted-foreground mt-1">vamsicheruku18@gmail.com</div>
            </a>

            <a 
              href="https://linkedin.com/in/vamsi-cheruku-05a19a1b4" 
              target="_blank" 
              rel="noreferrer"
              className="minimal-card p-6 flex flex-col items-start hover:bg-white/5"
            >
              <FiLinkedin size={20} className="text-muted-foreground mb-4" />
              <div className="text-sm font-semibold">LinkedIn</div>
              <div className="text-xs text-muted-foreground mt-1">vamsi-cheruku-05a19a1b4</div>
            </a>

            <a 
              href="https://github.com/Vamsi-027" 
              target="_blank" 
              rel="noreferrer"
              className="minimal-card p-6 flex flex-col items-start hover:bg-white/5"
            >
              <FiGithub size={20} className="text-muted-foreground mb-4" />
              <div className="text-sm font-semibold">GitHub</div>
              <div className="text-xs text-muted-foreground mt-1">Vamsi-027</div>
            </a>

            <div 
              className="minimal-card p-6 flex flex-col items-start bg-transparent"
            >
              <FiMapPin size={20} className="text-muted-foreground mb-4" />
              <div className="text-sm font-semibold">Location</div>
              <div className="text-xs text-muted-foreground mt-1">Saint Louis, MO, USA</div>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Vamsi Cheruku.</p>
          <p className="mt-2 md:mt-0 font-mono">Built with Next.js & Tailwind CSS.</p>
        </div>

      </div>
    </section>
  )
}

export default Contact