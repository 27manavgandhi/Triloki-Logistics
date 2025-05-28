import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Truck, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="/assets/images/logo_white.png"
              alt="Triloki Logistics" 
              className="h-15 w-auto mb-4"
            />
            <p className="mt-4 text-gray-400 text-sm">
              India's premier transport & logistics company providing seamless solutions between India and UAE.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/fleet" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Our Fleet
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Pan-India Logistics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  UAE Export & Import
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Documentation & Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Fleet Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Insurance & Legal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  24/7 Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Bhawana Industrial Area, Delhi, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-orange-500 mr-3 flex-shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91-XXXXXXXXXX
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-orange-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@trilokilogistics.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  info@trilokilogistics.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">24/7 Operations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <h4 className="text-sm font-medium mb-4 text-center">Certifications & Registrations</h4>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">FSSAI Certified</div>
            <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">ISO 9001:2015</div>
            <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">GST Registered</div>
            <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">MSME Certified</div>
            <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">UAE GCC Permit</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Triloki Logistics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;