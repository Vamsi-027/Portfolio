import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

const CustomAlert = ({ 
  message, 
  type = "info", 
  duration = 5000, 
  onClose, 
  position = "top-right" 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose && onClose(), 300); // Wait for animation to complete
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "error":
        return <FaExclamationTriangle className="text-red-500" />;
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      default:
        return "text-blue-800";
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full`}
        >
          <div className={`${getBgColor()} border rounded-lg shadow-lg p-4 flex items-start space-x-3`}>
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${getTextColor()}`}>
                {message}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing multiple alerts
export const useCustomAlert = () => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, type = "info", duration = 5000, position = "top-right") => {
    const id = Date.now() + Math.random();
    const newAlert = { id, message, type, duration, position };
    setAlerts(prev => [...prev, newAlert]);
    return id;
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const showSuccess = (message, duration, position) => 
    showAlert(message, "success", duration, position);
  
  const showError = (message, duration, position) => 
    showAlert(message, "error", duration, position);
  
  const showWarning = (message, duration, position) => 
    showAlert(message, "warning", duration, position);
  
  const showInfo = (message, duration, position) => 
    showAlert(message, "info", duration, position);

  return {
    alerts,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeAlert
  };
};

// Alert Container Component
export const AlertContainer = ({ alerts, onRemoveAlert }) => {
  return (
    <>
      {alerts.map((alert) => (
        <CustomAlert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
          position={alert.position}
          onClose={() => onRemoveAlert(alert.id)}
        />
      ))}
    </>
  );
};

export default CustomAlert;