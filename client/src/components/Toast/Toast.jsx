import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type = 'error', onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div 
      className={`toast toast--${type} ${isClosing ? 'toast--closing' : ''}`} 
      role="alert"
    >
      <div className={`toast-icon-wrapper toast-icon-wrapper--${type}`}>
        {icons[type]}
        <span className="sr-only">{type} icon</span>
      </div>
      <div className="toast-message">{message}</div>
      <button 
        type="button"
        className="toast-close-btn" 
        onClick={handleClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <X size={20} />
      </button>
    </div>
  );
};

export default Toast;