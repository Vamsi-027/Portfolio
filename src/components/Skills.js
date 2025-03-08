import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";
import AiAnimation from "../lottie/ai.json";
import ArangoAnimation from "../lottie/arango.json";
import CAnimation from "../lottie/c.json";
import CSSAnimation from "../lottie/css.json";
import DockerAnimation from "../lottie/docker.json";
import GitAnimation from "../lottie/git.json";
import HtmlAnimation from "../lottie/html.json";
import MongoAnimation from "../lottie/mongo.json";
import MySqlAnimation from "../lottie/mysql.json";

function Skills() {
  const { ref, inView, entry } = useInView({ threshold: 0.3 });

  // Detect scroll direction
  const isScrollingDown =
    entry?.boundingClientRect.top > entry?.rootBounds?.top;

  return (
    <motion.section
      ref={ref}
      id="skills"
      className="py-20 bg-white text-gray-800"
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
      {/* Skills Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Skills</h2>
      </div>

      {/* Skills Icons in Grid Layout */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-6 justify-center items-center">
          {skillsData.map((skill, index) => (
            <SkillItem
              key={index}
              animationData={skill.animation}
              name={skill.name}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const skillsData = [
  { name: "AI", animation: AiAnimation },
  { name: "Arango", animation: ArangoAnimation },
  { name: "C", animation: CAnimation },
  { name: "CSS", animation: CSSAnimation },
  { name: "Docker", animation: DockerAnimation },
  { name: "Git", animation: GitAnimation },
  { name: "HTML", animation: HtmlAnimation },
  { name: "MongoDB", animation: MongoAnimation },
  { name: "MySQL", animation: MySqlAnimation },
];

function SkillItem({ animationData, name }) {
  const { ref, inView, entry } = useInView({ threshold: 0.3 });

  // Detect scroll direction
  const isScrollingDown =
    entry?.boundingClientRect.top > entry?.rootBounds?.top;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : isScrollingDown
          ? { opacity: 0, y: 50 }
          : { opacity: 0, y: -50 }
      }
      transition={{ duration: 1.0, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <Lottie animationData={animationData} className="w-32 h-32" />
      <p className="mt-2">{name}</p>
    </motion.div>
  );
}

export default Skills;
