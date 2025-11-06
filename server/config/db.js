// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Remove options if you're on a modern Mongoose version, as they are deprecated
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // This message will confirm success
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Return the connection object for use in server.js
        return conn;
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // If connection fails, exit the process
        process.exit(1); 
    }
}

module.exports = connectDB;