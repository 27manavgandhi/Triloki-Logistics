import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Raj Sharma",
      company: "Sharma Exports Ltd",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      text: "Triloki Logistics has been our trusted partner for shipping goods to UAE for over 3 years. Their reliability and efficiency have significantly improved our supply chain operations."
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "Patel Industries",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      text: "The team at Triloki has exceptional knowledge of customs and documentation requirements. They've made our export process smooth and hassle-free."
    },
    {
      id: 3,
      name: "Ahmed Al Mansoori",
      company: "Dubai Trading Co.",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4,
      text: "As an importer in UAE, finding a reliable logistics partner in India was crucial. Triloki Logistics exceeded our expectations with their professionalism and punctual deliveries."
    }
  ];

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [inView, testimonials.length]);

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block text-blue-600 font-medium mb-2">Client Feedback</span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Businesses Worldwide</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Don't just take our word for it. Here's what our valued clients have to say about our logistics services.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-xl p-10 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-50 opacity-70"></div>
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-orange-50 opacity-70"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md mx-auto lg:mx-0">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-center lg:text-left">
                        <Quote className="w-8 h-8 text-blue-400 opacity-30 mx-auto lg:mx-0 mb-4" />
                        <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-4">
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                            <p className="text-gray-500">{testimonial.company}</p>
                          </div>
                          <div className="flex items-center justify-center lg:justify-start gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={20} 
                                className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                              />
                            ))}
                            <span className="text-gray-400 ml-1">({testimonial.rating}.0)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none hover:bg-gray-50 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-blue-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none hover:bg-gray-50 transition-all hover:scale-110 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-blue-600" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-2 transition-all ${
                  index === activeIndex ? 'bg-gradient-to-r from-blue-500 to-orange-500 scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;