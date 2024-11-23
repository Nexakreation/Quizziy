import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-2xl mb-4">QUIZ.com</h3>
            <p>Create, play, and share quizzes on any topic.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul>
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Create Quiz</a></li>
              <li><a href="#" className="hover:text-gray-300">Popular Quizzes</a></li>
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg mb-4">Contact Us</h4>
            <p>Email: info@quiz.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 QUIZ.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;