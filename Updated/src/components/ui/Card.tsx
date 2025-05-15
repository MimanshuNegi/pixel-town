import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false
}) => {
  return (
    <div
      className={`
        bg-dark-800/70 backdrop-blur-sm
        border border-dark-700
        rounded-xl p-6
        ${hoverEffect ? 'hover:border-primary-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;