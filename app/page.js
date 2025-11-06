// // client/app/page.jsx
// import AnimationWrapper from '@/components/AnimationWrapper';
// import ProjectCard from '@/components/ProjectCard';
// import ContactForm from '@/components/ContactForm';
// import ResumeDownload from '@/components/ResumeDownload';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // Function to fetch dynamic project data
// async function getProjects() {
//   try {
//     // Fetch data from your Node.js backend
//     const res = await fetch(`${BACKEND_URL}/api/v1/projects`, {
//       cache: 'no-store' // Ensure fresh data on every request
//     });
//     if (!res.ok) {
//         // This will be caught by the catch block
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("Failed to fetch projects:", error);
//     return []; // Return empty array on failure
//   }
// }

// export default async function HomePage() {
//   const projects = await getProjects();

//   return (
//     <>
//       {/* 🚀 Hero Section */}
//       <section className="text-center py-20">
//         <AnimationWrapper>
//           <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
//             Hello, I am <span className="text-indigo-600">Your Name</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             A Full-Stack Developer leveraging the power of Next.js, Node.js, and MongoDB to build dynamic and scalable web applications.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <a href="#projects" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
//               View My Work
//             </a>
//             <ResumeDownload />
//           </div>
//         </AnimationWrapper>
//       </section>

//       {/* 💡 Projects Section */}
//       <section id="projects" className="py-16">
//         <AnimationWrapper delay={0.2}>
//           <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Projects</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {projects.length > 0 ? (
//               projects.map((project, index) => (
//                 <AnimationWrapper key={project._id} delay={0.3 + index * 0.1}>
//                   <ProjectCard project={project} />
//                 </AnimationWrapper>
//               ))
//             ) : (
//               <p className="col-span-full text-center text-gray-500">No projects found. Please add some via the admin panel!</p>
//             )}
//           </div>
//         </AnimationWrapper>
//       </section>

//       {/* 🛠️ Skills and Certifications (Static/Dynamic Data Structure here) */}
//       <section id="skills" className="py-16">
//         <AnimationWrapper delay={0.4}>
//             <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Technical Skills</h2>
//             <div className="flex flex-wrap justify-center gap-4">
//                 {/* Dynamically render skills from backend/config/a hardcoded list/CMS structure */}
//                 {['Next.js', 'Node.js', 'MongoDB', 'React', 'Tailwind CSS', 'Express.js', 'Git', 'REST APIs'].map((skill, index) => (
//                     <span key={index} className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-full shadow-md transition-transform hover:scale-105">
//                         {skill}
//                     </span>
//                 ))}
//             </div>
//         </AnimationWrapper>
//       </section>

//       {/* 📧 Contact Section */}
//       <section id="contact" className="py-16">
//         <AnimationWrapper delay={0.6}>
//           <h2 className="text-4xl font-bold text-center text-red-900 mb-8">Get In Touch / Suggestions</h2>
//           {/* You need to implement ContactForm.jsx and the corresponding Next.js API route/Server action */}
//           <ContactForm /> 
//         </AnimationWrapper>
//       </section>
//     </>
//   );
// }














// //for the backend of skills



// // client/app/page.jsx
// import AnimationWrapper from '@/components/AnimationWrapper';
// import ProjectCard from '@/components/ProjectCard';
// import ContactForm from '@/components/ContactForm';
// import ResumeDownload from '@/components/ResumeDownload';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // Function to fetch dynamic project data
// async function getProjects() {
//   try {
//     // Fetch data from your Node.js backend
//     const res = await fetch(`${BACKEND_URL}/api/v1/projects`, {
//       cache: 'no-store' // Ensure fresh data on every request
//     });
//     if (!res.ok) {
//         // This will be caught by the catch block
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("Failed to fetch projects:", error);
//     return []; // Return empty array on failure
//   }
// }

// // ⭐ NEW Function to fetch dynamic skill data ⭐
// async function getSkills() {
//   try {
//     // Assuming your skills endpoint is /api/v1/skills
//     const res = await fetch(`${BACKEND_URL}/api/v1/skills`, {
//       cache: 'no-store' 
//     });
//     if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     // Assuming the backend returns an array of skill objects, 
//     // where each object has a 'name' property (e.g., [{ name: 'Next.js' }, { name: 'Node.js' }])
//     return res.json(); 
//   } catch (error) {
//     console.error("Failed to fetch skills:", error);
//     return []; // Return empty array on failure
//   }
// }

// export default async function HomePage() {
//   // Fetch projects and skills concurrently for better performance
//   const [projects, skills] = await Promise.all([
//     getProjects(),
//     getSkills() // ⭐ Call the new function here ⭐
//   ]);

//   return (
//     <>
//       {/* 🚀 Hero Section */}
//       <section className="text-center py-20">
//         <AnimationWrapper>
//           <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
//             Hello, I am <span className="text-indigo-600">Your Name</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             A Full-Stack Developer leveraging the power of Next.js, Node.js, and MongoDB to build dynamic and scalable web applications.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <a href="#projects" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
//               View My Work
//             </a>
//             <ResumeDownload />
//           </div>
//         </AnimationWrapper>
//       </section>

//       {/* 💡 Projects Section */}
//       <section id="projects" className="py-16">
//         <AnimationWrapper delay={0.2}>
//           <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Projects</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {projects.length > 0 ? (
//               projects.map((project, index) => (
//                 <AnimationWrapper key={project._id} delay={0.3 + index * 0.1}>
//                   <ProjectCard project={project} />
//                 </AnimationWrapper>
//               ))
//             ) : (
//               <p className="col-span-full text-center text-gray-500">No projects found. Please add some via the admin panel!</p>
//             )}
//           </div>
//         </AnimationWrapper>
//       </section>

//       {/* 🛠️ Skills and Certifications (Dynamically rendered) */}
//       <section id="skills" className="py-16">
//         <AnimationWrapper delay={0.4}>
//             <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Technical Skills</h2>
//             <div className="flex flex-wrap justify-center gap-4">
//                 {/* ⭐ UPDATED: Dynamically render skills from the fetched 'skills' array ⭐ */}
//                 {skills.length > 0 ? (
//                   skills.map((skill, index) => (
//                       <span key={skill._id || index} className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-full shadow-md transition-transform hover:scale-105">
//                           {/* Access the 'name' property of the skill object */}
//                           {skill.name} 
//                       </span>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500 w-full">No skills found. Please update your skill list!</p>
//                 )}
//             </div>
//         </AnimationWrapper>
//       </section>

//       {/* 📧 Contact Section */}
//       <section id="contact" className="py-16">
//         <AnimationWrapper delay={0.6}>
//           <h2 className="text-4xl font-bold text-center text-red-900 mb-8">Get In Touch / Suggestions</h2>
//           {/* You need to implement ContactForm.jsx and the corresponding Next.js API route/Server action */}
//           <ContactForm /> 
//         </AnimationWrapper>
//       </section>
//     </>
//   );
// }













// for the full screen


// // client/app/page.jsx
// import AnimationWrapper from '@/components/AnimationWrapper';
// import ProjectCard from '@/components/ProjectCard';
// import ContactForm from '@/components/ContactForm';
// import ResumeDownload from '@/components/ResumeDownload';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // Function to fetch dynamic project data
// async function getProjects() {
//   try {
//     // Fetch data from your Node.js backend
//     const res = await fetch(`${BACKEND_URL}/api/v1/projects`, {
//       cache: 'no-store' // Ensure fresh data on every request
//     });
//     if (!res.ok) {
//         // This will be caught by the catch block
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("Failed to fetch projects:", error);
//     return []; // Return empty array on failure
//   }
// }

// // Function to fetch dynamic skill data
// async function getSkills() {
//   try {
//     // Assuming your skills endpoint is /api/v1/skills
//     const res = await fetch(`${BACKEND_URL}/api/v1/skills`, {
//       cache: 'no-store' 
//     });
//     if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     // Assuming the backend returns an array of skill objects, 
//     // where each object has a 'name' property (e.g., [{ name: 'Next.js' }, { name: 'Node.js' }])
//     return res.json(); 
//   } catch (error) {
//     console.error("Failed to fetch skills:", error);
//     return []; // Return empty array on failure
//   }
// }

// export default async function HomePage() {
//   // Fetch projects and skills concurrently for better performance
//   const [projects, skills] = await Promise.all([
//     getProjects(),
//     getSkills()
//   ]);

//   return (
//     <main className="min-h-screen bg-green-500 font-sans">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* 🚀 Hero Section */}
//         <section className="text-center py-20 lg:py-24">
//           <AnimationWrapper>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
//               Hello, I am <span className="text-indigo-600">Your Name</span>
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
//               A Full-Stack Developer leveraging the power of Next.js, Node.js, and MongoDB to build dynamic and scalable web applications.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
//               <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02]">
//                 View My Work
//               </a>
//               <ResumeDownload />
//             </div>
//           </AnimationWrapper>
//         </section>

//         {/* 💡 Projects Section */}
//         <section id="projects" className="py-16 border-t border-gray-200">
//           <AnimationWrapper delay={0.2}>
//             <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Featured Projects</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//               {projects.length > 0 ? (
//                 projects.map((project, index) => (
//                   <AnimationWrapper key={project._id} delay={0.3 + index * 0.1}>
//                     <ProjectCard project={project} />
//                   </AnimationWrapper>
//                 ))
//               ) : (
//                 <p className="col-span-full text-center text-lg text-gray-500 p-6 bg-white rounded-xl shadow-md">No projects found. Please add some via the admin panel!</p>
//               )}
//             </div>
//           </AnimationWrapper>
//         </section>

//         {/* 🛠️ Skills and Certifications (Dynamically rendered) */}
//         <section id="skills" className="py-16 border-t border-gray-200">
//           <AnimationWrapper delay={0.4}>
//               <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Technical Skills</h2>
//               <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
//                   {skills.length > 0 ? (
//                     skills.map((skill, index) => (
//                         <span key={skill._id || index} className="px-5 py-2 bg-white border border-indigo-300 text-indigo-700 font-medium rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-indigo-50">
//                             {skill.name} 
//                         </span>
//                     ))
//                   ) : (
//                     <p className="text-center text-gray-500 w-full">No skills found. Please update your skill list!</p>
//                   )}
//               </div>
//           </AnimationWrapper>
//         </section>

//         {/* 📧 Contact Section */}
//         <section id="contact" className="py-16 border-t border-gray-200 mb-10">
//           <AnimationWrapper delay={0.6}>
//             <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-8">Get In Touch / Suggestions</h2>
//             <div className="max-w-xl mx-auto">
//               <ContactForm /> 
//             </div>
//           </AnimationWrapper>
//         </section>
//       </div>
//     </main>
//   );
// }












// // client/app/page.jsx
// import AnimationWrapper from '@/components/AnimationWrapper';
// import ProjectCard from '@/components/ProjectCard';
// import ContactForm from '@/components/ContactForm';
// import ResumeDownload from '@/components/ResumeDownload';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // Function to fetch dynamic project data
// async function getProjects() {
//   try {
//     // Fetch data from your Node.js backend
//     const res = await fetch(`${BACKEND_URL}/api/v1/projects`, {
//       cache: 'no-store' // Ensure fresh data on every request
//     });
//     if (!res.ok) {
//         // This will be caught by the catch block
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("Failed to fetch projects:", error);
//     return []; // Return empty array on failure
//   }
// }

// // Function to fetch dynamic skill data
// async function getSkills() {
//   try {
//     // Assuming your skills endpoint is /api/v1/skills
//     const res = await fetch(`${BACKEND_URL}/api/v1/skills`, {
//       cache: 'no-store' 
//     });
//     if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     // Assuming the backend returns an array of skill objects, 
//     // where each object has a 'name' property (e.g., [{ name: 'Next.js' }, { name: 'Node.js' }])
//     return res.json(); 
//   } catch (error) {
//     console.error("Failed to fetch skills:", error);
//     return []; // Return empty array on failure
//   }
// }

// export default async function HomePage() {
//   // Fetch projects and skills concurrently for better performance
//   const [projects, skills] = await Promise.all([
//     getProjects(),
//     getSkills()
//   ]);

//   return (
//     // Reverted background to white/light gray for professional contrast
//     <main className="min-h-screen bg-white font-sans">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
//         {/* 🚀 Hero Section - No structural change needed here */}
//         <section className="text-center py-20 lg:py-24">
//           <AnimationWrapper>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
//               Hello, I am <span className="text-indigo-600">Your Name</span>
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
//               A Full-Stack Developer leveraging the power of Next.js, Node.js, and MongoDB to build dynamic and scalable web applications.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
//               <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02]">
//                 View My Work
//               </a>
//               <ResumeDownload />
//             </div>
//           </AnimationWrapper>
//         </section>

//         {/* 💡 Projects Section - Updated with Left Column Descriptor */}
//         <section id="projects" className="py-16 border-t border-gray-200">
//           <AnimationWrapper delay={0.2}>
//             {/* New responsive two-column layout for desktop */}
//             <div className="lg:flex lg:gap-12">
              
//               {/* Left Column: Context/Description */}
//               <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
//                 <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">My Work</h2>
//                 <p className="text-lg text-gray-600 border-l-4 border-indigo-200 pl-4 inline-block lg:block">
//                   A curated collection of my featured full-stack projects, demonstrating versatility across different technologies and complex features.
//                 </p>
//               </div>

//               {/* Right Column: Main Content */}
//               <div className="lg:w-3/4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//                   {projects.length > 0 ? (
//                     projects.map((project, index) => (
//                       <AnimationWrapper key={project._id} delay={0.3 + index * 0.1}>
//                         <ProjectCard project={project} />
//                       </AnimationWrapper>
//                     ))
//                   ) : (
//                     <p className="col-span-full text-center text-lg text-gray-500 p-6 bg-gray-50 rounded-xl shadow-inner">No projects found. Please add some via the admin panel!</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </AnimationWrapper>
//         </section>

//         {/* 🛠️ Skills Section - Updated with Left Column Descriptor */}
//         <section id="skills" className="py-16 border-t border-gray-200">
//           <AnimationWrapper delay={0.4}>
//             {/* New responsive two-column layout for desktop */}
//             <div className="lg:flex lg:gap-12">

//               {/* Left Column: Context/Description */}
//               <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
//                 <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">Expertise</h2>
//                 <p className="text-lg text-gray-600 border-l-4 border-indigo-200 pl-4 inline-block lg:block">
//                   The tools, languages, and frameworks that define my stack. My core competency lies in building robust, performant web applications.
//                 </p>
//               </div>
              
//               {/* Right Column: Main Content */}
//               <div className="lg:w-3/4">
//                 <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
//                     {skills.length > 0 ? (
//                       skills.map((skill, index) => (
//                           <span key={skill._id || index} className="px-5 py-2 bg-white border border-indigo-300 text-indigo-700 font-medium rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-indigo-50">
//                               {skill.name} 
//                           </span>
//                       ))
//                     ) : (
//                       <p className="text-center text-gray-500 w-full">No skills found. Please update your skill list!</p>
//                     )}
//                 </div>
//               </div>
//             </div>
//           </AnimationWrapper>
//         </section>

//         {/* 📧 Contact Section - Updated with Left Column Descriptor */}
//         <section id="contact" className="py-16 border-t border-gray-200 mb-10">
//           <AnimationWrapper delay={0.6}>
//             {/* New responsive two-column layout for desktop */}
//             <div className="lg:flex lg:gap-12">

//               {/* Left Column: Context/Description */}
//               <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
//                 <h2 className="text-3xl font-extrabold text-indigo-800 mb-2">Next Step</h2>
//                 <p className="text-lg text-gray-600 border-l-4 border-indigo-200 pl-4 inline-block lg:block">
//                   Ready to collaborate? Reach out to discuss a project, a job opportunity, or just say hello!
//                 </p>
//               </div>

//               {/* Right Column: Main Content */}
//               <div className="lg:w-3/4 max-w-xl lg:mx-0 mx-auto">
//                 <ContactForm /> 
//               </div>
//             </div>
//           </AnimationWrapper>
//         </section>
//       </div>
//     </main>
//   );
// }














// client/app/page.jsx
import AnimationWrapper from '@/components/AnimationWrapper';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import ResumeDownload from '@/components/ResumeDownload';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to fetch dynamic project data
async function getProjects() {
  try {
    // Fetch data from your Node.js backend
    const res = await fetch(`${BACKEND_URL}/api/v1/projects`, {
      cache: 'no-store' // Ensure fresh data on every request
    });
    if (!res.ok) {
        // This will be caught by the catch block
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return []; // Return empty array on failure
  }
}

// Function to fetch dynamic skill data
async function getSkills() {
  try {
    // Assuming your skills endpoint is /api/v1/skills
    const res = await fetch(`${BACKEND_URL}/api/v1/skills`, {
      cache: 'no-store' 
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    // Assuming the backend returns an array of skill objects, 
    // where each object has a 'name' property (e.g., [{ name: 'Next.js' }, { name: 'Node.js' }])
    return res.json(); 
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return []; // Return empty array on failure
  }
}

export default async function HomePage() {
  // Fetch projects and skills concurrently for better performance
  const [projects, skills] = await Promise.all([
    getProjects(),
    getSkills()
  ]);

  return (
    // 1. Full width, attractive dark background, big font
    <main className="min-h-screen bg-yellow-200 font-sans text-gray-200 rounded-full">
      {/* Removed max-w-7xl for full width use, increased padding */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 🚀 Hero Section - Increased font size and new colors */}
        <section className="text-center py-20 lg:py-32 bg-red-400 rounded-3xl">
          <AnimationWrapper>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-tight">
              Hello, I am <span className="text-teal-400">Prabhav Giriya</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto">
              A Full-Stack Developer leveraging the power of Next.js, Node.js, and MongoDB to build dynamic and scalable web applications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="/projects" className="w-full sm:w-auto px-10 py-4 bg-teal-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:bg-teal-600 transition duration-300 transform hover:scale-[1.05] hover:shadow-teal-500/50">
                View My Work
              </a>
              <ResumeDownload /> {/* Assuming ResumeDownload button uses relative styling */}
            </div>
          </AnimationWrapper>
        </section>

        {/* 💡 Projects Section - Updated with Left Column Descriptor, bigger text, and new colors */}
        <section id="projects" className="py-20 border-t bg-red-100 border-slate-700 rounded-3xl">
          <AnimationWrapper delay={0.2}>
            {/* New responsive two-column layout for desktop */}
            <div className="lg:flex lg:gap-16">
              
              {/* Left Column: Context/Description */}
              <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
                <h2 className="text-4xl font-extrabold text-teal-400 mb-4">My Work</h2>
                <p className="text-4xl text-gray-400 border-l-4 border-teal-600 pl-6 inline-block lg:block">
                  A curated collection of my featured full-stack projects, demonstrating versatility across different technologies and complex features.
                </p>
              </div>

              {/* Right Column: Main Content */}
              <div className="lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
                  {projects.length > 0 ? (
                    projects.slice(0,2).map((project, index) => (
                      <AnimationWrapper key={project._id} delay={0.3 + index * 0.1}>
                        {/* ProjectCard needs to handle dark theme inside */}
                        <ProjectCard project={project} /> 
                      </AnimationWrapper>
                    ))
                  ) : (
                    <p className="col-span-full text-center text-xl text-gray-500 p-8 bg-slate-800 rounded-xl shadow-inner border border-slate-700">No projects found. Please add some via the admin panel!</p>
                  )}
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </section>

        {/* 🛠️ Skills Section - Updated with Left Column Descriptor, bigger text, and new colors */}
        <section id="skills" className="py-20 border-t bg-amber-800 border-slate-700 rounded-3xl">
          <AnimationWrapper delay={0.4}>
            {/* New responsive two-column layout for desktop */}
            <div className="lg:flex lg:gap-16">

              {/* Left Column: Context/Description */}
              <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
                <h2 className="text-4xl font-extrabold text-teal-400 mb-4">Expertise</h2>
                <p className="text-4xl text-gray-400 border-l-4 border-teal-600 pl-6 inline-block lg:block">
                  The tools, languages, and frameworks that define my stack. My core competency lies in building robust, performant web applications.
                </p>
              </div>
              
              {/* Right Column: Main Content */}
              <div className="lg:w-3/4">
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                    {skills.length > 0 ? (
                      skills.map((skill, index) => (
                          <span key={skill._id || index} className="px-6 py-3 bg-slate-800 border border-teal-600 text-teal-400 text-4xl font-medium rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-slate-700">
                              {skill.name} 
                          </span>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 w-full text-xl">No skills found. Please update your skill list!</p>
                    )}
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </section>

        {/* 📧 Contact Section - Updated with Left Column Descriptor, bigger text, and new colors */}
        <section id="contact" className="py-20 border-t bg-orange-300 border-slate-700 mb-10 rounded-3xl">
          <AnimationWrapper delay={0.6}>
            {/* New responsive two-column layout for desktop */}
            <div className="lg:flex lg:gap-16">

              {/* Left Column: Context/Description */}
              <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
                <h2 className="text-4xl font-extrabold text-teal-400 mb-4">Next Step</h2>
                <p className="text-4xl text-gray-400 border-l-4 border-teal-600 pl-6 inline-block lg:block">
                  Ready to collaborate? Reach out to discuss a project, a job opportunity, or just say hello!
                </p>
              </div>

              {/* Right Column: Main Content */}
              <div className="lg:w-3/4 max-w-2xl lg:mx-0 mx-auto">
                {/* Assuming ContactForm.jsx uses relative white background inside */}
                <ContactForm /> 
              </div>
            </div>
          </AnimationWrapper>
        </section>
      </div>
    </main>
  );
}
