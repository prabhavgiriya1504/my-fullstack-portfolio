// server/middleware/auth.js

// 🚨 IMPORTANT: You will need to install 'jsonwebtoken' to properly implement this.
// npm install jsonwebtoken

// This is a placeholder function that ensures the server starts.
// Replace this with your full JWT verification logic later.

// NOTE: This basic placeholder does NOT yet verify the token!
// It only checks if the Authorization header is present.

exports.protect = (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Example header: "Bearer eyJhbGciOiJIUzI1NiI..."
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if the token is present
    if (!token) {
        // Return a 401 response if authentication is required but missing
        return res.status(401).json({ 
            success: false, 
            error: 'Not authorized to access this route. Token missing.' 
        });
    }

    // Since a token is present, we allow the request to proceed for now 
    // (until you implement the actual JWT verification logic).
    // In a real app, the token MUST be verified here using jwt.verify().
    console.log(`Token received: ${token.substring(0, 10)}... Proceeding temporarily.`);
    next(); 
};