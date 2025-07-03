import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentIndex, total }) => {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="relative">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-l from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-3 rounded-full bg-gradient-to-l from-blue-500 to-purple-600 opacity-20"></div>
    </div>
  );
};

export default ProgressBar;