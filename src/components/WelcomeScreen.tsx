import React from 'react';
import { Car, BookOpen, Trophy, Clock, Target, Image, Play, AlertCircle } from 'lucide-react';

interface WelcomeScreenProps {
  questions: any[];
  testMode: string;
  setTestMode: (mode: string) => void;
  onStartTest: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ questions, testMode, setTestMode, onStartTest }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 shadow-lg">
              <Car className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              מבחן תיאוריה לנהיגה
            </h1>
            <p className="text-xl text-gray-300">
              מאגר השאלות הרשמי למבחן הנהיגה העיוני
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
            {/* Important Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-10 border border-amber-200">
              <div className="flex items-center text-right">
                <div className="text-right flex-1">
                  <h3 className="font-bold text-amber-900 mb-3 flex items-center justify-end">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    הודעה חשובה לגבי תמונות
                  </h3>
                  <p className="text-amber-800 text-sm mb-2">
                    • {questions.filter(q => q.hasImage).length} שאלות כוללות תמונות (תמרורים וכו')
                  </p>
                  <p className="text-amber-800 text-sm mb-2">
                    • התמונות עלולות להיחסם על ידי השרת הממשלתי
                  </p>
                  <p className="text-amber-800 text-sm">
                    • במקרה של חסימה, לחץ על "פתח תמונה בכרטיסייה חדשה" לצפייה
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{questions.length}</div>
                <div className="text-sm text-blue-700 font-medium">שאלות במאגר</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 mb-4">
                  <Image className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{questions.filter(q => q.hasImage).length}</div>
                <div className="text-sm text-purple-700 font-medium">שאלות עם תמונות</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">87%</div>
                <div className="text-sm text-green-700 font-medium">ציון עובר</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">40</div>
                <div className="text-sm text-orange-700 font-medium">דקות</div>
              </div>
            </div>

            {/* Rules */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center text-right">
                    <BookOpen className="h-5 w-5 mr-2" />
                    חוקי המבחן
                  </h3>
                  <ul className="space-y-3 text-blue-800">
                    <li className="flex items-start text-right">
                      <span>30 שאלות בסך הכל</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                    <li className="flex items-start text-right">
                      <span>לפחות 2 שאלות על תמרורים</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                    <li className="flex items-start text-right">
                      <span>לפחות 2 שאלות על בטיחות</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                    <li className="flex items-start text-right">
                      <span>לפחות 1 שאלה על עזרה ראשונה</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                    <li className="flex items-start text-right">
                      <span>לפחות 1 שאלה על תחזוקת רכב</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center text-right">
                    <Trophy className="h-5 w-5 mr-2" />
                    תנאי הצלחה
                  </h3>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start text-right">
                      <span>26 תשובות נכונות מתוך 30</span>
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                    <li className="flex items-start text-right">
                      <span>זמן: 40 דקות</span>
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                    <li className="flex items-start text-right">
                      <span>ציון מינימלי: 87%</span>
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Test Mode Selection */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-center">בחר מצב מבחן</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  testMode === 'exam' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`} onClick={() => setTestMode('exam')}>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <label htmlFor="exam" className="text-lg font-semibold text-gray-900 cursor-pointer">
                        מצב מבחן
                      </label>
                      <p className="text-sm text-gray-600">תוצאות בסוף המבחן בלבד</p>
                    </div>
                    <input
                      type="radio"
                      id="exam"
                      name="testMode"
                      value="exam"
                      checked={testMode === 'exam'}
                      onChange={() => setTestMode('exam')}
                      className="h-4 w-4 text-blue-600"
                    />
                  </div>
                </div>
                <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  testMode === 'practice' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`} onClick={() => setTestMode('practice')}>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <label htmlFor="practice" className="text-lg font-semibold text-gray-900 cursor-pointer">
                        מצב תרגול
                      </label>
                      <p className="text-sm text-gray-600">תשובות מיידיות אחרי כל שאלה</p>
                    </div>
                    <input
                      type="radio"
                      id="practice"
                      name="testMode"
                      value="practice"
                      checked={testMode === 'practice'}
                      onChange={() => setTestMode('practice')}
                      className="h-4 w-4 text-green-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={onStartTest}
                disabled={questions.length === 0}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto space-x-3"
              >
                <span>התחל מבחן</span>
                <Play className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;