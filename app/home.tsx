import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="font-sans m-0 p-5 bg-gray-100">
      <header className="flex justify-between items-center mb-5">
        <div className="text-4xl font-bold text-pink-300">QUIZ.com</div>
        <div className="bg-pink-200 p-2.5 rounded-lg flex items-center">
          Join Game? Enter PIN: <input type="text" placeholder="123 456" className="ml-2.5 p-1 rounded border border-gray-300" />
        </div>
        <a href="#" className="bg-green-200 px-5 py-2.5 rounded-full no-underline text-black">Sign in</a>
      </header>

      <nav className="flex justify-between mb-5 overflow-x-auto">
        {['Start', 'Art & Literature', 'Entertainment', 'Geography', 'History', 'Languages', 'Science & Nature', 'Sports', 'Trivia'].map((category) => (
          <div key={category} className="text-center min-w-[80px]">
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full mx-auto mb-1"></div>
            <div>{category}</div>
          </div>
        ))}
      </nav>

      <div className="flex gap-5 mb-5 flex-col md:flex-row">
        <div className="bg-teal-800 text-white p-5 rounded-lg md:w-1/2">
          <h2 className="text-4xl mb-2.5">Create a quiz</h2>
          <p className="mb-5">Play for free with 300 participants</p>
          <a href="#" className="bg-teal-400 text-white px-5 py-2.5 rounded-full no-underline">Quiz editor</a>
        </div>
        <div className="bg-teal-800 text-white p-5 rounded-lg md:w-1/2">
          <h2 className="text-4xl mb-2.5">A.I.</h2>
          <p className="mb-5">Generate a quiz from any subject or pdf</p>
          <a href="#" className="bg-cyan-300 text-black px-5 py-2.5 rounded-full no-underline">Quiz generator</a>
        </div>
      </div>

      <h3 className="text-2xl mb-2.5">Recently published</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        <QuizItem title="Middle School-Level Literary Review" rating={4.2} author="brittanyk" tags={['AI GENERATED']} />
        <QuizItem title="Limmy" rating={4.2} author="Viche" tags={['HARD', 'AI GENERATED']} />
        {/* Add more QuizItem components here */}
      </div>

      <h3 className="text-2xl mb-2.5">Popular quizzes created by AI</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        <QuizItem title="Middle School-Level Literary Review" rating={4.2} author="brittanyk" tags={['AI GENERATED']} />
        <QuizItem title="Limmy" rating={4.2} author="Viche" tags={['HARD', 'AI GENERATED']} />
        {/* Add more QuizItem components here */}
      </div>

      <div className="bg-teal-800 text-white p-5 rounded-lg flex justify-between items-center mb-5">
        <h3 className="text-2xl">Can't decide? Let players vote</h3>
        <a href="#" className="bg-yellow-300 text-black px-5 py-2.5 rounded-full no-underline">Start vote mode</a>
      </div>

      <h3 className="text-2xl mb-2.5">Best rating right now</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        <QuizItem title="Middle School-Level Literary Review" rating={4.2} author="brittanyk" tags={['AI GENERATED']} />
        <QuizItem title="Limmy" rating={4.2} author="Viche" tags={['HARD', 'AI GENERATED']} />
        {/* Add more QuizItem components here */}
      </div>
    </div>
  );
};

interface QuizItemProps {
  title: string;
  rating: number;
  author: string;
  tags: string[];
}

const QuizItem: React.FC<QuizItemProps> = ({ title, rating, author, tags }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
      <div className="w-full h-[150px] bg-gray-300 bg-cover bg-center relative" style={{backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2024-09-29_192006244-5p1ZmIB3K1xCG2S29wQt5DjEej4J7r.png')"}}>
        <div className="absolute bottom-2.5 left-2.5 flex gap-1">
          {tags.map((tag, index) => (
            <span key={index} className="bg-black bg-opacity-60 text-white px-1.5 py-0.5 rounded text-xs">{tag}</span>
          ))}
        </div>
        <a href="#" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-300 text-black px-5 py-2.5 rounded-full no-underline font-bold opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">Play Now</a>
      </div>
      <div className="p-2.5">
        <div className="font-bold mb-1">{title}</div>
        <div className="flex items-center text-sm">
          <span className="text-yellow-400 mr-1">★</span>
          {rating} By {author}
        </div>
      </div>
    </div>
  );
};

export default Home;