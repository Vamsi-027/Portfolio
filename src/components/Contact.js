import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa"; // Importing email icon
import { useInView } from "react-intersection-observer";

function Contact() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  return (
    <section ref={ref} id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Animated Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          <h2 className="text-4xl font-bold text-center text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-center text-xl mb-12 text-gray-300">
            I would love to hear from you! Whether you have a question, idea, or
            just want to connect, feel free to reach out.
          </p>

          <div className="flex justify-center items-center">
            <div className="bg-white text-gray-800 rounded-full p-4 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
              <a
                href="mailto:vamsicheruku027@gmail.com"
                className="flex items-center space-x-3 text-lg"
              >
                <FaEnvelope size={30} /> {/* Email Icon */}
                <span>vamsicheruku027@gmail.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
