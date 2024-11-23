import { useState } from 'react'
import Image from 'next/image'

export default function QuizForm({ onSubmit, popularTopics, setLanguage, setDifficulty, setTimePerQuestion, isLoading }) {
    const [topic, setTopic] = useState('')
    const [numQuestions, setNumQuestions] = useState(5)
    const [quizLanguage, setQuizLanguage] = useState('English')
    const [quizDifficulty, setQuizDifficulty] = useState('Easy')
    const [quizTimePerQuestion, setQuizTimePerQuestion] = useState(30)

    const handleSubmit = (e) => {
        e.preventDefault()

        setLanguage(quizLanguage)
        setDifficulty(quizDifficulty)
        setTimePerQuestion(quizTimePerQuestion)

        onSubmit(topic, numQuestions, quizLanguage, quizDifficulty, quizTimePerQuestion)
    }

    return (
        <div className="bg-[#1f2b3e] border-[2px] border-black p-3 md:p-6 rounded-3xl shadow-md flex flex-col lg:flex-row gap-5 relative">
            {/* Add loading overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#ff6366] mb-4"></div>
                    <div className="relative">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 animate-pulse text-center">
                            Generating Quiz
                        </h2>
                        <div className="flex gap-1 justify-center">
                            <span className="animate-bounce text-[#ff6366] text-xl md:text-2xl delay-0">.</span>
                            <span className="animate-bounce text-[#ff6366] text-xl md:text-2xl delay-150">.</span>
                            <span className="animate-bounce text-[#ff6366] text-xl md:text-2xl delay-300">.</span>
                        </div>
                        <p className="text-gray-300 mt-4 text-center max-w-md text-sm md:text-base">
                            Our AI is crafting challenging questions just for you!
                        </p>
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center bg-black w-full lg:w-[336px] rounded-3xl">
                <Image 
                    src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjhlMWQ3a2dzc2dteDN6cnA5bWxtYXlwcHlyZHBrc3MzM3h0c3NxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RkwsqDW9E8mX71AF5s/giphy.gif' 
                    alt='Excited Cute'
                    className='rounded-2xl' 
                    width={320} 
                    height={320} 
                />
            </div>
            <div className="block w-full lg:w-1/3">
                <form onSubmit={handleSubmit} className="space-y-4 block">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-white">
                            Quiz Topic
                        </label>
                        <input
                            type="text"
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="mt-1 pl-2 block w-full rounded-xl border-[2px] font-semibold border-black h-10 shadow-sm focus:border-accent-100 focus:ring focus:ring-accent-100 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="numQuestions" className="block text-sm font-medium text-white">
                            Number of Questions
                        </label>
                        <input
                            type="number"
                            id="numQuestions"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                            min="1"
                            max="20"
                            className="mt-1 block pl-2 w-full rounded-xl border-[2px] font-semibold border-black h-10 border-bg-300 shadow-sm focus:border-accent-100 focus:ring focus:ring-accent-100"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#ff6366] hover:bg-[#de283b] text-text-200 font-bold py-2 px-4 rounded-2xl border-[2px] border-black transition duration-300"
                    >
                        Generate Quiz
                    </button>
                </form>
                <div className="mt-6">
                    <h3 className="text-base md:text-lg font-medium text-white">Popular Topics</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {popularTopics.map((popularTopic) => (
                            <button
                                key={popularTopic}
                                onClick={() => setTopic(popularTopic)}
                                className="bg-[#71c4ef] hover:bg-[#00668c] border-[2px] border-black font-bold text-[#1d1c1c] hover:text-white font-semibold py-1 px-3 rounded-full text-sm transition duration-300"
                            >
                                {popularTopic}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3 rounded-lg shadow-md">
                <h3 className="text-base md:text-lg font-medium text-gray-800 mb-4">Quiz Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-white">
                            Quiz Language
                        </label>
                        <select
                            id="language"
                            value={quizLanguage}
                            onChange={(e) => setQuizLanguage(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-[2px] border-black focus:outline-none focus:ring-accent-100 focus:border-accent-100 sm:text-sm bg-[#0F1C2E] text-white font-semibold rounded-xl"
                        >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-white">
                            Difficulty Level
                        </label>
                        <select
                            id="difficulty"
                            value={quizDifficulty}
                            onChange={(e) => setQuizDifficulty(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-[2px] border-black focus:outline-none focus:ring-accent-100 focus:border-accent-100 sm:text-sm bg-[#0F1C2E] text-white font-semibold rounded-xl"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="timer" className="block text-sm font-medium text-white">
                            Time per Question (seconds)
                        </label>
                        <input
                            type="number"
                            id="timer"
                            value={quizTimePerQuestion}
                            onChange={(e) => setQuizTimePerQuestion(parseInt(e.target.value))}
                            min="10"
                            max="300"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-[2px] border-black focus:outline-none focus:ring-accent-100 focus:border-accent-100 sm:text-sm bg-[#0F1C2E] text-white font-semibold rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}