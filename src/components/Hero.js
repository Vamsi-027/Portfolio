import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { FaChevronDown, FaMoon, FaSun, FaRocket, FaChartLine, FaShieldAlt, FaGlobe, FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { SiPython, SiMysql, SiRedis, SiDocker } from "react-icons/si";
import { DiJava } from "react-icons/di";
import { FaAws } from "react-icons/fa";

function Hero() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );
  const [currentText, setCurrentText] = useState(0);

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

  // Animated text rotation
  const animatedTexts = [
    "Backend Engineer",
    "Distributed Systems Expert", 
    "Scalable Solutions Architect",
    "Performance Optimizer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedTexts.length]);

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
    { Icon: DiJava, delay: 0, x: -20, y: -30, color: "text-orange-500" },
    { Icon: SiPython, delay: 0.5, x: 20, y: -20, color: "text-blue-500" },
    { Icon: SiMysql, delay: 1, x: -15, y: 25, color: "text-blue-600" },
    { Icon: SiRedis, delay: 1.5, x: 25, y: 15, color: "text-red-500" },
    { Icon: FaAws, delay: 2, x: -30, y: -10, color: "text-yellow-500" },
    { Icon: SiDocker, delay: 2.5, x: 10, y: 30, color: "text-blue-400" },
  ];

  const stats = [
    { number: "2+", label: "Years Experience", icon: FaChartLine },
    { number: "40%", label: "Performance Boost", icon: FaRocket },
    { number: "50%", label: "Downtime Reduction", icon: FaShieldAlt },
    { number: "1M+", label: "Messages/Day", icon: FaGlobe },
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
      {/* Dark/Light Mode Toggle */}
      <button
        className="absolute top-8 right-8 z-20 bg-white/10 backdrop-blur-md border border-blue-400 rounded-full p-3 text-blue-400 hover:bg-blue-600/20 transition-all duration-300 hover:scale-110"
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
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 py-16 md:py-32 gap-16 relative z-10">
        
        {/* Main Hero Section */}
        <div className="text-center space-y-8 max-w-5xl">
          {/* Animated Role Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-2xl md:text-3xl text-blue-300 font-medium mb-4">
              Welcome, I'm
            </div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight"
            >
              Vamsi Cheruku
            </motion.h1>
            <div className="h-20 md:h-24 flex items-center justify-center">
              <motion.div
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="text-2xl md:text-4xl font-bold text-blue-200"
              >
                {animatedTexts[currentText]}
              </motion.div>
            </div>
          </motion.div>

          {/* Compelling Description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed">
              I architect and build enterprise-grade backend systems that scale to millions of users.
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At <a href="https://www.zoho.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 font-semibold hover:text-blue-200 underline">Zoho Corporation</a>, I've delivered solutions that process <span className="text-green-300 font-bold">1M+ messages daily</span>, 
              achieving <span className="text-green-300 font-bold">40% performance improvements</span> and <span className="text-green-300 font-bold">50% downtime reduction</span>.
            </p>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                const headerHeight = 80;
                const elementPosition = projectsSection.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer relative z-50"
          >
            <span>Explore My Work</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                const headerHeight = 80;
                const elementPosition = contactSection.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="group flex items-center gap-3 px-8 py-4 border-2 border-blue-400/50 text-blue-300 hover:bg-blue-600/20 hover:border-blue-400 rounded-xl font-semibold transition-all duration-300 cursor-pointer relative z-50"
          >
            <span>Let's Connect</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-green-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Tech Icons */}
      {floatingIcons.map(({ Icon, delay, x, y, color }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} text-4xl md:text-5xl opacity-20`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.2, 
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
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
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