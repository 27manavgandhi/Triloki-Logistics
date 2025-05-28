import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  MessageCircle, 
  Info, 
  AlertTriangle 
} from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  useEffect(() => {
    document.title = 'Contact Us - Triloki Logistics';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 pt-32 bg-blue-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/4481323/pexels-photo-4481323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Get in touch with our team for any inquiries, quotes, or logistics support. We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div 
                ref={ref}
                className={`bg-blue-600 rounded-lg shadow-lg p-8 text-white transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-orange-400 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-blue-100">Bhawana Industrial Area, Delhi, India</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone size={20} className="text-orange-400 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-blue-100">+91-XXXXXXXXXX (India)</p>
                      <p className="text-blue-100">+971-XXXXXXXXX (UAE)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail size={20} className="text-orange-400 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-blue-100">info@trilokilogistics.com</p>
                      <p className="text-blue-100">support@trilokilogistics.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock size={20} className="text-orange-400 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Working Hours</h3>
                      <p className="text-blue-100">24/7 Operations</p>
                      <p className="text-blue-100">Office: Mon-Sat (9:00 AM - 6:00 PM)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-500">
                  <h3 className="font-medium mb-3">Emergency Contact</h3>
                  <div className="bg-blue-700 rounded-lg p-4 flex items-start">
                    <AlertTriangle size={20} className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-100">
                        For urgent logistics support or emergencies, please call our 24/7 hotline:
                      </p>
                      <a href="tel:+91XXXXXXXXXX" className="text-white font-medium block mt-1">
                        +91-XXXXXXXXXX
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div 
                className={`bg-white rounded-lg shadow-lg p-8 transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600 max-w-md">
                      Your message has been received. Our team will contact you shortly to discuss your requirements.
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
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Subject of your message"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Please describe your requirements"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>
                    
                    <div className="flex items-start">
                      <Info size={16} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-xs text-gray-500">
                        By submitting this form, you agree to our privacy policy and terms of service. We'll contact you shortly to discuss your requirements.
                      </p>
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
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Visit our office in Delhi or reach out to us through phone or email. We're always ready to assist you with your logistics needs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Google Maps Embedded */}
            <div className="aspect-video">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27971.54227518745!2d77.04047782542307!3d28.795876036825444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390da9d43412ab49%3A0x88a3fe20a5862ae4!2sDSIIDC%20Industrial%20Area%2C%20Sector%201%2C%20Bawana%2C%20Delhi%2C%20110039!5e0!3m2!1sen!2sin!4v1748418275308!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Triloki Logistics Location Map"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start mb-4 md:mb-0">
                  <MapPin size={20} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Bhawana Industrial Area, Delhi, India</p>
                </div>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.google.com/maps/dir//DSIDC+Industrial+Area,+Sector+1,+Bawana,+Delhi,+110039/@28.7958760,77.0404778,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390da9d43412ab49:0x88a3fe20a5862ae4!2m2!1d77.0404778!2d28.7958760"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quick Contact Options</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Need a quick response? Reach out to us through any of these channels for immediate assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our logistics experts</p>
              <a 
                href="tel:+91XXXXXXXXXX" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                +91-XXXXXXXXXX
              </a>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us your queries anytime</p>
              <a 
                href="mailto:info@trilokilogistics.com" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                info@trilokilogistics.com
              </a>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Chat with us for instant support</p>
              <a 
                href="https://wa.me/91XXXXXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Send WhatsApp Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Find quick answers to common questions about our logistics services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How quickly can you arrange transportation?</h3>
                <p className="text-gray-600">
                  We can arrange transportation within 6-24 hours depending on the location, vehicle availability, and specific requirements. For urgent needs, contact our emergency line.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you handle customs clearance for UAE shipments?</h3>
                <p className="text-gray-600">
                  Yes, we provide comprehensive customs clearance services for all shipments between India and UAE, handling all documentation and regulatory requirements.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What tracking facilities do you provide?</h3>
                <p className="text-gray-600">
                  We offer real-time GPS tracking for all shipments, allowing you to monitor your cargo's location, status, and estimated delivery time through our customer portal.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Are shipments insured?</h3>
                <p className="text-gray-600">
                  Yes, all shipments are covered with basic insurance. We also offer additional comprehensive insurance options based on cargo value and specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;