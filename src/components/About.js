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
          <motion.div variants={itemVariants} className="space-y-10">
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
                My Journey as a Backend Engineer
              </motion.h2>
            </div>
            <motion.div variants={itemVariants} className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                I’m <span className="font-semibold text-gray-900">Vamsi Cheruku</span>, a backend engineer passionate about building scalable, reliable, and high-impact systems. My journey began with a love for problem-solving and has led me to architect mission-critical applications at <span className="font-semibold text-blue-600">Zoho Corporation</span> and beyond.
              </p>
              <p>
                I believe great engineering is about clarity, collaboration, and continuous improvement. I thrive on designing systems that are robust, maintainable, and deliver measurable results for users and businesses.
              </p>
              <p>
                <span className="font-semibold">Soft skills:</span> Teamwork, reliability, and a growth mindset.
              </p>
            </motion.div>
            {/* Key Achievements */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">2+</div>
                <div className="text-sm text-gray-500 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">8K+</div>
                <div className="text-sm text-gray-500 font-medium">Frames Annotated</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">1M+</div>
                <div className="text-sm text-gray-500 font-medium">Messages/Day</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">40%</div>
                <div className="text-sm text-gray-500 font-medium">Performance Boost</div>
              </div>
            </motion.div>
            {/* Contact Info & Resume */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6 items-center">
              <a
                href="https://drive.google.com/file/d/1Ic1DF0AZ9FKnnwCnxWRlvdV3YLHXFvro/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
              >
                <FaDownload />
                <span>Download Resume</span>
              </a>
              <a
                href="https://leetcode.com/18pa1a0531/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm ml-2"
                aria-label="LeetCode"
              >
                <SiLeetcode size={20} />
              </a>
              <a
                href="mailto:vamsicheruku027@gmail.com"
                className="p-3 bg-white border border-gray-200 text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm ml-2"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
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
              </div>
              <div className="flex flex-col space-y-1 text-gray-700 text-base ml-4">
                <div><span className="font-semibold">Location:</span> 2181 Renault Dr, Maryland Heights, Missouri, Saint Louis, USA</div>
                <div><span className="font-semibold">Email:</span> vamsicheruku027@gmail.com</div>
                <div><span className="font-semibold">Phone:</span> +1 (314) 358-6905</div>
              </div>
              <span className="inline-flex items-center px-3 py-1 bg-green-600/20 text-green-600 rounded-full text-sm ml-4">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Open to new opportunities
              </span>
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
                  src="/images/profile-pic.png"
                  alt="Vamsi Cheruku professional headshot"
                  className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl border-4 border-white/20 shadow-2xl"
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