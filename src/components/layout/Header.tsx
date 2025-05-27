import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Truck } from 'lucide-react';

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
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <img 
              src={isScrolled 
                ? "/public/assests/images/logo.png" 
                : "/public/assests/images/logo_white.png"
              }
              alt="Triloki Logistics" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-16 w-auto' : 'h-24 w-auto'
              }`}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['/', '/services', '/fleet', '/contact'].map((path, idx) => {
              const names = ['Home', 'Services', 'Fleet', 'Contact'];
              return (
                <NavLink 
                  key={path} 
                  to={path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive 
                        ? isScrolled ? 'text-blue-600' : 'text-white'
                        : isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white/90 hover:text-white'
                    }`
                  }
                >
                  {names[idx]}
                </NavLink>
              );
            })}
            <a 
              href="tel:+91XXXXXXXXXX" 
              className={`flex items-center text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-white hover:text-orange-300'
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
            className={`md:hidden focus:outline-none transition-colors ${
              isScrolled 
                ? 'text-gray-800 hover:text-gray-600' 
                : 'text-white hover:text-white/80'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        } ${
          isScrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {['/', '/services', '/fleet', '/contact'].map((path, idx) => {
              const names = ['Home', 'Services', 'Fleet', 'Contact'];
              return (
                <NavLink 
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                    }`
                  }
                  onClick={closeMenu}
                >
                  {names[idx]}
                </NavLink>
              );
            })}
            <a 
              href="tel:+91XXXXXXXXXX" 
              className="flex items-center text-base font-medium text-blue-600 hover:text-blue-700 transition-colors"
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