

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request) {
    try {
        const body = await request.json();

        const response = await fetch(`${BACKEND_URL}/api/v1/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

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