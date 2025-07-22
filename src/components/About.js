import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaDownload, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
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
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-blue-50 py-20"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: About Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6"
              >
                About Me
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Backend Developer Specializing in 
                <span className="text-blue-600"> Scalable Systems</span>
              </motion.h2>
            </div>

            <motion.div variants={itemVariants} className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                I'm <span className="font-semibold text-gray-900">Vamsi Cheruku</span>, a passionate Backend Developer with 2+ years of experience at <span className="font-semibold text-blue-600">Zoho Corporation</span>. I specialize in building robust, scalable web applications that handle millions of users while maintaining optimal performance.
              </p>
              <p>
                My expertise spans across <span className="font-semibold">Java Spring Boot, Python Django, database optimization, and cloud technologies</span>. I've architected systems that process over 1M+ messages per day and optimized applications to achieve 40% faster response times.
              </p>
              <p>
                I'm driven by solving complex technical challenges and transforming innovative ideas into production-ready solutions that make a real impact on businesses and users.
              </p>
            </motion.div>

            {/* Key Highlights */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">2+</div>
                <div className="text-sm text-gray-500 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
                <div className="text-sm text-gray-500 font-medium">Technologies</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">5+</div>
                <div className="text-sm text-gray-500 font-medium">Major Projects</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">1M+</div>
                <div className="text-sm text-gray-500 font-medium">Messages/Day</div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />
                  <span>Chennai, India</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaEnvelope className="text-blue-600 flex-shrink-0" />
                  <span>vamsicheruku027@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaPhone className="text-blue-600 flex-shrink-0" />
                  <span>+1 (314) 358-6905</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="font-medium text-green-600">Available for opportunities</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links & Resume */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6">
              <a
                href="https://drive.google.com/file/d/1bEcT9NWQgosE0PDuGiulrzXZwTpFZ8im/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
              >
                <FaDownload />
                <span>Download Resume</span>
              </a>
              
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/vamsi-cheruku-05a19a1b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/Vamsi-027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-800 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://leetcode.com/18pa1a0531/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm"
                >
                  <SiLeetcode size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Professional Image & Stats */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl transform rotate-6 opacity-10"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl transform rotate-3 opacity-5"></div>
              
              {/* Main image container */}
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Professional headshot"
                  className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl"
                />
                
                {/* Floating stats cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2+</div>
                    <div className="text-xs text-gray-500 font-medium">Years at Zoho</div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">40%</div>
                    <div className="text-xs text-gray-500 font-medium">Performance Boost</div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -right-8 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">1M+</div>
                    <div className="text-xs text-gray-500 font-medium">Messages/Day</div>
                  </div>
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