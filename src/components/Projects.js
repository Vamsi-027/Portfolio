import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-20 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      {/* Section Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
      >
        <h2 className="text-3xl font-bold">My Projects</h2>
        <p className="text-xl text-gray-400 mt-2">Some of my notable work</p>
      </motion.div>

      {/* Project Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          title="RateRateProf"
          description={[
            "Developed a professor-rating web application using Django and React, focusing on scalability and performance.",
            "Implemented AI-based search using Elasticsearch to enhance user experience and query accuracy.",
            "Utilized Docker for containerization and GitHub Actions for CI/CD, streamlining testing and deployment.",
            "Deployed the platform on AWS, ensuring high availability and auto-scaling.",
          ]}
          githubUrl="https://github.com/Vamsi-027/RateRateProf"
        />
        <ProjectCard
          title="Warfin Dose Prediction"
          description={[
            "Preprocessed large-scale clinical datasets, resulting in a 15% increase in model accuracy.",
            "Developed personalized medicine models using KNN, Random Forest, and Neural Networks, reducing dosage prediction errors by 20%",
            "Applied hyperparameter tuning and cross-validation techniques to optimize model performance.",
            "Enhanced precision and recall metrics by 18%, improving the overall predictive capabilities of the models",
          ]}
          // githubUrl="https://github.com/Vamsi-027/Warfin-Dose-Prediction"
        />
        <ProjectCard
          title="Skill Pro"
          description={[
            "Developed a mobile application using Flutter to streamline student performance evaluation and eliminate paper-based documentation.",
            "Enabled faculty to monitor and assess student progress over time, fostering continuous skill improvement.",
            "Integrated features for students to self-check their competencies, promoting self-directed learning and development.",
            "Enhanced post-evaluation follow-up processes, providing a more efficient method for tracking student skill growth.",
          ]}
          githubUrl="https://github.com/Vamsi-027/SkillPro"
        />
      </div>
    </motion.section>
  );
}

function ProjectCard({ title, description, githubUrl }) {
  const { ref, inView, entry } = useInView({ triggerOnce: false, threshold: 0.3 });

  // Determine direction based on scrolling behavior
  const isScrollingDown = entry?.boundingClientRect.top > entry?.rootBounds?.top;

  return (
    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
      <div
        ref={ref}
        className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : isScrollingDown
              ? { opacity: 0, y: 50 } // Scroll down effect (content goes down)
              : { opacity: 0, y: -50 } // Scroll up effect (content goes up)
          }
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="flex-1"
        >
          <h3 className="text-xl font-semibold">{title}</h3>
          <ul className="text-gray-400 mt-2 space-y-2">
            {description.map((point, index) => (
              <li key={index} className="list-disc list-inside">
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </a>
  );
}

export default Projects;
