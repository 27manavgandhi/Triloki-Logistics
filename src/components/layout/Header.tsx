import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Truck } from 'lucide-react';
import Logo from '../common/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <Logo size={isScrolled ? 'small' : 'medium'} />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" 
              className={({isActive}) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-blue-600' 
                      : 'text-gray-800 hover:text-blue-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink to="/services" 
              className={({isActive}) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-blue-600' 
                      : 'text-gray-800 hover:text-blue-600'
                }`
              }
            >
              Services
            </NavLink>
            <NavLink to="/fleet" 
              className={({isActive}) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-blue-600' 
                      : 'text-gray-800 hover:text-blue-600'
                }`
              }
            >
              Fleet
            </NavLink>
            <NavLink to="/contact" 
              className={({isActive}) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-blue-600' 
                      : 'text-gray-800 hover:text-blue-600'
                }`
              }
            >
              Contact
            </NavLink>
            <a 
              href="tel:+91XXXXXXXXXX" 
              className={`flex items-center text-sm font-medium ${
                isScrolled ? 'text-blue-600' : 'text-blue-600'
              }`}
            >
              <Truck size={16} className="mr-1" />
              +91-XXXXXXXXXX
            </a>
            <a 
              href="#quote" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Get Quote
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white absolute top-full left-0 right-0 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800'}`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={({isActive}) => 
                `text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800'}`
              }
              onClick={closeMenu}
            >
              Services
            </NavLink>
            <NavLink 
              to="/fleet" 
              className={({isActive}) => 
                `text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800'}`
              }
              onClick={closeMenu}
            >
              Fleet
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => 
                `text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800'}`
              }
              onClick={closeMenu}
            >
              Contact
            </NavLink>
            <a 
              href="tel:+91XXXXXXXXXX" 
              className="flex items-center text-base font-medium text-blue-600"
              onClick={closeMenu}
            >
              <Truck size={18} className="mr-2" />
              +91-XXXXXXXXXX
            </a>
            <a 
              href="#quote" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-base font-medium transition-colors text-center"
              onClick={closeMenu}
            >
              Get Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;