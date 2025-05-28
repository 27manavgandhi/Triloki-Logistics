import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Truck, 
  Ship, 
  FileText, 
  Map, 
  ShieldCheck, 
  HeadphonesIcon,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const Service = ({ icon, title, description, features, index }: ServiceProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`py-16 ${isEven ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
          inView 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className={`bg-blue-100 rounded-xl p-10 ${
              inView ? 'animate-float' : ''
            }`}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {icon}
                </div>
              </div>
              <img 
                src={`https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600`}
                alt={title}
                className="rounded-lg shadow-lg w-full object-cover aspect-video"
              />
            </div>
          </div>
          
          <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            <div className="w-16 h-1 bg-orange-500 mb-6"></div>
            <p className="text-gray-600 mb-8">{description}</p>
            
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle size={20} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a 
                href="#quote" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Request Service
                <ChevronRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      icon: <Truck size={32} />,
      title: "Pan-India Logistics & Transport",
      description: "Our comprehensive Pan-India logistics solutions connect businesses across the country with reliable and efficient transportation services, ensuring your cargo reaches its destination on time, every time.",
      features: [
        "Coverage across all major cities and industrial hubs in India",
        "Dedicated fleet of vehicles for different cargo types",
        "Real-time tracking and monitoring systems",
        "Express and standard delivery options",
        "Warehousing and distribution services",
        "Last-mile delivery solutions"
      ]
    },
    {
      icon: <Ship size={32} />,
      title: "UAE Export & Import Support",
      description: "Simplify your international trade between India and UAE with our specialized export and import services, handling everything from documentation to customs clearance and final delivery.",
      features: [
        "Complete export/import documentation assistance",
        "Customs clearance at both Indian and UAE ports",
        "Cargo consolidation and deconsolidation",
        "Air and sea freight options",
        "Dangerous goods handling capabilities",
        "Trade compliance advisory services"
      ]
    },
    {
      icon: <FileText size={32} />,
      title: "Documentation & Compliance",
      description: "Navigate the complex world of logistics documentation and regulatory compliance with our expert team, ensuring smooth operations and avoiding costly delays or penalties.",
      features: [
        "Preparation and verification of shipping documents",
        "Customs documentation and declaration",
        "License and permit application assistance",
        "Certificate of Origin and other trade certificates",
        "GST and tax documentation",
        "Digital document management system"
      ]
    },
    {
      icon: <Map size={32} />,
      title: "Fleet Management & Tracking",
      description: "Our advanced fleet management and tracking services provide real-time visibility of your shipments, allowing you to monitor location, condition, and estimated delivery times with precision.",
      features: [
        "GPS tracking for all vehicles in our fleet",
        "Real-time location updates and notifications",
        "Temperature and condition monitoring for sensitive cargo",
        "Route optimization and planning",
        "Driver management and communication",
        "Detailed reporting and analytics"
      ]
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Insurance & Legal Clearance",
      description: "Protect your valuable cargo with our comprehensive insurance coverage and expert handling of all legal clearances required for domestic and international shipments.",
      features: [
        "Comprehensive cargo insurance options",
        "Claims processing assistance",
        "Risk assessment and management",
        "Legal documentation for cross-border transport",
        "Regulatory compliance services",
        "Liability coverage and protection"
      ]
    },
    {
      icon: <HeadphonesIcon size={32} />,
      title: "24/7 Customer Support",
      description: "Our dedicated customer support team is available around the clock to address your concerns, provide updates on your shipments, and offer assistance whenever you need it.",
      features: [
        "24/7 multilingual support team",
        "Dedicated account managers for key clients",
        "Emergency response protocols",
        "Shipment status updates and notifications",
        "Issue resolution and escalation procedures",
        "Customer feedback and improvement system"
      ]
    }
  ];

  useEffect(() => {
    document.title = 'Services - Triloki Logistics';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero Banner - Added pt-20 to account for fixed header */}
      <section className="relative py-20 pt-32 bg-blue-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-blue-100">
              Comprehensive logistics solutions tailored to your business needs, connecting India and UAE with reliability and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div 
          ref={ref}
          className={`container mx-auto px-4 max-w-4xl text-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">End-to-End Logistics Solutions</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-600 mb-8">
            At Triloki Logistics, we offer a comprehensive range of services designed to meet all your logistics and transportation needs. Whether you're shipping within India or between India and UAE, our expert team ensures smooth, efficient, and cost-effective solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <Truck size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-gray-800 font-medium">Road Transport</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Ship size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-gray-800 font-medium">Sea Freight</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <FileText size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-gray-800 font-medium">Documentation</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Map size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-gray-800 font-medium">Tracking</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <ShieldCheck size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-gray-800 font-medium">Insurance</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <HeadphonesIcon size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-gray-800 font-medium">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <Service
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          features={service.features}
          index={index}
        />
      ))}

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact our team today to discuss your logistics requirements and discover how Triloki Logistics can help streamline your supply chain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#quote" 
              className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-md transition-colors"
            >
              Get a Quote
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;