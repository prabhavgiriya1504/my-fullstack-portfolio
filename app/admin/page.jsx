
import { cookies } from 'next/headers'; 
import { redirect } from 'next/navigation'; 
import AnimationWrapper from '@/components/AnimationWrapper';

// Forces the route to render dynamically on the server to read cookies
export const dynamic = 'force-dynamic'; 

// Define metadata for this specific admin page
export const metadata = {
    title: 'Admin Dashboard | Portfolio CMS',
};

export default async function AdminDashboardPage() {
    
    
    // 1. Securely read the HTTP-only cookie on the server
    const adminToken = cookies().get('admin-session-token')?.value; 

    if (!adminToken) {
        // If the secure coookie is missing, redirecting the user to the login page
        console.log(" [AdminDashboardPage] Authentication failed: Token missing. Redirecting to /login.");
        redirect('/login'); 
    }
   
    
    // If we reahc thsi point, the user is authenticated and the token is present.
    
    return (
        <AnimationWrapper>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome to the Admin Dashboard 👋</h1>
            <p className="text-lg text-gray-600 mb-8">
                Manage all your dynamic content from here. Use the sidebar to navigate between sections.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-indigo-50 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-2">Projects</h2>
                    <p className="text-gray-600">Total Projects: **0**</p>
                    <p className="text-sm text-gray-500 mt-2">Go to "Projects" to add, edit, or delete portfolio entries.</p>
                </div>
                <div className="p-6 bg-red-50 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-red-700 mb-2">Pending Contacts</h2>
                    <p className="text-gray-600">New Messages: **0**</p>
                    <p className="text-sm text-gray-500 mt-2">Check the "Contacts" section for new user submissions.</p>
                </div>
                <div className="p-6 bg-green-50 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">System Status</h2>
                    <p className="text-gray-600">Backend: **Running**</p>
                    <p className="text-gray-600">Database: **Connected**</p>
                    <p className="text-sm text-gray-500 mt-2">Awaiting real-time status implementation.</p>
                </div>
            </div>
            
            <div className="mt-10 p-6 bg-white border border-gray-200 rounded-xl">
                <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><a href="/admin/projects/create" className="text-indigo-600 hover:underline">Create New Project</a></li>
                    <li><a href="/admin/contacts" className="text-indigo-600 hover:underline">View Contact Messages</a></li> 
                </ul>
            </div>
        </AnimationWrapper>
    );
}