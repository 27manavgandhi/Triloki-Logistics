import { useState, useEffect, useRef } from 'react';
import { MapPin, Truck, Plane, Ship, ArrowRight, Globe, Users, Clock, Navigation } from 'lucide-react';

interface LocationPin {
  id: number;
  country: 'india' | 'uae';
  name: string;
  lat: number;
  lng: number;
  type: 'major' | 'port' | 'airport' | 'industrial';
  isActive?: boolean;
}

const CoverageSection = () => {
  const [activeCountry, setActiveCountry] = useState<'india' | 'uae' | 'all'>('all');
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'stats'>('map');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Real coordinates for India locations
  const indiaPins: LocationPin[] = [
    // Major Cities
    { id: 1, country: 'india', name: 'New Delhi', lat: 28.6139, lng: 77.2090, type: 'major' },
    { id: 2, country: 'india', name: 'Mumbai', lat: 19.0760, lng: 72.8777, type: 'major' },
    { id: 3, country: 'india', name: 'Kolkata', lat: 22.5726, lng: 88.3639, type: 'major' },
    { id: 4, country: 'india', name: 'Chennai', lat: 13.0827, lng: 80.2707, type: 'major' },
    { id: 5, country: 'india', name: 'Bangalore', lat: 12.9716, lng: 77.5946, type: 'major' },
    { id: 6, country: 'india', name: 'Hyderabad', lat: 17.3850, lng: 78.4867, type: 'major' },
    { id: 7, country: 'india', name: 'Pune', lat: 18.5204, lng: 73.8567, type: 'major' },
    { id: 8, country: 'india', name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, type: 'major' },
    { id: 9, country: 'india', name: 'Jaipur', lat: 26.9124, lng: 75.7873, type: 'major' },
    { id: 10, country: 'india', name: 'Surat', lat: 21.1702, lng: 72.8311, type: 'major' },
    
    // Northern Cities
    { id: 11, country: 'india', name: 'Chandigarh', lat: 30.7333, lng: 76.7794, type: 'major' },
    { id: 12, country: 'india', name: 'Ludhiana', lat: 30.9010, lng: 75.8573, type: 'industrial' },
    { id: 13, country: 'india', name: 'Amritsar', lat: 31.6340, lng: 74.8723, type: 'major' },
    { id: 14, country: 'india', name: 'Jammu', lat: 32.7266, lng: 74.8570, type: 'major' },
    { id: 15, country: 'india', name: 'Shimla', lat: 31.1048, lng: 77.1734, type: 'major' },
    
    // Eastern Cities
    { id: 16, country: 'india', name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245, type: 'major' },
    { id: 17, country: 'india', name: 'Guwahati', lat: 26.1445, lng: 91.7362, type: 'major' },
    { id: 18, country: 'india', name: 'Siliguri', lat: 26.7271, lng: 88.3953, type: 'major' },
    { id: 19, country: 'india', name: 'Patna', lat: 25.5941, lng: 85.1376, type: 'major' },
    
    // Western Cities
    { id: 20, country: 'india', name: 'Nagpur', lat: 21.1458, lng: 79.0882, type: 'major' },
    { id: 21, country: 'india', name: 'Indore', lat: 22.7196, lng: 75.8577, type: 'major' },
    { id: 22, country: 'india', name: 'Bhopal', lat: 23.2599, lng: 77.4126, type: 'major' },
    { id: 23, country: 'india', name: 'Nashik', lat: 19.9975, lng: 73.7898, type: 'industrial' },
    
    // Southern Cities
    { id: 24, country: 'india', name: 'Kochi', lat: 9.9312, lng: 76.2673, type: 'port' },
    { id: 25, country: 'india', name: 'Coimbatore', lat: 11.0168, lng: 76.9558, type: 'industrial' },
    { id: 26, country: 'india', name: 'Mysore', lat: 12.2958, lng: 76.6394, type: 'major' },
    { id: 27, country: 'india', name: 'Mangalore', lat: 12.9141, lng: 74.8560, type: 'port' },
    { id: 28, country: 'india', name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, type: 'port' },
    { id: 29, country: 'india', name: 'Vijayawada', lat: 16.5062, lng: 80.6480, type: 'major' },
    
    // Ports
    { id: 30, country: 'india', name: 'Kandla', lat: 23.0333, lng: 70.2167, type: 'port' },
    { id: 31, country: 'india', name: 'Paradip', lat: 20.3175, lng: 86.6209, type: 'port' },
    { id: 32, country: 'india', name: 'Tuticorin', lat: 8.7642, lng: 78.1348, type: 'port' },
  ];

  // Real coordinates for UAE locations
  const uaePins: LocationPin[] = [
    // Major Emirates
    { id: 36, country: 'uae', name: 'Dubai', lat: 25.2048, lng: 55.2708, type: 'major' },
    { id: 37, country: 'uae', name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773, type: 'major' },
    { id: 38, country: 'uae', name: 'Sharjah', lat: 25.3463, lng: 55.4209, type: 'major' },
    { id: 39, country: 'uae', name: 'Ajman', lat: 25.4052, lng: 55.5136, type: 'major' },
    { id: 40, country: 'uae', name: 'Ras Al Khaimah', lat: 25.7897, lng: 55.9433, type: 'major' },
    { id: 41, country: 'uae', name: 'Fujairah', lat: 25.1164, lng: 56.3264, type: 'port' },
    { id: 42, country: 'uae', name: 'Umm Al Quwain', lat: 25.5034, lng: 55.6906, type: 'major' },
    
    // Key Ports and Industrial Areas
    { id: 43, country: 'uae', name: 'Jebel Ali', lat: 24.9917, lng: 55.0783, type: 'port' },
    { id: 44, country: 'uae', name: 'Port Rashid', lat: 25.2395, lng: 55.2739, type: 'port' },
    { id: 45, country: 'uae', name: 'Khalifa Port', lat: 24.5373, lng: 54.6178, type: 'port' },
    { id: 46, country: 'uae', name: 'Mussafah', lat: 24.3563, lng: 54.5047, type: 'industrial' },
    { id: 47, country: 'uae', name: 'JAFZA', lat: 24.9980, lng: 55.1140, type: 'industrial' },
    
    // Airports
    { id: 48, country: 'uae', name: 'DXB Airport', lat: 25.2532, lng: 55.3657, type: 'airport' },
    { id: 49, country: 'uae', name: 'AUH Airport', lat: 24.4330, lng: 54.6511, type: 'airport' },
    { id: 50, country: 'uae', name: 'SHJ Airport', lat: 25.3281, lng: 55.5172, type: 'airport' },
  ];

  const allPins = [...indiaPins, ...uaePins];
  const filteredPins = activeCountry === 'all' 
    ? allPins 
    : allPins.filter(pin => pin.country === activeCountry);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'port': return <Ship size={12} />;
      case 'airport': return <Plane size={12} />;
      case 'industrial': return <Truck size={12} />;
      default: return <MapPin size={12} />;
    }
  };

  const getColorForType = (type: string, country: string) => {
    switch (type) {
      case 'port': return country === 'india' ? '#0891b2' : '#14b8a6';
      case 'airport': return country === 'india' ? '#7c3aed' : '#ec4899';
      case 'industrial': return country === 'india' ? '#059669' : '#10b981';
      default: return country === 'india' ? '#2563eb' : '#ea580c';
    }
  };

  const stats = [
    { icon: <Globe className="w-8 h-8" />, value: '50+', label: 'Cities Covered', color: 'text-blue-600' },
    { icon: <Truck className="w-8 h-8" />, value: '500+', label: 'Daily Routes', color: 'text-green-600' },
    { icon: <Users className="w-8 h-8" />, value: '10K+', label: 'Happy Clients', color: 'text-purple-600' },
    { icon: <Clock className="w-8 h-8" />, value: '24/7', label: 'Service Hours', color: 'text-orange-600' },
  ];

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 5,
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{ "color": "#1e293b" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#64748b" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#0f172a" }]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#334155" }]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{ "color": "#1e293b" }]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{ "color": "#334155" }]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#475569" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{ "color": "#64748b" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#0f172a" }]
          }
        ],
        disableDefaultUI: false,
        gestureHandling: 'cooperative',
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: false,
      });

      googleMapRef.current = map;
      infoWindowRef.current = new window.google.maps.InfoWindow();
      
      // Add markers
      updateMarkers();
      setMapLoaded(true);

      // Fit bounds to show all locations
      const bounds = new window.google.maps.LatLngBounds();
      allPins.forEach(pin => {
        bounds.extend({ lat: pin.lat, lng: pin.lng });
      });
      map.fitBounds(bounds);
    };

    const loadGoogleMaps = () => {
      if (window.google) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPQH2kT4Ahmj3UNIvNw3RBvKm9cSegHrQ&libraries=geometry`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    if (activeTab === 'map') {
      setTimeout(loadGoogleMaps, 100);
    }
  }, [activeTab]);

  const updateMarkers = () => {
    if (!googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    filteredPins.forEach(pin => {
      const color = getColorForType(pin.type, pin.country);
      
      // Create custom marker icon
      const pinIcon = {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
        fillColor: color,
        fillOpacity: 0.9,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 1.5,
        anchor: { x: 12, y: 24 }
      };

      const marker = new window.google.maps.Marker({
        position: { lat: pin.lat, lng: pin.lng },
        map: googleMapRef.current,
        title: pin.name,
        icon: pinIcon,
        animation: window.google.maps.Animation.DROP
      });

      // Add info window
      marker.addListener('click', () => {
        const content = `
          <div style="padding: 10px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">${pin.name}</h3>
            <div style="display: flex; align-items: center; gap: 8px; color: #6b7280; font-size: 14px;">
              <span style="color: ${color};">●</span>
              <span style="text-transform: capitalize;">${pin.type} • ${pin.country.toUpperCase()}</span>
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: #9ca3af;">
              Lat: ${pin.lat.toFixed(4)}, Lng: ${pin.lng.toFixed(4)}
            </div>
          </div>
        `;
        
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open(googleMapRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Add routes between major cities
    if (activeCountry === 'all') {
      addRoutes();
    }
  };

  const addRoutes = () => {
    if (!googleMapRef.current) return;

    // Major routes between key cities
    const routes = [
      { from: { lat: 19.0760, lng: 72.8777 }, to: { lat: 25.2048, lng: 55.2708 } }, // Mumbai to Dubai
      { from: { lat: 28.6139, lng: 77.2090 }, to: { lat: 24.4539, lng: 54.3773 } }, // Delhi to Abu Dhabi
      { from: { lat: 13.0827, lng: 80.2707 }, to: { lat: 25.2048, lng: 55.2708 } }, // Chennai to Dubai
    ];

    routes.forEach((route, index) => {
      const flightPath = new window.google.maps.Polyline({
        path: [route.from, route.to],
        geodesic: true,
        strokeColor: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b',
        strokeOpacity: 0.8,
        strokeWeight: 3,
      });

      flightPath.setMap(googleMapRef.current);
    });
  };

  // Update markers when country filter changes
  useEffect(() => {
    if (mapLoaded) {
      updateMarkers();
      
      // Adjust map bounds
      if (filteredPins.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        filteredPins.forEach(pin => {
          bounds.extend({ lat: pin.lat, lng: pin.lng });
        });
        googleMapRef.current.fitBounds(bounds);
      }
    }
  }, [activeCountry, mapLoaded]);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-4xl mx-auto mb-8 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent text-sm font-semibold mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            GLOBAL COVERAGE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Connecting India & UAE
            <span className="block text-2xl md:text-3xl font-medium text-gray-600 mt-2">
              Through Seamless Logistics
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-orange-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Experience unparalleled connectivity with our extensive network spanning over 50 cities across India and UAE, 
            ensuring your cargo reaches every destination with precision and care.
          </p>
        </div>

        {/* Mobile Tab Selector */}
        <div className="lg:hidden mb-6">
          <div className="flex bg-white rounded-xl p-1 shadow-lg">
            <button 
              onClick={() => setActiveTab('map')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'map' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Interactive Map
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'stats' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Our Reach
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className={`w-full lg:w-1/3 xl:w-1/4 ${activeTab === 'map' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Navigation className="w-6 h-6 text-blue-600" />
                Select Region
              </h3>
              
              <div className="space-y-3 mb-8">
                {[
                  { key: 'all', label: 'All Locations', count: allPins.length },
                  { key: 'india', label: 'India', count: indiaPins.length },
                  { key: 'uae', label: 'United Arab Emirates', count: uaePins.length }
                ].map(({ key, label, count }) => (
                  <button 
                    key={key}
                    onClick={() => setActiveCountry(key as any)}
                    className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 group ${
                      activeCountry === key 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-[1.02]' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{label}</span>
                      <div className={`flex items-center gap-2 ${
                        activeCountry === key ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-sm">{count}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-700 mb-4">Location Types</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'major', label: 'Major Cities', icon: <MapPin size={14} /> },
                    { type: 'port', label: 'Ports', icon: <Ship size={14} /> },
                    { type: 'airport', label: 'Airports', icon: <Plane size={14} /> },
                    { type: 'industrial', label: 'Industrial', icon: <Truck size={14} /> }
                  ].map(({ type, label, icon }) => (
                    <div key={type} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="text-blue-600">{icon}</div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Controls */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="font-semibold text-gray-700 mb-4">Map Features</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>India Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>UAE Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500"></div>
                    <span>Transport Routes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            {/* Google Maps */}
            <div className={`${activeTab === 'map' ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-white/20">
                <div className="relative">
                  <div 
                    ref={mapRef}
                    className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-inner"
                    style={{ background: '#1e293b' }}
                  />
                  
                  {/* Map Loading Overlay */}
                  {!mapLoaded && (
                    <div className="absolute inset-0 bg-slate-900 rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Loading Interactive Map...</p>
                        <p className="text-sm text-gray-400">Connecting to Google Maps</p>
                      </div>
                    </div>
                  )}

                  {/* Map Info Overlays */}
                  <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-700/30 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-gray-300">LIVE LOCATIONS</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                      {filteredPins.length}
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-700/30 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-3 h-3 text-gray-400" />
                      <span className="text-xs font-medium text-gray-300">COVERAGE AREA</span>
                    </div>
                    <div className="text-lg font-bold">
                      {activeCountry === 'all' ? (
                        <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                          IND + UAE
                        </span>
                      ) : (
                        <span className={activeCountry === 'india' ? 'text-blue-400' : 'text-orange-400'}>
                          {activeCountry.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Map Instructions */}
                  <div className="absolute bottom-4 left-4 bg-blue-500/90 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      <span>Click markers for details</span>
                                          </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className={`${activeTab === 'stats' ? 'block' : 'hidden lg:block'} mt-6 lg:mt-0`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-600" />
                  Our Network Reach
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className={`${stat.color} mb-4`}>
                        {stat.icon}
                      </div>
                      <h4 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h4>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 border border-blue-100/50">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Coverage Highlights</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Comprehensive coverage across all major Indian cities and industrial hubs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Strategic presence in all 7 Emirates of the UAE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Daily connections between major ports in India and UAE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>24/7 tracking and support for all shipments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
