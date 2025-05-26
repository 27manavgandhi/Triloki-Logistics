import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';

interface LocationPin {
  id: number;
  country: 'india' | 'uae';
  name: string;
  x: number;
  y: number;
  isActive?: boolean;
}

const CoverageSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeCountry, setActiveCountry] = useState<'india' | 'uae' | 'all'>('all');
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const indiaPins: LocationPin[] = [
    { id: 1, country: 'india', name: 'Delhi', x: 48, y: 30 },
    { id: 2, country: 'india', name: 'Mumbai', x: 30, y: 65 },
    { id: 3, country: 'india', name: 'Ahmedabad', x: 30, y: 50 },
    { id: 4, country: 'india', name: 'Jaipur', x: 38, y: 40 },
    { id: 5, country: 'india', name: 'Chandigarh', x: 48, y: 25 },
    { id: 6, country: 'india', name: 'Ludhiana', x: 45, y: 22 }
  ];

  const uaePins: LocationPin[] = [
    { id: 7, country: 'uae', name: 'Dubai', x: 75, y: 45 },
    { id: 8, country: 'uae', name: 'Abu Dhabi', x: 70, y: 55 },
    { id: 9, country: 'uae', name: 'Sharjah', x: 78, y: 40 }
  ];

  const allPins = [...indiaPins, ...uaePins];
  
  const filteredPins = activeCountry === 'all' 
    ? allPins 
    : allPins.filter(pin => pin.country === activeCountry);

  return (
    <section 
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Coverage Area</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            With extensive coverage across India and the UAE, we ensure your cargo reaches its destination safely and on time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Map Selector */}
          <div className="w-full lg:w-1/4">
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Region</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveCountry('all')}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                    activeCountry === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Locations
                </button>
                <button 
                  onClick={() => setActiveCountry('india')}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                    activeCountry === 'india' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  India
                </button>
                <button 
                  onClick={() => setActiveCountry('uae')}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                    activeCountry === 'uae' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  United Arab Emirates
                </button>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Major Locations</h4>
                <ul className="space-y-1 text-sm">
                  {filteredPins.map(pin => (
                    <li 
                      key={pin.id}
                      onMouseEnter={() => setHoveredPin(pin.id)}
                      onMouseLeave={() => setHoveredPin(null)}
                      className="flex items-center py-1"
                    >
                      <MapPin size={16} className="text-orange-500 mr-2" />
                      <span>{pin.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="w-full lg:w-3/4 bg-gray-100 rounded-lg p-4 relative">
            <div 
              className="aspect-[16/9] bg-blue-50 rounded relative overflow-hidden"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/697662/pexels-photo-697662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Map Overlay */}
              <div className="absolute inset-0 bg-blue-900/40"></div>
              
              {/* Route Line */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M48 30 C 50 40, 60 45, 75 45"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="0.8"
                  strokeDasharray="2 1"
                  className={`${inView ? 'animate-dash' : ''}`}
                />
              </svg>

              {/* Location Pins */}
              {filteredPins.map((pin) => (
                <div
                  key={pin.id}
                  className={`absolute transition-all duration-300 ${
                    hoveredPin === pin.id ? 'scale-125 z-10' : 'scale-100'
                  }`}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <div className="relative">
                    <MapPin
                      size={hoveredPin === pin.id ? 28 : 24}
                      className={`${
                        pin.country === 'india' ? 'text-blue-600' : 'text-orange-500'
                      } drop-shadow-md`}
                    />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                  
                  {hoveredPin === pin.id && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs font-medium">
                      {pin.name}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
                <span>India Locations</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                <span>UAE Locations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;