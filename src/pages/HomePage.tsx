import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import CoverageSection from '../components/home/CoverageSection';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Triloki Logistics - Premier Transport & Logistics Services';
  }, []);

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <CoverageSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;