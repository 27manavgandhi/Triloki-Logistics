import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ClipboardCheck, Truck, ShieldCheck, PhoneCall } from 'lucide-react';

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
    }, 3000);
    
    return () => clearInterval(interval);
  }, [inView, steps.length]);

  return (
    <section 
      ref={ref}
      className="py-20 bg-blue-600 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How We Work</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-blue-100">
            Our streamlined process ensures a seamless logistics experience from quote to delivery, with transparency and reliability at every step.
          </p>
        </div>

        {/* Desktop Process Timeline */}
        <div className="hidden md:block relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-400/30 -translate-y-1/2">
            <div 
              className="h-full bg-orange-500 transition-all duration-700 ease-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Process Steps */}
          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`w-1/4 px-4 transition-all duration-500 ${
                  index <= activeStep 
                    ? 'opacity-100' 
                    : 'opacity-50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                      index <= activeStep 
                        ? 'bg-orange-500 text-white transform scale-110' 
                        : 'bg-blue-400/30 text-blue-100'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-sm text-blue-100 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Process Timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-start transition-all duration-500 ${
                index <= activeStep 
                  ? 'opacity-100' 
                  : 'opacity-50'
              }`}
            >
              <div 
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-500 ${
                  index <= activeStep 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-blue-400/30 text-blue-100'
                }`}
              >
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-blue-100">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a 
            href="#quote" 
            className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-md transition-colors"
          >
            Start Your Logistics Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;