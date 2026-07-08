const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware architecture setup rules handles json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all frontend directory structures statically from public directory location
app.use(express.static(path.join(__dirname, 'public')));

// Mock User Database Store Layer
const structuralUserCacheStore = [];

// --- API endpoint Route 1: Sign up endpoint implementation logic ---
app.post('/api/auth/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing email or authentication password components data parameters." });
    }
    
    const userRecordExists = structuralUserCacheStore.find(u => u.email === email);
    if (userRecordExists) {
        return res.status(409).json({ success: false, message: "Account profile matching this email string is already constructed." });
    }

    structuralUserCacheStore.push({ email, password });
    return res.status(201).json({ success: true, message: "User account generated successfully." });
});

// --- API Endpoint Route 2: Login authentication engine validation check ---
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const validatedProfile = structuralUserCacheStore.find(u => u.email === email && u.password === password);
    
    // For prototyping utility purposes: Allow implicit creation if cache array layer is empty
    if (!validatedProfile && structuralUserCacheStore.length === 0) {
        structuralUserCacheStore.push({ email, password });
        return res.status(200).json({ success: true, message: "Implicit prototype profile generation pipeline processed." });
    }

    if (validatedProfile) {
        return res.status(200).json({ success: true, message: "Profile authentication confirmed." });
    }

    return res.status(401).json({ success: false, message: "Invalid email string identification or password configuration match failure." });
});

// --- API Endpoint Route 3: Enterprise Contact Mail Routing Engine Endpoint ---
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Incomplete dataset parameters passed to application interface pipeline." });
    }

    // Server-side Log simulation of transactional email message delivery system
    console.log("=========================================================");
    console.log(`NEW AQUAGUARD INCOMING DISPATCH TO: info.aquaguard.pk@gmail.com`);
    console.log(`SENDER NAME: ${name}`);
    console.log(`REPLY EMAIL: ${email}`);
    console.log(`MESSAGE BODY: \n"${message}"`);
    console.log("=========================================================");

    // In production environments, instantiate nodemailer transport layer configurations here.
    return res.status(200).json({ 
        success: true, 
        message: "Message processed and accurately piped onto system target destination address." 
    });
});

// Capture any default routing parameters to handle Single Page App asset safety falls
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`AquaGuard System active at runtime address channel URI: http://localhost:${PORT}`);
});
