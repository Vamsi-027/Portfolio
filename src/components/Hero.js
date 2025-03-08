import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Hero() {
  const { ref, inView, entry } = useInView({ threshold: 0.3 });

  // Detect scroll direction
  const isScrollingDown =
    entry?.boundingClientRect.top > entry?.rootBounds?.top;

  return (
    <motion.section
      ref={ref}
      id="home"
      className="h-screen flex justify-center items-center bg-gray-900 text-white text-center p-4"
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
      <div>
        <h2 className="text-5xl font-bold">Hello, I'm Vamsi Cheruku.</h2>
        <p className="mt-4 text-xl">Welcome to my portfolio</p>
        <a
          href="#projects"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Check Out My Work
        </a>
      </div>
    </motion.section>
  );
}

export default Hero;
