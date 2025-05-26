import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Truck } from 'lucide-react';

interface FormData {
  fullName: string;
  phoneNumber: string;
  pickupLocation: string;
  dropLocation: string;
  goodsType: string;
  truckType: string;
  preferredDate: string;
  additionalRequirements: string;
}

const initialFormData: FormData = {
  fullName: '',
  phoneNumber: '',
  pickupLocation: '',
  dropLocation: '',
  goodsType: '',
  truckType: '',
  preferredDate: '',
  additionalRequirements: '',
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialDelay, setIsInitialDelay] = useState(true);

  useEffect(() => {
    // Show chatbot bubble after 5 seconds
    const timer = setTimeout(() => {
      setIsInitialDelay(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData(initialFormData);
      setCurrentStep(0);
      setIsOpen(false);
    }, 5000);
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Need a Truck? Get Instant Quote</h3>
            <p className="text-gray-600 text-sm mb-4">Fill out this quick form, and our team will call you in 10 minutes!</p>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter pickup location"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="dropLocation" className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
              <input
                type="text"
                id="dropLocation"
                name="dropLocation"
                value={formData.dropLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter drop location"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="goodsType" className="block text-sm font-medium text-gray-700 mb-1">Goods Type</label>
              <select
                id="goodsType"
                name="goodsType"
                value={formData.goodsType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select goods type</option>
                <option value="General">General Cargo</option>
                <option value="Perishable">Perishable Goods</option>
                <option value="Fragile">Fragile Items</option>
                <option value="Heavy">Heavy Machinery</option>
                <option value="Chemicals">Chemicals</option>
                <option value="Electronics">Electronics</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="truckType" className="block text-sm font-medium text-gray-700 mb-1">Truck Type Needed</label>
              <select
                id="truckType"
                name="truckType"
                value={formData.truckType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select truck type</option>
                <option value="Container">Container Truck</option>
                <option value="Refrigerated">Refrigerated Vehicle</option>
                <option value="Flatbed">Flatbed Trailer</option>
                <option value="MiniTruck">Mini Truck & LCV</option>
                <option value="HeavyMachinery">Heavy Machinery Transport</option>
                <option value="Specialized">Specialized Cargo Vehicle</option>
              </select>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements?"
                rows={3}
              ></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Chatbot button */}
      {!isInitialDelay && !isOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 animate-bounce"
          aria-label="Open chat"
        >
          <MessageSquare size={24} className="text-white" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 bg-red-500 rounded-full">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          </span>
        </button>
      )}

      {/* Chatbot dialog */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Truck size={20} className="mr-2" />
              <h2 className="font-semibold">Triloki Logistics</h2>
            </div>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat content */}
          <div className="h-80 overflow-y-auto">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Truck size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Our team will call you within 10 minutes to discuss your logistics requirements.
                </p>
              </div>
            ) : (
              renderFormStep()
            )}
          </div>

          {/* Footer */}
          {!isSubmitted && (
            <div className="p-3 border-t border-gray-200 flex justify-between">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
                >
                  Back
                </button>
              )}
              <div className="flex-1"></div>
              <button
                onClick={handleNext}
                className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center transition-colors"
              >
                {currentStep < 7 ? 'Next' : 'Submit'}
                <Send size={16} className="ml-1" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;