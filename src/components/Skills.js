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
  SiKubernetes,
  SiJenkins,
  SiPostman,
  SiDjango,
  SiFlutter,
  SiMongodb,
  SiPostgresql,
  SiApachekafka
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
      description: "Building robust server-side applications",
      skills: [
        { name: "Java", icon: FaJava, level: 90, color: "text-orange-500", experience: "2+ years" },
        { name: "Spring Boot", icon: SiSpring, level: 85, color: "text-green-500", experience: "2+ years" },
        { name: "Python", icon: FaPython, level: 80, color: "text-blue-500", experience: "1+ years" },
        { name: "Django", icon: SiDjango, level: 75, color: "text-green-600", experience: "1+ years" },
        { name: "Node.js", icon: FaNodeJs, level: 75, color: "text-green-600", experience: "1+ years" },
      ]
    },
    {
      title: "Databases & Caching",
      description: "Data storage and optimization solutions",
      skills: [
        { name: "MySQL", icon: SiMysql, level: 85, color: "text-blue-600", experience: "2+ years" },
        { name: "PostgreSQL", icon: SiPostgresql, level: 80, color: "text-blue-700", experience: "1+ years" },
        { name: "MongoDB", icon: SiMongodb, level: 75, color: "text-green-500", experience: "1+ years" },
        { name: "Redis", icon: SiRedis, level: 80, color: "text-red-500", experience: "2+ years" },
        { name: "Elasticsearch", icon: SiElasticsearch, level: 75, color: "text-yellow-500", experience: "1+ years" },
      ]
    },
    {
      title: "DevOps & Cloud",
      description: "Deployment and infrastructure management",
      skills: [
        { name: "Docker", icon: FaDocker, level: 85, color: "text-blue-500", experience: "2+ years" },
        { name: "AWS", icon: FaAws, level: 75, color: "text-orange-400", experience: "1+ years" },
        { name: "Kubernetes", icon: SiKubernetes, level: 70, color: "text-blue-600", experience: "6+ months" },
        { name: "Jenkins", icon: SiJenkins, level: 65, color: "text-red-600", experience: "6+ months" },
        { name: "Apache Kafka", icon: SiApachekafka, level: 75, color: "text-gray-800", experience: "1+ years" },
      ]
    },
    {
      title: "Frontend & Mobile",
      description: "User interface and mobile development",
      skills: [
        { name: "React", icon: FaReact, level: 70, color: "text-blue-400", experience: "1+ years" },
        { name: "Flutter", icon: SiFlutter, level: 65, color: "text-blue-500", experience: "6+ months" },
        { name: "Git", icon: FaGitAlt, level: 90, color: "text-orange-600", experience: "2+ years" },
        { name: "Postman", icon: SiPostman, level: 85, color: "text-orange-500", experience: "2+ years" },
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
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
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

        {/* Learning & Growth */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Continuous Learning
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying current with the latest trends, 
              frameworks, and best practices in software development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                Distributed Systems
              </span>
              <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                Machine Learning
              </span>
              <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                GraphQL
              </span>
              <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                Serverless Architecture
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
      <div className={`p-3 bg-white rounded-xl shadow-sm border border-gray-100 ${skill.color}`}>
        <IconComponent size={24} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="font-semibold text-gray-900">{skill.name}</span>
            <span className="text-sm text-gray-500 ml-2">({skill.experience})</span>
          </div>
          <span className="text-sm text-gray-600 font-medium">{skill.level}%</span>
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