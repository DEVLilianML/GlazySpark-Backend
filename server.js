const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sitemapRoutes = require('./sitemap');
const sitemapIndexRoutes = require("./sitemapIndex");
const blogRoutes = require('./blogRoutes'); 
const path = require('path'); // This path is for google verification site


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for form data
const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    projectNarration: { type: String, required: true },
});

const FormData = mongoose.model('FormData', formDataSchema);

// POST endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
    const { name, phone, email, projectNarration } = req.body;
    try {
        const formData = new FormData({ name, phone, email, projectNarration });
        await formData.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Use the sitemap route
app.use(sitemapRoutes);
app.use(sitemapIndexRoutes);
app.use("/api", blogRoutes);

// google site verification
app.get("/googled78d88d23b1b7b74.html", (req, res) => {
    res.sendFile(path.join(__dirname, "googled78d88d23b1b7b74.html"));
});

// Start the server
app.listen(PORT, () => {
    // ✅ Show this log only in development mode
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});
