import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

const StatItem = ({ value, label, suffix = '', delay }: StatItemProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`text-center transition-all duration-700 ease-out ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className="text-4xl font-bold text-white mb-2">
        {inView ? (
          <CountUp 
            end={value} 
            duration={2.5} 
            suffix={suffix} 
            delay={0.5}
          />
        ) : (
          '0'
        )}
      </div>
      <p className="text-blue-100">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem value={15} label="Years of Experience" suffix="+" delay={0} />
          <StatItem value={1000} label="Happy Clients" suffix="+" delay={1} />
          <StatItem value={20} label="Cities Covered" suffix="+" delay={2} />
          <StatItem value={24} label="Hour Support" suffix="/7" delay={3} />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;