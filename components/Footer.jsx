// import { Instagram, Linkedin, Mail, Info } from 'lucide-react'; // Using lucide-react for modern, lightweight icons

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     // Base padding, border, and background. Uses 'py-8' for vertical padding.
//     // 'md:py-10' increases padding on medium screens and up.
//     <footer className="py-8 border-t border-gray-200 bg-white">
//       {/* Container to center content and control max width */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Main content grid/flex for responsiveness */}
//         {/* On small screens, items stack vertically (flex-col) and are centered.
//             On medium screens, items are side-by-side (md:flex-row) and spaced out (md:justify-between). */}
//         <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-6 md:space-y-0">
          
//           {/* 1. Copyright Text */}
          
          
//           {/* 2. Social Media and Info Icons/Links */}
//           {/* This section is the core of the update, using 'space-x-6' for horizontal spacing. */}
//           <div className="flex items-center space-x-6">
            
//             {/* Instagram Link */}
//             <a 
//               href="https://www.instagram.com/yourhandle" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               aria-label="Instagram"
//               className="text-gray-500 hover:text-pink-600 transition duration-300 ease-in-out"
//             >
//               <Instagram className="w-6 h-6" /> {/* Icon size adjusted */}
//             </a>
            
//             {/* LinkedIn Link */}
//             <a 
//               href="https://www.linkedin.com/in/yourprofile" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               aria-label="LinkedIn"
//               className="text-gray-500 hover:text-blue-700 transition duration-300 ease-in-out"
//             >
//               <Linkedin className="w-6 h-6" />
//             </a>
            
//             {/* Email Link */}
//             <a 
//               href="mailto:youremail@example.com" 
//               aria-label="Email"
//               className="text-gray-500 hover:text-red-500 transition duration-300 ease-in-out"
//             >
//               <Mail className="w-6 h-6" />
//             </a>

//             {/* About Us Link */}
//             <a 
//               href="/about-us" 
//               aria-label="About Us"
//               className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out"
//             >
//               <Info className="w-6 h-6" />
//               <span className="hidden sm:inline">About Us</span> {/* Text only visible on small screens and up */}
//             </a>
            
//           </div>
//         </div>
        
//       </div>
//     </footer>
//   );
// };

// export default Footer;







import { Instagram, Linkedin, Mail, Info } from 'lucide-react'; // Using lucide-react for modern, lightweight icons

const DarkFooter = () => {

  return (
    // Base padding, border, and background for dark theme
    // bg-gray-900 is the main change for the dark background
    <footer className="py-8 border-t border-gray-700 bg-gray-900">
      {/* Container to center content and control max width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main content flex for responsiveness */}
        {/* The copyright text is removed, leaving only the centered icons */}
        <div className="flex items-center justify-center">
          
          {/* Social Media and Info Icons/Links */}
          {/* Icons are centered horizontally */}
          <div className="flex items-center space-x-8 lg:space-x-32">
            
            {/* Instagram Link */}
            <a 
              href="https://www.instagram.com/prabhavgiriya/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              // Base text-gray-400 for dark theme. Hover changes to pink-500.
              className="text-gray-300 hover:text-pink-500 transition duration-300 ease-in-out"
            >
              <Instagram className="w-7 h-7" /> {/* Slightly larger icons look good on dark theme */}
            </a>
            
            {/* LinkedIn Link */}
            <a 
              href="https://www.linkedin.com/in/prabhav15/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              // Hover changes to blue-400 for better visibility on dark theme.
              className="text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            
            {/* Email Link */}
            <a 
              href="mailto:prabhavgiriya925@gmail.com" 
              aria-label="Email"
              // Hover changes to red-500.
              className="text-gray-300 hover:text-red-500 transition duration-300 ease-in-out"
            >
              <Mail className="w-7 h-7" />
            </a>

            {/* About Us Link */}
            <a 
              href="/" 
              aria-label="About Us"
              // Hover changes to white.
              className="flex items-center space-x-2 text-base text-gray-300 hover:text-white transition duration-300 ease-in-out"
            >
              <Info className="w-7 h-7" />
              <span className="hidden sm:inline">About Us</span> 
            </a>
            
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default DarkFooter;