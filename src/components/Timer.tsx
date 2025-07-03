import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  testMode: string;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, testMode }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (testMode !== 'exam') return null;

  return (
    <div className="flex items-center space-x-3">
      <div className="text-right">
        <div className="text-sm text-gray-600">זמן נותר</div>
        <span className={`font-bold text-lg ${timeLeft < 300 ? 'text-red-600' : 'text-orange-600'}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        timeLeft < 300 ? 'bg-red-100' : 'bg-orange-100'
      }`}>
        <Clock className={`h-5 w-5 ${timeLeft < 300 ? 'text-red-600' : 'text-orange-600'}`} />
      </div>
    </div>
  );
};

export default Timer;