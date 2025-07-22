import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from "react-icons/fa";

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
      className="py-20 bg-gray-900"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative solutions and technical expertise through real-world applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <ProjectCard
            title="RateRateProf"
            description="A comprehensive professor-rating platform built for scalability and performance"
            longDescription={[
              "Developed a full-stack web application using Django and React with focus on user experience",
              "Implemented AI-powered search using Elasticsearch for intelligent query processing",
              "Utilized Docker containerization and GitHub Actions for automated CI/CD pipeline",
              "Deployed on AWS with auto-scaling capabilities to handle traffic spikes"
            ]}
            technologies={["Django", "React", "Elasticsearch", "Docker", "AWS", "PostgreSQL"]}
            githubUrl="https://github.com/Vamsi-027/RateRateProf"
            featured={true}
            metrics={{ users: "1000+", rating: "4.8/5", uptime: "99.9%" }}
          />

          <ProjectCard
            title="Warfin Dose Prediction"
            description="Machine learning system for personalized medicine dosage prediction"
            longDescription={[
              "Preprocessed large-scale clinical datasets with 15% improvement in model accuracy",
              "Developed ML models using KNN, Random Forest, and Neural Networks",
              "Applied hyperparameter tuning and cross-validation for optimal performance",
              "Enhanced precision and recall metrics by 18% through advanced feature engineering"
            ]}
            technologies={["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Jupyter"]}
            githubUrl="https://github.com/Vamsi-027/Warfin-Dose-Prediction"
            metrics={{ accuracy: "92%", improvement: "20%", datasets: "10K+" }}
          />

          <ProjectCard
            title="SkillPro"
            description="Mobile application for streamlined student performance evaluation"
            longDescription={[
              "Built cross-platform mobile app using Flutter for iOS and Android",
              "Eliminated paper-based documentation with digital evaluation system",
              "Enabled real-time progress tracking and competency assessment",
              "Integrated analytics dashboard for performance insights and reporting"
            ]}
            technologies={["Flutter", "Dart", "Firebase", "SQLite", "REST APIs"]}
            githubUrl="https://github.com/Vamsi-027/SkillPro"
            metrics={{ downloads: "500+", rating: "4.6/5", schools: "10+" }}
          />
        </div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Interested in seeing more of my work?
          </p>
          <a
            href="https://github.com/Vamsi-027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
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
  liveUrl, 
  featured = false,
  metrics = {}
}) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        featured ? 'ring-2 ring-blue-500/50' : ''
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
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>

        {/* Metrics */}
        {Object.keys(metrics).length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-700/50 rounded-lg">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-blue-400">{value}</div>
                <div className="text-xs text-gray-400 capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Description */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {longDescription.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h4 className="text-white font-semibold mb-3">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
          >
            <FaGithub />
            <span>Code</span>
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
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