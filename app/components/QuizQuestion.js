import React, { useState, useEffect } from 'react';

const backgroundColors = ['#ea6a64', '#eb9c64', '#71c4ef', '#5bbc51'];

export default function QuizQuestion({ question, onAnswer, currentQuestion, totalQuestions }) {
    const [shuffledColors, setShuffledColors] = useState([]);

    useEffect(() => {
        // Shuffle the colors array when the question changes
        setShuffledColors([...backgroundColors].sort(() => Math.random() - 0.5));
    }, [question]);

    return (
        <div className="bg-[#1f2b3e] p-4 md:p-8 shadow-2xl rounded-3xl border-[3px] border-black w-full md:w-2/3 justify-center items-center mx-auto transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative mb-4">
                <h2 className="text-lg font-bold text-[#7FB3D5]">
                    {question.question}
                </h2>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ff6366] rounded-full flex items-center justify-center transform rotate-12 border-2 border-black">
                    <p className="text-sm font-bold text-black">{currentQuestion}/{totalQuestions}</p>
                </div>
            </div>
            
            <div className="space-y-2 md:space-y-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
                        className="group w-full text-left p-3 md:p-5 rounded-2xl text-black font-bold border-[3px] border-black transform hover:scale-[1.03] transition-all duration-300 hover:shadow-xl flex items-center"
                        style={{ backgroundColor: shuffledColors[index] }}
                    >
                        <span className="inline-block w-6 h-6 md:w-8 md:h-8 bg-black text-white rounded-full mr-2 md:mr-4 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                            {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-sm md:text-base group-hover:translate-x-2 transition-transform duration-300">
                            {option}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}