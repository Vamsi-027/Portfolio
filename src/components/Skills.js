import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaJava, 
  FaPython, 
  FaReact, 
  FaNodeJs, 
  FaDocker, 
  FaGitAlt, 
  FaAws,
  FaDatabase
} from "react-icons/fa";
import { 
  SiSpring, 
  SiMysql, 
  SiRedis, 
  SiElasticsearch, 
  SiKafka,
  SiKubernetes,
  SiJenkins,
  SiPostman
} from "react-icons/si";

function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skillCategories = [
    {
      title: "Backend Development",
      skills: [
        { name: "Java", icon: FaJava, level: 90, color: "text-orange-500" },
        { name: "Spring Boot", icon: SiSpring, level: 85, color: "text-green-500" },
        { name: "Python", icon: FaPython, level: 80, color: "text-blue-500" },
        { name: "Node.js", icon: FaNodeJs, level: 75, color: "text-green-600" },
      ]
    },
    {
      title: "Databases & Caching",
      skills: [
        { name: "MySQL", icon: SiMysql, level: 85, color: "text-blue-600" },
        { name: "Redis", icon: SiRedis, level: 80, color: "text-red-500" },
        { name: "Elasticsearch", icon: SiElasticsearch, level: 75, color: "text-yellow-500" },
        { name: "ArangoDB", icon: FaDatabase, level: 70, color: "text-purple-500" },
      ]
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", icon: FaDocker, level: 85, color: "text-blue-500" },
        { name: "AWS", icon: FaAws, level: 75, color: "text-orange-400" },
        { name: "Kubernetes", icon: SiKubernetes, level: 70, color: "text-blue-600" },
        { name: "Jenkins", icon: SiJenkins, level: 65, color: "text-red-600" },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: FaGitAlt, level: 90, color: "text-orange-600" },
        { name: "Kafka", icon: SiKafka, level: 75, color: "text-gray-800" },
        { name: "React", icon: FaReact, level: 70, color: "text-blue-400" },
        { name: "Postman", icon: SiPostman, level: 85, color: "text-orange-500" },
      ]
    }
  ];

  return (
    <section
      ref={ref}
      id="skills"
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
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proficient in modern technologies and frameworks for building scalable, high-performance applications
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.2 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Always Learning
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying current with the latest trends, 
              frameworks, and best practices in software development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm">
                Microservices Architecture
              </span>
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm">
                System Design
              </span>
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm">
                Performance Optimization
              </span>
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm">
                Distributed Systems
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SkillItem({ skill, delay }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const IconComponent = skill.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex items-center space-x-4"
    >
      <div className={`p-3 bg-white rounded-lg shadow-sm ${skill.color}`}>
        <IconComponent size={24} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-900">{skill.name}</span>
          <span className="text-sm text-gray-600">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Skills;