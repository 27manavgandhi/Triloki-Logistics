import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Truck, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  pickupLocation: string;
  dropLocation: string;
  goodsType: string;
  truckType: string;
  preferredDate: string;
  additionalRequirements: string;
  conversationHistory: Message[];
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
  conversationHistory: [],
};

// AI conversation flow
const conversationSteps = [
  {
    field: 'welcome',
    botMessage: "👋 Hi there! I'm your logistics assistant from Triloki Logistics. I'm here to help you find the perfect transportation solution for your needs. What's your name?",
    validate: (input: string) => input.trim().length >= 2,
    fieldName: 'fullName',
    errorMessage: "Please enter your full name (at least 2 characters)."
  },
  {
    field: 'fullName',
    botMessage: (name: string) => `Nice to meet you, ${name}! 📱 Could you please share your phone number so our team can reach you with the best quote?`,
    validate: (input: string) => /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(input.replace(/\s/g, '')),
    fieldName: 'phoneNumber',
    errorMessage: "Please enter a valid phone number (10-15 digits)."
  },
  {
    field: 'phoneNumber',
    botMessage: "Perfect! 📍 Now, where do you need us to pick up your goods from?",
    validate: (input: string) => input.trim().length >= 3,
    fieldName: 'pickupLocation',
    errorMessage: "Please enter a valid pickup location (at least 3 characters)."
  },
  {
    field: 'pickupLocation',
    botMessage: "Got it! 🎯 And where should we deliver your goods to?",
    validate: (input: string) => input.trim().length >= 3,
    fieldName: 'dropLocation',
    errorMessage: "Please enter a valid drop location (at least 3 characters)."
  },
  {
    field: 'dropLocation',
    botMessage: "Excellent! 📦 What type of goods will you be transporting? Please choose from:\n\n1️⃣ General Cargo\n2️⃣ Perishable Goods\n3️⃣ Fragile Items\n4️⃣ Heavy Machinery\n5️⃣ Chemicals\n6️⃣ Electronics\n7️⃣ Other\n\nJust type the number or name!",
    validate: (input: string) => {
      const goodsTypes = ['general', 'perishable', 'fragile', 'heavy', 'chemicals', 'electronics', 'other', '1', '2', '3', '4', '5', '6', '7'];
      return goodsTypes.some(type => input.toLowerCase().includes(type));
    },
    fieldName: 'goodsType',
    errorMessage: "Please select a valid goods type (1-7 or type the name).",
    transform: (input: string) => {
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('1') || lowerInput.includes('general')) return 'General Cargo';
      if (lowerInput.includes('2') || lowerInput.includes('perishable')) return 'Perishable Goods';
      if (lowerInput.includes('3') || lowerInput.includes('fragile')) return 'Fragile Items';
      if (lowerInput.includes('4') || lowerInput.includes('heavy')) return 'Heavy Machinery';
      if (lowerInput.includes('5') || lowerInput.includes('chemicals')) return 'Chemicals';
      if (lowerInput.includes('6') || lowerInput.includes('electronics')) return 'Electronics';
      if (lowerInput.includes('7') || lowerInput.includes('other')) return 'Other';
      return input;
    }
  },
  {
    field: 'goodsType',
    botMessage: "Great choice! 🚛 Now, what type of truck do you need? Here are your options:\n\n1️⃣ Container Truck\n2️⃣ Refrigerated Vehicle\n3️⃣ Flatbed Trailer\n4️⃣ Mini Truck & LCV\n5️⃣ Heavy Machinery Transport\n6️⃣ Specialized Cargo Vehicle\n\nWhich one suits your needs?",
    validate: (input: string) => {
      const truckTypes = ['container', 'refrigerated', 'flatbed', 'mini', 'heavy', 'specialized', '1', '2', '3', '4', '5', '6'];
      return truckTypes.some(type => input.toLowerCase().includes(type));
    },
    fieldName: 'truckType',
    errorMessage: "Please select a valid truck type (1-6 or type the name).",
    transform: (input: string) => {
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('1') || lowerInput.includes('container')) return 'Container Truck';
      if (lowerInput.includes('2') || lowerInput.includes('refrigerated')) return 'Refrigerated Vehicle';
      if (lowerInput.includes('3') || lowerInput.includes('flatbed')) return 'Flatbed Trailer';
      if (lowerInput.includes('4') || lowerInput.includes('mini')) return 'Mini Truck & LCV';
      if (lowerInput.includes('5') || lowerInput.includes('heavy')) return 'Heavy Machinery Transport';
      if (lowerInput.includes('6') || lowerInput.includes('specialized')) return 'Specialized Cargo Vehicle';
      return input;
    }
  },
  {
    field: 'truckType',
    botMessage: "Perfect! 📅 When do you need this transportation service? Please provide your preferred date (e.g., 'tomorrow', 'next Monday', or a specific date like '2025-06-15').",
    validate: (input: string) => {
      // Allow natural language dates or ISO format
      return input.trim().length >= 3;
    },
    fieldName: 'preferredDate',
    errorMessage: "Please provide a valid date.",
    transform: (input: string) => {
      // Simple date parsing - in production, you'd want more sophisticated parsing
      const today = new Date();
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('today')) {
        return today.toISOString().split('T')[0];
      } else if (lowerInput.includes('tomorrow')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
      } else if (lowerInput.includes('next week')) {
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        return nextWeek.toISOString().split('T')[0];
      }
      
      // Try to parse as date
      const parsedDate = new Date(input);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split('T')[0];
      }
      
      return input; // Return as-is if can't parse
    }
  },
  {
    field: 'preferredDate',
    botMessage: "Almost done! 📝 Do you have any special requirements or additional details about your shipment? (e.g., loading/unloading assistance, insurance needs, urgent delivery, etc.) If not, just type 'none'.",
    validate: (input: string) => true, // Optional field
    fieldName: 'additionalRequirements',
    errorMessage: "",
    transform: (input: string) => input.toLowerCase() === 'none' ? '' : input
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialDelay, setIsInitialDelay] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show chatbot bubble after 5 seconds
    const timer = setTimeout(() => {
      setIsInitialDelay(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start conversation when chatbot opens
      addBotMessage(conversationSteps[0].botMessage as string);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setFormData(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, newMessage]
    }));
  };

  const addBotMessage = (text: string, delay: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage(text, 'bot');
      setIsTyping(false);
      setWaitingForInput(true);
    }, delay);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !waitingForInput) return;

    const userInput = inputValue.trim();
    addMessage(userInput, 'user');
    setInputValue('');
    setWaitingForInput(false);

    // Process the user input
    processUserInput(userInput);
  };

  const processUserInput = (input: string) => {
    const currentStepData = conversationSteps[currentStep];
    
    // Validate input
    if (!currentStepData.validate(input)) {
      addBotMessage(`❌ ${currentStepData.errorMessage}`, 1000);
      return;
    }

    // Transform input if needed
    const processedInput = currentStepData.transform ? currentStepData.transform(input) : input;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [currentStepData.fieldName]: processedInput
    }));

    // Move to next step
    if (currentStep < conversationSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      const nextStepData = conversationSteps[nextStep];
      let nextMessage = nextStepData.botMessage;
      
      // Handle dynamic messages
      if (typeof nextMessage === 'function') {
        nextMessage = nextMessage(processedInput);
      }
      
      addBotMessage(nextMessage as string);
    } else {
      // All steps completed, submit the form
      handleSubmit(processedInput);
    }
  };

  const handleSubmit = async (finalInput: string) => {
    const finalFormData = {
      ...formData,
      additionalRequirements: finalInput
    };

    addBotMessage("✨ Thank you for providing all the details! Let me prepare your quote...", 1000);
    
    try {
      // Send data to Google Sheets
      await sendToGoogleSheets(finalFormData);
      
      setIsSubmitted(true);
      addBotMessage(`🎉 Perfect! Here's a summary of your request:

📦 **Shipment Details:**
• **Name:** ${finalFormData.fullName}
• **Phone:** ${finalFormData.phoneNumber}
• **From:** ${finalFormData.pickupLocation}
• **To:** ${finalFormData.dropLocation}
• **Goods:** ${finalFormData.goodsType}
• **Truck Type:** ${finalFormData.truckType}
• **Date:** ${finalFormData.preferredDate}
${finalFormData.additionalRequirements ? `• **Special Requirements:** ${finalFormData.additionalRequirements}` : ''}

🚀 **What happens next?**
Our logistics expert will call you within **10 minutes** with:
• Competitive pricing options
• Truck availability confirmation  
• Estimated delivery timeline
• Any additional services you might need

📞 Keep your phone handy - we'll be calling ${finalFormData.phoneNumber} shortly!

💰 **Why choose Triloki Logistics?**
✅ 15+ years of experience
✅ Pan-India network
✅ Competitive rates
✅ Real-time tracking
✅ Insurance coverage available

Thank you for choosing Triloki Logistics! 🚛💨`, 2000);

    } catch (error) {
      addBotMessage("⚠️ There was an issue saving your information, but don't worry! Our team has been notified and will still call you within 10 minutes. If you don't hear from us, please call our customer service at +91-XXXXXXXXXX.", 1500);
    }
  };

  const sendToGoogleSheets = async (data: FormData) => {
    // Replace with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxNadJeuc5aUutXp31dNt5fv9z7jrwkVdaMOTNLUF0zkQMqj4g7HmrDUViZgRJ06ZB/exec';
    
    const payload = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      goodsType: data.goodsType,
      truckType: data.truckType,
      preferredDate: data.preferredDate,
      additionalRequirements: data.additionalRequirements,
      conversationHistory: JSON.stringify(data.conversationHistory),
      leadStatus: 'New',
      source: 'Website Chatbot'
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Required for Google Apps Script
        body: JSON.stringify(payload)
      });
      
      console.log('Data sent to Google Sheets successfully');
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      throw error;
    }
  };

  const resetChat = () => {
    setMessages([]);
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsSubmitted(false);
    setInputValue('');
    setWaitingForInput(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot button */}
      {!isInitialDelay && !isOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
          aria-label="Open chat"
        >
          <MessageSquare size={28} className="text-white" />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 bg-red-500 rounded-full text-xs text-white font-bold">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            !
          </span>
        </button>
      )}

      {/* Chatbot dialog */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <Truck size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Triloki Logistics</h2>
                <div className="flex items-center text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  AI Assistant Online
                </div>
              </div>
            </div>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200 focus:outline-none transition-colors"
              aria-label="Close chat"
            >
              <X size={24} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 shadow-md rounded-bl-sm border'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          {!isSubmitted && (
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={waitingForInput ? "Type your response..." : "Please wait..."}
                  disabled={!waitingForInput}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || !waitingForInput}
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Reset button for completed conversations */}
          {isSubmitted && (
            <div className="p-4 bg-white border-t border-gray-200">
              <button
                onClick={resetChat}
                className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full transition-all duration-200 font-medium"
              >
                Start New Conversation
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;