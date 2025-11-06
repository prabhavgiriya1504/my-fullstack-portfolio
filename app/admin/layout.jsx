// // client/app/admin/layout.jsx
// // NOTE: You must implement an Authentication system (e.g., NextAuth.js or simple login)
// // for the admin routes to be secure. This layout assumes a simple auth check for now.

// import AdminSidebar from '@/components/AdminSidebar';

// export default function AdminLayout({ children }) {
//     // In a real app, check for authentication here
//     const isAuthenticated = true; 

//     if (!isAuthenticated) {
//         return <div className="p-8 text-center text-red-500">Access Denied. Please Login.</div>;
//     }

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <AdminSidebar />
//             <div className="flex-1 p-8 pt-12">
//                 <div className="bg-white p-6 rounded-xl shadow-lg">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// }



// // client/app/admin/layout.jsx

// 'use client'; // 👈 Must be a Client Component to use hooks

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
// import AdminSidebar from '@/components/AdminSidebar';
// // Assuming you have a utility function to check the login status (e.g., check for a cookie)

// export default function AdminLayout({ children }) {
//     const router = useRouter();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // ⚠️ Placeholder: Implement a SECURE check for the admin token/session cookie here.
//         // A simple way is to read a non-HTTP-only cookie (if you choose that path, though not recommended).
//         // A better way is to call a secure server route that checks an HTTP-only cookie.
        
//         const adminToken = localStorage.getItem('adminToken'); // <-- Replace with a secure cookie check!

//         if (adminToken) {
//             // OPTIONAL: Validate the token with a quick API call if necessary
//             setIsAuthenticated(true);
//         } else {
//             setIsAuthenticated(false);
//             // Redirect the user to the login page if not authenticated
//             router.replace('/login'); 
//         }
//         setIsLoading(false);
//     }, [router]);

//     // Show a loading indicator while checking auth status
//     if (isLoading) {
//         return <div className="p-8 text-center">Loading...</div>;
//     }

//     // Only render the layout if authenticated (this check is secondary to the redirect above)
//     if (!isAuthenticated) {
//         // If the redirect hasn't fully kicked in, show this.
//         return <div className="p-8 text-center text-red-500">Access Denied. Redirecting to login...</div>;
//     }

//     // Render the secure admin layout
//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <AdminSidebar />
//             <div className="flex-1 p-8 pt-12">
//                 <div className="bg-white p-6 rounded-xl shadow-lg">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// }















// app/admin/layout.jsx

// ⚠️ Convert back to a Server Component!
// Remove 'use client' and all client-side logic.
// The pages within the route group will handle redirection.

import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
    // ⚠️ CRITICAL CHANGE: Remove all client-side hooks (useState, useEffect)
    // and rely on the Server Component pages (like contacts/page.jsx) 
    // to perform the redirect.

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* The sidebar is likely still a Client Component, so it's fine */}
            <AdminSidebar /> 
            <div className="flex-1 p-8 pt-12">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}