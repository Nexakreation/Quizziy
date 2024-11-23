export default function Results({ quizData, answers, onRestart }) {
    if (!quizData || !quizData.questions || !answers) {
        return <div>No quiz data available.</div>;
    }

    const questions = quizData.questions;
    const correctAnswers = questions.filter((q, i) => q.correctAnswer === answers[i]).length;

    return (
      <div className="bg-[#1f2b3e] p-4 md:p-8 rounded-3xl border-[3px] border-black shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 text-[#7FB3D5] tracking-wider animate-pulse">
            Quiz Results 🎯
          </h2>
          <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-[#ff6366] rounded-full flex items-center justify-center transform rotate-12 border-2 border-black">
            <p className="text-xl md:text-2xl font-bold text-black">{Math.round((correctAnswers/questions.length) * 100)}%</p>
          </div>
        </div>
        <p className="text-xl md:text-2xl mb-4 md:mb-6 text-[#FFEBCD] font-bold">
          You got <span className="text-[#ff6366]">{correctAnswers}</span> out of <span className="text-[#7FB3D5]">{questions.length}</span> questions correct!
        </p>
        <div className="space-y-4 md:space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="border-2 border-[#2a3b56] rounded-xl p-3 md:p-4 hover:border-[#7FB3D5] transition-all duration-300">
              <p className="font-bold text-base md:text-lg text-[#E6F2EA] mb-2">{q.question}</p>
              <div className="flex flex-col gap-2 ml-2 md:ml-4">
                <p className="text-green-500 flex items-center text-sm md:text-base">
                  <span className="mr-2">✓</span>
                  <span className="font-medium">Correct: {q.correctAnswer}</span>
                </p>
                <p className={`flex items-center text-sm md:text-base ${q.correctAnswer === answers[i] ? "text-green-500" : "text-[#ea6a64]"}`}>
                  <span className="mr-2">{q.correctAnswer === answers[i] ? "✓" : "✗"}</span>
                  <span className="font-medium">Your answer: {answers[i] || 'Not answered'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onRestart}
          className="mt-6 md:mt-8 w-full bg-[#ff6366] hover:bg-[#de283b] text-black hover:text-white font-extrabold py-2 md:py-3 px-4 md:px-6 rounded-2xl border-[3px] border-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <span>Start New Quiz</span>
          <span className="text-lg md:text-xl">🚀</span>
        </button>
      </div>
    )
  }
