'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-start px-6 max-w-5xl mx-auto pt-20">
      
      <div className="z-10 w-full flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-12">
        
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center text-muted-foreground text-sm font-mono"
          >
            Systems Architect & Performance Engineer
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]"
          >
            Engineering <br />
            <span className="text-muted-foreground">scalable systems.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            I'm Vamsi Cheruku, a Backend Software Engineer with 3+ years of experience designing high-concurrency event-driven microservices. Currently pursuing an MS in Artificial Intelligence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#projects" 
              className="minimal-button group"
            >
              View Projects
              <FiArrowRight className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            
            <a 
              href="https://drive.google.com/file/d/173yYb__jgmFVVInXkr7kYiJFjJcJfZY9/view?usp=sharing" 
              target="_blank"
              rel="noreferrer"
              className="minimal-button-outline"
            >
              Read Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-40 h-40 md:w-72 md:h-72 rounded-full overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-500 flex-shrink-0"
        >
          <Image 
            src="/profile.jpg" 
            alt="Vamsi Cheruku" 
            fill
            className="object-cover"
            priority
          />
        </motion.div>

      </div>

    </section>
  )
}

export default Hero
