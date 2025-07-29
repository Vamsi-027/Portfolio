import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaBriefcase } from "react-icons/fa";

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
      className="py-20 bg-white"
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
            <FaBriefcase className="mr-2" />
            Professional Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Experience & Impact
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
          <div className="space-y-16">
            <ExperienceCard
              title="Member Technical Staff"
              company="Zoho Corporation"
              duration="July 2022 - July 2024"
              location="Chennai, India"
              type="Full-time"
              achievements={[
                "Architected and developed a high-performance Twitter clone application serving 10,000+ concurrent users with real-time features",
                "Optimized database queries and implemented Redis caching, reducing response times by 40% and improving user experience",
                "Built scalable real-time messaging system using Apache Kafka, processing 1M+ messages per day with 99.9% uptime",
                "Designed microservices architecture using Java Spring Boot, improving system scalability by 60% and enabling horizontal scaling",
                "Implemented advanced search functionality with Elasticsearch, achieving sub-second query response times for complex searches",
                "Led performance optimization initiatives that reduced server costs by 25% while handling increased traffic load"
              ]}
              technologies={["Java", "Spring Boot", "MySQL", "Redis", "Elasticsearch", "ArangoDB", "Apache Kafka", "Docker", "Microservices"]}
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
                "Mastered Linux system administration, network protocols (TCP/IP, DNS, routing), and server management fundamentals",
                "Contributed to debugging critical production issues, reducing incident resolution time by 25% through systematic troubleshooting",
                "Developed and optimized RESTful APIs using Java Spring Boot, improving application throughput by 30%",
                "Collaborated with senior engineers on cloud infrastructure deployment and monitoring strategies",
                "Gained hands-on experience with database design, query optimization, and performance tuning techniques"
              ]}
              technologies={["Linux", "Networking", "REST APIs", "Java", "Spring Boot", "MySQL", "System Administration"]}
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
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>

      {/* Content Card */}
      <div className={`ml-20 md:ml-0 ${isLeft ? 'md:mr-8 md:ml-0' : 'md:ml-8 md:mr-0'} md:w-1/2`}>
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
          {/* Company Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src={logo}
                  alt={`${company} Logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <div className="flex items-center space-x-2">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 transition-colors"
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
              <span className="font-medium">{duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{location}</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Key Achievements:</h4>
            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed text-sm">{achievement}</span>
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