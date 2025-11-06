// app/certifications/page.jsx
// This file fetches and displays a list of all certifications.

import AnimationWrapper from '@/components/AnimationWrapper';

// Retrieve backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to fetch dynamic certification data
async function getCertifications() {
  try {
    // Assuming your certifications endpoint is /api/v1/certifications
    const res = await fetch(`${BACKEND_URL}/api/v1/certifications`, {
      // Use 'no-store' to ensure fresh data on every request
      cache: 'no-store' 
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    // Assuming the backend returns an array of certification objects 
    // (e.g., [{ title: 'AWS Certified', issuer: 'Amazon', date: '2023-01-01' }])
    return res.json(); 
  } catch (error) {
    console.error("Failed to fetch certifications for /certifications page:", error);
    return []; // Return empty array on failure
  }
}

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    // Reusing the main container and background styles
    <main className="min-h-screen bg-yellow-200 font-sans text-gray-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 🏅 Certifications Header Section */}
        <section className="text-center py-20 lg:py-28 bg-teal-800 rounded-b-3xl mb-10">
          <AnimationWrapper>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              Certifications & Training
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto">
              Formal recognition of my expertise in cloud technologies, programming languages, and specialized frameworks.
            </p>
          </AnimationWrapper>
        </section>

        {/* 📜 Certifications List Section */}
        <section id="certs-list" className="py-10 bg-red-100 rounded-3xl p-6 lg:p-10 mb-10">
          <AnimationWrapper delay={0.2}>
            
            {/* Using a simple two-column layout for presentation */}
            <div className="lg:flex lg:gap-16">

              {/* Left Column: Context/Description */}
              <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
                <h2 className="text-4xl font-extrabold text-teal-400 mb-4">Verification</h2>
                <p className="text-4xl text-gray-400 border-l-4 border-teal-600 pl-6 inline-block lg:block">
                  Validated skills from industry leaders, ensuring I meet modern technology standards.
                </p>
              </div>

              {/* Right Column: Main Content (The Certifications List) */}
              <div className="lg:w-3/4 space-y-8">
                {certifications.length > 0 ? (
                  certifications.map((cert, index) => (
                    <AnimationWrapper key={cert._id || index} delay={0.3 + index * 0.1}>
                      <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-teal-600 transition-transform hover:scale-[1.02] cursor-pointer">
                        <h3 className="text-3xl font-bold text-teal-400 mb-1">{cert.title || 'Certification Title'}</h3>
                        <p className="text-xl text-gray-400">Issuer:-   {cert.issuer || 'N/A'}</p>
                        {/* Assuming you have a date and a link/credential ID */}
                        {cert.date && <p className="text-sm text-gray-500 mt-1">Issued: {new Date(cert.date).toLocaleDateString()}</p>}
                        {cert.credentialUrl && (
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-block mt-3 text-sm font-medium text-teal-300 hover:text-teal-500"
                          >
                            View Credential &rarr;
                          </a>
                        )}
                      </div>
                    </AnimationWrapper>
                  ))
                ) : (
                  <p className="text-center text-gray-500 w-full text-xl p-8 bg-slate-800 rounded-xl">No certifications found. Time to earn some!</p>
                )}
              </div>
            </div>
          </AnimationWrapper>
        </section>

      </div>
    </main>
  );
}