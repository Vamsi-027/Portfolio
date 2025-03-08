import { motion } from "framer-motion";

function Header() {
  return (
    <>
      <motion.header
        className="w-full bg-gray-900 text-white p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vamsi Cheruku</h1>
          <nav>
            <ul className="flex space-x-6">
              {/* <li><a href="#home" className="hover:text-gray-400">Home</a></li> */}
              <li>
                <a href="#about" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-gray-400">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-gray-400">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Thin line after the header */}
      <div className="border-t border-gray-700 w-full mt"></div>
    </>
  );
}

export default Header;
