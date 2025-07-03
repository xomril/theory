import React from 'react';
import { Image } from 'lucide-react';

interface QuestionImageProps {
  imageUrl: string;
  imageAlt?: string;
  imageTitle?: string;
}

const QuestionImage: React.FC<QuestionImageProps> = ({ imageUrl, imageAlt, imageTitle }) => {
  return (
    <div className="mb-8 text-center">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 inline-block border border-gray-200 shadow-lg">
        <div className="text-sm text-gray-600 mb-3 font-medium">
          {imageTitle === 'traffic_sign' ? 'תמרור תנועה' : 
           imageAlt || 'תמונה נלווית'}
        </div>
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={imageAlt || "תמרור או תמונה של השאלה"}
            className="max-w-full max-h-80 rounded-lg shadow-md border border-gray-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'block';
              }
            }}
          />
          <div className="hidden text-center p-8 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2 font-medium">
              {imageTitle === 'traffic_sign' ? 'תמרור תנועה' : 'תמונה נלווית'}
            </p>
            <p className="text-sm text-gray-500 mb-4">התמונה נחסמה על ידי השרת הממשלתי</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 text-sm">
                💡 טיפ: התמונה חיונית לפתרון השאלה
              </p>
            </div>
            <button
              onClick={() => window.open(imageUrl, '_blank')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-md"
            >
              פתח תמונה בכרטיסייה חדשה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionImage;