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
        <p>Copyright © Vamsi Cheruku 2025 All rights Reserved</p>
      </div>
    </motion.footer>
  );
}

export default Footer;
