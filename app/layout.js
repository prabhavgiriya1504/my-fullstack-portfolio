// // client/app/layout.jsx
// import './globals.css';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Your Name | Full Stack Portfolio',
//   description: 'A dynamic portfolio showcasing full stack projects, skills, and certifications.',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-green-100 text-gray-800 border rounded-sm`}>
//         <header className="sticky top-0 z-50 p-4 backdrop-blur-md bg-white/70 border rounded-md  shadow-sm">
//           <nav className="max-w-7xl mx-auto flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-red-600">Prabhav</h1>
//             <div className="space-x-4">
//               <a href="#projects" className="hover:text-indigo-600 transition">Projects</a>
//               <a href="#skills" className="hover:text-indigo-600 transition">Skills</a>
//               <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
//               <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
//               <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
//             </div>
//           </nav>
//         </header>
//         <main className="min-h-screen py-16  mx-auto px-4 sm:px-6 lg:px-8">
//           {children}
//         </main>
//         <footer className="p-8 text-center border-t border-gray-200">
//           <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
//         </footer>
//       </body>
//     </html>
//   );
// }



// client/app/layout.jsx
import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your Name | Full Stack Portfolio',
  description: 'A dynamic portfolio showcasing full stack projects, skills, and certifications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* IMPROVEMENT: Use neutral base colors and ensure full height on body/html */}
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-800 antialiased`}>
        
        {/* IMPROVEMENT: Fixed header, better padding and shadow */}
        <header className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-white/80 shadow-md">
          <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:h-10">
            
            {/* Logo/Name */}
            
            <Link href='/'><h1 className="text-3xl font-extrabold text-red-600 mb-2 sm:mb-0">Prabhav</h1></Link>
            
            {/* Navigation Links (REFINED for responsiveness) */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm lg:text-lg font-medium">
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
        <main className="min-h-screen pt-36 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer (Slightly improved styling) */}
        <footer className="p-8 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </footer>
        
      </body>
    </html>
  );
}