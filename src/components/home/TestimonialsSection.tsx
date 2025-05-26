import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Don't just take our word for it. Here's what our clients have to say about our logistics services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-lg shadow-lg p-8 relative">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="mb-6 md:mb-0 md:mr-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto md:mx-0">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={18} 
                              className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                        <div>
                          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full mx-1 transition-colors ${
                  index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
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