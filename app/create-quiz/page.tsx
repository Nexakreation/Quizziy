'use client'

import { useState } from 'react'
import Link from 'next/link'
import QuizCreationForm from '../components/QuizCreationForm'
import QuizReview from '../components/QuizReview'
import MetadataForm from '../components/MetadataForm'

type Question = {
  question: string
  answer: string
  options: string[]
}

type QuizData = {
  questions: Question[]
  metadata?: {
    difficulty: "easy" | "medium" | "hard"
    tags: string[]
    subject: string
  }
}

export default function CreateQuiz() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [isAddingMetadata, setIsAddingMetadata] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [quizCreated, setQuizCreated] = useState(false)

  const handleQuizCreation = (data: { questions: Question[] }) => {
    setQuizData(prevData => ({
      ...prevData,
      questions: data.questions
    }))
    setIsAddingMetadata(true)
  }

  const handleMetadataSubmission = (metadata: QuizData['metadata']) => {
    setQuizData(prevData => ({ ...prevData!, metadata }))
    setIsAddingMetadata(false)
    setIsReviewing(true)
  }

  const handleFinishQuiz = async () => {
    if (quizData) {
      // Here you would typically send the quiz data to your backend
      console.log('Quiz data:', quizData)
      // For now, we'll just simulate a successful creation
      setQuizCreated(true)
      setIsReviewing(false)
    }
  }

  const handleEditQuiz = () => {
    setIsReviewing(false)
    setIsAddingMetadata(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary-300">Create a Quiz</h1>
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home Page
        </Link>
      </div>

      {!isAddingMetadata && !isReviewing && !quizCreated && (
        <QuizCreationForm 
          onSubmit={handleQuizCreation} 
          initialQuestions={quizData?.questions || []}
        />
      )}
      
      {isAddingMetadata && quizData && (
        <div className="w-1/3 mx-auto">
          <MetadataForm 
            onSubmit={handleMetadataSubmission}
            initialMetadata={quizData.metadata}
          />
        </div>
      )}
      
      {isReviewing && quizData && quizData.metadata && (
        <QuizReview
          questions={quizData.questions}
          metadata={quizData.metadata}
          onFinish={handleFinishQuiz}
          onEdit={handleEditQuiz}
        />
      )}
      
      {quizCreated && (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Quiz created successfully!</p>
          <button
            onClick={() => {
              setQuizData(null)
              setIsAddingMetadata(false)
              setIsReviewing(false)
              setQuizCreated(false)
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Another Quiz
          </button>
        </div>
      )}
    </main>
  )
}