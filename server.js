const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Frontend ki static files serve karne ke liye
app.use(express.static(path.join(__dirname, 'frontend')));

// Database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connection check karna
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.message);
    } else {
        console.log('MySQL Database Connected Successfully!');
    }
});

// 1. POST API: Bug analyze karna aur database mein save karna
app.post('/api/analyze', (req, res) => {
    const { description } = req.body;
    
    // Description se chota title banana
    const title = description.length > 50 ? description.substring(0, 47) + '...' : description;
    const category = "Functional";
    const severity = "High";
    const priority = "High";
    
    const query = 'INSERT INTO reports (title, description, status) VALUES (?, ?, ?)';
    
    db.query(query, [title, description, 'Pending'], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // Frontend ko structured response bhejna
            res.status(201).json({
                title: title,
                category: category,
                severity: severity,
                priority: priority,
                reproduction_steps: [
                    "Open the application in a supported browser.",
                    "Navigate to the page or feature mentioned in the report.",
                    "Perform the action described by the user.",
                    "Observe the unexpected behavior."
                ],
                missing_information: [
                    "Browser name and version",
                    "Operating system / device",
                    "Exact error message or screenshot"
                ],
                suggestions: [
                    "Check the browser console for JavaScript errors.",
                    "Verify backend routes and database connection."
                ]
            });
        }
    });
});

// 2. GET API: Sare reports database se fetch karke frontend ko dena
app.get('/api/reports', (req, res) => {
    db.query('SELECT * FROM reports', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            const formattedReports = results.map(row => ({
                id: row.id,
                title: row.title,
                category: "Functional",
                severity: "High",
                priority: "High",
                createdAt: row.created_at
            }));
            res.json(formattedReports);
        }
    });
});

// 3. Browser mein direct /reports check karne ke liye route
app.get('/reports', (req, res) => {
    db.query('SELECT * FROM reports', (err, results) => {
        if (err) {
            res.status(500).send("Error fetching data: " + err.message);
        } else {
            res.json(results);
        }
    });
});

// Server start karna
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});