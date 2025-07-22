import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhone, FaPaperPlane } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useInView } from "react-intersection-observer";

function Contact() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Opportunity Discussion - Portfolio Contact');
    const body = encodeURIComponent(
      `Hi Vamsi,\n\nI came across your portfolio and I'm impressed with your backend development expertise.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nLooking forward to connecting with you!\n\nBest regards,\n${formData.name}`
    );
    window.location.href = `mailto:vamsicheruku027@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={ref} id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <FaPaperPlane className="mr-2" />
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I’m always open to discussing new opportunities, challenging projects, and innovative solutions. Let’s connect and explore how I can add value to your team or project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <ContactItem
                  icon={FaEnvelope}
                  title="Email"
                  content="vamsicheruku027@gmail.com"
                  link="mailto:vamsicheruku027@gmail.com"
                  description="Best way to reach me for opportunities"
                />
                <ContactItem
                  icon={FaPhone}
                  title="Phone"
                  content="+1 (314) 358-6905"
                  link="tel:+13143586905"
                  description="Available for calls during business hours"
                />
                <ContactItem
                  icon={FaMapMarkerAlt}
                  title="Location"
                  content="2181 Renault Dr, Maryland Heights, Missouri, Saint Louis, USA"
                  description="Open to remote opportunities worldwide"
                />
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                <SocialLink
                  href="https://www.linkedin.com/in/vamsi-cheruku-05a19a1b4/"
                  icon={FaLinkedin}
                  label="LinkedIn"
                  color="hover:bg-blue-600"
                  description="Professional network"
                />
                <SocialLink
                  href="https://github.com/Vamsi-027"
                  icon={FaGithub}
                  label="GitHub"
                  color="hover:bg-gray-700"
                  description="Code repositories"
                />
                <SocialLink
                  href="https://leetcode.com/18pa1a0531/"
                  icon={SiLeetcode}
                  label="LeetCode"
                  color="hover:bg-orange-500"
                  description="Coding practice"
                />
              </div>
            </div>

            {/* Why Work With Me */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Why Work With Me?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">2+ years of proven experience at Zoho Corporation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Expertise in scalable backend systems & microservices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Strong problem-solving and optimization skills</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Passionate about clean code and best practices</span>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-400/20">
              <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{'< 24h'}</div>
                  <div className="text-sm text-gray-400">Email Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-gray-400">Commitment</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Job Opportunity / Project Discussion / Collaboration"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm"
                    placeholder="Tell me about the opportunity, project requirements, or how we can work together..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <FaPaperPlane />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ContactItem({ icon: Icon, title, content, link, description }) {
  const item = (
    <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10">
      <div className="p-3 bg-blue-600 rounded-xl">
        <Icon className="text-white" size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-blue-300 font-medium">{content}</p>
        {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
      </div>
    </div>
  );

  return link ? (
    <a href={link} className="block">
      {item}
    </a>
  ) : (
    item
  );
}

function SocialLink({ href, icon: Icon, label, color, description }) {
  return (
    <div className="text-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`block p-4 bg-white/5 ${color} text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/10 mb-2`}
        aria-label={label}
      >
        <Icon size={24} />
      </a>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  );
}

export default Contact;