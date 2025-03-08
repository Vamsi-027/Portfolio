import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useInView } from "react-intersection-observer";

function About() {
  const { ref, inView, entry } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Determine direction based on scrolling behavior
  const isScrollingDown =
    entry?.boundingClientRect.top > entry?.rootBounds?.top;

  return (
    <section
      ref={ref}
      id="about"
      className="h-screen flex justify-center items-center bg-gray-900 text-white text-center p-4"
    >
      <motion.div
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : isScrollingDown
            ? { opacity: 0, y: 50 } // Scroll down effect (content goes down)
            : { opacity: 0, y: -50 } // Scroll up effect (content goes up)
        }
        transition={{ duration: 1.0, ease: "easeInOut" }}
      >
        {/* Left: About Text */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : isScrollingDown
              ? { opacity: 0, y: 50 }
              : { opacity: 0, y: -50 }
          }
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg leading-relaxed">
            Results-driven Software Engineer with experience in backend
            development, distributed systems, and cloud computing. Skilled in
            designing, implementing, and optimizing scalable backend services.
          </p>
          
          {/* Social Icons with Text */}
          <div className="mt-6 flex justify-center md:justify-start space-x-6">
            <div className="flex items-center space-x-2">
              <a
                href="https://www.linkedin.com/in/vamsi-cheruku-05a19a1b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white flex items-center space-x-2"
              >
                <FaLinkedin size={30} />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/Vamsi-027"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white flex items-center space-x-2"
              >
                <FaGithub size={30} />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href="https://leetcode.com/18pa1a0531/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white flex items-center space-x-2"
              >
                <SiLeetcode size={30} />
                <span className="text-sm">LeetCode</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Image & Resume Button */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : isScrollingDown
              ? { opacity: 0, y: 50 }
              : { opacity: 0, y: -50 }
          }
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          <img
            src="/images/profile-pic.png"
            alt="Profile Picture"
            className="w-96 h-96 object-cover rounded-full shadow-lg mx-auto"
          />
          <a
            href="https://drive.google.com/file/d/1bEcT9NWQgosE0PDuGiulrzXZwTpFZ8im/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
