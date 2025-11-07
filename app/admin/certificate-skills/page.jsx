
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Environment Setup & Utilities ---

// Use a fallback for the environment variable in this self-contained environment
const BACKEND_URL = typeof process !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000') 
    : 'http://localhost:5000';// Replace with your actual backend URL

/**
 * Custom fetch utility with error handling and optional payload for POST/PUT.
 */
const apiFetch = async (url, method = 'GET', data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            let errorText = response.statusText;
            const contentType = response.headers.get('content-type');

            // Check if the content type is JSON before attempting to parse it
            if (contentType && contentType.includes('application/json')) {
                try {
                    const errorData = await response.json();
                    errorText = errorData.message || errorData.error || response.statusText;
                } catch (e) {
                    // Failed to parse JSON, fall back to a generic message
                    errorText = `Error parsing JSON response for status ${response.status}.`;
                }
            } else {
                // Non-JSON response (likely HTML error page). Throw a more informative error.
                errorText = `Server error (${response.status}): The URL may be wrong or the backend server is not running or returned a non-JSON page.`;
            }
            
            throw new Error(errorText);
        }
        
        // Handle no-content response (like a DELETE)
        if (response.status === 204 || method === 'DELETE') {
            return { success: true, message: 'Operation successful' };
        }

        return response.json();

    } catch (error) {
        console.error("API Fetch Error:", error.message);
        throw error;
    }
};

// --- Shared Components ---

// A simple animation wrapper (using a placeholder since framer-motion isn't available)
const AnimationWrapper = ({ children, className = '' }) => (
    <div className={`p-4 transition-opacity duration-500 ease-in ${className}`}>
        {children}
    </div>
);

// Standardized delete button logic
const DeleteItemButton = ({ id, entityType, onDeleted }) => {
    // NOTE: Cannot use window.confirm or window.alert in this environment.
    // Switching to a console message for simplicity in this single-file React app.
    const handleDelete = async () => {
        // In a real app, this would be a custom modal confirmation
        const isConfirmed = prompt(`Type 'DELETE' to confirm deletion of this ${entityType}:`) === 'DELETE';
        
        if (!isConfirmed) {
            return;
        }

        const endpoint = entityType === 'certification' 
            ? 'certifications' 
            : 'skills';
        
        const url = `${BACKEND_URL}/api/v1/${endpoint}/${id}`;

        try {
            await apiFetch(url, 'DELETE');
            console.log(`${entityType} deleted successfully!`); // Use console.log instead of alert
            onDeleted();
        } catch (error) {
            console.error(`Error deleting ${entityType}: ${error.message}`); // Use console.error instead of alert
        }
    };

    return (
        <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 transition"
        >
            Delete
        </button>
    );
};

// --- Certification Form Component ---

const CertificationForm = ({ mode, initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        dateIssued: new Date().toISOString().substring(0, 10), // YYYY-MM-DD
        credentialId: '',
        url: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData({
                title: initialData.title || '',
                issuer: initialData.issuer || '',
                // Format Date object or ISO string to YYYY-MM-DD for input type="date"
                dateIssued: initialData.dateIssued ? new Date(initialData.dateIssued).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
                credentialId: initialData.credentialId || '',
                url: initialData.url || ''
            });
        }
    }, [mode, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const url = mode === 'create' 
            ? `${BACKEND_URL}/api/v1/certifications`
            : `${BACKEND_URL}/api/v1/certifications/${initialData._id}`;
        const method = mode === 'create' ? 'POST' : 'PUT';
        
        try {
            const data = await apiFetch(url, method, formData);
            console.log(`Certification ${mode === 'create' ? 'created' : 'updated'} successfully!`);
            onSave(data);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">{mode} Certification</h2>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Issuer <span className="text-red-500">*</span></label>
                <input type="text" name="issuer" value={formData.issuer} onChange={handleChange} required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Date Issued <span className="text-red-500">*</span></label>
                <input type="date" name="dateIssued" value={formData.dateIssued} onChange={handleChange} required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Credential ID (Optional)</label>
                <input type="text" name="credentialId" value={formData.credentialId} onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Certificate URL (Optional)</label>
                <input type="url" name="url" value={formData.url} onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg text-white transition ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Certification' : 'Update Certification'}
                </button>
            </div>
        </form>
    );
};

// --- Skill Form Component ---

const SKILL_PROFICIENCY = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'General'];

const SkillForm = ({ mode, initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        proficiency: SKILL_PROFICIENCY[1],
        category: SKILL_CATEGORIES[4],
        order: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData({
                name: initialData.name || '',
                proficiency: initialData.proficiency || SKILL_PROFICIENCY[1],
                category: initialData.category || SKILL_CATEGORIES[4],
                order: initialData.order || 0
            });
        }
    }, [mode, initialData]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseInt(value, 10) : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const url = mode === 'create' 
            ? `${BACKEND_URL}/api/v1/skills`
            : `${BACKEND_URL}/api/v1/skills/${initialData._id}`;
        const method = mode === 'create' ? 'POST' : 'PUT';
        
        try {
            const data = await apiFetch(url, method, formData);
            console.log(`Skill ${mode === 'create' ? 'created' : 'updated'} successfully!`);
            onSave(data);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">{mode} Skill</h2>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Proficiency <span className="text-red-500">*</span></label>
                <select name="proficiency" value={formData.proficiency} onChange={handleChange} required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                    {SKILL_PROFICIENCY.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                <select name="category" value={formData.category} onChange={handleChange} required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                    {SKILL_CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Order/Rank (Number)</label>
                <input type="number" name="order" value={formData.order} onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg text-white transition ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Skill' : 'Update Skill'}
                </button>
            </div>
        </form>
    );
};

// --- Page Components ---

const CertificationsListPage = ({ onNavigate }) => {
    const [certifications, setCertifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCertifications = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiFetch(`${BACKEND_URL}/api/v1/certifications`);
            setCertifications(data);
        } catch (err) {
            setError(err.message);
            setCertifications([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCertifications();
    }, [fetchCertifications]);

    if (isLoading) return <div className="text-center py-10 text-lg text-gray-500">Loading certifications...</div>;
    if (error) return <div className="text-center py-10 text-lg text-red-500">Error: {error}</div>;

    return (
        <AnimationWrapper>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Manage Certifications ({certifications.length})</h1>
                <button 
                    onClick={() => onNavigate('certifications/create')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                >
                    + Add New Certification
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {certifications.map((cert) => (
                            <tr key={cert._id} className="hover:bg-indigo-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cert.issuer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(cert.dateIssued).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onNavigate('certifications/edit', cert._id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </button>
                                    <DeleteItemButton 
                                        id={cert._id} 
                                        entityType="certification" 
                                        onDeleted={fetchCertifications} 
                                    /> 
                                </td>
                            </tr>
                        ))}
                        {certifications.length === 0 && (
                            <tr><td colSpan="4" className="text-center py-8 text-gray-500">No certifications found. Add one!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AnimationWrapper>
    );
};

const SkillsListPage = ({ onNavigate }) => {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSkills = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiFetch(`${BACKEND_URL}/api/v1/skills`);
            // Group skills by category for better display
            const groupedSkills = data.reduce((acc, skill) => {
                const category = skill.category || 'Uncategorized';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(skill);
                return acc;
            }, {});
            // Convert back to a display array of groups
            const displayData = Object.keys(groupedSkills).map(category => ({
                category,
                skills: groupedSkills[category]
            }));
            setSkills(displayData);
        } catch (err) {
            setError(err.message);
            setSkills([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    // Render grouped skills
    const renderSkillTable = (group) => (
        <div key={group.category} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 my-4 border-b pb-2">{group.category}</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proficiency</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {group.skills.map((skill) => (
                            <tr key={skill._id} className="hover:bg-indigo-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        skill.proficiency === 'Expert' ? 'bg-red-100 text-red-800' :
                                        skill.proficiency === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                                        skill.proficiency === 'Intermediate' ? 'bg-green-100 text-green-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {skill.proficiency}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{skill.order}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onNavigate('skills/edit', skill._id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </button>
                                    <DeleteItemButton 
                                        id={skill._id} 
                                        entityType="skill" 
                                        onDeleted={fetchSkills} 
                                    /> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


    if (isLoading) return <div className="text-center py-10 text-lg text-gray-500">Loading skills...</div>;
    if (error) return <div className="text-center py-10 text-lg text-red-500">Error: {error}</div>;


    return (
        <AnimationWrapper>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Manage Skills</h1>
                <button 
                    onClick={() => onNavigate('skills/create')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                >
                    + Add New Skill
                </button>
            </div>
            
            {skills.length > 0 ? (
                skills.map(renderSkillTable)
            ) : (
                <div className="text-center py-8 text-gray-500">No skills found. Add one!</div>
            )}
        </AnimationWrapper>
    );
};

// --- Main App Component (Router Logic) ---

// Component to handle fetching data for edit mode
const EditPageWrapper = ({ entityType, id, FormComponent, ListComponent, onNavigate }) => {
    const [initialData, setInitialData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const endpoint = entityType === 'certification' ? 'certifications' : 'skills';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiFetch(`${BACKEND_URL}/api/v1/${endpoint}/${id}`);
                setInitialData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, endpoint]);

    const handleSave = () => onNavigate(endpoint);
    const handleCancel = () => onNavigate(endpoint);

    if (isLoading) return <div className="text-center py-10 text-lg text-gray-500">Loading {entityType} data...</div>;
    if (error) return <div className="text-center py-10 text-lg text-red-500">Error loading {entityType}: {error}</div>;
    if (!initialData) return <div className="text-center py-10 text-lg text-red-500">404: {entityType} not found.</div>;

    const title = entityType === 'certification' ? `Edit Certification: ${initialData.title}` : `Edit Skill: ${initialData.name}`;

    return (
        <AnimationWrapper>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">{title}</h1>
            <FormComponent 
                mode="edit" 
                initialData={initialData} 
                onSave={handleSave} 
                onCancel={handleCancel} 
            />
        </AnimationWrapper>
    );
};

const BackendStatusAlert = () => (
    <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md" role="alert">
        <p className="font-bold">Backend Connection Warning (404 Error)</p>
        <p className="text-sm">
            The **404 error** is usually caused because the backend server is not running or is not accessible at the configured URL.
            Please ensure your server is running and check the URL defined by <code className="font-mono bg-yellow-200 p-1 rounded">BACKEND_URL</code> 
            in the code (<code className="font-mono bg-yellow-200 p-1 rounded">{BACKEND_URL}</code>) matches your actual backend address.
        </p>
    </div>
);


export default function App() {
    // Simple state-based router simulation: currentPage stores the route path
    const [currentPage, setCurrentPage] = useState('certifications'); 
    const [currentId, setCurrentId] = useState(null); // Used for edit mode

    // Helper to navigate and reset ID
    const handleNavigate = (page, id = null) => {
        setCurrentPage(page);
        setCurrentId(id);
    };

    // Determine which component to render based on the current page state
    const renderPage = useMemo(() => {
        if (currentPage === 'certifications') {
            return <CertificationsListPage onNavigate={handleNavigate} />;
        }
        if (currentPage === 'certifications/create') {
            return (
                <AnimationWrapper>
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Add New Certification</h1>
                    <CertificationForm 
                        mode="create" 
                        onSave={() => handleNavigate('certifications')} 
                        onCancel={() => handleNavigate('certifications')} 
                    />
                </AnimationWrapper>
            );
        }
        if (currentPage === 'certifications/edit' && currentId) {
            return (
                <EditPageWrapper 
                    entityType="certification" 
                    id={currentId} 
                    FormComponent={CertificationForm} 
                    onNavigate={handleNavigate}
                />
            );
        }
        if (currentPage === 'skills') {
            return <SkillsListPage onNavigate={handleNavigate} />;
        }
        if (currentPage === 'skills/create') {
            return (
                <AnimationWrapper>
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Add New Skill</h1>
                    <SkillForm 
                        mode="create" 
                        onSave={() => handleNavigate('skills')} 
                        onCancel={() => handleNavigate('skills')} 
                    />
                </AnimationWrapper>
            );
        }
        if (currentPage === 'skills/edit' && currentId) {
            return (
                <EditPageWrapper 
                    entityType="skill" 
                    id={currentId} 
                    FormComponent={SkillForm} 
                    onNavigate={handleNavigate}
                />
            );
        }
        
        // Default to Certifications if route is unrecognized (or you can create a 404 page)
        return <CertificationsListPage onNavigate={handleNavigate} />;
    }, [currentPage, currentId]);

    // Simple Side Navigation
    const navItems = [
        { label: 'Certifications', page: 'certifications' },
        { label: 'Skills', page: 'skills' },
        // Add Projects back if needed
        // { label: 'Projects', page: 'projects' }, 
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <h1 className="text-3xl font-bold mb-6">Certifications & Skills CMS</h1>
            
            {/* Backend Status Alert */}
            <BackendStatusAlert />

            {/* Navigation Bar */}
            <div className="flex space-x-4 mb-8">
                {navItems.map(item => (
                    <button
                        key={item.page}
                        onClick={() => handleNavigate(item.page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage.startsWith(item.page) 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'bg-white text-gray-700 hover:bg-indigo-100'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto">
                {renderPage}
            </div>
        </div>
    );
}
