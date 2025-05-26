import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTooltipVisible(false);
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="absolute bottom-full right-0 mb-2 p-2 bg-white rounded-lg shadow-lg w-48">
          <button 
            onClick={handleClose}
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
            aria-label="Close tooltip"
          >
            <X size={16} />
          </button>
          <p className="text-sm text-gray-800 mb-2">Need logistics help?</p>
          <p className="text-xs text-gray-600">Chat with us on WhatsApp for instant support!</p>
        </div>
      )}
      
      {/* Button */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </div>
  );
};

export default WhatsAppButton;