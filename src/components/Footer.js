import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer() {
  return (
    <motion.footer
      className="py-20 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; 2025 @ Vamsi Cheruku</p>
        <div className="mt-4 flex justify-center">
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/vamsi-cheruku-05a19a1b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-gray-400 hover:text-white"
          >
            <FaLinkedin size={30} />
          </a>

          {/* GitHub Icon */}
          <a
            href="https://github.com/Vamsi-027"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-gray-400 hover:text-white"
          >
            <FaGithub size={30} />
          </a>

          {/* LeetCode Icon */}
          <a
            href="https://leetcode.com/18pa1a0531/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-gray-400 hover:text-white"
          >
            <SiLeetcode size={30} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
