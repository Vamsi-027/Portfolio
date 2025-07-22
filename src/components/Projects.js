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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <ProjectCard
            title="RateRateProf"
            description="A comprehensive professor-rating platform built for scalability and performance"
            longDescription={[
              "Developed a full-stack web application using Django and React with focus on user experience and scalability",
              "Implemented AI-powered search using Elasticsearch for intelligent query processing and instant results",
              "Utilized Docker containerization and GitHub Actions for automated CI/CD pipeline and seamless deployments",
              "Deployed on AWS with auto-scaling capabilities to handle traffic spikes and ensure high availability",
              "Integrated user authentication, rating system, and real-time notifications for enhanced user engagement"
            ]}
            technologies={["Django", "React", "Elasticsearch", "Docker", "AWS", "PostgreSQL", "Redis", "GitHub Actions"]}
            githubUrl="https://github.com/Vamsi-027/RateRateProf"
            featured={true}
            metrics={{ users: "1000+", rating: "4.8/5", uptime: "99.9%" }}
            category="Full-Stack Web Application"
          />

          <ProjectCard
            title="Warfin Dose Prediction"
            description="Machine learning system for personalized medicine dosage prediction"
            longDescription={[
              "Preprocessed large-scale clinical datasets with 15% improvement in model accuracy through advanced feature engineering",
              "Developed ML models using KNN, Random Forest, and Neural Networks with comprehensive hyperparameter tuning",
              "Applied cross-validation and ensemble methods for optimal performance and model reliability",
              "Enhanced precision and recall metrics by 18% through advanced feature selection and data preprocessing",
              "Created interactive dashboard for healthcare professionals to input patient data and get dosage recommendations"
            ]}
            technologies={["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Jupyter", "Flask", "Plotly"]}
            githubUrl="https://github.com/Vamsi-027/Warfin-Dose-Prediction"
            metrics={{ accuracy: "92%", improvement: "20%", datasets: "10K+" }}
            category="Machine Learning & Healthcare"
          />

          <ProjectCard
            title="SkillPro"
            description="Mobile application for streamlined student performance evaluation"
            longDescription={[
              "Built cross-platform mobile app using Flutter for iOS and Android with native performance",
              "Eliminated paper-based documentation with digital evaluation system, saving 80% processing time",
              "Enabled real-time progress tracking and competency assessment with interactive dashboards",
              "Integrated analytics dashboard for performance insights and comprehensive reporting features",
              "Implemented offline-first architecture for seamless usage in areas with poor connectivity"
            ]}
            technologies={["Flutter", "Dart", "Firebase", "SQLite", "REST APIs", "Node.js", "Express"]}
            githubUrl="https://github.com/Vamsi-027/SkillPro"
            metrics={{ downloads: "500+", rating: "4.6/5", schools: "10+" }}
            category="Mobile Application"
          />

          <ProjectCard
            title="E-Commerce Backend API"
            description="Scalable REST API for e-commerce platform with advanced features"
            longDescription={[
              "Built comprehensive REST API using Node.js and Express with JWT authentication and role-based access control",
              "Implemented advanced features like product search, filtering, pagination, and real-time inventory management",
              "Integrated payment gateway (Stripe) and order management system with automated email notifications",
              "Optimized database queries and implemented caching strategies for improved performance",
              "Added comprehensive API documentation using Swagger and implemented rate limiting for security"
            ]}
            technologies={["Node.js", "Express", "MongoDB", "JWT", "Stripe", "Redis", "Swagger", "Docker"]}
            githubUrl="https://github.com/Vamsi-027/ecommerce-api"
            metrics={{ endpoints: "50+", response: "<100ms", uptime: "99.8%" }}
            category="Backend API Development"
          />

          <ProjectCard
            title="Real-Time Chat Application"
            description="Scalable chat application with WebSocket support and message persistence"
            longDescription={[
              "Developed real-time chat application using Socket.io with support for multiple chat rooms and private messaging",
              "Implemented message persistence using MongoDB with efficient indexing for fast message retrieval",
              "Added features like typing indicators, message status, file sharing, and emoji reactions",
              "Built responsive frontend using React with real-time updates and smooth user experience",
              "Deployed using Docker containers with load balancing for handling concurrent users"
            ]}
            technologies={["Socket.io", "React", "Node.js", "MongoDB", "Redis", "Docker", "Nginx"]}
            githubUrl="https://github.com/Vamsi-027/realtime-chat"
            metrics={{ users: "2K+", messages: "100K+", latency: "<50ms" }}
            category="Real-Time Application"
          />
        </div>

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
        <div className="flex space-x-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
          >
            <FaGithub />
            <span>View Code</span>
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
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