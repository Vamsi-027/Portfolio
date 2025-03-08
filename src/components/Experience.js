import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

function Experience() {
  return (
    <section
      id="experience"
      className="h-screen py-20 bg-gray-100 text-gray-800"
    >
      {/* Work Experience Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Work Experience</h2>
        <p className="text-xl text-gray-600 mt-2">
          A glimpse of my career journey.
        </p>
      </div>

      {/* Work Experience Entries */}
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <ExperienceCard
          title="Member Technical Staff"
          company="Zoho Corporation"
          duration="July 2022 - July 2024"
          description={[
            "My primary task was working as a backend engineer on building and optimizing a Twitter clone application.",
            " I utilized Java, Apache Struts, MySQL, Redis, Elasticsearch, ArangoDB, and Kafka to design scalable backend services, enhance data retrieval speed, and implement efficient caching and search solutions.",
            " I focused on improving user interactions, ensuring secure data management, and optimizing performance in a high-scale environment.",
          ]}
          logo="https://www.zohowebstatic.com/sites/zweb/images/commonroot/zoho-logo-web.svg"
          link="https://www.zoho.com/"
        />

        <ExperienceCard
          title="Project Trainee"
          company="Zoho Corporation"
          duration="Feb 2022 - July 2022"
          description={[
            "Gained proficiency in Linux administration, networking (TCP/IP, DNS, routing), and cloud computing.", 
            " Contributed to debugging large-scale system issues, reducing incident resolution time.",
            " Developed and optimized RESTful APIs and backend logic, improving application throughput.",
          ]}
            logo="https://www.zohowebstatic.com/sites/zweb/images/commonroot/zoho-logo-web.svg"
          link="https://www.zoho.com/"
        />
      </div>
    </section>
  );
}

function ExperienceCard({ title, company, duration, description, logo, link }) {
  const { ref, inView, entry } = useInView({ threshold: 0.3 });
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (entry) {
        const newDirection =
          entry.boundingClientRect.top < entry.rootBounds.top ? "down" : "up";
        setScrollDirection(newDirection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [entry]);

  const motionVariants = {
    hidden: { opacity: 0, y: scrollDirection === "down" ? 50 : -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: scrollDirection === "down" ? -50 : 50 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "exit"}
      variants={motionVariants}
      transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
      className="flex flex-col md:flex-row items-center text-center md:text-left border-l-4 border-gray-300 pl-4 space-y-4 md:space-y-0 md:space-x-4 py-6"
    >
      {/* Left Side: Company Logo with Animation */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "exit"}
        variants={motionVariants}
        transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
        className="md:w-1/3 flex justify-center md:justify-start"
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={logo}
            alt={`${company} Logo`}
            className="w-40 h-40 object-contain"
          />
        </a>
      </motion.div>

      {/* Right Side: Role, Dates, and Description with Animation */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "exit"}
        variants={motionVariants}
        transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
        className="md:w-2/3 mt-4 md:mt-0"
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex items-center space-x-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-blue-600 hover:underline"
          >
            {company}
          </a>
        </div>
        <h3 className="text-l font-semibold">{duration}</h3>
        <p className="text-gray-700 mt-4">
          <ul>
            <li>{description}</li>
          </ul>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Experience;
