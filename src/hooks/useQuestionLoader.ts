import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
  category: string;
  hasImage: boolean;
  imageUrl?: string;
  imageAlt?: string;
  imageTitle?: string;
}

export const useQuestionLoader = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseQuestionHTML = (htmlContent: string) => {
    const listItemRegex = /<li><span[^>]*>(.*?)<\/span><\/li>/g;
    const correctAnswerRegex = /<span id="correctAnswer\d+"[^>]*>(.*?)<\/span>/;
    const imageRegex = /<img[^>]+src="([^"]+)"[^>]*>/i;
    const imageAltRegex = /<img[^>]+alt="([^"]+)"[^>]*>/i;
    const imageTitleRegex = /<img[^>]+title="([^"]+)"[^>]*>/i;
    
    const answers = [];
    let match;
    
    while ((match = listItemRegex.exec(htmlContent)) !== null) {
      answers.push(match[1]);
    }
    
    const correctMatch = correctAnswerRegex.exec(htmlContent);
    const correctAnswerText = correctMatch ? correctMatch[1] : null;
    
    const imageMatch = imageRegex.exec(htmlContent);
    const imageUrl = imageMatch ? imageMatch[1] : null;
    
    const imageAltMatch = imageAltRegex.exec(htmlContent);
    const imageAlt = imageAltMatch ? imageAltMatch[1] : null;
    
    const imageTitleMatch = imageTitleRegex.exec(htmlContent);
    const imageTitle = imageTitleMatch ? imageTitleMatch[1] : null;
    
    return {
      answers: answers,
      correctAnswer: correctAnswerText,
      correctIndex: correctAnswerText ? answers.indexOf(correctAnswerText) : -1,
      imageUrl: imageUrl,
      imageAlt: imageAlt,
      imageTitle: imageTitle
    };
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/questions.csv');
        if (!response.ok) {
          throw new Error('Failed to load questions');
        }
        
        const csvContent = await response.text();
        const parsed = Papa.parse(csvContent, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          delimiter: ','
        });

        const processedQuestions: Question[] = [];
        
        parsed.data.forEach((row: any, index: number) => {
          if (row.title2 && row.description4 && row.category) {
            const questionNumber = row.title2.match(/^\d+/)?.[0] || (index + 1).toString();
            const questionText = row.title2.replace(/^\d+\.\s*/, '');
            const parsedContent = parseQuestionHTML(row.description4);
            
            if (parsedContent.answers.length >= 4 && parsedContent.correctIndex >= 0) {
              processedQuestions.push({
                id: questionNumber,
                question: questionText,
                answers: parsedContent.answers,
                correctIndex: parsedContent.correctIndex,
                category: row.category,
                hasImage: !!parsedContent.imageUrl,
                imageUrl: parsedContent.imageUrl,
                imageAlt: parsedContent.imageAlt,
                imageTitle: parsedContent.imageTitle
              });
            }
          }
        });

        setQuestions(processedQuestions);
        setLoading(false);
      } catch (err) {
        console.error('Error loading questions:', err);
        setError('Failed to load questions');
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  return { questions, loading, error };
};