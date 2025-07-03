import React from 'react';
import { BookOpen, Image } from 'lucide-react';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import QuestionImage from './QuestionImage';
import AnswerButton from './AnswerButton';

interface QuestionScreenProps {
  currentQuestion: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswers: Record<string, number>;
  testMode: string;
  timeLeft: number;
  onAnswerSelect: (answerIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswers,
  testMode,
  timeLeft,
  onAnswerSelect,
  onNext,
  onPrevious,
  onFinish
}) => {
  const userAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = userAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 flex items-center justify-end">
                      <span>{currentQuestion.category}</span>
                      {currentQuestion.hasImage && (
                        <Image className="h-4 w-4 text-blue-600 mr-2" />
                      )}
                    </div>
                    <span className="font-bold text-gray-900 text-lg">
                      שאלה {currentQuestionIndex + 1} מתוך {totalQuestions}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <Timer timeLeft={timeLeft} testMode={testMode} />
            </div>
            
            <ProgressBar currentIndex={currentQuestionIndex} total={totalQuestions} />
          </div>

          {/* Question */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed text-right">
              {currentQuestion.question}
            </h2>

            {/* Image Display */}
            {currentQuestion.imageUrl && (
              <QuestionImage
                imageUrl={currentQuestion.imageUrl}
                imageAlt={currentQuestion.imageAlt}
                imageTitle={currentQuestion.imageTitle}
              />
            )}

            <div className="space-y-4">
              {currentQuestion.answers.map((answer: string, index: number) => (
                <AnswerButton
                  key={index}
                  answer={answer}
                  index={index}
                  isSelected={userAnswer === index}
                  isCorrect={index === currentQuestion.correctIndex}
                  showCorrectAnswer={testMode === 'practice' && isAnswered}
                  onSelect={onAnswerSelect}
                  disabled={testMode === 'practice' && isAnswered}
                />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {testMode === 'exam' && (
                  <button
                    onClick={onNext}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    {currentQuestionIndex === totalQuestions - 1 ? 'סיים' : 'שאלה הבאה'}
                  </button>
                )}
                
                {testMode === 'exam' && (
                  <button
                    onClick={onFinish}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    סיים מבחן
                  </button>
                )}
              </div>
              
              <button
                onClick={onPrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                שאלה קודמת
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;