import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ClipboardCheck, Truck, ShieldCheck, PhoneCall } from 'lucide-react';
import React from 'react';

const ProcessSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <ClipboardCheck size={28} />,
      title: "Request a Quote",
      description: "Fill out our simple form with your logistics requirements and receive a personalized quote within 10 minutes."
    },
    {
      icon: <PhoneCall size={28} />,
      title: "Consultation & Planning",
      description: "Our logistics experts will contact you to discuss your needs and create a customized transportation plan."
    },
    {
      icon: <Truck size={28} />,
      title: "Shipment Execution",
      description: "We handle the pickup, transportation, and delivery with real-time tracking throughout the journey."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Safe Delivery & Support",
      description: "Your cargo is delivered safely with proof of delivery and continuous support from our team."
    }
  ];

  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [inView, steps.length]);

  return (
    <section 
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-blue-600 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">How We Work</h2>
          <div className="w-24 sm:w-28 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
            Our streamlined process ensures a seamless logistics experience from quote to delivery, with transparency and reliability at every step.
          </p>
        </div>

        {/* Desktop Process Timeline */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Progress Line Container */}
          <div className="absolute top-24 left-0 right-0 flex justify-center">
            <div className="w-5/6 h-1 bg-blue-400/30 relative">
              <div 
                className="h-full bg-orange-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center transition-all duration-500 ${
                  index <= activeStep 
                    ? 'opacity-100' 
                    : 'opacity-60'
                }`}
              >
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 shadow-lg ${
                    index <= activeStep 
                      ? 'bg-orange-500 text-white transform scale-110 shadow-orange-500/30' 
                      : 'bg-blue-400/30 text-blue-100'
                  }`}
                >
                  {React.cloneElement(step.icon, { size: 32 })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                <p className="text-base text-blue-100 text-center leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet Process Timeline */}
        <div className="hidden md:block lg:hidden max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center text-center transition-all duration-500 ${
                  index <= activeStep 
                    ? 'opacity-100' 
                    : 'opacity-60'
                }`}
              >
                <div 
                  className={`w-18 h-18 rounded-full flex items-center justify-center mb-6 transition-all duration-500 shadow-lg ${
                    index <= activeStep 
                      ? 'bg-orange-500 text-white transform scale-110 shadow-orange-500/30' 
                      : 'bg-blue-400/30 text-blue-100'
                  }`}
                >
                  {React.cloneElement(step.icon, { size: 30 })}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-base text-blue-100 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Process Timeline */}
        <div className="md:hidden space-y-8 max-w-lg mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-start transition-all duration-500 ${
                index <= activeStep 
                  ? 'opacity-100' 
                  : 'opacity-60'
              }`}
            >
              <div 
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center mr-6 transition-all duration-500 shadow-lg ${
                  index <= activeStep 
                    ? 'bg-orange-500 text-white shadow-orange-500/30' 
                    : 'bg-blue-400/30 text-blue-100'
                }`}
              >
                {React.cloneElement(step.icon, { size: 26 })}
              </div>
              <div className="flex-1 min-w-0 pt-2">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-base text-blue-100 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 sm:mt-20 text-center">
          <a 
            href="#quote" 
            className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Logistics Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;