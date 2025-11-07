






// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables with a path that covers the common 'one level up' structure
// // Change the path if your .env file is located elsewhere relative to this file.
// dotenv.config({ path: '../.env' }); 

// // Import all required routes
// const certificationRoutes = require('./routes/certifications');
// const skillRoutes = require('./routes/skills');
// const projectRoutes = require('./routes/projects'); // ❗ ADDED PROJECT ROUTES IMPORT ❗
// const contactRoutes = require('./routes/contact');

// const app = express();
// const PORT = process.env.PORT || 5000;
// // Use the loaded environment variable
// const MONGO_URI = process.env.MONGO_URI; 

// // ❗ NEW DIAGNOSTIC LOGGING ❗
// console.log(`[DIAGNOSTIC] PORT set to: ${PORT}`);
// console.log(`[DIAGNOSTIC] MONGO_URI loaded: ${MONGO_URI ? 'YES' : 'NO'}`);


// // Middleware
// app.use(cors()); // Allow cross-origin requests
// app.use(express.json()); // Body parser for application/json

// // --- Connection and Server Startup Logic ---

// async function connectDBAndStartServer() {
//     if (!MONGO_URI) {
//         console.error('FATAL ERROR: MONGO_URI not defined. Check your .env file or dotenv path.');
//         process.exit(1);
//     }
    
//     try {
//         // Connect to MongoDB and wait for it to succeed
//         await mongoose.connect(MONGO_URI);
//         console.log('MongoDB Connected Successfully');

//         // Once connected, mount the routes
//         app.get('/', (req, res) => {
//             res.send('Admin CMS Backend Running');
//         });
        
//         app.use('/api/v1/contact', contactRoutes);
//         app.use('/api/v1/contacts', contactRoutes);
//         // ❗ ADDED PROJECT ROUTES ❗
//         app.use('/api/v1/projects', projectRoutes);
        
//         app.use('/api/v1/certifications', certificationRoutes);
//         app.use('/api/v1/skills', skillRoutes);

//         // Start server
//         app.listen(PORT, () => {
//             console.log(`Server started on port ${PORT}`);
//         });

//     } catch (err) {
//         console.error('MongoDB connection error. Server startup failed:', err.message);
//         process.exit(1); // Exit process with failure
//     }
// }

// // Execute the async function to start the process
// connectDBAndStartServer();

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

// Load environment variables
dotenv.config({ path: '../.env' });

const certificationRoutes = require('./routes/certifications');
const skillRoutes = require('./routes/skills');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ CORS setup: Allow frontend from Render
const allowedOrigins = [
  'http://localhost:3000', // for local testing
  'https://prabhav-portfolio-next.onrender.com', // your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

async function connectDBAndStartServer() {
  if (!MONGO_URI) {
    console.error('❌ FATAL ERROR: MONGO_URI not defined.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');

    app.get('/', (req, res) => {
      res.send('Admin CMS Backend Running');
    });

    app.use('/api/v1/contact', contactRoutes);
    app.use('/api/v1/contacts', contactRoutes);
    app.use('/api/v1/projects', projectRoutes);
    app.use('/api/v1/certifications', certificationRoutes);
    app.use('/api/v1/skills', skillRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error. Server startup failed:', err.message);
    process.exit(1);
  }
}

connectDBAndStartServer();

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed gracefully');
    process.exit(0);
  });
});
