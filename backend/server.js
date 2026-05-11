require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    let mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
        console.log('No MONGODB_URI found, starting MongoMemoryServer...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        mongoUri = mongod.getUri();
    }

    mongoose.connect(mongoUri)
        .then(async () => {
            console.log('Connected to MongoDB:', mongoUri);
            
            // Seed initial admin user if none exists
            const User = require('./models/User');
            const userCount = await User.countDocuments();
            if (userCount === 0) {
                console.log('No users found. Creating initial admin user...');
                const admin = new User({
                    username: 'admin',
                    password: 'password123'
                });
                await admin.save();
                console.log('Admin user created (admin / password123)');
            }
        })
        .catch(err => console.error('MongoDB connection error:', err));
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
