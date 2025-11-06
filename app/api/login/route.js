// // app/api/login/route.js

// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { username, password } = await request.json();

//     // Retrieve secrets from environment variables
//     const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
//     const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//     if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//       // 🔑 SUCCESS: Implement session/cookie management here
//       return NextResponse.json({ message: 'Login successful' }, { status: 200 });
//     } else {
//       // 🚫 FAIL
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }

// // Optional: Prevent other methods (like GET) from being accessed
// export async function GET() {
//   return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
// }












// /app/api/login/route.js
import { NextResponse } from 'next/server';

// ⚠️ You should install a JWT library (e.g., 'jsonwebtoken') for production use.
// For this example, we'll use a secure way to set the cookie header manually.

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Retrieve secrets from environment variables
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            
            // 1. Generate a simple placeholder token (REPLACE WITH JWT IN PRODUCTION!)
            // Using a simple static value for now, but a real JWT is required for security.
            const sessionToken = 'validated_admin_session_placeholder'; 
            
            // 2. Set the secure cookie options
            const cookieOptions = {
                // Must be 'true' for security (cannot be accessed by client-side JavaScript)
                httpOnly: true, 
                // Set to 'false' for development on http://localhost (REQUIRED!)
                secure: process.env.NODE_ENV === 'production', 
                // Must be sent to all admin paths
                path: '/', 
                // Helps prevent Cross-Site Request Forgery attacks
                sameSite: 'strict', 
                // Expiration time (e.g., 7 days)
                maxAge: 60 * 60 * 24 * 7, 
            };
            
            // 3. Create the response object
            const response = NextResponse.json({ 
                message: 'Login successful', 
                token: sessionToken 
            }, { status: 200 });
            
            // 4. Set the Cookie header on the response
            // We stringify the options to build the Set-Cookie header value
            const cookieValue = `${'admin-session-token'}=${sessionToken}; ${Object.entries(cookieOptions)
                .map(([key, value]) => (value === true ? key : `${key}=${value}`))
                .join('; ')}`;

            response.headers.set('Set-Cookie', cookieValue);

            console.log(`✅ Login successful. Cookie set with Path: ${cookieOptions.path}, Secure: ${cookieOptions.secure}`);

            return response;
        } else {
            // 🚫 FAIL
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// Optional: Prevent other methods (like GET) from being accessed
export async function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}