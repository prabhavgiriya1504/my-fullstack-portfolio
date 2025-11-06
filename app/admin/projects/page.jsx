// // client/app/admin/projects/page.jsx
// import Link from 'next/link';
// import AnimationWrapper from '@/components/AnimationWrapper';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// async function getProjects() {
//     // Re-fetch data for the admin list
//     const res = await fetch(`${BACKEND_URL}/api/v1/projects`, { cache: 'no-store' });
//     if (!res.ok) return [];
//     return res.json();
// }

// export default async function AdminProjectsPage() {
//     const projects = await getProjects();

//     return (
//         <AnimationWrapper>
//             <div className="flex justify-between items-center mb-6 border-b pb-4">
//                 <h1 className="text-3xl font-bold text-gray-900">Manage Projects ({projects.length})</h1>
//                 <Link 
//                     href="/admin/projects/create"
//                     className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
//                 >
//                     + Add New Project
//                 </Link>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
//                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {projects.map((project) => (
//                             <tr key={project._id} className="hover:bg-indigo-50 transition-colors duration-150">
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                     <div className="flex flex-wrap gap-2">
//                                         {project.technologies.slice(0, 3).map((tech, i) => (
//                                             <span key={i} className="px-2 py-0.5 text-xs bg-gray-200 rounded-md">
//                                                 {tech}
//                                             </span>
//                                         ))}
//                                         {project.technologies.length > 3 && <span className="text-xs text-gray-500">+{project.technologies.length - 3}</span>}
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <Link href={`/admin/projects/edit/${project._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
//                                         Edit
//                                     </Link>
//                                     <button 
//                                         onClick={() => console.log('Delete Project:', project._id)} // Implement deletion logic here
//                                         className="text-red-600 hover:text-red-900"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </AnimationWrapper>
//     );
// }
























'use client'; // Marking the entire file as a client component to resolve environment access issues

import { motion } from 'framer-motion'; // Used by AnimationWrapper

// --- Environment Setup ---
// In a pure client environment, process.env might not be defined, so we check for both.
// Assuming the environment variable is passed through the client process.
const BACKEND_URL = typeof process !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000') 
    : 'http://localhost:5000'; // Default fallback

// --- Internal Client Components ---

const DeleteProjectButton = ({ projectId }) => {
    // Using window.confirm instead of custom modal for simplicity as per previous component state
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            const apiUrl = `${BACKEND_URL}/api/v1/projects/${projectId}`;
            
            const response = await fetch(apiUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Project ${projectId} deleted successfully.`);
                // Force a page reload to update the list
                window.location.reload(); 
            } else {
                const errorData = await response.json();
                console.error('Failed to delete project:', errorData.message || response.statusText);
                alert(`Error deleting project: ${errorData.message || response.statusText}`); 
            }
        } catch (error) {
            console.error('Network or unexpected error during deletion:', error);
            alert('An unexpected error occurred during deletion. See console for details.');
        }
    };

    return (
        <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-900"
        >
            Delete
        </button>
    );
};

function AnimationWrapper({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
// --- End Internal Client Components ---

// Data Fetching function is now executed client-side, but it must be synchronous or awaited 
// *before* the component renders, which is difficult with async components in this context.
// I will convert the main component to a standard functional component and use useState/useEffect
// to fetch the data client-side, which is the correct pattern when the 'use client' directive is present.

import { useState, useEffect } from 'react';

// Renamed from getProjects to fetchProjectsClientSide
async function fetchProjectsClientSide() {
    // Use the client-side BACKEND_URL constant defined above
    const res = await fetch(`${BACKEND_URL}/api/v1/projects`, { 
        cache: 'no-store' // Equivalent to no-cache header in client fetch
    });
    
    if (!res.ok) {
        console.error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
        return [];
    }
    return res.json();
}

// Convert to a standard functional client component
export default function AdminProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjectsClientSide();
                setProjects(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects.");
            } finally {
                setIsLoading(false);
            }
        };
        loadProjects();
    }, []);

    if (isLoading) {
        return <AnimationWrapper><div className="text-center py-10 text-lg text-gray-500">Loading projects...</div></AnimationWrapper>;
    }

    if (error) {
        return <AnimationWrapper><div className="text-center py-10 text-lg text-red-500">Error: {error}</div></AnimationWrapper>;
    }

    return (
        <AnimationWrapper>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Manage Projects ({projects.length})</h1>
                {/* Standard anchor tag <a> is used for navigation */}
                <a 
                    href="/admin/projects/create"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                >
                    + Add New Project
                </a>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((project) => (
                            <tr key={project._id} className="hover:bg-indigo-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <div className="flex flex-wrap gap-2">
                                        {/* Ensure project.technologies is an array before mapping */}
                                        {(project.technologies || []).slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 text-xs bg-gray-200 rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                        {(project.technologies || []).length > 3 && <span className="text-xs text-gray-500">+{project.technologies.length - 3}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href={`/admin/projects/edit/${project._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </a>
                                    <DeleteProjectButton projectId={project._id} /> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AnimationWrapper>
    );
}
