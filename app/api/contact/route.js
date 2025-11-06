// app/api/contact/route.js
// This acts as a proxy to your separate Node.js backend

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Handle POST request (form submission)
export async function POST(request) {
    try {
        const body = await request.json();

        // Forward the request to your Express backend
        const response = await fetch(`${BACKEND_URL}/api/v1/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Get the response data from the Express backend
        const data = await response.json();

        // Return the Express backend's response status and data to the Next.js frontend component
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('API Proxy Error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Failed to process contact request on proxy server.' 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}