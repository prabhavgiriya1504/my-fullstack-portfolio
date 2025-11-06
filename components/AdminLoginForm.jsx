// // components/LoginForm.js

// 'use client'; // 👈 Must be a Client Component

// import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Use App Router hook

// export default function LoginForm() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // 1. Call the new App Router API endpoint
//     const res = await fetch('/api/login', { 
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     });

//     if (res.ok) {
//       // 2. Successful Login: Set a temporary client-side token for the layout check
//       // ⚠️ Remember: This is INSECURE for a real admin app (HttpOnly cookie is better).
//       // We do this here only to satisfy the dynamic check in the AdminLayout.
//       localStorage.setItem('adminToken', 'true'); 

//       // 3. Redirect the user to the admin dashboard
//       router.push('/admin'); 
//     } else {
//       // Failed login
//       const data = await res.json();
//       setError(data.message || 'Invalid credentials');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//       {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
//       <div>
//         <label htmlFor="username" className="sr-only">Username:</label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Admin Username"
//           required
//           className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="sr-only">Password:</label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//       </div>
//       <button 
//         type="submit"
//         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         Log In
//       </button>
//     </form>
//   );
// }














// /components/AdminLoginForm.jsx

'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            // 🛑 CRITICAL CHANGE: The session token (admin-session-token) 
            // is handled securely via an HTTP-only cookie set by the '/api/login' route.
            // We DO NOT need or want to set anything in localStorage here.

            // Redirect the user to the admin dashboard
            router.push('/admin'); 
        } else {
            // Failed login
            const data = await res.json();
            setError(data.message || 'Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <div>
                <label htmlFor="username" className="sr-only">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Admin Username"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="sr-only">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button 
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Log In
            </button>
        </form>
    );
}