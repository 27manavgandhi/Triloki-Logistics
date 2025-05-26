import { useInView } from 'react-intersection-observer';
import { 
  Truck, 
  Ship, 
  FileText, 
  Map, 
  ShieldCheck, 
  HeadphonesIcon 
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-700 ease-out border-b-4 border-transparent hover:border-blue-600 ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      icon: <Truck size={24} />,
      title: "Pan-India Logistics & Transport",
      description: "Comprehensive logistics solutions covering all major cities and industrial hubs across India with reliable delivery timelines."
    },
    {
      icon: <Ship size={24} />,
      title: "UAE Export & Import Support",
      description: "End-to-end import/export services between India and UAE, handling all shipping, customs, and documentation requirements."
    },
    {
      icon: <FileText size={24} />,
      title: "Documentation & Compliance",
      description: "Expert handling of all logistics documentation, customs clearance, and regulatory compliance for smooth operations."
    },
    {
      icon: <Map size={24} />,
      title: "Fleet Management & Tracking",
      description: "Advanced fleet management with real-time tracking, allowing you to monitor your shipment's location and status 24/7."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Insurance & Legal Clearance",
      description: "Comprehensive insurance coverage and legal assistance to ensure your cargo is protected throughout its journey."
    },
    {
      icon: <HeadphonesIcon size={24} />,
      title: "24/7 Customer Support",
      description: "Round-the-clock customer service to address any concerns, provide updates, or handle emergency situations."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Premium Logistics Services</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Discover our comprehensive range of logistics and transport services designed to meet your business needs with reliability and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/services" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;