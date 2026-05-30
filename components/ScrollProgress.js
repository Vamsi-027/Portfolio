'use client'

import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#00f0ff] z-50 origin-left shadow-[0_0_8px_#00f0ff]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
