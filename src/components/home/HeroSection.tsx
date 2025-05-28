import { useState, useEffect } from 'react';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const slides = [
    {
      image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'End-to-End Transport & Logistics Partner – India to UAE',
    },
    {
      image: 'https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Trusted by 1000+ Businesses Across India & UAE',
    },
    {
      image: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Modern Fleet with Real-Time Tracking & Monitoring',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section 
      ref={ref} 
      className="relative h-screen min-h-[600px] max-h-[800px] overflow-hidden pt-20 md:pt-24"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900/80 to-black/70"></div>
      
      {/* Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={`Logistics slide ${index + 1}`} 
              className="object-cover object-center w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
        <div className={`max-w-3xl transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            From North India to the World – Logistics Made Seamless. Experience reliable, efficient, and cost-effective logistics solutions tailored to your business needs.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#quote" 
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors flex items-center justify-center group"
            >
              Get Instant Quote
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/services" 
              className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-md transition-colors flex items-center justify-center"
            >
              Explore Services
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="mr-3 bg-orange-500 rounded-full p-2">
                <Truck size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Pan-India Coverage</p>
                <p className="text-gray-300 text-xs">Serving all major cities</p>
              </div>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="mr-3 bg-orange-500 rounded-full p-2">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">15+ Years Experience</p>
                <p className="text-gray-300 text-xs">Trusted logistics partner</p>
              </div>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="mr-3 bg-orange-500 rounded-full p-2">
                <Clock size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">24/7 Support</p>
                <p className="text-gray-300 text-xs">Always available for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-orange-500 w-6' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;