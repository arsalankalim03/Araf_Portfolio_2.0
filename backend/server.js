/**
 * Backend Server for A'RAF Portfolio
 * 
 * Setup:
 * 1. Create a database in MySQL named 'araf_portfolio' (or update DB_NAME in .env)
 * 2. Create a .env file in this directory with:
 *    DB_HOST=localhost
 *    DB_USER=root
 *    DB_PASSWORD=your_password
 *    DB_NAME=araf_portfolio
 *    PORT=3000
 * 3. Run: npm install express mysql2 cors dotenv
 * 4. Run: node server.js
 */

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'araf_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create Connection Pool
const pool = mysql.createPool(dbConfig);

// Initialize Database (Auto-create table)
async function initDatabase() {
  try {
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database');
    
    // Create Contacts Table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await connection.query(createTableQuery);
    console.log('✅ Contacts table ready');
    connection.release();
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
    console.log('\n⚠️  TROUBLESHOOTING:');
    console.log('1. Make sure MySQL is running.');
    console.log('2. Make sure the database "' + dbConfig.database + '" exists.');
    console.log('3. Check your .env file credentials.');
  }
}

// Run initialization
initDatabase();

// Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [name, email, message]);

    console.log(`📩 New submission from ${name} (ID: ${result.insertId})`);

    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Database Insert Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', database: 'configured' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`👉 API Endpoint: http://localhost:${PORT}/api/contact`);
});