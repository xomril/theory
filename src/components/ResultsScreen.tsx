import React from 'react';
import { Trophy, XCircle, RotateCcw, AlertCircle } from 'lucide-react';

interface ResultsScreenProps {
  currentTest: any[];
  selectedAnswers: Record<string, number>;
  onReset: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ currentTest, selectedAnswers, onReset }) => {
  const calculateResults = () => {
    let correct = 0;
    currentTest.forEach(question => {
      if (selectedAnswers[question.id] === question.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: currentTest.length,
      percentage: Math.round((correct / currentTest.length) * 100),
      passed: correct >= 26
    };
  };

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-lg ${
                results.passed 
                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}>
                {results.passed ? <Trophy className="h-12 w-12 text-white" /> : <XCircle className="h-12 w-12 text-white" />}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {results.passed ? '🎉 כל הכבוד! עברת את המבחן' : '😔 לא עברת את המבחן הפעם'}
              </h2>
              <p className="text-xl text-gray-600">
                {results.correct} מתוך {results.total} תשובות נכונות
              </p>
              <div className={`inline-block px-6 py-2 rounded-full text-2xl font-bold mt-4 ${
                results.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {results.percentage}%
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">{results.correct}</div>
                <div className="text-sm text-blue-700 font-medium">תשובות נכונות</div>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl text-center border border-red-200">
                <div className="text-3xl font-bold text-red-600 mb-2">{results.total - results.correct}</div>
                <div className="text-sm text-red-700 font-medium">תשובות שגויות</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl text-center border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">{results.percentage}%</div>
                <div className="text-sm text-green-700 font-medium">ציון סופי</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">{results.passed ? 'עבר' : 'נכשל'}</div>
                <div className="text-sm text-purple-700 font-medium">תוצאה סופית</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center text-right">
                <AlertCircle className="h-6 w-6 mr-2" />
                סיכום מפורט
              </h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {currentTest.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer === question.correctIndex;
                    
                    return (
                      <div key={question.id} className={`p-4 rounded-lg border-r-4 ${
                        isCorrect 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50'
                      }`}>
                        <div className="flex items-start space-x-4">
                          <div className="flex-1 text-right">
                            <p className="font-semibold text-gray-900 mb-2">{question.question}</p>
                            <div className="text-sm space-y-1">
                              {userAnswer !== undefined && (
                                <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                  התשובה שלך: {question.answers[userAnswer]}
                                </p>
                              )}
                              {!isCorrect && (
                                <p className="text-green-800 font-medium">
                                  התשובה הנכונה: {question.answers[question.correctIndex]}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCorrect 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <button
                onClick={onReset}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto space-x-3"
              >
                <span>מבחן חדש</span>
                <RotateCcw className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;