import AnimationWrapper from '@/components/AnimationWrapper';

// Retrieve backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to fetch dynamic skill data (copied from app/page.jsx)
async function getSkills() {
  try {
    // Assuming your skills endpoint is /api/v1/skills
    const res = await fetch(`${BACKEND_URL}/api/v1/skills`, {
      // Use 'no-store' to ensure fresh data on every request
      cache: 'no-store' 
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    // Assuming the backend returns an array of skill objects, 
    // where each object has a 'name' property
    return res.json(); 
  } catch (error) {
    console.error("Failed to fetch skills for /skills page:", error);
    return []; // Return empty array on failure
  }
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    // Reusing the main container and background styles from your home page
    <main className="min-h-screen  font-sans border rounded-full text-gray-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 🛠️ Skills Header Section (Using the Amber color theme from your home page skills section) */}
        <section className="text-center py-20 lg:py-28  rounded-3xl mb-10">
          <AnimationWrapper>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              My Full Expertise
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto">
              A detailed overview of every tool, language, and framework I utilize in my stack.
            </p>
          </AnimationWrapper>
        </section>

        {/* 🧠 Skills List Section */}
        <section id="all-skills-list" className="py-10 rounded-3xl p-6 lg:p-10">
          <AnimationWrapper delay={0.2}>
            <div className="lg:flex lg:gap-16">

              {/* Left Column: Context/Description (Optional, can be removed if not needed) */}
              <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
                <h2 className="text-4xl font-extrabold text-teal-400 mb-4">Core Tech</h2>
                <p className="text-4xl text-gray-400 border-l-4 border-teal-600 pl-6 inline-block lg:block">
                  My stack is focused on modern, efficient, and scalable web development technologies.
                </p>
              </div>
              
              {/* Right Column: Main Content (The Skills Grid) */}
              <div className="lg:w-3/4">
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                  {skills.length > 0 ? (
                    // Display all skills
                    skills.map((skill, index) => (
                      // Reusing the same AnimationWrapper and styling for the skill tags
                      <AnimationWrapper key={skill._id || index} delay={0.3 + index * 0.05}>
                          <span className="px-6 py-2 bg-slate-800 border border-teal-600 text-teal-400 text-4xl font-medium rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-slate-700">
                              {skill.name} 
                          </span>
                      </AnimationWrapper>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 w-full text-xl">No skills found. Please check your backend connection!</p>
                  )}
                </div>
              </div>

            </div>
          </AnimationWrapper>
        </section>

      </div>
    </main>
  );
}