import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaShieldAlt, FaCheck, FaTimes, FaGlobe, FaLock } from "react-icons/fa";

const CustomAppPrompt = ({ 
  isVisible, 
  onAllow, 
  onDeny, 
  appName = "Portfolio Application",
  appUrl = "http://localhost:3000"
}) => {
  const [isOpen, setIsOpen] = useState(isVisible);

  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const handleAllow = () => {
    setIsOpen(false);
    onAllow && onAllow();
  };

  const handleDeny = () => {
    setIsOpen(false);
    onDeny && onDeny();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FaShieldAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Application Access Request</h3>
                  <p className="text-blue-100 text-sm mt-1">Secure connection required</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaGlobe className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{appName}</h4>
                  <p className="text-sm text-gray-600 break-all">{appUrl}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <FaLock className="text-green-500" size={14} />
                  <span>This is a secure local development server</span>
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  This application is running on your local network and requires access to display content properly. 
                  This is safe for development purposes.
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Local network connection detected</span>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 flex space-x-3">
              <button
                onClick={handleDeny}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
              >
                <FaTimes size={16} />
                <span>Deny</span>
              </button>
              <button
                onClick={handleAllow}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FaCheck size={16} />
                <span>Allow</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing app prompt
export const useAppPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptConfig, setPromptConfig] = useState({
    appName: "Portfolio Application",
    appUrl: window.location.href
  });

  const triggerPrompt = (config = {}) => {
    setPromptConfig({ ...promptConfig, ...config });
    setShowPrompt(true);
  };

  const hidePrompt = () => {
    setShowPrompt(false);
  };

  const handleAllow = () => {
    // Handle allow action - could reload page or redirect
    window.location.reload();
  };

  const handleDeny = () => {
    hidePrompt();
  };

  return {
    showPrompt,
    promptConfig,
    triggerPrompt,
    hidePrompt,
    handleAllow,
    handleDeny
  };
};

export default CustomAppPrompt;