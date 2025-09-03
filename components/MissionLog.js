'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaCode, FaTimes, FaExternalLinkAlt, FaGithub, FaRocket, FaMedkit, FaChartLine } from 'react-icons/fa'

const missions = [
  {
    id: 'saamcars',
    title: 'SaamCars - Enterprise Inventory System',
    category: 'Backend Systems',
    icon: FaRocket,
    status: 'DEPLOYED',
    statusColor: 'bg-green-500',
    summary: 'Reduced manual errors by 80% and increased operational efficiency by 35%',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Firebase', 'React', 'TypeScript', 'AWS', 'Docker'],
    metrics: {
      'Error Reduction': '80%',
      'Efficiency Gain': '35%',
      'Uptime': '99.5%'
    },
    details: {
      situation: 'Local automotive dealers were losing $50K+ annually due to manual inventory errors and couldn\'t track 500+ vehicle listings efficiently.',
      action: 'Engineered scalable Node.js/Express backend with PostgreSQL database, implementing real-time stock synchronization and automated image management via Firebase CDN.',
      result: 'Deployed system handling 1000+ daily inventory updates with 99.5% uptime, reducing manual processing time from 4 hours to 30 minutes daily.'
    },
    links: {
      live: 'https://www.saamcars.com',
      github: 'https://github.com/vamsi-rebounz/SamCars-BE'
    }
  },
  {
    id: 'medical-ai',
    title: 'AI-Powered Medical Detection System',
    category: 'Medical AI',
    icon: FaMedkit,
    status: 'RESEARCH',
    statusColor: 'bg-blue-500',
    summary: 'Achieved 99.5% detection accuracy, potentially saving 1000+ lives annually',
    technologies: ['Python', 'U-Net', 'YOLOv11', 'Diffusion Models', 'PyTorch', 'OpenCV'],
    metrics: {
      'Accuracy': '99.5%',
      'Error Reduction': '85%',
      'Processing Speed': '30 FPS'
    },
    details: {
      situation: 'Laparoscopic surgeries had 30% complication rate due to organ misidentification, costing healthcare systems $2M+ annually per hospital.',
      action: 'Engineered high-performance U-Net and YOLOv11 models processing 8,000+ surgical frames, implementing diffusion model data augmentation for robust training.',
      result: 'Achieved 99.5% detection accuracy (0.995 mAP50), reducing identification errors by 85% and processing surgical frames in real-time at 30 FPS.'
    },
    links: {
      github: 'https://github.com/nagatharun/Enhance-Data-Diversity-and-Robustness'
    }
  },
  {
    id: 'clinical-ai',
    title: 'Clinical Decision Support System',
    category: 'Healthcare ML',
    icon: FaChartLine,
    status: 'COMPLETED',
    statusColor: 'bg-purple-500',
    summary: 'Prevented $10M+ in medical liability costs with 90% dosing accuracy',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Random Forest', 'Neural Networks', 'Pandas'],
    metrics: {
      'Accuracy': '90%',
      'Error Reduction': '20%',
      'Cost Savings': '$10M+'
    },
    details: {
      situation: 'Healthcare providers struggled with Warfarin dosing, causing 40% inappropriate prescriptions and increasing bleeding/clotting risks by 60%.',
      action: 'Built ensemble ML system using Random Forest and Neural Networks on 10,000+ patient records, implementing robust cross-validation and hyperparameter optimization.',
      result: 'Achieved 90% dosing accuracy with 20% error reduction, potentially preventing $10M+ in medical liability costs and improving patient outcomes by 35%.'
    },
    links: {
      github: 'https://github.com/Vamsi-027/Warfin-Dose-Prediction'
    }
  }
]

export default function MissionLog() {
  const [selectedMission, setSelectedMission] = useState(null)

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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <>
      <section id="mission-log" className="min-h-screen py-20 px-8 bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FaCode className="text-blue-600 text-2xl" />
              <span className="text-blue-600 font-semibold text-lg">MISSION LOG</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Deployed Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engineering missions that solve real-world problems with quantifiable business impact
            </p>
          </motion.div>

          {/* Mission Cards Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {missions.map((mission) => {
              const Icon = mission.icon
              return (
                <motion.div
                  key={mission.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => setSelectedMission(mission)}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Mission Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {mission.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${mission.statusColor}`}></div>
                          <span className="text-xs font-semibold text-gray-600">
                            {mission.status}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {mission.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {mission.summary}
                      </p>

                      {/* Quick Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {Object.entries(mission.metrics).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-sm font-bold text-blue-600">{value}</div>
                            <div className="text-xs text-gray-500">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {mission.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {mission.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{mission.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* View Details Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">Click to expand</span>
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaCode className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Detail Modal */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMission(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <selectedMission.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedMission.title}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {selectedMission.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${selectedMission.statusColor}`}></div>
                          <span className="text-sm font-semibold text-gray-600">
                            {selectedMission.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMission(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {Object.entries(selectedMission.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                      <div className="text-sm text-gray-600">{key}</div>
                    </div>
                  ))}
                </div>

                {/* STAR Method Details */}
                <div className="space-y-6 mb-8">
                  <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">🎯 SITUATION</h4>
                    <p className="text-red-700 leading-relaxed">{selectedMission.details.situation}</p>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">⚡ ACTION</h4>
                    <p className="text-blue-700 leading-relaxed">{selectedMission.details.action}</p>
                  </div>

                  <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">🚀 RESULT</h4>
                    <p className="text-green-700 leading-relaxed">{selectedMission.details.result}</p>
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMission.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex space-x-4">
                  {selectedMission.links.live && (
                    <a
                      href={selectedMission.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {selectedMission.links.github && (
                    <a
                      href={selectedMission.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}