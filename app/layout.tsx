import './globals.css'
import Navbar from './components/Navbar';
import Portfolio from './components/portfolio-navlink';

export const metadata = {
  title: 'Quiz Website',
  description: 'Generate quizzes on any topic',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://example.com/path-to-your-icon.ico" type="image/x-icon" />
        {/* Add other meta tags here if needed */}
      </head>
      <body className="block bg-[#0F1C2E] text-text-100 min-h-screen">
        <Portfolio />
        <Navbar />
        {children}
      </body>
    </html>
  )
}