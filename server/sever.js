










// // server/server.js

// const dotenv = require('dotenv');
// const express = require('express');
// const cors = require('cors'); // ❗ NEW: Import CORS middleware ❗
// const projectRoutes = require('./routes/projects'); 
// const connectDB = require('./config/db'); 

// // Load env variables immediately
// dotenv.config({ path: './../.env' }); 

// // 3. INITIALIZE EXPRESS APP
// const app = express();

// // Middleware
// app.use(cors()); // ❗ NEW: Use CORS middleware to allow cross-origin requests ❗
// app.use(express.json()); // Allows the server to read JSON from POST requests

// // Routes
// app.use('/api/v1/projects', projectRoutes);


// // Server Startup Logic
// const PORT = process.env.PORT || 5000;

// // 4. CALL connectDB AND CHAIN app.listen
// connectDB()
//     .then(() => {
//         // If DB connection is successful, start the server
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         // This catch block handles any errors from the DB connection
//         console.error("Failed to start server due to database error.", err);
//     });











// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables (assuming a .env file is used)
// dotenv.config();

// // Import Project routes (assuming you have one, or create a dummy one)
// // const projectRoutes = require('./routes/projects'); 
// const certificationRoutes = require('./routes/certifications');
// const skillRoutes = require('./routes/skills');

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_cms';

// // Connect to MongoDB
// mongoose.connect(MONGO_URI)
//     .then(() => console.log('MongoDB Connected Successfully'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1); // Exit process with failure
//     });

// // Middleware
// app.use(cors()); // Allow cross-origin requests
// app.use(express.json()); // Body parser for application/json

// // Default route for health check
// app.get('/', (req, res) => {
//     res.send('Admin CMS Backend Running');
// });

// // --- API Routes ---
// // Assuming projects routes are defined elsewhere, we'll mount the new ones
// // app.use('/api/v1/projects', projectRoutes);
// app.use('/api/v1/certifications', certificationRoutes);
// app.use('/api/v1/skills', skillRoutes);

// // Start server
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// // Graceful exit handler
// process.on('SIGINT', () => {
//     mongoose.connection.close(() => {
//         console.log('Mongoose connection disconnected through app termination');
//         process.exit(0);
//     });
// });






const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables with a path that covers the common 'one level up' structure
// Change the path if your .env file is located elsewhere relative to this file.
dotenv.config({ path: '../.env' }); 

// Import all required routes
const certificationRoutes = require('./routes/certifications');
const skillRoutes = require('./routes/skills');
const projectRoutes = require('./routes/projects'); // ❗ ADDED PROJECT ROUTES IMPORT ❗
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;
// Use the loaded environment variable
const MONGO_URI = process.env.MONGO_URI; 

// ❗ NEW DIAGNOSTIC LOGGING ❗
console.log(`[DIAGNOSTIC] PORT set to: ${PORT}`);
console.log(`[DIAGNOSTIC] MONGO_URI loaded: ${MONGO_URI ? 'YES' : 'NO'}`);


// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Body parser for application/json

// --- Connection and Server Startup Logic ---

async function connectDBAndStartServer() {
    if (!MONGO_URI) {
        console.error('FATAL ERROR: MONGO_URI not defined. Check your .env file or dotenv path.');
        process.exit(1);
    }
    
    try {
        // Connect to MongoDB and wait for it to succeed
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected Successfully');

        // Once connected, mount the routes
        app.get('/', (req, res) => {
            res.send('Admin CMS Backend Running');
        });
        
        app.use('/api/v1/contact', contactRoutes);
        app.use('/api/v1/contacts', contactRoutes);
        // ❗ ADDED PROJECT ROUTES ❗
        app.use('/api/v1/projects', projectRoutes);
        
        app.use('/api/v1/certifications', certificationRoutes);
        app.use('/api/v1/skills', skillRoutes);

        // Start server
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });

    } catch (err) {
        console.error('MongoDB connection error. Server startup failed:', err.message);
        process.exit(1); // Exit process with failure
    }
}

// Execute the async function to start the process
connectDBAndStartServer();

// Graceful exit handler
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});


















