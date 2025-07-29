import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaExternalLinkAlt, FaStar, FaRocket } from "react-icons/fa";

function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
            <FaRocket className="mr-2" />
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Projects & Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing innovative backend solutions and full-stack applications that solve real-world problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProjectCard
            title="SaamCars - Inventory Management System"
            description="Full-stack inventory management application for automotive dealers with real-time stock tracking and image management capabilities. Deployed on Vercel (frontend) and Render (backend)."
            longDescription={["Built responsive React TypeScript frontend with modern UI/UX for seamless inventory operations.", "Implemented secure Node.js Express backend with PostgreSQL database and Firebase image storage integration."]}
            technologies={["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Firebase", "Vercel", "Render"]}
            githubUrls={{ Frontend: "https://github.com/vamsi-rebounz/SaamCars-FE", Backend: "https://github.com/vamsi-rebounz/SamCars-BE" }}
            liveUrl="https://www.saamcars.com"
            metrics={{ deployment: "Live", storage: "Firebase" }}
            category="Full-Stack"
            featured={true}
          />
          <ProjectCard
            title="Multi-Organ Detection in Laparoscopic Videos Using Diffusion Models"
            description="Developed and trained multi-organ segmentation and detection models using U-Net and YOLOv11 on the CholecSeg8k dataset. Achieved up to 0.995 mAP50 for critical anatomical structures."
            longDescription={["Preprocessed and annotated 8,000+ laparoscopic frames, converting semantic masks into YOLO-compatible labels.", "Generated synthetic surgical images using diffusion models to augment training data and improve generalization."]}
            technologies={["Python", "U-Net", "YOLOv11", "Diffusion Models", "CholecSeg8k"]}
            githubUrl="https://github.com/nagatharun/Enhance-Data-Diversity-and-Robustness"
            metrics={{ mAP50: "0.995", frames: "8K+" }}
            category="Medical AI"
          />
          <ProjectCard
            title="Warfarin Dose Prediction"
            description="Built personalized medicine models using KNN, Random Forest, and Neural Networks, reducing dosage prediction errors by 20%."
            longDescription={["Preprocessed large-scale clinical datasets, increasing model accuracy by 15%.", "Applied hyperparameter tuning and cross-validation, improving precision and recall by 18%." ]}
            technologies={["Python", "KNN", "Random Forest", "Neural Networks"]}
            githubUrl="https://github.com/Vamsi-027/Warfin-Dose-Prediction"
            metrics={{ accuracy: "15%+", errorReduction: "20%" }}
            category="Healthcare ML"
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Interested in seeing more of my work and technical implementations?
          </p>
          <a
            href="https://github.com/Vamsi-027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaGithub />
            <span>View All Projects on GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectCard({ 
  title, 
  description, 
  longDescription, 
  technologies, 
  githubUrl, 
  githubUrls = {},
  liveUrl, 
  featured = false,
  metrics = {},
  category
}) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${
        featured ? 'ring-2 ring-blue-500/20 shadow-blue-100' : ''
      }`}
    >
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            <FaStar size={12} />
            <span>Featured</span>
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Project Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Metrics */}
        {Object.keys(metrics).length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-blue-600">{value}</div>
                <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Description */}
        <div className="mb-6">
          <h4 className="text-gray-900 font-semibold mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {longDescription.slice(0, 3).map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h4 className="text-gray-900 font-semibold mb-3">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          {Object.keys(githubUrls).length > 0 ? (
            // Multiple GitHub repositories
            <>
              {Object.entries(githubUrls).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  <FaGithub />
                  <span>{label}</span>
                </a>
              ))}
            </>
          ) : (
            // Single GitHub repository
            githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
              >
                <FaGithub />
                <span>View Code</span>
              </a>
            )
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;