import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="font-sans p-4 bg-gradient-to-r from-[#0F1C2E] to-[#1f2b3e] sticky top-0 z-50 mb-3 border-b-2 border-[#ff6366] shadow-lg">
      <header className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-4xl animate-bounce">🎯</span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#ff6366] to-[#71c4ef] text-transparent bg-clip-text hover:scale-105 transform transition-all duration-300">
            QUIZ FOR ALL
          </h1>
        </div>

      </header>
    </nav>
  );
};

export default Navbar;