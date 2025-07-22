import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaHeart, FaArrowUp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="bg-gray-900 border-t border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Vamsi Cheruku
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Software Engineer passionate about building scalable backend systems 
              and creating innovative solutions that make a difference.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/vamsi-cheruku-05a19a1b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/Vamsi-027"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://leetcode.com/18pa1a0531/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-orange-500 text-gray-400 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                aria-label="LeetCode"
              >
                <SiLeetcode size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { href: "#about", label: "About" },
                { href: "#experience", label: "Experience" },
                { href: "#projects", label: "Projects" },
                { href: "#skills", label: "Skills" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>Chennai, India</p>
              <a 
                href="mailto:vamsicheruku027@gmail.com"
                className="block hover:text-white transition-colors duration-300"
              >
                vamsicheruku027@gmail.com
              </a>
              <p className="text-sm">
                Open to new opportunities and exciting projects
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>© 2025 Vamsi Cheruku. Made with</span>
            <FaHeart className="text-red-500" size={16} />
            <span>and lots of coffee</span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaArrowUp size={16} />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;