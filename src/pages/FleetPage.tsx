import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface VehicleCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  capacity: string;
  bestFor: string;
  delay: number;
}

const VehicleCard = ({ title, description, image, features, capacity, bestFor, delay }: VehicleCardProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">{description}</p>
        
        <div className="mb-4">
          <div className="flex items-center text-sm mb-2">
            <span className="font-semibold text-gray-800 mr-2">Capacity:</span>
            <span className="text-gray-600">{capacity}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-semibold text-gray-800 mr-2">Best For:</span>
            <span className="text-gray-600">{bestFor}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start text-sm">
              <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-gray-700">{feature}</p>
            </div>
          ))}
        </div>
        
        <a 
          href="#quote" 
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group"
        >
          Request This Vehicle
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

const FleetPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const vehicles = [
    {
      title: "Container Trucks",
      description: "Our container trucks provide secure transportation for all types of containerized cargo, ensuring safe delivery across India and to UAE ports.",
      image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "20ft and 40ft container capacity",
        "GPS tracking enabled",
        "Tamper-proof locking systems",
        "Experienced drivers"
      ],
      capacity: "20-30 tons",
      bestFor: "Large shipments, international cargo"
    },
    {
      title: "Refrigerated Vehicles",
      description: "Temperature-controlled vehicles designed for transporting perishable goods, pharmaceuticals, and other temperature-sensitive products.",
      image: "https://images.pexels.com/photos/2547183/pexels-photo-2547183.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Temperature range: -25°C to +25°C",
        "Real-time temperature monitoring",
        "Backup cooling systems",
        "Thermal insulation"
      ],
      capacity: "5-20 tons",
      bestFor: "Food, pharmaceuticals, chemicals"
    },
    {
      title: "Flatbed Trailers",
      description: "Versatile flatbed trailers ideal for transporting oversized or irregularly shaped cargo that doesn't require enclosed protection.",
      image: "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Extendable options available",
        "Heavy-duty construction",
        "Load securing equipment",
        "Multi-axle configurations"
      ],
      capacity: "15-40 tons",
      bestFor: "Construction materials, machinery"
    },
    {
      title: "Mini Trucks & LCVs",
      description: "Compact light commercial vehicles perfect for urban deliveries, smaller shipments, and last-mile logistics solutions.",
      image: "https://images.pexels.com/photos/15850696/pexels-photo-15850696/free-photo-of-delivery-truck-driving-on-a-road.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Fuel efficient operation",
        "Easy urban navigation",
        "Rapid loading/unloading",
        "Cost-effective for small loads"
      ],
      capacity: "1-3 tons",
      bestFor: "Urban deliveries, retail distribution"
    },
    {
      title: "Heavy Machinery Transport",
      description: "Specialized vehicles designed for the safe transportation of heavy machinery, equipment, and industrial components.",
      image: "https://images.pexels.com/photos/271026/pexels-photo-271026.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Hydraulic ramps and lifts",
        "Reinforced chassis",
        "Multiple securing points",
        "Oversized load management"
      ],
      capacity: "30-60 tons",
      bestFor: "Construction equipment, industrial machinery"
    },
    {
      title: "Specialized Cargo Vehicles",
      description: "Custom-designed vehicles for specific cargo types, including hazardous materials, valuable goods, and specialized equipment.",
      image: "https://images.pexels.com/photos/5025516/pexels-photo-5025516.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "ADR compliant for hazardous goods",
        "Enhanced security features",
        "Custom cargo compartments",
        "Specialized handling equipment"
      ],
      capacity: "Varies by configuration",
      bestFor: "Hazardous materials, high-value goods"
    }
  ];

  useEffect(() => {
    document.title = 'Our Fleet - Triloki Logistics';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 bg-blue-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3839651/pexels-photo-3839651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Our Fleet</h1>
            <p className="text-xl text-blue-100">
              Discover our diverse range of vehicles designed to handle all your logistics needs with efficiency and reliability.
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Modern, Diverse, and Reliable</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-600 mb-8">
            Triloki Logistics maintains a modern and diverse fleet of vehicles to handle any type of cargo. From temperature-controlled refrigerated vehicles to heavy-duty flatbed trailers, our fleet is equipped with the latest technology to ensure safe and efficient transportation of your goods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-blue-600 font-bold text-4xl mb-2">100+</div>
              <p className="text-gray-700">Vehicles in our fleet</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-blue-600 font-bold text-4xl mb-2">6</div>
              <p className="text-gray-700">Vehicle categories</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-blue-600 font-bold text-4xl mb-2">24/7</div>
              <p className="text-gray-700">Fleet availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vehicle Types</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              We offer a wide range of vehicles to suit all your logistics and transportation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <VehicleCard
                key={index}
                title={vehicle.title}
                description={vehicle.description}
                image={vehicle.image}
                features={vehicle.features}
                capacity={vehicle.capacity}
                bestFor={vehicle.bestFor}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Management */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Advanced Fleet Management</h2>
              <div className="w-16 h-1 bg-orange-500 mb-6"></div>
              <p className="text-gray-600 mb-6">
                Our fleet is managed using cutting-edge technology to ensure reliable, efficient, and safe transportation of your goods. With real-time tracking, preventive maintenance, and experienced drivers, we deliver excellence in logistics.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Real-Time GPS Tracking</h3>
                    <p className="text-gray-600 text-sm">Monitor your shipment's location at any time through our tracking system.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Preventive Maintenance</h3>
                    <p className="text-gray-600 text-sm">Regular maintenance schedules to prevent breakdowns and delays.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Professional Drivers</h3>
                    <p className="text-gray-600 text-sm">Experienced, trained, and certified drivers for safe transportation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                    <p className="text-gray-600 text-sm">Round-the-clock support for any fleet-related queries or concerns.</p>
                  </div>
                </div>
              </div>
              <a 
                href="#quote" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Book a Vehicle
              </a>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3761504/pexels-photo-3761504.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Fleet Management" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Vehicle for Your Cargo?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact us today to book the right vehicle for your transportation needs. Our logistics experts will help you choose the best option.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#quote" 
              className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-md transition-colors"
            >
              Book Now
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

export default FleetPage;