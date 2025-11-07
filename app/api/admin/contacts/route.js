

import { cookies } from 'next/headers'; 

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Handle GET request (it is mainly for teh ,Admin data retrieval)
export async function GET(request) {

    const adminToken = cookies().get('admin-session-token')?.value;

    if (!adminToken) {
        return new Response(JSON.stringify({ success: false, error: 'Authentication token missing.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        
        const response = await fetch(`${BACKEND_URL}/api/v1/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`, 
            },
            
        });

       
        const data = await response.json();

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