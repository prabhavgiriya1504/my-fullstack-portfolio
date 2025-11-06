// // components/ProjectForm.jsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function ProjectForm({ mode = 'create', initialData = {} }) {
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         title: initialData.title || '',
//         description: initialData.description || '',
//         technologies: initialData.technologies ? initialData.technologies.join(', ') : '',
//         liveUrl: initialData.liveUrl || '',
//         githubUrl: initialData.githubUrl || '',
//         // imageUrl: initialData.imageUrl || '', // Placeholder
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//         setSuccess(false);

//         // Convert comma-separated technologies string to an array
//         const payload = {
//             ...formData,
//             technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0)
//         };
        
//         const url = mode === 'create' 
//             ? `${BACKEND_URL}/api/v1/projects`
//             : `${BACKEND_URL}/api/v1/projects/${initialData._id}`; // Need PUT/DELETE logic in server/routes/projects.js for 'edit' mode
        
//         const method = mode === 'create' ? 'POST' : 'PUT';

//         try {
//             const res = await fetch(url, {
//                 method,
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//             });

//             if (!res.ok) {
//                 const errorData = await res.json();
//                 throw new Error(errorData.error || 'Failed to save project.');
//             }

//             setSuccess(true);
            
//             // Redirect after successful creation/update
//             router.push('/admin/projects'); 
//             router.refresh(); // Force a refresh of the page content
//         } catch (err) {
//             setError(err.message || 'An unexpected error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const titleText = mode === 'create' ? 'Create Project' : 'Update Project';

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Title */}
//             <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
//                 <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//             </div>

//             {/* Description */}
//             <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                     name="description"
//                     id="description"
//                     rows="4"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
//                 ></textarea>
//             </div>

//             {/* Technologies */}
//             <div>
//                 <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
//                     Technologies (Comma-Separated)
//                 </label>
//                 <input
//                     type="text"
//                     name="technologies"
//                     id="technologies"
//                     placeholder="e.g., Next.js, Tailwind CSS, MongoDB, Node.js"
//                     value={formData.technologies}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//             </div>
            
//             {/* Live & GitHub URLs */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">Live URL</label>
//                     <input
//                         type="url"
//                         name="liveUrl"
//                         id="liveUrl"
//                         value={formData.liveUrl}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">GitHub URL</label>
//                     <input
//                         type="url"
//                         name="githubUrl"
//                         id="githubUrl"
//                         value={formData.githubUrl}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>
//             </div>

//             {/* Status Messages */}
//             {error && (
//                 <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md" role="alert">
//                     Error: {error}
//                 </div>
//             )}
//             {success && (
//                 <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md" role="alert">
//                     Project {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...
//                 </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4 border-t border-gray-200">
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition"
//                 >
//                     {loading ? `${titleText}...` : titleText}
//                 </button>
//             </div>
//         </form>
//     );
// }



















// added imageurl
// components/ProjectForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProjectForm({ mode = 'create', initialData = {} }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        technologies: initialData.technologies ? initialData.technologies.join(', ') : '',
        liveUrl: initialData.liveUrl || '',
        githubUrl: initialData.githubUrl || '',
        // --- ADDED: imageUrl field to state ---
        imageUrl: initialData.imageUrl || '/placeholder-project.webp', 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Convert comma-separated technologies string to an array
        const payload = {
            ...formData,
            technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0)
        };
        
        const url = mode === 'create' 
            ? `${BACKEND_URL}/api/v1/projects`
            : `${BACKEND_URL}/api/v1/projects/${initialData._id}`; 
        
        const method = mode === 'create' ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to save project.');
            }

            setSuccess(true);
            
            // Redirect after successful creation/update
            router.push('/admin/projects'); 
            router.refresh(); 
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const titleText = mode === 'create' ? 'Create Project' : 'Update Project';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    id="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
            </div>

            {/* Technologies */}
            <div>
                <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
                    Technologies (Comma-Separated)
                </label>
                <input
                    type="text"
                    name="technologies"
                    id="technologies"
                    placeholder="e.g., Next.js, Tailwind CSS, MongoDB, Node.js"
                    value={formData.technologies}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Live & GitHub URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">Live URL</label>
                    <input
                        type="url"
                        name="liveUrl"
                        id="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">GitHub URL</label>
                    <input
                        type="url"
                        name="githubUrl"
                        id="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
            
            {/* --- ADDED: Image URL --- */}
            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/project-image.jpg"
                    // Removed 'required' assuming image is optional, you can add it back if needed
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            {/* --- END ADDED: Image URL --- */}

            {/* Status Messages */}
            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md" role="alert">
                    Error: {error}
                </div>
            )}
            {success && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md" role="alert">
                    Project {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition"
                >
                    {loading ? `${titleText}...` : titleText}
                </button>
            </div>
        </form>
    );
}