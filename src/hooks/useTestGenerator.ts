import { useState } from 'react';
import { Question } from './useQuestionLoader';

export const useTestGenerator = (questions: Question[]) => {
  const [currentTest, setCurrentTest] = useState<Question[]>([]);

  const shuffleArray = (array: Question[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateTest = () => {
    if (questions.length === 0) return [];

    const trafficSigns = questions.filter(q => q.category === 'תמרורים');
    const safety = questions.filter(q => q.category === 'בטיחות');
    const vehicleKnowledge = questions.filter(q => q.category === 'הכרת הרכב');
    const trafficLaws = questions.filter(q => q.category === 'חוקי התנועה');
    const firstAid = questions.filter(q => q.category === 'עזרה ראשונה');

    const testQuestions: Question[] = [];
    
    // Add required minimum questions according to Israeli regulations
    if (trafficSigns.length >= 2) {
      testQuestions.push(...shuffleArray(trafficSigns).slice(0, 2));
    }
    if (safety.length >= 2) {
      testQuestions.push(...shuffleArray(safety).slice(0, 2));
    }
    if (firstAid.length >= 1) {
      testQuestions.push(...shuffleArray(firstAid).slice(0, 1));
    }
    if (vehicleKnowledge.length >= 1) {
      testQuestions.push(...shuffleArray(vehicleKnowledge).slice(0, 1));
    }
    
    // Fill remaining questions from all categories
    const usedQuestions = new Set(testQuestions.map(q => q.id));
    const remainingQuestions = questions.filter(q => !usedQuestions.has(q.id));
    const remainingNeeded = 30 - testQuestions.length;
    
    if (remainingNeeded > 0) {
      testQuestions.push(...shuffleArray(remainingQuestions).slice(0, remainingNeeded));
    }

    const finalTest = shuffleArray(testQuestions).slice(0, 30);
    setCurrentTest(finalTest);
    return finalTest;
  };

  return { currentTest, generateTest };
};