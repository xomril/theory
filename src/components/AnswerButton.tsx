import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface AnswerButtonProps {
  answer: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showCorrectAnswer: boolean;
  onSelect: (index: number) => void;
  disabled: boolean;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  answer,
  index,
  isSelected,
  isCorrect,
  showCorrectAnswer,
  onSelect,
  disabled
}) => {
  let buttonClass = 'w-full text-right p-6 rounded-xl border-2 transition-all duration-300 transform ';
  
  if (showCorrectAnswer) {
    if (isCorrect) {
      buttonClass += 'border-green-400 bg-gradient-to-r from-green-50 to-green-100 text-green-900 shadow-lg';
    } else if (isSelected && !isCorrect) {
      buttonClass += 'border-red-400 bg-gradient-to-r from-red-50 to-red-100 text-red-900 shadow-lg';
    } else {
      buttonClass += 'border-gray-200 bg-gray-50 text-gray-600';
    }
  } else if (isSelected) {
    buttonClass += 'border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 shadow-lg transform scale-[1.02]';
  } else {
    buttonClass += 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-lg hover:scale-[1.01]';
  }

  return (
    <button
      onClick={() => onSelect(index)}
      disabled={disabled}
      className={buttonClass}
      dir="rtl"
    >
      <div className="flex items-center justify-between w-full">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
          showCorrectAnswer && isCorrect
            ? 'bg-green-500 text-white'
            : showCorrectAnswer && isSelected && !isCorrect
            ? 'bg-red-500 text-white'
            : isSelected
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}>
          {String.fromCharCode(65 + index)}
        </div>
        
        <div className="flex-1 text-right mr-4">
          <span className="font-medium text-lg">
            {answer}
          </span>
        </div>
        
        <div className="flex-shrink-0">
          {showCorrectAnswer && isCorrect && (
            <CheckCircle className="h-6 w-6 text-green-600" />
          )}
          {showCorrectAnswer && isSelected && !isCorrect && (
            <XCircle className="h-6 w-6 text-red-600" />
          )}
        </div>
      </div>
    </button>
  );
};

export default AnswerButton;