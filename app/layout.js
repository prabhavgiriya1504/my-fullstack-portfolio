import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Prabhav Giriya | Full Stack Portfolio',
  description: 'A dynamic portfolio showcasing full stack projects, skills, and certifications.',
  icons: {
    icon: '/prabhavImage.ico',
  },
  openGraph: {
    images: ['/prabhavImage.ico'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} min-h-screen bg-black text-gray-800 antialiased`}>
        
        
        <header className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md  shadow-md">
          <nav className=" max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:h-10">
            
            {/* Logo/Name  */}
            
            <Link href='/'><h1 className="text-3xl font-extrabold text-red-600 mb-2 sm:mb-0">Prabhav</h1></Link>
            
            {/* Navigation Links (REFINED for responsiveness) */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2  text-sm lg:text-lg font-medium">
              <a 
                href="/projects" 
                className="text-green-400 hover:text-indigo-800 transition py-1 px-3 rounded-full hover:bg-indigo-50"
              >
                Projects
              </a>
              <a 
                href="/skills" 
                className="text-green-400 hover:text-indigo-800 transition py-1 px-3 rounded-full hover:bg-indigo-50"
              >
                Skills
              </a>
              <a 
                href="/contact-info" 
                className="text-green-400 hover:text-indigo-800 transition py-1 px-3 rounded-full hover:bg-indigo-50"
              >
                Contact
              </a>
              <a 
                href="/certifications" 
                className="text-green-400 hover:text-indigo-800 transition py-1 px-3 rounded-full hover:bg-indigo-50"
              >
                Certifications
              </a>
              <a 
                href="/admin" 
                className="text-green-400 hover:text-indigo-800 transition py-1 px-3 rounded-full hover:bg-indigo-50"
              >
                Admin Panel
              </a>

            </div>
            
          </nav>
        </header>

        {/* IMPROVEMENT: Add padding-top to account for the fixed header (h-20 is a safe estimate for the header height) */}
        <main className="bg-image relative main min-h-screen pt-36 pb-16 mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer (Slightly improved styling) */}
        <Footer />
        
      </body>
    </html>
  );
}