import { NextResponse } from 'next/server';


export async function POST(request) {
    try {
        const { username, password } = await request.json();

        const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            
            
            const sessionToken = 'validated_admin_session_placeholder'; 
            
            const cookieOptions = {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                path: '/', 
                sameSite: 'strict', 
                maxAge: 60 * 60 * 24 * 7, 
            };
            
            const response = NextResponse.json({ 
                message: 'Login successful', 
                token: sessionToken 
            }, { status: 200 });
            
           
            const cookieValue = `${'admin-session-token'}=${sessionToken}; ${Object.entries(cookieOptions)
                .map(([key, value]) => (value === true ? key : `${key}=${value}`))
                .join('; ')}`;

            response.headers.set('Set-Cookie', cookieValue);

            console.log(`✅ Login successful. Cookie set with Path: ${cookieOptions.path}, Secure: ${cookieOptions.secure}`);

            return response;
        } else {
            
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}