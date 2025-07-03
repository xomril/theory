import React, { useState, useEffect } from 'react';
import { useQuestionLoader } from '../hooks/useQuestionLoader';
import { useTestGenerator } from '../hooks/useTestGenerator';
import { useTimer } from '../hooks/useTimer';
import LoadingScreen from './LoadingScreen';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import ResultsScreen from './ResultsScreen';

const DrivingTheoryTest: React.FC = () => {
  const { questions, loading, error } = useQuestionLoader();
  const { currentTest, generateTest } = useTestGenerator(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [testMode, setTestMode] = useState('exam');
  const [testStarted, setTestStarted] = useState(false);
  
  const { timeLeft, isActive, startTimer, stopTimer, resetTimer } = useTimer(
    40 * 60, // 40 minutes
    () => handleFinishTest()
  );

  const handleStartTest = () => {
    const test = generateTest();
    if (test.length > 0) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
      setTestStarted(true);
      resetTimer();
      if (testMode === 'exam') {
        startTimer();
      }
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const currentQuestion = currentTest[currentQuestionIndex];
    const newSelectedAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex
    };
    setSelectedAnswers(newSelectedAnswers);

    if (testMode === 'practice') {
      // In practice mode, automatically advance after a delay
      setTimeout(() => {
        if (currentQuestionIndex < currentTest.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          handleFinishTest();
        }
      }, 2000);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentTest.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishTest = () => {
    stopTimer();
    setShowResults(true);
  };

  const handleReset = () => {
    setTestStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    resetTimer();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" dir="rtl">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת השאלות</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <WelcomeScreen
        questions={questions}
        testMode={testMode}
        setTestMode={setTestMode}
        onStartTest={handleStartTest}
      />
    );
  }

  if (showResults) {
    return (
      <ResultsScreen
        currentTest={currentTest}
        selectedAnswers={selectedAnswers}
        onReset={handleReset}
      />
    );
  }

  if (currentTest.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <QuestionScreen
      currentQuestion={currentTest[currentQuestionIndex]}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={currentTest.length}
      selectedAnswers={selectedAnswers}
      testMode={testMode}
      timeLeft={timeLeft}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onFinish={handleFinishTest}
    />
  );
};

export default DrivingTheoryTest;