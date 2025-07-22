import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
      id="experience"
      className="py-20 bg-gray-50"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building scalable systems and driving innovation at leading technology companies
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300"></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            <ExperienceCard
              title="Member Technical Staff"
              company="Zoho Corporation"
              duration="July 2022 - July 2024"
              location="Chennai, India"
              type="Full-time"
              achievements={[
                "Architected and developed a high-performance Twitter clone application serving 10,000+ concurrent users",
                "Optimized database queries and implemented Redis caching, reducing response times by 40%",
                "Built real-time messaging system using Kafka, handling 1M+ messages per day",
                "Designed microservices architecture using Java Spring Boot, improving system scalability by 60%",
                "Implemented Elasticsearch for advanced search functionality with 99.9% uptime"
              ]}
              technologies={["Java", "Spring Boot", "MySQL", "Redis", "Elasticsearch", "ArangoDB", "Kafka", "Docker"]}
              logo="https://www.zohowebstatic.com/sites/zweb/images/commonroot/zoho-logo-web.svg"
              link="https://www.zoho.com/"
              isLeft={true}
            />

            <ExperienceCard
              title="Project Trainee"
              company="Zoho Corporation"
              duration="Feb 2022 - July 2022"
              location="Chennai, India"
              type="Internship"
              achievements={[
                "Mastered Linux system administration and network protocols (TCP/IP, DNS, routing)",
                "Contributed to debugging critical production issues, reducing incident resolution time by 25%",
                "Developed and optimized RESTful APIs, improving application throughput by 30%",
                "Collaborated with senior engineers on cloud infrastructure and deployment strategies"
              ]}
              technologies={["Linux", "Networking", "REST APIs", "Cloud Computing", "System Administration"]}
              logo="https://www.zohowebstatic.com/sites/zweb/images/commonroot/zoho-logo-web.svg"
              link="https://www.zoho.com/"
              isLeft={false}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ExperienceCard({ 
  title, 
  company, 
  duration, 
  location, 
  type, 
  achievements, 
  technologies, 
  logo, 
  link, 
  isLeft 
}) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>

      {/* Content Card */}
      <div className={`ml-20 md:ml-0 ${isLeft ? 'md:mr-8 md:ml-0' : 'md:ml-8 md:mr-0'} md:w-1/2`}>
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          {/* Company Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt={`${company} Logo`}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <div className="flex items-center space-x-2">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                  >
                    <span>{company}</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              {type}
            </span>
          </div>

          {/* Duration and Location */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-blue-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{location}</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
            <ul className="space-y-2">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;