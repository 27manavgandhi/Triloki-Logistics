import { Truck } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
}

const Logo = ({ size = 'medium', variant = 'default' }: LogoProps) => {
  const textSizeMap = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-blue-600';
  const subTextColor = variant === 'white' ? 'text-gray-300' : 'text-gray-600';
  
  const iconSizeMap = {
    small: 22,
    medium: 26,
    large: 32,
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className={`flex items-center justify-center ${
          variant === 'white' ? 'bg-blue-600' : 'bg-blue-600'
        } rounded-full p-1.5`}>
          <Truck size={iconSizeMap[size]} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
      </div>
      <div className="ml-2">
        <h1 className={`${textSizeMap[size]} font-bold ${textColor}`}>
          Triloki
        </h1>
        <p className={`-mt-1 text-xs ${subTextColor}`}>Logistics</p>
      </div>
    </div>
  );
};

export default Logo;