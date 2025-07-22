import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaChevronDown, FaCode, FaServer, FaDatabase } from "react-icons/fa";

function Hero() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

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
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
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

      <div className="text-center px-4 relative z-10 max-w-5xl mx-auto">
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <FaServer className="mr-2" />
            Backend Developer & System Architect
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight"
        >
          Vamsi Cheruku
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto"
        >
          <span className="block mb-2">
            Specializing in <span className="text-blue-400 font-semibold">scalable web applications</span>
          </span>
          <span className="block text-lg md:text-xl text-gray-400">
            Building high-performance backend systems that power modern applications
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          <motion.a
            href="#projects"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View My Projects</span>
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-blue-400/50 text-blue-300 hover:bg-blue-600/20 hover:border-blue-400 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-1">2+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-1">15+</div>
            <div className="text-sm text-gray-400">Technologies</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-1">5+</div>
            <div className="text-sm text-gray-400">Major Projects</div>
          </div>
        </motion.div>
      </div>

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