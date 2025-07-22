import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { FaChevronDown, FaCode, FaServer, FaDatabase, FaMoon, FaSun } from "react-icons/fa";

function Hero() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        setDarkMode(false);
      } else {
        html.classList.add('dark');
        setDarkMode(true);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingIcons = [
    { Icon: FaCode, delay: 0, x: -20, y: -30 },
    { Icon: FaServer, delay: 0.5, x: 20, y: -20 },
    { Icon: FaDatabase, delay: 1, x: -15, y: 25 },
  ];

  return (
    <motion.section
      ref={ref}
      id="home"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Branding Monogram */}
      <div className="absolute top-8 left-8 z-20 flex items-center space-x-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <circle cx="24" cy="24" r="22" fill="#1e293b" stroke="#3b82f6" strokeWidth="3"/>
          <text x="50%" y="54%" textAnchor="middle" fill="#3b82f6" fontSize="22" fontWeight="bold" fontFamily="'Inter',sans-serif" dominantBaseline="middle">VC</text>
        </svg>
        <span className="text-lg font-semibold text-blue-200 tracking-wide hidden sm:inline">Vamsi Cheruku</span>
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        className="absolute top-8 right-8 z-20 bg-white/10 border border-blue-400 rounded-full p-2 text-blue-400 hover:bg-blue-600/20 transition-all duration-300"
        aria-label="Toggle dark/light mode"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FaSun size={24} />
        ) : (
          <FaMoon size={24} />
        )}
      </button>

      {/* Hero Content */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl px-4 py-16 md:py-32 gap-12">
        {/* Photo Placeholder */}
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl animate-float bg-gradient-to-br from-blue-400/30 to-purple-400/20 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <text x="50%" y="56%" textAnchor="middle" fill="#3b82f6" fontSize="64" fontWeight="bold" fontFamily="'Inter',sans-serif" dominantBaseline="middle">VC</text>
          </svg>
        </div>
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight mb-2 flex items-center justify-center md:justify-start gap-4"
          >
            <span>Backend Engineer | Distributed Systems & Scalable Solutions</span>
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle">
              <circle cx="24" cy="24" r="22" fill="#1e293b" stroke="#3b82f6" strokeWidth="3"/>
              <text x="50%" y="54%" textAnchor="middle" fill="#3b82f6" fontSize="20" fontWeight="bold" fontFamily="'Inter',sans-serif" dominantBaseline="middle">VC</text>
            </svg>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-blue-100 font-medium mb-4"
          >
            I design and build robust, high-performance backend systems for modern businesses.
          </motion.p>
          <motion.div variants={itemVariants} className="text-base md:text-lg text-gray-300 mb-6">
            <span className="block mb-1">2+ years at Zoho. Expert in Java, Python, MySQL, Redis, Elasticsearch, AWS.</span>
            <span className="block">Proven impact: <span className="text-blue-300 font-semibold">40% faster systems</span>, <span className="text-blue-300 font-semibold">50% less downtime</span>, <span className="text-blue-300 font-semibold">1M+ messages/day</span>.</span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">See My Work</a>
            <a href="#contact" className="px-8 py-4 border-2 border-blue-400/50 text-blue-300 hover:bg-blue-600/20 hover:border-blue-400 rounded-xl font-semibold transition-all duration-300">Contact Me</a>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Tech Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/20 text-6xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: [x, x + 10, x],
            y: [y, y - 10, y],
          }}
          transition={{
            opacity: { delay: delay + 1, duration: 1 },
            scale: { delay: delay + 1, duration: 1 },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + index * 15}%`,
          }}
        >
          <Icon />
        </motion.div>
      ))}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        >
          <FaChevronDown size={24} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;