import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, Check } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const ContactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section 
      id="quote"
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Need a quote or have questions about our logistics services? Fill out the form below and we'll get back to you within 10 minutes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Contact Info */}
              <div className="md:col-span-2 bg-blue-600 text-white p-8">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <p className="text-blue-100 mb-8">
                  Fill out the form and our team will get back to you within 10 minutes.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-200 mb-2">Address</h4>
                    <p className="text-white">Bhawana Industrial Area, Delhi, India</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-200 mb-2">Email</h4>
                    <a href="mailto:info@trilokilogistics.com" className="text-white hover:text-blue-200 transition-colors">
                      info@trilokilogistics.com
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-200 mb-2">Phone</h4>
                    <a href="tel:+91XXXXXXXXXX" className="text-white hover:text-blue-200 transition-colors">
                      +91-XXXXXXXXXX
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-200 mb-2">Hours</h4>
                    <p className="text-white">24/7 Operations</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-3 p-8">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      Your message has been received. Our team will contact you within 10 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Your email address"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Your phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                          Service Type
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          <option value="Pan-India">Pan-India Logistics</option>
                          <option value="UAE">UAE Export & Import</option>
                          <option value="Documentation">Documentation & Compliance</option>
                          <option value="Fleet">Fleet Management</option>
                          <option value="Insurance">Insurance & Legal</option>
                          <option value="Support">24/7 Customer Support</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about your logistics requirements"
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Sending</span>
                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={18} className="ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;