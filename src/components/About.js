import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaDownload, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useInView } from "react-intersection-observer";

function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen flex justify-center items-center bg-white py-20"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: About Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4"
              >
                About Me
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Crafting Digital Solutions with Precision
              </motion.h2>
            </div>

            <motion.div variants={itemVariants} className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                I'm <span className="font-semibold text-gray-900">Vamsi Cheruku</span>, a passionate Software Engineer with 2+ years of experience building robust backend systems and distributed architectures. I specialize in creating scalable solutions that handle millions of users while maintaining optimal performance.
              </p>
              <p>
                At <span className="font-semibold text-blue-600">Zoho Corporation</span>, I've architected and optimized high-performance applications using Java, Spring Boot, and modern database technologies. My expertise spans from microservices architecture to real-time data processing systems.
              </p>
              <p>
                I'm driven by the challenge of solving complex technical problems and turning innovative ideas into production-ready solutions that make a real impact.
              </p>
            </motion.div>

            {/* Key Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Major Projects</div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>Chennai, India</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaEnvelope className="text-blue-600" />
                <span>vamsicheruku027@gmail.com</span>
              </div>
            </motion.div>

            {/* Social Links & Resume */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6">
              <a
                href="https://drive.google.com/file/d/1bEcT9NWQgosE0PDuGiulrzXZwTpFZ8im/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaDownload />
                <span>Download Resume</span>
              </a>
              
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/vamsi-cheruku-05a19a1b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/Vamsi-027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://leetcode.com/18pa1a0531/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <SiLeetcode size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-6"></div>
              <img
                src="/images/profile-pic.png"
                alt="Vamsi Cheruku - Software Engineer"
                className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2+</div>
                  <div className="text-xs text-gray-500">Years Exp.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;