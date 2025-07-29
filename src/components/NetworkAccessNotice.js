import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaShieldAlt, FaGlobe, FaLock, FaTimes, FaInfoCircle, FaCheck } from "react-icons/fa";

const NetworkAccessNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if running on local network
    const hostname = window.location.hostname;
    const isLocal = hostname !== 'localhost' && 
                   hostname !== '127.0.0.1' &&
                   (hostname.startsWith('192.168.') || 
                    hostname.startsWith('10.') ||
                    hostname.startsWith('172.'));
    
    setIsVisible(isLocal);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleContinue = () => {
    setIsVisible(false);
    // Optionally reload the page or continue with the app
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative">
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaShieldAlt size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Local Network Access</h3>
                <p className="text-blue-100 text-sm mt-1">Secure development environment</p>
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
                <h4 className="font-semibold text-gray-900 mb-1">Network Access Detected</h4>
                <p className="text-sm text-gray-600 break-all">{window.location.href}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-blue-800">
                <FaInfoCircle className="text-blue-600" size={16} />
                <span className="font-medium">What to expect:</span>
              </div>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Your browser may show a security prompt</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Click "Allow" or "Advanced" → "Proceed" to continue</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>This is safe for local development</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-green-800">
                <FaLock className="text-green-600" size={14} />
                <span className="font-medium">Security Status: Safe</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                This is a local development server running on your network. No external connections are made.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Local network connection verified</span>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4 flex space-x-3">
            <button
              onClick={handleDismiss}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
            >
              <FaTimes size={16} />
              <span>Dismiss</span>
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FaCheck size={16} />
              <span>Continue</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NetworkAccessNotice;