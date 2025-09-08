'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiMail, 
  FiLinkedin, 
  FiGithub, 
  FiClock, 
  FiSend,
  FiCheckCircle,
  FiExternalLink
} from 'react-icons/fi'

const contactMethods = [
  {
    id: 'email',
    icon: FiMail,
    title: 'Email',
    value: 'vamsicheruku027@gmail.com',
    href: 'mailto:vamsicheruku027@gmail.com',
    description: 'Best for detailed discussions and project inquiries',
    responseTime: 'Usually within 24 hours',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    primary: true
  },
  {
    id: 'linkedin',
    icon: FiLinkedin,
    title: 'LinkedIn',
    value: 'Connect professionally',
    href: 'https://linkedin.com/in/vamsi-cheruku-05a19a1b4',
    description: 'Professional networking and career discussions',
    responseTime: 'Active daily',
    gradient: 'from-blue-600 to-blue-700',
    bgGradient: 'from-blue-50 to-indigo-100',
    primary: false
  },
  {
    id: 'github',
    icon: FiGithub,
    title: 'GitHub',
    value: 'View my code',
    href: 'https://github.com/Vamsi-027',
    description: 'Explore my repositories and contributions',
    responseTime: 'Updated daily',
    gradient: 'from-neutral-700 to-neutral-800',
    bgGradient: 'from-neutral-50 to-neutral-100',
    primary: false
  }
]

const availability = {
  status: 'Available',
  statusColor: 'text-emerald-600',
  statusBg: 'bg-emerald-100',
  timezone: 'IST (UTC+5:30)',
  workingHours: '9:00 AM - 6:00 PM IST',
  location: 'Chennai, India',
  openToRemote: true,
  openToRelocate: true
}


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    projectType: '',
    timeline: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        message: '',
        projectType: '',
        timeline: ''
      })
    }, 5000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section 
      id="contact" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-blue-50"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <img 
            src="/images/profile-pic.jpg" 
            alt="Vamsi Cheruku" 
            className="w-24 h-24 rounded-full object-cover border-4 border-primary-600/20 mx-auto mb-6"
          />
          <div className={`inline-flex items-center space-x-2 ${availability.statusBg} ${availability.statusColor} px-4 py-2 rounded-full text-sm font-medium mb-6`}>
            <div className={`w-2 h-2 ${availability.statusColor.replace('text-', 'bg-')} rounded-full animate-pulse`} />
            <span>{availability.status} for opportunities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Let's Build Something
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
              Exceptional Together
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Ready to discuss how I can contribute to your team's success. Whether it's a full-time role, 
            contract project, or technical consultation, I'm here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information & Quick Actions */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            


            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900">Contact Methods</h3>
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.id}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`block p-4 bg-gradient-to-r ${method.bgGradient} border border-neutral-200 rounded-xl hover:shadow-lg transition-all duration-300 group ${
                    method.primary ? 'ring-2 ring-primary-200' : ''
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${method.gradient} text-white flex-shrink-0`}>
                      <method.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-neutral-900 mb-1">{method.title}</div>
                      <div className="text-sm text-primary-600 font-medium mb-1">{method.value}</div>
                      <div className="text-xs text-neutral-600 leading-relaxed">{method.description}</div>
                      <div className="text-xs text-neutral-500 mt-2">{method.responseTime}</div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <FiSend className="w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-bold">Start a Conversation</h3>
                    <p className="text-primary-100 mt-1">Tell me about your project or opportunity</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Your Role
                        </label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="e.g. CTO, Hiring Manager, etc."
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Opportunity Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select type</option>
                          <option value="full-time">Full-time Position</option>
                          <option value="contract">Contract Project</option>
                          <option value="consultation">Technical Consultation</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (ASAP)</option>
                          <option value="1-2-weeks">1-2 weeks</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                        placeholder="Tell me about your project, team, tech stack, challenges you're facing, and how I can help..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isSubmitting 
                          ? 'opacity-75 cursor-not-allowed' 
                          : 'hover:from-primary-700 hover:to-purple-700 hover:shadow-lg'
                      }`}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>

                    {/* Form Footer */}
                    <div className="text-center text-sm text-neutral-500 pt-4">
                      I typically respond within 24 hours. For urgent matters, 
                      <a 
                        href="mailto:vamsicheruku027@gmail.com" 
                        className="text-primary-600 hover:text-primary-700 font-medium ml-1"
                      >
                        email me directly
                      </a>.
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiCheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-lg text-neutral-600 mb-6 max-w-md mx-auto">
                      Thank you for reaching out. I'll review your message and get back to you within 24 hours.
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                      <FiClock className="w-4 h-4" />
                      <span>Expected response: Within 24 hours</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants} 
          className="text-center mt-16 pt-8 border-t border-neutral-200"
        >
          <p className="text-neutral-600 mb-2">
            Built with passion using Next.js, Tailwind CSS, and Framer Motion
          </p>
          <p className="text-neutral-500">
            © 2024 Vamsi Cheruku. Engineering solutions that drive measurable business impact.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}