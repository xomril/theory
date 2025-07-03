import React from 'react';
import { Car } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 border-r-purple-400 mx-auto mb-6"></div>
          <Car className="h-6 w-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-white font-medium text-lg">טוען שאלות...</p>
        <p className="text-gray-300 text-sm mt-2">מכין את מאגר השאלות עבורך</p>
      </div>
    </div>
  );
};

export default LoadingScreen;