import AnimationWrapper from '@/components/AnimationWrapper';
import ProjectCard from '@/components/ProjectCard';

// Retrieve backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to fetch dynamic project data
async function getProjects() {
  try {
    // Fetch data from your Node.js backend
    const res = await fetch(`${BACKEND_URL}/api/v1/projects`, {
      // Use 'no-store' to ensure fresh data on every request
      cache: 'no-store' 
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch projects for /projects page:", error);
    return []; // Return empty array on failure
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    // Reusing the main container and background styles from your home page
    <main className="min-h-screen font-sans border rounded-full text-gray-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 💡 Projects Header Section */}
        <section className="text-center py-20 lg:py-28  rounded-3xl mb-10">
          <AnimationWrapper>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              All My Work
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto">
              A comprehensive list of every project I've deployed, demonstrating my full-stack capabilities.
            </p>
          </AnimationWrapper>
        </section>

        {/* 🖼️ Projects Grid Section */}
        <section id="projects-list" className="py-10  rounded-3xl p-6 lg:p-10">
          <AnimationWrapper delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
              {projects.length > 0 ? (
                // 🛑 IMPORTANT CHANGE: Removed .slice(0, 2) to show all projects
                projects.map((project, index) => ( 
                  <AnimationWrapper key={project._id} delay={0.3 + index * 0.1}>
                    <ProjectCard project={project} /> 
                  </AnimationWrapper>
                ))
              ) : (
                <p className="col-span-full text-center text-xl text-gray-500 p-8 bg-slate-800 rounded-xl shadow-inner border border-slate-700">No projects found. Please check the backend connection!</p>
              )}
            </div>
          </AnimationWrapper>
        </section>

      </div>
    </main>
  );
}