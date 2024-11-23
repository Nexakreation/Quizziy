import React, { useState, useEffect } from 'react';

const backgroundColors = ['#ea6a64', '#eb9c64', '#71c4ef', '#5bbc51'];

export default function QuizQuestion({ question, onAnswer, currentQuestion, totalQuestions }) {
    const [shuffledColors, setShuffledColors] = useState([]);

    useEffect(() => {
        // Shuffle the colors array when the question changes
        setShuffledColors([...backgroundColors].sort(() => Math.random() - 0.5));
    }, [question]);

    return (
        <div className="bg-[#1f2b3e] p-8 shadow-2xl rounded-3xl border-[3px] border-black w-2/3 justify-center items-center mx-auto transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative mb-8">
                <h2 className="text-3xl font-extrabold text-[#7FB3D5] tracking-wider animate-pulse">
                    {question.question}
                </h2>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#ff6366] rounded-full flex items-center justify-center transform rotate-12 border-2 border-black">
                    <p className="text-xl font-bold text-black">{currentQuestion}/{totalQuestions}</p>
                </div>
            </div>
            
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
                        className="group w-full text-left p-5 rounded-2xl text-black font-bold border-[3px] border-black transform hover:scale-[1.03] transition-all duration-300 hover:shadow-xl flex items-center"
                        style={{ backgroundColor: shuffledColors[index] }}
                    >
                        <span className="inline-block w-8 h-8 bg-black text-white rounded-full mr-4 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                            {String.fromCharCode(65 + index)}
                        </span>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                            {option}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}