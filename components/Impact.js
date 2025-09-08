'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiTrendingUp, 
  FiZap, 
  FiShield, 
  FiUsers, 
  FiDollarSign, 
  FiCpu,
  FiExternalLink,
  FiGithub,
  FiPlay,
  FiX,
  FiCode,
  FiDatabase,
  FiCloud
} from 'react-icons/fi'

const impactProjects = [
  {
    id: 'saamcars',
    title: 'SaamCars - Enterprise Inventory System',
    category: 'Full-Stack Development',
    businessProblem: 'Local automotive dealers were losing $50K+ annually due to manual inventory errors and couldn\'t efficiently track 500+ vehicle listings.',
    solution: 'Engineered a scalable Node.js/Express backend with real-time PostgreSQL synchronization and Firebase CDN integration.',
    results: [
      { metric: 'Error Reduction', value: '80%', icon: FiShield },
      { metric: 'Efficiency Gain', value: '35%', icon: FiTrendingUp },
      { metric: 'Daily Processing', value: '1000+', icon: FiCpu },
      { metric: 'System Uptime', value: '99.5%', icon: FiZap }
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Firebase', 'React', 'TypeScript', 'AWS', 'Docker'],
    timeline: '6 months',
    teamSize: '3 engineers',
    impact: 'Transformed manual 4-hour daily processes into 30-minute automated workflows',
    liveUrl: 'https://www.saamcars.com',
    githubUrl: 'https://github.com/vamsi-rebounz/SamCars-BE',
    featured: true,
    gradient: 'from-blue-500 to-purple-600',
    bgGradient: 'from-blue-50 to-purple-50'
  },
  {
    id: 'medical-ai',
    title: 'AI-Powered Medical Detection System',
    category: 'Machine Learning & AI',
    businessProblem: 'Laparoscopic surgeries had 30% complication rates due to organ misidentification, costing healthcare systems $2M+ annually per hospital.',
    solution: 'Built high-performance U-Net and YOLOv11 models with diffusion model data augmentation, processing 8,000+ surgical frames.',
    results: [
      { metric: 'Detection Accuracy', value: '99.5%', icon: FiShield },
      { metric: 'Error Reduction', value: '85%', icon: FiTrendingUp },
      { metric: 'Processing Speed', value: '30 FPS', icon: FiCpu },
      { metric: 'Potential Lives Saved', value: '1000+', icon: FiUsers }
    ],
    technologies: ['Python', 'U-Net', 'YOLOv11', 'PyTorch', 'OpenCV', 'Diffusion Models'],
    timeline: '8 months',
    teamSize: '4 researchers',
    impact: 'Potential to prevent $10M+ in medical liability costs annually',
    githubUrl: 'https://github.com/nagatharun/Enhance-Data-Diversity-and-Robustness',
    featured: false,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50'
  },
  {
    id: 'clinical-ai',
    title: 'Clinical Decision Support System',
    category: 'Healthcare ML',
    businessProblem: 'Healthcare providers struggled with Warfarin dosing, causing 40% inappropriate prescriptions and 60% increased bleeding/clotting risks.',
    solution: 'Developed ensemble ML system using Random Forest and Neural Networks on 10,000+ patient records with robust cross-validation.',
    results: [
      { metric: 'Dosing Accuracy', value: '90%', icon: FiShield },
      { metric: 'Error Reduction', value: '20%', icon: FiTrendingUp },
      { metric: 'Cost Prevention', value: '$10M+', icon: FiDollarSign },
      { metric: 'Patient Improvement', value: '35%', icon: FiUsers }
    ],
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Random Forest', 'Neural Networks', 'Pandas'],
    timeline: '4 months',
    teamSize: '2 engineers',
    impact: 'Improved patient outcomes while preventing millions in liability costs',
    githubUrl: 'https://github.com/Vamsi-027/Warfin-Dose-Prediction',
    featured: false,
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-50 to-red-50'
  }
]

const overallImpact = [
  { label: 'Lives Potentially Saved', value: '1000+', icon: FiUsers, color: 'text-emerald-600' },
  { label: 'Cost Savings Generated', value: '$10M+', icon: FiDollarSign, color: 'text-blue-600' },
  { label: 'Error Reduction Average', value: '62%', icon: FiShield, color: 'text-purple-600' },
  { label: 'Systems Deployed', value: '3', icon: FiCloud, color: 'text-orange-600' }
]

export default function Impact() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

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
    <>
      <section 
        id="impact" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50"
      >
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 text-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold mb-8 shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FiTrendingUp className="w-5 h-5" />
              <span>Measurable Business Impact</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Engineering Solutions That{" "}
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Drive Real Results
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Every system I build solves real business problems with measurable outcomes. 
              Here's the quantifiable impact of my engineering work across healthcare, automotive, and enterprise domains.
            </motion.p>
          </motion.div>

          {/* Overall Impact Stats */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {overallImpact.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-sm group-hover:shadow-xl transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-100/50 text-center group-hover:-translate-y-2 transition-all duration-500">
                    <div className={`inline-flex p-4 rounded-2xl mb-6 ${stat.color.replace('text-', 'bg-').replace('-600', '-50')} border border-${stat.color.replace('text-', '').replace('-600', '-100')}`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    
                    <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 font-mono">
                      {stat.value}
                    </div>
                    
                    <div className="text-sm text-slate-600 font-semibold tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/0 via-cyan-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:via-cyan-400/5 group-hover:to-blue-400/5 transition-all duration-500"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Project */}
          <motion.div variants={itemVariants} className="mb-20">
            {impactProjects.filter(p => p.featured).map(project => (
              <div key={project.id} className="relative overflow-hidden">
                {/* Background Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-[32px] p-[2px]">
                  <div className="w-full h-full bg-white rounded-[30px]"></div>
                </div>
                
                {/* Content Container */}
                <div className="relative bg-white rounded-[30px] p-8 lg:p-16 shadow-2xl">
                  <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 items-center">
                    
                    {/* Project Info */}
                    <div className="xl:col-span-3">
                      <motion.div 
                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-2xl text-sm font-semibold mb-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <FiCode className="w-5 h-5" />
                        <span>Featured Case Study</span>
                      </motion.div>
                      
                      <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                        {project.impact}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {project.results.slice(0, 4).map((result, index) => (
                          <motion.div 
                            key={index} 
                            className="group relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 group-hover:shadow-lg transition-all duration-300">
                              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2 font-mono">
                                {result.value}
                              </div>
                              <div className="text-sm text-slate-600 font-semibold">
                                {result.metric}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.technologies.slice(0, 6).map((tech, index) => (
                          <motion.div
                            key={tech}
                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-200 transition-colors"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.05 }}
                          >
                            {tech}
                          </motion.div>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-4 py-2 bg-slate-200 text-slate-600 rounded-xl text-sm font-semibold">
                            +{project.technologies.length - 6} more
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 transition-all duration-300 shadow-xl overflow-hidden"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <FiPlay className="w-5 h-5 relative z-10" />
                          <span className="relative z-10">View Case Study</span>
                        </motion.button>
                        
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center space-x-3 border-2 border-slate-300 bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-base hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 shadow-lg"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FiExternalLink className="w-5 h-5" />
                            <span>Live Demo</span>
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Visual Representation */}
                    <div className="xl:col-span-2 relative">
                      <div className="relative aspect-square max-w-md mx-auto">
                        {/* Main Circle */}
                        <div className="absolute inset-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-full border-4 border-blue-200/30 flex items-center justify-center">
                          <div className="text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1, type: "spring", stiffness: 200 }}
                            >
                              <FiDatabase className="w-20 h-20 text-blue-600 mx-auto mb-4" />
                            </motion.div>
                            <motion.div 
                              className="text-4xl font-bold text-blue-700 mb-2 font-mono"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.3 }}
                            >
                              80%
                            </motion.div>
                            <motion.div 
                              className="text-blue-600 font-semibold"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.5 }}
                            >
                              Error Reduction
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Floating Metric Cards */}
                        <motion.div
                          className="absolute -top-2 -right-2 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
                          animate={{ y: [-8, 8, -8] }}
                          transition={{ repeat: Infinity, duration: 6 }}
                        >
                          <FiTrendingUp className="w-8 h-8 text-emerald-500" />
                          <div className="text-xs font-bold text-emerald-600 mt-1">+35% Efficiency</div>
                        </motion.div>
                        
                        <motion.div
                          className="absolute -bottom-2 -left-2 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
                          animate={{ y: [8, -8, 8] }}
                          transition={{ repeat: Infinity, duration: 6, delay: 3 }}
                        >
                          <FiZap className="w-8 h-8 text-orange-500" />
                          <div className="text-xs font-bold text-orange-600 mt-1">99.5% Uptime</div>
                        </motion.div>
                        
                        <motion.div
                          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
                          animate={{ x: [-4, 4, -4] }}
                          transition={{ repeat: Infinity, duration: 8 }}
                        >
                          <FiUsers className="w-8 h-8 text-purple-500" />
                          <div className="text-xs font-bold text-purple-600 mt-1">1000+ Users</div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Other Projects Grid */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-3xl font-bold text-slate-900 mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Additional Impact Projects
            </motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {impactProjects.filter(p => !p.featured).map((project, projectIndex) => (
                <motion.div
                  key={project.id}
                  className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200/60 hover:border-slate-300/80 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: projectIndex * 0.2, duration: 0.8 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                  <div className="absolute inset-[1px] bg-white rounded-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <FiCode className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-semibold border border-slate-200">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Project Title */}
                    <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {project.title}
                    </h4>
                    
                    {/* Impact Description */}
                    <p className="text-slate-600 text-base leading-relaxed mb-6 font-medium">
                      {project.impact}
                    </p>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {project.results.slice(0, 2).map((result, index) => (
                        <motion.div 
                          key={index} 
                          className="relative group/metric"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-2xl border border-slate-100 group-hover/metric:border-blue-200 group-hover/metric:shadow-md transition-all duration-300">
                            <div className="text-2xl font-bold text-blue-600 mb-1 font-mono">{result.value}</div>
                            <div className="text-xs text-slate-600 font-semibold">{result.metric}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech Stack Preview & Action */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex -space-x-2">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <motion.div
                            key={tech}
                            className="w-10 h-10 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-white rounded-full flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm group-hover:shadow-md transition-all duration-300"
                            title={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.05 }}
                          >
                            {tech.charAt(0)}
                          </motion.div>
                        ))}
                        {project.technologies.length > 4 && (
                          <div className="w-10 h-10 bg-slate-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                            +{project.technologies.length - 4}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                        <span className="text-sm">Explore</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-8 bg-gradient-to-r ${selectedProject.bgGradient} border-b border-neutral-200`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block text-sm text-neutral-600 bg-white px-3 py-1 rounded-full mb-3">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center space-x-6 text-sm text-neutral-600">
                      <span>Timeline: {selectedProject.timeline}</span>
                      <span>Team: {selectedProject.teamSize}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <FiX className="w-6 h-6 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Tabs */}
                <div className="flex space-x-1 mb-8 bg-neutral-100 p-1 rounded-lg">
                  {['overview', 'technical', 'results'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab
                          ? 'bg-white text-neutral-900 shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-900 mb-3">Business Problem</h4>
                          <p className="text-neutral-700 leading-relaxed">{selectedProject.businessProblem}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-900 mb-3">Solution Approach</h4>
                          <p className="text-neutral-700 leading-relaxed">{selectedProject.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-900 mb-3">Business Impact</h4>
                          <p className="text-neutral-700 leading-relaxed">{selectedProject.impact}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'technical' && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-900 mb-4">Technology Stack</h4>
                          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                            {selectedProject.technologies.map(tech => (
                              <div
                                key={tech}
                                className="bg-neutral-100 text-neutral-700 px-3 py-2 rounded-lg text-sm font-medium text-center"
                              >
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-900 mb-3">Architecture Highlights</h4>
                          <p className="text-neutral-700 leading-relaxed">{selectedProject.solution}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'results' && (
                      <div>
                        <h4 className="text-lg font-semibold text-neutral-900 mb-6">Key Performance Metrics</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                          {selectedProject.results.map((result, index) => (
                            <motion.div
                              key={index}
                              className="text-center p-6 bg-neutral-50 rounded-xl"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="inline-flex p-3 rounded-xl bg-primary-100 text-primary-600 mb-4">
                                <result.icon className="w-6 h-6" />
                              </div>
                              <div className="text-2xl font-bold text-neutral-900 mb-2">
                                {result.value}
                              </div>
                              <div className="text-sm text-neutral-600 font-medium">
                                {result.metric}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="flex space-x-4 mt-8 pt-6 border-t border-neutral-200">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span>View Live</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 border-2 border-neutral-300 text-neutral-700 px-6 py-3 rounded-xl font-semibold hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      <FiGithub className="w-4 h-4" />
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