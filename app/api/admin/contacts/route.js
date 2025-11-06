// app/api/admin/contacts/route.js
// This acts as a secure proxy to fetch ALL contact messages for the admin panel.

import { cookies } from 'next/headers'; // To read the admin session cookie

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Handle GET request (Admin data retrieval)
export async function GET(request) {
    // 1. Retrieve the admin session token
    const adminToken = cookies().get('admin-session-token')?.value;

    if (!adminToken) {
        // Return 401 if the token is missing (before hitting the backend)
        return new Response(JSON.stringify({ success: false, error: 'Authentication token missing.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // 2. Forward the secure request to your Node.js backend
        // Your backend must have a route like: GET /api/v1/contacts
        const response = await fetch(`${BACKEND_URL}/api/v1/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 3. Send the token to the backend for validation
                'Authorization': `Bearer ${adminToken}`, 
            },
            // Note: We don't use 'credentials: "include"' here because this is a server-to-server call.
            // We manually construct the Authorization header from the cookie we read.
        });

        // 4. Handle response from the backend
        const data = await response.json();

        // 5. Return the backend's response status and data
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Admin Contact Proxy GET Error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Failed to fetch messages through proxy.' 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}