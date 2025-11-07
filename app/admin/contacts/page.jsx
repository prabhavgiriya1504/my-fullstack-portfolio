



















import { cookies } from 'next/headers'; 
import { redirect } from 'next/navigation'; 


export const dynamic = 'force-dynamic'; 

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function AdminContactPage() {
    
    // 1. Securely read the cookie on the server
    const adminToken = cookies().get('admin-session-token')?.value; 

    
    if (!adminToken) {
        console.log("[AdminContactPage] Authentication failed: 'admin-session-token' cookie is missing or null. Redirecting to /login.");
        // Redirect to the specified login path
        redirect('/login'); 
    } else {
        console.log(`[AdminContactPage] Authentication token read successfully. Token length: ${adminToken.length}.`);
         
    }
    
    let messages = [];
    let fetchStatus = 200;
    const fetchUrl = `${BACKEND_URL}/api/v1/contacts`;

    try {
        console.log(`📡 [AdminContactPage] Attempting to fetch contacts from: ${fetchUrl}`);
        
        const res = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                // The Authorization header 
                'Authorization': `Bearer ${adminToken}`, 
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        fetchStatus = res.status;
        console.log(`📩 [AdminContactPage] Backend response status: ${fetchStatus}`);

        
        if (res.status === 401 || res.status === 403) {
            console.error(` [AdminContactPage] Authorization Failed (Status ${fetchStatus}). Token invalid or expired. Redirecting to /login.`);
            
            // Log the error response body if possible for deeper debug
            if (res.status === 401 && res.headers.get('Content-Type')?.includes('application/json')) {
                const errorBody = await res.json();
                console.error("Backend Error Details:", errorBody);
            }

            redirect('/login'); 
        }
        
        if (!res.ok) {
            console.error(`[AdminContactPage] Backend failed to fetch contacts: ${res.status}. Response OK is false.`);
            // Fetch the error body if status is not 401/403 but still an error (e.g., 500)
            if (res.status >= 500 && res.headers.get('Content-Type')?.includes('application/json')) {
                const errorBody = await res.json();
                console.error("Backend Server Error Details:", errorBody);
            }
        } else {
            const result = await res.json();
            messages = result.data || []; 
            console.log(`[AdminContactPage] Successfully retrieved ${messages.length} messages.`);
        }

    } catch (error) {
        // ===================================================
        // 🔍 DEBUG STEP 3: Catch network/backend server errors
        // ===================================================
        console.error("[AdminContactPage] Network or Backend Error during fetch:", error);
        fetchStatus = 500;
    }
    
    // --- Message Display Layout ---
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                👤 User Contact Submissions ({messages.length})
            </h1>
            
            {fetchStatus !== 200 && (
                <p className="text-lg text-red-700 p-4 bg-red-100 rounded-lg text-center mb-6">
                    Error loading messages. Server status: **{fetchStatus}**. Check your Next.js server logs for debugging messages and ensure your backend is running.
                </p>
            )}

            {messages.length === 0 ? (
                <p className="text-lg text-gray-500 p-8 bg-gray-50 rounded-lg text-center">
                    No contact messages found.
                </p>
            ) : (
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div 
                            key={message._id || index} 
                            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-2 border-b pb-2">
                                <h3 className="text-xl font-semibold text-teal-600">
                                    {message.name || 'Anonymous User'}
                                </h3>
                                {message.createdAt && (
                                    <span className="text-xs text-gray-500">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Email: <a href={`mailto:${message.email}`} className="text-indigo-500 hover:underline">{message.email || 'N/A'}</a>
                            </p>
                            <p className="text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg border">
                                Message:-- {message.message || 'No message content provided.'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}