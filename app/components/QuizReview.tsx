import React from 'react'

type QuizReviewProps = {
  questions: {
    question: string
    answer: string
    options: string[]
  }[]
  metadata: {
    difficulty: "easy" | "medium" | "hard"
    tags: string[]
    subject: string
  }
  onFinish: () => void
  onEdit: () => void
}

export default function QuizReview({ questions, metadata, onFinish, onEdit }: QuizReviewProps) {
  return (
    <div className="space-y-8 w-5/6 ml-auto mr-auto border-[2px] border-black rounded-2xl p-4 text-white">
      <h2 className="text-2xl font-bold text-[#71c4ef]">Review Your Quiz</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Metadata</h3>
      <div className="flex gap-8">
        <p>Difficulty: {metadata.difficulty}</p>
        <p>Tags: {metadata.tags.join(', ')}</p>
        <p>Subject: {metadata.subject}</p>
      </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Questions</h3>
        {questions.map((q, index) => (
          <div key={index} className="mb-4 p-4 bg-[#1f2b3e] rounded-2xl border-[2px] border-black">
            <p className="font-bold text-black text-lg">Q{index + 1}: {q.question}</p>
            {/* <p className="text-green-600">A: {q.answer}</p> */}
            <ul className="list-decimal pl-5">
              {q.options.map((option, optIndex) => (
                <li key={optIndex} className={option === q.answer ? 'text-green-600' : 'text-[#ff6366]'}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-8 border-[2px] border-black rounded-2xl"
        >
          Edit
        </button>
        <button
          onClick={onFinish}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 border-[2px] border-black rounded-2xl"
        >
          Finish
        </button>
      </div>
    </div>
  )
}