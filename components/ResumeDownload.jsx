// client/components/ResumeDownload.jsx
// Make sure you place your resume PDF file at: client/public/your_resume.pdf
import Link from 'next/link';

export default function ResumeDownload() {
  return (
    <Link 
      href="/Prabhav-Resume.pdf" // Path to the file in your public folder
      download="Prabhav-Resume.pdf" 
      target="_blank" 
      className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg shadow-md hover:bg-indigo-50 transition duration-300"
    >
      Download Resume
    </Link>
  );
}