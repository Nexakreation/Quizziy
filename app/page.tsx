'use client'

import { useState, useEffect } from 'react'
import QuizForm from './components/QuizForm'
import QuizQuestion from './components/QuizQuestion'
import Results from './components/Results'

interface QuizData {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
  metadata: {
    topic: string;
    numQuestions: number;
    difficulty: string;
    language: string;
    timePerQuestion: number;
  };
}

export default function Home() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [timePerQuestion, setTimePerQuestion] = useState(60)
  const [timeLeft, setTimeLeft] = useState(0)
  const [language, setLanguage] = useState('English')
  const [difficulty, setDifficulty] = useState('Easy')

  const popularTopics = [
    'World History',
    'Science',
    'Literature',
    'Geography',
    'Technology',
    'Pop Culture'
  ]

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizData && !showResults && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizData) {
      handleAnswer('Timed Out');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizData, showResults]);

  const handleQuizSubmit = async (topic: string, numQuestions: number, language: string, difficulty: string, timePerQuestion: number) => {
    setIsLoading(true)
    try {
      console.log(`Submitting quiz request for topic: ${topic}, questions: ${numQuestions}, quiz language: ${language}, difficulty of questions: ${difficulty}, time per question: ${timePerQuestion}`);
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, numQuestions, language, difficulty, timePerQuestion }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(JSON.stringify(data))
      }
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions generated')
      }
      console.log('Quiz data received:', data);
      setQuizData(data)
      setCurrentQuestion(0)
      setUserAnswers([])
      setTimeLeft(timePerQuestion)
    } catch (err: unknown) {
      console.error('Error in quiz generation:', err);
      setQuizData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer])
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(timePerQuestion) // Reset timer for next question
    } else {
      setShowResults(true)
    }
  }

  const restartQuiz = () => {
    setQuizData(null)
    setCurrentQuestion(0)
    setUserAnswers([])
    setShowResults(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#ff6366] to-[#71c4ef] text-transparent bg-clip-text animate-pulse hover:scale-105 transform transition-transform duration-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] pb-4">
        🎯 Ultimate Quiz Challenge 🎮
      </h1>

      {!quizData && (
        <QuizForm 
          onSubmit={handleQuizSubmit} 
          popularTopics={popularTopics}
          setLanguage={setLanguage}
          setDifficulty={setDifficulty}
          setTimePerQuestion={setTimePerQuestion}
          isLoading={isLoading}
        />
      )}
      {quizData && quizData.questions && quizData.questions.length > 0 && !showResults && (
        <>
          <div className="text-center mb-4 relative">
            <div className="w-full h-2 bg-gray-700 rounded-full mb-2">
              <div 
                className="h-full bg-gradient-to-r from-[#ff6366] to-[#71c4ef] rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
              />
            </div>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-[#ff6366] to-[#71c4ef] text-transparent bg-clip-text animate-pulse">
              {timeLeft} seconds remaining
            </p>
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              <span className="text-2xl animate-ping">⏰</span>
            </div>
          </div>
          <QuizQuestion
            question={quizData.questions[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion + 1}
            totalQuestions={quizData.questions.length}
          />
        </>
      )}
      {showResults && quizData && (
        <Results
          answers={userAnswers}
          quizData={quizData}
          onRestart={restartQuiz}
        />
      )}
    </main>
  )
}